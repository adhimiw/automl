import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { v4 as uuidv4 } from "uuid"
import { createJob, getPendingJobs } from "@/lib/db/jobs"
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
    const { type, data } = body

    // Validate input
    if (!type) {
      return NextResponse.json({ error: "Job type is required" }, { status: 400 })
    }

    // Generate job ID
    const jobId = uuidv4()

    // Create job
    const job = await createJob({
      id: jobId,
      type,
      data,
    })

    // Log job creation
    await createAuditLog({
      user_id: Number.parseInt(session.user.id as string),
      action: "job_create",
      entity_type: "job",
      entity_id: jobId,
      details: { type, data },
    })

    // Return success response
    return NextResponse.json({
      success: true,
      job,
    })
  } catch (error) {
    console.error("Error creating job:", error)
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    // Check authentication
    const session = await getServerSession()
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get pending jobs
    const jobs = await getPendingJobs()

    // Return success response
    return NextResponse.json({
      success: true,
      jobs,
    })
  } catch (error) {
    console.error("Error getting jobs:", error)
    return NextResponse.json({ error: "Failed to get jobs" }, { status: 500 })
  }
}
