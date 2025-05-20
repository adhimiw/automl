import { NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"
import { mkdir, writeFile } from "fs/promises"
import path from "path"
import db from "@/lib/db"
import redis from "@/lib/redis"
import { serverEnv } from "@/lib/env"

// Get upload directory from environment variables
const UPLOAD_DIR = serverEnv.app.uploadDir

// Ensure upload directory exists
async function ensureUploadDir() {
  try {
    await mkdir(UPLOAD_DIR, { recursive: true })
  } catch (error) {
    console.error("Error creating upload directory:", error)
  }
}

export async function POST(request: Request) {
  try {
    // Ensure upload directory exists
    await ensureUploadDir()

    // Get form data
    const formData = await request.formData()
    const file = formData.get("file") as File
    const projectId = formData.get("projectId") as string
    const description = (formData.get("description") as string) || ""

    // Validate inputs
    if (!file || !projectId) {
      return NextResponse.json({ error: "File and project ID are required" }, { status: 400 })
    }

    // Check if file is valid
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Invalid file" }, { status: 400 })
    }

    // Generate unique filename
    const fileId = uuidv4()
    const fileExtension = path.extname(file.name)
    const fileName = `${fileId}${fileExtension}`
    const filePath = path.join(UPLOAD_DIR, fileName)

    // Save file to disk
    const fileBuffer = Buffer.from(await file.arrayBuffer())
    await writeFile(filePath, fileBuffer)

    // Create dataset record in database
    const result = await db.query(
      `INSERT INTO datasets (name, description, project_id, file_path, file_type)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [file.name, description, projectId, filePath, fileExtension.substring(1)],
    )

    const datasetId = result.rows[0].id

    // Create a background job for processing the dataset
    const jobId = uuidv4()
    const jobData = {
      id: jobId,
      type: "process_dataset",
      datasetId,
      filePath,
      fileType: fileExtension.substring(1),
      status: "pending",
      createdAt: new Date().toISOString(),
    }

    // Store job in Redis
    await redis.storeJob(jobId, jobData)

    // Return success response
    return NextResponse.json({
      success: true,
      datasetId,
      jobId,
      message: "File uploaded successfully and processing has started",
    })
  } catch (error) {
    console.error("Error handling file upload:", error)
    return NextResponse.json({ error: "Failed to process file upload" }, { status: 500 })
  }
}
