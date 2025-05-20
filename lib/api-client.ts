/**
 * API Client for interacting with the backend
 */
import { clientEnv } from "./env"

// Default API URL from environment variables
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

// For internal API routes (Next.js API routes)
const INTERNAL_API_URL = ""

// API request options interface
interface ApiRequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE"
  headers?: Record<string, string>
  body?: any
  credentials?: RequestCredentials
}

// API response interface
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
  status?: number
}

/**
 * Make an API request to the backend
 * @param endpoint API endpoint
 * @param options Request options
 * @param useInternalApi Whether to use internal Next.js API routes
 * @returns API response
 */
export async function apiRequest<T = any>(
  endpoint: string,
  options: ApiRequestOptions = {},
  useInternalApi: boolean = false
): Promise<ApiResponse<T>> {
  try {
    const { method = "GET", headers = {}, body, credentials = "include" } = options

    // Prepare request options
    const requestOptions: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      credentials,
    }

    // Add body for non-GET requests
    if (body && method !== "GET") {
      requestOptions.body = JSON.stringify(body)
    }

    // Determine the base URL based on whether to use internal API
    const baseUrl = useInternalApi ? INTERNAL_API_URL : API_URL;

    // Make the request
    const response = await fetch(`${baseUrl}${endpoint}`, requestOptions)

    // Parse response
    let data
    const contentType = response.headers.get("content-type")
    if (contentType && contentType.includes("application/json")) {
      data = await response.json()
    } else {
      data = await response.text()
    }

    // Handle response
    if (!response.ok) {
      return {
        success: false,
        error: data.error || data.message || "An error occurred",
        status: response.status,
      }
    }

    return {
      success: true,
      data,
      status: response.status,
    }
  } catch (error) {
    console.error("API request error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

/**
 * Upload a file to the backend
 * @param endpoint API endpoint
 * @param file File to upload
 * @param additionalData Additional data to include in the request
 * @param useInternalApi Whether to use internal Next.js API routes
 * @returns API response
 */
export async function uploadFile<T = any>(
  endpoint: string,
  file: File,
  additionalData: Record<string, any> = {},
  useInternalApi: boolean = false
): Promise<ApiResponse<T>> {
  try {
    // Create form data
    const formData = new FormData()
    formData.append("file", file)

    // Add additional data
    Object.entries(additionalData).forEach(([key, value]) => {
      formData.append(key, typeof value === "string" ? value : JSON.stringify(value))
    })

    // Determine the base URL based on whether to use internal API
    const baseUrl = useInternalApi ? INTERNAL_API_URL : API_URL;

    // Make the request
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: "POST",
      body: formData,
      credentials: "include",
    })

    // Parse response
    let data;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      const text = await response.text();
      try {
        data = JSON.parse(text);
      } catch {
        data = { text };
      }
    }

    // Handle response
    if (!response.ok) {
      return {
        success: false,
        error: data.error || data.message || "An error occurred",
        status: response.status,
      }
    }

    return {
      success: true,
      data,
      status: response.status,
    }
  } catch (error) {
    console.error("File upload error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}
