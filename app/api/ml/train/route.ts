import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { registerModel } from "@/lib/ml/model-registry"
import { trainModel, type TrainingConfig } from "@/lib/ml/model-training"
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
    const { name, description, type, dataset_id, features, target, hyperparameters } = body

    // Validate request
    if (!name || !type || !dataset_id || !features || !target) {
      return NextResponse.json(
        { error: "Invalid request. Name, type, dataset_id, features, and target are required." },
        { status: 400 },
      )
    }

    const userId = Number.parseInt(session.user.id as string)

    // Register the model
    const model = await registerModel({
      name,
      description: description || `${type} model for dataset ${dataset_id}`,
      type,
      version: "1.0.0",
      status: "draft",
      created_by: userId,
      features,
      target,
      dataset_id,
      hyperparameters,
      framework: "scikit-learn",
    })

    // Create training configuration
    const trainingConfig: TrainingConfig = {
      dataset_id,
      features,
      target,
      model_type: type,
      hyperparameters,
      validation_split: 0.2,
      test_size: 0.1,
      random_state: 42,
    }

    // Start model training
    const trainingResult = await trainModel(model.id, trainingConfig, userId)

    // Log the successful API call
    await createAuditLog({
      user_id: userId,
      action: "api_train_model",
      details: {
        model_id: model.id,
        model_type: type,
        dataset_id,
        is_successful: trainingResult.is_successful,
      },
    })

    return NextResponse.json({
      model_id: model.id,
      training_result: trainingResult,
    })
  } catch (error) {
    console.error("Error training model:", error)
    return NextResponse.json({ error: "Failed to train model", details: (error as Error).message }, { status: 500 })
  }
}
