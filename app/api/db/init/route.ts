import { NextResponse } from "next/server"
import db from "@/lib/db"
import { serverEnv } from "@/lib/env"

// Only allow initialization in development mode
export async function POST(request: Request) {
  try {
    if (serverEnv.app.nodeEnv === "production") {
      return NextResponse.json({ error: "Database initialization is not allowed in production" }, { status: 403 })
    }

    // Initialize database tables
    await db.initDb()

    return NextResponse.json({
      success: true,
      message: "Database initialized successfully",
    })
  } catch (error) {
    console.error("Error initializing database:", error)
    return NextResponse.json({ error: "Failed to initialize database" }, { status: 500 })
  }
}
