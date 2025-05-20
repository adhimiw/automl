"use client"

import { useEffect, useRef, useState } from "react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, type ChartData, type ChartOptions } from "chart.js"
import { Pie } from "react-chartjs-2"

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend)

interface PieChartProps {
  data: ChartData<"pie">
  options?: ChartOptions<"pie">
  height?: number
}

export function PieChart({ data, options, height = 300 }: PieChartProps) {
  const chartRef = useRef<ChartJS<"pie">>(null)
  const [chartData, setChartData] = useState<ChartData<"pie">>(data)

  // Update chart data when props change
  useEffect(() => {
    setChartData(data)
  }, [data])

  const defaultOptions: ChartOptions<"pie"> = {
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
  }

  return (
    <div style={{ height: `${height}px` }}>
      <Pie ref={chartRef} data={chartData} options={options || defaultOptions} />
    </div>
  )
}
