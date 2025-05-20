"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { 
  ChevronLeft, 
  ChevronRight, 
  Save, 
  HelpCircle, 
  AlertCircle,
  CheckCircle2
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Import wizard steps
import { ObjectiveStep } from "./wizard-steps/objective-step"
import { FeatureSelectionStep } from "./wizard-steps/feature-selection-step"
import { AlgorithmSelectionStep } from "./wizard-steps/algorithm-selection-step"
import { TrainingStep } from "./wizard-steps/training-step"
import { EvaluationStep } from "./wizard-steps/evaluation-step"
import { FinalizationStep } from "./wizard-steps/finalization-step"

// Types
export type WizardStepId = 
  | "objective" 
  | "feature-selection" 
  | "algorithm-selection" 
  | "training" 
  | "evaluation" 
  | "finalization"

export interface WizardStep {
  id: WizardStepId
  title: string
  description: string
  component: React.ComponentType<WizardStepProps>
  optional?: boolean
}

export interface WizardStepProps {
  data: any
  updateData: (data: any) => void
  onNext: () => void
  onPrev: () => void
  isActive: boolean
}

export interface ModelWizardProps {
  datasetId: string
  initialData?: any
  onComplete?: (modelData: any) => void
  className?: string
}

export function ModelWizard({ datasetId, initialData, onComplete, className }: ModelWizardProps) {
  const { toast } = useToast()
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [wizardData, setWizardData] = useState<any>(initialData || {
    datasetId,
    objective: {
      problemType: "",
      targetVariable: "",
      successMetrics: [],
      description: ""
    },
    features: {
      selectedFeatures: [],
      engineeredFeatures: [],
      featureImportance: {}
    },
    algorithm: {
      selectedAlgorithm: "",
      algorithmOptions: [],
      hyperparameters: {}
    },
    training: {
      trainTestSplit: 0.2,
      validationStrategy: "cross-validation",
      trainingStatus: "not-started",
      trainingProgress: 0
    },
    evaluation: {
      metrics: {},
      confusionMatrix: null,
      featureImportance: null
    },
    finalization: {
      modelName: "",
      modelDescription: "",
      modelVersion: "1.0.0",
      notes: ""
    }
  })
  const [showHelp, setShowHelp] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Define wizard steps
  const steps: WizardStep[] = [
    {
      id: "objective",
      title: "Define Objective",
      description: "Define the problem and set objectives",
      component: ObjectiveStep
    },
    {
      id: "feature-selection",
      title: "Feature Selection",
      description: "Select and engineer features",
      component: FeatureSelectionStep
    },
    {
      id: "algorithm-selection",
      title: "Algorithm Selection",
      description: "Choose algorithms with guidance",
      component: AlgorithmSelectionStep
    },
    {
      id: "training",
      title: "Model Training",
      description: "Configure and monitor training",
      component: TrainingStep
    },
    {
      id: "evaluation",
      title: "Model Evaluation",
      description: "Evaluate and compare models",
      component: EvaluationStep
    },
    {
      id: "finalization",
      title: "Model Finalization",
      description: "Finalize and document model",
      component: FinalizationStep
    }
  ]

  const currentStep = steps[currentStepIndex]
  const progress = ((currentStepIndex + 1) / steps.length) * 100

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1)
    } else {
      handleComplete()
    }
  }

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1)
    }
  }

  const handleComplete = async () => {
    try {
      setIsCompleted(true)
      
      // Call onComplete callback if provided
      if (onComplete) {
        await onComplete(wizardData)
      }
      
      toast({
        title: "Model building completed",
        description: "Your model has been successfully created.",
      })
    } catch (err) {
      setError((err as Error).message || "An error occurred while completing the model")
      setIsCompleted(false)
    }
  }

  const updateWizardData = (newData: any) => {
    setWizardData({ ...wizardData, ...newData })
  }

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Model Building Wizard</CardTitle>
            <CardDescription>Build your machine learning model step by step</CardDescription>
          </div>
          <Button variant="outline" size="icon" onClick={() => setShowHelp(!showHelp)}>
            <HelpCircle className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">
              Step {currentStepIndex + 1}: {currentStep.title}
            </h3>
            <div className="text-sm text-muted-foreground">
              Step {currentStepIndex + 1} of {steps.length}
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Tabs defaultValue="wizard" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="wizard">Wizard</TabsTrigger>
            <TabsTrigger value="help" disabled={!showHelp}>Help</TabsTrigger>
          </TabsList>
          <TabsContent value="wizard" className="py-4">
            <div className="min-h-[400px]">
              {steps.map((step, index) => (
                <div key={step.id} className={index === currentStepIndex ? "block" : "hidden"}>
                  <step.component
                    data={wizardData}
                    updateData={updateWizardData}
                    onNext={handleNext}
                    onPrev={handlePrev}
                    isActive={index === currentStepIndex}
                  />
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="help" className="py-4">
            <div className="prose max-w-none">
              <h3>Help for: {currentStep.title}</h3>
              <p>{currentStep.description}</p>
              {/* Help content will be dynamically loaded based on current step */}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handlePrev} 
          disabled={currentStepIndex === 0 || isCompleted}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        <Button 
          onClick={handleNext} 
          disabled={isCompleted}
        >
          {currentStepIndex < steps.length - 1 ? (
            <>
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              Complete
              <CheckCircle2 className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
