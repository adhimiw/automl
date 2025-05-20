/**
 * Concept Detail Page
 * 
 * This page displays a single concept explanation with related concepts,
 * visual aids, and difficulty indicators.
 */
import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ConceptViewer } from '@/components/education/ConceptViewer'
import { AIAssistant } from '@/components/education/AIAssistant'
import { Button } from '@/components/ui/button'
import { ChevronLeft, BookOpen } from 'lucide-react'

// Mock data for concept (in a real app, this would come from the database)
const mockConcepts = [
  {
    id: "1",
    title: "Linear Regression",
    content: `
      <h2>Linear Regression</h2>
      <p>Linear regression is a linear approach to modeling the relationship between a dependent variable and one or more independent variables. It's one of the most widely used statistical techniques in data science.</p>
      
      <h3>Key Concepts</h3>
      <ul>
        <li><strong>Simple Linear Regression:</strong> Uses one independent variable to predict a dependent variable</li>
        <li><strong>Multiple Linear Regression:</strong> Uses multiple independent variables to predict a dependent variable</li>
        <li><strong>Least Squares Method:</strong> The most common approach to fitting a regression line</li>
        <li><strong>Coefficients:</strong> Values that indicate the relationship between each independent variable and the dependent variable</li>
      </ul>
      
      <h3>Mathematical Representation</h3>
      <p>Simple linear regression can be represented as:</p>
      <pre>y = β₀ + β₁x + ε</pre>
      <p>Where:</p>
      <ul>
        <li>y is the dependent variable</li>
        <li>x is the independent variable</li>
        <li>β₀ is the y-intercept</li>
        <li>β₁ is the slope</li>
        <li>ε is the error term</li>
      </ul>
      
      <h3>Assumptions</h3>
      <p>Linear regression makes several key assumptions:</p>
      <ul>
        <li>Linearity: The relationship between variables is linear</li>
        <li>Independence: Observations are independent of each other</li>
        <li>Homoscedasticity: Constant variance in errors</li>
        <li>Normality: Errors are normally distributed</li>
      </ul>
      
      <h3>Evaluation Metrics</h3>
      <p>Common metrics to evaluate linear regression models include:</p>
      <ul>
        <li>R-squared: Proportion of variance explained by the model</li>
        <li>Adjusted R-squared: R-squared adjusted for the number of predictors</li>
        <li>Mean Squared Error (MSE): Average squared difference between predicted and actual values</li>
        <li>Root Mean Squared Error (RMSE): Square root of MSE</li>
      </ul>
    `,
    summary: "A fundamental statistical method for modeling relationships between variables",
    related_concepts: ["Multiple Regression", "Polynomial Regression", "R-squared", "Residuals"],
    prerequisites: ["Descriptive Statistics", "Correlation"],
    difficulty: "beginner" as const,
    visual_aids: [
      {
        type: "chart",
        url: "/assets/images/education/linear-regression-line.png",
        alt_text: "Linear regression line fitting data points",
        caption: "A linear regression line showing the best fit through data points"
      },
      {
        type: "diagram",
        url: "/assets/images/education/residuals-visualization.png",
        alt_text: "Visualization of residuals",
        caption: "Visualization of residuals (differences between observed and predicted values)"
      }
    ],
    category: "machine_learning",
    tags: ["regression", "statistics", "predictive modeling", "supervised learning"]
  },
  {
    id: "2",
    title: "Decision Trees",
    content: `
      <h2>Decision Trees</h2>
      <p>Decision trees are non-parametric supervised learning models used for classification and regression tasks. They work by creating a model that predicts the value of a target variable by learning simple decision rules inferred from the data features.</p>
      
      <h3>Key Concepts</h3>
      <ul>
        <li><strong>Nodes:</strong> Points where the tree splits based on a feature</li>
        <li><strong>Branches:</strong> Outcomes of a split leading to the next node</li>
        <li><strong>Leaves:</strong> Terminal nodes that provide the final prediction</li>
        <li><strong>Splitting Criteria:</strong> Metrics like Gini impurity or information gain that determine the best splits</li>
      </ul>
      
      <h3>How Decision Trees Work</h3>
      <p>Decision trees work by recursively splitting the data based on feature values:</p>
      <ol>
        <li>Start with all data at the root node</li>
        <li>Find the feature and threshold that best splits the data</li>
        <li>Create child nodes based on the split</li>
        <li>Recursively repeat the process for each child node</li>
        <li>Stop when a stopping criterion is met (e.g., maximum depth, minimum samples)</li>
      </ol>
      
      <h3>Advantages</h3>
      <ul>
        <li>Easy to understand and interpret</li>
        <li>Requires little data preprocessing</li>
        <li>Can handle both numerical and categorical data</li>
        <li>Automatically handles feature interactions</li>
      </ul>
      
      <h3>Limitations</h3>
      <ul>
        <li>Prone to overfitting, especially with deep trees</li>
        <li>Can be unstable (small changes in data can result in very different trees)</li>
        <li>Biased toward features with more levels</li>
        <li>May not capture complex relationships without deep trees</li>
      </ul>
      
      <h3>Preventing Overfitting</h3>
      <p>Common techniques to prevent overfitting in decision trees:</p>
      <ul>
        <li>Setting a maximum depth</li>
        <li>Requiring a minimum number of samples per leaf</li>
        <li>Pruning the tree after training</li>
        <li>Using ensemble methods like Random Forests</li>
      </ul>
    `,
    summary: "Tree-based models that make decisions by splitting data based on feature values",
    related_concepts: ["Random Forests", "Ensemble Methods", "Classification", "Feature Importance"],
    prerequisites: ["Supervised Learning", "Classification Basics"],
    difficulty: "intermediate" as const,
    visual_aids: [
      {
        type: "diagram",
        url: "/assets/images/education/decision-tree-structure.png",
        alt_text: "Decision tree structure",
        caption: "Structure of a decision tree showing nodes, branches, and leaves"
      },
      {
        type: "chart",
        url: "/assets/images/education/decision-boundary.png",
        alt_text: "Decision boundaries created by a decision tree",
        caption: "Decision boundaries created by a decision tree classifier"
      }
    ],
    category: "machine_learning",
    tags: ["classification", "regression", "supervised learning", "tree-based models"]
  }
]

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  // In a real app, fetch the concept from the database
  const concept = mockConcepts.find(c => c.id === params.id)
  
  if (!concept) {
    return {
      title: 'Concept Not Found',
      description: 'The requested concept could not be found.'
    }
  }
  
  return {
    title: `${concept.title} | Data Science Learning Platform`,
    description: concept.summary,
  }
}

export default function ConceptPage({ params }: { params: { id: string } }) {
  // In a real app, fetch the concept from the database
  const concept = mockConcepts.find(c => c.id === params.id)
  
  // If concept not found, show 404 page
  if (!concept) {
    notFound()
  }
  
  // Mock function for marking concept as completed
  const handleMarkAsCompleted = () => {
    console.log(`Marking concept ${concept.id} as completed`)
    // In a real app, call the API to update user progress
  }
  
  // Mock function for handling related concept clicks
  const handleRelatedConceptClick = (conceptName: string) => {
    console.log(`Navigating to related concept: ${conceptName}`)
    // In a real app, navigate to the related concept page
  }
  
  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/education/concepts">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Concepts
          </Link>
        </Button>
      </div>
      
      <div className="flex items-center gap-2">
        <BookOpen className="h-5 w-5 text-primary" />
        <h1 className="text-3xl font-bold">{concept.title}</h1>
      </div>
      
      <ConceptViewer
        concept={concept}
        onRelatedConceptClick={handleRelatedConceptClick}
        onMarkAsCompleted={handleMarkAsCompleted}
        isCompleted={false} // In a real app, get this from user progress
      />
      
      {/* Related Concepts Section */}
      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Explore Related Concepts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockConcepts
            .filter(c => c.id !== concept.id)
            .map(relatedConcept => (
              <Link 
                key={relatedConcept.id} 
                href={`/education/concepts/${relatedConcept.id}`}
                className="block p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <h3 className="font-medium">{relatedConcept.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{relatedConcept.summary}</p>
              </Link>
            ))}
        </div>
      </section>
      
      {/* AI Assistant */}
      <AIAssistant 
        currentContext={{
          type: 'concept',
          id: concept.id,
          title: concept.title
        }}
        onConceptSelect={(id) => console.log(`Selected concept from AI assistant: ${id}`)}
        onTutorialSelect={(id) => console.log(`Selected tutorial from AI assistant: ${id}`)}
      />
    </div>
  )
}
