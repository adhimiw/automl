import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideBarChart2, LucideDatabase, LucideFileText, LucidePlus } from "lucide-react"
import { ProjectCard } from "@/components/project-card"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"

export default function ProjectsPage() {
  // Mock data for demonstration
  const recentProjects = [
    {
      id: "1",
      name: "Customer Segmentation",
      description: "Analysis of customer segments based on purchase behavior",
      lastUpdated: "2 hours ago",
      progress: 75,
    },
    {
      id: "2",
      name: "Sales Forecasting",
      description: "Predicting monthly sales for next quarter",
      lastUpdated: "Yesterday",
      progress: 40,
    },
    {
      id: "3",
      name: "Product Analysis",
      description: "Exploratory analysis of product performance",
      lastUpdated: "3 days ago",
      progress: 100,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav />
          <UserNav />
        </div>
      </header>
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Projects</h1>
          <Link href="/projects/new">
            <Button>
              <LucidePlus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          <Card className="border-dashed">
            <CardHeader className="flex flex-row items-center justify-center py-8">
              <div className="flex flex-col items-center text-center">
                <LucidePlus className="h-8 w-8 mb-2 text-muted-foreground" />
                <CardTitle>Create New Project</CardTitle>
                <CardDescription>Start a new analysis from scratch</CardDescription>
              </div>
            </CardHeader>
            <CardFooter className="flex justify-center pb-8">
              <Link href="/projects/new">
                <Button>
                  <LucidePlus className="mr-2 h-4 w-4" />
                  New Project
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {recentProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-4">Quick Start</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <LucideFileText className="mr-2 h-5 w-5" />
                Import Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Upload files or connect to databases to start your analysis</p>
            </CardContent>
            <CardFooter>
              <Link href="/data/import">
                <Button variant="outline" className="w-full">
                  <LucideFileText className="mr-2 h-4 w-4" />
                  Import Data
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <LucideDatabase className="mr-2 h-5 w-5" />
                Sample Datasets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Explore and learn with our curated sample datasets</p>
            </CardContent>
            <CardFooter>
              <Link href="/data/samples">
                <Button variant="outline" className="w-full">
                  <LucideDatabase className="mr-2 h-4 w-4" />
                  Browse Samples
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <LucideBarChart2 className="mr-2 h-5 w-5" />
                Tutorials
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Learn how to use the platform with step-by-step guides</p>
            </CardContent>
            <CardFooter>
              <Link href="/learn/tutorials">
                <Button variant="outline" className="w-full">
                  <LucideBarChart2 className="mr-2 h-4 w-4" />
                  View Tutorials
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}
