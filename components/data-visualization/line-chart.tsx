"use client"

import { useEffect, useRef, useState } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
} from "chart.js"
import { Line } from "react-chartjs-2"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface LineChartProps {
  data: ChartData<"line">
  options?: ChartOptions<"line">
  height?: number
}

export function LineChart({ data, options, height = 300 }: LineChartProps) {
  const chartRef = useRef<ChartJS<"line">>(null)
  const [chartData, setChartData] = useState<ChartData<"line">>(data)

  // Update chart data when props change
  useEffect(() => {
    setChartData(data)
  }, [data])

  const defaultOptions: ChartOptions<"line"> = {
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
      <Line ref={chartRef} data={chartData} options={options || defaultOptions} />
    </div>
  )
}
