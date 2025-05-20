import { query } from "./index"
import { hash, compare } from "bcryptjs"

export interface User {
  id: number
  email: string
  name: string
  created_at: Date
  updated_at: Date
}

export interface UserInput {
  email: string
  name: string
  password: string
}

/**
 * Create a new user
 * @param userData User data including email, name, and password
 * @returns Created user
 */
export async function createUser(userData: UserInput): Promise<User> {
  const { email, name, password } = userData

  // Hash the password
  const passwordHash = await hash(password, 10)

  const result = await query<User>(
    "INSERT INTO users (email, name, password_hash) VALUES ($1, $2, $3) RETURNING id, email, name, created_at, updated_at",
    [email, name, passwordHash],
  )

  return result.rows[0]
}

/**
 * Get a user by email
 * @param email User email
 * @returns User or null if not found
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  const result = await query<User & { password_hash: string }>(
    "SELECT id, email, name, password_hash, created_at, updated_at FROM users WHERE email = $1",
    [email],
  )

  return result.rows.length > 0 ? result.rows[0] : null
}

/**
 * Get a user by ID
 * @param id User ID
 * @returns User or null if not found
 */
export async function getUserById(id: number): Promise<User | null> {
  const result = await query<User>("SELECT id, email, name, created_at, updated_at FROM users WHERE id = $1", [id])

  return result.rows.length > 0 ? result.rows[0] : null
}

/**
 * Verify user credentials
 * @param email User email
 * @param password User password
 * @returns User if credentials are valid, null otherwise
 */
export async function verifyCredentials(email: string, password: string): Promise<User | null> {
  const result = await query<User & { password_hash: string }>(
    "SELECT id, email, name, password_hash, created_at, updated_at FROM users WHERE email = $1",
    [email],
  )

  if (result.rows.length === 0) {
    return null
  }

  const user = result.rows[0]
  const passwordMatch = await compare(password, user.password_hash)

  if (!passwordMatch) {
    return null
  }

  // Don't return the password hash
  const { password_hash, ...userWithoutPassword } = user
  return userWithoutPassword
}

/**
 * Update a user
 * @param id User ID
 * @param userData User data to update
 * @returns Updated user
 */
export async function updateUser(id: number, userData: Partial<UserInput>): Promise<User | null> {
  const updates: string[] = []
  const values: any[] = []
  let paramIndex = 1

  if (userData.name) {
    updates.push(`name = $${paramIndex++}`)
    values.push(userData.name)
  }

  if (userData.email) {
    updates.push(`email = $${paramIndex++}`)
    values.push(userData.email)
  }

  if (userData.password) {
    const passwordHash = await hash(userData.password, 10)
    updates.push(`password_hash = $${paramIndex++}`)
    values.push(passwordHash)
  }

  if (updates.length === 0) {
    return getUserById(id)
  }

  updates.push(`updated_at = CURRENT_TIMESTAMP`)

  values.push(id)

  const result = await query<User>(
    `UPDATE users SET ${updates.join(", ")} WHERE id = $${paramIndex} RETURNING id, email, name, created_at, updated_at`,
    values,
  )

  return result.rows.length > 0 ? result.rows[0] : null
}
