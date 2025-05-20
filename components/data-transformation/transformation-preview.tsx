"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LucideCheck, LucideX, LucideLoader2 } from "lucide-react"
import { DataGrid } from "@/components/data-visualization/data-grid"

interface TransformationStep {
  id: string
  type: string
  config: Record<string, any>
}

interface Column {
  key: string
  label: string
  type: string
  sortable?: boolean
  filterable?: boolean
}

interface TransformationPreviewProps {
  originalData: Record<string, any>[]
  originalColumns: Column[]
  transformationSteps: TransformationStep[]
  onApply: () => void
  onCancel: () => void
}

export function TransformationPreview({
  originalData,
  originalColumns,
  transformationSteps,
  onApply,
  onCancel,
}: TransformationPreviewProps) {
  const [transformedData, setTransformedData] = useState<Record<string, any>[]>([])
  const [transformedColumns, setTransformedColumns] = useState<Column[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Apply transformations to preview the result
  useEffect(() => {
    const applyTransformations = async () => {
      setLoading(true)
      setError(null)

      try {
        // In a real app, this would be an API call to apply transformations
        // For demo purposes, we'll simulate the transformation process

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Start with original data
        let data = [...originalData]
        let columns = [...originalColumns]

        // Apply each transformation step
        for (const step of transformationSteps) {
          switch (step.type) {
            case "filter":
              data = applyFilter(data, step.config)
              break
            case "sort":
              data = applySort(data, step.config)
              break
            case "rename":
              const result = applyRename(data, columns, step.config)
              data = result.data
              columns = result.columns
              break
            case "calculate":
              const calcResult = applyCalculate(data, columns, step.config)
              data = calcResult.data
              columns = calcResult.columns
              break
            // Other transformation types would be implemented here
          }
        }

        setTransformedData(data)
        setTransformedColumns(columns)
        setLoading(false)
      } catch (err) {
        console.error("Error applying transformations:", err)
        setError("Failed to apply transformations")
        setLoading(false)
      }
    }

    applyTransformations()
  }, [originalData, originalColumns, transformationSteps])

  // Filter transformation
  const applyFilter = (data: Record<string, any>[], config: any) => {
    const { column, operator, value } = config

    return data.filter((row) => {
      const cellValue = row[column]

      switch (operator) {
        case "=":
          return cellValue == value
        case "!=":
          return cellValue != value
        case ">":
          return cellValue > value
        case ">=":
          return cellValue >= value
        case "<":
          return cellValue < value
        case "<=":
          return cellValue <= value
        case "contains":
          return String(cellValue).includes(value)
        case "starts_with":
          return String(cellValue).startsWith(value)
        case "ends_with":
          return String(cellValue).endsWith(value)
        default:
          return true
      }
    })
  }

  // Sort transformation
  const applySort = (data: Record<string, any>[], config: any) => {
    const { column, direction } = config

    return [...data].sort((a, b) => {
      if (a[column] < b[column]) return direction === "asc" ? -1 : 1
      if (a[column] > b[column]) return direction === "asc" ? 1 : -1
      return 0
    })
  }

  // Rename transformation
  const applyRename = (data: Record<string, any>[], columns: Column[], config: any) => {
    const { column, newName } = config

    // Create new data with renamed column
    const newData = data.map((row) => {
      const newRow = { ...row }
      newRow[newName] = row[column]
      if (newName !== column) {
        delete newRow[column]
      }
      return newRow
    })

    // Update columns
    const newColumns = columns.map((col) => {
      if (col.key === column) {
        return { ...col, key: newName, label: newName }
      }
      return col
    })

    return { data: newData, columns: newColumns }
  }

  // Calculate transformation
  const applyCalculate = (data: Record<string, any>[], columns: Column[], config: any) => {
    const { name, formula } = config

    // Create a safe evaluation function
    const evaluateFormula = (row: Record<string, any>, formula: string) => {
      // Replace column names with their values
      let expression = formula
      for (const col of columns) {
        const regex = new RegExp(`\\b${col.key}\\b`, "g")
        expression = expression.replace(regex, `row["${col.key}"]`)
      }

      // Evaluate the expression
      try {
        // eslint-disable-next-line no-new-func
        return Function("row", `return ${expression}`)(row)
      } catch (error) {
        console.error("Error evaluating formula:", error)
        return null
      }
    }

    // Add calculated column to data
    const newData = data.map((row) => ({
      ...row,
      [name]: evaluateFormula(row, formula),
    }))

    // Add new column to columns
    const newColumns = [
      ...columns,
      {
        key: name,
        label: name,
        type: "number",
        sortable: true,
      },
    ]

    return { data: newData, columns: newColumns }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Transformation Preview</CardTitle>
          <CardDescription>Applying transformations...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12">
            <LucideLoader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="mt-4 text-muted-foreground">Processing your transformations</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-destructive">Error</CardTitle>
          <CardDescription>Failed to apply transformations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8">
            <LucideX className="h-12 w-12 text-destructive" />
            <p className="mt-4">{error}</p>
            <Button className="mt-6" onClick={onCancel}>
              Back to Editor
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>Transformation Preview</CardTitle>
            <CardDescription>
              Preview of data after applying {transformationSteps.length} transformation steps
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{transformedData.length} rows</Badge>
            <Badge variant="outline">{transformedColumns.length} columns</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="transformed">
          <TabsList>
            <TabsTrigger value="transformed">Transformed Data</TabsTrigger>
            <TabsTrigger value="original">Original Data</TabsTrigger>
          </TabsList>
          <TabsContent value="transformed" className="pt-4">
            <DataGrid columns={transformedColumns} data={transformedData} exportOptions={{ csv: true, json: true }} />
          </TabsContent>
          <TabsContent value="original" className="pt-4">
            <DataGrid columns={originalColumns} data={originalData} exportOptions={{ csv: true, json: true }} />
          </TabsContent>
        </Tabs>

        <div className="flex justify-between">
          <Button variant="outline" onClick={onCancel}>
            Back to Editor
          </Button>
          <Button onClick={onApply}>
            <LucideCheck className="mr-2 h-4 w-4" />
            Apply Transformations
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
