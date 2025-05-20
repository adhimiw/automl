"use client"

import { useState, useEffect } from "react"
import { useConfig } from "@/app/config"

interface FeatureFlag {
  name: string
  enabled: boolean
}

export function useFeatureFlags() {
  const [flags, setFlags] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const config = useConfig()

  // Load feature flags from the server
  useEffect(() => {
    async function loadFeatureFlags() {
      try {
        setLoading(true)
        const response = await fetch("/api/feature-flags")

        if (!response.ok) {
          throw new Error("Failed to load feature flags")
        }

        const data = await response.json()

        if (data.success && Array.isArray(data.featureFlags)) {
          const flagsMap: Record<string, boolean> = {}

          data.featureFlags.forEach((flag: FeatureFlag) => {
            flagsMap[flag.name] = flag.enabled
          })

          setFlags(flagsMap)
        }
      } catch (err) {
        console.error("Error loading feature flags:", err)
        setError(err instanceof Error ? err : new Error(String(err)))
      } finally {
        setLoading(false)
      }
    }

    loadFeatureFlags()
  }, [])

  // Check if a feature is enabled
  function isEnabled(featureName: string, defaultValue = false): boolean {
    // First check environment variables (for development)
    if (config.features[featureName as keyof typeof config.features] !== undefined) {
      return config.features[featureName as keyof typeof config.features]
    }

    // Then check server-loaded flags
    return flags[featureName] ?? defaultValue
  }

  return {
    isEnabled,
    loading,
    error,
    flags,
  }
}
