"use client"

import { useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export interface LineChartProps {
  title?: string
  description?: string
  data: Record<string, any>[]
  xAxisKey: string
  yAxisKeys: string[]
  colors?: string[]
  className?: string
  height?: number
}

export function LineChart({
  title,
  description,
  data,
  xAxisKey,
  yAxisKeys,
  colors = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6"],
  className,
  height = 300,
}: LineChartProps) {
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
            <RechartsLineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxisKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              {yAxisKeys.map((key, index) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={colors[index % colors.length]}
                  activeDot={{ r: 8 }}
                />
              ))}
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
