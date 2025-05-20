"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { LucideChevronLeft, LucideChevronRight, LucideCode, LucideBookOpen } from "lucide-react"
import { Tutorial, TutorialStep } from "@/lib/education/content-generator"

export interface TutorialViewerProps {
  tutorial: Tutorial
  className?: string
}

export function TutorialViewer({ tutorial, className }: TutorialViewerProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [activeTab, setActiveTab] = useState<"content" | "code">("content")

  const { title, description, steps, difficulty } = tutorial

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1))
  }

  const handleNextStep = () => {
    setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1))
  }

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-800"
      case "intermediate":
        return "bg-blue-100 text-blue-800"
      case "advanced":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const step = steps[currentStep]

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">{title}</CardTitle>
            <CardDescription className="mt-2">{description}</CardDescription>
          </div>
          <Badge className={getDifficultyColor(difficulty)} variant="outline">
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">
              Step {currentStep + 1}: {step.title}
            </h3>
            <div className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>

          {step.code ? (
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "content" | "code")}>
              <TabsList className="mb-4">
                <TabsTrigger value="content">
                  <LucideBookOpen className="h-4 w-4 mr-2" />
                  Content
                </TabsTrigger>
                <TabsTrigger value="code">
                  <LucideCode className="h-4 w-4 mr-2" />
                  Code
                </TabsTrigger>
              </TabsList>
              <TabsContent value="content">
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: step.content }} />
              </TabsContent>
              <TabsContent value="code">
                <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-4 overflow-auto">
                  <pre className="text-sm">
                    <code>{step.code}</code>
                  </pre>
                </div>
                <div className="mt-4">
                  <Button variant="outline" onClick={() => navigator.clipboard.writeText(step.code || "")}>
                    Copy Code
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: step.content }} />
          )}
        </div>

        <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
          <div
            className="bg-primary h-full rounded-full"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handlePrevStep} disabled={currentStep === 0}>
          <LucideChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <Button onClick={handleNextStep} disabled={currentStep === steps.length - 1}>
          Next
          <LucideChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  )
}
