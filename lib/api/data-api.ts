/**
 * Data Processing API Client
 */
import { apiRequest, uploadFile, type ApiResponse } from "../api-client"

// Dataset interface
export interface Dataset {
  id: number
  name: string
  description?: string
  project_id: number
  file_path?: string
  file_type?: string
  row_count?: number
  column_count?: number
  metadata?: Record<string, any>
  created_at: string
  updated_at: string
}

// Dataset upload options
export interface DatasetUploadOptions {
  file: File
  name?: string
  description?: string
  project_id: number
}

// Dataset transformation options
export interface TransformationOptions {
  dataset_id: number
  name: string
  description?: string
  steps: TransformationStep[]
}

// Transformation step
export interface TransformationStep {
  type: string
  params: Record<string, any>
}

// Transformation result
export interface Transformation {
  id: number
  name: string
  description?: string
  dataset_id: number
  result_dataset_id?: number
  steps: TransformationStep[]
  created_at: string
  updated_at: string
}

/**
 * Upload a dataset
 * @param options Upload options
 * @returns API response with the created dataset
 */
export async function uploadDataset(options: DatasetUploadOptions): Promise<ApiResponse<Dataset>> {
  const { file, name = file.name, description, project_id } = options
  return uploadFile<Dataset>("/datasets/upload", file, {
    name,
    description,
    project_id,
  })
}

/**
 * Get a dataset by ID
 * @param id Dataset ID
 * @returns API response with the dataset
 */
export async function getDataset(id: number): Promise<ApiResponse<Dataset>> {
  return apiRequest<Dataset>(`/datasets/${id}`)
}

/**
 * Get all datasets for a project
 * @param projectId Project ID
 * @returns API response with the datasets
 */
export async function getDatasetsByProject(projectId: number): Promise<ApiResponse<Dataset[]>> {
  return apiRequest<Dataset[]>(`/datasets?project_id=${projectId}`)
}

/**
 * Delete a dataset
 * @param id Dataset ID
 * @returns API response
 */
export async function deleteDataset(id: number): Promise<ApiResponse> {
  return apiRequest(`/datasets/${id}`, { method: "DELETE" })
}

/**
 * Transform a dataset
 * @param options Transformation options
 * @returns API response with the transformation
 */
export async function transformDataset(options: TransformationOptions): Promise<ApiResponse<Transformation>> {
  return apiRequest<Transformation>("/transformations", {
    method: "POST",
    body: options,
  })
}

/**
 * Get dataset preview
 * @param id Dataset ID
 * @param rows Number of rows to preview
 * @returns API response with the preview data
 */
export async function getDatasetPreview(id: number, rows: number = 10): Promise<ApiResponse<any>> {
  return apiRequest(`/datasets/${id}/preview?rows=${rows}`)
}

/**
 * Get dataset schema
 * @param id Dataset ID
 * @returns API response with the schema
 */
export async function getDatasetSchema(id: number): Promise<ApiResponse<any>> {
  return apiRequest(`/datasets/${id}/schema`)
}

/**
 * Export dataset
 * @param id Dataset ID
 * @param format Export format (csv, excel, json)
 * @returns API response with the export URL
 */
export async function exportDataset(id: number, format: "csv" | "excel" | "json"): Promise<ApiResponse<string>> {
  return apiRequest(`/datasets/${id}/export?format=${format}`)
}
