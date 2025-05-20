"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  HelpCircle, 
  AlertCircle,
  BarChart2,
  Grid,
  LineChart,
  CheckCircle
} from "lucide-react"
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ModelComparisonDashboard } from "../visualization/model-comparison-dashboard"
import { PredictionExplainer } from "../visualization/prediction-explainer"
import type { WizardStepProps } from "../model-wizard"

interface EvaluationStepData {
  datasetId: string
  objective: {
    problemType: string
    targetVariable: string
    successMetrics: string[]
  }
  algorithm: {
    selectedAlgorithm: string
  }
  training: {
    trainingStatus: string
    trainingMetrics?: Record<string, any>
  }
  evaluation: {
    metrics: Record<string, any>
    confusionMatrix?: number[][]
    featureImportance?: Record<string, number>
    rocCurve?: Array<{x: number, y: number}>
    precisionRecallCurve?: Array<{x: number, y: number}>
    residualPlot?: Array<{actual: number, predicted: number}>
  }
}

export function EvaluationStep({ data, updateData, onNext, onPrev, isActive }: WizardStepProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [localData, setLocalData] = useState<EvaluationStepData["evaluation"]>(data.evaluation)
  const [activeTab, setActiveTab] = useState("metrics")
  const [modelId, setModelId] = useState<string | null>(null)

  // Fetch evaluation metrics when component mounts
  useEffect(() => {
    if (!isActive || data.training.trainingStatus !== "completed") return
    
    async function fetchEvaluationMetrics() {
      setLoading(true)
      setError(null)
      
      try {
        // In a real app, this would be provided by the training step
        // For now, we'll simulate it with a fake model ID
        const tempModelId = `model-${Date.now()}`
        setModelId(tempModelId)
        
        // If we already have metrics, use those
        if (Object.keys(localData.metrics).length > 0) {
          return
        }
        
        // Otherwise, fetch metrics from API
        const response = await fetch(`/api/ml/evaluate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            datasetId: data.datasetId,
            algorithm: data.algorithm.selectedAlgorithm,
            problemType: data.objective.problemType,
            metrics: data.objective.successMetrics
          })
        })
        
        if (!response.ok) {
          throw new Error("Failed to fetch evaluation metrics")
        }
        
        const metricsData = await response.json()
        
        // Update local data
        setLocalData({
          ...localData,
          metrics: metricsData.metrics || {},
          confusionMatrix: metricsData.confusionMatrix,
          featureImportance: metricsData.featureImportance,
          rocCurve: metricsData.rocCurve,
          precisionRecallCurve: metricsData.precisionRecallCurve,
          residualPlot: metricsData.residualPlot
        })
        
        // Update parent data
        updateData({
          evaluation: {
            ...localData,
            metrics: metricsData.metrics || {},
            confusionMatrix: metricsData.confusionMatrix,
            featureImportance: metricsData.featureImportance,
            rocCurve: metricsData.rocCurve,
            precisionRecallCurve: metricsData.precisionRecallCurve,
            residualPlot: metricsData.residualPlot
          }
        })
      } catch (err) {
        console.error("Error fetching evaluation metrics:", err)
        setError((err as Error).message || "Failed to fetch evaluation metrics")
        
        // Use training metrics as fallback
        if (data.training.trainingMetrics) {
          setLocalData({
            ...localData,
            metrics: data.training.trainingMetrics
          })
          
          updateData({
            evaluation: {
              ...localData,
              metrics: data.training.trainingMetrics
            }
          })
        }
      } finally {
        setLoading(false)
      }
    }
    
    fetchEvaluationMetrics()
  }, [isActive, data.training.trainingStatus])

  // Save data and proceed to next step
  const handleContinue = () => {
    // Update parent data
    updateData({ evaluation: localData })
    onNext()
  }

  // If training is not completed, show message
  if (data.training.trainingStatus !== "completed") {
    return (
      <div className="flex flex-col items-center justify-center h-[400px]">
        <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">Training Not Completed</h3>
        <p className="text-muted-foreground text-center max-w-md mb-6">
          Please complete the training step before evaluating the model.
        </p>
        <Button variant="outline" onClick={onPrev}>
          Return to Training
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h3 className="text-lg font-medium">Model Evaluation</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-5 w-5 ml-2">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-sm">
                <p>Evaluate your model's performance on test data.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="metrics" className="flex items-center">
            <BarChart2 className="h-4 w-4 mr-2" />
            Performance Metrics
          </TabsTrigger>
          <TabsTrigger value="visualizations" className="flex items-center">
            <LineChart className="h-4 w-4 mr-2" />
            Visualizations
          </TabsTrigger>
          <TabsTrigger value="explainer" className="flex items-center">
            <Grid className="h-4 w-4 mr-2" />
            Prediction Explainer
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="metrics" className="pt-4">
          {loading ? (
            <div className="flex items-center justify-center h-[400px]">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-2"></div>
                <p className="text-sm text-muted-foreground">Loading evaluation metrics...</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(localData.metrics)
                  .filter(([key]) => !key.includes('history') && typeof localData.metrics[key] !== 'object')
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
              
              <ModelComparisonDashboard
                modelId={modelId || "current-model"}
                metrics={localData.metrics}
                confusionMatrix={localData.confusionMatrix}
                featureImportance={localData.featureImportance}
                rocCurve={localData.rocCurve}
                precisionRecallCurve={localData.precisionRecallCurve}
                residualPlot={localData.residualPlot}
                problemType={data.objective.problemType}
              />
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="visualizations" className="pt-4">
          <ModelComparisonDashboard
            modelId={modelId || "current-model"}
            metrics={localData.metrics}
            confusionMatrix={localData.confusionMatrix}
            featureImportance={localData.featureImportance}
            rocCurve={localData.rocCurve}
            precisionRecallCurve={localData.precisionRecallCurve}
            residualPlot={localData.residualPlot}
            problemType={data.objective.problemType}
            showOnlyVisualizations={true}
          />
        </TabsContent>
        
        <TabsContent value="explainer" className="pt-4">
          <PredictionExplainer
            modelId={modelId || "current-model"}
            datasetId={data.datasetId}
            features={data.features.selectedFeatures}
            target={data.objective.targetVariable}
            problemType={data.objective.problemType}
            featureImportance={localData.featureImportance}
          />
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end">
        <Button onClick={handleContinue}>
          <CheckCircle className="mr-2 h-4 w-4" />
          Continue to Finalization
        </Button>
      </div>
    </div>
  )
}
