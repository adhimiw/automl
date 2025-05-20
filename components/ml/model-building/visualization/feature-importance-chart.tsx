"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell
} from "recharts"
import { AlertCircle, RefreshCw } from "lucide-react"

interface FeatureImportanceChartProps {
  datasetId: string
  features: string[]
  target: string
  onImportanceCalculated?: (importance: Record<string, number>) => void
}

export function FeatureImportanceChart({ 
  datasetId, 
  features, 
  target,
  onImportanceCalculated 
}: FeatureImportanceChartProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [importance, setImportance] = useState<Record<string, number>>({})
  const [chartData, setChartData] = useState<Array<{ name: string, value: number }>>([])

  // Colors for the bars
  const COLORS = [
    "#8884d8", "#83a6ed", "#8dd1e1", "#82ca9d", "#a4de6c",
    "#d0ed57", "#ffc658", "#ff8042", "#ff6361", "#bc5090"
  ]

  // Calculate feature importance
  const calculateImportance = async () => {
    if (!datasetId || !features.length || !target) return
    
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`/api/ml/feature-importance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          datasetId,
          features,
          target
        })
      })
      
      if (!response.ok) {
        throw new Error("Failed to calculate feature importance")
      }
      
      const data = await response.json()
      setImportance(data.importance || {})
      
      // Call the callback if provided
      if (onImportanceCalculated) {
        onImportanceCalculated(data.importance || {})
      }
    } catch (err) {
      console.error("Error calculating feature importance:", err)
      setError((err as Error).message || "Failed to calculate feature importance")
    } finally {
      setLoading(false)
    }
  }

  // Format data for chart
  useEffect(() => {
    const data = Object.entries(importance)
      .map(([name, value]) => ({ name, value: value as number }))
      .sort((a, b) => b.value - a.value)
    
    setChartData(data)
  }, [importance])

  // Calculate importance when component mounts or when inputs change
  useEffect(() => {
    if (features.length > 0 && target) {
      calculateImportance()
    }
  }, [datasetId, features.join(","), target])

  // If no data is available yet
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-2"></div>
          <p className="text-sm text-muted-foreground">Calculating feature importance...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (chartData.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">No feature importance data available</p>
          <Button onClick={calculateImportance}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Calculate Importance
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" domain={[0, 'dataMax']} />
          <YAxis 
            type="category" 
            dataKey="name" 
            width={120}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            formatter={(value: number) => [`${(value * 100).toFixed(2)}%`, 'Importance']}
          />
          <Legend />
          <Bar dataKey="value" name="Importance" fill="#8884d8">
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
