import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { createDataset } from "@/lib/db/datasets"
import { getProjectById } from "@/lib/db/projects"
import { createAuditLog } from "@/lib/db/audit-logs"
import { parseUserId } from "@/lib/utils/user-id"
import { getUserIdByEmail } from "@/lib/db/get-user-id"
import db from "@/lib/db"

export async function POST(request: Request) {
  try {
    // Check authentication
    const session = await getServerSession()
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get request body
    const body = await request.json()
    const { name, description, project_id } = body

    // Validate input
    if (!name || !project_id) {
      return NextResponse.json({ error: "Dataset name and project ID are required" }, { status: 400 })
    }

    // Check if project exists and user has access
    const project = await getProjectById(project_id)
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    // Parse and validate the user ID
    const userId = parseUserId(session.user.id);

    if (userId === null || project.user_id !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // Create dataset
    const dataset = await createDataset({
      name,
      description,
      project_id,
    })

    // Log dataset creation
    await createAuditLog({
      user_id: userId,
      action: "dataset_create",
      entity_type: "dataset",
      entity_id: dataset.id.toString(),
      details: { name, description, project_id },
    })

    // Return success response
    return NextResponse.json({
      success: true,
      dataset,
    })
  } catch (error) {
    console.error("Error creating dataset:", error)
    return NextResponse.json({ error: "Failed to create dataset" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    // Check authentication
    const session = await getServerSession()
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get query parameters
    const url = new URL(request.url)
    const projectId = url.searchParams.get("project_id")

    // Debug session user ID
    console.log("GET Datasets - Session user ID:", session.user.id);
    console.log("GET Datasets - Session user ID type:", typeof session.user.id);
    console.log("GET Datasets - Session user email:", session.user.email);

    // Try to get user ID from session
    let userId = parseUserId(session.user.id);

    // If userId is null, try to get it by email
    if (userId === null && session.user.email) {
      userId = await getUserIdByEmail(session.user.email);
      console.log("GET Datasets - Got user ID by email:", userId);
    }

    // If still null, return error
    if (userId === null) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    let datasets = []

    if (projectId) {
      // Check if project exists and user has access
      const projectResult = await db.query(
        `SELECT * FROM projects WHERE id = $1`,
        [projectId]
      )

      if (projectResult.rows.length === 0) {
        return NextResponse.json({ error: "Project not found" }, { status: 404 })
      }

      const project = projectResult.rows[0]

      // Check if user has access to this project
      if (project.user_id !== userId) {
        // For development, allow access to any project
        if (process.env.NODE_ENV === "development") {
          console.log("Development mode: Allowing access to project datasets despite user ID mismatch");
        } else {
          return NextResponse.json({ error: "Forbidden" }, { status: 403 })
        }
      }

      // Get datasets for this project
      const datasetsResult = await db.query(
        `SELECT * FROM datasets WHERE project_id = $1 ORDER BY created_at DESC`,
        [projectId]
      )

      datasets = datasetsResult.rows
    } else {
      // Get all datasets for this user
      const datasetsResult = await db.query(
        `SELECT d.* FROM datasets d
         JOIN projects p ON d.project_id = p.id
         WHERE p.user_id = $1
         ORDER BY d.created_at DESC`,
        [userId]
      )

      datasets = datasetsResult.rows
    }

    // Return datasets
    return NextResponse.json(datasets)
  } catch (error) {
    console.error("Error getting datasets:", error)
    return NextResponse.json({ error: "Failed to get datasets" }, { status: 500 })
  }
}
