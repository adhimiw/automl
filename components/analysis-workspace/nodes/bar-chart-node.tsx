"use client"

import { useState, useRef, useEffect } from 'react'
import { Handle, Position, NodeProps } from 'reactflow'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { BarChart2 } from 'lucide-react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export function BarChartNode({ data, isConnectable }: NodeProps) {
  const [xAxis, setXAxis] = useState<string>(data.xAxis || '')
  const [yAxis, setYAxis] = useState<string>(data.yAxis || '')
  const [chartData, setChartData] = useState<any>(null)
  const chartRef = useRef<HTMLDivElement>(null)

  const handleXAxisChange = (value: string) => {
    setXAxis(value)
    data.xAxis = value
    updateChartData()
  }

  const handleYAxisChange = (value: string) => {
    setYAxis(value)
    data.yAxis = value
    updateChartData()
  }

  const updateChartData = () => {
    if (!data.results || !xAxis || !yAxis) return

    const labels = data.results.labels || []
    const values = data.results.values || []

    setChartData({
      labels,
      datasets: [
        {
          label: yAxis,
          data: values,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    })
  }

  // Update chart when results change
  useEffect(() => {
    if (data.results && xAxis && yAxis) {
      updateChartData()
    }
  }, [data.results, xAxis, yAxis])

  const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 10,
          },
        },
      },
      title: {
        display: true,
        text: `${yAxis} by ${xAxis}`,
        font: {
          size: 12,
        },
      },
      tooltip: {
        titleFont: {
          size: 10,
        },
        bodyFont: {
          size: 10,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 10,
          },
        },
      },
      x: {
        ticks: {
          font: {
            size: 10,
          },
        },
      },
    },
  }

  return (
    <Card className="w-[350px] shadow-md">
      <CardHeader className="bg-muted/50 p-3">
        <CardTitle className="text-sm flex items-center">
          <BarChart2 className="h-4 w-4 mr-2" />
          Bar Chart
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <div className="space-y-3">
          <div>
            <Label htmlFor="xAxis" className="text-xs">X-Axis (Category)</Label>
            <Select value={xAxis} onValueChange={handleXAxisChange}>
              <SelectTrigger id="xAxis" className="h-8 text-xs">
                <SelectValue placeholder="Select X-Axis" />
              </SelectTrigger>
              <SelectContent>
                {data.columns?.map((col: string) => (
                  <SelectItem key={col} value={col} className="text-xs">{col}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="yAxis" className="text-xs">Y-Axis (Value)</Label>
            <Select value={yAxis} onValueChange={handleYAxisChange}>
              <SelectTrigger id="yAxis" className="h-8 text-xs">
                <SelectValue placeholder="Select Y-Axis" />
              </SelectTrigger>
              <SelectContent>
                {data.columns?.map((col: string) => (
                  <SelectItem key={col} value={col} className="text-xs">{col}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div ref={chartRef} className="h-[200px] w-full">
            {chartData ? (
              <Bar data={chartData} options={chartOptions} />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground text-xs">
                {data.results ? 'Select axes to display chart' : 'Execute analysis to see results'}
              </div>
            )}
          </div>
        </div>
      </CardContent>
      
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-primary"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-primary"
      />
    </Card>
  )
}
