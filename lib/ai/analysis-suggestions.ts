/**
 * Service for generating AI-powered analysis suggestions using the Gemini API
 */

import { generateGeminiResponse, GeminiRequestOptions } from './gemini-client'

interface ColumnInfo {
  name: string
  type: string
  description?: string
}

interface DatasetInfo {
  name: string
  description?: string
  rowCount: number
  columns: ColumnInfo[]
  sampleData?: any[]
}

/**
 * Generate analysis suggestions for a dataset
 */
export async function generateAnalysisSuggestions(dataset: DatasetInfo): Promise<string> {
  try {
    // Create a prompt for the Gemini API
    const prompt = `
You are an expert data scientist providing analysis suggestions for a dataset.
Please provide detailed, specific recommendations for analyzing this dataset.

Dataset Information:
- Name: ${dataset.name}
- Description: ${dataset.description || 'No description provided'}
- Row Count: ${dataset.rowCount}
- Columns:
${dataset.columns.map(col => `  - ${col.name} (${col.type})${col.description ? `: ${col.description}` : ''}`).join('\n')}

${dataset.sampleData ? `Sample Data (first ${dataset.sampleData.length} rows):
${JSON.stringify(dataset.sampleData, null, 2)}` : ''}

Please provide the following:

1. Descriptive Statistics: Recommend specific descriptive statistics to calculate for this dataset
2. Correlation Analysis: Suggest relationships to explore between variables
3. Visualization Recommendations: Recommend specific visualizations that would be insightful for this dataset
4. Advanced Analysis: Suggest more sophisticated analyses that could yield deeper insights

Format your response in Markdown with clear sections and bullet points. Be specific about which columns to analyze and what insights to look for.
    `

    // Generate response using Gemini API
    const options: GeminiRequestOptions = {
      temperature: 0.2,
      maxOutputTokens: 1024,
    }
    const response = await generateGeminiResponse(prompt, options)

    return response
  } catch (error) {
    console.error('Error generating analysis suggestions:', error)
    throw new Error('Failed to generate analysis suggestions')
  }
}

/**
 * Generate contextual help for a specific analysis component
 */
export async function generateComponentHelp(componentType: string, context?: any): Promise<string> {
  try {
    // Create a prompt for the Gemini API
    const prompt = `
You are an expert data scientist providing help with data analysis components.
Please provide clear, educational guidance about this analysis component.

Component Type: ${componentType}
${context ? `Context: ${JSON.stringify(context, null, 2)}` : ''}

Please provide:
1. A brief explanation of what this component does
2. When and why to use this type of analysis
3. How to interpret the results
4. Common pitfalls or considerations
5. Best practices for using this component effectively

Format your response in Markdown with clear sections and bullet points. Keep your explanation educational but concise.
    `

    // Generate response using Gemini API
    const options: GeminiRequestOptions = {
      temperature: 0.1,
      maxOutputTokens: 800,
    }
    const response = await generateGeminiResponse(prompt, options)

    return response
  } catch (error) {
    console.error('Error generating component help:', error)
    throw new Error('Failed to generate component help')
  }
}

/**
 * Generate visualization recommendations based on selected columns
 */
export async function generateVisualizationRecommendations(
  columns: ColumnInfo[],
  selectedColumns: string[]
): Promise<string> {
  try {
    // Filter to only the selected columns
    const filteredColumns = columns.filter(col => selectedColumns.includes(col.name))

    // Create a prompt for the Gemini API
    const prompt = `
You are an expert data visualization specialist providing recommendations for visualizing data.
Please suggest the most appropriate visualizations for these columns.

Selected Columns:
${filteredColumns.map(col => `- ${col.name} (${col.type})`).join('\n')}

Please recommend:
1. The top 3-5 most appropriate visualization types for these columns
2. For each visualization, explain:
   - Why it's appropriate for these data types
   - What insights it might reveal
   - How to configure it (axes, color mappings, etc.)
   - Any considerations or potential issues

Format your response in Markdown with clear sections for each visualization type.
    `

    // Generate response using Gemini API
    const options: GeminiRequestOptions = {
      temperature: 0.2,
      maxOutputTokens: 800,
    }
    const response = await generateGeminiResponse(prompt, options)

    return response
  } catch (error) {
    console.error('Error generating visualization recommendations:', error)
    throw new Error('Failed to generate visualization recommendations')
  }
}

/**
 * Generate insights from analysis results
 */
export async function generateInsightsFromResults(
  dataset: DatasetInfo,
  results: any
): Promise<string> {
  try {
    // Create a prompt for the Gemini API
    const prompt = `
You are an expert data analyst interpreting analysis results.
Please provide clear, insightful interpretations of these analysis results.

Dataset Information:
- Name: ${dataset.name}
- Description: ${dataset.description || 'No description provided'}

Analysis Results:
${JSON.stringify(results, null, 2)}

Please provide:
1. Key insights from these results
2. Patterns or trends you observe
3. Potential anomalies or interesting findings
4. Recommendations for further analysis
5. Business implications of these findings (if applicable)

Format your response in Markdown with clear sections and bullet points.
    `

    // Generate response using Gemini API
    const options: GeminiRequestOptions = {
      temperature: 0.3,
      maxOutputTokens: 1024,
    }
    const response = await generateGeminiResponse(prompt, options)

    return response
  } catch (error) {
    console.error('Error generating insights from results:', error)
    throw new Error('Failed to generate insights from results')
  }
}
