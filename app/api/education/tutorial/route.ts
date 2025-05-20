import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { parseUserId } from "@/lib/utils/user-id"

// OpenAI API key (if available)
const OPENAI_API_KEY = process.env.OPENAI_API_KEY

// Gemini API key (if available)
const GEMINI_API_KEY = process.env.GEMINI_API_KEY

export async function GET(request: Request) {
  try {
    // Get query parameters
    const url = new URL(request.url)
    const topic = url.searchParams.get("topic")
    const difficulty = url.searchParams.get("difficulty") || "beginner"

    // Validate input
    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 })
    }

    // Check if we have an API key for AI services
    if (!OPENAI_API_KEY && !GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "AI service is not configured. Please add an API key to the environment variables." },
        { status: 503 }
      )
    }

    // Get user session (optional)
    const session = await getServerSession()
    const userId = session?.user ? parseUserId(session.user.id) : null

    // Generate tutorial based on the topic and difficulty
    // This is a placeholder - in a real implementation, you would call an AI service
    const tutorial = generateBasicTutorial(topic, difficulty as any)

    // Log the request if user is authenticated
    if (userId) {
      // In a real implementation, you would log this to the database
      console.log(`User ${userId} requested tutorial for ${topic} (${difficulty})`)
    }

    return NextResponse.json(tutorial)
  } catch (error) {
    console.error("Error generating tutorial:", error)
    return NextResponse.json({ error: "Failed to generate tutorial" }, { status: 500 })
  }
}

/**
 * Generate a basic tutorial for a topic
 * @param topic Topic to create tutorial for
 * @param difficulty Difficulty level
 * @returns Tutorial object
 */
function generateBasicTutorial(
  topic: string,
  difficulty: "beginner" | "intermediate" | "advanced"
): any {
  // This is a placeholder - in a real implementation, you would call an AI service
  const steps = [
    {
      title: "Introduction to the Topic",
      content: `<p>This step introduces ${topic} and explains why it's important in data science.</p>
                <p>In this tutorial, you'll learn the fundamentals of ${topic} and how to apply it to real-world data problems.</p>`,
    },
    {
      title: "Setting Up Your Environment",
      content: `<p>This step guides you through setting up the necessary tools and libraries for ${topic}.</p>`,
      code: `
# Import necessary libraries
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Set up plotting
plt.style.use('seaborn-whitegrid')
sns.set_context("talk")
      `,
    },
    {
      title: "Working with Data",
      content: `<p>This step shows you how to apply ${topic} concepts to real data.</p>`,
      code: `
# Load example dataset
df = pd.read_csv('example_data.csv')

# Display the first few rows
print(df.head())

# Get basic information about the dataset
print(df.info())
print(df.describe())
      `,
    },
    {
      title: "Implementing the Technique",
      content: `<p>This step demonstrates how to implement ${topic} techniques.</p>`,
      code: `
# Example implementation code
# (This would be specific to the topic)

# For example, if the topic is "Linear Regression":
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split

X = df[['feature1', 'feature2']]
y = df['target']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = LinearRegression()
model.fit(X_train, y_train)

print(f"Model coefficients: {model.coef_}")
print(f"Model intercept: {model.intercept_}")
print(f"R² score: {model.score(X_test, y_test)}")
      `,
    },
    {
      title: "Conclusion and Next Steps",
      content: `<p>This step summarizes what you've learned about ${topic} and suggests further areas to explore.</p>
                <p>You've now learned the basics of ${topic}. To deepen your understanding, consider exploring these related topics:</p>
                <ul>
                  <li>Advanced ${topic} techniques</li>
                  <li>Applying ${topic} to different domains</li>
                  <li>Optimizing ${topic} for performance</li>
                </ul>`,
    },
  ]

  // Add more advanced steps for intermediate and advanced tutorials
  if (difficulty === "intermediate" || difficulty === "advanced") {
    steps.push({
      title: "Advanced Techniques",
      content: `<p>This step covers more advanced aspects of ${topic} suitable for ${difficulty} users.</p>`,
      code: `
# Advanced implementation example
# (This would be specific to the topic and difficulty level)

# For example, if the topic is "Linear Regression" at an advanced level:
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, PolynomialFeatures
from sklearn.model_selection import GridSearchCV

pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('poly', PolynomialFeatures()),
    ('model', LinearRegression())
])

param_grid = {
    'poly__degree': [1, 2, 3],
    'model__fit_intercept': [True, False]
}

grid_search = GridSearchCV(pipeline, param_grid, cv=5)
grid_search.fit(X_train, y_train)

print(f"Best parameters: {grid_search.best_params_}")
print(f"Best score: {grid_search.best_score_}")
      `,
    })
  }

  return {
    id: `${topic.toLowerCase().replace(/\s+/g, "-")}-${difficulty}`,
    title: topic,
    description: `A ${difficulty} level tutorial on ${topic} for data science and machine learning.`,
    steps,
    difficulty,
    created_at: new Date().toISOString(),
  }
}
