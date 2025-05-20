"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { ModelWizard } from "@/components/ml/model-building/model-wizard"
import { HelpProvider, HelpTooltip } from "@/components/education/contextual-help/help-provider"
import { AiHelpPanel } from "@/components/education/ai-assistant/ai-help-panel"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { Lightbulb, BookOpen } from "lucide-react"

export default function BuildModelPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [datasetId, setDatasetId] = useState("1") // In a real app, this would come from the URL or state
  
  // Handle model creation completion
  const handleModelComplete = async (modelData: any) => {
    try {
      // In a real app, this would save the model to the database
      // For now, we'll just show a success message
      toast({
        title: "Model created successfully",
        description: `Model "${modelData.finalization.modelName}" has been created.`,
      })
      
      // Redirect to models page
      setTimeout(() => {
        router.push("/dashboard/models")
      }, 1500)
    } catch (err) {
      console.error("Error completing model:", err)
      toast({
        title: "Error",
        description: "Failed to create model. Please try again.",
        variant: "destructive"
      })
    }
  }

  return (
    <HelpProvider>
      <div className="container mx-auto py-6 space-y-6">
        <PageHeader
          heading="Build a New Model"
          subheading="Create a machine learning model step by step"
          actions={
            <div className="flex items-center gap-2">
              <HelpTooltip
                content="Learn about the model building process"
                concept="Model Building"
                icon="book"
              >
                <Button variant="outline" size="sm" className="gap-2">
                  <BookOpen className="h-4 w-4" />
                  Learn
                </Button>
              </HelpTooltip>
              <HelpTooltip
                content="Get AI-powered suggestions for your model"
                feature="AI Suggestions"
                icon="lightbulb"
              >
                <Button variant="outline" size="sm" className="gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Suggestions
                </Button>
              </HelpTooltip>
            </div>
          }
        />
        
        <div className="grid grid-cols-1 gap-6">
          <ModelWizard 
            datasetId={datasetId}
            onComplete={handleModelComplete}
          />
        </div>
        
        <AiHelpPanel 
          context="model building"
          initialMessage="I'm here to help you build your machine learning model. You can ask me questions at any step of the process."
        />
      </div>
    </HelpProvider>
  )
}
