"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { LucideAlertCircle, LucideLoader2 } from "lucide-react"
import { generateConceptExplanation } from "@/lib/api/backend-client"

export function ConceptExplainer() {
  const [concept, setConcept] = useState("")
  const [userLevel, setUserLevel] = useState("intermediate")
  const [context, setContext] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [explanation, setExplanation] = useState<any | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!concept) {
      setError("Please enter a concept to explain")
      return
    }
    
    setLoading(true)
    setError(null)
    
    try {
      const result = await generateConceptExplanation(concept, userLevel, context)
      setExplanation(result)
    } catch (err) {
      setError((err as Error).message || "Failed to generate explanation")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Concept Explainer</CardTitle>
          <CardDescription>
            Get AI-powered explanations for data science concepts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="concept">Concept</Label>
              <Input
                id="concept"
                placeholder="Enter a data science concept (e.g., Random Forest, PCA, etc.)"
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="userLevel">Expertise Level</Label>
              <Select value={userLevel} onValueChange={setUserLevel}>
                <SelectTrigger id="userLevel">
                  <SelectValue placeholder="Select your expertise level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="context">Context (Optional)</Label>
              <Textarea
                id="context"
                placeholder="Provide additional context for the explanation"
                value={context}
                onChange={(e) => setContext(e.target.value)}
              />
            </div>
            
            {error && (
              <Alert variant="destructive">
                <LucideAlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <>
                  <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Explanation...
                </>
              ) : (
                "Explain Concept"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      {explanation && (
        <Card>
          <CardHeader>
            <CardTitle>{explanation.concept}</CardTitle>
            <CardDescription>
              Explanation for {userLevel} level
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Explanation</h3>
              <p className="mt-2">{explanation.explanation}</p>
            </div>
            
            {explanation.examples && explanation.examples.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold">Examples</h3>
                <ul className="mt-2 list-disc pl-5">
                  {explanation.examples.map((example: string, index: number) => (
                    <li key={index}>{example}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {explanation.visualization && (
              <div>
                <h3 className="text-lg font-semibold">Visualization</h3>
                <p className="mt-2">{explanation.visualization}</p>
              </div>
            )}
            
            {explanation.related_concepts && explanation.related_concepts.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold">Related Concepts</h3>
                <ul className="mt-2 list-disc pl-5">
                  {explanation.related_concepts.map((concept: string, index: number) => (
                    <li key={index}>{concept}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {explanation.misconceptions && explanation.misconceptions.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold">Common Misconceptions</h3>
                <ul className="mt-2 list-disc pl-5">
                  {explanation.misconceptions.map((misconception: string, index: number) => (
                    <li key={index}>{misconception}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
