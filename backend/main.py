from fastapi import FastAPI, HTTPException, Depends, File, UploadFile, Form, BackgroundTasks, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import pandas as pd
import numpy as np
import os
import json
import uuid
import shutil
from datetime import datetime, timedelta
import logging

# ML libraries
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.linear_model import LogisticRegression, LinearRegression
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, r2_score, mean_squared_error

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(
    title="AI-Powered Data Automation Platform API",
    description="Backend API for the AI-Powered Data Automation Platform",
    version="0.1.0",
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create upload directory if it doesn't exist
UPLOAD_DIR = os.environ.get("UPLOAD_DIR", "./uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Import services
from services.database_service import db_service
from services.auth_service import auth_service

# Import routes
from routes.auth import router as auth_router
from routes.roles import router as roles_router
from routes.permissions import router as permissions_router
from routes.users import router as users_router

# Include routers - make sure auth router is properly included
app.include_router(auth_router, prefix="")  # Remove prefix to match frontend expectations
app.include_router(roles_router)
app.include_router(permissions_router)
app.include_router(users_router)

# Data models
class DatasetInfo(BaseModel):
    id: str
    name: str
    description: Optional[str] = None
    file_path: str
    file_type: str
    row_count: int
    column_count: int
    columns: Dict[str, str]  # column_name: data_type
    created_at: datetime

class ModelInfo(BaseModel):
    id: str
    name: str
    description: Optional[str] = None
    dataset_id: str
    model_type: str
    target_column: str
    feature_columns: List[str]
    hyperparameters: Optional[Dict[str, Any]] = None
    metrics: Optional[Dict[str, float]] = None
    status: str  # "training", "trained", "failed"
    created_at: datetime

class JobInfo(BaseModel):
    id: str
    type: str
    status: str
    params: Dict[str, Any]
    result: Optional[Dict[str, Any]] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

class DatasetUploadResponse(BaseModel):
    dataset_id: str
    message: str

class TrainingRequest(BaseModel):
    dataset_id: str
    model_type: str
    target_column: str
    feature_columns: List[str]
    hyperparameters: Optional[Dict[str, Any]] = None
    test_size: Optional[float] = 0.2

class PredictionRequest(BaseModel):
    model_id: str
    data: List[Dict[str, Any]]

class EDARequest(BaseModel):
    dataset_id: str
    columns: Optional[List[str]] = None

# Import sample dataset manager
from data_processing.sample_datasets import sample_dataset_manager

# Routes
@app.get("/")
async def root():
    return {"message": "AI-Powered Data Automation Platform API"}

# Dataset routes
@app.post("/datasets/upload", response_model=DatasetUploadResponse)
async def upload_dataset(
    file: UploadFile = File(...),
    name: str = Form(...),
    description: Optional[str] = Form(None),
):
    try:
        # Generate unique ID for dataset
        dataset_id = str(uuid.uuid4())

        # Save file
        file_extension = os.path.splitext(file.filename)[1]
        file_path = os.path.join(UPLOAD_DIR, f"{dataset_id}{file_extension}")

        with open(file_path, "wb") as f:
            content = await file.read()
            f.write(content)

        # Read dataset for metadata
        if file_extension.lower() == ".csv":
            df = pd.read_csv(file_path)
        elif file_extension.lower() in [".xls", ".xlsx"]:
            df = pd.read_excel(file_path)
        else:
            raise HTTPException(status_code=400, detail="Unsupported file format")

        # Create dataset info
        dataset_info = {
            "id": dataset_id,
            "name": name,
            "description": description,
            "file_path": file_path,
            "file_type": file_extension.lower()[1:],  # Remove the dot
            "row_count": len(df),
            "column_count": len(df.columns),
            "columns": {col: str(df[col].dtype) for col in df.columns},
            "created_at": datetime.now(),
        }

        # Store dataset info in database
        db_service.save_dataset(dataset_info)

        return DatasetUploadResponse(
            dataset_id=dataset_id,
            message="Dataset uploaded successfully",
        )
    except Exception as e:
        logger.error(f"Error uploading dataset: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error uploading dataset: {str(e)}")

@app.get("/datasets/{dataset_id}")
async def get_dataset(dataset_id: str):
    dataset = db_service.get_dataset(dataset_id)
    if not dataset:
        raise HTTPException(status_code=404, detail="Dataset not found")

    return dataset

@app.get("/datasets")
async def list_datasets():
    return db_service.list_datasets()

# Sample dataset routes
@app.get("/datasets/samples")
async def list_sample_datasets():
    """Get a list of available sample datasets"""
    try:
        return sample_dataset_manager.get_dataset_catalog()
    except Exception as e:
        logger.error(f"Error listing sample datasets: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error listing sample datasets: {str(e)}")

@app.get("/datasets/samples/{dataset_id}")
async def get_sample_dataset_info(dataset_id: str):
    """Get information about a specific sample dataset"""
    try:
        return sample_dataset_manager.get_dataset_info(dataset_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        logger.error(f"Error getting sample dataset info: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error getting sample dataset info: {str(e)}")

@app.get("/datasets/samples/{dataset_id}/preview")
async def preview_sample_dataset(dataset_id: str, rows: int = Query(10, ge=1, le=100)):
    """Preview a sample dataset"""
    try:
        df = sample_dataset_manager.get_dataset(dataset_id)
        return df.head(rows).to_dict(orient="records")
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        logger.error(f"Error previewing sample dataset: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error previewing sample dataset: {str(e)}")

@app.post("/datasets/samples/{dataset_id}/import")
async def import_sample_dataset(dataset_id: str, project_id: Optional[str] = None):
    """Import a sample dataset into the user's workspace"""
    try:
        # Get the sample dataset
        sample_info = sample_dataset_manager.get_dataset_info(dataset_id)
        df = sample_dataset_manager.get_dataset(dataset_id)

        # Generate unique ID for the imported dataset
        imported_dataset_id = str(uuid.uuid4())

        # Create a directory for the imported dataset if it doesn't exist
        imported_dir = os.path.join(UPLOAD_DIR, "imported")
        os.makedirs(imported_dir, exist_ok=True)

        # Save the dataset to the user's workspace
        file_extension = ".csv"  # Default to CSV for simplicity
        file_path = os.path.join(imported_dir, f"{imported_dataset_id}{file_extension}")

        # Save as CSV
        df.to_csv(file_path, index=False)

        # Create dataset info
        dataset_info = {
            "id": imported_dataset_id,
            "name": f"{sample_info['name']} (Sample)",
            "description": sample_info['description'],
            "file_path": file_path,
            "file_type": "csv",
            "row_count": len(df),
            "column_count": len(df.columns),
            "columns": {col: str(df[col].dtype) for col in df.columns},
            "created_at": datetime.now(),
        }

        # Store dataset info in database
        db_service.save_dataset(dataset_info)

        # If project_id is provided, associate dataset with project
        if project_id:
            # This would be implemented in a real application
            pass

        return {
            "dataset_id": imported_dataset_id,
            "message": "Sample dataset imported successfully",
            "name": dataset_info["name"],
            "row_count": dataset_info["row_count"],
            "column_count": dataset_info["column_count"]
        }
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        logger.error(f"Error importing sample dataset: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error importing sample dataset: {str(e)}")

# ML routes
@app.post("/ml/train")
async def train_model(request: TrainingRequest, background_tasks: BackgroundTasks):
    try:
        # Get dataset from database
        dataset_info = db_service.get_dataset(request.dataset_id)
        if not dataset_info:
            raise HTTPException(status_code=404, detail="Dataset not found")

        # Load dataset
        if dataset_info["file_type"] == "csv":
            df = pd.read_csv(dataset_info["file_path"])
        elif dataset_info["file_type"] in ["xls", "xlsx"]:
            df = pd.read_excel(dataset_info["file_path"])
        else:
            raise HTTPException(status_code=400, detail="Unsupported file format")

        # Validate columns
        for col in [request.target_column] + request.feature_columns:
            if col not in df.columns:
                raise HTTPException(status_code=400, detail=f"Column '{col}' not found in dataset")

        # Determine task type
        if pd.api.types.is_numeric_dtype(df[request.target_column]):
            task_type = "regression"
        else:
            task_type = "classification"

        # Create job
        job_id = str(uuid.uuid4())
        job_info = {
            "id": job_id,
            "type": "model_training",
            "status": "pending",
            "params": {
                "dataset_id": request.dataset_id,
                "model_type": request.model_type,
                "target_column": request.target_column,
                "feature_columns": request.feature_columns,
                "hyperparameters": request.hyperparameters,
                "test_size": request.test_size
            },
            "created_at": datetime.now()
        }

        # Save job to database
        db_service.save_job(job_info)

        # Train model in background
        background_tasks.add_task(
            train_model_task,
            job_id=job_id,
            df=df,
            target_column=request.target_column,
            feature_columns=request.feature_columns,
            model_type=request.model_type,
            task_type=task_type,
            hyperparameters=request.hyperparameters,
            test_size=request.test_size
        )

        return {"job_id": job_id, "message": "Model training started"}
    except Exception as e:
        logger.error(f"Error starting model training: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error starting model training: {str(e)}")

@app.post("/ml/predict")
async def predict(request: PredictionRequest):
    try:
        # Get model from database
        model_info = db_service.get_model(request.model_id)
        if not model_info:
            raise HTTPException(status_code=404, detail="Model not found")

        # Load model
        from ml.model_predictor import model_predictor

        # Make predictions
        result = model_predictor.predict(request.model_id, request.data)

        return result
    except Exception as e:
        logger.error(f"Error making predictions: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error making predictions: {str(e)}")

@app.get("/ml/models/{model_id}")
async def get_model(model_id: str):
    model = db_service.get_model(model_id)
    if not model:
        raise HTTPException(status_code=404, detail="Model not found")

    return model

@app.get("/ml/models")
async def list_models():
    return db_service.list_models()

# EDA routes
@app.post("/eda/analyze")
async def analyze_dataset(request: EDARequest):
    try:
        # Get dataset from database
        dataset_info = db_service.get_dataset(request.dataset_id)
        if not dataset_info:
            raise HTTPException(status_code=404, detail="Dataset not found")

        # Load dataset
        if dataset_info["file_type"] == "csv":
            df = pd.read_csv(dataset_info["file_path"])
        elif dataset_info["file_type"] in ["xls", "xlsx"]:
            df = pd.read_excel(dataset_info["file_path"])
        else:
            raise HTTPException(status_code=400, detail="Unsupported file format")

        # Filter columns if specified
        if request.columns:
            df = df[request.columns]

        # Generate EDA report
        from eda.automated_eda import automated_eda
        report = automated_eda.generate_eda_report(df)

        return report
    except Exception as e:
        logger.error(f"Error generating EDA report: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error generating EDA report: {str(e)}")

# AI suggestion routes
@app.post("/ai/suggestions/data-insights")
async def generate_data_insights(dataset_id: str = Form(...)):
    try:
        # Get dataset from database
        dataset_info = db_service.get_dataset(dataset_id)
        if not dataset_info:
            raise HTTPException(status_code=404, detail="Dataset not found")

        # Load dataset
        if dataset_info["file_type"] == "csv":
            df = pd.read_csv(dataset_info["file_path"])
        elif dataset_info["file_type"] in ["xls", "xlsx"]:
            df = pd.read_excel(dataset_info["file_path"])
        else:
            raise HTTPException(status_code=400, detail="Unsupported file format")

        # Generate data preview
        data_preview = df.head(10).to_string()

        # Generate dataset description
        dataset_description = f"""
        Dataset: {dataset_info["name"]}
        Rows: {dataset_info["row_count"]}
        Columns: {dataset_info["column_count"]}
        Column types: {json.dumps(dataset_info["columns"])}
        """

        # Generate insights
        from ai.gemini_client import gemini_client
        insights = await gemini_client.generate_data_insights(dataset_description, data_preview)

        return {"insights": insights}
    except Exception as e:
        logger.error(f"Error generating data insights: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error generating data insights: {str(e)}")

@app.post("/ai/suggestions/feature-engineering")
async def generate_feature_engineering_suggestions(
    dataset_id: str = Form(...),
    task_type: str = Form(...),
    target_variable: str = Form(...)
):
    try:
        # Get dataset from database
        dataset_info = db_service.get_dataset(dataset_id)
        if not dataset_info:
            raise HTTPException(status_code=404, detail="Dataset not found")

        # Load dataset
        if dataset_info["file_type"] == "csv":
            df = pd.read_csv(dataset_info["file_path"])
        elif dataset_info["file_type"] in ["xls", "xlsx"]:
            df = pd.read_excel(dataset_info["file_path"])
        else:
            raise HTTPException(status_code=400, detail="Unsupported file format")

        # Generate dataset profile
        from data_processing.data_processor import data_processor
        dataset_profile = data_processor.get_dataset_profile(df)

        # Generate suggestions
        from ai.gemini_client import gemini_client
        suggestions = await gemini_client.generate_feature_engineering_suggestions(
            dataset_profile, task_type, target_variable
        )

        return {"suggestions": suggestions}
    except Exception as e:
        logger.error(f"Error generating feature engineering suggestions: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error generating feature engineering suggestions: {str(e)}")

@app.post("/ai/suggestions/visualization")
async def generate_visualization_recommendations(
    dataset_id: str = Form(...),
    analysis_goal: str = Form(...)
):
    try:
        # Get dataset from database
        dataset_info = db_service.get_dataset(dataset_id)
        if not dataset_info:
            raise HTTPException(status_code=404, detail="Dataset not found")

        # Generate variable types
        variable_types = dataset_info["columns"]

        # Generate recommendations
        from ai.gemini_client import gemini_client
        recommendations = await gemini_client.generate_visualization_recommendations(
            variable_types, analysis_goal
        )

        return {"recommendations": recommendations}
    except Exception as e:
        logger.error(f"Error generating visualization recommendations: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error generating visualization recommendations: {str(e)}")

# Educational content routes
@app.post("/education/concept-explanation")
async def generate_concept_explanation(
    concept: str = Form(...),
    user_level: str = Form("intermediate"),
    context: Optional[str] = Form(None)
):
    try:
        from education.content_generator import content_generator
        explanation = await content_generator.generate_concept_explanation(
            concept, user_level, context
        )

        return explanation
    except Exception as e:
        logger.error(f"Error generating concept explanation: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error generating concept explanation: {str(e)}")

@app.post("/education/tutorial")
async def generate_tutorial(
    topic: str = Form(...),
    user_level: str = Form("intermediate"),
    context: Optional[str] = Form(None),
    interests: Optional[str] = Form(None)
):
    try:
        interests_list = interests.split(",") if interests else None

        from education.content_generator import content_generator
        tutorial = await content_generator.generate_tutorial(
            topic, user_level, context, interests_list
        )

        return tutorial
    except Exception as e:
        logger.error(f"Error generating tutorial: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error generating tutorial: {str(e)}")

# Helper functions
async def train_model_task(
    job_id: str,
    df: pd.DataFrame,
    target_column: str,
    feature_columns: List[str],
    model_type: str,
    task_type: str,
    hyperparameters: Optional[Dict[str, Any]] = None,
    test_size: float = 0.2
):
    try:
        # Get job from database
        job_info = db_service.get_job(job_id)
        if not job_info:
            logger.error(f"Job not found: {job_id}")
            return

        # Update job status
        job_info["status"] = "running"
        job_info["updated_at"] = datetime.now()
        db_service.save_job(job_info)

        # Train model
        from ml.model_trainer import model_trainer
        result = model_trainer.train_model(
            df=df,
            target_column=target_column,
            feature_columns=feature_columns,
            model_type=model_type,
            task_type=task_type,
            hyperparameters=hyperparameters,
            test_size=test_size
        )

        # Create model info
        model_id = result["model_id"]
        model_info = {
            "id": model_id,
            "name": f"{model_type} for {target_column}",
            "dataset_id": job_info["params"]["dataset_id"],
            "model_type": model_type,
            "target_column": target_column,
            "feature_columns": feature_columns,
            "hyperparameters": hyperparameters,
            "metrics": result["metrics"],
            "status": "trained",
            "created_at": datetime.now()
        }

        # Store model info in database
        db_service.save_model(model_info)

        # Update job status
        job_info["status"] = "completed"
        job_info["result"] = {
            "model_id": model_id,
            "metrics": result["metrics"]
        }
        job_info["updated_at"] = datetime.now()
        db_service.save_job(job_info)

        logger.info(f"Model training completed: {model_id}")
    except Exception as e:
        logger.error(f"Error in model training task: {str(e)}")

        try:
            # Get job from database
            job_info = db_service.get_job(job_id)
            if job_info:
                # Update job status
                job_info["status"] = "failed"
                job_info["result"] = {"error": str(e)}
                job_info["updated_at"] = datetime.now()
                db_service.save_job(job_info)
        except Exception as inner_e:
            logger.error(f"Error updating job status: {str(inner_e)}")
