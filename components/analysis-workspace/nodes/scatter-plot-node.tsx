"use client"

import { useState, useRef, useEffect } from 'react'
import { Handle, Position, NodeProps } from 'reactflow'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Workflow } from 'lucide-react'
import { Scatter } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js'

// Register Chart.js components
ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
)

export function ScatterPlotNode({ data, isConnectable }: NodeProps) {
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

    const points = data.results.points || []

    setChartData({
      datasets: [
        {
          label: `${xAxis} vs ${yAxis}`,
          data: points,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          pointRadius: 5,
          pointHoverRadius: 7,
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

  const chartOptions: ChartOptions<'scatter'> = {
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
        text: `${yAxis} vs ${xAxis}`,
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
        callbacks: {
          label: (context) => {
            const point = context.raw as { x: number, y: number }
            return `${xAxis}: ${point.x.toFixed(2)}, ${yAxis}: ${point.y.toFixed(2)}`
          },
        },
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: yAxis,
          font: {
            size: 10,
          },
        },
        ticks: {
          font: {
            size: 10,
          },
        },
      },
      x: {
        title: {
          display: true,
          text: xAxis,
          font: {
            size: 10,
          },
        },
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
          <Workflow className="h-4 w-4 mr-2" />
          Scatter Plot
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <div className="space-y-3">
          <div>
            <Label htmlFor="xAxis" className="text-xs">X-Axis</Label>
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
            <Label htmlFor="yAxis" className="text-xs">Y-Axis</Label>
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
              <Scatter data={chartData} options={chartOptions} />
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
