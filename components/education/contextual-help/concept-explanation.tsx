"use client"

import { useState, useEffect } from "react"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  BookOpen, 
  Code, 
  Image, 
  ExternalLink,
  Loader2
} from "lucide-react"
import { generateConceptExplanation } from "@/lib/api/backend-client"

interface ConceptExplanationProps {
  concept: string
  level?: "beginner" | "intermediate" | "advanced"
  onClose: () => void
}

interface ConceptData {
  concept: string
  explanation: string
  examples: string[]
  code?: string
  visualization?: string
  relatedConcepts?: string[]
  references?: Array<{
    title: string
    url: string
  }>
}

export function ConceptExplanation({ 
  concept, 
  level = "intermediate", 
  onClose 
}: ConceptExplanationProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [conceptData, setConceptData] = useState<ConceptData | null>(null)
  const [activeTab, setActiveTab] = useState("explanation")
  
  // Fetch concept explanation
  useEffect(() => {
    async function fetchConceptExplanation() {
      setLoading(true)
      setError(null)
      
      try {
        const result = await generateConceptExplanation(concept, level)
        setConceptData(result)
      } catch (err) {
        console.error("Error fetching concept explanation:", err)
        setError((err as Error).message || "Failed to fetch concept explanation")
        
        // Use fallback data
        setConceptData({
          concept,
          explanation: "Explanation not available at the moment. Please try again later.",
          examples: [],
          relatedConcepts: []
        })
      } finally {
        setLoading(false)
      }
    }
    
    fetchConceptExplanation()
  }, [concept, level])
  
  // Get level badge color
  const getLevelColor = () => {
    switch (level) {
      case "beginner": return "bg-green-100 text-green-800"
      case "intermediate": return "bg-blue-100 text-blue-800"
      case "advanced": return "bg-purple-100 text-purple-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Loading concept explanation...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-destructive mb-4">{error}</p>
            <Button variant="outline" onClick={onClose}>Close</Button>
          </div>
        ) : conceptData ? (
          <>
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="text-2xl">{conceptData.concept}</DialogTitle>
                <Badge className={getLevelColor()} variant="outline">
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </Badge>
              </div>
              <DialogDescription>
                Educational explanation of this data science concept
              </DialogDescription>
            </DialogHeader>
            
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="explanation" className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Explanation
                </TabsTrigger>
                <TabsTrigger 
                  value="code" 
                  className="flex items-center"
                  disabled={!conceptData.code}
                >
                  <Code className="h-4 w-4 mr-2" />
                  Code Example
                </TabsTrigger>
                <TabsTrigger 
                  value="visualization" 
                  className="flex items-center"
                  disabled={!conceptData.visualization}
                >
                  <Image className="h-4 w-4 mr-2" />
                  Visualization
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="explanation" className="pt-4">
                <div className="space-y-4">
                  <div className="prose max-w-none">
                    <p>{conceptData.explanation}</p>
                  </div>
                  
                  {conceptData.examples && conceptData.examples.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Examples</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        {conceptData.examples.map((example, index) => (
                          <li key={index}>{example}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {conceptData.relatedConcepts && conceptData.relatedConcepts.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Related Concepts</h3>
                      <div className="flex flex-wrap gap-2">
                        {conceptData.relatedConcepts.map((relatedConcept, index) => (
                          <Badge key={index} variant="outline" className="cursor-pointer">
                            {relatedConcept}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="code" className="pt-4">
                {conceptData.code ? (
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-4 overflow-auto">
                      <pre className="text-sm">
                        <code>{conceptData.code}</code>
                      </pre>
                    </div>
                    <div className="flex justify-end">
                      <Button 
                        variant="outline" 
                        onClick={() => navigator.clipboard.writeText(conceptData.code || "")}
                      >
                        Copy Code
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No code example available for this concept
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="visualization" className="pt-4">
                {conceptData.visualization ? (
                  <div className="space-y-4">
                    <div className="prose max-w-none">
                      <p>{conceptData.visualization}</p>
                    </div>
                    {/* In a real app, this would render an actual visualization */}
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-8 flex items-center justify-center">
                      <p className="text-muted-foreground">Visualization would be displayed here</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No visualization available for this concept
                  </div>
                )}
              </TabsContent>
            </Tabs>
            
            <DialogFooter className="flex justify-between items-center">
              <div className="flex-1">
                {conceptData.references && conceptData.references.length > 0 && (
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">References: </span>
                    {conceptData.references.map((ref, index) => (
                      <a 
                        key={index} 
                        href={ref.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary hover:underline ml-1"
                      >
                        {ref.title}
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
              <Button onClick={onClose}>Close</Button>
            </DialogFooter>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
