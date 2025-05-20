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
import { 
  LucideDatabase, 
  LucideBarChart, 
  LucideBrain, 
  LucideFileText,
  LucideUpload,
  LucideAlertCircle,
  LucideRefreshCw
} from "lucide-react"
import Link from "next/link"

// Project type definition
interface Project {
  id: number
  name: string
  description: string
  user_id: number
  created_at: string
  updated_at: string
}

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

export default function ProjectDetailPage() {
  const router = useRouter()
  const params = useParams()
  const projectId = params.id as string
  
  const [project, setProject] = useState<Project | null>(null)
  const [datasets, setDatasets] = useState<Dataset[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [uploadingFile, setUploadingFile] = useState(false)

  // Fetch project details
  useEffect(() => {
    async function fetchProjectDetails() {
      setLoading(true)
      setError(null)
      
      try {
        // Fetch project
        const projectRes = await fetch(`/api/projects/${projectId}`)
        
        if (!projectRes.ok) {
          throw new Error(`Failed to fetch project: ${projectRes.statusText}`)
        }
        
        const projectData = await projectRes.json()
        setProject(projectData)
        
        // Fetch datasets for this project
        const datasetsRes = await fetch(`/api/datasets?project_id=${projectId}`)
        
        if (datasetsRes.ok) {
          const datasetsData = await datasetsRes.json()
          setDatasets(datasetsData)
        }
      } catch (err) {
        console.error("Error fetching project details:", err)
        setError(err instanceof Error ? err.message : "Failed to load project details")
      } finally {
        setLoading(false)
      }
    }
    
    if (projectId) {
      fetchProjectDetails()
    }
  }, [projectId])

  // Handle file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return
    
    const file = files[0]
    setUploadingFile(true)
    
    try {
      // Create form data
      const formData = new FormData()
      formData.append("file", file)
      formData.append("name", file.name)
      formData.append("project_id", projectId)
      
      // Upload file
      const response = await fetch("/api/datasets/upload", {
        method: "POST",
        body: formData,
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to upload file")
      }
      
      // Refresh datasets
      const datasetsRes = await fetch(`/api/datasets?project_id=${projectId}`)
      if (datasetsRes.ok) {
        const datasetsData = await datasetsRes.json()
        setDatasets(datasetsData)
      }
      
      // Show success message
      alert("File uploaded successfully")
    } catch (err) {
      console.error("Error uploading file:", err)
      alert(err instanceof Error ? err.message : "Failed to upload file")
    } finally {
      setUploadingFile(false)
    }
  }

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="container mx-auto py-6">
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          
          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </div>
          
          <Skeleton className="h-64" />
        </div>
      </ProtectedRoute>
    )
  }

  if (error || !project) {
    return (
      <ProtectedRoute>
        <div className="container mx-auto py-6">
          <PageHeader
            heading="Project Not Found"
            subheading="We couldn't find the project you're looking for"
          />
          
          <Alert variant="destructive" className="my-6">
            <LucideAlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error || "Project not found. It may have been deleted or you don't have access to it."}
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
          heading={project.name}
          subheading={`Created on ${new Date(project.created_at).toLocaleDateString()}`}
          actions={
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link href={`/dashboard/projects/${projectId}/edit`}>Edit Project</Link>
              </Button>
              <Button variant="destructive" onClick={() => {
                if (confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
                  // Delete project logic
                }
              }}>Delete Project</Button>
            </div>
          }
        />

        <div className="mt-8">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="datasets">Datasets</TabsTrigger>
              <TabsTrigger value="analyses">Analyses</TabsTrigger>
              <TabsTrigger value="models">Models</TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>Project Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {project.description || "No description provided."}
                  </p>
                </CardContent>
              </Card>

              <div className="grid gap-6 md:grid-cols-3 mt-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <LucideDatabase className="h-5 w-5" />
                      Datasets
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{datasets.length}</p>
                    <p className="text-sm text-muted-foreground">
                      {datasets.length === 1 ? "Dataset" : "Datasets"} uploaded
                    </p>
                    <Button variant="outline" className="mt-4 w-full" asChild>
                      <Link href="#" onClick={() => setActiveTab("datasets")}>Manage Datasets</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <LucideBarChart className="h-5 w-5" />
                      Analyses
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">0</p>
                    <p className="text-sm text-muted-foreground">Analyses performed</p>
                    <Button variant="outline" className="mt-4 w-full" asChild>
                      <Link href="#" onClick={() => setActiveTab("analyses")}>Create Analysis</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <LucideBrain className="h-5 w-5" />
                      Models
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">0</p>
                    <p className="text-sm text-muted-foreground">Models trained</p>
                    <Button variant="outline" className="mt-4 w-full" asChild>
                      <Link href="#" onClick={() => setActiveTab("models")}>Train Models</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Datasets Tab */}
            <TabsContent value="datasets">
              <Card>
                <CardHeader>
                  <CardTitle>Project Datasets</CardTitle>
                  <CardDescription>Manage datasets for this project</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="flex items-center gap-4">
                      <Button onClick={() => document.getElementById('file-upload')?.click()}>
                        <LucideUpload className="h-4 w-4 mr-2" />
                        Upload New Dataset
                      </Button>
                      <input 
                        id="file-upload" 
                        type="file" 
                        className="hidden" 
                        accept=".csv,.xlsx,.json" 
                        onChange={handleFileUpload}
                        disabled={uploadingFile}
                      />
                      {uploadingFile && (
                        <div className="flex items-center text-muted-foreground">
                          <LucideRefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Uploading...
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Supported formats: CSV, Excel, JSON
                    </p>
                  </div>

                  {datasets.length > 0 ? (
                    <div className="space-y-4">
                      {datasets.map((dataset) => (
                        <div key={dataset.id} className="border rounded-md p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">{dataset.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {dataset.row_count && dataset.column_count 
                                  ? `${dataset.row_count.toLocaleString()} rows, ${dataset.column_count} columns` 
                                  : "Dataset details not available"}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/dashboard/datasets/${dataset.id}`}>View</Link>
                              </Button>
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/dashboard/datasets/${dataset.id}/analyze`}>Analyze</Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 border rounded-md">
                      <LucideDatabase className="h-12 w-12 mx-auto text-muted-foreground" />
                      <h3 className="mt-4 text-lg font-medium">No datasets yet</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Upload your first dataset to get started
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
                  <CardDescription>Exploratory data analyses for this project</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <Button disabled={datasets.length === 0}>
                      New Analysis
                    </Button>
                    {datasets.length === 0 && (
                      <p className="text-sm text-muted-foreground mt-2">
                        Upload a dataset first to create an analysis
                      </p>
                    )}
                  </div>

                  <div className="text-center py-12 border rounded-md">
                    <LucideBarChart className="h-12 w-12 mx-auto text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">No analyses yet</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Create your first analysis to explore your data
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
                  <CardDescription>Models trained on project data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <Button disabled={datasets.length === 0}>
                      Train New Model
                    </Button>
                    {datasets.length === 0 && (
                      <p className="text-sm text-muted-foreground mt-2">
                        Upload a dataset first to train a model
                      </p>
                    )}
                  </div>

                  <div className="text-center py-12 border rounded-md">
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
