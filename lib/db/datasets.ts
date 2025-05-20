import { query } from "./index"

export interface Dataset {
  id: number
  name: string
  description: string | null
  project_id: number
  file_path: string | null
  file_type: string | null
  row_count: number | null
  column_count: number | null
  metadata: any | null
  created_at: Date
  updated_at: Date
}

export interface DatasetInput {
  name: string
  description?: string
  project_id: number
  file_path?: string
  file_type?: string
}

/**
 * Create a new dataset
 * @param datasetData Dataset data
 * @returns Created dataset
 */
export async function createDataset(datasetData: DatasetInput): Promise<Dataset> {
  const { name, description, project_id, file_path, file_type } = datasetData

  const result = await query<Dataset>(
    "INSERT INTO datasets (name, description, project_id, file_path, file_type) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [name, description || null, project_id, file_path || null, file_type || null],
  )

  return result.rows[0]
}

/**
 * Get a dataset by ID
 * @param id Dataset ID
 * @returns Dataset or null if not found
 */
export async function getDatasetById(id: number): Promise<Dataset | null> {
  const result = await query<Dataset>("SELECT * FROM datasets WHERE id = $1", [id])

  return result.rows.length > 0 ? result.rows[0] : null
}

/**
 * Get datasets by project ID
 * @param projectId Project ID
 * @returns Array of datasets
 */
export async function getDatasetsByProjectId(projectId: number): Promise<Dataset[]> {
  const result = await query<Dataset>("SELECT * FROM datasets WHERE project_id = $1 ORDER BY updated_at DESC", [
    projectId,
  ])

  return result.rows
}

/**
 * Update dataset metadata
 * @param id Dataset ID
 * @param metadata Dataset metadata
 * @returns Updated dataset
 */
export async function updateDatasetMetadata(
  id: number,
  metadata: { row_count?: number; column_count?: number; metadata?: any },
): Promise<Dataset | null> {
  const { row_count, column_count, metadata: metadataObj } = metadata

  const result = await query<Dataset>(
    `UPDATE datasets 
     SET row_count = $1, column_count = $2, metadata = $3, updated_at = CURRENT_TIMESTAMP
     WHERE id = $4 
     RETURNING *`,
    [row_count || null, column_count || null, metadataObj || null, id],
  )

  return result.rows.length > 0 ? result.rows[0] : null
}

/**
 * Delete a dataset
 * @param id Dataset ID
 * @returns True if deleted, false otherwise
 */
export async function deleteDataset(id: number): Promise<boolean> {
  const result = await query("DELETE FROM datasets WHERE id = $1", [id])

  return result.rowCount > 0
}
