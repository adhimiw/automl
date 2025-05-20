/**
 * Prediction Service - Handles making predictions with trained models
 */
import { getModelById } from "./model-registry"
import { createAuditLog } from "@/lib/db/audit-logs"
import { createJob, updateJob } from "@/lib/db/jobs"

// Prediction request interface
export interface PredictionRequest {
  model_id: number
  data: Record<string, any>[] | Record<string, any>
  options?: {
    include_explanations?: boolean
    confidence_threshold?: number
    batch_size?: number
  }
}

// Prediction result interface
export interface PredictionResult {
  predictions: any[]
  confidence_scores?: number[]
  explanations?: Record<string, any>[]
  execution_time: number
  model_version: string
  model_type: string
}

/**
 * Make predictions using a trained model
 */
export async function makePrediction(request: PredictionRequest, user_id: number): Promise<PredictionResult> {
  try {
    // Get the model
    const model = await getModelById(request.model_id)

    if (!model) {
      throw new Error(`Model with ID ${request.model_id} not found`)
    }

    if (model.status !== "trained" && model.status !== "deployed") {
      throw new Error(`Model with ID ${request.model_id} is not trained or deployed`)
    }

    // Create a job to track prediction progress
    const job = await createJob({
      type: "model_prediction",
      status: "pending",
      user_id,
      params: {
        model_id: request.model_id,
        data_count: Array.isArray(request.data) ? request.data.length : 1,
        options: request.options,
      },
    })

    // Log the prediction start
    await createAuditLog({
      user_id,
      action: "model_prediction_start",
      details: {
        model_id: request.model_id,
        job_id: job.id,
        data_count: Array.isArray(request.data) ? request.data.length : 1,
      },
    })

    // Update job status to running
    await updateJob(job.id, { status: "running" })

    // Simulate prediction delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Generate mock predictions based on model type and input data
    const result = generateMockPredictions(model.type, request.data, request.options)

    // Update job status to completed
    await updateJob(job.id, {
      status: "completed",
      result: {
        prediction_count: result.predictions.length,
        execution_time: result.execution_time,
      },
    })

    // Log the prediction completion
    await createAuditLog({
      user_id,
      action: "model_prediction_complete",
      details: {
        model_id: request.model_id,
        job_id: job.id,
        prediction_count: result.predictions.length,
      },
    })

    return {
      ...result,
      model_version: model.version,
      model_type: model.type,
    }
  } catch (error) {
    console.error("Error making prediction:", error)

    // Log the prediction failure
    await createAuditLog({
      user_id,
      action: "model_prediction_failed",
      details: {
        model_id: request.model_id,
        error: (error as Error).message,
      },
    })

    throw error
  }
}

/**
 * Generate mock predictions based on model type and input data
 */
function generateMockPredictions(
  modelType: string,
  data: Record<string, any>[] | Record<string, any>,
  options?: PredictionRequest["options"],
): Omit<PredictionResult, "model_version" | "model_type"> {
  // Convert single record to array for consistent processing
  const dataArray = Array.isArray(data) ? data : [data]
  const includeExplanations = options?.include_explanations || false

  let predictions: any[] = []
  let confidenceScores: number[] = []
  let explanations: Record<string, any>[] = []

  switch (modelType) {
    case "regression":
      predictions = dataArray.map(() => 10 + Math.random() * 90)
      confidenceScores = dataArray.map(() => 0.7 + Math.random() * 0.25)
      if (includeExplanations) {
        explanations = dataArray.map(() => ({
          feature_importances: {
            feature1: 0.3 + Math.random() * 0.2,
            feature2: 0.2 + Math.random() * 0.15,
            feature3: 0.15 + Math.random() * 0.1,
            feature4: 0.1 + Math.random() * 0.05,
          },
        }))
      }
      break

    case "classification":
      predictions = dataArray.map(() => (Math.random() > 0.5 ? "class_a" : "class_b"))
      confidenceScores = dataArray.map(() => 0.75 + Math.random() * 0.2)
      if (includeExplanations) {
        explanations = dataArray.map(() => ({
          class_probabilities: {
            class_a: Math.random(),
            class_b: Math.random(),
          },
          feature_contributions: {
            feature1: -0.2 + Math.random() * 0.4,
            feature2: -0.15 + Math.random() * 0.3,
            feature3: -0.1 + Math.random() * 0.2,
          },
        }))
      }
      break

    case "clustering":
      predictions = dataArray.map(() => Math.floor(Math.random() * 5)) // Cluster IDs 0-4
      confidenceScores = dataArray.map(() => 0.6 + Math.random() * 0.3)
      if (includeExplanations) {
        explanations = dataArray.map((_, i) => ({
          distance_to_centroid: 0.2 + Math.random() * 0.5,
          next_closest_cluster: (predictions[i] + 1) % 5,
          distance_to_next_closest: 0.5 + Math.random() * 0.8,
        }))
      }
      break

    case "timeseries":
      predictions = dataArray.map(() => {
        const forecastPoints = 5
        return Array.from({ length: forecastPoints }, () => 100 + Math.random() * 50)
      })
      confidenceScores = dataArray.map(() => 0.65 + Math.random() * 0.25)
      if (includeExplanations) {
        explanations = dataArray.map(() => ({
          trend_component: 0.6 + Math.random() * 0.2,
          seasonal_component: 0.2 + Math.random() * 0.15,
          residual_component: 0.05 + Math.random() * 0.1,
        }))
      }
      break

    default:
      predictions = dataArray.map(() => Math.random())
      confidenceScores = dataArray.map(() => 0.5 + Math.random() * 0.4)
      if (includeExplanations) {
        explanations = dataArray.map(() => ({
          note: "Generic explanation for custom model type",
        }))
      }
  }

  return {
    predictions,
    confidence_scores: confidenceScores,
    explanations: includeExplanations ? explanations : undefined,
    execution_time: 0.1 + Math.random() * 0.3, // seconds
  }
}
