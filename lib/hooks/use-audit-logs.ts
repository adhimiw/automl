"use client"

import { useState, useEffect } from "react"

interface AuditLog {
  id: number
  user_id: number | null
  action: string
  entity_type: string | null
  entity_id: string | null
  details: any | null
  created_at: string
}

export function useAuditLogs(entityType?: string, entityId?: string) {
  const [logs, setLogs] = useState<AuditLog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function loadAuditLogs() {
      try {
        setLoading(true)

        let url = "/api/audit-logs"

        if (entityType && entityId) {
          url += `?entityType=${encodeURIComponent(entityType)}&entityId=${encodeURIComponent(entityId)}`
        }

        const response = await fetch(url)

        if (!response.ok) {
          throw new Error("Failed to load audit logs")
        }

        const data = await response.json()

        if (data.success && Array.isArray(data.logs)) {
          setLogs(data.logs)
        }
      } catch (err) {
        console.error("Error loading audit logs:", err)
        setError(err instanceof Error ? err : new Error(String(err)))
      } finally {
        setLoading(false)
      }
    }

    loadAuditLogs()
  }, [entityType, entityId])

  return {
    logs,
    loading,
    error,
  }
}
