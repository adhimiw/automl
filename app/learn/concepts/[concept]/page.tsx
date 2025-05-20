"use client"

import { useEffect, useState } from "react"
import { PageHeader } from "@/components/page-header"
import { ConceptViewer } from "@/components/education/concept-viewer"
import { generateConceptExplanation, EducationalContent } from "@/lib/education/content-generator"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LucideLoader2 } from "lucide-react"

export default function ConceptPage({ params }: { params: { concept: string } }) {
  const [content, setContent] = useState<EducationalContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [difficulty, setDifficulty] = useState<"beginner" | "intermediate" | "advanced">("beginner")

  // Decode and format the concept name
  const conceptName = decodeURIComponent(params.concept)
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  useEffect(() => {
    async function loadContent() {
      setLoading(true)
      try {
        const response = await generateConceptExplanation(conceptName, difficulty)
        if (response.success && response.data) {
          setContent(response.data)
        } else {
          console.error("Failed to load concept:", response.error)
        }
      } catch (error) {
        console.error("Error loading concept:", error)
      } finally {
        setLoading(false)
      }
    }

    loadContent()
  }, [conceptName, difficulty])

  return (
    <div className="container mx-auto py-6">
      <PageHeader
        heading={conceptName}
        subheading="Data Science Concept Explanation"
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
      ) : content ? (
        <ConceptViewer content={content} className="mt-6" />
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">Failed to load concept</h3>
          <p className="text-muted-foreground mt-2">Please try again later</p>
          <Button className="mt-4" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      )}
    </div>
  )
}
