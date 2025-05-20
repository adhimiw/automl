"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export interface ColumnSummary {
  name: string
  type: string
  count: number
  missing: number
  unique: number
  min?: number | string
  max?: number | string
  mean?: number
  median?: number
  std?: number
}

export interface DataSummaryProps {
  title?: string
  description?: string
  summary: {
    rowCount: number
    columnCount: number
    columns: ColumnSummary[]
  }
  className?: string
}

export function DataSummary({ title = "Data Summary", description, summary, className }: DataSummaryProps) {
  const { rowCount, columnCount, columns } = summary

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Rows</span>
            <span className="text-2xl font-bold">{rowCount.toLocaleString()}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Columns</span>
            <span className="text-2xl font-bold">{columnCount}</span>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Column</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Missing</TableHead>
                <TableHead>Unique</TableHead>
                <TableHead>Stats</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {columns.map((column) => (
                <TableRow key={column.name}>
                  <TableCell className="font-medium">{column.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{column.type}</Badge>
                  </TableCell>
                  <TableCell>
                    {column.missing > 0 ? (
                      <span className="text-destructive">
                        {column.missing} ({((column.missing / rowCount) * 100).toFixed(1)}%)
                      </span>
                    ) : (
                      "0"
                    )}
                  </TableCell>
                  <TableCell>{column.unique}</TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {column.type === "numeric" ? (
                      <span className="text-xs">
                        min: {column.min}, max: {column.max}, mean: {typeof column.mean === 'number' ? column.mean.toFixed(2) : 'N/A'}
                      </span>
                    ) : (
                      <span className="text-xs">
                        {column.min && column.max ? `${column.min} to ${column.max}` : "N/A"}
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
