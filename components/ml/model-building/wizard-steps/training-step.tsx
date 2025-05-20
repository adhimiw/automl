"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { 
  HelpCircle, 
  AlertCircle,
  Play,
  Pause,
  RefreshCw,
  CheckCircle
} from "lucide-react"
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { TrainingMonitor } from "../visualization/training-monitor"
import type { WizardStepProps } from "../model-wizard"

interface TrainingStepData {
  datasetId: string
  objective: {
    problemType: string
    targetVariable: string
    successMetrics: string[]
  }
  features: {
    selectedFeatures: string[]
    engineeredFeatures: Array<{
      name: string
      expression: string
    }>
  }
  algorithm: {
    selectedAlgorithm: string
    hyperparameters: Record<string, any>
  }
  training: {
    trainTestSplit: number
    validationStrategy: "holdout" | "cross-validation"
    crossValidationFolds?: number
    trainingStatus: "not-started" | "in-progress" | "completed" | "failed"
    trainingProgress: number
    trainingStartTime?: string
    trainingEndTime?: string
    trainingLog?: string[]
    trainingMetrics?: Record<string, any>
  }
}

export function TrainingStep({ data, updateData, onNext, onPrev, isActive }: WizardStepProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [localData, setLocalData] = useState<TrainingStepData["training"]>(data.training)
  const [trainingJobId, setTrainingJobId] = useState<string | null>(null)
  const pollingInterval = useRef<NodeJS.Timeout | null>(null)

  // Update local state when parent data changes
  useEffect(() => {
    setLocalData(data.training)
  }, [data.training])

  // Clean up polling interval when component unmounts
  useEffect(() => {
    return () => {
      if (pollingInterval.current) {
        clearInterval(pollingInterval.current)
      }
    }
  }, [])

  // Start polling for training status if training is in progress
  useEffect(() => {
    if (localData.trainingStatus === "in-progress" && trainingJobId && isActive) {
      startPolling()
    }
    
    return () => {
      if (pollingInterval.current) {
        clearInterval(pollingInterval.current)
      }
    }
  }, [localData.trainingStatus, trainingJobId, isActive])

  // Update local state
  const handleChange = (field: keyof TrainingStepData["training"], value: any) => {
    setLocalData(prev => ({ ...prev, [field]: value }))
    
    // Update parent data
    updateData({ 
      training: { 
        ...data.training, 
        [field]: value 
      } 
    })
  }

  // Start training
  const startTraining = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Prepare training request
      const trainingRequest = {
        datasetId: data.datasetId,
        problemType: data.objective.problemType,
        targetVariable: data.objective.targetVariable,
        features: [
          ...data.features.selectedFeatures,
          ...data.features.engineeredFeatures.map(f => f.name)
        ],
        engineeredFeatures: data.features.engineeredFeatures,
        algorithm: data.algorithm.selectedAlgorithm,
        hyperparameters: data.algorithm.hyperparameters,
        trainTestSplit: localData.trainTestSplit,
        validationStrategy: localData.validationStrategy,
        crossValidationFolds: localData.crossValidationFolds
      }
      
      // Call API to start training
      const response = await fetch(`/api/ml/train`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(trainingRequest)
      })
      
      if (!response.ok) {
        throw new Error("Failed to start training")
      }
      
      const responseData = await response.json()
      
      // Update training status
      handleChange("trainingStatus", "in-progress")
      handleChange("trainingProgress", 0)
      handleChange("trainingStartTime", new Date().toISOString())
      handleChange("trainingLog", ["Training started..."])
      
      // Store job ID for polling
      setTrainingJobId(responseData.jobId)
      
      // Start polling for status
      startPolling()
    } catch (err) {
      console.error("Error starting training:", err)
      setError((err as Error).message || "Failed to start training")
      handleChange("trainingStatus", "failed")
    } finally {
      setLoading(false)
    }
  }

  // Poll for training status
  const startPolling = () => {
    if (pollingInterval.current) {
      clearInterval(pollingInterval.current)
    }
    
    pollingInterval.current = setInterval(async () => {
      if (!trainingJobId) return
      
      try {
        const response = await fetch(`/api/ml/jobs/${trainingJobId}`)
        
        if (!response.ok) {
          throw new Error("Failed to fetch training status")
        }
        
        const jobData = await response.json()
        
        // Update training progress
        handleChange("trainingProgress", jobData.progress || 0)
        
        // Update training log
        if (jobData.log && jobData.log.length > 0) {
          handleChange("trainingLog", jobData.log)
        }
        
        // Update training metrics
        if (jobData.metrics) {
          handleChange("trainingMetrics", jobData.metrics)
        }
        
        // Check if training is complete
        if (jobData.status === "completed") {
          handleChange("trainingStatus", "completed")
          handleChange("trainingEndTime", new Date().toISOString())
          handleChange("trainingProgress", 100)
          
          // Stop polling
          if (pollingInterval.current) {
            clearInterval(pollingInterval.current)
          }
        } else if (jobData.status === "failed") {
          handleChange("trainingStatus", "failed")
          setError(jobData.error || "Training failed")
          
          // Stop polling
          if (pollingInterval.current) {
            clearInterval(pollingInterval.current)
          }
        }
      } catch (err) {
        console.error("Error polling training status:", err)
        // Don't update status on polling error, just log it
      }
    }, 2000) // Poll every 2 seconds
  }

  // Reset training
  const resetTraining = () => {
    // Stop polling
    if (pollingInterval.current) {
      clearInterval(pollingInterval.current)
    }
    
    // Reset training state
    handleChange("trainingStatus", "not-started")
    handleChange("trainingProgress", 0)
    handleChange("trainingStartTime", undefined)
    handleChange("trainingEndTime", undefined)
    handleChange("trainingLog", undefined)
    handleChange("trainingMetrics", undefined)
    
    // Clear job ID
    setTrainingJobId(null)
  }

  // Save data and proceed to next step
  const handleContinue = () => {
    // Validate training status
    if (localData.trainingStatus !== "completed") {
      setError("Please complete training before proceeding")
      return
    }
    
    // Update parent data
    updateData({ training: localData })
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
        <div className="flex items-center">
          <h3 className="text-lg font-medium">Training Configuration</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-5 w-5 ml-2">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-sm">
                <p>Configure how your model will be trained and validated.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="trainTestSplit">Train/Test Split</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-4 w-4 ml-2">
                        <HelpCircle className="h-3 w-3" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-sm">
                      <p>Percentage of data to use for testing. The rest will be used for training.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex items-center gap-4">
                <Slider
                  id="trainTestSplit"
                  min={0.1}
                  max={0.5}
                  step={0.05}
                  value={[localData.trainTestSplit]}
                  onValueChange={(value) => handleChange("trainTestSplit", value[0])}
                  disabled={localData.trainingStatus === "in-progress"}
                  className="flex-1"
                />
                <div className="w-16 text-center">
                  {Math.round(localData.trainTestSplit * 100)}%
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="validationStrategy">Validation Strategy</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-4 w-4 ml-2">
                        <HelpCircle className="h-3 w-3" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-sm">
                      <p>Method used to validate your model during training.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Select
                value={localData.validationStrategy}
                onValueChange={(value) => handleChange("validationStrategy", value)}
                disabled={localData.trainingStatus === "in-progress"}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select validation strategy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="holdout">Holdout Validation</SelectItem>
                  <SelectItem value="cross-validation">Cross-Validation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {localData.validationStrategy === "cross-validation" && (
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="crossValidationFolds">Cross-Validation Folds</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-4 w-4 ml-2">
                          <HelpCircle className="h-3 w-3" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-sm">
                        <p>Number of folds to use in cross-validation.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex items-center gap-4">
                  <Slider
                    id="crossValidationFolds"
                    min={2}
                    max={10}
                    step={1}
                    value={[localData.crossValidationFolds || 5]}
                    onValueChange={(value) => handleChange("crossValidationFolds", value[0])}
                    disabled={localData.trainingStatus === "in-progress"}
                    className="flex-1"
                  />
                  <div className="w-8 text-center">
                    {localData.crossValidationFolds || 5}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <h4 className="font-medium">Training Status</h4>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">
                  {localData.trainingStatus === "not-started" && "Not Started"}
                  {localData.trainingStatus === "in-progress" && "Training in Progress"}
                  {localData.trainingStatus === "completed" && "Training Completed"}
                  {localData.trainingStatus === "failed" && "Training Failed"}
                </div>
                <div className="text-sm text-muted-foreground">
                  {localData.trainingProgress}%
                </div>
              </div>
              <Progress value={localData.trainingProgress} className="h-2" />
            </div>
            
            <div className="flex gap-2">
              {localData.trainingStatus === "not-started" && (
                <Button 
                  onClick={startTraining} 
                  disabled={loading}
                  className="flex-1"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Start Training
                </Button>
              )}
              
              {localData.trainingStatus === "in-progress" && (
                <Button 
                  variant="outline" 
                  onClick={resetTraining}
                  className="flex-1"
                >
                  <Pause className="mr-2 h-4 w-4" />
                  Cancel Training
                </Button>
              )}
              
              {(localData.trainingStatus === "completed" || localData.trainingStatus === "failed") && (
                <Button 
                  variant="outline" 
                  onClick={resetTraining}
                  className="flex-1"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Reset Training
                </Button>
              )}
              
              {localData.trainingStatus === "completed" && (
                <Button 
                  onClick={handleContinue}
                  className="flex-1"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Continue to Evaluation
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {(localData.trainingStatus === "in-progress" || localData.trainingStatus === "completed") && (
        <div className="mt-6">
          <TrainingMonitor 
            status={localData.trainingStatus}
            progress={localData.trainingProgress}
            metrics={localData.trainingMetrics}
            logs={localData.trainingLog}
          />
        </div>
      )}
    </div>
  )
}
