import logging
import json
from typing import Dict, List, Any, Optional, Tuple, Union
from ..ai.gemini_client import gemini_client

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class EducationalContentGenerator:
    """Educational content generator class."""
    
    def __init__(self):
        """Initialize the EducationalContentGenerator."""
        pass
    
    async def generate_concept_explanation(
        self, 
        concept: str, 
        user_level: str = "intermediate",
        context: Optional[str] = None
    ) -> Dict[str, Any]:
        """Generate an explanation for a data science concept.
        
        Args:
            concept: The concept to explain.
            user_level: User expertise level ('beginner', 'intermediate', 'advanced').
            context: Additional context for the explanation.
            
        Returns:
            Dictionary containing the explanation and related information.
        """
        try:
            # Craft prompt for Gemini API
            prompt = f"""
            You are an expert data science educator. Explain the concept of "{concept}" for a {user_level} level user.
            
            Context where this explanation is needed:
            {context or "General understanding of the concept"}
            
            Please provide:
            1. A clear explanation of {concept} appropriate for {user_level} level
            2. 2-3 practical examples that illustrate the concept
            3. A suggestion for how to visualize this concept (describe the visualization)
            4. 2-3 related concepts that would be helpful to understand
            5. Common misconceptions about this concept
            
            Format your response as JSON with the following structure:
            {{
                "explanation": "Main explanation text",
                "examples": ["Example 1", "Example 2", ...],
                "visualization": "Description of visualization",
                "related_concepts": ["Concept 1", "Concept 2", ...],
                "misconceptions": ["Misconception 1", "Misconception 2", ...]
            }}
            """
            
            # Generate explanation using Gemini API
            response_text = await gemini_client.generate_content(
                prompt, 
                temperature=0.3,
                max_output_tokens=1024
            )
            
            # Parse JSON response
            try:
                # Try to parse the response as JSON
                explanation = json.loads(response_text)
            except json.JSONDecodeError:
                # If parsing fails, extract information using simple text processing
                explanation = self._extract_explanation_from_text(response_text, concept)
            
            # Add metadata
            explanation["concept"] = concept
            explanation["user_level"] = user_level
            
            return explanation
        except Exception as e:
            logger.error(f"Error generating concept explanation: {str(e)}")
            raise
    
    def _extract_explanation_from_text(self, text: str, concept: str) -> Dict[str, Any]:
        """Extract explanation information from text when JSON parsing fails.
        
        Args:
            text: The text to extract information from.
            concept: The concept being explained.
            
        Returns:
            Dictionary containing extracted information.
        """
        # Initialize result
        result = {
            "concept": concept,
            "explanation": "",
            "examples": [],
            "visualization": "",
            "related_concepts": [],
            "misconceptions": []
        }
        
        # Extract explanation (everything before "Examples" or similar heading)
        explanation_text = text.split("Examples")[0].split("Example")[0].split("Practical examples")[0]
        result["explanation"] = explanation_text.strip()
        
        # Extract examples
        if "Example" in text or "Examples" in text:
            examples_section = text.split("Example")[1] if "Example" in text else text.split("Examples")[1]
            examples_section = examples_section.split("Visualization")[0].split("Related concepts")[0].split("Misconceptions")[0]
            
            # Split by numbered list items or bullet points
            examples = []
            for line in examples_section.split("\n"):
                line = line.strip()
                if line.startswith("1.") or line.startswith("2.") or line.startswith("3.") or line.startswith("-") or line.startswith("*"):
                    examples.append(line.lstrip("123.-* "))
            
            result["examples"] = examples if examples else [examples_section.strip()]
        
        # Extract visualization
        if "Visualization" in text:
            vis_section = text.split("Visualization")[1].split("Related concepts")[0].split("Misconceptions")[0]
            result["visualization"] = vis_section.strip()
        
        # Extract related concepts
        if "Related concepts" in text:
            related_section = text.split("Related concepts")[1].split("Misconceptions")[0]
            
            # Split by numbered list items or bullet points
            related = []
            for line in related_section.split("\n"):
                line = line.strip()
                if line.startswith("1.") or line.startswith("2.") or line.startswith("3.") or line.startswith("-") or line.startswith("*"):
                    related.append(line.lstrip("123.-* "))
            
            result["related_concepts"] = related if related else [related_section.strip()]
        
        # Extract misconceptions
        if "Misconceptions" in text:
            misconceptions_section = text.split("Misconceptions")[1]
            
            # Split by numbered list items or bullet points
            misconceptions = []
            for line in misconceptions_section.split("\n"):
                line = line.strip()
                if line.startswith("1.") or line.startswith("2.") or line.startswith("3.") or line.startswith("-") or line.startswith("*"):
                    misconceptions.append(line.lstrip("123.-* "))
            
            result["misconceptions"] = misconceptions if misconceptions else [misconceptions_section.strip()]
        
        return result
    
    async def generate_tutorial(
        self, 
        topic: str, 
        user_level: str = "intermediate",
        context: Optional[str] = None,
        interests: Optional[List[str]] = None
    ) -> Dict[str, Any]:
        """Generate a step-by-step tutorial for a data science topic.
        
        Args:
            topic: The topic for the tutorial.
            user_level: User expertise level ('beginner', 'intermediate', 'advanced').
            context: Additional context for the tutorial.
            interests: User interests to tailor the tutorial.
            
        Returns:
            Dictionary containing the tutorial and related information.
        """
        try:
            # Craft prompt for Gemini API
            prompt = f"""
            You are an expert data science educator. Create a step-by-step tutorial on "{topic}" for a {user_level} level user.
            
            User interests: {', '.join(interests) if interests else "General data science"}
            Context: {context or "General learning"}
            
            Please provide:
            1. A title for this tutorial
            2. A brief description of what the user will learn
            3. Prerequisites the user should know before starting
            4. 5-7 clear, logical steps to complete the task, each with:
               - Step title
               - Detailed explanation
               - Code example where appropriate
               - Explanation of how the code works
            5. 2-3 exercises for the user to practice
            6. Suggestions for further learning
            
            Format your response as JSON with the following structure:
            {{
                "title": "Tutorial title",
                "description": "Brief description",
                "prerequisites": ["Prerequisite 1", "Prerequisite 2", ...],
                "steps": [
                    {{
                        "title": "Step 1 title",
                        "explanation": "Step 1 explanation",
                        "code": "Step 1 code example",
                        "code_explanation": "Explanation of how the code works"
                    }},
                    ...
                ],
                "exercises": ["Exercise 1", "Exercise 2", ...],
                "further_learning": ["Topic 1", "Topic 2", ...]
            }}
            """
            
            # Generate tutorial using Gemini API
            response_text = await gemini_client.generate_content(
                prompt, 
                temperature=0.4,
                max_output_tokens=2048
            )
            
            # Parse JSON response
            try:
                # Try to parse the response as JSON
                tutorial = json.loads(response_text)
            except json.JSONDecodeError:
                # If parsing fails, extract information using simple text processing
                tutorial = self._extract_tutorial_from_text(response_text, topic)
            
            # Add metadata
            tutorial["topic"] = topic
            tutorial["user_level"] = user_level
            
            return tutorial
        except Exception as e:
            logger.error(f"Error generating tutorial: {str(e)}")
            raise
    
    def _extract_tutorial_from_text(self, text: str, topic: str) -> Dict[str, Any]:
        """Extract tutorial information from text when JSON parsing fails.
        
        Args:
            text: The text to extract information from.
            topic: The tutorial topic.
            
        Returns:
            Dictionary containing extracted information.
        """
        # Initialize result
        result = {
            "topic": topic,
            "title": f"Tutorial on {topic}",
            "description": "",
            "prerequisites": [],
            "steps": [],
            "exercises": [],
            "further_learning": []
        }
        
        # Extract title
        if "# " in text:
            result["title"] = text.split("# ")[1].split("\n")[0].strip()
        
        # Extract description
        if "## Description" in text:
            description_section = text.split("## Description")[1].split("##")[0]
            result["description"] = description_section.strip()
        elif "## Introduction" in text:
            description_section = text.split("## Introduction")[1].split("##")[0]
            result["description"] = description_section.strip()
        
        # Extract prerequisites
        if "## Prerequisites" in text:
            prereq_section = text.split("## Prerequisites")[1].split("##")[0]
            
            # Split by numbered list items or bullet points
            prereqs = []
            for line in prereq_section.split("\n"):
                line = line.strip()
                if line.startswith("-") or line.startswith("*") or line.startswith("1.") or line.startswith("2."):
                    prereqs.append(line.lstrip("123.-* "))
            
            result["prerequisites"] = prereqs if prereqs else [prereq_section.strip()]
        
        # Extract steps
        step_sections = []
        if "## Step " in text:
            parts = text.split("## Step ")
            for i in range(1, len(parts)):
                step_sections.append("Step " + parts[i])
        elif "### Step " in text:
            parts = text.split("### Step ")
            for i in range(1, len(parts)):
                step_sections.append("Step " + parts[i])
        
        for section in step_sections:
            step = {
                "title": "",
                "explanation": "",
                "code": "",
                "code_explanation": ""
            }
            
            # Extract step title
            step["title"] = section.split("\n")[0].strip()
            
            # Extract explanation (everything before code block)
            if "```" in section:
                explanation_text = section.split("```")[0]
                step["explanation"] = explanation_text.strip()
                
                # Extract code
                code_parts = section.split("```")
                if len(code_parts) >= 3:
                    step["code"] = code_parts[1].strip()
                
                # Extract code explanation (everything after code block)
                if len(code_parts) >= 3:
                    step["code_explanation"] = code_parts[2].strip()
            else:
                step["explanation"] = section.strip()
            
            result["steps"].append(step)
        
        # Extract exercises
        if "## Exercises" in text:
            exercises_section = text.split("## Exercises")[1].split("##")[0]
            
            # Split by numbered list items or bullet points
            exercises = []
            for line in exercises_section.split("\n"):
                line = line.strip()
                if line.startswith("-") or line.startswith("*") or line.startswith("1.") or line.startswith("2."):
                    exercises.append(line.lstrip("123.-* "))
            
            result["exercises"] = exercises if exercises else [exercises_section.strip()]
        
        # Extract further learning
        if "## Further Learning" in text:
            learning_section = text.split("## Further Learning")[1]
            
            # Split by numbered list items or bullet points
            learning = []
            for line in learning_section.split("\n"):
                line = line.strip()
                if line.startswith("-") or line.startswith("*") or line.startswith("1.") or line.startswith("2."):
                    learning.append(line.lstrip("123.-* "))
            
            result["further_learning"] = learning if learning else [learning_section.strip()]
        
        return result

# Create a singleton instance
content_generator = EducationalContentGenerator()
