"use client"

import { useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import Chart from "chart.js/auto"

interface RadarChartProps {
  data: Array<{ [key: string]: any }>
  labels: string[]
  dataKey: string
  categoryKey: string
  title?: string
  height?: number
  isLoading?: boolean
}

export function RadarChart({
  data,
  labels,
  dataKey,
  categoryKey,
  title = "Radar Chart",
  height = 400,
  isLoading = false,
}: RadarChartProps) {
  const chartRef = useRef<HTMLCanvasElement | null>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (isLoading || !chartRef.current || !data.length) return

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    // Group data by category
    const groupedData = data.reduce(
      (acc, item) => {
        const category = item[categoryKey]
        if (!acc[category]) {
          acc[category] = {}
        }

        labels.forEach((label) => {
          if (item[dataKey] === label) {
            acc[category][label] = Number.parseFloat(item.value) || 0
          }
        })

        return acc
      },
      {} as Record<string, Record<string, number>>,
    )

    // Prepare datasets
    const datasets = Object.keys(groupedData).map((category, index) => {
      // Generate a color based on index
      const hue = (index * 137) % 360 // Golden angle approximation for good distribution
      const color = `hsla(${hue}, 70%, 60%, 0.7)`
      const borderColor = `hsla(${hue}, 70%, 50%, 1)`

      return {
        label: category,
        data: labels.map((label) => groupedData[category][label] || 0),
        backgroundColor: color,
        borderColor: borderColor,
        borderWidth: 1,
        pointBackgroundColor: borderColor,
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: borderColor,
      }
    })

    // Create new chart
    chartInstance.current = new Chart(ctx, {
      type: "radar",
      data: {
        labels: labels,
        datasets: datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            angleLines: {
              display: true,
            },
            suggestedMin: 0,
          },
        },
        plugins: {
          legend: {
            position: "top",
          },
          tooltip: {
            callbacks: {
              title: (tooltipItems) => tooltipItems[0].label,
            },
          },
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data, labels, dataKey, categoryKey, isLoading])

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="w-full h-[400px] rounded-md" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ height: `${height}px` }}>
          {data.length > 0 ? (
            <canvas ref={chartRef} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              No data available for the selected parameters
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
