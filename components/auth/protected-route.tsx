"use client"

import { useEffect, type ReactNode } from "react"
import { useSession } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"
import { LucideLoader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (status === "loading") return

    if (!session) {
      router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`)
    }
  }, [session, status, router, pathname])

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LucideLoader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!session) {
    return null
  }

  return <>{children}</>
}
