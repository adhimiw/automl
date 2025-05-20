"use client"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Download, RefreshCw } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface VisualizationToolbarProps {
  chartType: string
  onChartTypeChange: (type: string) => void
  onExport: (format: string) => void
  onRefresh: () => void
  columns: string[]
  xAxis: string
  onXAxisChange: (column: string) => void
  yAxis: string
  onYAxisChange: (column: string) => void
  isLoading?: boolean
}

export function VisualizationToolbar({
  chartType,
  onChartTypeChange,
  onExport,
  onRefresh,
  columns,
  xAxis,
  onXAxisChange,
  yAxis,
  onYAxisChange,
  isLoading = false,
}: VisualizationToolbarProps) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-gray-50 rounded-lg mb-4 gap-4">
      <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
        <div className="w-full md:w-40">
          <Label htmlFor="chart-type">Chart Type</Label>
          <Select value={chartType} onValueChange={onChartTypeChange}>
            <SelectTrigger id="chart-type">
              <SelectValue placeholder="Select chart type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bar">Bar Chart</SelectItem>
              <SelectItem value="line">Line Chart</SelectItem>
              <SelectItem value="pie">Pie Chart</SelectItem>
              <SelectItem value="scatter">Scatter Plot</SelectItem>
              <SelectItem value="radar">Radar Chart</SelectItem>
              <SelectItem value="table">Data Table</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full md:w-40">
          <Label htmlFor="x-axis">X Axis</Label>
          <Select value={xAxis} onValueChange={onXAxisChange}>
            <SelectTrigger id="x-axis">
              <SelectValue placeholder="Select X axis" />
            </SelectTrigger>
            <SelectContent>
              {columns.map((column) => (
                <SelectItem key={column} value={column}>
                  {column}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full md:w-40">
          <Label htmlFor="y-axis">Y Axis</Label>
          <Select value={yAxis} onValueChange={onYAxisChange}>
            <SelectTrigger id="y-axis">
              <SelectValue placeholder="Select Y axis" />
            </SelectTrigger>
            <SelectContent>
              {columns.map((column) => (
                <SelectItem key={column} value={column}>
                  {column}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-2 w-full md:w-auto justify-end">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" onClick={onRefresh} disabled={isLoading}>
                <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Refresh data</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" onClick={() => onExport("png")}>
                <Download className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Export as PNG</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Select onValueChange={onExport}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Export as..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="png">PNG Image</SelectItem>
            <SelectItem value="jpg">JPG Image</SelectItem>
            <SelectItem value="svg">SVG Vector</SelectItem>
            <SelectItem value="csv">CSV Data</SelectItem>
            <SelectItem value="json">JSON Data</SelectItem>
            <SelectItem value="excel">Excel</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
