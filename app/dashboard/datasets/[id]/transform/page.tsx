"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageHeader } from "@/components/page-header"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  ArrowLeft,
  Database,
  AlertCircle,
  RefreshCw,
  FileOutput,
  LucideAlertTriangle,
  LucideCheck
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { PipelineBuilder } from "@/components/data-transformation/pipeline-builder"
import { TransformationBuilder } from "@/components/data-transformation/transformation-builder"
import { TransformationPreview } from "@/components/data-transformation/transformation-preview"

interface TransformationStep {
  id: string
  type: string
  config: Record<string, any>
}

interface Column {
  key: string
  label: string
  type: string
  sortable?: boolean
  filterable?: boolean
}

export default function DatasetTransformPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const datasetId = Array.isArray(params.id) ? params.id[0] : params.id

  const [dataset, setDataset] = useState<any>(null)
  const [columns, setColumns] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [transformationSteps, setTransformationSteps] = useState<TransformationStep[]>([])
  const [showPreview, setShowPreview] = useState(false)
  const [success, setSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState<string>("visual")

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

        // Extract columns
        if (datasetData.columns) {
          setColumns(Object.keys(datasetData.columns))
        }

        // For demo purposes, if we don't have real data, use mock data
        if (!datasetData.columns || Object.keys(datasetData.columns).length === 0) {
          // Mock dataset data
          const mockDataset = {
            id: datasetId,
            name: datasetData.name || "Sample Dataset",
            description: datasetData.description || "A sample dataset for demonstration",
            columns: [
              { key: "month", label: "Month", type: "string", sortable: true, filterable: true },
              { key: "sales", label: "Sales", type: "number", sortable: true },
              { key: "expenses", label: "Expenses", type: "number", sortable: true },
              { key: "profit", label: "Profit", type: "number", sortable: true },
              { key: "category", label: "Category", type: "string", sortable: true, filterable: true },
            ],
            rows: [
              { month: "Jan", sales: 1200, expenses: 800, profit: 400, category: "A" },
              { month: "Feb", sales: 1400, expenses: 900, profit: 500, category: "B" },
              { month: "Mar", sales: 1100, expenses: 700, profit: 400, category: "A" },
              { month: "Apr", sales: 1700, expenses: 1100, profit: 600, category: "C" },
              { month: "May", sales: 1300, expenses: 800, profit: 500, category: "B" },
              { month: "Jun", sales: 1500, expenses: 1000, profit: 500, category: "A" },
              { month: "Jul", sales: 1800, expenses: 1200, profit: 600, category: "C" },
              { month: "Aug", sales: 1600, expenses: 1100, profit: 500, category: "B" },
              { month: "Sep", sales: 1400, expenses: 900, profit: 500, category: "A" },
              { month: "Oct", sales: 1900, expenses: 1300, profit: 600, category: "C" },
              { month: "Nov", sales: 1700, expenses: 1100, profit: 600, category: "B" },
              { month: "Dec", sales: 2000, expenses: 1400, profit: 600, category: "A" },
            ],
          }

          setDataset(mockDataset)
          setColumns(mockDataset.columns.map((col: any) => col.key))
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

  const handlePreview = (steps: TransformationStep[]) => {
    setTransformationSteps(steps)
    setShowPreview(true)
  }

  const handleApply = async () => {
    try {
      setLoading(true)

      // In a real app, this would be an API call to apply transformations
      // For demo purposes, we'll simulate the API call

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setSuccess(true)
      setLoading(false)

      // Redirect after a short delay
      setTimeout(() => {
        router.push(`/dashboard/datasets/${datasetId}`)
      }, 2000)
    } catch (err) {
      console.error("Error applying transformations:", err)
      setError("Failed to apply transformations")
      setLoading(false)
    }
  }

  // Add handlers for the visual pipeline builder
  const handleExecutePipeline = async (pipeline: any) => {
    // This would normally call the backend API to execute the pipeline
    // For now, we'll simulate a response
    await new Promise(resolve => setTimeout(resolve, 1500))

    return {
      rowCount: Math.floor(dataset.row_count || 100 * 0.8),
      columnCount: columns.length + (pipeline.nodes.some((n: any) => n.type === 'calculate') ? 1 : 0),
    }
  }

  const handleSavePipeline = async (pipeline: any) => {
    // This would normally call the backend API to save the pipeline and transformed dataset
    // For now, we'll simulate a response
    await new Promise(resolve => setTimeout(resolve, 2000))

    const newDatasetId = `transformed-${Date.now()}`

    toast({
      title: "Dataset Transformed",
      description: `New dataset "${dataset.name} (Transformed)" has been created`,
    })

    // Redirect to the new dataset
    router.push(`/dashboard/datasets/${newDatasetId}`)

    return {
      id: newDatasetId,
      name: `${dataset.name} (Transformed)`,
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-6">
        <Skeleton className="h-12 w-3/4 mb-6" />
        <Skeleton className="h-[600px] w-full" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <div className="mt-4">
          <Button asChild variant="outline">
            <Link href="/dashboard/datasets">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Datasets
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="container mx-auto py-6">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-green-600">Success</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8">
              <div className="rounded-full bg-green-100 p-3">
                <LucideCheck className="h-8 w-8 text-green-600" />
              </div>
              <p className="mt-4 text-center">Transformations applied successfully! Redirecting to dataset view...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6">
      <PageHeader
        heading={`Transform Dataset: ${dataset?.name}`}
        subheading="Create a visual pipeline to transform your data"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href={`/dashboard/datasets/${datasetId}`}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dataset
              </Link>
            </Button>
          </div>
        }
      />

      <div className="mt-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="visual">Visual Pipeline Builder</TabsTrigger>
            <TabsTrigger value="step">Step-by-Step Builder</TabsTrigger>
          </TabsList>

          <TabsContent value="visual">
            <Card>
              <CardHeader>
                <CardTitle>Visual ETL Pipeline Builder</CardTitle>
                <CardDescription>
                  Drag and drop transformations to build your data pipeline
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PipelineBuilder
                  datasetId={datasetId}
                  columns={columns}
                  onExecute={handleExecutePipeline}
                  onSave={handleSavePipeline}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="step">
            {showPreview ? (
              <TransformationPreview
                originalData={dataset?.rows || []}
                originalColumns={dataset?.columns || []}
                transformationSteps={transformationSteps}
                onApply={handleApply}
                onCancel={() => setShowPreview(false)}
              />
            ) : (
              <>
                <Alert>
                  <LucideAlertTriangle className="h-4 w-4" />
                  <AlertTitle>Transformation Editor</AlertTitle>
                  <AlertDescription>
                    Add and configure transformation steps to clean and prepare your data. Changes will not be applied until
                    you preview and confirm.
                  </AlertDescription>
                </Alert>

                <TransformationBuilder
                  columns={dataset?.columns?.map((col: any) => ({ name: col.key, type: col.type })) || []}
                  onApply={handlePreview}
                  onPreview={handlePreview}
                />
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
