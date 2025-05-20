"use client"

import { useState, type ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LucideDownload,
  LucideMaximize2,
  LucideBarChart,
  LucideLineChart,
  LucidePieChart,
  LucideScatterChart,
  LucideRadar,
  LucideSettings,
  LucideRefreshCw,
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ChartContainerProps {
  title: string
  description?: string
  children: ReactNode
  downloadUrl?: string
  chartTypes?: ("bar" | "line" | "pie" | "scatter" | "radar" | "doughnut" | "polarArea")[]
  onChartTypeChange?: (type: string) => void
  onRefresh?: () => void
  onExport?: (format: "png" | "jpg" | "svg" | "csv" | "json") => void
  isLoading?: boolean
  className?: string
}

export function ChartContainer({
  title,
  description,
  children,
  downloadUrl,
  chartTypes,
  onChartTypeChange,
  onRefresh,
  onExport,
  isLoading = false,
  className = "",
}: ChartContainerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  const handleDownload = () => {
    if (downloadUrl) {
      window.open(downloadUrl, "_blank")
    }
  }

  const renderChartTypeIcon = (type: string) => {
    switch (type) {
      case "bar":
        return <LucideBarChart className="h-4 w-4" />
      case "line":
        return <LucideLineChart className="h-4 w-4" />
      case "pie":
      case "doughnut":
      case "polarArea":
        return <LucidePieChart className="h-4 w-4" />
      case "scatter":
        return <LucideScatterChart className="h-4 w-4" />
      case "radar":
        return <LucideRadar className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        <div className="flex items-center space-x-2">
          {chartTypes && chartTypes.length > 0 && (
            <Tabs defaultValue={chartTypes[0]} onValueChange={onChartTypeChange}>
              <TabsList>
                {chartTypes.map((type) => (
                  <TabsTrigger key={type} value={type} title={type.charAt(0).toUpperCase() + type.slice(1)}>
                    {renderChartTypeIcon(type)}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          )}

          {onRefresh && (
            <Button variant="outline" size="icon" onClick={onRefresh} disabled={isLoading}>
              <LucideRefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            </Button>
          )}

          {(downloadUrl || onExport) && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <LucideDownload className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Export Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {downloadUrl && <DropdownMenuItem onClick={handleDownload}>Download Data</DropdownMenuItem>}
                {onExport && (
                  <>
                    <DropdownMenuItem onClick={() => onExport("png")}>Export as PNG</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onExport("jpg")}>Export as JPG</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onExport("svg")}>Export as SVG</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onExport("csv")}>Export as CSV</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onExport("json")}>Export as JSON</DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <LucideMaximize2 className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
              </DialogHeader>
              <div className="h-[500px]">{children}</div>
            </DialogContent>
          </Dialog>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <LucideSettings className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Chart Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Edit Colors</DropdownMenuItem>
              <DropdownMenuItem>Change Scale</DropdownMenuItem>
              <DropdownMenuItem>Toggle Legend</DropdownMenuItem>
              <DropdownMenuItem>Toggle Grid Lines</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
