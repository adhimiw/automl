import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideBarChart2, LucideDatabase, LucideBrain, LucideFileText } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2 font-bold">
            <LucideBrain className="h-6 w-6" />
            <span>Data Automation Platform</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  AI-Powered Data Analysis Made Simple
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Transform your data into insights without coding. Our platform combines powerful analysis with AI
                  guidance to help you understand your data.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/projects/new">
                    <Button size="lg">Start New Project</Button>
                  </Link>
                  <Link href="/demo">
                    <Button size="lg" variant="outline">
                      Try Demo
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="rounded-lg border bg-background p-8">
                <div className="mx-auto w-full max-w-sm space-y-6">
                  <div className="space-y-2 text-center">
                    <h2 className="text-2xl font-bold">Quick Start</h2>
                    <p className="text-muted-foreground">Upload your data and get instant insights</p>
                  </div>
                  <div className="space-y-4">
                    <Button className="w-full" variant="outline">
                      <LucideFileText className="mr-2 h-4 w-4" />
                      Upload CSV
                    </Button>
                    <Button className="w-full" variant="outline">
                      <LucideDatabase className="mr-2 h-4 w-4" />
                      Connect Database
                    </Button>
                    <Button className="w-full" variant="outline">
                      <LucideBarChart2 className="mr-2 h-4 w-4" />
                      Sample Datasets
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <LucideDatabase className="h-8 w-8 mb-2" />
                  <CardTitle>Universal Data Support</CardTitle>
                  <CardDescription>Import data from CSV, Excel, databases, APIs, and more</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Our platform handles virtually any data source, automatically profiling and preparing it for
                    analysis.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/features/data-import">
                    <Button variant="ghost">Learn More</Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <LucideBarChart2 className="h-8 w-8 mb-2" />
                  <CardTitle>Automated Analysis</CardTitle>
                  <CardDescription>One-click exploratory data analysis with AI insights</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Get instant visualizations, statistical summaries, and AI-generated observations about your data.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/features/automated-analysis">
                    <Button variant="ghost">Learn More</Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <LucideBrain className="h-8 w-8 mb-2" />
                  <CardTitle>AI Guidance</CardTitle>
                  <CardDescription>Step-by-step assistance and educational content</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Learn as you work with contextual explanations, suggestions, and guidance at every step.</p>
                </CardContent>
                <CardFooter>
                  <Link href="/features/ai-guidance">
                    <Button variant="ghost">Learn More</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Data Automation Platform. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
