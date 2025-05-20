/**
 * Model Registry - Manages ML models in the system
 */
import { neon } from "@neondatabase/serverless"
import { createAuditLog } from "@/lib/db/audit-logs"

// Model types supported by the platform
export type ModelType = "regression" | "classification" | "clustering" | "timeseries" | "custom"

// Model status in the lifecycle
export type ModelStatus = "draft" | "training" | "trained" | "deployed" | "archived" | "failed"

// Model metadata interface
export interface ModelMetadata {
  id: number
  name: string
  description: string
  type: ModelType
  version: string
  status: ModelStatus
  created_by: number
  created_at: Date
  updated_at: Date
  metrics?: Record<string, any>
  hyperparameters?: Record<string, any>
  features?: string[]
  target?: string
  dataset_id?: number
  framework?: string
  tags?: string[]
}

// Database connection
const sql = neon(process.env.DATABASE_URL || "")

/**
 * Register a new model in the registry
 */
export async function registerModel(
  model: Omit<ModelMetadata, "id" | "created_at" | "updated_at">,
): Promise<ModelMetadata> {
  try {
    const result = await sql`
      INSERT INTO ml_models (
        name, description, type, version, status, 
        created_by, metrics, hyperparameters, features, 
        target, dataset_id, framework, tags
      ) VALUES (
        ${model.name}, ${model.description}, ${model.type}, ${model.version}, ${model.status},
        ${model.created_by}, ${JSON.stringify(model.metrics || {})}, ${JSON.stringify(model.hyperparameters || {})},
        ${JSON.stringify(model.features || [])}, ${model.target}, ${model.dataset_id}, 
        ${model.framework}, ${JSON.stringify(model.tags || [])}
      )
      RETURNING *
    `

    if (result.length === 0) {
      throw new Error("Failed to register model")
    }

    // Log the model registration
    await createAuditLog({
      user_id: model.created_by,
      action: "model_register",
      details: { model_id: result[0].id, model_name: model.name, model_type: model.type },
    })

    return result[0]
  } catch (error) {
    console.error("Error registering model:", error)
    throw error
  }
}

/**
 * Get a model by ID
 */
export async function getModelById(id: number): Promise<ModelMetadata | null> {
  try {
    const result = await sql`
      SELECT * FROM ml_models WHERE id = ${id}
    `

    return result.length > 0 ? result[0] : null
  } catch (error) {
    console.error("Error getting model:", error)
    throw error
  }
}

/**
 * Update model status
 */
export async function updateModelStatus(
  id: number,
  status: ModelStatus,
  metrics?: Record<string, any>,
): Promise<ModelMetadata> {
  try {
    const updateFields: any = { status }

    if (metrics) {
      updateFields.metrics = JSON.stringify(metrics)
    }

    const result = await sql`
      UPDATE ml_models
      SET ${sql(updateFields)}, updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `

    if (result.length === 0) {
      throw new Error(`Model with ID ${id} not found`)
    }

    return result[0]
  } catch (error) {
    console.error("Error updating model status:", error)
    throw error
  }
}

/**
 * List models with optional filtering
 */
export async function listModels(
  filters?: {
    type?: ModelType
    status?: ModelStatus
    created_by?: number
    dataset_id?: number
  },
  limit = 100,
  offset = 0,
): Promise<ModelMetadata[]> {
  try {
    let query = `
      SELECT * FROM ml_models
      WHERE 1=1
    `
    const params: any[] = []

    if (filters?.type) {
      query += ` AND type = $${params.length + 1}`
      params.push(filters.type)
    }

    if (filters?.status) {
      query += ` AND status = $${params.length + 1}`
      params.push(filters.status)
    }

    if (filters?.created_by) {
      query += ` AND created_by = $${params.length + 1}`
      params.push(filters.created_by)
    }

    if (filters?.dataset_id) {
      query += ` AND dataset_id = $${params.length + 1}`
      params.push(filters.dataset_id)
    }

    query += ` ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`
    params.push(limit, offset)

    const result = await sql.query(query, params)
    return result.rows
  } catch (error) {
    console.error("Error listing models:", error)
    throw error
  }
}

/**
 * Delete a model
 */
export async function deleteModel(id: number, userId: number): Promise<boolean> {
  try {
    // Get the model first to log details
    const model = await getModelById(id)

    if (!model) {
      return false
    }

    await sql`
      DELETE FROM ml_models WHERE id = ${id}
    `

    // Log the model deletion
    await createAuditLog({
      user_id: userId,
      action: "model_delete",
      details: { model_id: id, model_name: model.name, model_type: model.type },
    })

    return true
  } catch (error) {
    console.error("Error deleting model:", error)
    throw error
  }
}
