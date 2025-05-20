"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { 
  HelpCircle, 
  AlertCircle,
  Lightbulb,
  Check,
  Info
} from "lucide-react"
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { WizardStepProps } from "../model-wizard"

interface AlgorithmOption {
  id: string
  name: string
  description: string
  type: string
  complexity: "low" | "medium" | "high"
  interpretability: "low" | "medium" | "high"
  trainingSpeed: "slow" | "medium" | "fast"
  hyperparameters: Array<{
    name: string
    type: "number" | "boolean" | "select"
    default: any
    min?: number
    max?: number
    step?: number
    options?: string[]
    description: string
  }>
}

interface AlgorithmSelectionData {
  objective: {
    problemType: string
  }
  algorithm: {
    selectedAlgorithm: string
    algorithmOptions: AlgorithmOption[]
    hyperparameters: Record<string, any>
  }
}

export function AlgorithmSelectionStep({ data, updateData, onNext, onPrev, isActive }: WizardStepProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [localData, setLocalData] = useState<AlgorithmSelectionData["algorithm"]>(data.algorithm)
  const [algorithms, setAlgorithms] = useState<AlgorithmOption[]>([])
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmOption | null>(null)
  const [activeTab, setActiveTab] = useState("algorithms")
  const [aiRecommendation, setAiRecommendation] = useState<string | null>(null)
  const [loadingRecommendation, setLoadingRecommendation] = useState(false)

  // Fetch algorithm options based on problem type
  useEffect(() => {
    async function fetchAlgorithms() {
      if (!isActive) return
      
      setLoading(true)
      setError(null)
      
      try {
        const response = await fetch(`/api/ml/algorithms?type=${data.objective.problemType}`)
        
        if (!response.ok) {
          throw new Error("Failed to fetch algorithms")
        }
        
        const algorithmsData = await response.json()
        setAlgorithms(algorithmsData.algorithms || [])
        
        // If we already have algorithm options in the data, use those
        if (localData.algorithmOptions.length > 0) {
          setAlgorithms(localData.algorithmOptions)
        } else {
          // Otherwise update local data with fetched algorithms
          setLocalData(prev => ({
            ...prev,
            algorithmOptions: algorithmsData.algorithms || []
          }))
        }
        
        // If we have a selected algorithm, find it in the options
        if (localData.selectedAlgorithm) {
          const selected = algorithmsData.algorithms.find(
            (alg: AlgorithmOption) => alg.id === localData.selectedAlgorithm
          )
          if (selected) {
            setSelectedAlgorithm(selected)
          }
        }
      } catch (err) {
        console.error("Error fetching algorithms:", err)
        setError((err as Error).message || "Failed to fetch algorithms")
        
        // Use fallback algorithms based on problem type
        const fallbackAlgorithms = getFallbackAlgorithms(data.objective.problemType)
        setAlgorithms(fallbackAlgorithms)
        setLocalData(prev => ({
          ...prev,
          algorithmOptions: fallbackAlgorithms
        }))
      } finally {
        setLoading(false)
      }
    }
    
    fetchAlgorithms()
  }, [isActive, data.objective.problemType])

  // Get AI recommendation
  const getAiRecommendation = async () => {
    setLoadingRecommendation(true)
    setError(null)
    
    try {
      const response = await fetch(`/api/ai/suggestions/algorithm-selection`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          problemType: data.objective.problemType,
          datasetId: data.datasetId,
          features: data.features.selectedFeatures,
          featureImportance: data.features.featureImportance
        })
      })
      
      if (!response.ok) {
        throw new Error("Failed to get AI recommendation")
      }
      
      const recommendationData = await response.json()
      setAiRecommendation(recommendationData.recommendation || null)
      
      // If there's a recommended algorithm ID, select it
      if (recommendationData.algorithmId) {
        const recommended = algorithms.find(alg => alg.id === recommendationData.algorithmId)
        if (recommended) {
          handleAlgorithmSelect(recommended.id)
        }
      }
    } catch (err) {
      console.error("Error getting AI recommendation:", err)
      // Don't show error for recommendation, just log it
    } finally {
      setLoadingRecommendation(false)
    }
  }

  // Handle algorithm selection
  const handleAlgorithmSelect = (algorithmId: string) => {
    const selected = algorithms.find(alg => alg.id === algorithmId)
    
    if (selected) {
      setSelectedAlgorithm(selected)
      
      // Initialize hyperparameters with defaults
      const hyperparameters: Record<string, any> = {}
      selected.hyperparameters.forEach(param => {
        hyperparameters[param.name] = param.default
      })
      
      setLocalData(prev => ({
        ...prev,
        selectedAlgorithm: algorithmId,
        hyperparameters
      }))
      
      // Switch to hyperparameters tab
      setActiveTab("hyperparameters")
    }
  }

  // Handle hyperparameter change
  const handleHyperparameterChange = (name: string, value: any) => {
    setLocalData(prev => ({
      ...prev,
      hyperparameters: {
        ...prev.hyperparameters,
        [name]: value
      }
    }))
  }

  // Save data and proceed to next step
  const handleContinue = () => {
    // Validate required fields
    if (!localData.selectedAlgorithm) {
      setError("Please select an algorithm")
      return
    }
    
    // Update parent data
    updateData({ algorithm: localData })
    onNext()
  }

  // Get complexity badge color
  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "low": return "bg-green-100 text-green-800"
      case "medium": return "bg-yellow-100 text-yellow-800"
      case "high": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  // Get interpretability badge color
  const getInterpretabilityColor = (interpretability: string) => {
    switch (interpretability) {
      case "high": return "bg-green-100 text-green-800"
      case "medium": return "bg-yellow-100 text-yellow-800"
      case "low": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  // Get training speed badge color
  const getTrainingSpeedColor = (speed: string) => {
    switch (speed) {
      case "fast": return "bg-green-100 text-green-800"
      case "medium": return "bg-yellow-100 text-yellow-800"
      case "slow": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
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
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="algorithms">Algorithm Selection</TabsTrigger>
          <TabsTrigger 
            value="hyperparameters" 
            disabled={!selectedAlgorithm}
          >
            Hyperparameters
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="algorithms" className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h3 className="text-lg font-medium">Select Algorithm</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-5 w-5 ml-2">
                      <HelpCircle className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-sm">
                    <p>Choose the machine learning algorithm that best fits your problem.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={getAiRecommendation}
              disabled={loadingRecommendation}
            >
              <Lightbulb className="mr-2 h-4 w-4" />
              Get AI Recommendation
            </Button>
          </div>
          
          {aiRecommendation && (
            <Alert className="bg-blue-50 border-blue-200">
              <Info className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-blue-700">
                <span className="font-medium">AI Recommendation:</span> {aiRecommendation}
              </AlertDescription>
            </Alert>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {algorithms.map((algorithm) => (
              <Card 
                key={algorithm.id} 
                className={`cursor-pointer transition-all hover:border-primary ${
                  localData.selectedAlgorithm === algorithm.id ? 'border-primary ring-2 ring-primary/20' : ''
                }`}
                onClick={() => handleAlgorithmSelect(algorithm.id)}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{algorithm.name}</CardTitle>
                    {localData.selectedAlgorithm === algorithm.id && (
                      <Check className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <CardDescription>{algorithm.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge className={getComplexityColor(algorithm.complexity)} variant="outline">
                      Complexity: {algorithm.complexity}
                    </Badge>
                    <Badge className={getInterpretabilityColor(algorithm.interpretability)} variant="outline">
                      Interpretability: {algorithm.interpretability}
                    </Badge>
                    <Badge className={getTrainingSpeedColor(algorithm.trainingSpeed)} variant="outline">
                      Training: {algorithm.trainingSpeed}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {selectedAlgorithm && (
            <div className="flex justify-end">
              <Button onClick={() => setActiveTab("hyperparameters")}>
                Configure Hyperparameters
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="hyperparameters" className="space-y-4 pt-4">
          {selectedAlgorithm && (
            <>
              <div className="flex items-center">
                <h3 className="text-lg font-medium">Configure {selectedAlgorithm.name}</h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-5 w-5 ml-2">
                        <HelpCircle className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-sm">
                      <p>Adjust hyperparameters to fine-tune your model's performance.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              <div className="space-y-6">
                {selectedAlgorithm.hyperparameters.map((param) => (
                  <div key={param.name} className="space-y-2">
                    <div className="flex items-center">
                      <Label htmlFor={param.name}>{param.name}</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-4 w-4 ml-2">
                              <HelpCircle className="h-3 w-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-sm">
                            <p>{param.description}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    
                    {param.type === "number" && (
                      <div className="flex items-center gap-4">
                        <Slider
                          id={param.name}
                          min={param.min || 0}
                          max={param.max || 100}
                          step={param.step || 1}
                          value={[localData.hyperparameters[param.name] || param.default]}
                          onValueChange={(value) => handleHyperparameterChange(param.name, value[0])}
                          className="flex-1"
                        />
                        <Input
                          type="number"
                          value={localData.hyperparameters[param.name] || param.default}
                          onChange={(e) => handleHyperparameterChange(param.name, parseFloat(e.target.value))}
                          className="w-20"
                          min={param.min}
                          max={param.max}
                          step={param.step}
                        />
                      </div>
                    )}
                    
                    {param.type === "boolean" && (
                      <div className="flex items-center space-x-2">
                        <Switch
                          id={param.name}
                          checked={localData.hyperparameters[param.name] || param.default}
                          onCheckedChange={(checked) => handleHyperparameterChange(param.name, checked)}
                        />
                        <Label htmlFor={param.name}>
                          {localData.hyperparameters[param.name] || param.default ? "Enabled" : "Disabled"}
                        </Label>
                      </div>
                    )}
                    
                    {param.type === "select" && param.options && (
                      <div>
                        <RadioGroup
                          value={localData.hyperparameters[param.name] || param.default}
                          onValueChange={(value) => handleHyperparameterChange(param.name, value)}
                        >
                          {param.options.map((option) => (
                            <div key={option} className="flex items-center space-x-2">
                              <RadioGroupItem value={option} id={`${param.name}-${option}`} />
                              <Label htmlFor={`${param.name}-${option}`}>{option}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleContinue}>
                  Continue to Training
                </Button>
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Fallback algorithms if API fails
function getFallbackAlgorithms(problemType: string): AlgorithmOption[] {
  switch (problemType) {
    case "regression":
      return [
        {
          id: "linear_regression",
          name: "Linear Regression",
          description: "Simple and interpretable model for linear relationships",
          type: "regression",
          complexity: "low",
          interpretability: "high",
          trainingSpeed: "fast",
          hyperparameters: [
            {
              name: "fit_intercept",
              type: "boolean",
              default: true,
              description: "Whether to calculate the intercept for this model"
            }
          ]
        },
        {
          id: "random_forest_regressor",
          name: "Random Forest Regressor",
          description: "Ensemble of decision trees for robust regression",
          type: "regression",
          complexity: "medium",
          interpretability: "medium",
          trainingSpeed: "medium",
          hyperparameters: [
            {
              name: "n_estimators",
              type: "number",
              default: 100,
              min: 10,
              max: 500,
              step: 10,
              description: "Number of trees in the forest"
            },
            {
              name: "max_depth",
              type: "number",
              default: 10,
              min: 1,
              max: 50,
              step: 1,
              description: "Maximum depth of the trees"
            }
          ]
        }
      ]
    case "binary_classification":
    case "multiclass_classification":
      return [
        {
          id: "logistic_regression",
          name: "Logistic Regression",
          description: "Simple and interpretable model for classification",
          type: "classification",
          complexity: "low",
          interpretability: "high",
          trainingSpeed: "fast",
          hyperparameters: [
            {
              name: "C",
              type: "number",
              default: 1.0,
              min: 0.1,
              max: 10.0,
              step: 0.1,
              description: "Inverse of regularization strength"
            }
          ]
        },
        {
          id: "random_forest_classifier",
          name: "Random Forest Classifier",
          description: "Ensemble of decision trees for robust classification",
          type: "classification",
          complexity: "medium",
          interpretability: "medium",
          trainingSpeed: "medium",
          hyperparameters: [
            {
              name: "n_estimators",
              type: "number",
              default: 100,
              min: 10,
              max: 500,
              step: 10,
              description: "Number of trees in the forest"
            },
            {
              name: "max_depth",
              type: "number",
              default: 10,
              min: 1,
              max: 50,
              step: 1,
              description: "Maximum depth of the trees"
            }
          ]
        }
      ]
    default:
      return []
  }
}
