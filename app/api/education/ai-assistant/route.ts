/**
 * API Route for AI Assistant
 * 
 * This API provides an endpoint for generating AI responses to user queries
 * about educational content.
 */
import { NextRequest, NextResponse } from 'next/server'
import { generateAIResponse, AIAssistantRequest } from '@/lib/education/ai-assistant-service'

/**
 * POST /api/education/ai-assistant
 * Generate an AI response to a user query
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as AIAssistantRequest
    
    // Validate required fields
    if (!body.query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      )
    }
    
    // Generate AI response
    const response = await generateAIResponse(body)
    
    return NextResponse.json(response)
  } catch (error) {
    console.error('Error generating AI response:', error)
    return NextResponse.json(
      { error: 'Failed to generate AI response' },
      { status: 500 }
    )
  }
}
