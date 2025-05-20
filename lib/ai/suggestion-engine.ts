/**
 * Suggestion Engine - Provides AI-powered suggestions for data analysis and ML tasks
 */
import { generateGeminiResponse, generateDataInsights, generateVisualizationRecommendations } from "./gemini-client"
import { createAuditLog } from "@/lib/db/audit-logs"

// Suggestion types
export type SuggestionType =
  | "data_cleaning"
  | "feature_engineering"
  | "model_selection"
  | "visualization"
  | "analysis"
  | "performance_improvement"

// Suggestion request interface
export interface SuggestionRequest {
  type: SuggestionType
  context: {
    dataset_id?: number
    dataset_description?: string
    data_preview?: string
    current_models?: Array<{
      id: number
      type: string
      performance: Record<string, any>
    }>
    user_goal?: string
    current_issues?: string[]
  }
}

// Suggestion result interface
export interface SuggestionResult {
  suggestions: string[]
  explanation: string
  code_snippets?: Record<string, string>
  references?: string[]
}

/**
 * Generate suggestions based on request type and context
 */
export async function generateSuggestions(request: SuggestionRequest, userId: number): Promise<SuggestionResult> {
  try {
    // Log the suggestion request
    await createAuditLog({
      user_id: userId,
      action: "suggestion_request",
      details: {
        suggestion_type: request.type,
        dataset_id: request.context.dataset_id,
      },
    })

    // Generate suggestions based on type
    let result: SuggestionResult

    switch (request.type) {
      case "data_cleaning":
        result = await generateDataCleaningSuggestions(request.context, userId)
        break

      case "feature_engineering":
        result = await generateFeatureEngineeringSuggestions(request.context, userId)
        break

      case "model_selection":
        result = await generateModelSelectionSuggestions(request.context, userId)
        break

      case "visualization":
        result = await generateVisualizationSuggestions(request.context, userId)
        break

      case "analysis":
        result = await generateAnalysisSuggestions(request.context, userId)
        break

      case "performance_improvement":
        result = await generatePerformanceImprovementSuggestions(request.context, userId)
        break

      default:
        throw new Error(`Unsupported suggestion type: ${request.type}`)
    }

    // Log the suggestion response
    await createAuditLog({
      user_id: userId,
      action: "suggestion_response",
      details: {
        suggestion_type: request.type,
        suggestion_count: result.suggestions.length,
      },
    })

    return result
  } catch (error) {
    console.error("Error generating suggestions:", error)

    // Log the error
    await createAuditLog({
      user_id: userId,
      action: "suggestion_error",
      details: {
        suggestion_type: request.type,
        error: (error as Error).message,
      },
    })

    throw error
  }
}

/**
 * Generate data cleaning suggestions
 */
async function generateDataCleaningSuggestions(
  context: SuggestionRequest["context"],
  userId: number,
): Promise<SuggestionResult> {
  const { dataset_description, data_preview } = context

  if (!dataset_description || !data_preview) {
    throw new Error("Dataset description and preview are required for data cleaning suggestions")
  }

  const prompt = `
    You are an expert data scientist specializing in data cleaning. Based on the following dataset, suggest data cleaning steps.
    
    Dataset Description:
    ${dataset_description}
    
    Data Preview:
    ${data_preview}
    
    Provide the following in your response:
    1. A list of 3-5 specific data cleaning suggestions
    2. A brief explanation for each suggestion
    3. Python code snippets to implement each suggestion
    
    Format your response as JSON with the following structure:
    {
      "suggestions": ["suggestion1", "suggestion2", ...],
      "explanation": "overall explanation",
      "code_snippets": {
        "suggestion1": "code for suggestion 1",
        "suggestion2": "code for suggestion 2",
        ...
      }
    }
  `

  const response = await generateGeminiResponse(
    prompt,
    {
      temperature: 0.3,
    },
    userId,
  )

  try {
    // Parse the JSON response
    return JSON.parse(response)
  } catch (error) {
    console.error("Error parsing suggestion response:", error)

    // Fallback to a structured response if JSON parsing fails
    return {
      suggestions: ["Check for missing values", "Remove duplicates", "Fix data types"],
      explanation: "Basic data cleaning steps to improve data quality",
      code_snippets: {
        "Check for missing values": "df.isnull().sum()",
        "Remove duplicates": "df.drop_duplicates(inplace=True)",
        "Fix data types": "df['column'] = df['column'].astype('type')",
      },
    }
  }
}

/**
 * Generate feature engineering suggestions
 */
async function generateFeatureEngineeringSuggestions(
  context: SuggestionRequest["context"],
  userId: number,
): Promise<SuggestionResult> {
  const { dataset_description, data_preview, user_goal } = context

  if (!dataset_description || !data_preview) {
    throw new Error("Dataset description and preview are required for feature engineering suggestions")
  }

  const prompt = `
    You are an expert data scientist specializing in feature engineering. Based on the following dataset and user goal, suggest feature engineering techniques.
    
    Dataset Description:
    ${dataset_description}
    
    Data Preview:
    ${data_preview}
    
    User Goal:
    ${user_goal || "Improve model performance"}
    
    Provide the following in your response:
    1. A list of 3-5 specific feature engineering suggestions
    2. A brief explanation for each suggestion
    3. Python code snippets to implement each suggestion
    
    Format your response as JSON with the following structure:
    {
      "suggestions": ["suggestion1", "suggestion2", ...],
      "explanation": "overall explanation",
      "code_snippets": {
        "suggestion1": "code for suggestion 1",
        "suggestion2": "code for suggestion 2",
        ...
      }
    }
  `

  const response = await generateGeminiResponse(
    prompt,
    {
      temperature: 0.3,
    },
    userId,
  )

  try {
    // Parse the JSON response
    return JSON.parse(response)
  } catch (error) {
    console.error("Error parsing suggestion response:", error)

    // Fallback to a structured response if JSON parsing fails
    return {
      suggestions: ["Create interaction features", "Apply polynomial features", "Normalize numerical features"],
      explanation: "Feature engineering techniques to capture more complex patterns in the data",
      code_snippets: {
        "Create interaction features": "df['feature_interaction'] = df['feature1'] * df['feature2']",
        "Apply polynomial features":
          "from sklearn.preprocessing import PolynomialFeatures\npoly = PolynomialFeatures(degree=2)\nX_poly = poly.fit_transform(X)",
        "Normalize numerical features":
          "from sklearn.preprocessing import StandardScaler\nscaler = StandardScaler()\nX_scaled = scaler.fit_transform(X)",
      },
    }
  }
}

/**
 * Generate model selection suggestions
 */
async function generateModelSelectionSuggestions(
  context: SuggestionRequest["context"],
  userId: number,
): Promise<SuggestionResult> {
  const { dataset_description, user_goal, current_models } = context

  if (!dataset_description) {
    throw new Error("Dataset description is required for model selection suggestions")
  }

  const currentModelsText =
    current_models && current_models.length > 0
      ? `Current Models:\n${current_models
          .map(
            (model) =>
              `- ${model.type} (ID: ${model.id}): ${Object.entries(model.performance)
                .map(([key, value]) => `${key}: ${value}`)
                .join(", ")}`,
          )
          .join("\n")}`
      : "No current models"

  const prompt = `
    You are an expert data scientist specializing in machine learning model selection. Based on the following information, suggest appropriate models.
    
    Dataset Description:
    ${dataset_description}
    
    ${currentModelsText}
    
    User Goal:
    ${user_goal || "Build an accurate predictive model"}
    
    Provide the following in your response:
    1. A list of 3-5 recommended models
    2. A brief explanation for each recommendation
    3. Python code snippets to implement each model
    4. References to relevant documentation or resources
    
    Format your response as JSON with the following structure:
    {
      "suggestions": ["model1", "model2", ...],
      "explanation": "overall explanation",
      "code_snippets": {
        "model1": "code for model 1",
        "model2": "code for model 2",
        ...
      },
      "references": ["reference1", "reference2", ...]
    }
  `

  const response = await generateGeminiResponse(
    prompt,
    {
      temperature: 0.3,
    },
    userId,
  )

  try {
    // Parse the JSON response
    return JSON.parse(response)
  } catch (error) {
    console.error("Error parsing suggestion response:", error)

    // Fallback to a structured response if JSON parsing fails
    return {
      suggestions: ["Random Forest", "Gradient Boosting", "Neural Network"],
      explanation: "These models offer a good balance of performance and interpretability",
      code_snippets: {
        "Random Forest":
          "from sklearn.ensemble import RandomForestClassifier\nmodel = RandomForestClassifier(n_estimators=100)\nmodel.fit(X_train, y_train)",
        "Gradient Boosting":
          "from sklearn.ensemble import GradientBoostingClassifier\nmodel = GradientBoostingClassifier()\nmodel.fit(X_train, y_train)",
        "Neural Network":
          "from sklearn.neural_network import MLPClassifier\nmodel = MLPClassifier(hidden_layer_sizes=(100, 50))\nmodel.fit(X_train, y_train)",
      },
      references: [
        "https://scikit-learn.org/stable/modules/ensemble.html",
        "https://scikit-learn.org/stable/modules/neural_networks_supervised.html",
      ],
    }
  }
}

/**
 * Generate visualization suggestions
 */
async function generateVisualizationSuggestions(
  context: SuggestionRequest["context"],
  userId: number,
): Promise<SuggestionResult> {
  const { dataset_description, data_preview, user_goal } = context

  if (!dataset_description) {
    throw new Error("Dataset description is required for visualization suggestions")
  }

  // Use the dedicated visualization recommendations function
  const recommendationsText = await generateVisualizationRecommendations(
    dataset_description,
    user_goal || "Explore and understand the data",
    userId,
  )

  // Parse the recommendations into a structured format
  const suggestions = recommendationsText
    .split(/\n#{2,3}\s+/)
    .filter((section) => section.trim().length > 0)
    .map((section) => section.split("\n")[0].trim())
    .filter((title) => title.length > 0)

  return {
    suggestions,
    explanation: "Visualization recommendations based on your dataset and goals",
    code_snippets: {
      "Matplotlib Example":
        "import matplotlib.pyplot as plt\nplt.figure(figsize=(10, 6))\nplt.plot(x, y)\nplt.title('Title')\nplt.xlabel('X Label')\nplt.ylabel('Y Label')\nplt.show()",
      "Seaborn Example":
        "import seaborn as sns\nsns.set_theme()\nsns.scatterplot(data=df, x='x_column', y='y_column', hue='category_column')",
      "Plotly Example":
        "import plotly.express as px\nfig = px.scatter(df, x='x_column', y='y_column', color='category_column')\nfig.show()",
    },
    references: [
      "https://matplotlib.org/stable/gallery/index.html",
      "https://seaborn.pydata.org/examples/index.html",
      "https://plotly.com/python/plotly-express/",
    ],
  }
}

/**
 * Generate analysis suggestions
 */
async function generateAnalysisSuggestions(
  context: SuggestionRequest["context"],
  userId: number,
): Promise<SuggestionResult> {
  const { dataset_description, data_preview, user_goal } = context

  if (!dataset_description) {
    throw new Error("Dataset description is required for analysis suggestions")
  }

  // Use the dedicated data insights function
  const insightsText = await generateDataInsights(
    dataset_description,
    data_preview || "Data preview not provided",
    userId,
  )

  // Parse the insights into a structured format
  const suggestions = insightsText
    .split(/\n#{2,3}\s+/)
    .filter((section) => section.trim().length > 0)
    .map((section) => section.split("\n")[0].trim())
    .filter((title) => title.length > 0)

  return {
    suggestions,
    explanation: "Analysis recommendations based on your dataset",
    code_snippets: {
      "Descriptive Statistics": "df.describe(include='all')",
      "Correlation Analysis": "correlation = df.corr()\nsns.heatmap(correlation, annot=True, cmap='coolwarm')",
      "Time Series Analysis":
        "from statsmodels.tsa.seasonal import seasonal_decompose\nresult = seasonal_decompose(df['value'], model='multiplicative', period=12)\nresult.plot()",
    },
    references: [
      "https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.describe.html",
      "https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.corr.html",
      "https://www.statsmodels.org/stable/generated/statsmodels.tsa.seasonal.seasonal_decompose.html",
    ],
  }
}

/**
 * Generate performance improvement suggestions
 */
async function generatePerformanceImprovementSuggestions(
  context: SuggestionRequest["context"],
  userId: number,
): Promise<SuggestionResult> {
  const { current_models, current_issues, user_goal } = context

  if (!current_models || current_models.length === 0) {
    throw new Error("Current models information is required for performance improvement suggestions")
  }

  const currentModelsText = current_models
    .map(
      (model) =>
        `- ${model.type} (ID: ${model.id}): ${Object.entries(model.performance)
          .map(([key, value]) => `${key}: ${value}`)
          .join(", ")}`,
    )
    .join("\n")

  const currentIssuesText =
    current_issues && current_issues.length > 0
      ? `Current Issues:\n${current_issues.map((issue) => `- ${issue}`).join("\n")}`
      : "No specific issues reported"

  const prompt = `
    You are an expert data scientist specializing in model optimization. Based on the following information, suggest ways to improve model performance.
    
    Current Models:
    ${currentModelsText}
    
    ${currentIssuesText}
    
    User Goal:
    ${user_goal || "Improve model performance"}
    
    Provide the following in your response:
    1. A list of 3-5 specific improvement suggestions
    2. A brief explanation for each suggestion
    3. Python code snippets to implement each suggestion
    
    Format your response as JSON with the following structure:
    {
      "suggestions": ["suggestion1", "suggestion2", ...],
      "explanation": "overall explanation",
      "code_snippets": {
        "suggestion1": "code for suggestion 1",
        "suggestion2": "code for suggestion 2",
        ...
      }
    }
  `

  const response = await generateGeminiResponse(
    prompt,
    {
      temperature: 0.3,
    },
    userId,
  )

  try {
    // Parse the JSON response
    return JSON.parse(response)
  } catch (error) {
    console.error("Error parsing suggestion response:", error)

    // Fallback to a structured response if JSON parsing fails
    return {
      suggestions: ["Hyperparameter tuning", "Ensemble methods", "Cross-validation"],
      explanation: "These techniques can help improve model performance",
      code_snippets: {
        "Hyperparameter tuning":
          "from sklearn.model_selection import GridSearchCV\nparam_grid = {'n_estimators': [50, 100, 200]}\ngrid_search = GridSearchCV(model, param_grid, cv=5)\ngrid_search.fit(X_train, y_train)",
        "Ensemble methods":
          "from sklearn.ensemble import VotingClassifier\nensemble = VotingClassifier(estimators=[('rf', rf_model), ('gb', gb_model)], voting='soft')\nensemble.fit(X_train, y_train)",
        "Cross-validation":
          "from sklearn.model_selection import cross_val_score\nscores = cross_val_score(model, X, y, cv=5)\nprint(f'Cross-validation scores: {scores}')\nprint(f'Mean score: {scores.mean()}')",
      },
    }
  }
}
