import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { makePrediction, type PredictionRequest } from "@/lib/ml/prediction-service"
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
    const predictionRequest: PredictionRequest = body

    // Validate request
    if (!predictionRequest.model_id || !predictionRequest.data) {
      return NextResponse.json({ error: "Invalid request. Model ID and data are required." }, { status: 400 })
    }

    const userId = Number.parseInt(session.user.id as string)

    // Make prediction
    const predictionResult = await makePrediction(predictionRequest, userId)

    // Log the successful API call
    await createAuditLog({
      user_id: userId,
      action: "api_predict",
      details: {
        model_id: predictionRequest.model_id,
        prediction_count: predictionResult.predictions.length,
      },
    })

    return NextResponse.json(predictionResult)
  } catch (error) {
    console.error("Error making prediction:", error)
    return NextResponse.json({ error: "Failed to make prediction", details: (error as Error).message }, { status: 500 })
  }
}
