import type React from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { EnvWarning } from "@/components/env-warning"
import { serverEnv } from "@/lib/env"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const showEnvWarning = serverEnv.app.nodeEnv === "development"

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-40 border-b bg-background">
          <div className="container flex h-16 items-center justify-between py-4">
            <MainNav />
            <UserNav />
          </div>
        </header>
        <main className="flex-1 p-6">
          {showEnvWarning && <EnvWarning />}
          {children}
        </main>
      </div>
    </ProtectedRoute>
  )
}
