"use client"

import { useState, useEffect } from "react"

interface Job {
  id: string
  type: string
  status: "pending" | "processing" | "completed" | "failed"
  data: any | null
  result: any | null
  error: string | null
  created_at: string
  updated_at: string
}

export function useJobStatus(jobId: string, pollInterval = 2000) {
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let intervalId: NodeJS.Timeout
    let mounted = true

    async function fetchJobStatus() {
      try {
        const response = await fetch(`/api/jobs/${jobId}`)

        if (!response.ok) {
          throw new Error("Failed to fetch job status")
        }

        const data = await response.json()

        if (mounted) {
          if (data.success && data.job) {
            setJob(data.job)

            // If job is completed or failed, stop polling
            if (data.job.status === "completed" || data.job.status === "failed") {
              clearInterval(intervalId)
            }
          }

          setLoading(false)
        }
      } catch (err) {
        console.error("Error fetching job status:", err)
        if (mounted) {
          setError(err instanceof Error ? err : new Error(String(err)))
          setLoading(false)
          clearInterval(intervalId)
        }
      }
    }

    // Initial fetch
    fetchJobStatus()

    // Set up polling
    intervalId = setInterval(fetchJobStatus, pollInterval)

    // Clean up
    return () => {
      mounted = false
      clearInterval(intervalId)
    }
  }, [jobId, pollInterval])

  return {
    job,
    loading,
    error,
    isCompleted: job?.status === "completed",
    isFailed: job?.status === "failed",
    isProcessing: job?.status === "processing" || job?.status === "pending",
  }
}
