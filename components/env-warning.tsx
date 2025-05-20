"use client"

import { useEffect, useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { LucideAlertTriangle } from "lucide-react"
import { useConfig } from "@/app/config"

export function EnvWarning() {
  const [missingVars, setMissingVars] = useState<string[]>([])
  const config = useConfig()

  useEffect(() => {
    // Only check in development environment
    if (config.environment !== "development") return

    // Check for important client-side environment variables
    const requiredVars = ["NEXT_PUBLIC_APP_URL"]
    const missing = requiredVars.filter((varName) => !process.env[varName])

    setMissingVars(missing)
  }, [config.environment])

  if (missingVars.length === 0) return null

  return (
    <Alert variant="destructive" className="mb-4">
      <LucideAlertTriangle className="h-4 w-4" />
      <AlertTitle>Missing Environment Variables</AlertTitle>
      <AlertDescription>
        <p>The following environment variables are missing:</p>
        <ul className="list-disc pl-5 mt-2">
          {missingVars.map((varName) => (
            <li key={varName}>{varName}</li>
          ))}
        </ul>
        <p className="mt-2">
          Please add these to your <code>.env.local</code> file.
        </p>
      </AlertDescription>
    </Alert>
  )
}
