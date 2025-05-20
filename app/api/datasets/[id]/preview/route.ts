import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import db from "@/lib/db"
import { parseUserId } from "@/lib/utils/user-id"
import { getUserIdByEmail } from "@/lib/db/get-user-id"
import { readFile } from "fs/promises"
import { join } from "path"
import { parse as parseCsv } from "csv-parse/sync"
import { existsSync } from "fs"

// Maximum number of rows to return in preview
const MAX_PREVIEW_ROWS = 10

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

    // Get query parameters
    const url = new URL(request.url)
    const rowsParam = url.searchParams.get("rows")
    const maxRows = rowsParam ? parseInt(rowsParam, 10) : MAX_PREVIEW_ROWS

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
        console.log("Development mode: Allowing access to dataset preview despite user ID mismatch");
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
    const fileContent = await readFile(filePath, "utf-8")
    
    // Parse file based on type
    let rows = []
    
    if (dataset.file_type === "csv") {
      // Parse CSV
      rows = parseCsv(fileContent, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
      }).slice(0, maxRows)
    } else if (dataset.file_type === "json") {
      // Parse JSON
      try {
        const jsonData = JSON.parse(fileContent)
        
        if (Array.isArray(jsonData)) {
          rows = jsonData.slice(0, maxRows)
        } else if (typeof jsonData === "object") {
          // If it's a single object, wrap it in an array
          rows = [jsonData].slice(0, maxRows)
        }
      } catch (e) {
        console.error("Error parsing JSON file:", e)
        return NextResponse.json({ error: "Failed to parse JSON file" }, { status: 500 })
      }
    } else {
      // Unsupported file type
      return NextResponse.json({ error: "Unsupported file type" }, { status: 400 })
    }

    // Return preview data
    return NextResponse.json({
      dataset_id: dataset.id,
      file_type: dataset.file_type,
      total_rows: dataset.row_count,
      preview_rows: rows.length,
      rows,
    })
  } catch (error) {
    console.error("Error getting dataset preview:", error)
    return NextResponse.json({ error: "Failed to get dataset preview" }, { status: 500 })
  }
}
