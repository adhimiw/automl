"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  HelpCircle, 
  AlertCircle,
  Save,
  Download,
  FileText
} from "lucide-react"
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { WizardStepProps } from "../model-wizard"

interface FinalizationStepData {
  datasetId: string
  objective: {
    problemType: string
    targetVariable: string
    successMetrics: string[]
    description: string
  }
  algorithm: {
    selectedAlgorithm: string
  }
  evaluation: {
    metrics: Record<string, any>
  }
  finalization: {
    modelName: string
    modelDescription: string
    modelVersion: string
    notes: string
    tags?: string[]
  }
}

export function FinalizationStep({ data, updateData, onNext, onPrev, isActive }: WizardStepProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [localData, setLocalData] = useState<FinalizationStepData["finalization"]>(data.finalization)
  const [tag, setTag] = useState("")
  
  // Update local state
  const handleChange = (field: keyof FinalizationStepData["finalization"], value: any) => {
    setLocalData(prev => ({ ...prev, [field]: value }))
  }
  
  // Add tag
  const addTag = () => {
    if (!tag) return
    
    const tags = localData.tags || []
    if (!tags.includes(tag)) {
      handleChange('tags', [...tags, tag])
    }
    
    setTag("")
  }
  
  // Remove tag
  const removeTag = (tagToRemove: string) => {
    const tags = localData.tags || []
    handleChange('tags', tags.filter(t => t !== tagToRemove))
  }
  
  // Generate model description
  const generateDescription = () => {
    // Create a description based on the model details
    const description = `${data.algorithm.selectedAlgorithm} model trained to ${
      data.objective.problemType === "regression" ? "predict" : "classify"
    } ${data.objective.targetVariable} using ${data.features?.selectedFeatures?.length || 0} features. ${
      data.objective.description ? `Purpose: ${data.objective.description}` : ""
    }`
    
    handleChange('modelDescription', description)
  }
  
  // Generate model report
  const generateReport = () => {
    // In a real app, this would generate a PDF or HTML report
    // For now, we'll just show an alert
    alert("Model report generation would be implemented here")
  }
  
  // Save model
  const saveModel = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Validate required fields
      if (!localData.modelName) {
        throw new Error("Model name is required")
      }
      
      // Update parent data
      updateData({ finalization: localData })
      
      // In a real app, this would save the model to the database
      // For now, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Complete the wizard
      onNext()
    } catch (err) {
      console.error("Error saving model:", err)
      setError((err as Error).message || "Failed to save model")
    } finally {
      setLoading(false)
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
      
      <div className="space-y-4">
        <div className="flex items-center">
          <h3 className="text-lg font-medium">Model Finalization</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-5 w-5 ml-2">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-sm">
                <p>Finalize your model by providing a name, description, and additional metadata.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="modelName">Model Name</Label>
              <Input 
                id="modelName" 
                value={localData.modelName}
                onChange={(e) => handleChange('modelName', e.target.value)}
                placeholder="e.g., Customer Churn Predictor"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="modelDescription">Description</Label>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={generateDescription}
                  className="h-8 text-xs"
                >
                  Auto-generate
                </Button>
              </div>
              <Textarea 
                id="modelDescription" 
                value={localData.modelDescription}
                onChange={(e) => handleChange('modelDescription', e.target.value)}
                placeholder="Describe what this model does and how it should be used..."
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="modelVersion">Version</Label>
              <Input 
                id="modelVersion" 
                value={localData.modelVersion}
                onChange={(e) => handleChange('modelVersion', e.target.value)}
                placeholder="e.g., 1.0.0"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea 
                id="notes" 
                value={localData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                placeholder="Add any additional notes about this model..."
                rows={3}
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Tags (Optional)</Label>
              <div className="flex gap-2">
                <Input 
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  placeholder="Add a tag..."
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addTag()
                    }
                  }}
                />
                <Button onClick={addTag}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {(localData.tags || []).map((tag) => (
                  <div 
                    key={tag} 
                    className="bg-muted px-2 py-1 rounded-md text-sm flex items-center gap-1"
                  >
                    {tag}
                    <button 
                      onClick={() => removeTag(tag)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <AlertCircle className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Model Summary</h4>
              <Card className="bg-muted/50">
                <CardContent className="p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Problem Type:</span>
                    <span className="font-medium">{data.objective.problemType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Algorithm:</span>
                    <span className="font-medium">{data.algorithm.selectedAlgorithm}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Target Variable:</span>
                    <span className="font-medium">{data.objective.targetVariable}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Features:</span>
                    <span className="font-medium">{data.features?.selectedFeatures?.length || 0}</span>
                  </div>
                  {Object.entries(data.evaluation.metrics)
                    .filter(([key]) => !key.includes('history') && typeof data.evaluation.metrics[key] !== 'object')
                    .slice(0, 2)
                    .map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-muted-foreground">{key.replace(/_/g, ' ')}:</span>
                        <span className="font-medium">
                          {typeof value === 'number' ? value.toFixed(4) : value}
                        </span>
                      </div>
                    ))
                  }
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Actions</h4>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={generateReport}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => alert("Model download would be implemented here")}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Model
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button 
          onClick={saveModel} 
          disabled={loading}
        >
          <Save className="mr-2 h-4 w-4" />
          Save Model
        </Button>
      </div>
    </div>
  )
}
