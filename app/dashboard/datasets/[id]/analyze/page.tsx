"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/page-header"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  ArrowLeft,
  AlertCircle,
  RefreshCw,
  FileText,
  Lightbulb
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { AnalysisCanvas } from "@/components/analysis-workspace/analysis-canvas"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DatasetAnalyzePage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [dataset, setDataset] = useState<any>(null)
  const [columns, setColumns] = useState<string[]>([])
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string>("canvas")
  const [aiSuggestions, setAiSuggestions] = useState<string | null>(null)
  const [loadingSuggestions, setLoadingSuggestions] = useState(false)

  const datasetId = Array.isArray(params.id) ? params.id[0] : params.id

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
              { key: "month", label: "Month", type: "string" },
              { key: "sales", label: "Sales", type: "number" },
              { key: "expenses", label: "Expenses", type: "number" },
              { key: "profit", label: "Profit", type: "number" },
              { key: "category", label: "Category", type: "string" },
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
          setData(mockDataset.rows)
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

  const handleExecuteAnalysis = async (analysis: any) => {
    // This would normally call the backend API to execute the analysis
    // For now, we'll simulate a response
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Generate mock results based on the analysis nodes
    const results: Record<string, any> = {}

    analysis.nodes.forEach((node: any) => {
      if (node.type === 'statsSummary') {
        // Generate statistics summary
        const stats: Record<string, any> = {}
        node.data.selectedColumns?.forEach((col: string) => {
          stats[col] = {
            count: 12,
            mean: Math.random() * 1000,
            std: Math.random() * 200,
            min: Math.random() * 500,
            '25%': Math.random() * 800,
            '50%': Math.random() * 1000,
            '75%': Math.random() * 1500,
            max: Math.random() * 2000,
          }
        })
        results[node.id] = stats
      } else if (node.type === 'correlation') {
        // Generate correlation matrix
        const corr: Record<string, Record<string, number>> = {}
        node.data.selectedColumns?.forEach((row: string) => {
          corr[row] = {}
          node.data.selectedColumns?.forEach((col: string) => {
            if (row === col) {
              corr[row][col] = 1.0
            } else {
              // Generate random correlation between -1 and 1
              corr[row][col] = (Math.random() * 2 - 1).toFixed(2) as unknown as number
            }
          })
        })
        results[node.id] = corr
      } else if (node.type === 'barChart') {
        // Generate bar chart data
        const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const values = labels.map(() => Math.floor(Math.random() * 2000))
        results[node.id] = { labels, values }
      } else if (node.type === 'scatterPlot') {
        // Generate scatter plot data
        const points = Array.from({ length: 50 }, () => ({
          x: Math.random() * 2000,
          y: Math.random() * 2000,
        }))
        results[node.id] = { points }
      }
    })

    return results
  }

  const handleSaveAnalysis = async (analysis: any) => {
    // This would normally call the backend API to save the analysis
    // For now, we'll simulate a response
    await new Promise(resolve => setTimeout(resolve, 2000))

    const analysisId = `analysis-${Date.now()}`

    toast({
      title: "Analysis Saved",
      description: `Analysis "${dataset.name} Analysis" has been saved`,
    })

    // In a real app, we would redirect to the analysis view
    // router.push(`/dashboard/analyses/${analysisId}`)

    return {
      id: analysisId,
      name: `${dataset.name} Analysis`,
    }
  }

  const handleGetAiSuggestions = async () => {
    setLoadingSuggestions(true)

    try {
      // Call the API to get AI suggestions
      const response = await fetch(`/api/datasets/${datasetId}/analysis-suggestions`)

      if (!response.ok) {
        throw new Error(`Failed to get AI suggestions: ${response.statusText}`)
      }

      const data = await response.json()
      setAiSuggestions(data.suggestions)
    } catch (error) {
      console.error('Error getting AI suggestions:', error)
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to get AI suggestions',
        variant: 'destructive',
      })

      // Fallback to mock suggestions if API fails
      const fallbackSuggestions = `
## Analysis Recommendations for ${dataset.name}

Based on the dataset structure, here are some recommended analyses:

### Descriptive Statistics
- Calculate summary statistics for numerical columns (sales, expenses, profit)
- Identify outliers and extreme values
- Analyze distribution patterns

### Correlation Analysis
- Examine correlation between sales and expenses
- Analyze profit margins across different categories
- Look for seasonal patterns in the monthly data

### Visualization Recommendations
- Bar chart of monthly sales to identify seasonal trends
- Scatter plot of sales vs. expenses to analyze relationship
- Box plots of profit by category to compare performance

### Advanced Analysis
- Time series forecasting for future sales predictions
- Segment analysis by category to identify best performers
- Profit margin analysis to optimize business strategy
      `

      setAiSuggestions(fallbackSuggestions)
    } finally {
      setLoadingSuggestions(false)
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

  return (
    <div className="container mx-auto py-6">
      <PageHeader
        heading={`Analyze Dataset: ${dataset?.name}`}
        subheading="Create visual analysis workflows to explore your data"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href={`/dashboard/datasets/${datasetId}`}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dataset
              </Link>
            </Button>
            <Button
              variant="outline"
              onClick={handleGetAiSuggestions}
              disabled={loadingSuggestions}
            >
              {loadingSuggestions ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Getting Suggestions...
                </>
              ) : (
                <>
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Get AI Suggestions
                </>
              )}
            </Button>
          </div>
        }
      />

      <div className="mt-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="canvas">Analysis Canvas</TabsTrigger>
            <TabsTrigger value="suggestions">AI Suggestions</TabsTrigger>
          </TabsList>

          <TabsContent value="canvas">
            <Card>
              <CardHeader>
                <CardTitle>Visual Analysis Workspace</CardTitle>
                <CardDescription>
                  Drag and drop analysis components to build your analysis workflow
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AnalysisCanvas
                  datasetId={datasetId}
                  columns={columns}
                  data={data}
                  onExecute={handleExecuteAnalysis}
                  onSave={handleSaveAnalysis}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="suggestions">
            <Card>
              <CardHeader>
                <CardTitle>AI-Powered Analysis Suggestions</CardTitle>
                <CardDescription>
                  Recommendations for analyzing this dataset based on its structure and content
                </CardDescription>
              </CardHeader>
              <CardContent>
                {aiSuggestions ? (
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <div dangerouslySetInnerHTML={{ __html: aiSuggestions.replace(/\n/g, '<br>') }} />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Lightbulb className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No suggestions yet</h3>
                    <p className="text-sm text-muted-foreground mt-1 max-w-md">
                      Click the "Get AI Suggestions" button to receive personalized analysis recommendations for this dataset
                    </p>
                    <Button
                      onClick={handleGetAiSuggestions}
                      className="mt-4"
                      disabled={loadingSuggestions}
                    >
                      {loadingSuggestions ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Getting Suggestions...
                        </>
                      ) : (
                        <>
                          <Lightbulb className="h-4 w-4 mr-2" />
                          Get AI Suggestions
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
