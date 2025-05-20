"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { EducationalContent } from "@/lib/education/content-generator"
import Link from "next/link"

export interface ConceptViewerProps {
  content: EducationalContent
  className?: string
}

export function ConceptViewer({ content, className }: ConceptViewerProps) {
  const { title, content: htmlContent, related_concepts, difficulty } = content

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

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">{title}</CardTitle>
            <CardDescription className="mt-2">Data Science Concept</CardDescription>
          </div>
          <Badge className={getDifficultyColor(difficulty)} variant="outline">
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: htmlContent }} />

        {related_concepts && related_concepts.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Related Concepts</h3>
            <div className="flex flex-wrap gap-2">
              {related_concepts.map((concept) => (
                <Button key={concept} variant="outline" asChild>
                  <Link href={`/learn/concepts/${encodeURIComponent(concept.toLowerCase())}`}>{concept}</Link>
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
