import { query } from "./index"

export interface Project {
  id: number
  name: string
  description: string | null
  user_id: number
  created_at: Date
  updated_at: Date
}

export interface ProjectInput {
  name: string
  description?: string
  user_id: number
}

/**
 * Create a new project
 * @param projectData Project data
 * @returns Created project
 */
export async function createProject(projectData: ProjectInput): Promise<Project> {
  const { name, description, user_id } = projectData

  const result = await query<Project>(
    "INSERT INTO projects (name, description, user_id) VALUES ($1, $2, $3) RETURNING *",
    [name, description || null, user_id],
  )

  return result.rows[0]
}

/**
 * Get a project by ID
 * @param id Project ID
 * @returns Project or null if not found
 */
export async function getProjectById(id: number): Promise<Project | null> {
  const result = await query<Project>("SELECT * FROM projects WHERE id = $1", [id])

  return result.rows.length > 0 ? result.rows[0] : null
}

/**
 * Get projects by user ID
 * @param userId User ID
 * @returns Array of projects
 */
export async function getProjectsByUserId(userId: number): Promise<Project[]> {
  const result = await query<Project>("SELECT * FROM projects WHERE user_id = $1 ORDER BY updated_at DESC", [userId])

  return result.rows
}

/**
 * Update a project
 * @param id Project ID
 * @param projectData Project data to update
 * @returns Updated project
 */
export async function updateProject(id: number, projectData: Partial<ProjectInput>): Promise<Project | null> {
  const updates: string[] = []
  const values: any[] = []
  let paramIndex = 1

  if (projectData.name) {
    updates.push(`name = $${paramIndex++}`)
    values.push(projectData.name)
  }

  if (projectData.description !== undefined) {
    updates.push(`description = $${paramIndex++}`)
    values.push(projectData.description)
  }

  if (updates.length === 0) {
    return getProjectById(id)
  }

  updates.push(`updated_at = CURRENT_TIMESTAMP`)

  values.push(id)

  const result = await query<Project>(
    `UPDATE projects SET ${updates.join(", ")} WHERE id = $${paramIndex} RETURNING *`,
    values,
  )

  return result.rows.length > 0 ? result.rows[0] : null
}

/**
 * Delete a project
 * @param id Project ID
 * @returns True if deleted, false otherwise
 */
export async function deleteProject(id: number): Promise<boolean> {
  const result = await query("DELETE FROM projects WHERE id = $1", [id])

  return result.rowCount > 0
}
