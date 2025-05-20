import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import db from "@/lib/db"
import { parseUserId } from "@/lib/utils/user-id"
import { getUserIdByEmail } from "@/lib/db/get-user-id"
import { createAuditLog } from "@/lib/db/audit-logs"
import { readFile } from "fs/promises"
import { join } from "path"
import { stat } from "fs/promises"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const session = await getServerSession()
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const datasetId = params.id

    // Validate dataset ID
    if (!datasetId || isNaN(Number(datasetId))) {
      return NextResponse.json({ error: "Invalid dataset ID" }, { status: 400 })
    }

    // Debug session user ID
    console.log("GET Dataset - Session user ID:", session.user.id);
    console.log("GET Dataset - Session user ID type:", typeof session.user.id);
    console.log("GET Dataset - Session user email:", session.user.email);
    
    // Try to get user ID from session
    let userId = parseUserId(session.user.id);
    
    // If userId is null, try to get it by email
    if (userId === null && session.user.email) {
      userId = await getUserIdByEmail(session.user.email);
      console.log("GET Dataset - Got user ID by email:", userId);
    }
    
    // If still null, return error
    if (userId === null) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    // Get dataset from database
    const result = await db.query(
      `SELECT d.* FROM datasets d
       JOIN projects p ON d.project_id = p.id
       WHERE d.id = $1`,
      [datasetId]
    )

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Dataset not found" }, { status: 404 })
    }

    const dataset = result.rows[0]

    // Get project to check ownership
    const projectResult = await db.query(
      `SELECT * FROM projects WHERE id = $1`,
      [dataset.project_id]
    )

    if (projectResult.rows.length === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    const project = projectResult.rows[0]

    // Check if user has access to this project
    if (project.user_id !== userId) {
      // For development, allow access to any project
      if (process.env.NODE_ENV === "development") {
        console.log("Development mode: Allowing access to dataset despite user ID mismatch");
      } else {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
      }
    }

    // Return dataset
    return NextResponse.json(dataset)
  } catch (error) {
    console.error("Error getting dataset:", error)
    return NextResponse.json({ error: "Failed to get dataset" }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const session = await getServerSession()
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const datasetId = params.id

    // Validate dataset ID
    if (!datasetId || isNaN(Number(datasetId))) {
      return NextResponse.json({ error: "Invalid dataset ID" }, { status: 400 })
    }

    // Try to get user ID from session
    let userId = parseUserId(session.user.id);
    
    // If userId is null, try to get it by email
    if (userId === null && session.user.email) {
      userId = await getUserIdByEmail(session.user.email);
    }
    
    // If still null, return error
    if (userId === null) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    // Get dataset to check ownership
    const datasetResult = await db.query(
      `SELECT d.*, p.user_id FROM datasets d
       JOIN projects p ON d.project_id = p.id
       WHERE d.id = $1`,
      [datasetId]
    )

    if (datasetResult.rows.length === 0) {
      return NextResponse.json({ error: "Dataset not found" }, { status: 404 })
    }

    const dataset = datasetResult.rows[0]

    // Check if user has access to this dataset
    if (dataset.user_id !== userId) {
      // For development, allow access to any dataset
      if (process.env.NODE_ENV === "development") {
        console.log("Development mode: Allowing deletion of dataset despite user ID mismatch");
      } else {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
      }
    }

    // Delete dataset
    await db.query(
      `DELETE FROM datasets WHERE id = $1`,
      [datasetId]
    )

    // Log dataset deletion
    await createAuditLog({
      user_id: userId,
      action: "dataset_delete",
      entity_type: "dataset",
      entity_id: datasetId,
      details: { name: dataset.name, project_id: dataset.project_id },
    })

    // Return success
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting dataset:", error)
    return NextResponse.json({ error: "Failed to delete dataset" }, { status: 500 })
  }
}
