"use client"

import { createContext, useContext, type ReactNode } from "react"
import { clientEnv } from "@/lib/env"

// Define the type for our config context
type ConfigContextType = {
  appUrl: string
  environment: string
  version: string
  analyticsId: string | undefined
  features: {
    aiSuggestions: boolean
    betaFeatures: boolean
  }
}

// Create the context with default values
const ConfigContext = createContext<ConfigContextType>({
  appUrl: clientEnv.app.url,
  environment: clientEnv.app.environment,
  version: clientEnv.app.version,
  analyticsId: clientEnv.app.analyticsId,
  features: {
    aiSuggestions: clientEnv.features.aiSuggestions,
    betaFeatures: clientEnv.features.betaFeatures,
  },
})

// Provider component to wrap our app
export function ConfigProvider({ children }: { children: ReactNode }) {
  // The values come directly from our clientEnv
  const value = {
    appUrl: clientEnv.app.url,
    environment: clientEnv.app.environment,
    version: clientEnv.app.version,
    analyticsId: clientEnv.app.analyticsId,
    features: {
      aiSuggestions: clientEnv.features.aiSuggestions,
      betaFeatures: clientEnv.features.betaFeatures,
    },
  }

  return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
}

// Hook to use the config in components
export function useConfig() {
  const context = useContext(ConfigContext)
  if (context === undefined) {
    throw new Error("useConfig must be used within a ConfigProvider")
  }
  return context
}
