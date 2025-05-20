import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import plotly.express as px
import plotly.graph_objects as go
import plotly.io as pio
import json
import base64
import io
import logging
from typing import Dict, List, Any, Optional, Tuple, Union
from scipy import stats

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class AutomatedEDA:
    """Automated Exploratory Data Analysis class."""
    
    def __init__(self):
        """Initialize the AutomatedEDA."""
        # Set default plot style
        sns.set(style="whitegrid")
        plt.rcParams["figure.figsize"] = (10, 6)
        
        # Set plotly renderer
        pio.renderers.default = "json"
    
    def generate_eda_report(self, df: pd.DataFrame, target_column: Optional[str] = None) -> Dict[str, Any]:
        """Generate a comprehensive EDA report.
        
        Args:
            df: Input DataFrame.
            target_column: Name of the target column (if any).
            
        Returns:
            Dictionary containing EDA results and visualizations.
        """
        try:
            # Initialize report
            report = {
                "dataset_info": self._get_dataset_info(df),
                "missing_values": self._analyze_missing_values(df),
                "numeric_analysis": self._analyze_numeric_columns(df),
                "categorical_analysis": self._analyze_categorical_columns(df),
                "correlation_analysis": self._analyze_correlations(df),
                "visualizations": {}
            }
            
            # Add target-specific analysis if target column is provided
            if target_column:
                report["target_analysis"] = self._analyze_target(df, target_column)
            
            # Generate visualizations
            report["visualizations"] = self._generate_visualizations(df, target_column)
            
            return report
        except Exception as e:
            logger.error(f"Error generating EDA report: {str(e)}")
            raise
    
    def _get_dataset_info(self, df: pd.DataFrame) -> Dict[str, Any]:
        """Get basic information about the dataset.
        
        Args:
            df: Input DataFrame.
            
        Returns:
            Dictionary containing dataset information.
        """
        info = {
            "row_count": len(df),
            "column_count": len(df.columns),
            "memory_usage": df.memory_usage(deep=True).sum(),
            "column_types": df.dtypes.astype(str).to_dict(),
            "numeric_columns": list(df.select_dtypes(include=np.number).columns),
            "categorical_columns": list(df.select_dtypes(include=["object", "category"]).columns),
            "datetime_columns": list(df.select_dtypes(include=["datetime", "timedelta"]).columns),
            "boolean_columns": list(df.select_dtypes(include=["bool"]).columns)
        }
        
        return info
    
    def _analyze_missing_values(self, df: pd.DataFrame) -> Dict[str, Any]:
        """Analyze missing values in the dataset.
        
        Args:
            df: Input DataFrame.
            
        Returns:
            Dictionary containing missing value analysis.
        """
        missing = {
            "total_missing": int(df.isna().sum().sum()),
            "missing_percentage": float(df.isna().sum().sum() / (df.shape[0] * df.shape[1]) * 100),
            "columns_with_missing": {}
        }
        
        # Analyze missing values by column
        for col in df.columns:
            missing_count = df[col].isna().sum()
            if missing_count > 0:
                missing["columns_with_missing"][col] = {
                    "count": int(missing_count),
                    "percentage": float(missing_count / len(df) * 100)
                }
        
        return missing
    
    def _analyze_numeric_columns(self, df: pd.DataFrame) -> Dict[str, Dict[str, Any]]:
        """Analyze numeric columns in the dataset.
        
        Args:
            df: Input DataFrame.
            
        Returns:
            Dictionary containing numeric column analysis.
        """
        numeric_analysis = {}
        
        # Get numeric columns
        numeric_cols = df.select_dtypes(include=np.number).columns
        
        for col in numeric_cols:
            stats = df[col].describe().to_dict()
            
            # Add additional statistics
            stats["skewness"] = float(df[col].skew())
            stats["kurtosis"] = float(df[col].kurtosis())
            
            # Check for outliers using IQR method
            q1 = stats["25%"]
            q3 = stats["75%"]
            iqr = q3 - q1
            lower_bound = q1 - 1.5 * iqr
            upper_bound = q3 + 1.5 * iqr
            outliers = df[(df[col] < lower_bound) | (df[col] > upper_bound)][col]
            
            stats["outliers"] = {
                "count": len(outliers),
                "percentage": float(len(outliers) / len(df) * 100),
                "lower_bound": float(lower_bound),
                "upper_bound": float(upper_bound)
            }
            
            # Check for normality using Shapiro-Wilk test
            # Only use a sample if the dataset is large
            if len(df) > 5000:
                sample = df[col].dropna().sample(5000, random_state=42)
            else:
                sample = df[col].dropna()
            
            if len(sample) > 3:  # Shapiro-Wilk test requires at least 3 samples
                try:
                    shapiro_test = stats.shapiro(sample)
                    stats["normality_test"] = {
                        "test": "shapiro",
                        "statistic": float(shapiro_test[0]),
                        "p_value": float(shapiro_test[1]),
                        "is_normal": float(shapiro_test[1]) > 0.05
                    }
                except:
                    # If Shapiro-Wilk test fails, skip normality test
                    stats["normality_test"] = None
            else:
                stats["normality_test"] = None
            
            numeric_analysis[col] = stats
        
        return numeric_analysis
    
    def _analyze_categorical_columns(self, df: pd.DataFrame) -> Dict[str, Dict[str, Any]]:
        """Analyze categorical columns in the dataset.
        
        Args:
            df: Input DataFrame.
            
        Returns:
            Dictionary containing categorical column analysis.
        """
        categorical_analysis = {}
        
        # Get categorical columns
        cat_cols = df.select_dtypes(include=["object", "category"]).columns
        
        for col in cat_cols:
            value_counts = df[col].value_counts()
            
            analysis = {
                "unique_count": int(df[col].nunique()),
                "top_values": value_counts.head(10).to_dict(),
                "entropy": float(stats.entropy(value_counts.values) if len(value_counts) > 0 else 0),
                "is_binary": df[col].nunique() == 2
            }
            
            # If binary, identify the two values
            if analysis["is_binary"]:
                analysis["binary_values"] = list(df[col].dropna().unique())
            
            categorical_analysis[col] = analysis
        
        return categorical_analysis
    
    def _analyze_correlations(self, df: pd.DataFrame) -> Dict[str, Any]:
        """Analyze correlations between columns.
        
        Args:
            df: Input DataFrame.
            
        Returns:
            Dictionary containing correlation analysis.
        """
        correlation_analysis = {
            "pearson": {},
            "spearman": {},
            "highly_correlated_pairs": []
        }
        
        # Get numeric columns
        numeric_cols = df.select_dtypes(include=np.number).columns
        
        if len(numeric_cols) > 1:
            # Calculate Pearson correlation
            pearson_corr = df[numeric_cols].corr(method="pearson").round(3)
            correlation_analysis["pearson"] = pearson_corr.to_dict()
            
            # Calculate Spearman correlation
            spearman_corr = df[numeric_cols].corr(method="spearman").round(3)
            correlation_analysis["spearman"] = spearman_corr.to_dict()
            
            # Find highly correlated pairs
            corr_matrix = pearson_corr.abs()
            upper_tri = corr_matrix.where(np.triu(np.ones(corr_matrix.shape), k=1).astype(bool))
            
            for col1 in upper_tri.columns:
                for col2 in upper_tri.index:
                    corr_value = upper_tri.loc[col2, col1]
                    if not pd.isna(corr_value) and corr_value > 0.7:
                        correlation_analysis["highly_correlated_pairs"].append({
                            "column1": col1,
                            "column2": col2,
                            "correlation": float(corr_value)
                        })
        
        return correlation_analysis
    
    def _analyze_target(self, df: pd.DataFrame, target_column: str) -> Dict[str, Any]:
        """Analyze the target column and its relationship with other columns.
        
        Args:
            df: Input DataFrame.
            target_column: Name of the target column.
            
        Returns:
            Dictionary containing target analysis.
        """
        target_analysis = {
            "column": target_column,
            "type": "numeric" if pd.api.types.is_numeric_dtype(df[target_column]) else "categorical",
            "correlations": {},
            "feature_importance": {}
        }
        
        # If target is numeric, calculate correlations with other numeric columns
        if target_analysis["type"] == "numeric":
            numeric_cols = [col for col in df.select_dtypes(include=np.number).columns if col != target_column]
            
            for col in numeric_cols:
                corr = df[[target_column, col]].corr().loc[target_column, col]
                target_analysis["correlations"][col] = float(corr)
            
            # Sort correlations by absolute value
            target_analysis["correlations"] = {
                k: v for k, v in sorted(
                    target_analysis["correlations"].items(), 
                    key=lambda item: abs(item[1]), 
                    reverse=True
                )
            }
        
        # If target is categorical, calculate feature importance using mutual information
        else:
            from sklearn.feature_selection import mutual_info_classif
            
            # Get numeric features
            numeric_cols = df.select_dtypes(include=np.number).columns
            
            if len(numeric_cols) > 0:
                # Calculate mutual information
                X = df[numeric_cols]
                y = df[target_column]
                
                # Handle missing values
                X = X.fillna(X.mean())
                y = y.fillna(y.mode()[0])
                
                try:
                    mi = mutual_info_classif(X, y)
                    
                    # Create feature importance dictionary
                    for i, col in enumerate(numeric_cols):
                        target_analysis["feature_importance"][col] = float(mi[i])
                    
                    # Sort by importance
                    target_analysis["feature_importance"] = {
                        k: v for k, v in sorted(
                            target_analysis["feature_importance"].items(), 
                            key=lambda item: item[1], 
                            reverse=True
                        )
                    }
                except:
                    # If mutual information calculation fails, skip it
                    pass
        
        return target_analysis
    
    def _generate_visualizations(self, df: pd.DataFrame, target_column: Optional[str] = None) -> Dict[str, Any]:
        """Generate visualizations for the dataset.
        
        Args:
            df: Input DataFrame.
            target_column: Name of the target column (if any).
            
        Returns:
            Dictionary containing visualizations.
        """
        visualizations = {
            "distribution_plots": {},
            "correlation_plots": {},
            "categorical_plots": {},
            "target_plots": {}
        }
        
        # Generate distribution plots for numeric columns
        numeric_cols = df.select_dtypes(include=np.number).columns
        
        for col in numeric_cols[:10]:  # Limit to first 10 columns to avoid too many plots
            fig = px.histogram(df, x=col, marginal="box", title=f"Distribution of {col}")
            visualizations["distribution_plots"][col] = pio.to_json(fig)
        
        # Generate correlation heatmap
        if len(numeric_cols) > 1:
            corr_matrix = df[numeric_cols].corr()
            fig = px.imshow(
                corr_matrix, 
                title="Correlation Heatmap",
                labels=dict(color="Correlation"),
                x=corr_matrix.columns,
                y=corr_matrix.columns,
                color_continuous_scale="RdBu_r"
            )
            visualizations["correlation_plots"]["heatmap"] = pio.to_json(fig)
        
        # Generate bar plots for categorical columns
        cat_cols = df.select_dtypes(include=["object", "category"]).columns
        
        for col in cat_cols[:10]:  # Limit to first 10 columns
            value_counts = df[col].value_counts().head(10)
            fig = px.bar(
                x=value_counts.index, 
                y=value_counts.values,
                title=f"Top 10 values for {col}",
                labels={"x": col, "y": "Count"}
            )
            visualizations["categorical_plots"][col] = pio.to_json(fig)
        
        # Generate target-related plots if target column is provided
        if target_column:
            if target_column in numeric_cols:
                # Target is numeric
                
                # Histogram of target
                fig = px.histogram(
                    df, 
                    x=target_column,
                    title=f"Distribution of {target_column}",
                    marginal="box"
                )
                visualizations["target_plots"]["distribution"] = pio.to_json(fig)
                
                # Scatter plots with top correlated features
                corr_with_target = df[numeric_cols].corr()[target_column].abs().sort_values(ascending=False)
                top_features = corr_with_target.index[1:4]  # Top 3 features excluding target itself
                
                for feature in top_features:
                    fig = px.scatter(
                        df, 
                        x=feature, 
                        y=target_column,
                        title=f"{feature} vs {target_column}",
                        trendline="ols"
                    )
                    visualizations["target_plots"][f"{feature}_scatter"] = pio.to_json(fig)
            
            else:
                # Target is categorical
                
                # Bar plot of target distribution
                value_counts = df[target_column].value_counts()
                fig = px.bar(
                    x=value_counts.index, 
                    y=value_counts.values,
                    title=f"Distribution of {target_column}",
                    labels={"x": target_column, "y": "Count"}
                )
                visualizations["target_plots"]["distribution"] = pio.to_json(fig)
                
                # Box plots for numeric features grouped by target
                for col in numeric_cols[:3]:  # Top 3 numeric features
                    fig = px.box(
                        df, 
                        x=target_column, 
                        y=col,
                        title=f"{col} by {target_column}"
                    )
                    visualizations["target_plots"][f"{col}_box"] = pio.to_json(fig)
        
        return visualizations

# Create a singleton instance
automated_eda = AutomatedEDA()
