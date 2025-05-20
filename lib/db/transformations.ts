import { query } from "./index"

export interface Transformation {
  id: number
  name: string
  description: string | null
  dataset_id: number
  result_dataset_id: number | null
  steps: any | null
  created_at: Date
  updated_at: Date
}

export interface TransformationInput {
  name: string
  description?: string
  dataset_id: number
  result_dataset_id?: number
  steps?: any
}

/**
 * Create a new transformation
 * @param transformationData Transformation data
 * @returns Created transformation
 */
export async function createTransformation(transformationData: TransformationInput): Promise<Transformation> {
  const { name, description, dataset_id, result_dataset_id, steps } = transformationData

  const result = await query<Transformation>(
    `INSERT INTO transformations (name, description, dataset_id, result_dataset_id, steps) 
     VALUES ($1, $2, $3, $4, $5) 
     RETURNING *`,
    [name, description || null, dataset_id, result_dataset_id || null, steps || null],
  )

  return result.rows[0]
}

/**
 * Get a transformation by ID
 * @param id Transformation ID
 * @returns Transformation or null if not found
 */
export async function getTransformationById(id: number): Promise<Transformation | null> {
  const result = await query<Transformation>("SELECT * FROM transformations WHERE id = $1", [id])

  return result.rows.length > 0 ? result.rows[0] : null
}

/**
 * Get transformations by dataset ID
 * @param datasetId Dataset ID
 * @returns Array of transformations
 */
export async function getTransformationsByDatasetId(datasetId: number): Promise<Transformation[]> {
  const result = await query<Transformation>(
    "SELECT * FROM transformations WHERE dataset_id = $1 ORDER BY created_at DESC",
    [datasetId],
  )

  return result.rows
}

/**
 * Update transformation result dataset
 * @param id Transformation ID
 * @param resultDatasetId Result dataset ID
 * @returns Updated transformation
 */
export async function updateTransformationResult(id: number, resultDatasetId: number): Promise<Transformation | null> {
  const result = await query<Transformation>(
    "UPDATE transformations SET result_dataset_id = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *",
    [resultDatasetId, id],
  )

  return result.rows.length > 0 ? result.rows[0] : null
}

/**
 * Delete a transformation
 * @param id Transformation ID
 * @returns True if deleted, false otherwise
 */
export async function deleteTransformation(id: number): Promise<boolean> {
  const result = await query("DELETE FROM transformations WHERE id = $1", [id])

  return result.rowCount > 0
}
