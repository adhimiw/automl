"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Plus, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import type { LayerConfig, ModelConfig } from "@/lib/ml/deep-learning/model-types"

// Form schema
const modelFormSchema = z.object({
  name: z.string().min(3, {
    message: "Model name must be at least 3 characters.",
  }),
  description: z.string().optional(),
  modelType: z.enum(["regression", "classification", "timeSeries"]),
  inputShape: z.number().int().positive(),
  outputShape: z.number().int().positive(),
  optimizer: z.object({
    name: z.string(),
    learningRate: z.number().positive(),
  }),
  loss: z.string(),
  metrics: z.array(z.string()),
})

type ModelFormValues = z.infer<typeof modelFormSchema>

interface ModelBuilderUIProps {
  datasetId: string
  initialModel?: any
  onSave?: (model: any) => void
}

export function ModelBuilderUI({ datasetId, initialModel, onSave }: ModelBuilderUIProps) {
  const { toast } = useToast()
  const router = useRouter()
  const [layers, setLayers] = useState<LayerConfig[]>([])
  const [activeTab, setActiveTab] = useState("basic")
  const [isLoading, setIsLoading] = useState(false)

  // Initialize form with default values or initial model
  const form = useForm<ModelFormValues>({
    resolver: zodResolver(modelFormSchema),
    defaultValues: initialModel
      ? {
          name: initialModel.name,
          description: initialModel.description || "",
          modelType: initialModel.modelType,
          inputShape: initialModel.config.inputShape,
          outputShape: initialModel.config.outputShape,
          optimizer: initialModel.config.optimizer,
          loss: initialModel.config.loss,
          metrics: initialModel.config.metrics,
        }
      : {
          name: "",
          description: "",
          modelType: "regression",
          inputShape: 10,
          outputShape: 1,
          optimizer: {
            name: "adam",
            learningRate: 0.001,
          },
          loss: "meanSquaredError",
          metrics: ["accuracy"],
        },
  })

  // Initialize layers from initial model if provided
  useEffect(() => {
    if (initialModel?.config?.layers) {
      setLayers(initialModel.config.layers)
    } else {
      // Default layers
      setLayers([
        { units: 32, activation: "relu" },
        { units: 16, activation: "relu", dropout: 0.2 },
        { units: 1, activation: "linear" },
      ])
    }
  }, [initialModel])

  // Update output layer units when output shape changes
  useEffect(() => {
    const outputShape = form.watch("outputShape")
    if (layers.length > 0) {
      const updatedLayers = [...layers]
      updatedLayers[updatedLayers.length - 1].units = outputShape

      // Update activation function for classification
      const modelType = form.watch("modelType")
      if (modelType === "classification") {
        updatedLayers[updatedLayers.length - 1].activation = outputShape > 1 ? "softmax" : "sigmoid"
      } else {
        updatedLayers[updatedLayers.length - 1].activation = "linear"
      }

      setLayers(updatedLayers)
    }
  }, [form.watch("outputShape"), form.watch("modelType")])

  // Add a new layer
  const addLayer = () => {
    setLayers([...layers, { units: 16, activation: "relu" }])
  }

  // Remove a layer
  const removeLayer = (index: number) => {
    if (layers.length <= 1) {
      toast({
        title: "Cannot remove layer",
        description: "Model must have at least one layer",
        variant: "destructive",
      })
      return
    }

    // Don't allow removing the output layer
    if (index === layers.length - 1) {
      toast({
        title: "Cannot remove output layer",
        description: "The last layer is the output layer and cannot be removed",
        variant: "destructive",
      })
      return
    }

    const updatedLayers = [...layers]
    updatedLayers.splice(index, 1)
    setLayers(updatedLayers)
  }

  // Update a layer
  const updateLayer = (index: number, field: keyof LayerConfig, value: any) => {
    const updatedLayers = [...layers]
    updatedLayers[index] = { ...updatedLayers[index], [field]: value }
    setLayers(updatedLayers)
  }

  // Apply a template based on model type
  const applyTemplate = (modelType: "regression" | "classification" | "timeSeries") => {
    const inputShape = form.getValues("inputShape")
    const outputShape = form.getValues("outputShape")

    let newLayers: LayerConfig[] = []
    let loss = ""
    let metrics: string[] = []

    if (modelType === "regression") {
      newLayers = [
        { units: Math.max(32, inputShape * 2), activation: "relu" },
        { units: 16, activation: "relu", dropout: 0.2 },
        { units: outputShape, activation: "linear" },
      ]
      loss = "meanSquaredError"
      metrics = ["mse"]
    } else if (modelType === "classification") {
      newLayers = [
        { units: Math.max(32, inputShape * 2), activation: "relu" },
        { units: 16, activation: "relu", dropout: 0.2 },
        { units: outputShape, activation: outputShape > 1 ? "softmax" : "sigmoid" },
      ]
      loss = outputShape > 1 ? "categoricalCrossentropy" : "binaryCrossentropy"
      metrics = ["accuracy"]
    } else if (modelType === "timeSeries") {
      newLayers = [
        { units: 64, activation: "relu" },
        { units: 32, activation: "relu", dropout: 0.2 },
        { units: outputShape, activation: "linear" },
      ]
      loss = "meanSquaredError"
      metrics = ["mse"]
    }

    setLayers(newLayers)
    form.setValue("loss", loss)
    form.setValue("metrics", metrics)
  }

  // Handle form submission
  const onSubmit = async (data: ModelFormValues) => {
    try {
      setIsLoading(true)

      // Validate layers
      if (layers.length === 0) {
        toast({
          title: "Invalid model configuration",
          description: "Model must have at least one layer",
          variant: "destructive",
        })
        return
      }

      // Create model config
      const modelConfig: ModelConfig = {
        name: data.name,
        inputShape: data.inputShape,
        outputShape: data.outputShape,
        layers,
        optimizer: data.optimizer,
        loss: data.loss,
        metrics: data.metrics,
      }

      // Create model object
      const model = {
        name: data.name,
        description: data.description,
        modelType: data.modelType,
        config: modelConfig,
        datasetId,
      }

      // Call API to save model
      const response = await fetch("/api/ml/deep-learning/models", {
        method: initialModel ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(initialModel ? { ...model, id: initialModel.id } : model),
      })

      if (!response.ok) {
        throw new Error("Failed to save model")
      }

      const savedModel = await response.json()

      toast({
        title: initialModel ? "Model updated" : "Model created",
        description: `Model "${data.name}" has been ${initialModel ? "updated" : "saved"} successfully.`,
      })

      // Call onSave callback if provided
      if (onSave) {
        onSave(savedModel)
      }

      // Redirect to model page
      router.push(`/dashboard/ml/models/${savedModel.id}`)
    } catch (error) {
      console.error("Error saving model:", error)
      toast({
        title: "Error",
        description: `Failed to save model: ${error}`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Deep Learning Model Builder</CardTitle>
          <CardDescription>Create and configure a deep learning model for your dataset</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Configuration</TabsTrigger>
              <TabsTrigger value="layers">Model Architecture</TabsTrigger>
              <TabsTrigger value="advanced">Advanced Settings</TabsTrigger>
            </TabsList>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <TabsContent value="basic" className="space-y-4 mt-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Model Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter model name" {...field} />
                        </FormControl>
                        <FormDescription>A descriptive name for your model</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter model description" className="resize-none" {...field} />
                        </FormControl>
                        <FormDescription>
                          Optional description of the model's purpose and characteristics
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="modelType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Model Type</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value)
                            applyTemplate(value as any)
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select model type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="regression">Regression</SelectItem>
                            <SelectItem value="classification">Classification</SelectItem>
                            <SelectItem value="timeSeries">Time Series</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>The type of problem you're trying to solve</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="inputShape"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Input Features</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min={1}
                              {...field}
                              onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                            />
                          </FormControl>
                          <FormDescription>Number of input features</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="outputShape"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Output Features</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min={1}
                              {...field}
                              onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                            />
                          </FormControl>
                          <FormDescription>Number of output features</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="layers" className="space-y-6 mt-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Model Layers</h3>
                    <Button type="button" variant="outline" size="sm" onClick={addLayer}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Layer
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {layers.map((layer, index) => (
                      <Card key={index}>
                        <CardHeader className="py-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <h4 className="font-medium">
                                {index === 0
                                  ? "Input Layer"
                                  : index === layers.length - 1
                                    ? "Output Layer"
                                    : `Hidden Layer ${index}`}
                              </h4>
                              <Badge variant="outline">{layer.units} units</Badge>
                            </div>
                            {index !== layers.length - 1 && (
                              <Button type="button" variant="ghost" size="sm" onClick={() => removeLayer(index)}>
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="py-2 space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <FormLabel>Units</FormLabel>
                              <Input
                                type="number"
                                min={1}
                                value={layer.units}
                                onChange={(e) => updateLayer(index, "units", Number.parseInt(e.target.value))}
                                disabled={index === layers.length - 1} // Disable for output layer
                              />
                              <p className="text-sm text-muted-foreground">Number of neurons in this layer</p>
                            </div>

                            <div className="space-y-2">
                              <FormLabel>Activation</FormLabel>
                              <Select
                                value={layer.activation}
                                onValueChange={(value) => updateLayer(index, "activation", value)}
                                disabled={index === layers.length - 1 && form.watch("modelType") === "classification"}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="relu">ReLU</SelectItem>
                                  <SelectItem value="sigmoid">Sigmoid</SelectItem>
                                  <SelectItem value="tanh">Tanh</SelectItem>
                                  <SelectItem value="softmax">Softmax</SelectItem>
                                  <SelectItem value="linear">Linear</SelectItem>
                                </SelectContent>
                              </Select>
                              <p className="text-sm text-muted-foreground">Activation function for this layer</p>
                            </div>
                          </div>

                          {index !== layers.length - 1 && (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <FormLabel>Dropout</FormLabel>
                                <span className="text-sm text-muted-foreground">{layer.dropout || 0}</span>
                              </div>
                              <Slider
                                value={[layer.dropout || 0]}
                                min={0}
                                max={0.5}
                                step={0.05}
                                onValueChange={(value) => updateLayer(index, "dropout", value[0])}
                              />
                              <p className="text-sm text-muted-foreground">Dropout rate to prevent overfitting</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="advanced" className="space-y-6 mt-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Optimizer Settings</h3>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="optimizer.name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Optimizer</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select optimizer" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="adam">Adam</SelectItem>
                                <SelectItem value="sgd">SGD</SelectItem>
                                <SelectItem value="rmsprop">RMSprop</SelectItem>
                                <SelectItem value="adagrad">Adagrad</SelectItem>
                                <SelectItem value="adadelta">Adadelta</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>Algorithm used to update model weights</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="optimizer.learningRate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Learning Rate</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min={0.0001}
                                step={0.0001}
                                {...field}
                                onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                              />
                            </FormControl>
                            <FormDescription>Step size for gradient descent</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="loss"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Loss Function</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select loss function" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="meanSquaredError">Mean Squared Error</SelectItem>
                              <SelectItem value="meanAbsoluteError">Mean Absolute Error</SelectItem>
                              <SelectItem value="binaryCrossentropy">Binary Crossentropy</SelectItem>
                              <SelectItem value="categoricalCrossentropy">Categorical Crossentropy</SelectItem>
                              <SelectItem value="sparseCategoricalCrossentropy">
                                Sparse Categorical Crossentropy
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>Function to measure model error</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="space-y-2">
                      <FormLabel>Training Parameters</FormLabel>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <FormLabel>Epochs</FormLabel>
                          <Input type="number" min={1} defaultValue={10} />
                          <p className="text-sm text-muted-foreground">Number of training cycles</p>
                        </div>

                        <div className="space-y-2">
                          <FormLabel>Batch Size</FormLabel>
                          <Select defaultValue="32">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="8">8</SelectItem>
                              <SelectItem value="16">16</SelectItem>
                              <SelectItem value="32">32</SelectItem>
                              <SelectItem value="64">64</SelectItem>
                              <SelectItem value="128">128</SelectItem>
                            </SelectContent>
                          </Select>
                          <p className="text-sm text-muted-foreground">Number of samples per gradient update</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <div className="mt-6 flex justify-end space-x-4">
                  <Button type="button" variant="outline" onClick={() => router.back()}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Saving..." : initialModel ? "Update Model" : "Create Model"}
                  </Button>
                </div>
              </form>
            </Form>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
