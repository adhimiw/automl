"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { PieChart } from "@/components/data-visualization/pie-chart"

export function DatasetStats() {
  const [loading, setLoading] = useState(true)
  const [chartData, setChartData] = useState<any>(null)

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchStats = async () => {
      setLoading(true)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock data
      const data = {
        labels: ["CSV", "Excel", "Database", "API", "JSON"],
        datasets: [
          {
            data: [12, 8, 6, 5, 3],
            backgroundColor: [
              "rgba(53, 162, 235, 0.5)",
              "rgba(75, 192, 192, 0.5)",
              "rgba(255, 99, 132, 0.5)",
              "rgba(255, 206, 86, 0.5)",
              "rgba(153, 102, 255, 0.5)",
            ],
            borderColor: [
              "rgba(53, 162, 235, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(255, 99, 132, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(153, 102, 255, 1)",
            ],
            borderWidth: 1,
          },
        ],
      }

      setChartData(data)
      setLoading(false)
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[200px]">
        <div className="h-32 w-32 animate-pulse rounded-full bg-muted"></div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Dataset Sources</h3>
        <p className="text-sm text-muted-foreground">Total: 34 datasets</p>
      </div>
      <div className="h-[200px]">
        <PieChart data={chartData} />
      </div>
      <div className="grid grid-cols-2 gap-4 pt-4">
        <Card className="p-3">
          <div className="text-sm font-medium">Largest Dataset</div>
          <div className="text-2xl font-bold">2.4 GB</div>
          <div className="text-xs text-muted-foreground">Customer Database</div>
        </Card>
        <Card className="p-3">
          <div className="text-sm font-medium">Average Size</div>
          <div className="text-2xl font-bold">156 MB</div>
          <div className="text-xs text-muted-foreground">Across all datasets</div>
        </Card>
      </div>
    </div>
  )
}
