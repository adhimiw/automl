/**
 * Tutorial Player Component
 * 
 * This component displays a tutorial with steps, exercises, and quizzes.
 * It tracks user progress through the tutorial.
 */
import React, { useState } from 'react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { CheckCircle, Clock, Code, FileText, HelpCircle, ListChecks } from 'lucide-react'
import { VisualAid } from '@/lib/education/content-generator'

// Difficulty badge colors
const difficultyColors = {
  beginner: 'bg-green-100 text-green-800 hover:bg-green-200',
  intermediate: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
  advanced: 'bg-red-100 text-red-800 hover:bg-red-200'
}

interface TutorialStep {
  id: string | number
  title: string
  content: string
  code?: string
  visual_aids?: VisualAid[]
  estimated_time?: number
  checkpoint?: boolean
  order: number
}

interface Exercise {
  id: string | number
  title: string
  description: string
  instructions: string
  starter_code?: string
  solution_code: string
  validation_tests: string
  hints: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

interface QuizQuestion {
  id: string | number
  question: string
  options: string[]
  correct_answer: number
  explanation: string
}

interface TutorialPlayerProps {
  tutorial: {
    id: string | number
    title: string
    description: string
    summary: string
    learning_objectives: string[]
    prerequisites: string[]
    estimated_time: number
    difficulty: 'beginner' | 'intermediate' | 'advanced'
    category: string
    tags: string[]
    completion_certificate: boolean
    steps: TutorialStep[]
    exercises: Exercise[]
    quiz_questions: QuizQuestion[]
  }
  onStepComplete?: (stepId: string | number) => void
  onExerciseComplete?: (exerciseId: string | number, isCorrect: boolean) => void
  onQuizComplete?: (score: number, total: number) => void
  onTutorialComplete?: () => void
  userProgress?: {
    completedSteps: (string | number)[]
    completedExercises: (string | number)[]
    answeredQuestions: { id: string | number, isCorrect: boolean }[]
    progress_percentage: number
  }
}

export function TutorialPlayer({
  tutorial,
  onStepComplete,
  onExerciseComplete,
  onQuizComplete,
  onTutorialComplete,
  userProgress = {
    completedSteps: [],
    completedExercises: [],
    answeredQuestions: [],
    progress_percentage: 0
  }
}: TutorialPlayerProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [activeTab, setActiveTab] = useState('content')
  const [exerciseCode, setExerciseCode] = useState<Record<string | number, string>>({})
  const [quizAnswers, setQuizAnswers] = useState<Record<string | number, number>>({})
  const [showSolution, setShowSolution] = useState<Record<string | number, boolean>>({})
  const [showExplanation, setShowExplanation] = useState<Record<string | number, boolean>>({})
  const [visibleHints, setVisibleHints] = useState<Record<string | number, number>>({})
  
  const currentStep = tutorial.steps[currentStepIndex]
  const sortedSteps = [...tutorial.steps].sort((a, b) => a.order - b.order)
  
  // Calculate progress
  const totalItems = tutorial.steps.length + tutorial.exercises.length + tutorial.quiz_questions.length
  const completedItems = 
    userProgress.completedSteps.length + 
    userProgress.completedExercises.length + 
    userProgress.answeredQuestions.length
  const progressPercentage = Math.round((completedItems / totalItems) * 100)
  
  // Handle step navigation
  const goToNextStep = () => {
    if (currentStepIndex < tutorial.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1)
      setActiveTab('content')
      window.scrollTo(0, 0)
    }
  }
  
  const goToPreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1)
      setActiveTab('content')
      window.scrollTo(0, 0)
    }
  }
  
  const goToStep = (index: number) => {
    setCurrentStepIndex(index)
    setActiveTab('content')
    window.scrollTo(0, 0)
  }
  
  // Handle exercise code changes
  const handleCodeChange = (exerciseId: string | number, code: string) => {
    setExerciseCode({
      ...exerciseCode,
      [exerciseId]: code
    })
  }
  
  // Handle exercise submission
  const handleExerciseSubmit = (exercise: Exercise) => {
    const code = exerciseCode[exercise.id] || exercise.starter_code || ''
    // In a real implementation, we would run the validation tests here
    // For now, we'll just simulate a successful submission
    const isCorrect = true
    onExerciseComplete?.(exercise.id, isCorrect)
  }
  
  // Handle quiz answer selection
  const handleQuizAnswerSelect = (questionId: string | number, answerIndex: number) => {
    setQuizAnswers({
      ...quizAnswers,
      [questionId]: answerIndex
    })
  }
  
  // Handle quiz submission
  const handleQuizSubmit = () => {
    const results = tutorial.quiz_questions.map(question => ({
      id: question.id,
      isCorrect: quizAnswers[question.id] === question.correct_answer
    }))
    
    const score = results.filter(r => r.isCorrect).length
    onQuizComplete?.(score, tutorial.quiz_questions.length)
    
    // Show explanations for all questions
    const newShowExplanation: Record<string | number, boolean> = {}
    tutorial.quiz_questions.forEach(question => {
      newShowExplanation[question.id] = true
    })
    setShowExplanation(newShowExplanation)
  }
  
  // Handle showing hints
  const showNextHint = (exerciseId: string | number, totalHints: number) => {
    const currentHintIndex = visibleHints[exerciseId] || 0
    if (currentHintIndex < totalHints) {
      setVisibleHints({
        ...visibleHints,
        [exerciseId]: currentHintIndex + 1
      })
    }
  }
  
  // Check if tutorial is complete
  const isTutorialComplete = progressPercentage === 100
  
  return (
    <div className="space-y-6">
      {/* Tutorial Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{tutorial.title}</CardTitle>
              <CardDescription className="mt-2">{tutorial.description}</CardDescription>
            </div>
            <Badge className={difficultyColors[tutorial.difficulty] || ''}>
              {tutorial.difficulty.charAt(0).toUpperCase() + tutorial.difficulty.slice(1)}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Estimated time: {tutorial.estimated_time} minutes
            </span>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Learning Objectives</h3>
              <ul className="list-disc pl-5 space-y-1">
                {tutorial.learning_objectives.map((objective, index) => (
                  <li key={index} className="text-sm">{objective}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Prerequisites</h3>
              <div className="flex flex-wrap gap-2">
                {tutorial.prerequisites.map((prereq) => (
                  <Badge key={prereq} variant="outline">
                    {prereq}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter>
          <div className="w-full space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{progressPercentage}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </CardFooter>
      </Card>
      
      {/* Tutorial Navigation */}
      <div className="flex gap-4">
        <div className="w-1/4 hidden md:block">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {sortedSteps.map((step, index) => (
                  <Button
                    key={step.id}
                    variant={currentStepIndex === index ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => goToStep(index)}
                  >
                    <div className="flex items-center gap-2">
                      {userProgress.completedSteps.includes(step.id) && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                      <span className="truncate">{index + 1}. {step.title}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex-1">
          {/* Current Step Content */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>{currentStep.title}</CardTitle>
                {currentStep.estimated_time && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {currentStep.estimated_time} min
                    </span>
                  </div>
                )}
              </div>
            </CardHeader>
            
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="content">Content</TabsTrigger>
                  {currentStep.code && <TabsTrigger value="code">Code</TabsTrigger>}
                  {currentStep.visual_aids && currentStep.visual_aids.length > 0 && (
                    <TabsTrigger value="visualizations">Visualizations</TabsTrigger>
                  )}
                </TabsList>
                
                <TabsContent value="content" className="min-h-[300px]">
                  <div 
                    className="prose max-w-none dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: currentStep.content }}
                  />
                </TabsContent>
                
                {currentStep.code && (
                  <TabsContent value="code" className="min-h-[300px]">
                    <pre className="bg-muted p-4 rounded-md overflow-auto">
                      <code>{currentStep.code}</code>
                    </pre>
                  </TabsContent>
                )}
                
                {currentStep.visual_aids && currentStep.visual_aids.length > 0 && (
                  <TabsContent value="visualizations" className="min-h-[300px]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentStep.visual_aids.map((aid, index) => (
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
                  </TabsContent>
                )}
              </Tabs>
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={goToPreviousStep}
                disabled={currentStepIndex === 0}
              >
                Previous
              </Button>
              
              <div className="flex gap-2">
                {!userProgress.completedSteps.includes(currentStep.id) && (
                  <Button 
                    variant="outline"
                    onClick={() => onStepComplete?.(currentStep.id)}
                  >
                    Mark as Completed
                  </Button>
                )}
                
                <Button 
                  onClick={goToNextStep}
                  disabled={currentStepIndex === tutorial.steps.length - 1}
                >
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
          
          {/* Exercises Section */}
          {tutorial.exercises.length > 0 && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Exercises
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {tutorial.exercises.map((exercise) => (
                    <AccordionItem key={exercise.id} value={exercise.id.toString()}>
                      <AccordionTrigger>
                        <div className="flex items-center gap-2">
                          {userProgress.completedExercises.includes(exercise.id) && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                          <span>{exercise.title}</span>
                          <Badge className={difficultyColors[exercise.difficulty] || ''}>
                            {exercise.difficulty}
                          </Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <p>{exercise.description}</p>
                          <div>
                            <h4 className="font-medium mb-2">Instructions</h4>
                            <p>{exercise.instructions}</p>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">Your Code</h4>
                            <textarea
                              className="w-full h-64 font-mono text-sm p-4 bg-muted rounded-md"
                              value={exerciseCode[exercise.id] || exercise.starter_code || ''}
                              onChange={(e) => handleCodeChange(exercise.id, e.target.value)}
                              placeholder="Write your code here..."
                            />
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            <Button 
                              onClick={() => handleExerciseSubmit(exercise)}
                              disabled={userProgress.completedExercises.includes(exercise.id)}
                            >
                              Submit Solution
                            </Button>
                            
                            <Button 
                              variant="outline"
                              onClick={() => setShowSolution({
                                ...showSolution,
                                [exercise.id]: !showSolution[exercise.id]
                              })}
                            >
                              {showSolution[exercise.id] ? 'Hide Solution' : 'Show Solution'}
                            </Button>
                            
                            {exercise.hints.length > 0 && (
                              <Button 
                                variant="outline"
                                onClick={() => showNextHint(exercise.id, exercise.hints.length)}
                                disabled={(visibleHints[exercise.id] || 0) >= exercise.hints.length}
                              >
                                <HelpCircle className="h-4 w-4 mr-2" />
                                {(visibleHints[exercise.id] || 0) === 0 
                                  ? 'Get Hint' 
                                  : `Hint ${visibleHints[exercise.id]}/${exercise.hints.length}`}
                              </Button>
                            )}
                          </div>
                          
                          {/* Hints */}
                          {(visibleHints[exercise.id] || 0) > 0 && (
                            <div className="bg-muted p-4 rounded-md">
                              <h4 className="font-medium mb-2">
                                Hint {visibleHints[exercise.id]}/{exercise.hints.length}
                              </h4>
                              <p>{exercise.hints[(visibleHints[exercise.id] || 1) - 1]}</p>
                            </div>
                          )}
                          
                          {/* Solution */}
                          {showSolution[exercise.id] && (
                            <div>
                              <h4 className="font-medium mb-2">Solution</h4>
                              <pre className="bg-muted p-4 rounded-md overflow-auto">
                                <code>{exercise.solution_code}</code>
                              </pre>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          )}
          
          {/* Quiz Section */}
          {tutorial.quiz_questions.length > 0 && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ListChecks className="h-5 w-5" />
                  Knowledge Check
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-6">
                  {tutorial.quiz_questions.map((question, index) => {
                    const isAnswered = userProgress.answeredQuestions.some(q => q.id === question.id)
                    const userAnswer = quizAnswers[question.id]
                    const isCorrect = userAnswer === question.correct_answer
                    
                    return (
                      <div key={question.id} className="space-y-4">
                        <h3 className="font-medium">
                          {index + 1}. {question.question}
                        </h3>
                        
                        <div className="space-y-2">
                          {question.options.map((option, optionIndex) => (
                            <div 
                              key={optionIndex}
                              className={`
                                p-3 rounded-md border cursor-pointer
                                ${userAnswer === optionIndex ? 'border-primary' : 'border-border'}
                                ${isAnswered && optionIndex === question.correct_answer ? 'bg-green-50 dark:bg-green-900/20' : ''}
                                ${isAnswered && userAnswer === optionIndex && !isCorrect ? 'bg-red-50 dark:bg-red-900/20' : ''}
                              `}
                              onClick={() => !isAnswered && handleQuizAnswerSelect(question.id, optionIndex)}
                            >
                              <div className="flex items-start">
                                <div className="flex-shrink-0">
                                  <div className={`
                                    w-5 h-5 rounded-full border flex items-center justify-center
                                    ${userAnswer === optionIndex ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'}
                                  `}>
                                    {String.fromCharCode(65 + optionIndex)}
                                  </div>
                                </div>
                                <div className="ml-3">
                                  <p>{option}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {showExplanation[question.id] && (
                          <div className="bg-muted p-4 rounded-md">
                            <h4 className="font-medium mb-2">Explanation</h4>
                            <p>{question.explanation}</p>
                          </div>
                        )}
                        
                        <Separator />
                      </div>
                    )
                  })}
                  
                  <Button onClick={handleQuizSubmit}>
                    Submit Answers
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Completion Section */}
          {isTutorialComplete && (
            <Card className="mt-6 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
                  <CheckCircle className="h-5 w-5" />
                  Tutorial Completed!
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <p>Congratulations on completing this tutorial! You've learned about {tutorial.title}.</p>
                
                {tutorial.completion_certificate && (
                  <Button className="mt-4" onClick={onTutorialComplete}>
                    <FileText className="h-4 w-4 mr-2" />
                    Get Completion Certificate
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
