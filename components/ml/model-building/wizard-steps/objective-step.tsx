"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  HelpCircle, 
  AlertCircle,
  Info
} from "lucide-react"
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { WizardStepProps } from "../model-wizard"

interface ObjectiveStepData {
  datasetId: string
  objective: {
    problemType: string
    targetVariable: string
    successMetrics: string[]
    description: string
  }
}

export function ObjectiveStep({ data, updateData, onNext, onPrev, isActive }: WizardStepProps) {
  const [columns, setColumns] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [localData, setLocalData] = useState<ObjectiveStepData["objective"]>(data.objective)

  // Problem types with descriptions
  const problemTypes = [
    { value: "regression", label: "Regression", description: "Predict continuous values (e.g., price, temperature)" },
    { value: "binary_classification", label: "Binary Classification", description: "Predict between two classes (e.g., yes/no, spam/not spam)" },
    { value: "multiclass_classification", label: "Multiclass Classification", description: "Predict among multiple classes (e.g., categories, ratings)" },
    { value: "clustering", label: "Clustering", description: "Group similar data points together (unsupervised)" },
    { value: "time_series", label: "Time Series", description: "Predict future values based on historical data" }
  ]

  // Success metrics based on problem type
  const getMetricsByProblemType = (type: string): { value: string, label: string }[] => {
    switch (type) {
      case "regression":
        return [
          { value: "mse", label: "Mean Squared Error (MSE)" },
          { value: "rmse", label: "Root Mean Squared Error (RMSE)" },
          { value: "mae", label: "Mean Absolute Error (MAE)" },
          { value: "r2", label: "R² Score" }
        ]
      case "binary_classification":
        return [
          { value: "accuracy", label: "Accuracy" },
          { value: "precision", label: "Precision" },
          { value: "recall", label: "Recall" },
          { value: "f1", label: "F1 Score" },
          { value: "auc", label: "Area Under ROC Curve (AUC)" }
        ]
      case "multiclass_classification":
        return [
          { value: "accuracy", label: "Accuracy" },
          { value: "precision", label: "Precision (Macro)" },
          { value: "recall", label: "Recall (Macro)" },
          { value: "f1", label: "F1 Score (Macro)" }
        ]
      case "clustering":
        return [
          { value: "silhouette", label: "Silhouette Score" },
          { value: "calinski_harabasz", label: "Calinski-Harabasz Index" },
          { value: "davies_bouldin", label: "Davies-Bouldin Index" }
        ]
      case "time_series":
        return [
          { value: "mse", label: "Mean Squared Error (MSE)" },
          { value: "rmse", label: "Root Mean Squared Error (RMSE)" },
          { value: "mae", label: "Mean Absolute Error (MAE)" },
          { value: "mape", label: "Mean Absolute Percentage Error (MAPE)" }
        ]
      default:
        return []
    }
  }

  // Fetch dataset columns when component mounts
  useEffect(() => {
    async function fetchColumns() {
      if (!data.datasetId) return
      
      setLoading(true)
      setError(null)
      
      try {
        const response = await fetch(`/api/datasets/${data.datasetId}/columns`)
        
        if (!response.ok) {
          throw new Error("Failed to fetch dataset columns")
        }
        
        const columnsData = await response.json()
        setColumns(columnsData.columns || [])
      } catch (err) {
        console.error("Error fetching columns:", err)
        setError((err as Error).message || "Failed to fetch dataset columns")
      } finally {
        setLoading(false)
      }
    }
    
    fetchColumns()
  }, [data.datasetId, isActive])

  // Update local state
  const handleChange = (field: keyof ObjectiveStepData["objective"], value: any) => {
    setLocalData(prev => ({ ...prev, [field]: value }))
  }

  // Handle metrics selection
  const handleMetricChange = (metric: string, checked: boolean) => {
    if (checked) {
      handleChange('successMetrics', [...localData.successMetrics, metric])
    } else {
      handleChange('successMetrics', localData.successMetrics.filter(m => m !== metric))
    }
  }

  // Save data and proceed to next step
  const handleContinue = () => {
    // Validate required fields
    if (!localData.problemType) {
      setError("Please select a problem type")
      return
    }
    
    if (!localData.targetVariable && localData.problemType !== "clustering") {
      setError("Please select a target variable")
      return
    }
    
    if (localData.successMetrics.length === 0) {
      setError("Please select at least one success metric")
      return
    }
    
    // Update parent data
    updateData({ objective: localData })
    onNext()
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center">
            <Label htmlFor="problemType">Problem Type</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-4 w-4 ml-2">
                    <HelpCircle className="h-3 w-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="max-w-sm">
                  <p>Select the type of machine learning problem you want to solve.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Select 
            value={localData.problemType} 
            onValueChange={(value) => handleChange('problemType', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select problem type" />
            </SelectTrigger>
            <SelectContent>
              {problemTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  <div className="flex flex-col">
                    <span>{type.label}</span>
                    <span className="text-xs text-muted-foreground">{type.description}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {localData.problemType !== "clustering" && (
          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="targetVariable">Target Variable</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-4 w-4 ml-2">
                      <HelpCircle className="h-3 w-3" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-sm">
                    <p>The variable you want to predict. This is what your model will learn to predict.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Select 
              value={localData.targetVariable} 
              onValueChange={(value) => handleChange('targetVariable', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select target variable" />
              </SelectTrigger>
              <SelectContent>
                {columns.map((column) => (
                  <SelectItem key={column} value={column}>{column}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        
        <div className="space-y-2">
          <div className="flex items-center">
            <Label>Success Metrics</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-4 w-4 ml-2">
                    <HelpCircle className="h-3 w-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="max-w-sm">
                  <p>Metrics that will be used to evaluate your model's performance.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {getMetricsByProblemType(localData.problemType).map((metric) => (
              <div key={metric.value} className="flex items-center space-x-2">
                <Checkbox 
                  id={metric.value} 
                  checked={localData.successMetrics.includes(metric.value)}
                  onCheckedChange={(checked) => handleMetricChange(metric.value, checked === true)}
                />
                <Label htmlFor={metric.value}>{metric.label}</Label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description (Optional)</Label>
          <Textarea 
            id="description" 
            placeholder="Describe your model's purpose and goals..."
            value={localData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={3}
          />
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button onClick={handleContinue}>
          Continue
        </Button>
      </div>
    </div>
  )
}
