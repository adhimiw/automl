"use client"

import { useEffect, useState } from "react"
import { PageHeader } from "@/components/page-header"
import { TutorialViewer } from "@/components/education/tutorial-viewer"
import { generateTutorial, Tutorial } from "@/lib/education/content-generator"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LucideLoader2 } from "lucide-react"

export default function ExploratoryDataAnalysisPage() {
  const [tutorial, setTutorial] = useState<Tutorial | null>(null)
  const [loading, setLoading] = useState(true)
  const [difficulty, setDifficulty] = useState<"beginner" | "intermediate" | "advanced">("beginner")

  useEffect(() => {
    async function loadTutorial() {
      setLoading(true)
      try {
        const response = await generateTutorial("Exploratory Data Analysis", difficulty)
        if (response.success && response.data) {
          setTutorial(response.data)
        } else {
          console.error("Failed to load tutorial:", response.error)
        }
      } catch (error) {
        console.error("Error loading tutorial:", error)
      } finally {
        setLoading(false)
      }
    }

    loadTutorial()
  }, [difficulty])

  return (
    <div className="container mx-auto py-6">
      <PageHeader
        heading="Exploratory Data Analysis Tutorial"
        subheading="Learn how to perform EDA on any dataset"
        actions={
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Difficulty:</span>
            <Select value={difficulty} onValueChange={(value) => setDifficulty(value as any)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        }
      />

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <LucideLoader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : tutorial ? (
        <TutorialViewer tutorial={tutorial} className="mt-6" />
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">Failed to load tutorial</h3>
          <p className="text-muted-foreground mt-2">Please try again later</p>
          <Button className="mt-4" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      )}
    </div>
  )
}
