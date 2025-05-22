"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { LucideBrain, LucideLoader2, LucideAlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/lib/auth/auth-context"

// Form validation schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  remember: z.boolean().optional(),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"
  const { login, isLoading: authLoading } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  })

  const rememberMe = watch("remember")

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true)
    setError(null)

    try {
      // Use our custom auth context login
      await login({
        email: data.email,
        password: data.password,
      })

      // If remember me is checked, we could set a longer expiry for the token
      // This would be handled in the backend

      // Router push is handled in the auth context
    } catch (error) {
      setError("Invalid email or password")
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 dark:from-primary/20 dark:via-secondary/20 dark:to-accent/20 px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          {/* WinRAR-inspired logo */}
          <div className="relative w-24 h-24">
            <div className="absolute top-0 left-0 w-20 h-20 bg-primary rounded-md shadow-md transform -rotate-6"></div>
            <div className="absolute top-1 left-1 w-20 h-20 bg-secondary rounded-md shadow-md transform -rotate-3"></div>
            <div className="absolute top-2 left-2 w-20 h-20 bg-accent rounded-md shadow-md transform rotate-0 flex items-center justify-center">
              <LucideBrain className="h-10 w-10 text-accent-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-primary">Data Automation Platform</h1>
          <p className="text-muted-foreground">Sign in to your account to continue</p>
        </div>

        <Card className="border-primary/20 shadow-lg overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary via-secondary to-accent">
            <CardTitle className="text-white">Sign In</CardTitle>
            <CardDescription className="text-white/80">Enter your email and password to sign in to your account</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <LucideAlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-primary font-medium">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  {...register("email")}
                  disabled={isLoading}
                  className={`border-primary/20 focus:border-primary focus:ring-primary/30 ${errors.email ? "border-destructive" : ""}`}
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-primary font-medium">Password</Label>
                  <Link href="/forgot-password" className="text-xs text-secondary hover:text-secondary/80 transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                  disabled={isLoading}
                  className={`border-primary/20 focus:border-primary focus:ring-primary/30 ${errors.password ? "border-destructive" : ""}`}
                />
                {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setValue("remember", checked === true)}
                  className="border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                />
                <Label htmlFor="remember" className="text-sm font-normal">
                  Remember me for 30 days
                </Label>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-b-md">
              <Button
                type="submit"
                variant="winrar"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading && <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign In
              </Button>
              <div className="flex items-center justify-center space-x-2">
                <div className="h-px flex-1 bg-border"></div>
                <p className="text-center text-sm text-muted-foreground px-2">or</p>
                <div className="h-px flex-1 bg-border"></div>
              </div>
              <p className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="font-medium text-secondary hover:text-secondary/80 hover:underline transition-colors"
                >
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
