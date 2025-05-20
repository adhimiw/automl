import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { createModel, getModel, getUserModels, deleteModel } from "@/lib/ml/deep-learning/model-service"
import type { ModelConfig, ModelMetadata } from "@/lib/ml/deep-learning/model-types"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const modelId = searchParams.get("id")

    if (modelId) {
      // Get specific model
      const model = await getModel(modelId)

      if (!model) {
        return NextResponse.json({ error: "Model not found" }, { status: 404 })
      }

      // Check if user has access to this model
      if (model.userId !== session.user.id) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
      }

      return NextResponse.json(model)
    } else {
      // Get all models for user
      const models = await getUserModels(session.user.id)
      return NextResponse.json(models)
    }
  } catch (error) {
    console.error("Error fetching models:", error)
    return NextResponse.json({ error: "Failed to fetch models" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { config, datasetId, inputShape, outputShape } = body

    if (!config || !datasetId || !inputShape || outputShape === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create model metadata
    const modelData: Omit<ModelMetadata, "id" | "createdAt" | "updatedAt"> = {
      config: config as ModelConfig,
      inputShape: inputShape as number[],
      outputShape: outputShape as number,
      userId: session.user.id,
      datasetId,
      status: "pending",
    }

    const model = await createModel(modelData)

    return NextResponse.json(model, { status: 201 })
  } catch (error) {
    console.error("Error creating model:", error)
    return NextResponse.json({ error: "Failed to create model" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const modelId = searchParams.get("id")

    if (!modelId) {
      return NextResponse.json({ error: "Model ID is required" }, { status: 400 })
    }

    // Check if model exists and user has access
    const model = await getModel(modelId)

    if (!model) {
      return NextResponse.json({ error: "Model not found" }, { status: 404 })
    }

    if (model.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // Delete the model
    const success = await deleteModel(modelId)

    if (!success) {
      return NextResponse.json({ error: "Failed to delete model" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting model:", error)
    return NextResponse.json({ error: "Failed to delete model" }, { status: 500 })
  }
}
