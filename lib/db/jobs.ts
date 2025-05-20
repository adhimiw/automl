import { query } from "./index"

export interface Job {
  id: string
  type: string
  status: "pending" | "processing" | "completed" | "failed"
  data: any | null
  result: any | null
  error: string | null
  created_at: Date
  updated_at: Date
}

export interface JobInput {
  id: string
  type: string
  data?: any
}

/**
 * Create a new job
 * @param jobData Job data
 * @returns Created job
 */
export async function createJob(jobData: JobInput): Promise<Job> {
  const { id, type, data } = jobData

  const result = await query<Job>(
    `INSERT INTO jobs (id, type, status, data) 
     VALUES ($1, $2, 'pending', $3) 
     RETURNING *`,
    [id, type, data || null],
  )

  return result.rows[0]
}

/**
 * Get a job by ID
 * @param id Job ID
 * @returns Job or null if not found
 */
export async function getJobById(id: string): Promise<Job | null> {
  const result = await query<Job>("SELECT * FROM jobs WHERE id = $1", [id])

  return result.rows.length > 0 ? result.rows[0] : null
}

/**
 * Get pending jobs
 * @param limit Maximum number of jobs to return
 * @returns Array of pending jobs
 */
export async function getPendingJobs(limit = 10): Promise<Job[]> {
  const result = await query<Job>("SELECT * FROM jobs WHERE status = $1 ORDER BY created_at ASC LIMIT $2", [
    "pending",
    limit,
  ])

  return result.rows
}

/**
 * Update job status
 * @param id Job ID
 * @param status New status
 * @param result Job result
 * @param error Error message
 * @returns Updated job
 */
export async function updateJobStatus(
  id: string,
  status: Job["status"],
  result?: any,
  error?: string,
): Promise<Job | null> {
  const updates: string[] = ["status = $1", "updated_at = CURRENT_TIMESTAMP"]
  const values: any[] = [status]
  let paramIndex = 2

  if (result !== undefined) {
    updates.push(`result = $${paramIndex++}`)
    values.push(result)
  }

  if (error !== undefined) {
    updates.push(`error = $${paramIndex++}`)
    values.push(error)
  }

  values.push(id)

  const result2 = await query<Job>(
    `UPDATE jobs SET ${updates.join(", ")} WHERE id = $${paramIndex} RETURNING *`,
    values,
  )

  return result2.rows.length > 0 ? result2.rows[0] : null
}
