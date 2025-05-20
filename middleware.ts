import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the path is protected
  const isProtectedPath =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/api/projects") ||
    pathname.startsWith("/api/datasets") ||
    pathname.startsWith("/api/analyses") ||
    pathname.startsWith("/education/progress") ||
    pathname.startsWith("/education/certificates") ||
    pathname.startsWith("/api/education/progress") ||
    pathname.startsWith("/api/education/certificates")

  // Check if the path is auth related
  const isAuthPath =
    pathname.startsWith("/login") || pathname.startsWith("/register") || pathname.startsWith("/forgot-password")

  // Get the token
  const token = await getToken({ req: request, secret: process.env.AUTH_SECRET })

  // Redirect unauthenticated users to login
  if (isProtectedPath && !token) {
    const url = new URL("/login", request.url)
    url.searchParams.set("callbackUrl", encodeURI(request.url))
    return NextResponse.redirect(url)
  }

  // Redirect authenticated users away from auth pages
  if (isAuthPath && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/projects/:path*",
    "/api/datasets/:path*",
    "/api/analyses/:path*",
    "/education/progress/:path*",
    "/education/certificates/:path*",
    "/api/education/progress/:path*",
    "/api/education/certificates/:path*",
    "/login",
    "/register",
    "/forgot-password",
  ],
}
