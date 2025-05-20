import { NextResponse } from "next/server"
import { hash } from "bcryptjs"
import { createUser, getUserByEmail } from "@/lib/db/users"
import { z } from "zod"

// Validation schema
const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate input
    const result = registerSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: "Invalid input", details: result.error.flatten().fieldErrors }, { status: 400 })
    }

    const { name, email, password } = result.data

    // Check if user already exists
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    // Hash password
    const hashedPassword = await hash(password, 10)

    // Create user
    const user = await createUser({
      name,
      email,
      password_hash: hashedPassword,
    })

    // Log the user ID for debugging
    console.log("Registration - Created user with ID:", user.id, "Type:", typeof user.id);

    // Ensure the ID is a number
    const userId = typeof user.id === 'number' ? user.id : parseInt(String(user.id), 10);
    console.log("Registration - Parsed user ID:", userId, "Type:", typeof userId);

    return NextResponse.json(
      {
        message: "User registered successfully",
        user: {
          id: userId,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "An error occurred during registration" }, { status: 500 })
  }
}
