import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { LucideBarChart2, LucideEdit, LucideTrash2 } from "lucide-react"

interface Project {
  id: string
  name: string
  description: string
  lastUpdated: string
  progress: number
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{project.name}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{project.progress}%</span>
          </div>
          <Progress value={project.progress} />
          <p className="text-xs text-muted-foreground">Last updated: {project.lastUpdated}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={`/projects/${project.id}`}>
          <Button variant="outline" size="sm">
            <LucideBarChart2 className="mr-2 h-4 w-4" />
            Open
          </Button>
        </Link>
        <div className="flex gap-2">
          <Link href={`/projects/${project.id}/edit`}>
            <Button variant="ghost" size="sm">
              <LucideEdit className="h-4 w-4" />
            </Button>
          </Link>
          <Button variant="ghost" size="sm">
            <LucideTrash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
