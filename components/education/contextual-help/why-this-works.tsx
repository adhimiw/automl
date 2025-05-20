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
import { 
  Lightbulb, 
  BookOpen, 
  Code, 
  Loader2
} from "lucide-react"

interface WhyThisWorksProps {
  feature: string
  context?: string | null
  onClose: () => void
}

interface ExplanationData {
  title: string
  explanation: string
  benefits: string[]
  limitations: string[]
  alternatives: string[]
  code?: string
  theory?: string
}

export function WhyThisWorks({ 
  feature, 
  context, 
  onClose 
}: WhyThisWorksProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [explanationData, setExplanationData] = useState<ExplanationData | null>(null)
  const [activeTab, setActiveTab] = useState("explanation")
  
  // Fetch explanation
  useEffect(() => {
    async function fetchExplanation() {
      setLoading(true)
      setError(null)
      
      try {
        // In a real app, this would call an API endpoint
        // For now, we'll simulate a delay and return mock data
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        setExplanationData({
          title: formatFeatureName(feature),
          explanation: `This ${formatFeatureName(feature).toLowerCase()} approach works by analyzing patterns in your data and applying statistical techniques to identify the most relevant factors. ${context ? `In the context of ${context}, ` : ''}this helps you make more accurate predictions and understand your data better.`,
          benefits: [
            "Improves model accuracy by focusing on the most important patterns",
            "Reduces noise and overfitting by filtering out irrelevant information",
            "Makes your model more interpretable by highlighting key relationships",
            "Speeds up training time by reducing computational complexity"
          ],
          limitations: [
            "May not capture complex non-linear relationships in some cases",
            "Requires sufficient data to identify reliable patterns",
            "Can be sensitive to outliers and data quality issues",
            "Needs careful validation to ensure generalizability"
          ],
          alternatives: [
            "Manual feature selection based on domain expertise",
            "Dimensionality reduction techniques like PCA",
            "Deep learning approaches for automatic feature extraction",
            "Ensemble methods that combine multiple approaches"
          ],
          code: `# Example code for ${formatFeatureName(feature)}
from sklearn.feature_selection import SelectKBest, f_classif

# Select top k features
selector = SelectKBest(f_classif, k=10)
X_new = selector.fit_transform(X, y)

# Get selected feature indices
selected_indices = selector.get_support(indices=True)
selected_features = [feature_names[i] for i in selected_indices]
print(f"Selected features: {selected_features}")`,
          theory: `The theoretical foundation of ${formatFeatureName(feature).toLowerCase()} is based on statistical significance testing and information theory. It measures the relationship between each feature and the target variable, ranking features by their predictive power.

This approach helps identify which variables contain the most useful information for your specific prediction task, allowing you to build more efficient and accurate models.`
        })
      } catch (err) {
        console.error("Error fetching explanation:", err)
        setError((err as Error).message || "Failed to fetch explanation")
        
        // Use fallback data
        setExplanationData({
          title: formatFeatureName(feature),
          explanation: "Explanation not available at the moment. Please try again later.",
          benefits: [],
          limitations: [],
          alternatives: []
        })
      } finally {
        setLoading(false)
      }
    }
    
    fetchExplanation()
  }, [feature, context])
  
  // Format feature name for display
  function formatFeatureName(feature: string): string {
    return feature
      .replace(/([A-Z])/g, ' $1') // Add space before capital letters
      .replace(/^./, str => str.toUpperCase()) // Capitalize first letter
      .replace(/_/g, ' ') // Replace underscores with spaces
      .trim()
  }

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Loading explanation...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-destructive mb-4">{error}</p>
            <Button variant="outline" onClick={onClose}>Close</Button>
          </div>
        ) : explanationData ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl flex items-center">
                <Lightbulb className="h-5 w-5 mr-2 text-amber-500" />
                Why {explanationData.title} Works
              </DialogTitle>
              <DialogDescription>
                Understanding the principles behind this approach
              </DialogDescription>
            </DialogHeader>
            
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="explanation" className="flex items-center">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Explanation
                </TabsTrigger>
                <TabsTrigger 
                  value="theory" 
                  className="flex items-center"
                  disabled={!explanationData.theory}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Theory
                </TabsTrigger>
                <TabsTrigger 
                  value="code" 
                  className="flex items-center"
                  disabled={!explanationData.code}
                >
                  <Code className="h-4 w-4 mr-2" />
                  Code Example
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="explanation" className="pt-4">
                <div className="space-y-4">
                  <div className="prose max-w-none">
                    <p>{explanationData.explanation}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-green-700">Benefits</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        {explanationData.benefits.map((benefit, index) => (
                          <li key={index}>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-amber-700">Limitations</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        {explanationData.limitations.map((limitation, index) => (
                          <li key={index}>{limitation}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {explanationData.alternatives && explanationData.alternatives.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-blue-700">Alternatives</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        {explanationData.alternatives.map((alternative, index) => (
                          <li key={index}>{alternative}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="theory" className="pt-4">
                {explanationData.theory ? (
                  <div className="prose max-w-none">
                    <p>{explanationData.theory}</p>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No theoretical explanation available
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="code" className="pt-4">
                {explanationData.code ? (
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-4 overflow-auto">
                      <pre className="text-sm">
                        <code>{explanationData.code}</code>
                      </pre>
                    </div>
                    <div className="flex justify-end">
                      <Button 
                        variant="outline" 
                        onClick={() => navigator.clipboard.writeText(explanationData.code || "")}
                      >
                        Copy Code
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No code example available
                  </div>
                )}
              </TabsContent>
            </Tabs>
            
            <DialogFooter>
              <Button onClick={onClose}>Close</Button>
            </DialogFooter>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
