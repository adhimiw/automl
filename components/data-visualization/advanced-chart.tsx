"use client"

import { useEffect, useRef, useState } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Filler,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
  type ChartType,
} from "chart.js"
import { Chart } from "react-chartjs-2"
import { LucideLoader2 } from "lucide-react"

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Filler,
  Tooltip,
  Legend,
)

interface AdvancedChartProps {
  type: ChartType
  data: ChartData<ChartType>
  options?: ChartOptions<ChartType>
  height?: number
  loading?: boolean
}

export function AdvancedChart({ type, data, options, height = 300, loading = false }: AdvancedChartProps) {
  const chartRef = useRef<ChartJS<ChartType>>(null)
  const [chartData, setChartData] = useState<ChartData<ChartType>>(data)

  // Update chart data when props change
  useEffect(() => {
    setChartData(data)
  }, [data])

  const defaultOptions: ChartOptions<ChartType> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales:
      type !== "pie" && type !== "doughnut" && type !== "radar" && type !== "polarArea"
        ? {
            y: {
              beginAtZero: true,
            },
          }
        : undefined,
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center" style={{ height: `${height}px` }}>
        <div className="text-center">
          <LucideLoader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
          <p className="mt-2 text-sm text-muted-foreground">Loading chart data...</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ height: `${height}px` }}>
      <Chart ref={chartRef} type={type} data={chartData} options={options || defaultOptions} />
    </div>
  )
}
