/**
 * Learning Path Detail Page
 * 
 * This page displays a learning path with its items (concepts and tutorials)
 * and tracks user progress through the path.
 */
import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { AIAssistant } from '@/components/education/AIAssistant'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ChevronLeft, Award, BookOpen, FileText, Clock, CheckCircle, Lock, ArrowRight } from 'lucide-react'

// Difficulty badge colors
const difficultyColors = {
  beginner: 'bg-green-100 text-green-800 hover:bg-green-200',
  intermediate: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
  advanced: 'bg-red-100 text-red-800 hover:bg-red-200'
}

// Mock data for learning paths (in a real app, this would come from the database)
const mockLearningPaths = [
  {
    id: "1",
    title: "Data Science Fundamentals",
    description: "A comprehensive path to learn the core concepts and skills of data science",
    difficulty: "beginner" as const,
    estimated_time: 600, // 10 hours
    prerequisites: ["Basic Python", "Basic Math"],
    items: [
      {
        id: "1-1",
        type: "concept" as const,
        title: "Introduction to Data Science",
        description: "Learn what data science is and why it's important",
        difficulty: "beginner" as const,
        estimated_time: 15,
        required: true,
        completed: true,
        order: 1
      },
      {
        id: "1-2",
        type: "concept" as const,
        title: "Data Types and Structures",
        description: "Understand different types of data and how they're structured",
        difficulty: "beginner" as const,
        estimated_time: 20,
        required: true,
        completed: true,
        order: 2
      },
      {
        id: "1-3",
        type: "tutorial" as const,
        title: "Data Cleaning with Pandas",
        description: "Learn how to clean and preprocess data using Pandas",
        difficulty: "beginner" as const,
        estimated_time: 45,
        required: true,
        completed: false,
        order: 3
      },
      {
        id: "1-4",
        type: "concept" as const,
        title: "Descriptive Statistics",
        description: "Learn about measures of central tendency, dispersion, and distribution shapes",
        difficulty: "beginner" as const,
        estimated_time: 30,
        required: true,
        completed: false,
        order: 4
      },
      {
        id: "1-5",
        type: "tutorial" as const,
        title: "Exploratory Data Analysis",
        description: "Learn how to explore and visualize data to uncover patterns and insights",
        difficulty: "beginner" as const,
        estimated_time: 60,
        required: true,
        completed: false,
        order: 5
      },
      {
        id: "1-6",
        type: "concept" as const,
        title: "Linear Regression",
        description: "Understand the fundamentals of linear regression for predictive modeling",
        difficulty: "beginner" as const,
        estimated_time: 30,
        required: true,
        completed: false,
        order: 6
      },
      {
        id: "1-7",
        type: "tutorial" as const,
        title: "Building Your First Machine Learning Model",
        description: "Learn how to build, train, and evaluate a simple machine learning model",
        difficulty: "beginner" as const,
        estimated_time: 60,
        required: true,
        completed: false,
        order: 7
      }
    ]
  }
]

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  // In a real app, fetch the learning path from the database
  const learningPath = mockLearningPaths.find(lp => lp.id === params.id)
  
  if (!learningPath) {
    return {
      title: 'Learning Path Not Found',
      description: 'The requested learning path could not be found.'
    }
  }
  
  return {
    title: `${learningPath.title} | Data Science Learning Platform`,
    description: learningPath.description,
  }
}

export default function LearningPathPage({ params }: { params: { id: string } }) {
  // In a real app, fetch the learning path from the database
  const learningPath = mockLearningPaths.find(lp => lp.id === params.id)
  
  // If learning path not found, show 404 page
  if (!learningPath) {
    notFound()
  }
  
  // Calculate progress
  const totalItems = learningPath.items.length
  const completedItems = learningPath.items.filter(item => item.completed).length
  const progressPercentage = Math.round((completedItems / totalItems) * 100)
  
  // Get the next incomplete item
  const nextItem = learningPath.items.find(item => !item.completed)
  
  // Format time
  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`
    }
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return remainingMinutes > 0 
      ? `${hours} hr ${remainingMinutes} min` 
      : `${hours} hr`
  }
  
  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/education/learning-paths">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Learning Paths
          </Link>
        </Button>
      </div>
      
      <div className="flex items-center gap-2">
        <Award className="h-5 w-5 text-primary" />
        <h1 className="text-3xl font-bold">{learningPath.title}</h1>
      </div>
      
      {/* Learning Path Overview */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{learningPath.title}</CardTitle>
              <CardDescription className="mt-2">{learningPath.description}</CardDescription>
            </div>
            <Badge className={difficultyColors[learningPath.difficulty] || ''}>
              {learningPath.difficulty.charAt(0).toUpperCase() + learningPath.difficulty.slice(1)}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Estimated time: {formatTime(learningPath.estimated_time)}
            </span>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Prerequisites</h3>
              <div className="flex flex-wrap gap-2">
                {learningPath.prerequisites.map((prereq) => (
                  <Badge key={prereq} variant="outline">
                    {prereq}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">What You'll Learn</h3>
              <ul className="list-disc pl-5 space-y-1">
                {learningPath.items.slice(0, 3).map((item) => (
                  <li key={item.id} className="text-sm">{item.title}</li>
                ))}
                {learningPath.items.length > 3 && (
                  <li className="text-sm">And {learningPath.items.length - 3} more topics...</li>
                )}
              </ul>
            </div>
          </div>
        </CardContent>
        
        <CardFooter>
          <div className="w-full space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{progressPercentage}% ({completedItems}/{totalItems} items)</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </CardFooter>
      </Card>
      
      {/* Next Item */}
      {nextItem && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Continue Learning</h2>
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  {nextItem.type === 'concept' ? (
                    <BookOpen className="h-5 w-5 text-primary" />
                  ) : (
                    <FileText className="h-5 w-5 text-primary" />
                  )}
                  <CardTitle>{nextItem.title}</CardTitle>
                </div>
                <Badge variant="outline">
                  {nextItem.type.charAt(0).toUpperCase() + nextItem.type.slice(1)}
                </Badge>
              </div>
              <CardDescription>{nextItem.description}</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{formatTime(nextItem.estimated_time)}</span>
                </div>
                <Badge className={difficultyColors[nextItem.difficulty] || ''}>
                  {nextItem.difficulty}
                </Badge>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button asChild>
                <Link href={`/education/${nextItem.type}s/${nextItem.id}`}>
                  {nextItem.type === 'concept' ? 'Start Learning' : 'Start Tutorial'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
      
      {/* Learning Path Items */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Learning Path Content</h2>
        
        <div className="space-y-4">
          {learningPath.items.map((item, index) => {
            // Determine if the item is locked (can't be accessed yet)
            // An item is locked if any required item before it is not completed
            const isLocked = !item.completed && 
              learningPath.items
                .filter(i => i.order < item.order && i.required)
                .some(i => !i.completed)
            
            return (
              <Card 
                key={item.id} 
                className={`
                  ${item.completed ? 'border-green-200 dark:border-green-800' : ''}
                  ${isLocked ? 'opacity-70' : ''}
                `}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-muted text-xs font-medium">
                        {index + 1}
                      </div>
                      <div className="flex items-center gap-2">
                        {item.type === 'concept' ? (
                          <BookOpen className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <FileText className="h-4 w-4 text-muted-foreground" />
                        )}
                        <CardTitle className="text-base">{item.title}</CardTitle>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.completed ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : isLocked ? (
                        <Lock className="h-5 w-5 text-muted-foreground" />
                      ) : null}
                      <Badge variant="outline">
                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="pb-2">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{formatTime(item.estimated_time)}</span>
                    </div>
                    <Badge className={difficultyColors[item.difficulty] || ''}>
                      {item.difficulty}
                    </Badge>
                    {item.required && (
                      <Badge variant="outline">Required</Badge>
                    )}
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    variant={item.completed ? "outline" : "default"}
                    asChild
                    disabled={isLocked}
                  >
                    <Link href={`/education/${item.type}s/${item.id}`}>
                      {item.completed ? 'Review' : 'Start'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>
      
      {/* Certificate Section */}
      {progressPercentage === 100 && (
        <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
              <Award className="h-5 w-5" />
              Learning Path Completed!
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <p>Congratulations on completing the {learningPath.title} learning path! You've mastered all the required concepts and tutorials.</p>
            
            <Button className="mt-4">
              <Award className="h-4 w-4 mr-2" />
              Get Completion Certificate
            </Button>
          </CardContent>
        </Card>
      )}
      
      {/* AI Assistant */}
      <AIAssistant 
        currentContext={{
          type: 'learning_path',
          id: learningPath.id,
          title: learningPath.title
        }}
        onConceptSelect={(id) => console.log(`Selected concept from AI assistant: ${id}`)}
        onTutorialSelect={(id) => console.log(`Selected tutorial from AI assistant: ${id}`)}
      />
    </div>
  )
}
