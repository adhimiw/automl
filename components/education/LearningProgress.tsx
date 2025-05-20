/**
 * Learning Progress Component
 * 
 * This component displays a user's learning progress, including
 * completed concepts, tutorials, and learning paths.
 */
import React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CheckCircle, Clock, Award, BookOpen, FileText, ArrowRight } from 'lucide-react'

// Difficulty badge colors
const difficultyColors = {
  beginner: 'bg-green-100 text-green-800 hover:bg-green-200',
  intermediate: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
  advanced: 'bg-red-100 text-red-800 hover:bg-red-200'
}

interface LearningProgressProps {
  userId: number
  userProgress: {
    concepts: {
      id: number
      title: string
      difficulty: 'beginner' | 'intermediate' | 'advanced'
      category: string
      progress_percentage: number
      completed: boolean
      last_accessed: string
    }[]
    tutorials: {
      id: number
      title: string
      difficulty: 'beginner' | 'intermediate' | 'advanced'
      category: string
      estimated_time: number
      progress_percentage: number
      completed: boolean
      last_accessed: string
    }[]
    learning_paths: {
      id: number
      title: string
      difficulty: 'beginner' | 'intermediate' | 'advanced'
      estimated_time: number
      progress_percentage: number
      completed: boolean
      last_accessed: string
    }[]
  }
  stats: {
    total_concepts: number
    completed_concepts: number
    total_tutorials: number
    completed_tutorials: number
    total_learning_paths: number
    completed_learning_paths: number
    total_exercises: number
    completed_exercises: number
    total_quizzes: number
    completed_quizzes: number
  }
  certificates: {
    id: number
    title: string
    issued_date: string
    type: 'tutorial' | 'learning_path'
  }[]
}

export function LearningProgress({
  userId,
  userProgress,
  stats,
  certificates
}: LearningProgressProps) {
  // Calculate overall progress
  const totalItems = stats.total_concepts + stats.total_tutorials + stats.total_learning_paths
  const completedItems = stats.completed_concepts + stats.completed_tutorials + stats.completed_learning_paths
  const overallProgress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0
  
  // Sort progress items by last accessed date (most recent first)
  const sortedConcepts = [...userProgress.concepts].sort(
    (a, b) => new Date(b.last_accessed).getTime() - new Date(a.last_accessed).getTime()
  )
  
  const sortedTutorials = [...userProgress.tutorials].sort(
    (a, b) => new Date(b.last_accessed).getTime() - new Date(a.last_accessed).getTime()
  )
  
  const sortedLearningPaths = [...userProgress.learning_paths].sort(
    (a, b) => new Date(b.last_accessed).getTime() - new Date(a.last_accessed).getTime()
  )
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }
  
  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Learning Progress</CardTitle>
          <CardDescription>Track your educational journey</CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-6">
            {/* Overall Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Progress</span>
                <span>{overallProgress}%</span>
              </div>
              <Progress value={overallProgress} className="h-2" />
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Concepts</h3>
                </div>
                <p className="text-2xl font-bold">
                  {stats.completed_concepts}/{stats.total_concepts}
                </p>
                <Progress 
                  value={stats.total_concepts > 0 ? (stats.completed_concepts / stats.total_concepts) * 100 : 0} 
                  className="h-1 mt-2" 
                />
              </div>
              
              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Tutorials</h3>
                </div>
                <p className="text-2xl font-bold">
                  {stats.completed_tutorials}/{stats.total_tutorials}
                </p>
                <Progress 
                  value={stats.total_tutorials > 0 ? (stats.completed_tutorials / stats.total_tutorials) * 100 : 0} 
                  className="h-1 mt-2" 
                />
              </div>
              
              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Certificates</h3>
                </div>
                <p className="text-2xl font-bold">
                  {certificates.length}
                </p>
              </div>
              
              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Exercises</h3>
                </div>
                <p className="text-2xl font-bold">
                  {stats.completed_exercises}/{stats.total_exercises}
                </p>
                <Progress 
                  value={stats.total_exercises > 0 ? (stats.completed_exercises / stats.total_exercises) * 100 : 0} 
                  className="h-1 mt-2" 
                />
              </div>
              
              <div className="bg-muted rounded-lg p-4 col-span-2 md:col-span-1">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Learning Paths</h3>
                </div>
                <p className="text-2xl font-bold">
                  {stats.completed_learning_paths}/{stats.total_learning_paths}
                </p>
                <Progress 
                  value={stats.total_learning_paths > 0 ? (stats.completed_learning_paths / stats.total_learning_paths) * 100 : 0} 
                  className="h-1 mt-2" 
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Recent Activity & Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Your Learning Activity</CardTitle>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="recent">
            <TabsList className="mb-4">
              <TabsTrigger value="recent">Recent Activity</TabsTrigger>
              <TabsTrigger value="concepts">Concepts</TabsTrigger>
              <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
              <TabsTrigger value="paths">Learning Paths</TabsTrigger>
              <TabsTrigger value="certificates">Certificates</TabsTrigger>
            </TabsList>
            
            {/* Recent Activity Tab */}
            <TabsContent value="recent" className="space-y-4">
              <h3 className="text-lg font-medium">Recently Accessed</h3>
              
              {[
                ...sortedConcepts.map(item => ({ ...item, type: 'concept' })),
                ...sortedTutorials.map(item => ({ ...item, type: 'tutorial' })),
                ...sortedLearningPaths.map(item => ({ ...item, type: 'path' }))
              ]
                .sort((a, b) => new Date(b.last_accessed).getTime() - new Date(a.last_accessed).getTime())
                .slice(0, 5)
                .map((item) => (
                  <Card key={`${item.type}-${item.id}`}>
                    <CardHeader className="py-3">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          {item.type === 'concept' && <BookOpen className="h-4 w-4 text-muted-foreground" />}
                          {item.type === 'tutorial' && <FileText className="h-4 w-4 text-muted-foreground" />}
                          {item.type === 'path' && <Award className="h-4 w-4 text-muted-foreground" />}
                          <CardTitle className="text-base">{item.title}</CardTitle>
                        </div>
                        <Badge className={difficultyColors[item.difficulty] || ''}>
                          {item.difficulty}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="py-0">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">
                          Last accessed: {formatDate(item.last_accessed)}
                        </span>
                        <span>{item.progress_percentage}% complete</span>
                      </div>
                      <Progress value={item.progress_percentage} className="h-1 mt-2" />
                    </CardContent>
                    
                    <CardFooter className="py-3">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/education/${item.type}s/${item.id}`}>
                          Continue Learning
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              
              {[...sortedConcepts, ...sortedTutorials, ...sortedLearningPaths].length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">You haven't started learning yet. Explore our educational content to begin your journey!</p>
                  <Button className="mt-4" asChild>
                    <Link href="/education">
                      Browse Educational Content
                    </Link>
                  </Button>
                </div>
              )}
            </TabsContent>
            
            {/* Concepts Tab */}
            <TabsContent value="concepts" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Your Concepts</h3>
                <Badge variant="outline">
                  {stats.completed_concepts}/{stats.total_concepts} completed
                </Badge>
              </div>
              
              {sortedConcepts.map((concept) => (
                <Card key={concept.id}>
                  <CardHeader className="py-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <CardTitle className="text-base">{concept.title}</CardTitle>
                      </div>
                      <Badge className={difficultyColors[concept.difficulty] || ''}>
                        {concept.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="py-0">
                    <div className="flex justify-between items-center text-sm">
                      <Badge variant="secondary">{concept.category}</Badge>
                      <span>{concept.progress_percentage}% complete</span>
                    </div>
                    <Progress value={concept.progress_percentage} className="h-1 mt-2" />
                  </CardContent>
                  
                  <CardFooter className="py-3">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/education/concepts/${concept.id}`}>
                        {concept.completed ? 'Review Concept' : 'Continue Learning'}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              
              {sortedConcepts.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">You haven't explored any concepts yet.</p>
                  <Button className="mt-4" asChild>
                    <Link href="/education/concepts">
                      Browse Concepts
                    </Link>
                  </Button>
                </div>
              )}
            </TabsContent>
            
            {/* Tutorials Tab */}
            <TabsContent value="tutorials" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Your Tutorials</h3>
                <Badge variant="outline">
                  {stats.completed_tutorials}/{stats.total_tutorials} completed
                </Badge>
              </div>
              
              {sortedTutorials.map((tutorial) => (
                <Card key={tutorial.id}>
                  <CardHeader className="py-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <CardTitle className="text-base">{tutorial.title}</CardTitle>
                      </div>
                      <Badge className={difficultyColors[tutorial.difficulty] || ''}>
                        {tutorial.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="py-0">
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{tutorial.category}</Badge>
                        <span className="text-muted-foreground">
                          <Clock className="inline h-3 w-3 mr-1" />
                          {tutorial.estimated_time} min
                        </span>
                      </div>
                      <span>{tutorial.progress_percentage}% complete</span>
                    </div>
                    <Progress value={tutorial.progress_percentage} className="h-1 mt-2" />
                  </CardContent>
                  
                  <CardFooter className="py-3">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/education/tutorials/${tutorial.id}`}>
                        {tutorial.completed ? 'Review Tutorial' : 'Continue Tutorial'}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              
              {sortedTutorials.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">You haven't started any tutorials yet.</p>
                  <Button className="mt-4" asChild>
                    <Link href="/education/tutorials">
                      Browse Tutorials
                    </Link>
                  </Button>
                </div>
              )}
            </TabsContent>
            
            {/* Learning Paths Tab */}
            <TabsContent value="paths" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Your Learning Paths</h3>
                <Badge variant="outline">
                  {stats.completed_learning_paths}/{stats.total_learning_paths} completed
                </Badge>
              </div>
              
              {sortedLearningPaths.map((path) => (
                <Card key={path.id}>
                  <CardHeader className="py-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-muted-foreground" />
                        <CardTitle className="text-base">{path.title}</CardTitle>
                      </div>
                      <Badge className={difficultyColors[path.difficulty] || ''}>
                        {path.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="py-0">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">
                        <Clock className="inline h-3 w-3 mr-1" />
                        {path.estimated_time} min total
                      </span>
                      <span>{path.progress_percentage}% complete</span>
                    </div>
                    <Progress value={path.progress_percentage} className="h-1 mt-2" />
                  </CardContent>
                  
                  <CardFooter className="py-3">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/education/learning-paths/${path.id}`}>
                        {path.completed ? 'Review Path' : 'Continue Path'}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              
              {sortedLearningPaths.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">You haven't joined any learning paths yet.</p>
                  <Button className="mt-4" asChild>
                    <Link href="/education/learning-paths">
                      Browse Learning Paths
                    </Link>
                  </Button>
                </div>
              )}
            </TabsContent>
            
            {/* Certificates Tab */}
            <TabsContent value="certificates" className="space-y-4">
              <h3 className="text-lg font-medium">Your Certificates</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certificates.map((certificate) => (
                  <Card key={certificate.id} className="bg-muted/50 border-primary/20">
                    <CardHeader className="py-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <Badge variant="outline" className="mb-2">
                            {certificate.type === 'tutorial' ? 'Tutorial' : 'Learning Path'}
                          </Badge>
                          <CardTitle className="text-base">{certificate.title}</CardTitle>
                        </div>
                        <Award className="h-6 w-6 text-primary" />
                      </div>
                    </CardHeader>
                    
                    <CardContent className="py-0">
                      <p className="text-sm text-muted-foreground">
                        Issued on {formatDate(certificate.issued_date)}
                      </p>
                    </CardContent>
                    
                    <CardFooter className="py-3">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/education/certificates/${certificate.id}`}>
                          View Certificate
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              {certificates.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">You haven't earned any certificates yet. Complete tutorials and learning paths to earn certificates!</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
