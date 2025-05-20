/**
 * AI Assistant Service
 * 
 * This service provides functions for interacting with the Gemini API
 * to generate educational content and provide contextual help.
 */
import { searchKnowledgeBase } from './content-generator'

// Interface for AI assistant request
export interface AIAssistantRequest {
  query: string
  context?: {
    type: 'concept' | 'tutorial' | 'learning_path'
    id: string | number
    title: string
    content?: string
  }
  user_id?: number
  history?: {
    role: 'user' | 'assistant'
    content: string
  }[]
}

// Interface for AI assistant response
export interface AIAssistantResponse {
  response: string
  related_content?: {
    type: 'concept' | 'tutorial'
    id: string | number
    title: string
  }[]
  suggested_queries?: string[]
}

/**
 * Generate a response from the AI assistant
 * @param request AI assistant request
 * @returns AI assistant response
 */
export async function generateAIResponse(
  request: AIAssistantRequest
): Promise<AIAssistantResponse> {
  try {
    // Check if Gemini API key is available
    const apiKey = process.env.GEMINI_API_KEY
    
    if (!apiKey || apiKey === 'your-gemini-api-key') {
      console.log('Using mock AI response (no Gemini API key)')
      return generateMockAIResponse(request)
    }
    
    // Search for related content
    let relatedContent: AIAssistantResponse['related_content'] = []
    
    if (request.query) {
      const searchResponse = await searchKnowledgeBase({
        query: request.query,
        limit: 3
      })
      
      if (searchResponse.success && searchResponse.data) {
        relatedContent = searchResponse.data.results.map(result => ({
          type: result.steps ? 'tutorial' : 'concept',
          id: result.id,
          title: result.title
        }))
      }
    }
    
    // Prepare the prompt for Gemini
    const prompt = prepareGeminiPrompt(request)
    
    // Call Gemini API
    const response = await callGeminiAPI(prompt, apiKey)
    
    return {
      response,
      related_content: relatedContent,
      suggested_queries: generateSuggestedQueries(request)
    }
  } catch (error) {
    console.error('Error generating AI response:', error)
    return {
      response: 'I apologize, but I encountered an error while processing your request. Please try again later.',
      suggested_queries: [
        'What is data science?',
        'How do I start learning machine learning?',
        'What are the best resources for beginners?',
        'What skills do I need for data science?'
      ]
    }
  }
}

/**
 * Prepare a prompt for the Gemini API
 * @param request AI assistant request
 * @returns Prompt for Gemini
 */
function prepareGeminiPrompt(request: AIAssistantRequest): string {
  let prompt = `You are an educational AI assistant for a data science learning platform. 
Your goal is to provide helpful, accurate, and educational responses to user questions about data science, 
machine learning, and related topics. Keep your responses concise, informative, and focused on helping the user learn.

User query: ${request.query}
`

  // Add context if available
  if (request.context) {
    prompt += `\nContext: The user is currently viewing a ${request.context.type} titled "${request.context.title}".`
    
    if (request.context.content) {
      prompt += `\nContent summary: ${request.context.content}`
    }
  }
  
  // Add conversation history if available
  if (request.history && request.history.length > 0) {
    prompt += '\n\nConversation history:'
    
    for (const message of request.history) {
      prompt += `\n${message.role === 'user' ? 'User' : 'Assistant'}: ${message.content}`
    }
  }
  
  prompt += '\n\nYour response:'
  
  return prompt
}

/**
 * Call the Gemini API
 * @param prompt Prompt for Gemini
 * @param apiKey Gemini API key
 * @returns Response from Gemini
 */
async function callGeminiAPI(prompt: string, apiKey: string): Promise<string> {
  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024
        }
      })
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      console.error('Gemini API error:', data)
      throw new Error(`Gemini API error: ${data.error?.message || 'Unknown error'}`)
    }
    
    // Extract the text from the response
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text
    
    if (!text) {
      throw new Error('No text in Gemini response')
    }
    
    return text
  } catch (error) {
    console.error('Error calling Gemini API:', error)
    throw error
  }
}

/**
 * Generate suggested queries based on the current context
 * @param request AI assistant request
 * @returns Suggested queries
 */
function generateSuggestedQueries(request: AIAssistantRequest): string[] {
  if (!request.context) {
    return [
      'What is data science?',
      'How do I start learning machine learning?',
      'What are the best resources for beginners?',
      'What skills do I need for data science?'
    ]
  }
  
  if (request.context.type === 'concept') {
    return [
      `Explain ${request.context.title} in simpler terms`,
      `What are some practical applications of ${request.context.title}?`,
      `What should I learn after ${request.context.title}?`,
      `Show me an example of ${request.context.title}`
    ]
  } else if (request.context.type === 'tutorial') {
    return [
      `What are the prerequisites for this tutorial?`,
      `I'm stuck on this tutorial. Can you help?`,
      `Explain the code in this tutorial`,
      `What are some common mistakes to avoid in this tutorial?`
    ]
  } else if (request.context.type === 'learning_path') {
    return [
      `How long will it take to complete this learning path?`,
      `What will I learn in this path?`,
      `Is this learning path right for beginners?`,
      `What jobs require the skills in this learning path?`
    ]
  }
  
  return [
    'What topics should I learn first in data science?',
    'Explain machine learning in simple terms',
    'What\'s the difference between supervised and unsupervised learning?',
    'How do I prepare data for a machine learning model?'
  ]
}

/**
 * Generate a mock AI response (fallback when API is unavailable)
 * @param request AI assistant request
 * @returns Mock AI assistant response
 */
function generateMockAIResponse(request: AIAssistantRequest): AIAssistantResponse {
  // Search for related content
  let relatedContent: AIAssistantResponse['related_content'] = []
  
  // Generate a response based on the user's query
  let response = ''
  
  if (request.query.toLowerCase().includes('hello') || request.query.toLowerCase().includes('hi')) {
    response = 'Hello! How can I help you with your learning journey today?'
  } else if (request.query.toLowerCase().includes('thank')) {
    response = 'You\'re welcome! Feel free to ask if you have any other questions.'
  } else if (
    request.query.toLowerCase().includes('concept') || 
    request.query.toLowerCase().includes('explain') || 
    request.query.toLowerCase().includes('what is')
  ) {
    response = `That's a great question about ${request.query.split(' ').slice(-3).join(' ')}. This concept refers to a fundamental idea in data science. I'd recommend checking out the related resources I've found for you below for a more detailed explanation.`
  } else if (
    request.query.toLowerCase().includes('tutorial') || 
    request.query.toLowerCase().includes('how to') || 
    request.query.toLowerCase().includes('learn')
  ) {
    response = `If you want to learn about this topic, I've found some tutorials that might help you. Check out the related resources below. Would you like me to explain any specific part in more detail?`
  } else {
    response = `I understand you're asking about ${request.query.split(' ').slice(0, 3).join(' ')}. This is an interesting topic in data science. I've found some resources that might help you understand it better. Let me know if you need more specific information!`
  }
  
  return {
    response,
    related_content: relatedContent,
    suggested_queries: generateSuggestedQueries(request)
  }
}
