import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { createProject, getProjectsByUserId } from "@/lib/db/projects"
import { createAuditLog } from "@/lib/db/audit-logs"
import { parseUserId } from "@/lib/utils/user-id"
import { getUserIdByEmail, getFirstUserId } from "@/lib/db/get-user-id"
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
    const { name, description } = body

    // Validate input
    if (!name) {
      return NextResponse.json({ error: "Project name is required" }, { status: 400 })
    }

    // Create project
    // Debug session user ID
    console.log("Session user ID:", session.user.id);
    console.log("Session user ID type:", typeof session.user.id);
    console.log("Session user email:", session.user.email);

    // Try to get user ID from session
    let userId = parseUserId(session.user.id);

    // If userId is null, try to get it by email
    if (userId === null && session.user.email) {
      userId = await getUserIdByEmail(session.user.email);
      console.log("Got user ID by email:", userId);
    }

    // If still null, try to get the first user from the database
    if (userId === null) {
      userId = await getFirstUserId();
      console.log("Using first user ID:", userId);

      if (userId === null) {
        return NextResponse.json({ error: "No users found in the database" }, { status: 500 });
      }
    }

    const project = await createProject({
      name,
      description,
      user_id: userId,
    })

    // Log project creation
    await createAuditLog({
      user_id: userId,
      action: "project_create",
      entity_type: "project",
      entity_id: project.id.toString(),
      details: { name, description },
    })

    // Return success response
    return NextResponse.json({
      success: true,
      project,
    })
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    // Check authentication
    const session = await getServerSession()
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Debug session user ID
    console.log("GET - Session user ID:", session.user.id);
    console.log("GET - Session user ID type:", typeof session.user.id);
    console.log("GET - Session user email:", session.user.email);

    // Try to get user ID from session
    let userId = parseUserId(session.user.id);

    // If userId is null, try to get it by email
    if (userId === null && session.user.email) {
      userId = await getUserIdByEmail(session.user.email);
      console.log("GET - Got user ID by email:", userId);
    }

    // If still null, try to get the first user from the database
    if (userId === null) {
      userId = await getFirstUserId();
      console.log("GET - Using first user ID:", userId);

      if (userId === null) {
        return NextResponse.json({ error: "No users found in the database" }, { status: 500 });
      }
    }

    // Get projects for the user
    const projects = await getProjectsByUserId(userId)

    // Return success response
    return NextResponse.json({
      success: true,
      projects,
    })
  } catch (error) {
    console.error("Error getting projects:", error)
    return NextResponse.json({ error: "Failed to get projects" }, { status: 500 })
  }
}
