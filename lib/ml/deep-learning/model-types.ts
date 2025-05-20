/**
 * Type definitions for deep learning models
 */

export interface LayerConfig {
  units: number
  activation?: string
  dropout?: number
  regularization?: {
    type: "l1" | "l2"
    value: number
  }
}

export interface ModelConfig {
  name: string
  description?: string
  inputShape: number
  outputShape: number
  layers: LayerConfig[]
  optimizer: {
    name: string
    learningRate?: number
  }
  loss?: string
  metrics?: string[]
}

export interface TrainingConfig {
  epochs?: number
  batchSize?: number
  validationSplit?: number
  onProgress?: (metrics: TrainingProgress) => void
}

export interface TrainingProgress {
  epoch: number
  loss: number
  accuracy: number
  validationLoss?: number
  validationAccuracy?: number
}

export interface ModelMetrics {
  loss: number
  accuracy?: number
  validationLoss?: number
  validationAccuracy?: number
}

export interface DeepLearningModel {
  id: string
  name: string
  description?: string
  modelType: "regression" | "classification" | "timeSeries"
  config: ModelConfig
  createdAt: string
  updatedAt: string
  status: "draft" | "training" | "trained" | "failed"
  metrics?: ModelMetrics
  userId: string
  datasetId: string
  version: number
}

export interface ModelTrainingJob {
  id: string
  modelId: string
  status: "pending" | "running" | "completed" | "failed"
  progress: number
  startTime: string
  endTime?: string
  error?: string
  metrics?: ModelMetrics
}

export interface ModelPredictionRequest {
  modelId: string
  data: Record<string, any>[]
}

export interface ModelPredictionResponse {
  predictions: any[]
  modelId: string
  timestamp: string
}

export interface ModelEvaluationResult {
  modelId: string
  metrics: ModelMetrics
  confusionMatrix?: number[][]
  rocCurve?: { x: number; y: number }[]
  featureImportance?: Record<string, number>
}
