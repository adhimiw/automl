/**
 * Education Hub Page
 * 
 * This page serves as the main entry point for the educational content.
 * It showcases the knowledge base search, featured content, and learning progress.
 */
import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import { KnowledgeBaseSearch } from '@/components/education/KnowledgeBaseSearch'
import { ConceptViewer } from '@/components/education/ConceptViewer'
import { TutorialPlayer } from '@/components/education/TutorialPlayer'
import { LearningProgress } from '@/components/education/LearningProgress'
import { AIAssistant } from '@/components/education/AIAssistant'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookOpen, FileText, Award, Lightbulb, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Education Hub | Data Science Learning Platform',
  description: 'Explore educational content, tutorials, and learning paths to master data science concepts and techniques.',
}

// Mock data for featured content
const featuredConcepts = [
  {
    id: 1,
    title: 'Linear Regression',
    summary: 'A fundamental statistical method for modeling relationships between variables',
    difficulty: 'beginner' as const,
    category: 'machine_learning',
    tags: ['regression', 'statistics', 'predictive modeling']
  },
  {
    id: 2,
    title: 'Decision Trees',
    summary: 'Tree-based models that make decisions by splitting data based on feature values',
    difficulty: 'intermediate' as const,
    category: 'machine_learning',
    tags: ['classification', 'regression', 'tree-based models']
  }
]

const featuredTutorials = [
  {
    id: 1,
    title: 'Building Your First Machine Learning Model',
    description: 'Learn how to build, train, and evaluate a simple machine learning model using scikit-learn',
    difficulty: 'beginner' as const,
    estimated_time: 60,
    category: 'machine_learning',
    tags: ['scikit-learn', 'classification', 'python']
  },
  {
    id: 2,
    title: 'Exploratory Data Analysis with Pandas',
    description: 'Master the essential techniques for exploring and understanding your data before modeling',
    difficulty: 'beginner' as const,
    estimated_time: 45,
    category: 'data_analysis',
    tags: ['pandas', 'visualization', 'data cleaning']
  }
]

const featuredLearningPaths = [
  {
    id: 1,
    title: 'Data Science Fundamentals',
    description: 'A comprehensive path to learn the core concepts and skills of data science',
    difficulty: 'beginner' as const,
    estimated_time: 600, // 10 hours
    items_count: 12
  },
  {
    id: 2,
    title: 'Machine Learning Specialist',
    description: 'Master machine learning algorithms, evaluation techniques, and deployment strategies',
    difficulty: 'intermediate' as const,
    estimated_time: 900, // 15 hours
    items_count: 15
  }
]

// Mock user progress data
const mockUserProgress = {
  concepts: [
    {
      id: 1,
      title: 'Linear Regression',
      difficulty: 'beginner' as const,
      category: 'machine_learning',
      progress_percentage: 100,
      completed: true,
      last_accessed: '2023-06-15T14:30:00Z'
    }
  ],
  tutorials: [
    {
      id: 1,
      title: 'Building Your First Machine Learning Model',
      difficulty: 'beginner' as const,
      category: 'machine_learning',
      estimated_time: 60,
      progress_percentage: 75,
      completed: false,
      last_accessed: '2023-06-20T10:15:00Z'
    }
  ],
  learning_paths: [
    {
      id: 1,
      title: 'Data Science Fundamentals',
      difficulty: 'beginner' as const,
      estimated_time: 600,
      progress_percentage: 25,
      completed: false,
      last_accessed: '2023-06-18T16:45:00Z'
    }
  ]
}

const mockStats = {
  total_concepts: 50,
  completed_concepts: 1,
  total_tutorials: 20,
  completed_tutorials: 0,
  total_learning_paths: 5,
  completed_learning_paths: 0,
  total_exercises: 30,
  completed_exercises: 3,
  total_quizzes: 15,
  completed_quizzes: 2
}

const mockCertificates = [
  {
    id: 1,
    title: 'Python for Data Science',
    issued_date: '2023-05-10T09:00:00Z',
    type: 'tutorial' as const
  }
]

// Difficulty badge colors
const difficultyColors = {
  beginner: 'bg-green-100 text-green-800 hover:bg-green-200',
  intermediate: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
  advanced: 'bg-red-100 text-red-800 hover:bg-red-200'
}

export default function EducationPage() {
  return (
    <div className="container py-6 space-y-8">
      <h1 className="text-3xl font-bold mb-2">Education Hub</h1>
      <p className="text-muted-foreground mb-6">
        Explore educational content, tutorials, and learning paths to master data science concepts and techniques.
      </p>
      
      {/* Search Section */}
      <section>
        <KnowledgeBaseSearch 
          onConceptSelect={(id) => console.log('Selected concept:', id)}
          onTutorialSelect={(id) => console.log('Selected tutorial:', id)}
        />
      </section>
      
      {/* Featured Content Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Featured Content</h2>
        
        <Tabs defaultValue="concepts">
          <TabsList className="mb-4">
            <TabsTrigger value="concepts" className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              Concepts
            </TabsTrigger>
            <TabsTrigger value="tutorials" className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              Tutorials
            </TabsTrigger>
            <TabsTrigger value="paths" className="flex items-center gap-1">
              <Award className="h-4 w-4" />
              Learning Paths
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="concepts" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {featuredConcepts.map((concept) => (
                <Card key={concept.id} className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-muted-foreground" />
                        <CardTitle className="text-lg">{concept.title}</CardTitle>
                      </div>
                      <Badge className={difficultyColors[concept.difficulty] || ''}>
                        {concept.difficulty}
                      </Badge>
                    </div>
                    <CardDescription>{concept.summary}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <div className="flex justify-between items-center w-full">
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">{concept.category}</Badge>
                        {concept.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/education/concepts/${concept.id}`}>
                          Learn
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <div className="mt-4 text-center">
              <Button asChild>
                <Link href="/education/concepts">
                  Browse All Concepts
                </Link>
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="tutorials" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {featuredTutorials.map((tutorial) => (
                <Card key={tutorial.id} className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                      </div>
                      <Badge className={difficultyColors[tutorial.difficulty] || ''}>
                        {tutorial.difficulty}
                      </Badge>
                    </div>
                    <CardDescription>{tutorial.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <div className="flex justify-between items-center w-full">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{tutorial.category}</Badge>
                        <span className="text-sm text-muted-foreground">
                          {tutorial.estimated_time} min
                        </span>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/education/tutorials/${tutorial.id}`}>
                          Start
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <div className="mt-4 text-center">
              <Button asChild>
                <Link href="/education/tutorials">
                  Browse All Tutorials
                </Link>
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="paths" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {featuredLearningPaths.map((path) => (
                <Card key={path.id} className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-muted-foreground" />
                        <CardTitle className="text-lg">{path.title}</CardTitle>
                      </div>
                      <Badge className={difficultyColors[path.difficulty] || ''}>
                        {path.difficulty}
                      </Badge>
                    </div>
                    <CardDescription>{path.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <div className="flex justify-between items-center w-full">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{path.items_count} items</span>
                        <span>•</span>
                        <span>{Math.round(path.estimated_time / 60)} hours</span>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/education/learning-paths/${path.id}`}>
                          Explore
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <div className="mt-4 text-center">
              <Button asChild>
                <Link href="/education/learning-paths">
                  Browse All Learning Paths
                </Link>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </section>
      
      {/* Learning Progress Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Your Learning Progress</h2>
        
        <LearningProgress 
          userId={1}
          userProgress={mockUserProgress}
          stats={mockStats}
          certificates={mockCertificates}
        />
      </section>
      
      {/* AI Assistant */}
      <AIAssistant 
        onConceptSelect={(id) => console.log('Selected concept from AI assistant:', id)}
        onTutorialSelect={(id) => console.log('Selected tutorial from AI assistant:', id)}
      />
    </div>
  )
}
