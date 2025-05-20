import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { getJobById, updateJobStatus } from "@/lib/db/jobs"
import { createAuditLog } from "@/lib/db/audit-logs"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    // Check authentication
    const session = await getServerSession()
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const jobId = params.id

    // Get job
    const job = await getJobById(jobId)

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 })
    }

    // Return success response
    return NextResponse.json({
      success: true,
      job,
    })
  } catch (error) {
    console.error("Error getting job:", error)
    return NextResponse.json({ error: "Failed to get job" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    // Check authentication
    const session = await getServerSession()
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const jobId = params.id

    // Get request body
    const body = await request.json()
    const { status, result, error } = body

    // Validate input
    if (!status) {
      return NextResponse.json({ error: "Job status is required" }, { status: 400 })
    }

    // Update job status
    const updatedJob = await updateJobStatus(jobId, status, result, error)

    if (!updatedJob) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 })
    }

    // Log job update
    await createAuditLog({
      user_id: Number.parseInt(session.user.id as string),
      action: "job_update",
      entity_type: "job",
      entity_id: jobId,
      details: { status, result, error },
    })

    // Return success response
    return NextResponse.json({
      success: true,
      job: updatedJob,
    })
  } catch (error) {
    console.error("Error updating job:", error)
    return NextResponse.json({ error: "Failed to update job" }, { status: 500 })
  }
}
