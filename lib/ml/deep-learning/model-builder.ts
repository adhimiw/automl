import { v4 as uuidv4 } from "uuid"
import type { ModelConfig, DeepLearningModel, LayerConfig } from "./model-types"
import { logger } from "../../utils/logger"

export class ModelBuilder {
  private config: Partial<ModelConfig> = {
    inputShape: [10], // Default input shape
    layers: [],
    optimizer: {
      name: "adam",
      learningRate: 0.001,
    },
    loss: "meanSquaredError",
    metrics: ["accuracy"],
  }

  private modelType: "regression" | "classification" | "timeSeries" = "regression"
  private name = ""
  private description = ""
  private datasetId = ""
  private userId = ""

  constructor() {
    this.config = {
      inputShape: [10], // Default input shape
      layers: [],
      optimizer: {
        name: "adam",
        learningRate: 0.001,
      },
      loss: "meanSquaredError",
      metrics: ["accuracy"],
    }

    this.name = "Untitled Model"
    this.description = ""
    this.datasetId = ""
    this.userId = ""
  }

  /**
   * Set the name of the model
   */
  public setName(name: string): ModelBuilder {
    this.name = name
    return this
  }

  /**
   * Set the description of the model
   */
  public setDescription(description: string): ModelBuilder {
    this.description = description
    return this
  }

  /**
   * Set the model type
   */
  public setModelType(type: "regression" | "classification" | "timeSeries"): ModelBuilder {
    this.modelType = type

    // Set appropriate loss function based on model type
    if (type === "regression") {
      this.config.loss = "meanSquaredError"
    } else if (type === "classification") {
      this.config.loss = "categoricalCrossentropy"
    } else if (type === "timeSeries") {
      this.config.loss = "meanSquaredError"
    }

    return this
  }

  /**
   * Set the input shape of the model
   */
  public setInputShape(shape: number[]): ModelBuilder {
    this.config.inputShape = shape
    return this
  }

  /**
   * Set the output shape of the model
   */
  public setOutputShape(shape: number): ModelBuilder {
    this.config.outputShape = shape
    return this
  }

  /**
   * Add a layer to the model
   */
  public addLayer(layer: LayerConfig): ModelBuilder {
    if (!this.config.layers) {
      this.config.layers = []
    }
    this.config.layers.push(layer)
    return this
  }

  /**
   * Set the optimizer for the model
   */
  public setOptimizer(name: string, learningRate?: number): ModelBuilder {
    this.config.optimizer = {
      name,
      learningRate: learningRate || 0.001,
    }
    return this
  }

  /**
   * Set the loss function for the model
   */
  public setLoss(loss: string): ModelBuilder {
    this.config.loss = loss
    return this
  }

  /**
   * Set the metrics for the model
   */
  public setMetrics(metrics: string[]): ModelBuilder {
    this.config.metrics = metrics
    return this
  }

  /**
   * Set the dataset ID for the model
   */
  public setDatasetId(datasetId: string): ModelBuilder {
    this.datasetId = datasetId
    return this
  }

  /**
   * Set the user ID for the model
   */
  public setUserId(userId: string): ModelBuilder {
    this.userId = userId
    return this
  }

  /**
   * Build a default model based on the dataset and model type
   */
  public buildDefaultModel(
    inputFeatures: number,
    outputFeatures: number,
    modelType: "regression" | "classification" | "timeSeries",
  ): ModelBuilder {
    this.setModelType(modelType)
    this.setInputShape([inputFeatures])
    this.setOutputShape(outputFeatures)

    // Clear existing layers
    this.config.layers = []

    // Add default layers based on model type
    if (modelType === "regression") {
      this.addLayer({ units: Math.max(32, inputFeatures * 2), activation: "relu" })
      this.addLayer({ units: 16, activation: "relu", dropout: 0.2 })
      this.addLayer({ units: outputFeatures, activation: "linear" })
      this.setLoss("meanSquaredError")
      this.setMetrics(["mse"])
    } else if (modelType === "classification") {
      this.addLayer({ units: Math.max(32, inputFeatures * 2), activation: "relu" })
      this.addLayer({ units: 16, activation: "relu", dropout: 0.2 })
      this.addLayer({
        units: outputFeatures,
        activation: outputFeatures > 1 ? "softmax" : "sigmoid",
      })
      this.setLoss(outputFeatures > 1 ? "categoricalCrossentropy" : "binaryCrossentropy")
      this.setMetrics(["accuracy"])
    } else if (modelType === "timeSeries") {
      this.addLayer({ units: 64, activation: "relu" })
      this.addLayer({ units: 32, activation: "relu", dropout: 0.2 })
      this.addLayer({ units: outputFeatures, activation: "linear" })
      this.setLoss("meanSquaredError")
      this.setMetrics(["mse"])
    }

    return this
  }

  /**
   * Create the model configuration
   */
  public build(): DeepLearningModel {
    try {
      // Validate required fields
      if (!this.name) {
        throw new Error("Model name is required")
      }

      if (!this.config.inputShape || !this.config.outputShape) {
        throw new Error("Input and output shapes are required")
      }

      if (!this.config.layers || this.config.layers.length === 0) {
        throw new Error("At least one layer is required")
      }

      if (!this.datasetId) {
        throw new Error("Dataset ID is required")
      }

      if (!this.userId) {
        throw new Error("User ID is required")
      }

      // Create the model
      const model: DeepLearningModel = {
        id: uuidv4(),
        name: this.name,
        description: this.description,
        modelType: this.modelType,
        config: this.config as ModelConfig,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: "draft",
        userId: this.userId,
        datasetId: this.datasetId,
        version: 1,
      }

      return model
    } catch (error) {
      logger.error("Error building model configuration:", error)
      throw new Error(`Failed to build model configuration: ${error}`)
    }
  }
}
