"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export interface MissingValuesChartProps {
  title?: string
  description?: string
  data: Array<{
    column: string
    missing: number
    total: number
  }>
  className?: string
}

export function MissingValuesChart({
  title = "Missing Values",
  description = "Percentage of missing values by column",
  data,
  className,
}: MissingValuesChartProps) {
  // Sort data by missing percentage (descending)
  const sortedData = [...data].sort((a, b) => {
    const pctA = (a.missing / a.total) * 100
    const pctB = (b.missing / b.total) * 100
    return pctB - pctA
  })

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedData.map((item) => {
            const percentage = (item.missing / item.total) * 100
            return (
              <div key={item.column} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{item.column}</span>
                  <span>
                    {item.missing.toLocaleString()} / {item.total.toLocaleString()} ({percentage.toFixed(1)}%)
                  </span>
                </div>
                <Progress value={percentage} className="h-2" />
              </div>
            )
          })}
        </div>

        {sortedData.length === 0 && (
          <div className="py-8 text-center text-muted-foreground">
            <p>No missing values found in the dataset.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
