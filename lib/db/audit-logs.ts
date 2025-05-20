import { query } from "./index"

export interface AuditLog {
  id: number
  user_id: number | null
  action: string
  entity_type: string | null
  entity_id: string | null
  details: any | null
  created_at: Date
}

export interface AuditLogInput {
  user_id?: number
  action: string
  entity_type?: string
  entity_id?: string
  details?: any
}

/**
 * Create a new audit log entry
 * @param logData Audit log data
 * @returns Created audit log
 */
export async function createAuditLog(logData: AuditLogInput): Promise<AuditLog> {
  const { user_id, action, entity_type, entity_id, details } = logData

  const result = await query<AuditLog>(
    `INSERT INTO audit_logs (user_id, action, entity_type, entity_id, details) 
     VALUES ($1, $2, $3, $4, $5) 
     RETURNING *`,
    [user_id || null, action, entity_type || null, entity_id || null, details || null],
  )

  return result.rows[0]
}

/**
 * Get audit logs by user ID
 * @param userId User ID
 * @param limit Maximum number of logs to return
 * @returns Array of audit logs
 */
export async function getAuditLogsByUserId(userId: number, limit = 100): Promise<AuditLog[]> {
  const result = await query<AuditLog>(
    "SELECT * FROM audit_logs WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2",
    [userId, limit],
  )

  return result.rows
}

/**
 * Get audit logs by entity
 * @param entityType Entity type
 * @param entityId Entity ID
 * @param limit Maximum number of logs to return
 * @returns Array of audit logs
 */
export async function getAuditLogsByEntity(entityType: string, entityId: string, limit = 100): Promise<AuditLog[]> {
  const result = await query<AuditLog>(
    "SELECT * FROM audit_logs WHERE entity_type = $1 AND entity_id = $2 ORDER BY created_at DESC LIMIT $3",
    [entityType, entityId, limit],
  )

  return result.rows
}

/**
 * Get recent audit logs
 * @param limit Maximum number of logs to return
 * @returns Array of audit logs
 */
export async function getRecentAuditLogs(limit = 100): Promise<AuditLog[]> {
  const result = await query<AuditLog>("SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT $1", [limit])

  return result.rows
}
