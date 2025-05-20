/**
 * Backend API Client - Handles interactions with the FastAPI backend
 */

// Get the backend API URL from environment variables
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * Generic function to make API requests
 */
async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'An error occurred while fetching the data.');
  }

  return response.json();
}

/**
 * Upload a dataset to the backend
 */
export async function uploadDataset(file: File, name: string, description?: string): Promise<any> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('name', name);
  
  if (description) {
    formData.append('description', description);
  }

  const response = await fetch(`${API_URL}/datasets/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'An error occurred while uploading the dataset.');
  }

  return response.json();
}

/**
 * Get dataset information
 */
export async function getDataset(datasetId: string): Promise<any> {
  return fetchAPI(`/datasets/${datasetId}`);
}

/**
 * List all datasets
 */
export async function listDatasets(): Promise<any[]> {
  return fetchAPI('/datasets');
}

/**
 * Train a machine learning model
 */
export async function trainModel(
  datasetId: string,
  modelType: string,
  targetColumn: string,
  featureColumns: string[],
  hyperparameters?: Record<string, any>,
  testSize?: number
): Promise<any> {
  return fetchAPI('/ml/train', {
    method: 'POST',
    body: JSON.stringify({
      dataset_id: datasetId,
      model_type: modelType,
      target_column: targetColumn,
      feature_columns: featureColumns,
      hyperparameters,
      test_size: testSize || 0.2,
    }),
  });
}

/**
 * Make predictions using a trained model
 */
export async function makePrediction(modelId: string, data: Record<string, any>[]): Promise<any> {
  return fetchAPI('/ml/predict', {
    method: 'POST',
    body: JSON.stringify({
      model_id: modelId,
      data,
    }),
  });
}

/**
 * Get model information
 */
export async function getModel(modelId: string): Promise<any> {
  return fetchAPI(`/ml/models/${modelId}`);
}

/**
 * List all models
 */
export async function listModels(): Promise<any[]> {
  return fetchAPI('/ml/models');
}

/**
 * Generate an EDA report for a dataset
 */
export async function analyzeDataset(datasetId: string, columns?: string[]): Promise<any> {
  return fetchAPI('/eda/analyze', {
    method: 'POST',
    body: JSON.stringify({
      dataset_id: datasetId,
      columns,
    }),
  });
}

/**
 * Generate data insights using Gemini API
 */
export async function generateDataInsights(datasetId: string): Promise<any> {
  const formData = new FormData();
  formData.append('dataset_id', datasetId);

  const response = await fetch(`${API_URL}/ai/suggestions/data-insights`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'An error occurred while generating insights.');
  }

  return response.json();
}

/**
 * Generate feature engineering suggestions
 */
export async function generateFeatureEngineeringSuggestions(
  datasetId: string,
  taskType: string,
  targetVariable: string
): Promise<any> {
  const formData = new FormData();
  formData.append('dataset_id', datasetId);
  formData.append('task_type', taskType);
  formData.append('target_variable', targetVariable);

  const response = await fetch(`${API_URL}/ai/suggestions/feature-engineering`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'An error occurred while generating suggestions.');
  }

  return response.json();
}

/**
 * Generate visualization recommendations
 */
export async function generateVisualizationRecommendations(
  datasetId: string,
  analysisGoal: string
): Promise<any> {
  const formData = new FormData();
  formData.append('dataset_id', datasetId);
  formData.append('analysis_goal', analysisGoal);

  const response = await fetch(`${API_URL}/ai/suggestions/visualization`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'An error occurred while generating recommendations.');
  }

  return response.json();
}

/**
 * Generate concept explanation
 */
export async function generateConceptExplanation(
  concept: string,
  userLevel: string = 'intermediate',
  context?: string
): Promise<any> {
  const formData = new FormData();
  formData.append('concept', concept);
  formData.append('user_level', userLevel);
  
  if (context) {
    formData.append('context', context);
  }

  const response = await fetch(`${API_URL}/education/concept-explanation`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'An error occurred while generating explanation.');
  }

  return response.json();
}

/**
 * Generate tutorial
 */
export async function generateTutorial(
  topic: string,
  userLevel: string = 'intermediate',
  context?: string,
  interests?: string[]
): Promise<any> {
  const formData = new FormData();
  formData.append('topic', topic);
  formData.append('user_level', userLevel);
  
  if (context) {
    formData.append('context', context);
  }
  
  if (interests && interests.length > 0) {
    formData.append('interests', interests.join(','));
  }

  const response = await fetch(`${API_URL}/education/tutorial`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'An error occurred while generating tutorial.');
  }

  return response.json();
}
