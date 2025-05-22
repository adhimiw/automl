"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { LucideBrain, LucideLoader2, LucideAlertCircle, LucideCheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/lib/auth/auth-context"

// Form validation schema
const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

type RegisterFormValues = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const router = useRouter()
  const { register: registerUser, isLoading: authLoading } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  })

  const termsAccepted = watch("terms")

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true)
    setError(null)

    try {
      // Use our custom auth context register function
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      })

      setSuccess(true)

      // The auth context will automatically log in the user and redirect to dashboard
      // No need for additional signIn call
    } catch (error: any) {
      setError(error.message || "Registration failed. Please try again.")
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
          <p className="text-muted-foreground">Create an account to get started</p>
        </div>

        <Card className="border-primary/20 shadow-lg overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary via-secondary to-accent">
            <CardTitle className="text-white">Create an Account</CardTitle>
            <CardDescription className="text-white/80">Enter your information to create an account</CardDescription>
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

              {success && (
                <Alert variant="success" className="bg-primary/10 text-primary border-primary/20">
                  <LucideCheckCircle2 className="h-4 w-4 text-primary" />
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>
                    Account created successfully! We've sent a verification email to your address.
                    Redirecting to dashboard...
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="name" className="text-primary font-medium">Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  {...register("name")}
                  disabled={isLoading || success}
                  className={`border-primary/20 focus:border-primary focus:ring-primary/30 ${errors.name ? "border-destructive" : ""}`}
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-primary font-medium">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  {...register("email")}
                  disabled={isLoading || success}
                  className={`border-primary/20 focus:border-primary focus:ring-primary/30 ${errors.email ? "border-destructive" : ""}`}
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-primary font-medium">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                  disabled={isLoading || success}
                  className={`border-primary/20 focus:border-primary focus:ring-primary/30 ${errors.password ? "border-destructive" : ""}`}
                />
                {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-primary font-medium">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  {...register("confirmPassword")}
                  disabled={isLoading || success}
                  className={`border-primary/20 focus:border-primary focus:ring-primary/30 ${errors.confirmPassword ? "border-destructive" : ""}`}
                />
                {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setValue("terms", checked === true)}
                  disabled={isLoading || success}
                  className="border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                />
                <Label htmlFor="terms" className="text-sm font-normal">
                  I agree to the{" "}
                  <Link href="/terms" className="text-secondary font-semibold hover:text-secondary/80 hover:underline transition-colors">
                    terms and conditions
                  </Link>
                </Label>
              </div>
              {errors.terms && <p className="text-sm text-destructive">{errors.terms.message}</p>}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-b-md">
              <Button
                type="submit"
                variant="winrar"
                className="w-full"
                disabled={isLoading || authLoading || success}
              >
                {(isLoading || authLoading) && <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />}
                {success ? "Account Created" : "Create Account"}
              </Button>
              <div className="flex items-center justify-center space-x-2">
                <div className="h-px flex-1 bg-border"></div>
                <p className="text-center text-sm text-muted-foreground px-2">or</p>
                <div className="h-px flex-1 bg-border"></div>
              </div>
              <p className="text-center text-sm">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-secondary hover:text-secondary/80 hover:underline transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
