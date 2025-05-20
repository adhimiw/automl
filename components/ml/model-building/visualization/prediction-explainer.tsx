"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  HelpCircle, 
  AlertCircle,
  RefreshCw,
  ArrowRight
} from "lucide-react"
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  Legend, 
  ResponsiveContainer,
  Cell
} from "recharts"

interface PredictionExplainerProps {
  modelId: string
  datasetId: string
  features: string[]
  target: string
  problemType: string
  featureImportance?: Record<string, number>
}

export function PredictionExplainer({ 
  modelId,
  datasetId,
  features,
  target,
  problemType,
  featureImportance
}: PredictionExplainerProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sampleData, setSampleData] = useState<Record<string, any>>({})
  const [prediction, setPrediction] = useState<any>(null)
  const [shapValues, setShapValues] = useState<Record<string, number>>({})
  const [sampleOptions, setSampleOptions] = useState<string[]>([])
  const [selectedSample, setSelectedSample] = useState<string>("")
  
  // Colors for charts
  const COLORS = [
    "#8884d8", "#83a6ed", "#8dd1e1", "#82ca9d", "#a4de6c",
    "#d0ed57", "#ffc658", "#ff8042", "#ff6361", "#bc5090"
  ]
  
  // Fetch sample data options when component mounts
  useEffect(() => {
    async function fetchSampleOptions() {
      setLoading(true)
      setError(null)
      
      try {
        const response = await fetch(`/api/datasets/${datasetId}/samples?limit=10`)
        
        if (!response.ok) {
          throw new Error("Failed to fetch sample options")
        }
        
        const data = await response.json()
        setSampleOptions(data.samples.map((s: any) => s.id))
        
        // Select first sample by default
        if (data.samples.length > 0) {
          setSelectedSample(data.samples[0].id)
          setSampleData(data.samples[0].data)
        }
      } catch (err) {
        console.error("Error fetching sample options:", err)
        setError((err as Error).message || "Failed to fetch sample options")
        
        // Use mock data as fallback
        const mockSamples = ["sample-1", "sample-2", "sample-3"]
        setSampleOptions(mockSamples)
        setSelectedSample(mockSamples[0])
        
        // Generate mock sample data
        const mockData: Record<string, any> = {}
        features.forEach(feature => {
          mockData[feature] = Math.random() * 100
        })
        setSampleData(mockData)
      } finally {
        setLoading(false)
      }
    }
    
    fetchSampleOptions()
  }, [datasetId, features])
  
  // Fetch sample data when selected sample changes
  useEffect(() => {
    if (!selectedSample) return
    
    async function fetchSampleData() {
      setLoading(true)
      setError(null)
      
      try {
        const response = await fetch(`/api/datasets/${datasetId}/samples/${selectedSample}`)
        
        if (!response.ok) {
          throw new Error("Failed to fetch sample data")
        }
        
        const data = await response.json()
        setSampleData(data.data)
      } catch (err) {
        console.error("Error fetching sample data:", err)
        setError((err as Error).message || "Failed to fetch sample data")
      } finally {
        setLoading(false)
      }
    }
    
    fetchSampleData()
  }, [datasetId, selectedSample])
  
  // Make prediction and get SHAP values
  const explainPrediction = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`/api/ml/explain`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          modelId,
          data: sampleData
        })
      })
      
      if (!response.ok) {
        throw new Error("Failed to explain prediction")
      }
      
      const data = await response.json()
      setPrediction(data.prediction)
      setShapValues(data.shapValues || {})
    } catch (err) {
      console.error("Error explaining prediction:", err)
      setError((err as Error).message || "Failed to explain prediction")
      
      // Use mock data as fallback
      const mockPrediction = problemType === "regression" 
        ? Math.random() * 100 
        : Math.random() > 0.5 ? 1 : 0
      
      setPrediction(mockPrediction)
      
      // Generate mock SHAP values based on feature importance
      const mockShapValues: Record<string, number> = {}
      if (featureImportance) {
        Object.entries(featureImportance).forEach(([feature, importance]) => {
          mockShapValues[feature] = (Math.random() - 0.5) * importance * 2
        })
      } else {
        features.forEach(feature => {
          mockShapValues[feature] = (Math.random() - 0.5) * 2
        })
      }
      
      setShapValues(mockShapValues)
    } finally {
      setLoading(false)
    }
  }
  
  // Handle feature value change
  const handleFeatureChange = (feature: string, value: any) => {
    setSampleData(prev => ({
      ...prev,
      [feature]: value
    }))
  }
  
  // Format SHAP values for chart
  const shapData = Object.entries(shapValues)
    .map(([name, value]) => ({ 
      name, 
      value,
      color: value >= 0 ? "#82ca9d" : "#ff8042"
    }))
    .sort((a, b) => Math.abs(b.value) - Math.abs(a.value))
  
  // Format prediction for display
  const formatPrediction = () => {
    if (prediction === null) return "N/A"
    
    if (problemType === "regression") {
      return typeof prediction === "number" ? prediction.toFixed(4) : prediction
    } else {
      return typeof prediction === "number" 
        ? prediction === 1 ? "Positive" : "Negative"
        : prediction
    }
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Sample Selection</CardTitle>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <HelpCircle className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-sm">
                      <p>Select a sample from your dataset or adjust feature values manually.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sampleSelect">Select Sample</Label>
                  <Select
                    value={selectedSample}
                    onValueChange={setSelectedSample}
                    disabled={loading || sampleOptions.length === 0}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a sample" />
                    </SelectTrigger>
                    <SelectContent>
                      {sampleOptions.map((sample) => (
                        <SelectItem key={sample} value={sample}>
                          Sample {sample}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-2">Feature Values</h4>
                  <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                    {features.map((feature) => (
                      <div key={feature} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <Label htmlFor={`feature-${feature}`} className="text-xs">
                            {feature}
                          </Label>
                          <span className="text-xs text-muted-foreground">
                            {typeof sampleData[feature] === 'number' 
                              ? sampleData[feature].toFixed(2) 
                              : sampleData[feature] || 'N/A'
                            }
                          </span>
                        </div>
                        {typeof sampleData[feature] === 'number' ? (
                          <Slider
                            id={`feature-${feature}`}
                            min={0}
                            max={sampleData[feature] * 2 || 100}
                            step={0.01}
                            value={[sampleData[feature] || 0]}
                            onValueChange={(value) => handleFeatureChange(feature, value[0])}
                            disabled={loading}
                          />
                        ) : (
                          <Input
                            id={`feature-${feature}`}
                            value={sampleData[feature] || ""}
                            onChange={(e) => handleFeatureChange(feature, e.target.value)}
                            disabled={loading}
                            className="h-8"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button 
                  onClick={explainPrediction} 
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? (
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <ArrowRight className="h-4 w-4 mr-2" />
                  )}
                  Explain Prediction
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2 space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Prediction Explanation</CardTitle>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <HelpCircle className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-sm">
                      <p>This shows how each feature contributes to the final prediction. Positive values push the prediction higher, negative values push it lower.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardHeader>
            <CardContent>
              {prediction !== null ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-sm font-medium text-muted-foreground mb-1">
                        Prediction
                      </div>
                      <div className="text-3xl font-bold">
                        {formatPrediction()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={shapData}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis 
                          type="category" 
                          dataKey="name" 
                          width={120}
                          tick={{ fontSize: 12 }}
                        />
                        <RechartsTooltip
                          formatter={(value: number) => [`${value.toFixed(4)}`, 'Contribution']}
                        />
                        <Legend />
                        <Bar dataKey="value" name="Feature Contribution">
                          {shapData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={entry.value >= 0 ? "#82ca9d" : "#ff8042"} 
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    <p>
                      <span className="inline-block w-3 h-3 bg-[#82ca9d] mr-2"></span>
                      Positive values (green) push the prediction higher
                    </p>
                    <p>
                      <span className="inline-block w-3 h-3 bg-[#ff8042] mr-2"></span>
                      Negative values (orange) push the prediction lower
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                  Click "Explain Prediction" to see how features influence the model's output
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
