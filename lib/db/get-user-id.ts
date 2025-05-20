import db from "@/lib/db"

/**
 * Get user ID by email
 * @param email User email
 * @returns User ID or null if not found
 */
export async function getUserIdByEmail(email: string): Promise<number | null> {
  try {
    // Query the database for the user ID
    const result = await db.query("SELECT id FROM users WHERE email = $1", [email]);
    
    // If user found, return the ID
    if (result.rows.length > 0) {
      return result.rows[0].id;
    }
    
    // User not found
    return null;
  } catch (error) {
    console.error("Error getting user ID by email:", error);
    return null;
  }
}

/**
 * Get the first user ID from the database
 * @returns First user ID or null if no users exist
 */
export async function getFirstUserId(): Promise<number | null> {
  try {
    // Query the database for the first user ID
    const result = await db.query("SELECT id FROM users ORDER BY id LIMIT 1");
    
    // If user found, return the ID
    if (result.rows.length > 0) {
      return result.rows[0].id;
    }
    
    // No users found
    return null;
  } catch (error) {
    console.error("Error getting first user ID:", error);
    return null;
  }
}
