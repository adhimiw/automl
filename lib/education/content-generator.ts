/**
 * Educational Content Generator
 */
import { apiRequest, type ApiResponse } from "../api-client"

// Difficulty levels
export type DifficultyLevel = "beginner" | "intermediate" | "advanced"

// Visual aid for educational content
export interface VisualAid {
  type: "image" | "chart" | "diagram" | "animation" | "video"
  url: string
  alt_text: string
  caption: string
}

// Educational content
export interface EducationalContent {
  id: string
  title: string
  content: string
  summary: string // Short summary for quick understanding
  related_concepts: string[]
  prerequisites: string[] // Concepts that should be understood first
  difficulty: DifficultyLevel
  visual_aids: VisualAid[] // Visual illustrations for the concept
  category: string // Category for organization (e.g., "machine_learning", "statistics")
  tags: string[] // Additional tags for improved searchability
  created_at: string
  updated_at: string
}

// Tutorial
export interface Tutorial {
  id: string
  title: string
  description: string
  summary: string // Short summary for quick understanding
  learning_objectives: string[] // What the user will learn
  prerequisites: string[] // Required knowledge or concepts
  estimated_time: number // Estimated completion time in minutes
  steps: TutorialStep[]
  exercises: Exercise[] // Interactive exercises for practice
  quiz: QuizQuestion[] // Assessment questions
  completion_certificate: boolean // Whether a certificate is available
  difficulty: DifficultyLevel
  category: string // Category for organization
  tags: string[] // Additional tags for improved searchability
  created_at: string
  updated_at: string
}

// Tutorial step
export interface TutorialStep {
  id: string
  title: string
  content: string
  code?: string
  visual_aids?: VisualAid[] // Visual illustrations for the step
  estimated_time?: number // Estimated time to complete this step in minutes
  checkpoint?: boolean // Whether this step is a checkpoint in the learning path
}

// Exercise for interactive practice
export interface Exercise {
  id: string
  title: string
  description: string
  instructions: string
  starter_code?: string
  solution_code: string
  validation_tests: string // Tests to validate the user's solution
  hints: string[] // Progressive hints for users who get stuck
  difficulty: DifficultyLevel
}

// Quiz question for assessment
export interface QuizQuestion {
  id: string
  question: string
  options: string[] // Multiple choice options
  correct_answer: number // Index of the correct option
  explanation: string // Explanation of the correct answer
}

// Data science concepts
export const DATA_SCIENCE_CONCEPTS = {
  fundamentals: [
    "Data Types",
    "Descriptive Statistics",
    "Probability Distributions",
    "Hypothesis Testing",
    "Correlation",
    "Sampling",
    "Data Cleaning",
  ],
  visualization: [
    "Data Visualization Principles",
    "Bar Charts",
    "Line Charts",
    "Scatter Plots",
    "Histograms",
    "Box Plots",
    "Heatmaps",
  ],
  machine_learning: [
    "Supervised Learning",
    "Unsupervised Learning",
    "Regression",
    "Classification",
    "Clustering",
    "Decision Trees",
    "Random Forests",
    "Support Vector Machines",
    "Neural Networks",
    "Model Evaluation",
    "Feature Engineering",
  ],
  advanced: [
    "Time Series Analysis",
    "Natural Language Processing",
    "Computer Vision",
    "Reinforcement Learning",
    "Deep Learning",
    "Ensemble Methods",
    "Dimensionality Reduction",
  ],
}

// Tutorial topics
export const TUTORIAL_TOPICS = [
  "Data Cleaning and Preprocessing",
  "Exploratory Data Analysis",
  "Feature Engineering",
  "Building a Regression Model",
  "Building a Classification Model",
  "Model Evaluation and Validation",
  "Data Visualization Best Practices",
  "Time Series Forecasting",
  "Text Analysis",
  "Image Classification",
]

/**
 * Generate educational content for a data science concept
 * @param concept Data science concept
 * @param difficulty Difficulty level
 * @returns Educational content
 */
export async function generateConceptExplanation(
  concept: string,
  difficulty: DifficultyLevel = "beginner"
): Promise<ApiResponse<EducationalContent>> {
  try {
    // Try external API first
    const apiResponse = await apiRequest<EducationalContent>(
      `/education/concept-explanation?concept=${encodeURIComponent(concept)}&difficulty=${difficulty}`
    )

    if (apiResponse.success) {
      return apiResponse
    }

    // If external API fails, try internal API
    const internalResponse = await apiRequest<EducationalContent>(
      `/api/education/concept-explanation?concept=${encodeURIComponent(concept)}&difficulty=${difficulty}`,
      {},
      true
    )

    if (internalResponse.success) {
      return internalResponse
    }

    // If both APIs fail, use mock implementation
    console.log("Using mock concept explanation for:", concept)
    return {
      success: true,
      data: generateMockConceptExplanation(concept, difficulty)
    }
  } catch (error) {
    console.error("Error generating concept explanation:", error)
    return {
      success: false,
      error: "Failed to generate concept explanation",
    }
  }
}

/**
 * Generate a tutorial for a data science topic
 * @param topic Tutorial topic
 * @param difficulty Difficulty level
 * @returns Tutorial
 */
export async function generateTutorial(
  topic: string,
  difficulty: DifficultyLevel = "beginner"
): Promise<ApiResponse<Tutorial>> {
  try {
    // Try external API first
    const apiResponse = await apiRequest<Tutorial>(
      `/education/tutorial?topic=${encodeURIComponent(topic)}&difficulty=${difficulty}`
    )

    if (apiResponse.success) {
      return apiResponse
    }

    // If external API fails, try internal API
    const internalResponse = await apiRequest<Tutorial>(
      `/api/education/tutorial?topic=${encodeURIComponent(topic)}&difficulty=${difficulty}`,
      {},
      true
    )

    if (internalResponse.success) {
      return internalResponse
    }

    // If both APIs fail, use mock implementation
    console.log("Using mock tutorial for:", topic)
    return {
      success: true,
      data: generateMockTutorial(topic, difficulty)
    }
  } catch (error) {
    console.error("Error generating tutorial:", error)
    return {
      success: false,
      error: "Failed to generate tutorial",
    }
  }
}

/**
 * Search interface for knowledge base queries
 */
export interface KnowledgeBaseSearchParams {
  query: string
  category?: string
  difficulty?: DifficultyLevel
  tags?: string[]
  limit?: number
  offset?: number
}

/**
 * Search result interface
 */
export interface SearchResult {
  total_results: number
  results: (EducationalContent | Tutorial)[]
  categories: { [key: string]: number }
  tags: { [key: string]: number }
}

/**
 * Search the knowledge base for educational content and tutorials
 * @param params Search parameters
 * @returns Search results
 */
export async function searchKnowledgeBase(
  params: KnowledgeBaseSearchParams
): Promise<ApiResponse<SearchResult>> {
  try {
    // Build query string
    const queryParams = new URLSearchParams()
    queryParams.append("query", params.query)

    if (params.category) {
      queryParams.append("category", params.category)
    }

    if (params.difficulty) {
      queryParams.append("difficulty", params.difficulty)
    }

    if (params.tags && params.tags.length > 0) {
      params.tags.forEach(tag => queryParams.append("tags", tag))
    }

    if (params.limit) {
      queryParams.append("limit", params.limit.toString())
    }

    if (params.offset) {
      queryParams.append("offset", params.offset.toString())
    }

    // Try external API first
    const apiResponse = await apiRequest<SearchResult>(
      `/education/search?${queryParams.toString()}`
    )

    if (apiResponse.success) {
      return apiResponse
    }

    // If external API fails, try internal API
    const internalResponse = await apiRequest<SearchResult>(
      `/api/education/search?${queryParams.toString()}`,
      {},
      true
    )

    if (internalResponse.success) {
      return internalResponse
    }

    // If both APIs fail, return mock search results
    return {
      success: true,
      data: generateMockSearchResults(params)
    }
  } catch (error) {
    console.error("Error searching knowledge base:", error)
    return {
      success: false,
      error: "Failed to search knowledge base",
    }
  }
}

/**
 * Generate mock search results (fallback when API is unavailable)
 * @param params Search parameters
 * @returns Mock search results
 */
function generateMockSearchResults(params: KnowledgeBaseSearchParams): SearchResult {
  // Generate mock results based on search query
  const query = params.query.toLowerCase()
  const results: (EducationalContent | Tutorial)[] = []

  // Add matching concepts
  for (const category in DATA_SCIENCE_CONCEPTS) {
    const concepts = DATA_SCIENCE_CONCEPTS[category as keyof typeof DATA_SCIENCE_CONCEPTS]

    for (const concept of concepts) {
      if (
        concept.toLowerCase().includes(query) ||
        query.includes(concept.toLowerCase()) ||
        category.includes(query)
      ) {
        // If category filter is applied, check if it matches
        if (params.category && params.category !== category) {
          continue
        }

        // Create a mock concept explanation
        const mockConcept = generateMockConceptExplanation(
          concept,
          params.difficulty || "beginner"
        )

        // If tag filter is applied, check if it matches
        if (params.tags && params.tags.length > 0) {
          const hasMatchingTag = params.tags.some(tag =>
            mockConcept.tags.includes(tag)
          )

          if (!hasMatchingTag) {
            continue
          }
        }

        results.push(mockConcept)
      }
    }
  }

  // Add matching tutorials
  for (const topic of TUTORIAL_TOPICS) {
    if (
      topic.toLowerCase().includes(query) ||
      query.includes(topic.toLowerCase())
    ) {
      // Create a mock tutorial
      const mockTutorial = generateMockTutorial(
        topic,
        params.difficulty || "beginner"
      )

      // If category filter is applied, check if it matches
      if (params.category && params.category !== mockTutorial.category) {
        continue
      }

      // If tag filter is applied, check if it matches
      if (params.tags && params.tags.length > 0) {
        const hasMatchingTag = params.tags.some(tag =>
          mockTutorial.tags.includes(tag)
        )

        if (!hasMatchingTag) {
          continue
        }
      }

      results.push(mockTutorial)
    }
  }

  // Apply pagination
  const limit = params.limit || 10
  const offset = params.offset || 0
  const paginatedResults = results.slice(offset, offset + limit)

  // Generate category and tag counts
  const categories: { [key: string]: number } = {}
  const tags: { [key: string]: number } = {}

  for (const result of results) {
    // Count categories
    if (!categories[result.category]) {
      categories[result.category] = 0
    }
    categories[result.category]++

    // Count tags
    for (const tag of result.tags) {
      if (!tags[tag]) {
        tags[tag] = 0
      }
      tags[tag]++
    }
  }

  return {
    total_results: results.length,
    results: paginatedResults,
    categories,
    tags
  }
}

/**
 * Generate mock concept explanation (fallback when API is unavailable)
 * @param concept Data science concept
 * @param difficulty Difficulty level
 * @returns Mock educational content
 */
function generateMockConceptExplanation(concept: string, difficulty: DifficultyLevel): EducationalContent {
  // Mock content based on concept and difficulty
  let content = ""
  let summary = ""
  let relatedConcepts: string[] = []
  let prerequisites: string[] = []
  let category = "fundamentals"
  let tags: string[] = []
  let visualAids: VisualAid[] = []

  switch (concept.toLowerCase()) {
    case "correlation":
      content = `
        <h2>Correlation</h2>
        <p>Correlation is a statistical measure that expresses the extent to which two variables are linearly related. It's a common tool in data analysis that helps identify relationships between variables.</p>

        <h3>Key Points</h3>
        <ul>
          <li>Correlation coefficients range from -1 to 1</li>
          <li>A value of 1 implies perfect positive correlation</li>
          <li>A value of -1 implies perfect negative correlation</li>
          <li>A value of 0 implies no linear correlation</li>
        </ul>

        <h3>Types of Correlation</h3>
        <p>The most common correlation coefficient is the Pearson correlation coefficient, which measures linear relationships. Other types include Spearman's rank correlation and Kendall's tau, which can detect non-linear relationships.</p>

        <h3>Important Considerations</h3>
        <p>Remember that correlation does not imply causation. Two variables may be correlated without one causing the other.</p>
      `
      summary = "Correlation measures the linear relationship between two variables, with values ranging from -1 to 1."
      relatedConcepts = ["Descriptive Statistics", "Covariance", "Regression", "Statistical Significance"]
      prerequisites = ["Descriptive Statistics", "Data Types"]
      category = "statistics"
      tags = ["statistics", "data analysis", "relationships", "pearson", "spearman"]
      visualAids = [
        {
          type: "chart",
          url: "/assets/images/education/correlation-examples.png",
          alt_text: "Examples of different correlation coefficients",
          caption: "Examples of positive, negative, and no correlation between variables"
        },
        {
          type: "diagram",
          url: "/assets/images/education/correlation-causation.png",
          alt_text: "Correlation vs causation diagram",
          caption: "Illustration of how correlation does not imply causation"
        }
      ]
      break

    case "regression":
      content = `
        <h2>Regression</h2>
        <p>Regression is a statistical method used to model the relationship between a dependent variable and one or more independent variables. It's one of the fundamental techniques in predictive modeling.</p>

        <h3>Key Types of Regression</h3>
        <ul>
          <li>Linear Regression: Models linear relationships between variables</li>
          <li>Logistic Regression: Used for binary classification problems</li>
          <li>Polynomial Regression: Models non-linear relationships using polynomial functions</li>
          <li>Multiple Regression: Uses multiple independent variables</li>
        </ul>

        <h3>Evaluation Metrics</h3>
        <p>Common metrics to evaluate regression models include R-squared, Mean Squared Error (MSE), and Mean Absolute Error (MAE).</p>

        <h3>Assumptions</h3>
        <p>Linear regression makes several assumptions, including linearity, independence, homoscedasticity, and normality of residuals.</p>
      `
      summary = "Regression models the relationship between variables, allowing prediction of a dependent variable based on independent variables."
      relatedConcepts = ["Linear Regression", "R-squared", "Residuals", "Predictive Modeling"]
      prerequisites = ["Correlation", "Descriptive Statistics", "Probability Distributions"]
      category = "machine_learning"
      tags = ["regression", "predictive modeling", "linear regression", "model evaluation"]
      visualAids = [
        {
          type: "chart",
          url: "/assets/images/education/regression-line.png",
          alt_text: "Linear regression line fitting data points",
          caption: "Example of a linear regression line fitting data points"
        },
        {
          type: "diagram",
          url: "/assets/images/education/regression-types.png",
          alt_text: "Different types of regression",
          caption: "Comparison of linear, polynomial, and logistic regression"
        }
      ]
      break

    default:
      content = `
        <h2>${concept}</h2>
        <p>This is a placeholder explanation for ${concept}. In a real implementation, this would be generated by the AI based on the concept and difficulty level.</p>

        <h3>Key Points</h3>
        <ul>
          <li>First key point about ${concept}</li>
          <li>Second key point about ${concept}</li>
          <li>Third key point about ${concept}</li>
        </ul>

        <h3>Applications</h3>
        <p>This section would describe how ${concept} is applied in data science and machine learning.</p>

        <h3>Further Reading</h3>
        <p>This section would provide resources for learning more about ${concept}.</p>
      `
      summary = `Brief explanation of ${concept} and its importance in data science.`
      relatedConcepts = ["Data Science", "Machine Learning", "Statistics"]
      prerequisites = ["Data Types"]

      // Determine category based on concept name
      if (DATA_SCIENCE_CONCEPTS.fundamentals.includes(concept)) {
        category = "fundamentals"
      } else if (DATA_SCIENCE_CONCEPTS.visualization.includes(concept)) {
        category = "visualization"
      } else if (DATA_SCIENCE_CONCEPTS.machine_learning.includes(concept)) {
        category = "machine_learning"
      } else if (DATA_SCIENCE_CONCEPTS.advanced.includes(concept)) {
        category = "advanced"
      }

      tags = [category, "data science", concept.toLowerCase()]
      visualAids = [
        {
          type: "image",
          url: `/assets/images/education/placeholder-${category}.png`,
          alt_text: `Illustration of ${concept}`,
          caption: `Visual representation of ${concept}`
        }
      ]
  }

  // Adjust content based on difficulty
  if (difficulty === "advanced") {
    content += `
      <h3>Advanced Topics</h3>
      <p>This section would cover advanced aspects of ${concept} that are suitable for experienced data scientists.</p>
    `
  }

  return {
    id: `mock-${concept.toLowerCase().replace(/\s+/g, "-")}`,
    title: concept,
    content,
    summary,
    related_concepts: relatedConcepts,
    prerequisites,
    difficulty,
    visual_aids: visualAids,
    category,
    tags,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
}

/**
 * Generate mock tutorial (fallback when API is unavailable)
 * @param topic Tutorial topic
 * @param difficulty Difficulty level
 * @returns Mock tutorial
 */
function generateMockTutorial(topic: string, difficulty: DifficultyLevel): Tutorial {
  // Mock tutorial based on topic and difficulty
  let description = ""
  let summary = ""
  let learningObjectives: string[] = []
  let prerequisites: string[] = []
  let estimatedTime = 30 // Default 30 minutes
  let steps: TutorialStep[] = []
  let exercises: Exercise[] = []
  let quiz: QuizQuestion[] = []
  let category = "fundamentals"
  let tags: string[] = []

  switch (topic.toLowerCase()) {
    case "exploratory data analysis":
      description = "Learn how to perform exploratory data analysis (EDA) to understand your dataset before modeling."
      summary = "A comprehensive guide to exploring and understanding your data before building models."
      learningObjectives = [
        "Understand the structure and properties of your dataset",
        "Identify and handle missing values",
        "Analyze numerical and categorical variables",
        "Discover relationships between variables",
        "Prepare your data for modeling"
      ]
      prerequisites = ["Basic Python", "Pandas Fundamentals", "Data Types"]
      estimatedTime = 45
      category = "data_analysis"
      tags = ["EDA", "data analysis", "visualization", "pandas", "matplotlib"]

      steps = [
        {
          id: "eda-step-1",
          title: "Load and Inspect the Data",
          content: "The first step in any data analysis is to load the data and get a basic understanding of its structure.",
          code: `
import pandas as pd

# Load the dataset
df = pd.read_csv('your_dataset.csv')

# Display basic information
print(df.info())
print(df.head())
          `,
          estimated_time: 5,
          checkpoint: true,
          visual_aids: [
            {
              type: "image",
              url: "/assets/images/education/pandas-dataframe.png",
              alt_text: "Example of a pandas DataFrame",
              caption: "Example output of df.head() showing the first few rows of a DataFrame"
            }
          ]
        },
        {
          id: "eda-step-2",
          title: "Check for Missing Values",
          content: "Missing values can significantly impact your analysis. It's important to identify and handle them appropriately.",
          code: `
# Check for missing values
print(df.isnull().sum())

# Visualize missing values
import matplotlib.pyplot as plt
import seaborn as sns

plt.figure(figsize=(10, 6))
sns.heatmap(df.isnull(), cbar=False, cmap='viridis')
plt.title('Missing Values')
plt.show()
          `,
          estimated_time: 8,
          visual_aids: [
            {
              type: "chart",
              url: "/assets/images/education/missing-values-heatmap.png",
              alt_text: "Heatmap of missing values",
              caption: "Visualization of missing values in a dataset using a heatmap"
            }
          ]
        },
        {
          id: "eda-step-3",
          title: "Analyze Numerical Variables",
          content: "Understand the distribution and relationships between numerical variables in your dataset.",
          code: `
# Get descriptive statistics
print(df.describe())

# Create histograms
df.hist(figsize=(12, 10))
plt.tight_layout()
plt.show()

# Create a correlation matrix
plt.figure(figsize=(10, 8))
correlation_matrix = df.corr()
sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm')
plt.title('Correlation Matrix')
plt.show()
          `,
          estimated_time: 10,
          visual_aids: [
            {
              type: "chart",
              url: "/assets/images/education/histograms.png",
              alt_text: "Histograms of numerical variables",
              caption: "Histograms showing the distribution of numerical variables"
            },
            {
              type: "chart",
              url: "/assets/images/education/correlation-matrix.png",
              alt_text: "Correlation matrix heatmap",
              caption: "Heatmap showing correlations between numerical variables"
            }
          ]
        },
        {
          id: "eda-step-4",
          title: "Analyze Categorical Variables",
          content: "Understand the distribution and relationships of categorical variables in your dataset.",
          code: `
# Count values in categorical columns
for col in df.select_dtypes(include=['object']).columns:
    print(f"\\n{col}:\\n{df[col].value_counts()}")

    # Create bar plots
    plt.figure(figsize=(10, 6))
    df[col].value_counts().plot(kind='bar')
    plt.title(f'Distribution of {col}')
    plt.ylabel('Count')
    plt.tight_layout()
    plt.show()
          `,
          estimated_time: 8,
          visual_aids: [
            {
              type: "chart",
              url: "/assets/images/education/categorical-barplot.png",
              alt_text: "Bar plot of categorical variable",
              caption: "Bar plot showing the distribution of a categorical variable"
            }
          ]
        },
        {
          id: "eda-step-5",
          title: "Identify Relationships and Patterns",
          content: "Look for relationships between variables that might be useful for modeling.",
          code: `
# Create scatter plots for numerical variables
sns.pairplot(df.select_dtypes(include=['number']).sample(1000))
plt.suptitle('Pairwise Relationships', y=1.02)
plt.show()

# Create box plots for categorical vs numerical
for cat_col in df.select_dtypes(include=['object']).columns:
    for num_col in df.select_dtypes(include=['number']).columns[:3]:  # Limit to first 3 numerical columns
        plt.figure(figsize=(10, 6))
        sns.boxplot(x=cat_col, y=num_col, data=df)
        plt.title(f'{num_col} by {cat_col}')
        plt.xticks(rotation=45)
        plt.tight_layout()
        plt.show()
          `,
          estimated_time: 12,
          checkpoint: true,
          visual_aids: [
            {
              type: "chart",
              url: "/assets/images/education/pairplot.png",
              alt_text: "Pairplot of numerical variables",
              caption: "Pairplot showing relationships between numerical variables"
            },
            {
              type: "chart",
              url: "/assets/images/education/boxplot.png",
              alt_text: "Boxplot of numerical variable by categorical variable",
              caption: "Boxplot showing the distribution of a numerical variable across categories"
            }
          ]
        },
      ]

      exercises = [
        {
          id: "eda-exercise-1",
          title: "Missing Value Analysis",
          description: "Practice identifying and handling missing values in a dataset.",
          instructions: "Load the provided dataset and identify columns with missing values. Create a visualization to show the pattern of missing values and implement a strategy to handle them.",
          starter_code: `
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Load the dataset
df = pd.read_csv('exercise_dataset.csv')

# Your code here
          `,
          solution_code: `
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Load the dataset
df = pd.read_csv('exercise_dataset.csv')

# Check for missing values
missing_values = df.isnull().sum()
print("Missing values per column:")
print(missing_values[missing_values > 0])

# Visualize missing values
plt.figure(figsize=(10, 6))
sns.heatmap(df.isnull(), cbar=False, cmap='viridis')
plt.title('Missing Values')
plt.show()

# Handle missing values
# For numerical columns, fill with median
for col in df.select_dtypes(include=['number']).columns:
    if df[col].isnull().sum() > 0:
        df[col] = df[col].fillna(df[col].median())

# For categorical columns, fill with mode
for col in df.select_dtypes(include=['object']).columns:
    if df[col].isnull().sum() > 0:
        df[col] = df[col].fillna(df[col].mode()[0])

print("\\nMissing values after handling:")
print(df.isnull().sum().sum())
          `,
          validation_tests: `
# Check if missing values were identified
assert 'missing_values' in locals() or 'missing_values' in globals(), "Missing values were not identified"

# Check if visualization was created
assert plt.gcf().number > 0, "No visualization was created"

# Check if missing values were handled
assert df.isnull().sum().sum() == 0, "Not all missing values were handled"
          `,
          hints: [
            "Use df.isnull().sum() to count missing values in each column",
            "Try using seaborn's heatmap to visualize missing values",
            "Consider different strategies for numerical vs categorical variables",
            "For numerical columns, median is often better than mean when there are outliers"
          ],
          difficulty: "intermediate"
        }
      ]

      quiz = [
        {
          id: "eda-quiz-1",
          question: "What is the primary purpose of Exploratory Data Analysis (EDA)?",
          options: [
            "To build the most accurate predictive model possible",
            "To understand the structure, patterns, and anomalies in your data before modeling",
            "To clean and preprocess data for machine learning",
            "To create visually appealing charts and graphs"
          ],
          correct_answer: 1,
          explanation: "The primary purpose of EDA is to understand your data's structure, patterns, and anomalies before building models. While EDA often involves data cleaning and visualization, its main goal is to gain insights that inform subsequent analysis and modeling decisions."
        },
        {
          id: "eda-quiz-2",
          question: "Which of the following is NOT typically part of EDA?",
          options: [
            "Checking for missing values",
            "Examining the distribution of variables",
            "Deploying a model to production",
            "Identifying outliers"
          ],
          correct_answer: 2,
          explanation: "Deploying a model to production is not part of EDA. EDA is a preliminary step that happens before model building, while deployment happens after a model has been built, evaluated, and selected."
        }
      ]
      break

    default:
      description = `This is a placeholder tutorial for ${topic}. In a real implementation, this would be generated by the AI based on the topic and difficulty level.`
      summary = `A comprehensive guide to ${topic} for ${difficulty} users.`
      learningObjectives = [
        `Understand the fundamentals of ${topic}`,
        `Learn how to apply ${topic} in real-world scenarios`,
        `Master advanced techniques in ${topic}`
      ]
      prerequisites = ["Basic Python", "Data Science Fundamentals"]
      estimatedTime = 30

      // Determine category based on topic
      if (topic.includes("Data") || topic.includes("EDA")) {
        category = "data_analysis"
      } else if (topic.includes("Model") || topic.includes("Classification") || topic.includes("Regression")) {
        category = "machine_learning"
      } else if (topic.includes("Visualization") || topic.includes("Chart") || topic.includes("Plot")) {
        category = "visualization"
      } else {
        category = "fundamentals"
      }

      tags = [category, topic.toLowerCase().replace(/\s+/g, "-")]

      steps = [
        {
          id: `${topic.toLowerCase().replace(/\s+/g, "-")}-step-1`,
          title: "Introduction to the Topic",
          content: `This step would introduce ${topic} and explain why it's important.`,
          estimated_time: 5,
          visual_aids: [
            {
              type: "image",
              url: `/assets/images/education/placeholder-${category}.png`,
              alt_text: `Introduction to ${topic}`,
              caption: `Visual overview of ${topic}`
            }
          ]
        },
        {
          id: `${topic.toLowerCase().replace(/\s+/g, "-")}-step-2`,
          title: "Setting Up Your Environment",
          content: "This step would guide you through setting up the necessary tools and libraries.",
          code: `
# Example code for setting up
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
          `,
          estimated_time: 5,
          checkpoint: true
        },
        {
          id: `${topic.toLowerCase().replace(/\s+/g, "-")}-step-3`,
          title: "Working with Data",
          content: "This step would show you how to apply the concepts to real data.",
          code: `
# Example code for working with data
df = pd.read_csv('example_data.csv')
print(df.head())
          `,
          estimated_time: 10,
          visual_aids: [
            {
              type: "image",
              url: "/assets/images/education/data-example.png",
              alt_text: "Example data",
              caption: "Example of working with data"
            }
          ]
        },
        {
          id: `${topic.toLowerCase().replace(/\s+/g, "-")}-step-4`,
          title: "Advanced Techniques",
          content: "This step would cover more advanced aspects of the topic.",
          estimated_time: 8
        },
        {
          id: `${topic.toLowerCase().replace(/\s+/g, "-")}-step-5`,
          title: "Conclusion and Next Steps",
          content: "This step would summarize what you've learned and suggest further areas to explore.",
          estimated_time: 2,
          checkpoint: true
        },
      ]

      exercises = [
        {
          id: `${topic.toLowerCase().replace(/\s+/g, "-")}-exercise-1`,
          title: `Basic ${topic} Exercise`,
          description: `Practice applying the basics of ${topic}.`,
          instructions: `Complete the code below to implement a basic ${topic} solution.`,
          starter_code: `
# Your code here
          `,
          solution_code: `
# Example solution
print("This is a placeholder solution")
          `,
          validation_tests: `
# Example validation
assert True, "This is a placeholder validation"
          `,
          hints: [
            "Think about the key concepts covered in the tutorial",
            "Break down the problem into smaller steps",
            "Check the documentation for relevant functions"
          ],
          difficulty: difficulty
        }
      ]

      quiz = [
        {
          id: `${topic.toLowerCase().replace(/\s+/g, "-")}-quiz-1`,
          question: `What is the primary purpose of ${topic}?`,
          options: [
            `Option A about ${topic}`,
            `Option B about ${topic}`,
            `Option C about ${topic}`,
            `Option D about ${topic}`
          ],
          correct_answer: 1,
          explanation: `This is an explanation about the correct answer regarding ${topic}.`
        }
      ]
  }

  // Adjust content based on difficulty
  if (difficulty === "beginner") {
    description = "Beginner-friendly: " + description
    // Simplify steps for beginners
    steps = steps.map(step => ({
      ...step,
      content: step.content + " This explanation is tailored for beginners with minimal prior knowledge."
    }))
  } else if (difficulty === "advanced") {
    description = "Advanced level: " + description
    // Add more complex steps for advanced tutorials
    steps.push({
      id: `${topic.toLowerCase().replace(/\s+/g, "-")}-step-advanced`,
      title: "Advanced Implementation",
      content: "This section covers advanced implementation details that are suitable for experienced data scientists.",
      code: `
# Advanced code example
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import GridSearchCV

pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('model', RandomForestClassifier())
])

param_grid = {
    'model__n_estimators': [100, 200, 300],
    'model__max_depth': [None, 5, 10]
}

grid_search = GridSearchCV(pipeline, param_grid, cv=5)
grid_search.fit(X_train, y_train)
      `,
      estimated_time: 15,
      checkpoint: true,
      visual_aids: [
        {
          type: "diagram",
          url: "/assets/images/education/pipeline-diagram.png",
          alt_text: "ML Pipeline diagram",
          caption: "Diagram of a machine learning pipeline with preprocessing and model training"
        }
      ]
    })

    // Add more challenging exercises
    exercises.push({
      id: `${topic.toLowerCase().replace(/\s+/g, "-")}-exercise-advanced`,
      title: `Advanced ${topic} Challenge`,
      description: `A challenging exercise to test your advanced knowledge of ${topic}.`,
      instructions: `Implement a sophisticated solution using advanced ${topic} techniques.`,
      starter_code: `
# Advanced exercise
# Your code here
      `,
      solution_code: `
# Example advanced solution
print("This is a placeholder for an advanced solution")
      `,
      validation_tests: `
# Example validation
assert True, "This is a placeholder validation for advanced exercise"
      `,
      hints: [
        "Consider edge cases in your implementation",
        "Optimize for both performance and readability",
        "Think about how to make your solution scalable"
      ],
      difficulty: "advanced"
    })
  }

  return {
    id: `mock-${topic.toLowerCase().replace(/\s+/g, "-")}`,
    title: topic,
    description,
    summary,
    learning_objectives: learningObjectives,
    prerequisites,
    estimated_time: estimatedTime,
    steps,
    exercises,
    quiz,
    completion_certificate: true,
    difficulty,
    category,
    tags,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
}
