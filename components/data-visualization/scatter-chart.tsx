"use client"

import { useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import Chart from "chart.js/auto"

interface ScatterChartProps {
  data: Array<{ [key: string]: any }>
  xAxis: string
  yAxis: string
  title?: string
  height?: number
  isLoading?: boolean
}

export function ScatterChart({
  data,
  xAxis,
  yAxis,
  title = "Scatter Chart",
  height = 400,
  isLoading = false,
}: ScatterChartProps) {
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

    // Prepare data for scatter chart
    const scatterData = data.map((item) => ({
      x: Number.parseFloat(item[xAxis]) || 0,
      y: Number.parseFloat(item[yAxis]) || 0,
    }))

    // Create new chart
    chartInstance.current = new Chart(ctx, {
      type: "scatter",
      data: {
        datasets: [
          {
            label: `${xAxis} vs ${yAxis}`,
            data: scatterData,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
            pointRadius: 6,
            pointHoverRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: xAxis,
            },
          },
          y: {
            title: {
              display: true,
              text: yAxis,
            },
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => `${xAxis}: ${context.parsed.x}, ${yAxis}: ${context.parsed.y}`,
            },
          },
          legend: {
            display: true,
            position: "top",
          },
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data, xAxis, yAxis, isLoading])

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
              No data available for the selected columns
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
