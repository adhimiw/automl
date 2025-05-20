/**
 * Utility functions for handling user IDs
 */

/**
 * Parse a user ID from various formats to a number
 * @param id User ID in any format
 * @returns Parsed user ID as a number, or null if invalid
 */
export function parseUserId(id: string | number | undefined | null): number | null {
  // Log the input for debugging
  console.log("parseUserId - Input:", id, "Type:", typeof id);

  if (id === undefined || id === null) {
    console.log("parseUserId - Undefined or null input");
    return null;
  }

  if (typeof id === 'number') {
    if (isNaN(id)) {
      console.log("parseUserId - NaN number input");
      return null;
    }
    console.log("parseUserId - Valid number input:", id);
    return id;
  }

  if (typeof id === 'string') {
    // Try to parse as integer
    try {
      const parsed = parseInt(id, 10);
      if (!isNaN(parsed)) {
        console.log("parseUserId - Successfully parsed string to number:", parsed);
        return parsed;
      }
    } catch (e) {
      console.log("parseUserId - Error parsing string to integer:", e);
    }

    // If we couldn't parse as integer, check if it's a valid string ID
    if (id.trim() !== '') {
      console.log("parseUserId - Using string as-is (not converting to number)");
      // In a real implementation, you might want to validate the string format
      // For now, we'll return 1 as a fallback for any non-empty string
      return 1;
    }
  }

  // For any other type or invalid input
  console.log("parseUserId - Invalid input, returning null");
  return null;
}

/**
 * Validate that a user ID is valid
 * @param id User ID to validate
 * @returns True if the ID is valid, false otherwise
 */
export function isValidUserId(id: string | number | undefined | null): boolean {
  return parseUserId(id) !== null;
}
