# AI-Powered Data Automation Platform - Backend

This is the FastAPI backend for the AI-Powered Data Automation Platform. It provides APIs for data processing, machine learning, and educational content generation.

## Features

- Data ingestion and preprocessing
- Machine learning model training and prediction
- Automated exploratory data analysis (EDA)
- AI-powered suggestions using Google's Gemini API
- Educational content generation

## Getting Started

### Prerequisites

- Python 3.9+
- pip
- Google Gemini API key

### Installation

1. Clone the repository
2. Navigate to the backend directory
3. Run the setup script:

```bash
chmod +x setup.sh
./setup.sh
```

4. Install dependencies:

```bash
pip install -r requirements.txt
```

5. Update the `.env` file with your Gemini API key

### Running the Server

```bash
uvicorn main:app --reload
```

The API will be available at http://localhost:8000

## API Documentation

Once the server is running, you can access the API documentation at:

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## API Endpoints

### Data Management

- `POST /datasets/upload`: Upload a new dataset
- `GET /datasets/{dataset_id}`: Get dataset information
- `GET /datasets`: List all datasets

### Machine Learning

- `POST /ml/train`: Train a machine learning model
- `POST /ml/predict`: Make predictions using a trained model
- `GET /ml/models/{model_id}`: Get model information
- `GET /ml/models`: List all models

### Exploratory Data Analysis

- `POST /eda/analyze`: Generate an EDA report for a dataset

### AI Suggestions

- `POST /ai/suggestions/data-insights`: Generate insights for a dataset
- `POST /ai/suggestions/feature-engineering`: Generate feature engineering suggestions
- `POST /ai/suggestions/visualization`: Generate visualization recommendations

### Educational Content

- `POST /education/concept-explanation`: Generate explanation for a data science concept
- `POST /education/tutorial`: Generate a tutorial for a data science topic

## Project Structure

- `main.py`: Main application file with FastAPI routes
- `ai/`: Gemini API integration
- `data_processing/`: Data processing utilities
- `ml/`: Machine learning model training and prediction
- `eda/`: Automated exploratory data analysis
- `education/`: Educational content generation

## Docker

You can also run the backend using Docker:

```bash
docker build -t data-automation-backend .
docker run -p 8000:8000 data-automation-backend
```

Or using docker-compose from the root directory:

```bash
docker-compose up
```
