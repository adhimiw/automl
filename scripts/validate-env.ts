import { validateEnv } from "../lib/env"

// Define required environment variables for different environments
const requiredEnvVars = {
  production: [
    "POSTGRES_USER",
    "POSTGRES_PASSWORD",
    "POSTGRES_HOST",
    "POSTGRES_PORT",
    "POSTGRES_DB",
    "REDIS_URL",
    "AUTH_SECRET",
    "NEXT_PUBLIC_APP_URL",
  ],
  development: ["POSTGRES_USER", "POSTGRES_PASSWORD", "POSTGRES_HOST", "POSTGRES_PORT", "POSTGRES_DB", "REDIS_URL"],
  test: ["POSTGRES_USER", "POSTGRES_PASSWORD", "POSTGRES_HOST", "POSTGRES_PORT", "POSTGRES_DB"],
}

// Get the current environment
const nodeEnv = process.env.NODE_ENV || "development"

// Validate environment variables
const missingVars = validateEnv(requiredEnvVars[nodeEnv as keyof typeof requiredEnvVars] || [])

if (missingVars.length > 0) {
  console.error(`Missing required environment variables for ${nodeEnv} environment:`)
  missingVars.forEach((varName) => {
    console.error(`- ${varName}`)
  })
  process.exit(1)
} else {
  console.log(`All required environment variables for ${nodeEnv} environment are present.`)
}
