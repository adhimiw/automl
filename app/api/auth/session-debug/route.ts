import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"

export async function GET(request: Request) {
  try {
    // Get the session
    const session = await getServerSession()
    
    // Return session details for debugging
    return NextResponse.json({
      session: {
        user: session?.user ? {
          id: session.user.id,
          idType: typeof session.user.id,
          name: session.user.name,
          email: session.user.email,
        } : null,
        expires: session?.expires,
      },
    })
  } catch (error) {
    console.error("Error getting session:", error)
    return NextResponse.json({ error: "Failed to get session" }, { status: 500 })
  }
}
