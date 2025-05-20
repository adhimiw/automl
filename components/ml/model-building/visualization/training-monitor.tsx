"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts"
import { 
  Activity,
  Terminal,
  BarChart2,
  AlertCircle,
  CheckCircle
} from "lucide-react"

interface TrainingMonitorProps {
  status: "not-started" | "in-progress" | "completed" | "failed"
  progress: number
  metrics?: Record<string, any>
  logs?: string[]
}

export function TrainingMonitor({ status, progress, metrics, logs }: TrainingMonitorProps) {
  const [activeTab, setActiveTab] = useState("metrics")
  const [chartData, setChartData] = useState<any[]>([])
  
  // Format metrics for chart display
  useEffect(() => {
    if (metrics?.history) {
      const history = metrics.history
      const epochs = Object.keys(history.loss || {}).length
      
      if (epochs > 0) {
        const data = Array.from({ length: epochs }, (_, i) => ({
          epoch: i + 1,
          loss: history.loss?.[i],
          val_loss: history.val_loss?.[i],
          accuracy: history.accuracy?.[i],
          val_accuracy: history.val_accuracy?.[i],
        }))
        
        setChartData(data)
      }
    }
  }, [metrics])
  
  // Get status badge color
  const getStatusColor = () => {
    switch (status) {
      case "in-progress": return "bg-blue-100 text-blue-800"
      case "completed": return "bg-green-100 text-green-800"
      case "failed": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }
  
  // Get status icon
  const getStatusIcon = () => {
    switch (status) {
      case "in-progress": return <Activity className="h-4 w-4" />
      case "completed": return <CheckCircle className="h-4 w-4" />
      case "failed": return <AlertCircle className="h-4 w-4" />
      default: return null
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Training Monitor</CardTitle>
          <Badge className={getStatusColor()} variant="outline">
            <span className="flex items-center gap-1">
              {getStatusIcon()}
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="metrics" className="flex items-center">
              <BarChart2 className="h-4 w-4 mr-2" />
              Metrics
            </TabsTrigger>
            <TabsTrigger value="logs" className="flex items-center">
              <Terminal className="h-4 w-4 mr-2" />
              Logs
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="metrics" className="pt-4">
            {metrics ? (
              <div className="space-y-6">
                {/* Current Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(metrics)
                    .filter(([key]) => !key.includes('history') && typeof metrics[key] !== 'object')
                    .map(([key, value]) => (
                      <Card key={key} className="bg-muted/50">
                        <CardContent className="p-4">
                          <div className="text-sm font-medium text-muted-foreground mb-1">
                            {key.replace(/_/g, ' ').toUpperCase()}
                          </div>
                          <div className="text-2xl font-bold">
                            {typeof value === 'number' ? value.toFixed(4) : value}
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  }
                </div>
                
                {/* Training History Chart */}
                {chartData.length > 0 && (
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={chartData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="epoch" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="loss" 
                          stroke="#8884d8" 
                          name="Training Loss"
                          activeDot={{ r: 8 }} 
                        />
                        {chartData[0]?.val_loss !== undefined && (
                          <Line 
                            type="monotone" 
                            dataKey="val_loss" 
                            stroke="#82ca9d" 
                            name="Validation Loss" 
                          />
                        )}
                        {chartData[0]?.accuracy !== undefined && (
                          <Line 
                            type="monotone" 
                            dataKey="accuracy" 
                            stroke="#ffc658" 
                            name="Training Accuracy" 
                          />
                        )}
                        {chartData[0]?.val_accuracy !== undefined && (
                          <Line 
                            type="monotone" 
                            dataKey="val_accuracy" 
                            stroke="#ff8042" 
                            name="Validation Accuracy" 
                          />
                        )}
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                No metrics available yet
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="logs" className="pt-4">
            <Card className="bg-black text-white">
              <ScrollArea className="h-[300px] w-full">
                <CardContent className="p-4 font-mono text-sm">
                  {logs && logs.length > 0 ? (
                    logs.map((log, index) => (
                      <div key={index} className="mb-1">
                        {log}
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-400">No logs available yet</div>
                  )}
                </CardContent>
              </ScrollArea>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
