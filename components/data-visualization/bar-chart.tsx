"use client"

import { useEffect, useRef, useState } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
} from "chart.js"
import { Bar } from "react-chartjs-2"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface BarChartProps {
  data: ChartData<"bar">
  options?: ChartOptions<"bar">
  height?: number
}

export function BarChart({ data, options, height = 300 }: BarChartProps) {
  const chartRef = useRef<ChartJS<"bar">>(null)
  const [chartData, setChartData] = useState<ChartData<"bar">>(data)

  // Update chart data when props change
  useEffect(() => {
    setChartData(data)
  }, [data])

  const defaultOptions: ChartOptions<"bar"> = {
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
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  return (
    <div style={{ height: `${height}px` }}>
      <Bar ref={chartRef} data={chartData} options={options || defaultOptions} />
    </div>
  )
}
