"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LucideBarChart2, LucideEdit, LucideTrash2 } from "lucide-react"

interface Project {
  id: number
  name: string
  description: string
  user_id: number
  created_at: string
  updated_at: string
}

export function RecentProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true)

      try {
        // Fetch real projects from the API
        const response = await fetch('/api/projects')

        if (response.ok) {
          const data = await response.json()
          setProjects(data)
        } else {
          console.error('Failed to fetch projects:', response.statusText)
          // Fallback to empty array if API fails
          setProjects([])
        }
      } catch (error) {
        console.error('Error fetching projects:', error)
        setProjects([])
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-5 w-1/3 animate-pulse rounded bg-muted"></div>
            <div className="h-4 w-full animate-pulse rounded bg-muted"></div>
            <div className="h-3 w-full animate-pulse rounded bg-muted"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {projects.length > 0 ? (
        projects.map((project) => (
          <div key={project.id} className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <Link href={`/dashboard/projects/${project.id}`} className="font-medium hover:underline">
                {project.name}
              </Link>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`/dashboard/projects/${project.id}/edit`}>
                    <LucideEdit className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon">
                  <LucideTrash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{project.description || "No description provided."}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                Created: {new Date(project.created_at).toLocaleDateString()}
              </span>
              <Link href={`/dashboard/projects/${project.id}`}>
                <Button variant="outline" size="sm">
                  <LucideBarChart2 className="mr-2 h-4 w-4" />
                  Open
                </Button>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-4">
          <p className="text-muted-foreground">No projects found. Create your first project to get started.</p>
          <Button className="mt-2" asChild>
            <Link href="/dashboard/projects/new">Create Project</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
