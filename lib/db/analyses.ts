import { query } from "./index"

export interface Analysis {
  id: number
  name: string
  description: string | null
  dataset_id: number
  analysis_type: string
  parameters: any | null
  results: any | null
  created_at: Date
  updated_at: Date
}

export interface AnalysisInput {
  name: string
  description?: string
  dataset_id: number
  analysis_type: string
  parameters?: any
  results?: any
}

/**
 * Create a new analysis
 * @param analysisData Analysis data
 * @returns Created analysis
 */
export async function createAnalysis(analysisData: AnalysisInput): Promise<Analysis> {
  const { name, description, dataset_id, analysis_type, parameters, results } = analysisData

  const result = await query<Analysis>(
    `INSERT INTO analyses (name, description, dataset_id, analysis_type, parameters, results) 
     VALUES ($1, $2, $3, $4, $5, $6) 
     RETURNING *`,
    [name, description || null, dataset_id, analysis_type, parameters || null, results || null],
  )

  return result.rows[0]
}

/**
 * Get an analysis by ID
 * @param id Analysis ID
 * @returns Analysis or null if not found
 */
export async function getAnalysisById(id: number): Promise<Analysis | null> {
  const result = await query<Analysis>("SELECT * FROM analyses WHERE id = $1", [id])

  return result.rows.length > 0 ? result.rows[0] : null
}

/**
 * Get analyses by dataset ID
 * @param datasetId Dataset ID
 * @returns Array of analyses
 */
export async function getAnalysesByDatasetId(datasetId: number): Promise<Analysis[]> {
  const result = await query<Analysis>("SELECT * FROM analyses WHERE dataset_id = $1 ORDER BY created_at DESC", [
    datasetId,
  ])

  return result.rows
}

/**
 * Get the latest analysis of a specific type for a dataset
 * @param datasetId Dataset ID
 * @param analysisType Analysis type
 * @returns Analysis or null if not found
 */
export async function getLatestAnalysisByType(datasetId: number, analysisType: string): Promise<Analysis | null> {
  const result = await query<Analysis>(
    "SELECT * FROM analyses WHERE dataset_id = $1 AND analysis_type = $2 ORDER BY created_at DESC LIMIT 1",
    [datasetId, analysisType],
  )

  return result.rows.length > 0 ? result.rows[0] : null
}

/**
 * Update analysis results
 * @param id Analysis ID
 * @param results Analysis results
 * @returns Updated analysis
 */
export async function updateAnalysisResults(id: number, results: any): Promise<Analysis | null> {
  const result = await query<Analysis>(
    "UPDATE analyses SET results = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *",
    [results, id],
  )

  return result.rows.length > 0 ? result.rows[0] : null
}

/**
 * Delete an analysis
 * @param id Analysis ID
 * @returns True if deleted, false otherwise
 */
export async function deleteAnalysis(id: number): Promise<boolean> {
  const result = await query("DELETE FROM analyses WHERE id = $1", [id])

  return result.rowCount > 0
}
