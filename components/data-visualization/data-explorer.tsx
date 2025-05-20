"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BarChart2, Table, FileText, Filter, RefreshCw, Download, Search, X } from "lucide-react"
import { EnhancedDataGrid } from "./enhanced-data-grid"
import { InteractiveChart } from "./interactive-chart"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { toast } from "@/components/ui/use-toast"

interface Column {
  key: string
  label: string
  type: "string" | "number" | "date" | "boolean"
  sortable?: boolean
  filterable?: boolean
  visible?: boolean
  width?: string
  render?: (value: any, row: Record<string, any>) => React.ReactNode
}

interface DataExplorerProps {
  title: string
  description?: string
  data: Record<string, any>[]
  columns: Column[]
  onRefresh?: () => void
  onExport?: (format: string) => void
  isLoading?: boolean
  className?: string
}

export function DataExplorer({
  title,
  description,
  data,
  columns,
  onRefresh,
  onExport,
  isLoading = false,
  className = "",
}: DataExplorerProps) {
  const [activeTab, setActiveTab] = useState("table")
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState<Record<string, any>>({})
  const [filteredData, setFilteredData] = useState<Record<string, any>[]>(data)
  const [selectedRows, setSelectedRows] = useState<Record<string, any>[]>([])
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    columns.filter((col) => col.visible !== false).map((col) => col.key),
  )
  const [chartConfig, setChartConfig] = useState({
    xAxis: columns.find((col) => col.type === "string")?.key || columns[0].key,
    yAxis: columns.find((col) => col.type === "number")?.key || columns[0].key,
    chartType: "bar" as "bar" | "line" | "pie" | "scatter",
    groupBy: "",
    aggregation: "sum" as "sum" | "avg" | "count" | "min" | "max",
  })
  const [summaryStats, setSummaryStats] = useState<Record<string, any>>({})
  const [showFilters, setShowFilters] = useState(false)

  // Apply filters and search when data or filters change
  useEffect(() => {
    let result = [...data]

    // Apply search
    if (searchTerm) {
      result = result.filter((row) =>
        Object.entries(row).some(([key, value]) => {
          const column = columns.find((col) => col.key === key)
          if (!column || !visibleColumns.includes(key)) return false
          return String(value).toLowerCase().includes(searchTerm.toLowerCase())
        }),
      )
    }

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== "all") {
        result = result.filter((row) => String(row[key]).includes(String(value)))
      }
    })

    setFilteredData(result)
  }, [data, searchTerm, filters, visibleColumns, columns])

  // Calculate summary statistics when filtered data changes
  useEffect(() => {
    const stats: Record<string, any> = {}

    columns.forEach((column) => {
      if (column.type === "number") {
        const values = filteredData.map((row) => row[column.key]).filter((val) => val !== null && val !== undefined)

        if (values.length > 0) {
          const sum = values.reduce((a, b) => a + b, 0)
          const avg = sum / values.length
          const min = Math.min(...values)
          const max = Math.max(...values)

          // Calculate median
          const sorted = [...values].sort((a, b) => a - b)
          const middle = Math.floor(sorted.length / 2)
          const median = sorted.length % 2 === 0 ? (sorted[middle - 1] + sorted[middle]) / 2 : sorted[middle]

          stats[column.key] = {
            count: values.length,
            sum,
            avg,
            min,
            max,
            median,
          }
        }
      } else if (column.type === "string" || column.type === "boolean") {
        const valueMap: Record<string, number> = {}

        filteredData.forEach((row) => {
          const value = String(row[column.key])
          valueMap[value] = (valueMap[value] || 0) + 1
        })

        stats[column.key] = {
          uniqueValues: Object.keys(valueMap).length,
          mostCommon: Object.entries(valueMap).sort((a, b) => b[1] - a[1])[0]?.[0],
          valueDistribution: valueMap,
        }
      }
    })

    setSummaryStats(stats)
  }, [filteredData, columns])

  const handleToggleColumnVisibility = (columnKey: string) => {
    setVisibleColumns((prev) =>
      prev.includes(columnKey) ? prev.filter((key) => key !== columnKey) : [...prev, columnKey],
    )
  }

  const handleAddFilter = (columnKey: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [columnKey]: value,
    }))
  }

  const handleRemoveFilter = (columnKey: string) => {
    setFilters((prev) => {
      const newFilters = { ...prev }
      delete newFilters[columnKey]
      return newFilters
    })
  }

  const handleClearFilters = () => {
    setFilters({})
    setSearchTerm("")
  }

  const handleExport = (format: string) => {
    if (onExport) {
      onExport(format)
      return
    }

    // Default export implementation
    if (format === "csv") {
      const visibleCols = columns.filter((col) => visibleColumns.includes(col.key))
      const headers = visibleCols.map((col) => col.label).join(",")
      const rows = filteredData
        .map((row) => visibleCols.map((col) => `"${String(row[col.key]).replace(/"/g, '""')}"`).join(","))
        .join("\n")

      const csvContent = `${headers}\n${rows}`
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", `${title.toLowerCase().replace(/\s+/g, "-")}.csv`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } else if (format === "json") {
      const visibleCols = columns.filter((col) => visibleColumns.includes(col.key))
      const filteredDataWithVisibleColumns = filteredData.map((row) => {
        const filteredRow: Record<string, any> = {}
        visibleCols.forEach((col) => {
          filteredRow[col.key] = row[col.key]
        })
        return filteredRow
      })

      const jsonContent = JSON.stringify(filteredDataWithVisibleColumns, null, 2)
      const blob = new Blob([jsonContent], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", `${title.toLowerCase().replace(/\s+/g, "-")}.json`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }

    toast({
      title: "Export Complete",
      description: `Data exported as ${format.toUpperCase()}`,
    })
  }

  // Prepare chart data based on configuration
  const prepareChartData = () => {
    const { xAxis, yAxis, groupBy, aggregation } = chartConfig

    if (!groupBy) {
      // Simple chart without grouping
      return {
        labels: filteredData.map((row) => String(row[xAxis])),
        datasets: [
          {
            label: columns.find((col) => col.key === yAxis)?.label || yAxis,
            data: filteredData.map((row) => row[yAxis]),
          },
        ],
      }
    } else {
      // Grouped chart
      const groupedData: Record<string, Record<string, number[]>> = {}

      // Group data
      filteredData.forEach((row) => {
        const xValue = String(row[xAxis])
        const groupValue = String(row[groupBy])

        if (!groupedData[xValue]) {
          groupedData[xValue] = {}
        }

        if (!groupedData[xValue][groupValue]) {
          groupedData[xValue][groupValue] = []
        }

        groupedData[xValue][groupValue].push(row[yAxis])
      })

      // Get unique group values
      const groupValues = Array.from(new Set(filteredData.map((row) => String(row[groupBy]))))

      // Prepare datasets
      const datasets = groupValues.map((groupValue) => {
        const data = Object.keys(groupedData).map((xValue) => {
          const values = groupedData[xValue][groupValue] || []

          if (values.length === 0) return 0

          switch (aggregation) {
            case "sum":
              return values.reduce((a, b) => a + b, 0)
            case "avg":
              return values.reduce((a, b) => a + b, 0) / values.length
            case "count":
              return values.length
            case "min":
              return Math.min(...values)
            case "max":
              return Math.max(...values)
            default:
              return values.reduce((a, b) => a + b, 0)
          }
        })

        return {
          label: `${groupValue} (${aggregation})`,
          data,
        }
      })

      return {
        labels: Object.keys(groupedData),
        datasets,
      }
    }
  }

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          <div className="flex items-center gap-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="table">
                  <Table className="h-4 w-4 mr-1" />
                  Table
                </TabsTrigger>
                <TabsTrigger value="charts">
                  <BarChart2 className="h-4 w-4 mr-1" />
                  Charts
                </TabsTrigger>
                <TabsTrigger value="summary">
                  <FileText className="h-4 w-4 mr-1" />
                  Summary
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-4 border-b flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex-1 flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Button
              variant={showFilters ? "default" : "outline"}
              onClick={() => setShowFilters(!showFilters)}
              className="sm:w-auto w-full"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters {Object.keys(filters).length > 0 && `(${Object.keys(filters).length})`}
            </Button>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleClearFilters} className="sm:w-auto w-full">
              <X className="mr-2 h-4 w-4" />
              Clear Filters
            </Button>
            <Button onClick={() => onRefresh?.()} className="sm:w-auto w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button onClick={() => handleExport("csv")} className="sm:w-auto w-full">
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
            <Button onClick={() => handleExport("json")} className="sm:w-auto w-full">
              <Download className="mr-2 h-4 w-4" />
              Export JSON
            </Button>
          </div>
        </div>
      </CardContent>
      {showFilters && (
        <Collapsible open={showFilters} onOpenChange={setShowFilters}>
          <CollapsibleTrigger className="p-4 border-b">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4">{/* Filter UI implementation here */}</CollapsibleContent>
        </Collapsible>
      )}
      <TabsContent value="table">
        <EnhancedDataGrid
          data={filteredData}
          columns={columns.filter((col) => visibleColumns.includes(col.key))}
          selectedRows={selectedRows}
          onRowSelect={setSelectedRows}
        />
      </TabsContent>
      <TabsContent value="charts">
        <InteractiveChart data={prepareChartData()} config={chartConfig} />
      </TabsContent>
      <TabsContent value="summary">
        <ScrollArea className="p-4">
          {Object.entries(summaryStats).map(([key, stats]) => (
            <div key={key} className="mb-4">
              <h3 className="text-lg font-bold">{columns.find((col) => col.key === key)?.label || key}</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                {stats.count !== undefined && <Badge variant="outline">Count: {stats.count}</Badge>}
                {stats.sum !== undefined && <Badge variant="outline">Sum: {stats.sum}</Badge>}
                {stats.avg !== undefined && <Badge variant="outline">Avg: {stats.avg.toFixed(2)}</Badge>}
                {stats.min !== undefined && <Badge variant="outline">Min: {stats.min}</Badge>}
                {stats.max !== undefined && <Badge variant="outline">Max: {stats.max}</Badge>}
                {stats.median !== undefined && <Badge variant="outline">Median: {stats.median.toFixed(2)}</Badge>}
                {stats.uniqueValues !== undefined && (
                  <Badge variant="outline">Unique Values: {stats.uniqueValues}</Badge>
                )}
                {stats.mostCommon !== undefined && <Badge variant="outline">Most Common: {stats.mostCommon}</Badge>}
              </div>
            </div>
          ))}
        </ScrollArea>
      </TabsContent>
    </Card>
  )
}
