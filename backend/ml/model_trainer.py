import pandas as pd
import numpy as np
import os
import json
import logging
import joblib
from typing import Dict, List, Any, Optional, Tuple, Union
from sklearn.model_selection import train_test_split, cross_val_score, GridSearchCV
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score,
    r2_score, mean_squared_error, mean_absolute_error
)

# ML models
from sklearn.linear_model import LogisticRegression, LinearRegression, Ridge, Lasso
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor, GradientBoostingClassifier, GradientBoostingRegressor
from sklearn.svm import SVC, SVR
from sklearn.neighbors import KNeighborsClassifier, KNeighborsRegressor
from sklearn.tree import DecisionTreeClassifier, DecisionTreeRegressor
from sklearn.neural_network import MLPClassifier, MLPRegressor

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class ModelTrainer:
    """Machine learning model trainer class."""
    
    def __init__(self, models_dir: str = "./models"):
        """Initialize the ModelTrainer.
        
        Args:
            models_dir: Directory to save trained models.
        """
        self.models_dir = models_dir
        os.makedirs(models_dir, exist_ok=True)
        
        # Define available models
        self.classification_models = {
            "logistic_regression": LogisticRegression,
            "random_forest": RandomForestClassifier,
            "gradient_boosting": GradientBoostingClassifier,
            "svm": SVC,
            "knn": KNeighborsClassifier,
            "decision_tree": DecisionTreeClassifier,
            "mlp": MLPClassifier
        }
        
        self.regression_models = {
            "linear_regression": LinearRegression,
            "ridge": Ridge,
            "lasso": Lasso,
            "random_forest": RandomForestRegressor,
            "gradient_boosting": GradientBoostingRegressor,
            "svm": SVR,
            "knn": KNeighborsRegressor,
            "decision_tree": DecisionTreeRegressor,
            "mlp": MLPRegressor
        }
        
        # Default hyperparameters for each model
        self.default_hyperparameters = {
            "logistic_regression": {"C": 1.0, "max_iter": 1000},
            "random_forest": {"n_estimators": 100, "max_depth": None},
            "gradient_boosting": {"n_estimators": 100, "learning_rate": 0.1},
            "svm": {"C": 1.0, "kernel": "rbf"},
            "knn": {"n_neighbors": 5},
            "decision_tree": {"max_depth": None},
            "mlp": {"hidden_layer_sizes": (100,), "max_iter": 1000},
            "linear_regression": {},
            "ridge": {"alpha": 1.0},
            "lasso": {"alpha": 1.0}
        }
    
    def train_model(
        self,
        df: pd.DataFrame,
        target_column: str,
        feature_columns: List[str],
        model_type: str,
        task_type: str,
        hyperparameters: Optional[Dict[str, Any]] = None,
        test_size: float = 0.2,
        random_state: int = 42,
        perform_cv: bool = False,
        cv_folds: int = 5
    ) -> Dict[str, Any]:
        """Train a machine learning model.
        
        Args:
            df: Input DataFrame.
            target_column: Name of the target column.
            feature_columns: List of feature columns.
            model_type: Type of model to train (e.g., 'random_forest', 'logistic_regression').
            task_type: Type of task ('classification' or 'regression').
            hyperparameters: Model hyperparameters.
            test_size: Proportion of data to use for testing.
            random_state: Random state for reproducibility.
            perform_cv: Whether to perform cross-validation.
            cv_folds: Number of cross-validation folds.
            
        Returns:
            Dictionary containing model information and metrics.
        """
        try:
            # Validate inputs
            if task_type not in ['classification', 'regression']:
                raise ValueError(f"Invalid task type: {task_type}. Must be 'classification' or 'regression'.")
            
            model_dict = self.classification_models if task_type == 'classification' else self.regression_models
            
            if model_type not in model_dict:
                raise ValueError(f"Invalid model type: {model_type}. Available models: {list(model_dict.keys())}")
            
            # Prepare data
            X = df[feature_columns].copy()
            y = df[target_column].copy()
            
            # Handle categorical features
            categorical_features = [col for col in feature_columns if not pd.api.types.is_numeric_dtype(df[col])]
            numeric_features = [col for col in feature_columns if pd.api.types.is_numeric_dtype(df[col])]
            
            # For classification, encode the target if it's categorical
            if task_type == 'classification' and not pd.api.types.is_numeric_dtype(y):
                label_encoder = LabelEncoder()
                y = label_encoder.fit_transform(y)
                class_names = label_encoder.classes_
            else:
                class_names = None
            
            # Split data
            X_train, X_test, y_train, y_test = train_test_split(
                X, y, test_size=test_size, random_state=random_state
            )
            
            # Create preprocessing pipeline
            preprocessor = ColumnTransformer(
                transformers=[
                    ('num', Pipeline([
                        ('imputer', SimpleImputer(strategy='median')),
                        ('scaler', StandardScaler())
                    ]), numeric_features),
                    ('cat', Pipeline([
                        ('imputer', SimpleImputer(strategy='most_frequent')),
                        ('onehot', OneHotEncoder(handle_unknown='ignore'))
                    ]), categorical_features)
                ],
                remainder='drop'
            )
            
            # Get model class and hyperparameters
            model_class = model_dict[model_type]
            model_params = self.default_hyperparameters.get(model_type, {})
            
            # Override with user-provided hyperparameters
            if hyperparameters:
                model_params.update(hyperparameters)
            
            # Create pipeline
            pipeline = Pipeline([
                ('preprocessor', preprocessor),
                ('model', model_class(**model_params))
            ])
            
            # Train model
            pipeline.fit(X_train, y_train)
            
            # Make predictions
            y_pred = pipeline.predict(X_test)
            
            # Calculate metrics
            metrics = {}
            if task_type == 'classification':
                metrics['accuracy'] = float(accuracy_score(y_test, y_pred))
                
                # For binary classification
                if len(np.unique(y)) == 2:
                    metrics['precision'] = float(precision_score(y_test, y_pred, average='binary'))
                    metrics['recall'] = float(recall_score(y_test, y_pred, average='binary'))
                    metrics['f1'] = float(f1_score(y_test, y_pred, average='binary'))
                else:
                    metrics['precision'] = float(precision_score(y_test, y_pred, average='weighted'))
                    metrics['recall'] = float(recall_score(y_test, y_pred, average='weighted'))
                    metrics['f1'] = float(f1_score(y_test, y_pred, average='weighted'))
            else:
                metrics['r2'] = float(r2_score(y_test, y_pred))
                metrics['mse'] = float(mean_squared_error(y_test, y_pred))
                metrics['mae'] = float(mean_absolute_error(y_test, y_pred))
                metrics['rmse'] = float(np.sqrt(metrics['mse']))
            
            # Perform cross-validation if requested
            if perform_cv:
                if task_type == 'classification':
                    cv_scores = cross_val_score(pipeline, X, y, cv=cv_folds, scoring='accuracy')
                else:
                    cv_scores = cross_val_score(pipeline, X, y, cv=cv_folds, scoring='r2')
                
                metrics['cv_mean_score'] = float(cv_scores.mean())
                metrics['cv_std_score'] = float(cv_scores.std())
            
            # Generate a unique model ID
            model_id = f"{model_type}_{task_type}_{pd.Timestamp.now().strftime('%Y%m%d%H%M%S')}"
            
            # Save model
            model_path = os.path.join(self.models_dir, f"{model_id}.joblib")
            joblib.dump(pipeline, model_path)
            
            # Prepare feature importance if available
            feature_importance = None
            model = pipeline.named_steps['model']
            
            if hasattr(model, 'feature_importances_'):
                # Get feature names from preprocessor
                feature_names = []
                for name, trans, cols in preprocessor.transformers_:
                    if name == 'cat':
                        # For categorical features, get the one-hot encoded feature names
                        encoder = trans.named_steps['onehot']
                        for i, col in enumerate(cols):
                            feature_names.extend([f"{col}_{cat}" for cat in encoder.categories_[i]])
                    else:
                        # For numeric features, use the original column names
                        feature_names.extend(cols)
                
                # Match feature importances with feature names
                importance = model.feature_importances_
                if len(importance) == len(feature_names):
                    feature_importance = {name: float(imp) for name, imp in zip(feature_names, importance)}
            
            # Prepare result
            result = {
                'model_id': model_id,
                'model_type': model_type,
                'task_type': task_type,
                'target_column': target_column,
                'feature_columns': feature_columns,
                'hyperparameters': model_params,
                'metrics': metrics,
                'feature_importance': feature_importance,
                'model_path': model_path,
                'class_names': class_names.tolist() if class_names is not None else None
            }
            
            return result
        except Exception as e:
            logger.error(f"Error training model: {str(e)}")
            raise

# Create a singleton instance
model_trainer = ModelTrainer()
