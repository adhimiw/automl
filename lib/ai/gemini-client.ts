/**
 * Gemini API Client - Handles interactions with Google's Gemini API
 */
import { GoogleGenerativeAI, GenerativeModel } from "@google/genai";
import { createAuditLog } from "@/lib/db/audit-logs";

// Gemini model options
export type GeminiModel = "gemini-pro" | "gemini-pro-vision";

// Gemini request options
export interface GeminiRequestOptions {
  model?: GeminiModel;
  temperature?: number;
  maxOutputTokens?: number;
  topK?: number;
  topP?: number;
  safetySettings?: Array<{
    category: string;
    threshold: string;
  }>;
}

// Default options
const DEFAULT_OPTIONS: GeminiRequestOptions = {
  model: "gemini-pro",
  temperature: 0.7,
  maxOutputTokens: 1024,
  topK: 40,
  topP: 0.95,
};

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

/**
 * Generate text using Gemini API
 */
export async function generateGeminiResponse(
  prompt: string,
  options: GeminiRequestOptions = {},
  userId?: number,
): Promise<string> {
  try {
    const startTime = Date.now();

    // Merge default options with provided options
    const mergedOptions = { ...DEFAULT_OPTIONS, ...options };

    // Create a generative model instance
    const model = genAI.getGenerativeModel({
      model: mergedOptions.model || "gemini-pro",
      generationConfig: {
        temperature: mergedOptions.temperature,
        maxOutputTokens: mergedOptions.maxOutputTokens,
        topK: mergedOptions.topK,
        topP: mergedOptions.topP,
      },
    });

    // Generate response
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Log the request if userId is provided
    if (userId) {
      await createAuditLog({
        action: "AI_GENERATE",
        entityId: userId.toString(),
        entityType: "USER",
        metadata: {
          prompt,
          model: mergedOptions.model,
          responseTime: Date.now() - startTime,
        },
      });
    }

    return text;
  } catch (error) {
    console.error("Error generating Gemini response:", error);
    throw error;
  }
}

/**
 * Generate data insights using Gemini API
 */
export async function generateDataInsights(
  dataDescription: string,
  dataPreview: string,
  userId?: number,
): Promise<string> {
  const prompt = `
    You are an expert data analyst. Analyze the following dataset and provide valuable insights.
    
    Dataset Description:
    ${dataDescription}
    
    Data Preview:
    ${dataPreview}
    
    Please provide:
    1. A summary of the dataset
    2. Key patterns or trends you notice
    3. Potential correlations between variables
    4. Anomalies or outliers that should be investigated
    5. Recommendations for further analysis
    
    Format your response in markdown.
  `

  return generateGeminiResponse(
    prompt,
    {
      temperature: 0.3, // Lower temperature for more factual responses
      maxOutputTokens: 2048, // Allow longer responses for detailed analysis
    },
    userId,
  )
}

/**
 * Generate code for data transformation using Gemini API
 */
export async function generateTransformationCode(
  dataDescription: string,
  transformationGoal: string,
  language: "python" | "sql" | "javascript" = "python",
  userId?: number,
): Promise<string> {
  const prompt = `
    You are an expert data engineer. Generate ${language.toUpperCase()} code to transform the following dataset.
    
    Dataset Description:
    ${dataDescription}
    
    Transformation Goal:
    ${transformationGoal}
    
    Please provide:
    1. Clean, well-commented ${language.toUpperCase()} code to perform the transformation
    2. A brief explanation of how the code works
    3. Any assumptions you're making about the data
    
    Format your response with the code in a code block with the appropriate language tag.
  `

  return generateGeminiResponse(
    prompt,
    {
      temperature: 0.2, // Lower temperature for more precise code generation
      maxOutputTokens: 2048,
    },
    userId,
  )
}

/**
 * Generate visualization recommendations using Gemini API
 */
export async function generateVisualizationRecommendations(
  dataDescription: string,
  analysisGoal: string,
  userId?: number,
): Promise<string> {
  const prompt = `
    You are an expert data visualization specialist. Recommend visualizations for the following dataset and analysis goal.
    
    Dataset Description:
    ${dataDescription}
    
    Analysis Goal:
    ${analysisGoal}
    
    Please provide:
    1. 3-5 recommended visualization types that would be most effective
    2. For each visualization, explain why it's appropriate and what insights it might reveal
    3. Any specific considerations for implementing these visualizations
    
    Format your response in markdown with clear sections for each recommendation.
  `

  return generateGeminiResponse(
    prompt,
    {
      temperature: 0.4,
      maxOutputTokens: 1536,
    },
    userId,
  )
}
