/**
 * Education Admin Dashboard
 * 
 * This page provides an interface for managing educational content,
 * including concepts, tutorials, and learning paths.
 */
import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { BookOpen, FileText, Award, Plus, Search, Edit, Trash2, Eye } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Education Admin | Data Science Learning Platform',
  description: 'Manage educational content including concepts, tutorials, and learning paths.',
}

// Mock data for concepts
const mockConcepts = [
  {
    id: "1",
    title: "Linear Regression",
    category: "machine_learning",
    difficulty: "beginner" as const,
    created_at: "2023-05-10T09:00:00Z",
    updated_at: "2023-05-15T14:30:00Z"
  },
  {
    id: "2",
    title: "Decision Trees",
    category: "machine_learning",
    difficulty: "intermediate" as const,
    created_at: "2023-05-12T11:20:00Z",
    updated_at: "2023-05-16T10:15:00Z"
  }
]

// Mock data for tutorials
const mockTutorials = [
  {
    id: "1",
    title: "Building Your First Machine Learning Model",
    category: "machine_learning",
    difficulty: "beginner" as const,
    created_at: "2023-05-20T13:45:00Z",
    updated_at: "2023-05-25T09:30:00Z"
  }
]

// Mock data for learning paths
const mockLearningPaths = [
  {
    id: "1",
    title: "Data Science Fundamentals",
    difficulty: "beginner" as const,
    items_count: 7,
    created_at: "2023-06-01T10:00:00Z",
    updated_at: "2023-06-10T15:20:00Z"
  }
]

// Difficulty badge colors
const difficultyColors = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-yellow-100 text-yellow-800',
  advanced: 'bg-red-100 text-red-800'
}

export default function EducationAdminPage() {
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }
  
  return (
    <div className="container py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Education Admin</h1>
        
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/education">
              <Eye className="h-4 w-4 mr-2" />
              View Education Hub
            </Link>
          </Button>
        </div>
      </div>
      
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
          <TabsTrigger value="learning-paths" className="flex items-center gap-1">
            <Award className="h-4 w-4" />
            Learning Paths
          </TabsTrigger>
        </TabsList>
        
        {/* Concepts Tab */}
        <TabsContent value="concepts" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search concepts..."
                className="pl-10"
              />
            </div>
            
            <Button asChild>
              <Link href="/admin/education/concepts/new">
                <Plus className="h-4 w-4 mr-2" />
                New Concept
              </Link>
            </Button>
          </div>
          
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">Title</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Category</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Difficulty</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Created</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Updated</th>
                  <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {mockConcepts.map((concept) => (
                  <tr key={concept.id} className="hover:bg-muted/50">
                    <td className="px-4 py-3 text-sm">{concept.title}</td>
                    <td className="px-4 py-3 text-sm">{concept.category}</td>
                    <td className="px-4 py-3 text-sm">
                      <Badge className={difficultyColors[concept.difficulty]}>
                        {concept.difficulty}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm">{formatDate(concept.created_at)}</td>
                    <td className="px-4 py-3 text-sm">{formatDate(concept.updated_at)}</td>
                    <td className="px-4 py-3 text-sm text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/education/concepts/${concept.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/admin/education/concepts/${concept.id}/edit`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
        
        {/* Tutorials Tab */}
        <TabsContent value="tutorials" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search tutorials..."
                className="pl-10"
              />
            </div>
            
            <Button asChild>
              <Link href="/admin/education/tutorials/new">
                <Plus className="h-4 w-4 mr-2" />
                New Tutorial
              </Link>
            </Button>
          </div>
          
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">Title</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Category</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Difficulty</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Created</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Updated</th>
                  <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {mockTutorials.map((tutorial) => (
                  <tr key={tutorial.id} className="hover:bg-muted/50">
                    <td className="px-4 py-3 text-sm">{tutorial.title}</td>
                    <td className="px-4 py-3 text-sm">{tutorial.category}</td>
                    <td className="px-4 py-3 text-sm">
                      <Badge className={difficultyColors[tutorial.difficulty]}>
                        {tutorial.difficulty}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm">{formatDate(tutorial.created_at)}</td>
                    <td className="px-4 py-3 text-sm">{formatDate(tutorial.updated_at)}</td>
                    <td className="px-4 py-3 text-sm text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/education/tutorials/${tutorial.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/admin/education/tutorials/${tutorial.id}/edit`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
        
        {/* Learning Paths Tab */}
        <TabsContent value="learning-paths" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search learning paths..."
                className="pl-10"
              />
            </div>
            
            <Button asChild>
              <Link href="/admin/education/learning-paths/new">
                <Plus className="h-4 w-4 mr-2" />
                New Learning Path
              </Link>
            </Button>
          </div>
          
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">Title</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Difficulty</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Items</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Created</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Updated</th>
                  <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {mockLearningPaths.map((path) => (
                  <tr key={path.id} className="hover:bg-muted/50">
                    <td className="px-4 py-3 text-sm">{path.title}</td>
                    <td className="px-4 py-3 text-sm">
                      <Badge className={difficultyColors[path.difficulty]}>
                        {path.difficulty}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm">{path.items_count}</td>
                    <td className="px-4 py-3 text-sm">{formatDate(path.created_at)}</td>
                    <td className="px-4 py-3 text-sm">{formatDate(path.updated_at)}</td>
                    <td className="px-4 py-3 text-sm text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/education/learning-paths/${path.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/admin/education/learning-paths/${path.id}/edit`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
