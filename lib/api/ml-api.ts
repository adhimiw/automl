/**
 * Machine Learning API Client
 */
import { apiRequest, type ApiResponse } from "../api-client"

// Model types
export type ModelType = "regression" | "classification" | "clustering" | "timeseries" | "custom"

// Model status
export type ModelStatus = "draft" | "training" | "trained" | "deployed" | "archived" | "failed"

// Model interface
export interface Model {
  id: number
  name: string
  description?: string
  type: ModelType
  dataset_id: number
  features: string[]
  target?: string
  hyperparameters?: Record<string, any>
  metrics?: Record<string, any>
  status: ModelStatus
  created_at: string
  updated_at: string
}

// Model training options
export interface ModelTrainingOptions {
  name: string
  description?: string
  type: ModelType
  dataset_id: number
  features: string[]
  target: string
  hyperparameters?: Record<string, any>
}

// Prediction options
export interface PredictionOptions {
  model_id: number
  data: Record<string, any>[]
}

// Prediction result
export interface PredictionResult {
  predictions: any[]
  probabilities?: number[][]
  model_id: number
  model_type: ModelType
}

/**
 * Train a machine learning model
 * @param options Model training options
 * @returns API response with the created model
 */
export async function trainModel(options: ModelTrainingOptions): Promise<ApiResponse<Model>> {
  return apiRequest<Model>("/ml/train", {
    method: "POST",
    body: options,
  })
}

/**
 * Get a model by ID
 * @param id Model ID
 * @returns API response with the model
 */
export async function getModel(id: number): Promise<ApiResponse<Model>> {
  return apiRequest<Model>(`/ml/models/${id}`)
}

/**
 * Get all models for a dataset
 * @param datasetId Dataset ID
 * @returns API response with the models
 */
export async function getModelsByDataset(datasetId: number): Promise<ApiResponse<Model[]>> {
  return apiRequest<Model[]>(`/ml/models?dataset_id=${datasetId}`)
}

/**
 * Delete a model
 * @param id Model ID
 * @returns API response
 */
export async function deleteModel(id: number): Promise<ApiResponse> {
  return apiRequest(`/ml/models/${id}`, { method: "DELETE" })
}

/**
 * Make predictions using a model
 * @param options Prediction options
 * @returns API response with the prediction results
 */
export async function makePredictions(options: PredictionOptions): Promise<ApiResponse<PredictionResult>> {
  return apiRequest<PredictionResult>("/ml/predict", {
    method: "POST",
    body: options,
  })
}

/**
 * Get model metrics
 * @param id Model ID
 * @returns API response with the model metrics
 */
export async function getModelMetrics(id: number): Promise<ApiResponse<Record<string, any>>> {
  return apiRequest<Record<string, any>>(`/ml/models/${id}/metrics`)
}

/**
 * Get feature importance for a model
 * @param id Model ID
 * @returns API response with the feature importance
 */
export async function getFeatureImportance(id: number): Promise<ApiResponse<Record<string, number>>> {
  return apiRequest<Record<string, number>>(`/ml/models/${id}/feature-importance`)
}

/**
 * Deploy a model
 * @param id Model ID
 * @returns API response with the deployed model
 */
export async function deployModel(id: number): Promise<ApiResponse<Model>> {
  return apiRequest<Model>(`/ml/models/${id}/deploy`, {
    method: "POST",
  })
}
