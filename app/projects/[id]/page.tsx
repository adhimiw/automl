import { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LucideDatabase, LucideBarChart, LucideBrain, LucideFileText } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Project Details",
  description: "View and manage your project",
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  return (
    <ProtectedRoute>
      <div className="container mx-auto py-6">
        <PageHeader
          heading="Project: Customer Analysis"
          subheading="Created on May 19, 2025"
          actions={
            <div className="flex gap-2">
              <Button variant="outline">Edit Project</Button>
              <Button variant="destructive">Delete Project</Button>
            </div>
          }
        />

        <div className="mt-8">
          <Tabs defaultValue="overview">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="datasets">Datasets</TabsTrigger>
              <TabsTrigger value="analyses">Analyses</TabsTrigger>
              <TabsTrigger value="models">Models</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>Project Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    This project analyzes customer data to identify patterns and trends in customer behavior.
                    The goal is to segment customers and provide personalized recommendations.
                  </p>
                </CardContent>
              </Card>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <LucideDatabase className="h-5 w-5" />
                      Datasets
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">1</p>
                    <p className="text-sm text-muted-foreground">Dataset uploaded</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <LucideBarChart className="h-5 w-5" />
                      Analyses
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">0</p>
                    <p className="text-sm text-muted-foreground">Analyses performed</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <LucideBrain className="h-5 w-5" />
                      Models
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">0</p>
                    <p className="text-sm text-muted-foreground">Models trained</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="datasets">
              <Card>
                <CardHeader>
                  <CardTitle>Project Datasets</CardTitle>
                  <CardDescription>Manage datasets for this project</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Button asChild>
                      <Link href={`/data/upload?project=${params.id}`}>Upload New Dataset</Link>
                    </Button>
                  </div>

                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Customer Dataset</h3>
                        <p className="text-sm text-muted-foreground">1000 rows, 10 columns</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/data/datasets/1`}>View</Link>
                        </Button>
                        <Button variant="outline" size="sm">Analyze</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="analyses">
              <Card>
                <CardHeader>
                  <CardTitle>Analyses</CardTitle>
                  <CardDescription>Exploratory data analyses for this project</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Button asChild>
                      <Link href={`/data/analyze?project=${params.id}`}>New Analysis</Link>
                    </Button>
                  </div>

                  <div className="text-center py-8">
                    <LucideFileText className="h-12 w-12 mx-auto text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">No analyses yet</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Create your first analysis to explore your data
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="models">
              <Card>
                <CardHeader>
                  <CardTitle>Machine Learning Models</CardTitle>
                  <CardDescription>Models trained on project data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Button asChild>
                      <Link href={`/ml/train?project=${params.id}`}>Train New Model</Link>
                    </Button>
                  </div>

                  <div className="text-center py-8">
                    <LucideBrain className="h-12 w-12 mx-auto text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">No models trained yet</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Train your first model to make predictions
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  )
}
