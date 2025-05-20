/**
 * Neural Network implementation for the data automation platform
 * Provides core functionality for building and training neural networks
 */

import * as tf from "@tensorflow/tfjs"
import type { ModelConfig, LayerConfig, TrainingConfig, ModelMetrics } from "./model-types"
import { logger } from "../../utils/logger"

export class NeuralNetwork {
  private model: tf.LayersModel | null = null
  private config: ModelConfig
  private history: any = null

  constructor(config: ModelConfig) {
    this.config = config
  }

  /**
   * Build a neural network model based on the provided configuration
   */
  public buildModel(): tf.LayersModel {
    try {
      const model = tf.sequential()

      // Add layers based on configuration
      this.config.layers.forEach((layerConfig: LayerConfig, index: number) => {
        const layerOptions: any = {
          units: layerConfig.units,
          activation: layerConfig.activation || "relu",
        }

        // Add input shape for the first layer
        if (index === 0) {
          layerOptions.inputShape = [this.config.inputShape]
        }

        // Add regularization if specified
        if (layerConfig.regularization) {
          if (layerConfig.regularization.type === "l1") {
            layerOptions.kernelRegularizer = tf.regularizers.l1({
              l1: layerConfig.regularization.value,
            })
          } else if (layerConfig.regularization.type === "l2") {
            layerOptions.kernelRegularizer = tf.regularizers.l2({
              l2: layerConfig.regularization.value,
            })
          }
        }

        // Add dropout if specified
        if (layerConfig.dropout && layerConfig.dropout > 0) {
          model.add(tf.layers.dense(layerOptions))
          model.add(tf.layers.dropout({ rate: layerConfig.dropout }))
        } else {
          model.add(tf.layers.dense(layerOptions))
        }
      })

      // Compile the model
      model.compile({
        optimizer: this.getOptimizer(this.config.optimizer),
        loss: this.config.loss || "meanSquaredError",
        metrics: this.config.metrics || ["accuracy"],
      })

      this.model = model
      return model
    } catch (error) {
      logger.error("Error building neural network model:", error)
      throw new Error(`Failed to build neural network model: ${error}`)
    }
  }

  /**
   * Train the neural network model with the provided data
   */
  public async train(
    xTrain: tf.Tensor | number[][],
    yTrain: tf.Tensor | number[][],
    config: TrainingConfig,
  ): Promise<ModelMetrics> {
    try {
      if (!this.model) {
        this.buildModel()
      }

      // Convert inputs to tensors if they're not already
      const xs = Array.isArray(xTrain) ? tf.tensor2d(xTrain) : xTrain
      const ys = Array.isArray(yTrain) ? tf.tensor2d(yTrain) : yTrain

      // Train the model
      this.history = await this.model!.fit(xs, ys, {
        epochs: config.epochs || 10,
        batchSize: config.batchSize || 32,
        validationSplit: config.validationSplit || 0.2,
        callbacks: {
          onEpochEnd: (epoch, logs) => {
            if (config.onProgress) {
              config.onProgress({
                epoch,
                loss: logs?.loss || 0,
                accuracy: logs?.acc || 0,
                validationLoss: logs?.val_loss || 0,
                validationAccuracy: logs?.val_acc || 0,
              })
            }
          },
        },
      })

      // Clean up tensors
      if (Array.isArray(xTrain)) xs.dispose()
      if (Array.isArray(yTrain)) ys.dispose()

      // Return training metrics
      const lastEpoch = this.history.history.loss.length - 1
      return {
        loss: this.history.history.loss[lastEpoch],
        accuracy: this.history.history.acc ? this.history.history.acc[lastEpoch] : undefined,
        validationLoss: this.history.history.val_loss ? this.history.history.val_loss[lastEpoch] : undefined,
        validationAccuracy: this.history.history.val_acc ? this.history.history.val_acc[lastEpoch] : undefined,
      }
    } catch (error) {
      logger.error("Error training neural network model:", error)
      throw new Error(`Failed to train neural network model: ${error}`)
    }
  }

  /**
   * Make predictions using the trained model
   */
  public predict(input: tf.Tensor | number[][]): tf.Tensor {
    try {
      if (!this.model) {
        throw new Error("Model has not been built or trained yet")
      }

      // Convert input to tensor if it's not already
      const xs = Array.isArray(input) ? tf.tensor2d(input) : input

      // Make prediction
      const prediction = this.model.predict(xs) as tf.Tensor

      // Clean up input tensor if we created it
      if (Array.isArray(input)) xs.dispose()

      return prediction
    } catch (error) {
      logger.error("Error making prediction with neural network model:", error)
      throw new Error(`Failed to make prediction: ${error}`)
    }
  }

  /**
   * Save the model to the specified format
   */
  public async saveModel(path: string): Promise<void> {
    try {
      if (!this.model) {
        throw new Error("No model to save")
      }
      await this.model.save(`localstorage://${path}`)
    } catch (error) {
      logger.error("Error saving neural network model:", error)
      throw new Error(`Failed to save model: ${error}`)
    }
  }

  /**
   * Load a pre-trained model
   */
  public async loadModel(path: string): Promise<void> {
    try {
      this.model = await tf.loadLayersModel(`localstorage://${path}`)
    } catch (error) {
      logger.error("Error loading neural network model:", error)
      throw new Error(`Failed to load model: ${error}`)
    }
  }

  /**
   * Get the appropriate optimizer based on the configuration
   */
  private getOptimizer(optimizerConfig: any): tf.Optimizer {
    const { name, learningRate = 0.01, ...otherParams } = optimizerConfig

    switch (name.toLowerCase()) {
      case "sgd":
        return tf.train.sgd(learningRate)
      case "adam":
        return tf.train.adam(learningRate)
      case "adagrad":
        return tf.train.adagrad(learningRate)
      case "adadelta":
        return tf.train.adadelta(learningRate)
      case "rmsprop":
        return tf.train.rmsprop(learningRate)
      default:
        return tf.train.adam(learningRate)
    }
  }

  /**
   * Get the training history
   */
  public getHistory() {
    return this.history
  }

  /**
   * Get the model summary
   */
  public getModelSummary(): string {
    if (!this.model) {
      return "Model not built yet"
    }

    const layers = this.model.layers
    let summary = "Model Summary:\n"

    layers.forEach((layer, index) => {
      const config = layer.getConfig()
      const outputShape = layer.outputShape
      summary += `Layer ${index}: ${layer.name}, Type: ${layer.getClassName()}, Output Shape: ${JSON.stringify(outputShape)}\n`
    })

    return summary
  }

  /**
   * Evaluate the model on test data
   */
  public async evaluate(xTest: tf.Tensor | number[][], yTest: tf.Tensor | number[][]): Promise<ModelMetrics> {
    try {
      if (!this.model) {
        throw new Error("Model has not been built or trained yet")
      }

      // Convert inputs to tensors if they're not already
      const xs = Array.isArray(xTest) ? tf.tensor2d(xTest) : xTest
      const ys = Array.isArray(yTest) ? tf.tensor2d(yTest) : yTest

      // Evaluate the model
      const result = (await this.model.evaluate(xs, ys)) as tf.Tensor[]

      // Extract metrics
      const metrics: ModelMetrics = {
        loss: result[0].dataSync()[0],
      }

      if (result.length > 1) {
        metrics.accuracy = result[1].dataSync()[0]
      }

      // Clean up tensors
      result.forEach((tensor) => tensor.dispose())
      if (Array.isArray(xTest)) xs.dispose()
      if (Array.isArray(yTest)) ys.dispose()

      return metrics
    } catch (error) {
      logger.error("Error evaluating neural network model:", error)
      throw new Error(`Failed to evaluate model: ${error}`)
    }
  }
}
