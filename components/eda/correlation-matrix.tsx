"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export interface CorrelationMatrixProps {
  title?: string
  description?: string
  correlations: Record<string, Record<string, number>>
  className?: string
}

export function CorrelationMatrix({
  title = "Correlation Matrix",
  description = "Pearson correlation coefficients between numeric variables",
  correlations,
  className,
}: CorrelationMatrixProps) {
  const columns = Object.keys(correlations)

  // Function to get color based on correlation value
  const getCorrelationColor = (value: number): string => {
    if (isNaN(value)) return "bg-gray-100"
    
    const absValue = Math.abs(value)
    if (absValue >= 0.7) {
      return value > 0 ? "bg-red-100" : "bg-blue-100"
    } else if (absValue >= 0.4) {
      return value > 0 ? "bg-red-50" : "bg-blue-50"
    }
    return "bg-gray-50"
  }

  // Function to format correlation value
  const formatCorrelation = (value: number): string => {
    if (isNaN(value)) return "N/A"
    return value.toFixed(2)
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="sticky left-0 bg-background">Variable</TableHead>
                {columns.map((column) => (
                  <TableHead key={column}>{column}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {columns.map((row) => (
                <TableRow key={row}>
                  <TableCell className="font-medium sticky left-0 bg-background">{row}</TableCell>
                  {columns.map((col) => {
                    const value = correlations[row]?.[col] || NaN
                    return (
                      <TableCell key={`${row}-${col}`} className={getCorrelationColor(value)}>
                        {formatCorrelation(value)}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          <p>
            <span className="inline-block w-3 h-3 bg-red-100 mr-1"></span> Strong positive correlation (≥ 0.7)
          </p>
          <p>
            <span className="inline-block w-3 h-3 bg-blue-100 mr-1"></span> Strong negative correlation (≤ -0.7)
          </p>
          <p>
            <span className="inline-block w-3 h-3 bg-gray-50 mr-1"></span> Weak or no correlation
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
