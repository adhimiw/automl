"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { LucideDownload, LucideBarChart2, LucideTable } from "lucide-react"
import { ChartContainer } from "@/components/data-visualization/chart-container"
import { BarChart } from "@/components/data-visualization/bar-chart"
import { LineChart } from "@/components/data-visualization/line-chart"
import { PieChart } from "@/components/data-visualization/pie-chart"
import { DataGrid } from "@/components/data-visualization/data-grid"

export default function DatasetVisualizePage() {
  const params = useParams()
  const datasetId = params.id as string
  const [dataset, setDataset] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch dataset data
  useEffect(() => {
    const fetchDataset = async () => {
      try {
        setLoading(true)
        // In a real app, this would be an API call to get the dataset
        // For demo purposes, we'll use mock data

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock dataset data
        const mockDataset = {
          id: datasetId,
          name: "Sample Dataset",
          description: "A sample dataset for demonstration",
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
        setLoading(false)
      } catch (err) {
        console.error("Error fetching dataset:", err)
        setError("Failed to load dataset")
        setLoading(false)
      }
    }

    fetchDataset()
  }, [datasetId])

  // Prepare chart data
  const barChartData = {
    labels: dataset?.rows.map((row: any) => row.month) || [],
    datasets: [
      {
        label: "Sales",
        data: dataset?.rows.map((row: any) => row.sales) || [],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Expenses",
        data: dataset?.rows.map((row: any) => row.expenses) || [],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  }

  const lineChartData = {
    labels: dataset?.rows.map((row: any) => row.month) || [],
    datasets: [
      {
        label: "Profit",
        data: dataset?.rows.map((row: any) => row.profit) || [],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  }

  // Calculate category totals for pie chart
  const categoryTotals: Record<string, number> = {}
  dataset?.rows.forEach((row: any) => {
    if (!categoryTotals[row.category]) {
      categoryTotals[row.category] = 0
    }
    categoryTotals[row.category] += row.sales
  })

  const pieChartData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: ["rgba(255, 99, 132, 0.5)", "rgba(54, 162, 235, 0.5)", "rgba(255, 206, 86, 0.5)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
        borderWidth: 1,
      },
    ],
  }

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading dataset...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
            <Button className="mt-4" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{dataset?.name}</h1>
          <p className="text-muted-foreground">{dataset?.description}</p>
        </div>
        <Button variant="outline">
          <LucideDownload className="mr-2 h-4 w-4" />
          Export All
        </Button>
      </div>

      <Tabs defaultValue="charts">
        <TabsList>
          <TabsTrigger value="charts">
            <LucideBarChart2 className="mr-2 h-4 w-4" />
            Charts
          </TabsTrigger>
          <TabsTrigger value="data">
            <LucideTable className="mr-2 h-4 w-4" />
            Data
          </TabsTrigger>
        </TabsList>

        <TabsContent value="charts" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ChartContainer
              title="Sales vs Expenses"
              description="Monthly comparison of sales and expenses"
              chartTypes={["bar", "line"]}
            >
              <BarChart data={barChartData} />
            </ChartContainer>

            <ChartContainer title="Profit Trend" description="Monthly profit trend" chartTypes={["line"]}>
              <LineChart data={lineChartData} />
            </ChartContainer>

            <ChartContainer
              title="Sales by Category"
              description="Distribution of sales across categories"
              chartTypes={["pie"]}
            >
              <PieChart data={pieChartData} />
            </ChartContainer>
          </div>
        </TabsContent>

        <TabsContent value="data">
          <Card>
            <CardHeader>
              <CardTitle>Dataset Data</CardTitle>
              <CardDescription>View and explore the raw dataset</CardDescription>
            </CardHeader>
            <CardContent>
              <DataGrid
                columns={dataset?.columns || []}
                data={dataset?.rows || []}
                exportOptions={{ csv: true, json: true }}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
