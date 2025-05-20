import os
import json
import logging
from typing import Dict, Any, Optional, List
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configure Gemini API
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    logger.warning("GEMINI_API_KEY not found in environment variables")

genai.configure(api_key=GEMINI_API_KEY)

class GeminiClient:
    def __init__(self, model_name: str = "gemini-pro"):
        """Initialize the Gemini client.
        
        Args:
            model_name: The name of the Gemini model to use.
        """
        self.model_name = model_name
        self.model = genai.GenerativeModel(model_name)
    
    async def generate_content(self, prompt: str, temperature: float = 0.7, max_output_tokens: int = 1024) -> str:
        """Generate content using the Gemini API.
        
        Args:
            prompt: The prompt to send to the model.
            temperature: Controls randomness. Lower values are more deterministic.
            max_output_tokens: Maximum number of tokens to generate.
            
        Returns:
            The generated text.
        """
        try:
            generation_config = {
                "temperature": temperature,
                "max_output_tokens": max_output_tokens,
                "top_p": 0.95,
                "top_k": 40,
            }
            
            response = self.model.generate_content(
                prompt,
                generation_config=generation_config
            )
            
            return response.text
        except Exception as e:
            logger.error(f"Error generating content with Gemini: {str(e)}")
            raise
    
    async def generate_data_insights(self, dataset_description: str, data_preview: str) -> str:
        """Generate insights about a dataset.
        
        Args:
            dataset_description: Description of the dataset.
            data_preview: Preview of the dataset (e.g., first few rows).
            
        Returns:
            Generated insights about the dataset.
        """
        prompt = f"""
        You are an expert data analyst. Analyze the following dataset and provide valuable insights.
        
        Dataset Description:
        {dataset_description}
        
        Data Preview:
        {data_preview}
        
        Please provide:
        1. A summary of the dataset
        2. Key patterns or trends you notice
        3. Potential correlations between variables
        4. Anomalies or outliers that should be investigated
        5. Recommendations for further analysis
        
        Format your response in markdown.
        """
        
        return await self.generate_content(prompt, temperature=0.3, max_output_tokens=2048)
    
    async def generate_feature_engineering_suggestions(
        self, dataset_profile: Dict[str, Any], task_type: str, target_variable: str
    ) -> str:
        """Generate feature engineering suggestions.
        
        Args:
            dataset_profile: Profile of the dataset.
            task_type: Type of ML task (classification, regression, etc.).
            target_variable: Target variable for prediction.
            
        Returns:
            Generated feature engineering suggestions.
        """
        prompt = f"""
        Based on this dataset profile:
        {json.dumps(dataset_profile, indent=2)}
        
        For a {task_type} task predicting {target_variable}, suggest:
        1. Useful feature transformations
        2. Potential new features to engineer
        3. Features that might be redundant or uninformative
        4. Preprocessing steps to improve model performance
        
        Provide specific code examples for each suggestion.
        """
        
        return await self.generate_content(prompt, temperature=0.2, max_output_tokens=2048)
    
    async def generate_visualization_recommendations(
        self, variable_types: Dict[str, str], analysis_goal: str
    ) -> str:
        """Generate visualization recommendations.
        
        Args:
            variable_types: Dictionary mapping variable names to their types.
            analysis_goal: The goal of the analysis.
            
        Returns:
            Generated visualization recommendations.
        """
        prompt = f"""
        Recommend data visualizations for these variables:
        {json.dumps(variable_types, indent=2)}
        
        The analysis goal is: {analysis_goal}
        
        For each recommendation:
        1. Specify the visualization type
        2. Explain why it's appropriate for these variables and goal
        3. Suggest design considerations (colors, layout, annotations)
        4. Note any potential alternative visualizations
        5. Provide a code example using Plotly or Matplotlib
        """
        
        return await self.generate_content(prompt, temperature=0.4, max_output_tokens=2048)

# Create a singleton instance
gemini_client = GeminiClient()
