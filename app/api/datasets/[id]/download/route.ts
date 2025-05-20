import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import db from "@/lib/db"
import { parseUserId } from "@/lib/utils/user-id"
import { getUserIdByEmail } from "@/lib/db/get-user-id"
import { readFile } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"
import { createAuditLog } from "@/lib/db/audit-logs"

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
        console.log("Development mode: Allowing download of dataset despite user ID mismatch");
      } else {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
      }
    }

    // Check if file exists
    if (!dataset.file_path) {
      return NextResponse.json({ error: "Dataset file not found" }, { status: 404 })
    }

    const filePath = join(process.cwd(), dataset.file_path)
    
    if (!existsSync(filePath)) {
      return NextResponse.json({ error: "Dataset file not found on disk" }, { status: 404 })
    }

    // Read file
    const fileContent = await readFile(filePath)
    
    // Get filename from file path
    const filename = dataset.file_path.split("/").pop() || `dataset-${datasetId}.${dataset.file_type}`

    // Log download
    await createAuditLog({
      user_id: userId,
      action: "dataset_download",
      entity_type: "dataset",
      entity_id: datasetId,
      details: { name: dataset.name, project_id: dataset.project_id },
    })

    // Return file
    return new NextResponse(fileContent, {
      headers: {
        "Content-Type": getContentType(dataset.file_type),
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    console.error("Error downloading dataset:", error)
    return NextResponse.json({ error: "Failed to download dataset" }, { status: 500 })
  }
}

// Helper function to get content type based on file extension
function getContentType(fileType: string | null): string {
  switch (fileType?.toLowerCase()) {
    case "csv":
      return "text/csv"
    case "json":
      return "application/json"
    case "xlsx":
    case "xls":
      return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    default:
      return "application/octet-stream"
  }
}
