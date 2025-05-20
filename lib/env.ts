/**
 * Environment variable validation and access
 * This module provides type-safe access to environment variables
 */

// Server-side environment variables
export const serverEnv = {
  // Database configuration
  database: {
    user: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "postgres",
    host: process.env.POSTGRES_HOST || "localhost",
    port: Number.parseInt(process.env.POSTGRES_PORT || "5432"),
    name: process.env.POSTGRES_DB || "data_automation",
    url: process.env.DATABASE_URL,
  },

  // Redis configuration
  redis: {
    url: process.env.REDIS_URL || "redis://localhost:6379",
  },

  // Authentication
  auth: {
    secret: process.env.AUTH_SECRET || "development-secret-do-not-use-in-production",
    tokenExpiry: process.env.AUTH_TOKEN_EXPIRY || "1d",
  },

  // External APIs
  apis: {
    openai: process.env.OPENAI_API_KEY,
    aws: {
      accessKey: process.env.AWS_ACCESS_KEY_ID,
      secretKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION || "us-east-1",
      bucket: process.env.AWS_S3_BUCKET,
    },
  },

  // Application settings
  app: {
    nodeEnv: process.env.NODE_ENV || "development",
    port: Number.parseInt(process.env.PORT || "3000"),
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    uploadDir: process.env.UPLOAD_DIR || "./uploads",
    logLevel: process.env.LOG_LEVEL || "info",
  },
}

// Client-side environment variables (must be prefixed with NEXT_PUBLIC_)
export const clientEnv = {
  app: {
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    environment: process.env.NEXT_PUBLIC_ENVIRONMENT || "development",
    version: process.env.NEXT_PUBLIC_VERSION || "0.1.0",
    analyticsId: process.env.NEXT_PUBLIC_ANALYTICS_ID,
  },

  features: {
    aiSuggestions: process.env.NEXT_PUBLIC_FEATURE_AI_SUGGESTIONS === "true",
    betaFeatures: process.env.NEXT_PUBLIC_FEATURE_BETA === "true",
  },
}

/**
 * Validates required environment variables
 * @param requiredVars Array of required environment variable names
 * @returns Array of missing environment variables
 */
export function validateEnv(requiredVars: string[]): string[] {
  const missing: string[] = []

  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      missing.push(varName)
    }
  }

  return missing
}

/**
 * Checks if the application is running in production
 * @returns boolean indicating if in production environment
 */
export function isProduction(): boolean {
  return serverEnv.app.nodeEnv === "production"
}

/**
 * Checks if the application is running in development
 * @returns boolean indicating if in development environment
 */
export function isDevelopment(): boolean {
  return serverEnv.app.nodeEnv === "development"
}

/**
 * Checks if the application is running in test environment
 * @returns boolean indicating if in test environment
 */
export function isTest(): boolean {
  return serverEnv.app.nodeEnv === "test"
}
