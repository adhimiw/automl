"use client"

import { useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScatterChart as RechartsScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export interface ScatterPlotProps {
  title?: string
  description?: string
  data: Record<string, any>[]
  xAxisKey: string
  yAxisKey: string
  color?: string
  className?: string
  height?: number
}

export function ScatterPlot({
  title,
  description,
  data,
  xAxisKey,
  yAxisKey,
  color = "#3b82f6",
  className,
  height = 300,
}: ScatterPlotProps) {
  const chartRef = useRef<HTMLDivElement>(null)

  return (
    <Card className={className}>
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>
        <div ref={chartRef} style={{ width: "100%", height }}>
          <ResponsiveContainer width="100%" height="100%">
            <RechartsScatterChart
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid />
              <XAxis type="number" dataKey={xAxisKey} name={xAxisKey} />
              <YAxis type="number" dataKey={yAxisKey} name={yAxisKey} />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Legend />
              <Scatter name={`${xAxisKey} vs ${yAxisKey}`} data={data} fill={color} />
            </RechartsScatterChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
