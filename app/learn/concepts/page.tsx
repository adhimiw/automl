"use client"

import { ConceptExplainer } from "@/components/education/concept-explainer"

export default function ConceptsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Data Science Concepts</h1>
      <p className="text-muted-foreground mb-8">
        Learn about data science concepts with AI-powered explanations tailored to your expertise level.
      </p>
      
      <ConceptExplainer />
    </div>
  )
}
