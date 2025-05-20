import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { getAllFeatureFlags, createFeatureFlag } from "@/lib/db/feature-flags"
import { createAuditLog } from "@/lib/db/audit-logs"

export async function GET(request: Request) {
  try {
    // Check authentication
    const session = await getServerSession()
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get all feature flags
    const featureFlags = await getAllFeatureFlags()

    // Return success response
    return NextResponse.json({
      success: true,
      featureFlags,
    })
  } catch (error) {
    console.error("Error getting feature flags:", error)
    return NextResponse.json({ error: "Failed to get feature flags" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    // Check authentication
    const session = await getServerSession()
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get request body
    const body = await request.json()
    const { name, description, enabled } = body

    // Validate input
    if (!name) {
      return NextResponse.json({ error: "Feature flag name is required" }, { status: 400 })
    }

    // Create feature flag
    const featureFlag = await createFeatureFlag({
      name,
      description,
      enabled,
    })

    // Log feature flag creation
    await createAuditLog({
      user_id: Number.parseInt(session.user.id as string),
      action: "feature_flag_create",
      entity_type: "feature_flag",
      entity_id: featureFlag.name,
      details: { name, description, enabled },
    })

    // Return success response
    return NextResponse.json({
      success: true,
      featureFlag,
    })
  } catch (error) {
    console.error("Error creating feature flag:", error)
    return NextResponse.json({ error: "Failed to create feature flag" }, { status: 500 })
  }
}
