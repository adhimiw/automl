/**
 * AI Features API Client
 */
import { apiRequest, type ApiResponse } from "../api-client"

// Data insight interface
export interface DataInsight {
  id: string
  dataset_id: number
  type: string
  title: string
  description: string
  visualization?: {
    type: string
    data: any
  }
  created_at: string
}

// Feature engineering suggestion interface
export interface FeatureSuggestion {
  id: string
  dataset_id: number
  name: string
  description: string
  code: string
  impact: "high" | "medium" | "low"
  created_at: string
}

// Visualization recommendation interface
export interface VisualizationRecommendation {
  id: string
  dataset_id: number
  type: string
  title: string
  description: string
  columns: string[]
  config: Record<string, any>
  created_at: string
}

// Educational content interface
export interface EducationalContent {
  id: string
  title: string
  content: string
  related_concepts: string[]
  difficulty: "beginner" | "intermediate" | "advanced"
  created_at: string
}

// Tutorial interface
export interface Tutorial {
  id: string
  title: string
  description: string
  steps: {
    title: string
    content: string
    code?: string
  }[]
  difficulty: "beginner" | "intermediate" | "advanced"
  created_at: string
}

/**
 * Get data insights for a dataset
 * @param datasetId Dataset ID
 * @returns API response with the data insights
 */
export async function getDataInsights(datasetId: number): Promise<ApiResponse<DataInsight[]>> {
  return apiRequest<DataInsight[]>(`/ai/suggestions/data-insights?dataset_id=${datasetId}`)
}

/**
 * Generate data insights for a dataset
 * @param datasetId Dataset ID
 * @returns API response with the generated data insights
 */
export async function generateDataInsights(datasetId: number): Promise<ApiResponse<DataInsight[]>> {
  return apiRequest<DataInsight[]>("/ai/suggestions/data-insights", {
    method: "POST",
    body: { dataset_id: datasetId },
  })
}

/**
 * Get feature engineering suggestions for a dataset
 * @param datasetId Dataset ID
 * @returns API response with the feature suggestions
 */
export async function getFeatureSuggestions(datasetId: number): Promise<ApiResponse<FeatureSuggestion[]>> {
  return apiRequest<FeatureSuggestion[]>(`/ai/suggestions/feature-engineering?dataset_id=${datasetId}`)
}

/**
 * Generate feature engineering suggestions for a dataset
 * @param datasetId Dataset ID
 * @returns API response with the generated feature suggestions
 */
export async function generateFeatureSuggestions(datasetId: number): Promise<ApiResponse<FeatureSuggestion[]>> {
  return apiRequest<FeatureSuggestion[]>("/ai/suggestions/feature-engineering", {
    method: "POST",
    body: { dataset_id: datasetId },
  })
}

/**
 * Get visualization recommendations for a dataset
 * @param datasetId Dataset ID
 * @returns API response with the visualization recommendations
 */
export async function getVisualizationRecommendations(
  datasetId: number
): Promise<ApiResponse<VisualizationRecommendation[]>> {
  return apiRequest<VisualizationRecommendation[]>(`/ai/suggestions/visualization?dataset_id=${datasetId}`)
}

/**
 * Generate visualization recommendations for a dataset
 * @param datasetId Dataset ID
 * @returns API response with the generated visualization recommendations
 */
export async function generateVisualizationRecommendations(
  datasetId: number
): Promise<ApiResponse<VisualizationRecommendation[]>> {
  return apiRequest<VisualizationRecommendation[]>("/ai/suggestions/visualization", {
    method: "POST",
    body: { dataset_id: datasetId },
  })
}

/**
 * Get explanation for a data science concept
 * @param concept Concept to explain
 * @param difficulty Difficulty level
 * @returns API response with the explanation
 */
export async function getConceptExplanation(
  concept: string,
  difficulty: "beginner" | "intermediate" | "advanced" = "beginner"
): Promise<ApiResponse<EducationalContent>> {
  return apiRequest<EducationalContent>(`/education/concept-explanation?concept=${encodeURIComponent(concept)}&difficulty=${difficulty}`)
}

/**
 * Get tutorial for a data science topic
 * @param topic Topic for the tutorial
 * @param difficulty Difficulty level
 * @returns API response with the tutorial
 */
export async function getTutorial(
  topic: string,
  difficulty: "beginner" | "intermediate" | "advanced" = "beginner"
): Promise<ApiResponse<Tutorial>> {
  return apiRequest<Tutorial>(`/education/tutorial?topic=${encodeURIComponent(topic)}&difficulty=${difficulty}`)
}
