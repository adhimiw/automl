import pandas as pd
import numpy as np
import os
import json
import logging
import joblib
from typing import Dict, List, Any, Optional, Tuple, Union

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class ModelPredictor:
    """Machine learning model predictor class."""
    
    def __init__(self, models_dir: str = "./models"):
        """Initialize the ModelPredictor.
        
        Args:
            models_dir: Directory where trained models are saved.
        """
        self.models_dir = models_dir
        self.loaded_models = {}
    
    def load_model(self, model_id: str) -> Any:
        """Load a trained model.
        
        Args:
            model_id: ID of the model to load.
            
        Returns:
            Loaded model.
        """
        try:
            # Check if model is already loaded
            if model_id in self.loaded_models:
                return self.loaded_models[model_id]
            
            # Load model from file
            model_path = os.path.join(self.models_dir, f"{model_id}.joblib")
            if not os.path.exists(model_path):
                raise FileNotFoundError(f"Model file not found: {model_path}")
            
            model = joblib.load(model_path)
            self.loaded_models[model_id] = model
            
            return model
        except Exception as e:
            logger.error(f"Error loading model: {str(e)}")
            raise
    
    def predict(self, model_id: str, data: Union[pd.DataFrame, List[Dict[str, Any]]]) -> Dict[str, Any]:
        """Make predictions using a trained model.
        
        Args:
            model_id: ID of the model to use.
            data: Input data for prediction (DataFrame or list of dictionaries).
            
        Returns:
            Dictionary containing predictions and metadata.
        """
        try:
            # Load model
            model = self.load_model(model_id)
            
            # Convert data to DataFrame if it's a list of dictionaries
            if isinstance(data, list):
                df = pd.DataFrame(data)
            else:
                df = data.copy()
            
            # Make predictions
            predictions = model.predict(df)
            
            # Get prediction probabilities if available (for classification)
            probabilities = None
            if hasattr(model, 'predict_proba'):
                try:
                    probabilities = model.predict_proba(df)
                except:
                    # Some models might not support predict_proba for certain inputs
                    pass
            
            # Prepare result
            result = {
                'model_id': model_id,
                'predictions': predictions.tolist(),
                'probabilities': probabilities.tolist() if probabilities is not None else None,
                'input_shape': df.shape
            }
            
            return result
        except Exception as e:
            logger.error(f"Error making predictions: {str(e)}")
            raise
    
    def explain_predictions(self, model_id: str, data: Union[pd.DataFrame, List[Dict[str, Any]]]) -> Dict[str, Any]:
        """Explain predictions using model-specific techniques.
        
        Args:
            model_id: ID of the model to use.
            data: Input data for prediction (DataFrame or list of dictionaries).
            
        Returns:
            Dictionary containing prediction explanations.
        """
        try:
            # Load model
            model = self.load_model(model_id)
            
            # Convert data to DataFrame if it's a list of dictionaries
            if isinstance(data, list):
                df = pd.DataFrame(data)
            else:
                df = data.copy()
            
            # Make predictions
            predictions = model.predict(df)
            
            # Extract the actual model from the pipeline
            pipeline_model = model
            if hasattr(model, 'named_steps') and 'model' in model.named_steps:
                actual_model = model.named_steps['model']
            else:
                actual_model = model
            
            # Initialize explanations
            explanations = {
                'model_id': model_id,
                'predictions': predictions.tolist(),
                'feature_importance': None,
                'explanation_method': None
            }
            
            # Try to get feature importance if available
            if hasattr(actual_model, 'feature_importances_'):
                # For tree-based models
                explanations['feature_importance'] = actual_model.feature_importances_.tolist()
                explanations['explanation_method'] = 'feature_importances'
            elif hasattr(actual_model, 'coef_'):
                # For linear models
                explanations['feature_importance'] = actual_model.coef_.tolist() if len(actual_model.coef_.shape) == 1 else actual_model.coef_[0].tolist()
                explanations['explanation_method'] = 'coefficients'
            
            return explanations
        except Exception as e:
            logger.error(f"Error explaining predictions: {str(e)}")
            raise

# Create a singleton instance
model_predictor = ModelPredictor()
