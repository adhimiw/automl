/**
 * Concept Viewer Component
 * 
 * This component displays a concept explanation with related concepts,
 * visual aids, and difficulty indicators.
 */
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { VisualAid } from '@/lib/education/content-generator'

// Difficulty badge colors
const difficultyColors = {
  beginner: 'bg-green-100 text-green-800 hover:bg-green-200',
  intermediate: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
  advanced: 'bg-red-100 text-red-800 hover:bg-red-200'
}

interface ConceptViewerProps {
  concept: {
    id: string | number
    title: string
    content: string
    summary: string
    related_concepts: string[]
    prerequisites: string[]
    difficulty: 'beginner' | 'intermediate' | 'advanced'
    visual_aids: VisualAid[]
    category: string
    tags: string[]
  }
  onRelatedConceptClick?: (concept: string) => void
  onMarkAsCompleted?: () => void
  isCompleted?: boolean
}

export function ConceptViewer({
  concept,
  onRelatedConceptClick,
  onMarkAsCompleted,
  isCompleted = false
}: ConceptViewerProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl">{concept.title}</CardTitle>
            <CardDescription className="mt-2">{concept.summary}</CardDescription>
          </div>
          <Badge className={difficultyColors[concept.difficulty] || ''}>
            {concept.difficulty.charAt(0).toUpperCase() + concept.difficulty.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="content">
          <TabsList className="mb-4">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="visualizations">Visualizations</TabsTrigger>
            <TabsTrigger value="related">Related Concepts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="content" className="min-h-[300px]">
            <div 
              className="prose max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: concept.content }}
            />
          </TabsContent>
          
          <TabsContent value="visualizations" className="min-h-[300px]">
            {concept.visual_aids && concept.visual_aids.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {concept.visual_aids.map((aid, index) => (
                  <div key={index} className="border rounded-lg overflow-hidden">
                    <div className="relative h-48 w-full">
                      <Image
                        src={aid.url}
                        alt={aid.alt_text}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="p-3 bg-muted/50">
                      <p className="text-sm text-muted-foreground">{aid.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-40">
                <p className="text-muted-foreground">No visualizations available</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="related" className="min-h-[300px]">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Prerequisites</h3>
                {concept.prerequisites.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {concept.prerequisites.map((prereq) => (
                      <Badge 
                        key={prereq} 
                        variant="outline" 
                        className="cursor-pointer hover:bg-secondary"
                        onClick={() => onRelatedConceptClick?.(prereq)}
                      >
                        {prereq}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No prerequisites</p>
                )}
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-2">Related Concepts</h3>
                {concept.related_concepts.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {concept.related_concepts.map((related) => (
                      <Badge 
                        key={related} 
                        variant="outline" 
                        className="cursor-pointer hover:bg-secondary"
                        onClick={() => onRelatedConceptClick?.(related)}
                      >
                        {related}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No related concepts</p>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          {concept.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        {onMarkAsCompleted && (
          <Button 
            variant={isCompleted ? "outline" : "default"}
            onClick={onMarkAsCompleted}
            disabled={isCompleted}
          >
            {isCompleted ? "Completed" : "Mark as Completed"}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
