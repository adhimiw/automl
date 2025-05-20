import { query } from "./index"

export interface FeatureFlag {
  id: number
  name: string
  description: string | null
  enabled: boolean
  created_at: Date
  updated_at: Date
}

export interface FeatureFlagInput {
  name: string
  description?: string
  enabled?: boolean
}

/**
 * Create a new feature flag
 * @param flagData Feature flag data
 * @returns Created feature flag
 */
export async function createFeatureFlag(flagData: FeatureFlagInput): Promise<FeatureFlag> {
  const { name, description, enabled } = flagData

  const result = await query<FeatureFlag>(
    `INSERT INTO feature_flags (name, description, enabled) 
     VALUES ($1, $2, $3) 
     RETURNING *`,
    [name, description || null, enabled !== undefined ? enabled : false],
  )

  return result.rows[0]
}

/**
 * Get a feature flag by name
 * @param name Feature flag name
 * @returns Feature flag or null if not found
 */
export async function getFeatureFlagByName(name: string): Promise<FeatureFlag | null> {
  const result = await query<FeatureFlag>("SELECT * FROM feature_flags WHERE name = $1", [name])

  return result.rows.length > 0 ? result.rows[0] : null
}

/**
 * Get all feature flags
 * @returns Array of feature flags
 */
export async function getAllFeatureFlags(): Promise<FeatureFlag[]> {
  const result = await query<FeatureFlag>("SELECT * FROM feature_flags ORDER BY name ASC")

  return result.rows
}

/**
 * Update a feature flag
 * @param name Feature flag name
 * @param enabled New enabled state
 * @returns Updated feature flag
 */
export async function updateFeatureFlag(name: string, enabled: boolean): Promise<FeatureFlag | null> {
  const result = await query<FeatureFlag>(
    "UPDATE feature_flags SET enabled = $1, updated_at = CURRENT_TIMESTAMP WHERE name = $2 RETURNING *",
    [enabled, name],
  )

  return result.rows.length > 0 ? result.rows[0] : null
}

/**
 * Check if a feature flag is enabled
 * @param name Feature flag name
 * @param defaultValue Default value if flag doesn't exist
 * @returns True if enabled, false otherwise
 */
export async function isFeatureEnabled(name: string, defaultValue = false): Promise<boolean> {
  const flag = await getFeatureFlagByName(name)
  return flag ? flag.enabled : defaultValue
}
