/**
 * API client for sample datasets
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface SampleDataset {
  id: string;
  name: string;
  description: string;
  domain: string;
  rows: number;
  columns: number;
  file_path: string;
  preview_url: string;
  tags: string[];
}

export interface ImportedDataset {
  dataset_id: string;
  message: string;
  name: string;
  row_count: number;
  column_count: number;
}

/**
 * Get a list of all available sample datasets
 */
export async function getSampleDatasets(): Promise<SampleDataset[]> {
  const response = await fetch(`${API_BASE_URL}/datasets/samples`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch sample datasets: ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Get information about a specific sample dataset
 */
export async function getSampleDatasetInfo(datasetId: string): Promise<SampleDataset> {
  const response = await fetch(`${API_BASE_URL}/datasets/samples/${datasetId}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch sample dataset info: ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Preview a sample dataset
 */
export async function previewSampleDataset(datasetId: string, rows: number = 10): Promise<any[]> {
  const response = await fetch(`${API_BASE_URL}/datasets/samples/${datasetId}/preview?rows=${rows}`);
  
  if (!response.ok) {
    throw new Error(`Failed to preview sample dataset: ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Import a sample dataset into the user's workspace
 */
export async function importSampleDataset(datasetId: string, projectId?: string): Promise<ImportedDataset> {
  const url = projectId 
    ? `${API_BASE_URL}/datasets/samples/${datasetId}/import?project_id=${projectId}`
    : `${API_BASE_URL}/datasets/samples/${datasetId}/import`;
    
  const response = await fetch(url, {
    method: 'POST',
  });
  
  if (!response.ok) {
    throw new Error(`Failed to import sample dataset: ${response.statusText}`);
  }
  
  return response.json();
}
