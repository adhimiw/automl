import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { generateSuggestions, type SuggestionRequest } from "@/lib/ai/suggestion-engine"
import { createAuditLog } from "@/lib/db/audit-logs"

export async function POST(request: Request) {
  try {
    // Check authentication
    const session = await getServerSession()
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get request body
    const body = await request.json()
    const suggestionRequest: SuggestionRequest = body

    // Validate request
    if (!suggestionRequest.type || !suggestionRequest.context) {
      return NextResponse.json({ error: "Invalid request. Type and context are required." }, { status: 400 })
    }

    // Generate suggestions
    const suggestions = await generateSuggestions(suggestionRequest, Number.parseInt(session.user.id as string))

    // Log the successful API call
    await createAuditLog({
      user_id: Number.parseInt(session.user.id as string),
      action: "api_suggestions",
      details: {
        suggestion_type: suggestionRequest.type,
        suggestion_count: suggestions.suggestions.length,
      },
    })

    return NextResponse.json(suggestions)
  } catch (error) {
    console.error("Error generating suggestions:", error)
    return NextResponse.json(
      { error: "Failed to generate suggestions", details: (error as Error).message },
      { status: 500 },
    )
  }
}
