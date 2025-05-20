"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { RefreshCw, AlertCircle } from "lucide-react"
import type { ModelMetadata, TrainingResult } from "@/lib/ml/deep-learning/model-types"

interface ModelVisualizerProps {
  modelId: string
  metadata?: ModelMetadata
  trainingResult?: TrainingResult
  isTraining?: boolean
  onRefresh?: () => void
}

export function ModelVisualizer({
  modelId,
  metadata,
  trainingResult,
  isTraining = false,
  onRefresh,
}: ModelVisualizerProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [trainingProgress, setTrainingProgress] = useState(0)
  const [trainingStatus, setTrainingStatus] = useState<"idle" | "training" | "completed" | "failed">("idle")
  const [trainingMetrics, setTrainingMetrics] = useState<any>({})
  const [trainingHistory, setTrainingHistory] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  const trainingInterval = useRef<NodeJS.Timeout | null>(null)

  // Simulate training progress
  useEffect(() => {
    if (isTraining) {
      setTrainingStatus("training")
      setTrainingProgress(0)

      trainingInterval.current = setInterval(() => {
        setTrainingProgress((prev) => {
          const newProgress = prev + Math.random() * 5
          return newProgress >= 100 ? 100 : newProgress
        })
      }, 1000)

      return () => {
        if (trainingInterval.current) {
          clearInterval(trainingInterval.current)
        }
      }
    } else if (trainingResult) {
      setTrainingStatus("completed")
      setTrainingProgress(100)
      setTrainingMetrics(trainingResult.metrics)

      // Convert training history to chart data
      if (trainingResult.history) {
        const history = trainingResult.history
        const epochs = Object.keys(history.loss).length

        const chartData = Array.from({ length: epochs }, (_, i) => ({
          epoch: i + 1,
          loss: history.loss[i],
          accuracy: history.accuracy[i],
          valLoss: history.valLoss?.[i],
          valAccuracy: history.valAccuracy?.[i],
        }))

        setTrainingHistory(chartData)
      }
    }
  }, [isTraining, trainingResult])

  // Clean up interval when component unmounts
  useEffect(() => {
    return () => {
      if (trainingInterval.current) {
        clearInterval(trainingInterval.current)
      }
    }
  }, [])

  // Prepare metrics data for visualization
  const metricsData = trainingMetrics
    ? [
        { name: "Accuracy", value: trainingMetrics.accuracy || 0 },
        { name: "Loss", value: trainingMetrics.loss || 0 },
        { name: "Precision", value: trainingMetrics.precision || 0 },
        { name: "Recall", value: trainingMetrics.recall || 0 },
        { name: "F1 Score", value: trainingMetrics.f1Score || 0 },
      ]
    : []

  // Colors for pie chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{metadata?.name || "Untitled Model"}</CardTitle>
              <CardDescription>{metadata?.description || "No description available"}</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={onRefresh}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
              <Badge>{trainingStatus}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {trainingStatus === "training" && (
            <div className="flex justify-center items-center">
              <Progress value={trainingProgress} className="w-full" />
              <span className="ml-4">{trainingProgress.toFixed(0)}%</span>
            </div>
          )}
          {trainingStatus === "completed" && (
            <div className="space-y-4">
              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="metrics">Metrics</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                  <div className="flex justify-center items-center">
                    <PieChart width={400} height={400}>
                      <Pie
                        data={metricsData}
                        cx={200}
                        cy={200}
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884D8"
                        dataKey="value"
                      >
                        {metricsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </div>
                </TabsContent>
                <TabsContent value="metrics">
                  <div className="grid grid-cols-2 gap-4">
                    {metricsData.map((metric) => (
                      <div key={metric.name} className="flex flex-col space-y-2">
                        <span className="font-bold">{metric.name}</span>
                        <span>{metric.value.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="history">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={trainingHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="epoch" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="loss" stroke="#8884D8" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="accuracy" stroke="#82ca9d" />
                      <Line type="monotone" dataKey="valLoss" stroke="#FFBB28" />
                      <Line type="monotone" dataKey="valAccuracy" stroke="#FF8042" />
                    </LineChart>
                  </ResponsiveContainer>
                </TabsContent>
              </Tabs>
            </div>
          )}
          {trainingStatus === "failed" && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error || "Training failed"}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
