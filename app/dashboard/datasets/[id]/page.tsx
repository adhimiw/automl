"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/page-header"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  LucideAlertCircle,
  LucideBarChart,
  LucideBrain,
  LucideTable,
  LucideFileText,
  LucideDownload
} from "lucide-react"
import Link from "next/link"

// Dataset type definition
interface Dataset {
  id: number
  name: string
  description: string
  project_id: number
  file_path?: string
  file_type?: string
  row_count?: number
  column_count?: number
  created_at: string
  updated_at: string
}

// Project type definition
interface Project {
  id: number
  name: string
  description: string
  user_id: number
  created_at: string
  updated_at: string
}

export default function DatasetDetailPage() {
  const router = useRouter()
  const params = useParams()
  const datasetId = params.id as string

  const [dataset, setDataset] = useState<Dataset | null>(null)
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [previewData, setPreviewData] = useState<any[]>([])
  const [previewColumns, setPreviewColumns] = useState<string[]>([])
  const [loadingPreview, setLoadingPreview] = useState(false)

  // Fetch dataset details
  useEffect(() => {
    async function fetchDatasetDetails() {
      setLoading(true)
      setError(null)

      try {
        // Fetch dataset
        const datasetRes = await fetch(`/api/datasets/${datasetId}`)

        if (!datasetRes.ok) {
          throw new Error(`Failed to fetch dataset: ${datasetRes.statusText}`)
        }

        const datasetData = await datasetRes.json()
        setDataset(datasetData)

        // Fetch project
        const projectRes = await fetch(`/api/projects/${datasetData.project_id}`)

        if (projectRes.ok) {
          const projectData = await projectRes.json()
          setProject(projectData)
        }
      } catch (err) {
        console.error("Error fetching dataset details:", err)
        setError(err instanceof Error ? err.message : "Failed to load dataset details")
      } finally {
        setLoading(false)
      }
    }

    if (datasetId) {
      fetchDatasetDetails()
    }
  }, [datasetId])

  // Fetch data preview
  const fetchDataPreview = async () => {
    if (!dataset) return

    setLoadingPreview(true)

    try {
      const response = await fetch(`/api/datasets/${datasetId}/preview`)

      if (!response.ok) {
        throw new Error("Failed to load data preview")
      }

      const data = await response.json()

      if (data.rows && data.rows.length > 0) {
        setPreviewData(data.rows)
        setPreviewColumns(Object.keys(data.rows[0]))
      }
    } catch (err) {
      console.error("Error fetching data preview:", err)
      // Use mock data for preview if API fails
      const mockColumns = ["column1", "column2", "column3", "column4"]
      const mockData = Array(10).fill(0).map((_, i) => {
        const row: Record<string, any> = {}
        mockColumns.forEach(col => {
          row[col] = `Value ${i+1}-${col}`
        })
        return row
      })

      setPreviewData(mockData)
      setPreviewColumns(mockColumns)
    } finally {
      setLoadingPreview(false)
    }
  }

  // Load preview data when tab changes to "data"
  useEffect(() => {
    if (activeTab === "data" && dataset && previewData.length === 0) {
      fetchDataPreview()
    }
  }, [activeTab, dataset, previewData.length])

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="container mx-auto py-6">
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />

          <div className="grid gap-6 md:grid-cols-2 mb-8">
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </div>

          <Skeleton className="h-64" />
        </div>
      </ProtectedRoute>
    )
  }

  if (error || !dataset) {
    return (
      <ProtectedRoute>
        <div className="container mx-auto py-6">
          <PageHeader
            heading="Dataset Not Found"
            subheading="We couldn't find the dataset you're looking for"
          />

          <Alert variant="destructive" className="my-6">
            <LucideAlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error || "Dataset not found. It may have been deleted or you don't have access to it."}
            </AlertDescription>
          </Alert>

          <Button asChild>
            <Link href="/dashboard/projects">Back to Projects</Link>
          </Button>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto py-6">
        <PageHeader
          heading={dataset.name}
          subheading={project ? `Project: ${project.name}` : "Dataset Details"}
          actions={
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link href={`/dashboard/datasets/${datasetId}/analyze`}>Analyze Dataset</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href={`/dashboard/datasets/${datasetId}/transform`}>Transform Dataset</Link>
              </Button>
              {dataset.file_path && (
                <Button variant="outline" asChild>
                  <Link href={`/api/datasets/${datasetId}/download`} target="_blank">
                    <LucideDownload className="h-4 w-4 mr-2" />
                    Download
                  </Link>
                </Button>
              )}
            </div>
          }
        />

        <div className="mt-8">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="data">Data Preview</TabsTrigger>
              <TabsTrigger value="analyses">Analyses</TabsTrigger>
              <TabsTrigger value="models">Models</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Dataset Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-4">
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">Name</dt>
                        <dd className="text-base">{dataset.name}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">Description</dt>
                        <dd className="text-base">{dataset.description || "No description provided."}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">File Type</dt>
                        <dd className="text-base">{dataset.file_type?.toUpperCase() || "Unknown"}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">Created</dt>
                        <dd className="text-base">{new Date(dataset.created_at).toLocaleString()}</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Data Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-4">
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">Rows</dt>
                        <dd className="text-base">{dataset.row_count?.toLocaleString() || "Unknown"}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">Columns</dt>
                        <dd className="text-base">{dataset.column_count || "Unknown"}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">Project</dt>
                        <dd className="text-base">
                          {project ? (
                            <Link href={`/dashboard/projects/${project.id}`} className="text-primary hover:underline">
                              {project.name}
                            </Link>
                          ) : (
                            "Unknown"
                          )}
                        </dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 md:grid-cols-4 mt-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <LucideTable className="h-5 w-5" />
                      Data Preview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      View a sample of the dataset to understand its structure
                    </p>
                    <Button variant="outline" className="mt-4 w-full" onClick={() => setActiveTab("data")}>
                      View Data
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <LucideBarChart className="h-5 w-5" />
                      Analyze
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Perform exploratory data analysis on this dataset
                    </p>
                    <Button variant="outline" className="mt-4 w-full" asChild>
                      <Link href={`/dashboard/datasets/${datasetId}/analyze`}>Analyze Data</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <LucideFileText className="h-5 w-5" />
                      Transform
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Clean, filter, and transform your dataset with a visual pipeline
                    </p>
                    <Button variant="outline" className="mt-4 w-full" asChild>
                      <Link href={`/dashboard/datasets/${datasetId}/transform`}>Transform Data</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <LucideBrain className="h-5 w-5" />
                      Train Model
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Train a machine learning model using this dataset
                    </p>
                    <Button variant="outline" className="mt-4 w-full" asChild>
                      <Link href={`/dashboard/datasets/${datasetId}/train`}>Train Model</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Data Preview Tab */}
            <TabsContent value="data">
              <Card>
                <CardHeader>
                  <CardTitle>Data Preview</CardTitle>
                  <CardDescription>
                    Showing the first {previewData.length} rows of the dataset
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loadingPreview ? (
                    <div className="py-8">
                      <Skeleton className="h-8 w-full mb-4" />
                      <Skeleton className="h-8 w-full mb-4" />
                      <Skeleton className="h-8 w-full mb-4" />
                      <Skeleton className="h-8 w-full mb-4" />
                      <Skeleton className="h-8 w-full" />
                    </div>
                  ) : previewData.length > 0 ? (
                    <div className="border rounded-md overflow-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            {previewColumns.map((column) => (
                              <TableHead key={column}>{column}</TableHead>
                            ))}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {previewData.map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                              {previewColumns.map((column) => (
                                <TableCell key={`${rowIndex}-${column}`}>
                                  {row[column]?.toString() || ""}
                                </TableCell>
                              ))}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="text-center py-12 border rounded-md">
                      <LucideFileText className="h-12 w-12 mx-auto text-muted-foreground" />
                      <h3 className="mt-4 text-lg font-medium">No preview available</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        We couldn't generate a preview for this dataset
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analyses Tab */}
            <TabsContent value="analyses">
              <Card>
                <CardHeader>
                  <CardTitle>Analyses</CardTitle>
                  <CardDescription>Exploratory data analyses for this dataset</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <Button asChild>
                      <Link href={`/dashboard/datasets/${datasetId}/analyze`}>New Analysis</Link>
                    </Button>
                  </div>

                  <div className="text-center py-12 border rounded-md">
                    <LucideBarChart className="h-12 w-12 mx-auto text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">No analyses yet</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Create your first analysis to explore this dataset
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Models Tab */}
            <TabsContent value="models">
              <Card>
                <CardHeader>
                  <CardTitle>Machine Learning Models</CardTitle>
                  <CardDescription>Models trained on this dataset</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <Button asChild>
                      <Link href={`/dashboard/datasets/${datasetId}/train`}>Train New Model</Link>
                    </Button>
                  </div>

                  <div className="text-center py-12 border rounded-md">
                    <LucideBrain className="h-12 w-12 mx-auto text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">No models trained yet</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Train your first model using this dataset
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
