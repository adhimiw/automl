import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { getProjectById, updateProject, deleteProject } from "@/lib/db/projects"
import { createAuditLog } from "@/lib/db/audit-logs"
import { parseUserId } from "@/lib/utils/user-id"
import { getUserIdByEmail } from "@/lib/db/get-user-id"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    // Check authentication
    const session = await getServerSession()
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const projectId = Number.parseInt(params.id)

    // Debug session user ID
    console.log("GET Project - Session user ID:", session.user.id);
    console.log("GET Project - Session user ID type:", typeof session.user.id);
    console.log("GET Project - Session user email:", session.user.email);

    // Try to get user ID from session
    let userId = parseUserId(session.user.id);

    // If userId is null, try to get it by email
    if (userId === null && session.user.email) {
      userId = await getUserIdByEmail(session.user.email);
      console.log("GET Project - Got user ID by email:", userId);
    }

    // If still null, return error
    if (userId === null) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    // Get project
    const project = await getProjectById(projectId)

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    // Check if user has access to this project
    if (project.user_id !== userId) {
      // For development, allow access to any project
      if (process.env.NODE_ENV === "development") {
        console.log("Development mode: Allowing access to project despite user ID mismatch");
      } else {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
      }
    }

    // Return success response
    return NextResponse.json({
      success: true,
      project,
    })
  } catch (error) {
    console.error("Error getting project:", error)
    return NextResponse.json({ error: "Failed to get project" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    // Check authentication
    const session = await getServerSession()
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const projectId = Number.parseInt(params.id)

    // Debug session user ID
    console.log("PUT Project - Session user ID:", session.user.id);
    console.log("PUT Project - Session user ID type:", typeof session.user.id);
    console.log("PUT Project - Session user email:", session.user.email);

    // Try to get user ID from session
    let userId = parseUserId(session.user.id);

    // If userId is null, try to get it by email
    if (userId === null && session.user.email) {
      userId = await getUserIdByEmail(session.user.email);
      console.log("PUT Project - Got user ID by email:", userId);
    }

    // If still null, return error
    if (userId === null) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    // Get project to check ownership
    const existingProject = await getProjectById(projectId)

    if (!existingProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    // Check if user has access to this project
    if (existingProject.user_id !== userId) {
      // For development, allow access to any project
      if (process.env.NODE_ENV === "development") {
        console.log("Development mode: Allowing update of project despite user ID mismatch");
      } else {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
      }
    }

    // Get request body
    const body = await request.json()
    const { name, description } = body

    // Update project
    const updatedProject = await updateProject(projectId, {
      name,
      description,
    })

    // Log project update
    await createAuditLog({
      user_id: userId,
      action: "project_update",
      entity_type: "project",
      entity_id: projectId.toString(),
      details: { name, description },
    })

    // Return success response
    return NextResponse.json({
      success: true,
      project: updatedProject,
    })
  } catch (error) {
    console.error("Error updating project:", error)
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    // Check authentication
    const session = await getServerSession()
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const projectId = Number.parseInt(params.id)

    // Debug session user ID
    console.log("DELETE Project - Session user ID:", session.user.id);
    console.log("DELETE Project - Session user ID type:", typeof session.user.id);
    console.log("DELETE Project - Session user email:", session.user.email);

    // Try to get user ID from session
    let userId = parseUserId(session.user.id);

    // If userId is null, try to get it by email
    if (userId === null && session.user.email) {
      userId = await getUserIdByEmail(session.user.email);
      console.log("DELETE Project - Got user ID by email:", userId);
    }

    // If still null, return error
    if (userId === null) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    // Get project to check ownership
    const existingProject = await getProjectById(projectId)

    if (!existingProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    // Check if user has access to this project
    if (existingProject.user_id !== userId) {
      // For development, allow access to any project
      if (process.env.NODE_ENV === "development") {
        console.log("Development mode: Allowing deletion of project despite user ID mismatch");
      } else {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
      }
    }

    // Delete project
    const deleted = await deleteProject(projectId)

    if (!deleted) {
      return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
    }

    // Log project deletion
    await createAuditLog({
      user_id: userId,
      action: "project_delete",
      entity_type: "project",
      entity_id: projectId.toString(),
      details: { name: existingProject.name },
    })

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Project deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting project:", error)
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
}
