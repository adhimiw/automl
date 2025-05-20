import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcryptjs"
import { getUserByEmail } from "@/lib/db/users"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const user = await getUserByEmail(credentials.email)

          if (!user) {
            return null
          }

          const passwordMatch = await compare(credentials.password, user.password_hash)

          if (!passwordMatch) {
            return null
          }

          // Ensure the ID is a number
          const userId = typeof user.id === 'number' ? user.id : parseInt(String(user.id), 10);

          console.log("Authorize - User ID from database:", user.id, "Type:", typeof user.id);
          console.log("Authorize - Parsed user ID:", userId, "Type:", typeof userId);

          return {
            id: userId,
            name: user.name,
            email: user.email,
          }
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Ensure user ID is stored as a number and log for debugging
        console.log("JWT callback - Original user ID:", user.id, "Type:", typeof user.id);

        // Convert to number if it's not already
        if (typeof user.id !== 'number') {
          try {
            token.id = parseInt(String(user.id), 10);
            if (isNaN(token.id)) {
              console.error("JWT callback - Failed to parse user ID to number:", user.id);
              // Fallback to a string ID if parsing fails
              token.id = String(user.id);
            } else {
              console.log("JWT callback - Parsed user ID to number:", token.id);
            }
          } catch (error) {
            console.error("JWT callback - Error parsing user ID:", error);
            token.id = String(user.id);
          }
        } else {
          token.id = user.id;
        }
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        // Ensure user ID is stored in the session and log for debugging
        console.log("Session callback - Token ID:", token.id, "Type:", typeof token.id);

        // Store the ID as is, without trying to convert it
        session.user.id = token.id;
        console.log("Session callback - Set session user ID:", session.user.id, "Type:", typeof session.user.id);
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
