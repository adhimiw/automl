import os
import pandas as pd
import json
from typing import List, Dict, Any

SAMPLE_DATASETS_DIR = os.path.join(os.path.dirname(__file__), "../sample_datasets")

class SampleDatasetManager:
    def __init__(self):
        self.datasets = self._load_dataset_catalog()
    
    def _load_dataset_catalog(self) -> List[Dict[str, Any]]:
        """Load the catalog of available sample datasets"""
        catalog_path = os.path.join(SAMPLE_DATASETS_DIR, "catalog.json")
        
        if not os.path.exists(catalog_path):
            return []
            
        with open(catalog_path, "r") as f:
            return json.load(f)
    
    def get_dataset_catalog(self) -> List[Dict[str, Any]]:
        """Get the catalog of available sample datasets"""
        return self.datasets
    
    def get_dataset(self, dataset_id: str) -> pd.DataFrame:
        """Load a sample dataset by ID"""
        dataset = next((d for d in self.datasets if d["id"] == dataset_id), None)
        
        if not dataset:
            raise ValueError(f"Dataset with ID {dataset_id} not found")
            
        file_path = os.path.join(SAMPLE_DATASETS_DIR, dataset["file_path"])
        
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"Dataset file not found: {file_path}")
            
        if file_path.endswith(".csv"):
            return pd.read_csv(file_path)
        elif file_path.endswith((".xls", ".xlsx")):
            return pd.read_excel(file_path)
        elif file_path.endswith(".json"):
            return pd.read_json(file_path)
        else:
            raise ValueError(f"Unsupported file format: {file_path}")
    
    def get_dataset_info(self, dataset_id: str) -> Dict[str, Any]:
        """Get information about a sample dataset"""
        dataset = next((d for d in self.datasets if d["id"] == dataset_id), None)
        
        if not dataset:
            raise ValueError(f"Dataset with ID {dataset_id} not found")
            
        return dataset

# Create a singleton instance
sample_dataset_manager = SampleDatasetManager()
