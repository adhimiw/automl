"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  HelpCircle, 
  AlertCircle,
  Plus,
  X,
  Lightbulb,
  BarChart2
} from "lucide-react"
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FeatureImportanceChart } from "../visualization/feature-importance-chart"
import type { WizardStepProps } from "../model-wizard"

interface FeatureSelectionData {
  datasetId: string
  objective: {
    problemType: string
    targetVariable: string
  }
  features: {
    selectedFeatures: string[]
    engineeredFeatures: Array<{
      name: string
      expression: string
      description?: string
    }>
    featureImportance: Record<string, number>
  }
}

export function FeatureSelectionStep({ data, updateData, onNext, onPrev, isActive }: WizardStepProps) {
  const [columns, setColumns] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [localData, setLocalData] = useState<FeatureSelectionData["features"]>(data.features)
  const [newFeatureName, setNewFeatureName] = useState("")
  const [newFeatureExpression, setNewFeatureExpression] = useState("")
  const [newFeatureDescription, setNewFeatureDescription] = useState("")
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([])
  const [loadingSuggestions, setLoadingSuggestions] = useState(false)
  const [activeTab, setActiveTab] = useState("selection")

  // Fetch dataset columns when component mounts
  useEffect(() => {
    async function fetchColumns() {
      if (!data.datasetId || !isActive) return
      
      setLoading(true)
      setError(null)
      
      try {
        const response = await fetch(`/api/datasets/${data.datasetId}/columns`)
        
        if (!response.ok) {
          throw new Error("Failed to fetch dataset columns")
        }
        
        const columnsData = await response.json()
        
        // Filter out the target variable
        const availableColumns = columnsData.columns.filter(
          (col: string) => col !== data.objective.targetVariable
        )
        
        setColumns(availableColumns || [])
        
        // If no features are selected yet, select all by default
        if (localData.selectedFeatures.length === 0) {
          setLocalData(prev => ({
            ...prev,
            selectedFeatures: availableColumns
          }))
        }
      } catch (err) {
        console.error("Error fetching columns:", err)
        setError((err as Error).message || "Failed to fetch dataset columns")
      } finally {
        setLoading(false)
      }
    }
    
    fetchColumns()
  }, [data.datasetId, data.objective.targetVariable, isActive])

  // Get AI suggestions for feature engineering
  const getAiSuggestions = async () => {
    if (!data.datasetId) return
    
    setLoadingSuggestions(true)
    
    try {
      const response = await fetch(`/api/ai/suggestions/feature-engineering`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          datasetId: data.datasetId,
          problemType: data.objective.problemType,
          targetVariable: data.objective.targetVariable,
          selectedFeatures: localData.selectedFeatures
        })
      })
      
      if (!response.ok) {
        throw new Error("Failed to get AI suggestions")
      }
      
      const suggestionsData = await response.json()
      setAiSuggestions(suggestionsData.suggestions || [])
    } catch (err) {
      console.error("Error getting AI suggestions:", err)
      // Don't show error for suggestions, just log it
    } finally {
      setLoadingSuggestions(false)
    }
  }

  // Toggle feature selection
  const toggleFeature = (feature: string, checked: boolean) => {
    if (checked) {
      setLocalData(prev => ({
        ...prev,
        selectedFeatures: [...prev.selectedFeatures, feature]
      }))
    } else {
      setLocalData(prev => ({
        ...prev,
        selectedFeatures: prev.selectedFeatures.filter(f => f !== feature)
      }))
    }
  }

  // Add engineered feature
  const addEngineeredFeature = () => {
    if (!newFeatureName || !newFeatureExpression) {
      setError("Feature name and expression are required")
      return
    }
    
    // Check if feature name already exists
    if ([...columns, ...localData.engineeredFeatures.map(f => f.name)].includes(newFeatureName)) {
      setError("Feature name already exists")
      return
    }
    
    setLocalData(prev => ({
      ...prev,
      engineeredFeatures: [
        ...prev.engineeredFeatures,
        {
          name: newFeatureName,
          expression: newFeatureExpression,
          description: newFeatureDescription
        }
      ]
    }))
    
    // Clear form
    setNewFeatureName("")
    setNewFeatureExpression("")
    setNewFeatureDescription("")
    setError(null)
  }

  // Remove engineered feature
  const removeEngineeredFeature = (name: string) => {
    setLocalData(prev => ({
      ...prev,
      engineeredFeatures: prev.engineeredFeatures.filter(f => f.name !== name)
    }))
  }

  // Apply AI suggestion
  const applySuggestion = (suggestion: string) => {
    // Parse suggestion (format: "name: expression - description")
    const match = suggestion.match(/^(.+?):\s*(.+?)(?:\s*-\s*(.+))?$/)
    
    if (match) {
      const [_, name, expression, description] = match
      
      setNewFeatureName(name.trim())
      setNewFeatureExpression(expression.trim())
      setNewFeatureDescription(description?.trim() || "")
    }
  }

  // Save data and proceed to next step
  const handleContinue = () => {
    // Validate required fields
    if (localData.selectedFeatures.length === 0) {
      setError("Please select at least one feature")
      return
    }
    
    // Update parent data
    updateData({ features: localData })
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
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="selection">Feature Selection</TabsTrigger>
          <TabsTrigger value="engineering">Feature Engineering</TabsTrigger>
          <TabsTrigger value="importance">Feature Importance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="selection" className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h3 className="text-lg font-medium">Select Features</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-5 w-5 ml-2">
                      <HelpCircle className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-sm">
                    <p>Select the features (columns) you want to use for training your model.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setLocalData(prev => ({ ...prev, selectedFeatures: columns }))}
              >
                Select All
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setLocalData(prev => ({ ...prev, selectedFeatures: [] }))}
              >
                Clear All
              </Button>
            </div>
          </div>
          
          <ScrollArea className="h-[300px] border rounded-md p-4">
            <div className="grid grid-cols-2 gap-2">
              {columns.map((column) => (
                <div key={column} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`feature-${column}`} 
                    checked={localData.selectedFeatures.includes(column)}
                    onCheckedChange={(checked) => toggleFeature(column, checked === true)}
                  />
                  <Label htmlFor={`feature-${column}`}>{column}</Label>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <div className="flex items-center justify-between">
            <div>
              <Badge variant="outline" className="mr-2">
                {localData.selectedFeatures.length} features selected
              </Badge>
              <Badge variant="outline">
                Target: {data.objective.targetVariable}
              </Badge>
            </div>
            <Button onClick={() => setActiveTab("engineering")}>
              Continue to Feature Engineering
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="engineering" className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h3 className="text-lg font-medium">Feature Engineering</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-5 w-5 ml-2">
                      <HelpCircle className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-sm">
                    <p>Create new features by transforming or combining existing ones.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={getAiSuggestions}
              disabled={loadingSuggestions}
            >
              <Lightbulb className="mr-2 h-4 w-4" />
              Get AI Suggestions
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="newFeatureName">Feature Name</Label>
                <Input 
                  id="newFeatureName" 
                  value={newFeatureName}
                  onChange={(e) => setNewFeatureName(e.target.value)}
                  placeholder="e.g., age_squared"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="newFeatureExpression">Expression</Label>
                <Input 
                  id="newFeatureExpression" 
                  value={newFeatureExpression}
                  onChange={(e) => setNewFeatureExpression(e.target.value)}
                  placeholder="e.g., age * age"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="newFeatureDescription">Description (Optional)</Label>
                <Input 
                  id="newFeatureDescription" 
                  value={newFeatureDescription}
                  onChange={(e) => setNewFeatureDescription(e.target.value)}
                  placeholder="e.g., Square of age to capture non-linear effects"
                />
              </div>
              
              <Button onClick={addEngineeredFeature}>
                <Plus className="mr-2 h-4 w-4" />
                Add Feature
              </Button>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">AI Suggestions</h4>
              {loadingSuggestions ? (
                <div className="flex items-center justify-center h-[200px]">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                </div>
              ) : aiSuggestions.length > 0 ? (
                <ScrollArea className="h-[200px] border rounded-md p-2">
                  <div className="space-y-2">
                    {aiSuggestions.map((suggestion, index) => (
                      <div 
                        key={index} 
                        className="p-2 border rounded-md hover:bg-accent cursor-pointer"
                        onClick={() => applySuggestion(suggestion)}
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <div className="flex items-center justify-center h-[200px] text-muted-foreground">
                  Click "Get AI Suggestions" to get feature engineering ideas
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium">Engineered Features</h4>
            {localData.engineeredFeatures.length > 0 ? (
              <div className="space-y-2">
                {localData.engineeredFeatures.map((feature) => (
                  <div key={feature.name} className="flex items-center justify-between p-2 border rounded-md">
                    <div>
                      <div className="font-medium">{feature.name}</div>
                      <div className="text-sm text-muted-foreground">{feature.expression}</div>
                      {feature.description && (
                        <div className="text-xs text-muted-foreground">{feature.description}</div>
                      )}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => removeEngineeredFeature(feature.name)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-4 text-muted-foreground">
                No engineered features yet
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => setActiveTab("selection")}>
              Back to Feature Selection
            </Button>
            <Button onClick={() => setActiveTab("importance")}>
              Continue to Feature Importance
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="importance" className="space-y-4 pt-4">
          <div className="flex items-center">
            <h3 className="text-lg font-medium">Feature Importance</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5 ml-2">
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="max-w-sm">
                  <p>Visualize the relative importance of each feature to understand their impact on the model.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <div className="h-[300px]">
            <FeatureImportanceChart 
              datasetId={data.datasetId}
              features={[...localData.selectedFeatures, ...localData.engineeredFeatures.map(f => f.name)]}
              target={data.objective.targetVariable}
              onImportanceCalculated={(importance) => {
                setLocalData(prev => ({
                  ...prev,
                  featureImportance: importance
                }))
              }}
            />
          </div>
          
          <div className="flex justify-end">
            <Button onClick={handleContinue}>
              Continue to Algorithm Selection
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
