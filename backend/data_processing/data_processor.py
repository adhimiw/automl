import pandas as pd
import numpy as np
import os
import json
import logging
from typing import Dict, List, Any, Optional, Tuple, Union
from sklearn.preprocessing import StandardScaler, MinMaxScaler, OneHotEncoder, LabelEncoder
from sklearn.impute import SimpleImputer
from sklearn.feature_selection import SelectKBest, f_classif, f_regression

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class DataProcessor:
    """Data processing class for handling various data operations."""
    
    def __init__(self):
        """Initialize the DataProcessor."""
        pass
    
    def load_dataset(self, file_path: str) -> pd.DataFrame:
        """Load a dataset from a file.
        
        Args:
            file_path: Path to the dataset file.
            
        Returns:
            Loaded DataFrame.
        """
        try:
            file_extension = os.path.splitext(file_path)[1].lower()
            
            if file_extension == '.csv':
                return pd.read_csv(file_path)
            elif file_extension in ['.xls', '.xlsx']:
                return pd.read_excel(file_path)
            elif file_extension == '.json':
                return pd.read_json(file_path)
            elif file_extension == '.parquet':
                return pd.read_parquet(file_path)
            else:
                raise ValueError(f"Unsupported file format: {file_extension}")
        except Exception as e:
            logger.error(f"Error loading dataset: {str(e)}")
            raise
    
    def get_dataset_profile(self, df: pd.DataFrame) -> Dict[str, Any]:
        """Generate a profile of the dataset.
        
        Args:
            df: Input DataFrame.
            
        Returns:
            Dictionary containing dataset profile information.
        """
        try:
            # Basic info
            profile = {
                "row_count": len(df),
                "column_count": len(df.columns),
                "columns": {},
                "missing_values": {},
                "numeric_stats": {},
                "categorical_stats": {},
                "correlations": {}
            }
            
            # Column types
            for col in df.columns:
                if pd.api.types.is_numeric_dtype(df[col]):
                    profile["columns"][col] = "numeric"
                elif pd.api.types.is_datetime64_dtype(df[col]):
                    profile["columns"][col] = "datetime"
                else:
                    profile["columns"][col] = "categorical"
            
            # Missing values
            for col in df.columns:
                missing_count = df[col].isna().sum()
                if missing_count > 0:
                    profile["missing_values"][col] = {
                        "count": int(missing_count),
                        "percentage": float(missing_count / len(df) * 100)
                    }
            
            # Numeric stats
            for col in df.columns:
                if profile["columns"][col] == "numeric":
                    profile["numeric_stats"][col] = {
                        "min": float(df[col].min()) if not pd.isna(df[col].min()) else None,
                        "max": float(df[col].max()) if not pd.isna(df[col].max()) else None,
                        "mean": float(df[col].mean()) if not pd.isna(df[col].mean()) else None,
                        "median": float(df[col].median()) if not pd.isna(df[col].median()) else None,
                        "std": float(df[col].std()) if not pd.isna(df[col].std()) else None
                    }
            
            # Categorical stats
            for col in df.columns:
                if profile["columns"][col] == "categorical":
                    value_counts = df[col].value_counts().head(10).to_dict()
                    profile["categorical_stats"][col] = {
                        "unique_count": int(df[col].nunique()),
                        "top_values": {str(k): int(v) for k, v in value_counts.items()}
                    }
            
            # Correlations (only for numeric columns)
            numeric_cols = [col for col in df.columns if profile["columns"][col] == "numeric"]
            if len(numeric_cols) > 1:
                corr_matrix = df[numeric_cols].corr().round(3)
                for col1 in numeric_cols:
                    profile["correlations"][col1] = {}
                    for col2 in numeric_cols:
                        if col1 != col2:
                            profile["correlations"][col1][col2] = float(corr_matrix.loc[col1, col2])
            
            return profile
        except Exception as e:
            logger.error(f"Error generating dataset profile: {str(e)}")
            raise
    
    def preprocess_data(
        self, 
        df: pd.DataFrame, 
        target_column: Optional[str] = None,
        categorical_columns: Optional[List[str]] = None,
        numeric_columns: Optional[List[str]] = None,
        impute_strategy: str = 'mean',
        scaling_method: Optional[str] = None,
        encoding_method: str = 'onehot'
    ) -> Tuple[pd.DataFrame, Dict[str, Any]]:
        """Preprocess the data for machine learning.
        
        Args:
            df: Input DataFrame.
            target_column: Name of the target column (if any).
            categorical_columns: List of categorical columns to encode.
            numeric_columns: List of numeric columns to scale.
            impute_strategy: Strategy for imputing missing values ('mean', 'median', 'most_frequent').
            scaling_method: Method for scaling numeric features ('standard', 'minmax', None).
            encoding_method: Method for encoding categorical features ('onehot', 'label').
            
        Returns:
            Tuple of (preprocessed DataFrame, preprocessing metadata).
        """
        try:
            # Make a copy of the DataFrame to avoid modifying the original
            processed_df = df.copy()
            
            # Metadata to store preprocessing information
            metadata = {
                "imputers": {},
                "scalers": {},
                "encoders": {},
                "feature_names": []
            }
            
            # Separate features and target
            if target_column:
                y = processed_df[target_column].copy()
                X = processed_df.drop(columns=[target_column])
            else:
                y = None
                X = processed_df.copy()
            
            # Automatically detect column types if not provided
            if categorical_columns is None:
                categorical_columns = [col for col in X.columns if not pd.api.types.is_numeric_dtype(X[col])]
            
            if numeric_columns is None:
                numeric_columns = [col for col in X.columns if pd.api.types.is_numeric_dtype(X[col])]
            
            # Handle missing values in numeric columns
            for col in numeric_columns:
                if X[col].isna().any():
                    imputer = SimpleImputer(strategy=impute_strategy)
                    X[col] = imputer.fit_transform(X[col].values.reshape(-1, 1)).flatten()
                    metadata["imputers"][col] = {
                        "strategy": impute_strategy,
                        "statistics": float(imputer.statistics_[0])
                    }
            
            # Handle missing values in categorical columns
            for col in categorical_columns:
                if X[col].isna().any():
                    imputer = SimpleImputer(strategy='most_frequent')
                    X[col] = imputer.fit_transform(X[col].values.reshape(-1, 1)).flatten()
                    metadata["imputers"][col] = {
                        "strategy": "most_frequent",
                        "statistics": str(imputer.statistics_[0])
                    }
            
            # Scale numeric features
            if scaling_method:
                for col in numeric_columns:
                    if scaling_method == 'standard':
                        scaler = StandardScaler()
                    elif scaling_method == 'minmax':
                        scaler = MinMaxScaler()
                    else:
                        raise ValueError(f"Unsupported scaling method: {scaling_method}")
                    
                    X[col] = scaler.fit_transform(X[col].values.reshape(-1, 1)).flatten()
                    metadata["scalers"][col] = {
                        "method": scaling_method,
                        "params": {
                            "mean": float(scaler.mean_[0]) if hasattr(scaler, 'mean_') else None,
                            "scale": float(scaler.scale_[0]) if hasattr(scaler, 'scale_') else None,
                            "min": float(scaler.data_min_[0]) if hasattr(scaler, 'data_min_') else None,
                            "max": float(scaler.data_max_[0]) if hasattr(scaler, 'data_max_') else None
                        }
                    }
            
            # Encode categorical features
            encoded_columns = []
            for col in categorical_columns:
                if encoding_method == 'onehot':
                    encoder = OneHotEncoder(sparse=False, handle_unknown='ignore')
                    encoded = encoder.fit_transform(X[col].values.reshape(-1, 1))
                    encoded_df = pd.DataFrame(
                        encoded, 
                        columns=[f"{col}_{cat}" for cat in encoder.categories_[0]],
                        index=X.index
                    )
                    X = X.drop(columns=[col])
                    X = pd.concat([X, encoded_df], axis=1)
                    encoded_columns.extend(encoded_df.columns)
                    
                    metadata["encoders"][col] = {
                        "method": "onehot",
                        "categories": [str(cat) for cat in encoder.categories_[0]]
                    }
                elif encoding_method == 'label':
                    encoder = LabelEncoder()
                    X[col] = encoder.fit_transform(X[col])
                    encoded_columns.append(col)
                    
                    metadata["encoders"][col] = {
                        "method": "label",
                        "classes": [str(cls) for cls in encoder.classes_]
                    }
                else:
                    raise ValueError(f"Unsupported encoding method: {encoding_method}")
            
            # Store feature names
            metadata["feature_names"] = list(X.columns)
            
            # Recombine with target if provided
            if target_column:
                processed_df = pd.concat([X, y], axis=1)
            else:
                processed_df = X
            
            return processed_df, metadata
        except Exception as e:
            logger.error(f"Error preprocessing data: {str(e)}")
            raise

# Create a singleton instance
data_processor = DataProcessor()
