"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, RefreshCw, Maximize2, Settings, Eye, EyeOff, ChevronDown, RotateCw } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { toast } from "@/components/ui/use-toast"

// Chart.js imports
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Filler,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
  type ChartType,
  type ScriptableContext,
} from "chart.js"
import { Chart } from "react-chartjs-2"
import zoomPlugin from "chartjs-plugin-zoom"

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Filler,
  Tooltip,
  Legend,
  zoomPlugin,
)

// Color palette options
const COLOR_PALETTES = {
  default: ["#4361ee", "#3a0ca3", "#7209b7", "#f72585", "#4cc9f0"],
  pastel: ["#ffadad", "#ffd6a5", "#fdffb6", "#caffbf", "#9bf6ff", "#a0c4ff", "#bdb2ff", "#ffc6ff"],
  vibrant: ["#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93"],
  monochrome: [
    "#d9ed92",
    "#b5e48c",
    "#99d98c",
    "#76c893",
    "#52b69a",
    "#34a0a4",
    "#168aad",
    "#1a759f",
    "#1e6091",
    "#184e77",
  ],
  dark: ["#0d1b2a", "#1b263b", "#415a77", "#778da9", "#e0e1dd"],
}

interface Dataset {
  label: string
  data: number[]
  backgroundColor?: string | string[] | ((context: ScriptableContext<ChartType>) => string)
  borderColor?: string | string[]
  borderWidth?: number
  fill?: boolean
  tension?: number
  pointRadius?: number
  hidden?: boolean
  [key: string]: any
}

interface InteractiveChartProps {
  title: string
  description?: string
  type?: ChartType
  data: {
    labels: string[]
    datasets: Dataset[]
  }
  options?: ChartOptions<ChartType>
  height?: number
  width?: string
  allowedChartTypes?: ChartType[]
  onExport?: (format: string) => void
  onRefresh?: () => void
  isLoading?: boolean
  className?: string
}

export function InteractiveChart({
  title,
  description,
  type = "bar",
  data,
  options,
  height = 300,
  width = "100%",
  allowedChartTypes = ["bar", "line", "pie", "radar", "scatter", "doughnut", "polarArea"],
  onExport,
  onRefresh,
  isLoading = false,
  className = "",
}: InteractiveChartProps) {
  const [chartType, setChartType] = useState<ChartType>(type)
  const [chartData, setChartData] = useState<ChartData<ChartType>>(data)
  const [showSettings, setShowSettings] = useState(false)
  const [colorPalette, setColorPalette] = useState<keyof typeof COLOR_PALETTES>("default")
  const [showLegend, setShowLegend] = useState(true)
  const [legendPosition, setLegendPosition] = useState<"top" | "bottom" | "left" | "right">("top")
  const [enableZoom, setEnableZoom] = useState(false)
  const [enableAnimation, setEnableAnimation] = useState(true)
  const [datasetVisibility, setDatasetVisibility] = useState<boolean[]>(data.datasets.map(() => true))
  const [chartTitle, setChartTitle] = useState(title)
  const [chartDescription, setChartDescription] = useState(description || "")
  const [isFullscreen, setIsFullscreen] = useState(false)

  const chartRef = useRef<ChartJS<ChartType>>(null)

  // Update chart data when props change
  useEffect(() => {
    // Apply color palette to datasets
    const colors = COLOR_PALETTES[colorPalette]
    const updatedDatasets = data.datasets.map((dataset, index) => {
      const color = colors[index % colors.length]

      return {
        ...dataset,
        backgroundColor:
          chartType === "line"
            ? `${color}33`
            : // Add transparency for line charts
              color,
        borderColor: color,
        hidden: !datasetVisibility[index],
      }
    })

    setChartData({
      labels: data.labels,
      datasets: updatedDatasets,
    })
  }, [data, colorPalette, chartType, datasetVisibility])

  // Reset zoom when chart type changes
  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.resetZoom()
    }
  }, [chartType])

  const handleChartTypeChange = (value: string) => {
    setChartType(value as ChartType)
  }

  const handleResetZoom = () => {
    if (chartRef.current) {
      chartRef.current.resetZoom()
    }
  }

  const handleExport = (format: string) => {
    if (onExport) {
      onExport(format)
      return
    }

    // Default export implementation
    if (chartRef.current) {
      if (format === "png" || format === "jpg") {
        const link = document.createElement("a")
        link.download = `${title.toLowerCase().replace(/\s+/g, "-")}.${format}`
        link.href = chartRef.current.toBase64Image(format)
        link.click()
      } else if (format === "csv") {
        // Export data as CSV
        const csvContent = [
          // Header row with labels
          ["", ...data.labels].join(","),
          // Data rows
          ...data.datasets.map((dataset) => [dataset.label, ...dataset.data].join(",")),
        ].join("\n")

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
        const link = document.createElement("a")
        link.href = URL.createObjectURL(blob)
        link.download = `${title.toLowerCase().replace(/\s+/g, "-")}.csv`
        link.click()
      } else if (format === "json") {
        // Export data as JSON
        const jsonData = {
          title,
          description,
          labels: data.labels,
          datasets: data.datasets.map((dataset) => ({
            label: dataset.label,
            data: dataset.data,
          })),
        }

        const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: "application/json" })
        const link = document.createElement("a")
        link.href = URL.createObjectURL(blob)
        link.download = `${title.toLowerCase().replace(/\s+/g, "-")}.json`
        link.click()
      }

      toast({
        title: "Export Complete",
        description: `Chart exported as ${format.toUpperCase()}`,
      })
    }
  }

  const toggleDatasetVisibility = (index: number) => {
    const newVisibility = [...datasetVisibility]
    newVisibility[index] = !newVisibility[index]
    setDatasetVisibility(newVisibility)
  }

  const chartOptions: ChartOptions<ChartType> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: enableAnimation ? 1000 : 0,
    },
    plugins: {
      legend: {
        display: showLegend,
        position: legendPosition,
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
      zoom: {
        pan: {
          enabled: enableZoom,
          mode: "xy",
        },
        zoom: {
          wheel: {
            enabled: enableZoom,
          },
          pinch: {
            enabled: enableZoom,
          },
          mode: "xy",
        },
      },
      title: {
        display: true,
        text: chartTitle,
        font: {
          size: 16,
          weight: "bold",
        },
      },
      subtitle: {
        display: !!chartDescription,
        text: chartDescription,
        font: {
          size: 14,
          weight: "normal",
        },
        padding: {
          bottom: 10,
        },
      },
    },
    scales:
      chartType !== "pie" && chartType !== "doughnut" && chartType !== "radar" && chartType !== "polarArea"
        ? {
            y: {
              beginAtZero: true,
            },
          }
        : undefined,
    ...options,
  }

  const renderChartTypeIcon = (type: string) => {
    switch (type) {
      case "bar":
        return (
          <div className="w-4 h-4 flex items-end justify-center">
            <div className="w-1 h-3 bg-current rounded-sm"></div>
            <div className="w-1 h-2 bg-current rounded-sm mx-0.5"></div>
            <div className="w-1 h-4 bg-current rounded-sm"></div>
          </div>
        )
      case "line":
        return (
          <div className="w-4 h-4 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2 12L6 7L10 9L14 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )
      case "pie":
      case "doughnut":
        return (
          <div className="w-4 h-4 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path d="M8 2V8H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        )
      case "radar":
        return (
          <div className="w-4 h-4 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8 2L10 8L14 8L11 11L12 14L8 12L4 14L5 11L2 8L6 8L8 2Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )
      case "scatter":
        return (
          <div className="w-4 h-4 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="4" cy="12" r="1.5" fill="currentColor" />
              <circle cx="8" cy="7" r="1.5" fill="currentColor" />
              <circle cx="12" cy="10" r="1.5" fill="currentColor" />
              <circle cx="6" cy="4" r="1.5" fill="currentColor" />
              <circle cx="14" cy="5" r="1.5" fill="currentColor" />
            </svg>
          </div>
        )
      case "polarArea":
        return (
          <div className="w-4 h-4 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path d="M8 8L8 2" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 8L14 8" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 8L11 11" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
        )
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
          {allowedChartTypes && allowedChartTypes.length > 0 && (
            <Tabs value={chartType} onValueChange={handleChartTypeChange}>
              <TabsList>
                {allowedChartTypes.map((type) => (
                  <TabsTrigger key={type} value={type} title={type.charAt(0).toUpperCase() + type.slice(1)}>
                    {renderChartTypeIcon(type)}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          )}

          {enableZoom && (
            <Button variant="outline" size="icon" onClick={handleResetZoom} title="Reset Zoom">
              <RotateCw className="h-4 w-4" />
            </Button>
          )}

          {onRefresh && (
            <Button variant="outline" size="icon" onClick={onRefresh} disabled={isLoading} title="Refresh Data">
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            </Button>
          )}

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" title="Export Options">
                <Download className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-56">
              <div className="grid gap-2">
                <h4 className="font-medium">Export Options</h4>
                <Separator />
                <Button variant="outline" size="sm" onClick={() => handleExport("png")}>
                  Export as PNG
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleExport("jpg")}>
                  Export as JPG
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleExport("csv")}>
                  Export as CSV
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleExport("json")}>
                  Export as JSON
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" title="Fullscreen">
                <Maximize2 className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
              </DialogHeader>
              <div className="h-[600px]">
                <Chart ref={chartRef} type={chartType} data={chartData} options={chartOptions} />
              </div>
            </DialogContent>
          </Dialog>

          <Button
            variant={showSettings ? "default" : "outline"}
            size="icon"
            onClick={() => setShowSettings(!showSettings)}
            title="Chart Settings"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex">
          {showSettings && (
            <div className="w-64 border-r p-4">
              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-4">
                  <h4 className="font-medium text-sm">Chart Settings</h4>

                  <div className="space-y-2">
                    <Label htmlFor="chart-title">Title</Label>
                    <Input id="chart-title" value={chartTitle} onChange={(e) => setChartTitle(e.target.value)} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="chart-description">Description</Label>
                    <Input
                      id="chart-description"
                      value={chartDescription}
                      onChange={(e) => setChartDescription(e.target.value)}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="color-palette">Color Palette</Label>
                    <Select
                      value={colorPalette}
                      onValueChange={(value) => setColorPalette(value as keyof typeof COLOR_PALETTES)}
                    >
                      <SelectTrigger id="color-palette">
                        <SelectValue placeholder="Select color palette" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="pastel">Pastel</SelectItem>
                        <SelectItem value="vibrant">Vibrant</SelectItem>
                        <SelectItem value="monochrome">Monochrome</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="show-legend" checked={showLegend} onCheckedChange={setShowLegend} />
                    <Label htmlFor="show-legend">Show Legend</Label>
                  </div>

                  {showLegend && (
                    <div className="space-y-2">
                      <Label htmlFor="legend-position">Legend Position</Label>
                      <Select
                        value={legendPosition}
                        onValueChange={(value) => setLegendPosition(value as "top" | "bottom" | "left" | "right")}
                      >
                        <SelectTrigger id="legend-position">
                          <SelectValue placeholder="Select position" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="top">Top</SelectItem>
                          <SelectItem value="bottom">Bottom</SelectItem>
                          <SelectItem value="left">Left</SelectItem>
                          <SelectItem value="right">Right</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <Switch id="enable-zoom" checked={enableZoom} onCheckedChange={setEnableZoom} />
                    <Label htmlFor="enable-zoom">Enable Zoom & Pan</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="enable-animation" checked={enableAnimation} onCheckedChange={setEnableAnimation} />
                    <Label htmlFor="enable-animation">Enable Animation</Label>
                  </div>

                  <Separator />

                  <Collapsible>
                    <CollapsibleTrigger className="flex items-center justify-between w-full">
                      <span className="font-medium text-sm">Datasets</span>
                      <ChevronDown className="h-4 w-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2 space-y-2">
                      {data.datasets.map((dataset, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => toggleDatasetVisibility(index)}
                          >
                            {datasetVisibility[index] ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                          </Button>
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{
                              backgroundColor: Array.isArray(dataset.borderColor)
                                ? dataset.borderColor[0]
                                : dataset.borderColor,
                            }}
                          />
                          <span
                            className={`text-sm ${!datasetVisibility[index] ? "text-muted-foreground line-through" : ""}`}
                          >
                            {dataset.label}
                          </span>
                        </div>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              </ScrollArea>
            </div>
          )}
          <div className={`${showSettings ? "flex-1" : "w-full"} h-[300px] p-4`}>
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <RefreshCw className="mx-auto h-8 w-8 animate-spin text-primary" />
                  <p className="mt-2 text-sm text-muted-foreground">Loading chart data...</p>
                </div>
              </div>
            ) : (
              <Chart ref={chartRef} type={chartType} data={chartData} options={chartOptions} />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
