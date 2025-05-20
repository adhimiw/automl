import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { parseUserId } from "@/lib/utils/user-id"
import { getUserIdByEmail } from "@/lib/db/get-user-id"
import { createAuditLog } from "@/lib/db/audit-logs"
import db from "@/lib/db"
import { writeFile } from "fs/promises"
import { join } from "path"
import { mkdir } from "fs/promises"

// Maximum file size (10MB)
const MAX_FILE_SIZE = 10 * 1024 * 1024

export async function POST(request: Request) {
  try {
    // Check authentication
    const session = await getServerSession()
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Debug session user ID
    console.log("Upload Dataset - Session user ID:", session.user.id);
    console.log("Upload Dataset - Session user ID type:", typeof session.user.id);
    console.log("Upload Dataset - Session user email:", session.user.email);
    
    // Try to get user ID from session
    let userId = parseUserId(session.user.id);
    
    // If userId is null, try to get it by email
    if (userId === null && session.user.email) {
      userId = await getUserIdByEmail(session.user.email);
      console.log("Upload Dataset - Got user ID by email:", userId);
    }
    
    // If still null, return error
    if (userId === null) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    // Parse form data
    const formData = await request.formData()
    const file = formData.get("file") as File
    const name = formData.get("name") as string || file.name
    const description = formData.get("description") as string || ""
    const projectId = formData.get("project_id") as string

    // Validate input
    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 })
    }

    if (!projectId) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 })
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File size exceeds the limit (10MB)" }, { status: 400 })
    }

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
        console.log("Development mode: Allowing upload to project despite user ID mismatch");
      } else {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
      }
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), "uploads")
    await mkdir(uploadsDir, { recursive: true })

    // Create project directory if it doesn't exist
    const projectDir = join(uploadsDir, projectId.toString())
    await mkdir(projectDir, { recursive: true })

    // Generate unique filename
    const timestamp = Date.now()
    const fileExtension = file.name.split(".").pop()
    const filename = `${timestamp}-${file.name.replace(/\s+/g, "-")}`
    const filePath = join(projectDir, filename)
    const relativePath = join("uploads", projectId.toString(), filename)

    // Save file to disk
    const fileBuffer = Buffer.from(await file.arrayBuffer())
    await writeFile(filePath, fileBuffer)

    // Analyze file to get row and column count
    let rowCount = 0
    let columnCount = 0

    // Simple analysis based on file type
    if (fileExtension === "csv") {
      // For CSV, count lines and columns in first line
      const content = fileBuffer.toString()
      const lines = content.split("\n").filter(line => line.trim())
      rowCount = lines.length - 1 // Subtract header row
      if (lines.length > 0) {
        columnCount = lines[0].split(",").length
      }
    } else if (fileExtension === "json") {
      // For JSON, parse and count items
      try {
        const content = JSON.parse(fileBuffer.toString())
        if (Array.isArray(content)) {
          rowCount = content.length
          if (content.length > 0 && typeof content[0] === "object") {
            columnCount = Object.keys(content[0]).length
          }
        }
      } catch (e) {
        console.error("Error parsing JSON file:", e)
      }
    }

    // Save dataset to database
    const result = await db.query(
      `INSERT INTO datasets (name, description, project_id, file_path, file_type, row_count, column_count)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [name, description, projectId, relativePath, fileExtension, rowCount, columnCount]
    )

    const dataset = result.rows[0]

    // Log dataset creation
    await createAuditLog({
      user_id: userId,
      action: "dataset_upload",
      entity_type: "dataset",
      entity_id: dataset.id.toString(),
      details: { name, project_id: projectId, file_path: relativePath },
    })

    // Return success response
    return NextResponse.json({
      success: true,
      dataset,
    })
  } catch (error) {
    console.error("Error uploading dataset:", error)
    return NextResponse.json({ error: "Failed to upload dataset" }, { status: 500 })
  }
}
