"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Filter, MoreHorizontal, Trash2, Edit, Play } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { format } from "date-fns"

interface Model {
  id: string
  name: string
  description: string
  modelType: string
  status: string
  createdAt: string
  updatedAt: string
  metrics?: {
    accuracy?: number
    loss?: number
  }
}

export default function ModelsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [models, setModels] = useState<Model[]>([])
  const [filteredModels, setFilteredModels] = useState<Model[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Fetch models on component mount
  useEffect(() => {
    fetchModels()
  }, [])

  // Filter models when search query or active tab changes
  useEffect(() => {
    filterModels()
  }, [searchQuery, activeTab, models])

  const fetchModels = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/ml/deep-learning/models")

      if (!response.ok) {
        throw new Error("Failed to fetch models")
      }

      const data = await response.json()
      setModels(data)
    } catch (error) {
      console.error("Error fetching models:", error)
      toast({
        title: "Error",
        description: "Failed to load models. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const filterModels = () => {
    let filtered = [...models]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (model) => model.name.toLowerCase().includes(query) || model.description.toLowerCase().includes(query),
      )
    }

    // Apply tab filter
    if (activeTab !== "all") {
      filtered = filtered.filter((model) => model.status === activeTab)
    }

    setFilteredModels(filtered)
  }

  const handleDeleteModel = async (id: string) => {
    try {
      const response = await fetch(`/api/ml/deep-learning/models?id=${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete model")
      }

      // Remove model from state
      setModels(models.filter((model) => model.id !== id))

      toast({
        title: "Model deleted",
        description: "The model has been deleted successfully.",
      })
    } catch (error) {
      console.error("Error deleting model:", error)
      toast({
        title: "Error",
        description: "Failed to delete model. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleTrainModel = async (id: string) => {
    try {
      // Get the model
      const model = models.find((m) => m.id === id)

      if (!model) {
        throw new Error("Model not found")
      }

      // Navigate to training page
      router.push(`/dashboard/ml/models/${id}/train`)
    } catch (error) {
      console.error("Error navigating to training page:", error)
      toast({
        title: "Error",
        description: "Failed to navigate to training page. Please try again.",
        variant: "destructive",
      })
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "draft":
        return "outline"
      case "training":
        return "secondary"
      case "trained":
        return "default"
      case "failed":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Deep Learning Models</h1>
          <p className="text-muted-foreground">Create, train, and manage your deep learning models</p>
        </div>
        <Button onClick={() => router.push("/dashboard/ml/models/new")}>
          <Plus className="mr-2 h-4 w-4" />
          New Model
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search models..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
            <TabsTrigger value="trained">Trained</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading models...</p>
        </div>
      ) : filteredModels.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-64">
            <p className="text-muted-foreground mb-4">No models found</p>
            <Button onClick={() => router.push("/dashboard/ml/models/new")}>
              <Plus className="mr-2 h-4 w-4" />
              Create a new model
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredModels.map((model) => (
            <Card key={model.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle
                      className="cursor-pointer hover:underline"
                      onClick={() => router.push(`/dashboard/ml/models/${model.id}`)}
                    >
                      {model.name}
                    </CardTitle>
                    <CardDescription>{model.description || "No description"}</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => router.push(`/dashboard/ml/models/${model.id}`)}>
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => router.push(`/dashboard/ml/models/${model.id}/edit`)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleTrainModel(model.id)}>
                        <Play className="mr-2 h-4 w-4" />
                        Train
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => handleDeleteModel(model.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant={getStatusBadgeVariant(model.status)}>
                    {model.status.charAt(0).toUpperCase() + model.status.slice(1)}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {model.modelType.charAt(0).toUpperCase() + model.modelType.slice(1)}
                  </span>
                </div>

                {model.metrics && model.status === "trained" && (
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {model.metrics.accuracy !== undefined && (
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Accuracy</span>
                        <span className="font-medium">{(model.metrics.accuracy * 100).toFixed(2)}%</span>
                      </div>
                    )}
                    {model.metrics.loss !== undefined && (
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Loss</span>
                        <span className="font-medium">{model.metrics.loss.toFixed(4)}</span>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-between">
                <span className="text-xs text-muted-foreground">
                  Created: {format(new Date(model.createdAt), "MMM d, yyyy")}
                </span>
                <Button variant="ghost" size="sm" onClick={() => router.push(`/dashboard/ml/models/${model.id}`)}>
                  View
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
