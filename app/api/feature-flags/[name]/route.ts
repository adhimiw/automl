import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { getFeatureFlagByName, updateFeatureFlag } from "@/lib/db/feature-flags"
import { createAuditLog } from "@/lib/db/audit-logs"

export async function GET(request: Request, { params }: { params: { name: string } }) {
  try {
    // Check authentication
    const session = await getServerSession()
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const flagName = params.name

    // Get feature flag
    const featureFlag = await getFeatureFlagByName(flagName)

    if (!featureFlag) {
      return NextResponse.json({ error: "Feature flag not found" }, { status: 404 })
    }

    // Return success response
    return NextResponse.json({
      success: true,
      featureFlag,
    })
  } catch (error) {
    console.error("Error getting feature flag:", error)
    return NextResponse.json({ error: "Failed to get feature flag" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: { name: string } }) {
  try {
    // Check authentication
    const session = await getServerSession()
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const flagName = params.name

    // Get request body
    const body = await request.json()
    const { enabled } = body

    // Validate input
    if (enabled === undefined) {
      return NextResponse.json({ error: "Enabled state is required" }, { status: 400 })
    }

    // Update feature flag
    const updatedFlag = await updateFeatureFlag(flagName, enabled)

    if (!updatedFlag) {
      return NextResponse.json({ error: "Feature flag not found" }, { status: 404 })
    }

    // Log feature flag update
    await createAuditLog({
      user_id: Number.parseInt(session.user.id as string),
      action: "feature_flag_update",
      entity_type: "feature_flag",
      entity_id: flagName,
      details: { enabled },
    })

    // Return success response
    return NextResponse.json({
      success: true,
      featureFlag: updatedFlag,
    })
  } catch (error) {
    console.error("Error updating feature flag:", error)
    return NextResponse.json({ error: "Failed to update feature flag" }, { status: 500 })
  }
}
