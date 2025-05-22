"use client"

import type { ReactNode } from "react"
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "@/components/theme-provider"
import { ConfigProvider } from "./config"
import { AuthProvider } from "@/lib/auth/auth-context"

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" disableTransitionOnChange>
        <AuthProvider>
          <ConfigProvider>{children}</ConfigProvider>
        </AuthProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}
