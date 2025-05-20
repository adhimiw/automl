import { crypto } from "node:crypto"
import type {
  DeepLearningModel,
  ModelTrainingJob,
  ModelPredictionRequest,
  ModelPredictionResponse,
  ModelEvaluationResult,
  ModelMetrics,
  TrainingConfig,
} from "./model-types"
import { NeuralNetwork } from "./neural-network"
import { logger } from "../../utils/logger"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export class DeepLearningService {
  /**
   * Create a new deep learning model
   */
  public async createModel(model: DeepLearningModel): Promise<DeepLearningModel> {
    try {
      const result = await sql`
        INSERT INTO deep_learning_models (
          id, name, description, model_type, config, status, user_id, dataset_id, version
        ) VALUES (
          ${model.id}, ${model.name}, ${model.description || ""}, ${model.modelType}, 
          ${JSON.stringify(model.config)}, ${model.status}, ${model.userId}, ${model.datasetId}, ${model.version}
        )
        RETURNING *
      `

      if (result.length === 0) {
        throw new Error("Failed to create model")
      }

      return this.mapDbModelToModel(result[0])
    } catch (error) {
      logger.error("Error creating deep learning model:", error)
      throw new Error(`Failed to create deep learning model: ${error}`)
    }
  }

  /**
   * Get a deep learning model by ID
   */
  public async getModelById(id: string): Promise<DeepLearningModel | null> {
    try {
      const result = await sql`
        SELECT * FROM deep_learning_models WHERE id = ${id}
      `

      if (result.length === 0) {
        return null
      }

      return this.mapDbModelToModel(result[0])
    } catch (error) {
      logger.error(`Error getting deep learning model with ID ${id}:`, error)
      throw new Error(`Failed to get deep learning model: ${error}`)
    }
  }

  /**
   * Get all deep learning models for a user
   */
  public async getModelsByUserId(userId: string): Promise<DeepLearningModel[]> {
    try {
      const result = await sql`
        SELECT * FROM deep_learning_models WHERE user_id = ${userId}
        ORDER BY updated_at DESC
      `

      return result.map(this.mapDbModelToModel)
    } catch (error) {
      logger.error(`Error getting deep learning models for user ${userId}:`, error)
      throw new Error(`Failed to get deep learning models: ${error}`)
    }
  }

  /**
   * Update a deep learning model
   */
  public async updateModel(model: DeepLearningModel): Promise<DeepLearningModel> {
    try {
      const result = await sql`
        UPDATE deep_learning_models
        SET 
          name = ${model.name},
          description = ${model.description || ""},
          model_type = ${model.modelType},
          config = ${JSON.stringify(model.config)},
          status = ${model.status},
          metrics = ${model.metrics ? JSON.stringify(model.metrics) : null},
          updated_at = NOW(),
          version = ${model.version}
        WHERE id = ${model.id}
        RETURNING *
      `

      if (result.length === 0) {
        throw new Error(`Model with ID ${model.id} not found`)
      }

      return this.mapDbModelToModel(result[0])
    } catch (error) {
      logger.error(`Error updating deep learning model with ID ${model.id}:`, error)
      throw new Error(`Failed to update deep learning model: ${error}`)
    }
  }

  /**
   * Delete a deep learning model
   */
  public async deleteModel(id: string): Promise<boolean> {
    try {
      const result = await sql`
        DELETE FROM deep_learning_models WHERE id = ${id}
      `

      return result.count > 0
    } catch (error) {
      logger.error(`Error deleting deep learning model with ID ${id}:`, error)
      throw new Error(`Failed to delete deep learning model: ${error}`)
    }
  }

  /**
   * Create a training job for a model
   */
  public async createTrainingJob(modelId: string): Promise<ModelTrainingJob> {
    try {
      const job: ModelTrainingJob = {
        id: crypto.randomUUID(),
        modelId,
        status: "pending",
        progress: 0,
        startTime: new Date().toISOString(),
      }

      const result = await sql`
        INSERT INTO model_training_jobs (
          id, model_id, status, progress, start_time
        ) VALUES (
          ${job.id}, ${job.modelId}, ${job.status}, ${job.progress}, ${job.startTime}
        )
        RETURNING *
      `

      if (result.length === 0) {
        throw new Error("Failed to create training job")
      }

      // Update model status
      await sql`
        UPDATE deep_learning_models
        SET status = 'training', updated_at = NOW()
        WHERE id = ${modelId}
      `

      return this.mapDbJobToJob(result[0])
    } catch (error) {
      logger.error(`Error creating training job for model ${modelId}:`, error)
      throw new Error(`Failed to create training job: ${error}`)
    }
  }

  /**
   * Get a training job by ID
   */
  public async getTrainingJob(jobId: string): Promise<ModelTrainingJob | null> {
    try {
      const result = await sql`
        SELECT * FROM model_training_jobs WHERE id = ${jobId}
      `

      if (result.length === 0) {
        return null
      }

      return this.mapDbJobToJob(result[0])
    } catch (error) {
      logger.error(`Error getting training job with ID ${jobId}:`, error)
      throw new Error(`Failed to get training job: ${error}`)
    }
  }

  /**
   * Update a training job
   */
  public async updateTrainingJob(job: ModelTrainingJob): Promise<ModelTrainingJob> {
    try {
      const result = await sql`
        UPDATE model_training_jobs
        SET 
          status = ${job.status},
          progress = ${job.progress},
          end_time = ${job.endTime || null},
          error = ${job.error || null},
          metrics = ${job.metrics ? JSON.stringify(job.metrics) : null}
        WHERE id = ${job.id}
        RETURNING *
      `

      if (result.length === 0) {
        throw new Error(`Training job with ID ${job.id} not found`)
      }

      // If job is completed or failed, update model status
      if (job.status === "completed" || job.status === "failed") {
        await sql`
          UPDATE deep_learning_models
          SET 
            status = ${job.status === "completed" ? "trained" : "failed"},
            metrics = ${job.metrics ? JSON.stringify(job.metrics) : null},
            updated_at = NOW()
          WHERE id = ${job.modelId}
        `
      }

      return this.mapDbJobToJob(result[0])
    } catch (error) {
      logger.error(`Error updating training job with ID ${job.id}:`, error)
      throw new Error(`Failed to update training job: ${error}`)
    }
  }

  /**
   * Train a model with the provided data
   */
  public async trainModel(
    modelId: string,
    xTrain: number[][],
    yTrain: number[][],
    config: TrainingConfig,
  ): Promise<ModelMetrics> {
    try {
      // Get the model
      const model = await this.getModelById(modelId)
      if (!model) {
        throw new Error(`Model with ID ${modelId} not found`)
      }

      // Create a training job
      const job = await this.createTrainingJob(modelId)

      // Create and train the neural network
      const neuralNetwork = new NeuralNetwork(model.config)
      neuralNetwork.buildModel()

      // Update progress callback
      const updatedConfig: TrainingConfig = {
        ...config,
        onProgress: async (metrics) => {
          // Update job progress
          const progress = (metrics.epoch + 1) / (config.epochs || 10)
          await this.updateTrainingJob({
            ...job,
            progress: Math.min(0.99, progress), // Keep at 99% until fully complete
            metrics: {
              loss: metrics.loss,
              accuracy: metrics.accuracy,
              validationLoss: metrics.validationLoss,
              validationAccuracy: metrics.validationAccuracy,
            },
          })

          // Call original progress callback if provided
          if (config.onProgress) {
            config.onProgress(metrics)
          }
        },
      }

      // Train the model
      const metrics = await neuralNetwork.train(xTrain, yTrain, updatedConfig)

      // Save the model
      await neuralNetwork.saveModel(`model-${modelId}`)

      // Update the job as completed
      await this.updateTrainingJob({
        ...job,
        status: "completed",
        progress: 1,
        endTime: new Date().toISOString(),
        metrics,
      })

      return metrics
    } catch (error) {
      logger.error(`Error training model with ID ${modelId}:`, error)

      // Update job as failed
      try {
        const job = await this.getTrainingJob(modelId)
        if (job) {
          await this.updateTrainingJob({
            ...job,
            status: "failed",
            endTime: new Date().toISOString(),
            error: `${error}`,
          })
        }
      } catch (updateError) {
        logger.error(`Error updating failed job for model ${modelId}:`, updateError)
      }

      throw new Error(`Failed to train model: ${error}`)
    }
  }

  /**
   * Make predictions using a trained model
   */
  public async predict(request: ModelPredictionRequest): Promise<ModelPredictionResponse> {
    try {
      // Get the model
      const model = await this.getModelById(request.modelId)
      if (!model) {
        throw new Error(`Model with ID ${request.modelId} not found`)
      }

      if (model.status !== "trained") {
        throw new Error(`Model with ID ${request.modelId} is not trained`)
      }

      // Load the model
      const neuralNetwork = new NeuralNetwork(model.config)
      await neuralNetwork.loadModel(`model-${request.modelId}`)

      // Prepare input data
      const inputData = this.prepareInputData(request.data, model.config.inputShape)

      // Make predictions
      const predictions = neuralNetwork.predict(inputData)
      const predictionData = Array.from(predictions.dataSync())
      predictions.dispose()

      // Format predictions based on model type
      let formattedPredictions
      if (model.modelType === "classification" && model.config.outputShape > 1) {
        // For multi-class classification, return probabilities for each class
        formattedPredictions = this.formatMultiClassPredictions(
          predictionData,
          request.data.length,
          model.config.outputShape,
        )
      } else {
        // For regression or binary classification, return direct values
        formattedPredictions = this.formatRegressionPredictions(predictionData, request.data.length)
      }

      return {
        predictions: formattedPredictions,
        modelId: request.modelId,
        timestamp: new Date().toISOString(),
      }
    } catch (error) {
      logger.error(`Error making predictions with model ${request.modelId}:`, error)
      throw new Error(`Failed to make predictions: ${error}`)
    }
  }

  /**
   * Evaluate a model on test data
   */
  public async evaluateModel(modelId: string, xTest: number[][], yTest: number[][]): Promise<ModelEvaluationResult> {
    try {
      // Get the model
      const model = await this.getModelById(modelId)
      if (!model) {
        throw new Error(`Model with ID ${modelId} not found`)
      }

      if (model.status !== "trained") {
        throw new Error(`Model with ID ${modelId} is not trained`)
      }

      // Load the model
      const neuralNetwork = new NeuralNetwork(model.config)
      await neuralNetwork.loadModel(`model-${modelId}`)

      // Evaluate the model
      const metrics = await neuralNetwork.evaluate(xTest, yTest)

      // For classification models, calculate confusion matrix
      let confusionMatrix
      let rocCurve

      if (model.modelType === "classification") {
        // Calculate confusion matrix and ROC curve
        // This is a simplified implementation
        confusionMatrix = this.calculateConfusionMatrix(neuralNetwork, xTest, yTest, model.config.outputShape)

        if (model.config.outputShape === 1) {
          // Binary classification
          rocCurve = this.calculateROCCurve(neuralNetwork, xTest, yTest)
        }
      }

      // Calculate feature importance (simplified)
      const featureImportance = this.calculateFeatureImportance(neuralNetwork, xTest, model.config.inputShape)

      return {
        modelId,
        metrics,
        confusionMatrix,
        rocCurve,
        featureImportance,
      }
    } catch (error) {
      logger.error(`Error evaluating model with ID ${modelId}:`, error)
      throw new Error(`Failed to evaluate model: ${error}`)
    }
  }

  /**
   * Map database model to DeepLearningModel
   */
  private mapDbModelToModel(dbModel: any): DeepLearningModel {
    return {
      id: dbModel.id,
      name: dbModel.name,
      description: dbModel.description,
      modelType: dbModel.model_type,
      config: dbModel.config,
      createdAt: dbModel.created_at,
      updatedAt: dbModel.updated_at,
      status: dbModel.status,
      metrics: dbModel.metrics,
      userId: dbModel.user_id,
      datasetId: dbModel.dataset_id,
      version: dbModel.version,
    }
  }

  /**
   * Map database job to ModelTrainingJob
   */
  private mapDbJobToJob(dbJob: any): ModelTrainingJob {
    return {
      id: dbJob.id,
      modelId: dbJob.model_id,
      status: dbJob.status,
      progress: dbJob.progress,
      startTime: dbJob.start_time,
      endTime: dbJob.end_time,
      error: dbJob.error,
      metrics: dbJob.metrics,
    }
  }

  /**
   * Prepare input data for prediction
   */
  private prepareInputData(data: Record<string, any>[], inputShape: number): number[][] {
    // Convert object data to array format expected by the model
    return data.map((item) => {
      // Extract features in the correct order
      const features: number[] = []
      for (let i = 0; i < inputShape; i++) {
        const featureName = `feature_${i}`
        if (item[featureName] !== undefined) {
          features.push(Number(item[featureName]))
        } else {
          features.push(0) // Default value for missing features
        }
      }
      return features
    })
  }

  /**
   * Format multi-class classification predictions
   */
  private formatMultiClassPredictions(predictions: number[], numSamples: number, numClasses: number): any[] {
    const result = []

    for (let i = 0; i < numSamples; i++) {
      const classProbabilities: Record<string, number> = {}

      for (let j = 0; j < numClasses; j++) {
        classProbabilities[`class_${j}`] = predictions[i * numClasses + j]
      }

      // Find the predicted class (highest probability)
      const predictedClass = Object.entries(classProbabilities).reduce(
        (max, [cls, prob]) => (prob > max.prob ? { cls, prob } : max),
        { cls: "", prob: Number.NEGATIVE_INFINITY },
      ).cls

      result.push({
        predictedClass,
        probabilities: classProbabilities,
      })
    }

    return result
  }

  /**
   * Format regression predictions
   */
  private formatRegressionPredictions(predictions: number[], numSamples: number): any[] {
    const result = []

    for (let i = 0; i < numSamples; i++) {
      result.push({
        prediction: predictions[i],
      })
    }

    return result
  }

  /**
   * Calculate confusion matrix (simplified implementation)
   */
  private calculateConfusionMatrix(
    neuralNetwork: NeuralNetwork,
    xTest: number[][],
    yTest: number[][],
    numClasses: number,
  ): number[][] {
    // This is a simplified implementation
    // For a real implementation, you would need to handle multi-class classification properly

    // Initialize confusion matrix
    const confusionMatrix: number[][] = Array(numClasses)
      .fill(0)
      .map(() => Array(numClasses).fill(0))

    // Make predictions
    const predictions = neuralNetwork.predict(xTest)
    const predictionData = Array.from(predictions.dataSync())
    predictions.dispose()

    // For each sample, update confusion matrix
    for (let i = 0; i < xTest.length; i++) {
      let predictedClass = 0
      let actualClass = 0

      if (numClasses > 1) {
        // Multi-class: find index of max value
        const predictionOffset = i * numClasses
        const actualOffset = i * numClasses

        let maxPredProb = predictionData[predictionOffset]
        let maxActualProb = yTest[i][0]

        for (let j = 1; j < numClasses; j++) {
          if (predictionData[predictionOffset + j] > maxPredProb) {
            maxPredProb = predictionData[predictionOffset + j]
            predictedClass = j
          }

          if (yTest[i][j] > maxActualProb) {
            maxActualProb = yTest[i][j]
            actualClass = j
          }
        }
      } else {
        // Binary: threshold at 0.5
        predictedClass = predictionData[i] >= 0.5 ? 1 : 0
        actualClass = yTest[i][0] >= 0.5 ? 1 : 0
      }

      confusionMatrix[actualClass][predictedClass]++
    }

    return confusionMatrix
  }

  /**
   * Calculate ROC curve (simplified implementation)
   */
  private calculateROCCurve(
    neuralNetwork: NeuralNetwork,
    xTest: number[][],
    yTest: number[][],
  ): { x: number; y: number }[] {
    // This is a simplified implementation for binary classification

    // Make predictions
    const predictions = neuralNetwork.predict(xTest)
    const predictionData = Array.from(predictions.dataSync())
    predictions.dispose()

    // Prepare data for ROC curve
    const data: { score: number; label: number }[] = predictionData.map((score, i) => ({
      score,
      label: yTest[i][0],
    }))

    // Sort by score descending
    data.sort((a, b) => b.score - a.score)

    // Calculate ROC points
    const rocPoints: { x: number; y: number }[] = []
    let truePositives = 0
    let falsePositives = 0
    const totalPositives = data.filter((d) => d.label === 1).length
    const totalNegatives = data.length - totalPositives

    // Add (0,0) point
    rocPoints.push({ x: 0, y: 0 })

    // Calculate points for different thresholds
    let prevScore = -1
    for (const { score, label } of data) {
      if (score !== prevScore) {
        // Add point for current TPR and FPR
        rocPoints.push({
          x: falsePositives / totalNegatives, // FPR
          y: truePositives / totalPositives, // TPR
        })
        prevScore = score
      }

      // Update counts
      if (label === 1) {
        truePositives++
      } else {
        falsePositives++
      }
    }

    // Add (1,1) point
    rocPoints.push({ x: 1, y: 1 })

    return rocPoints
  }

  /**
   * Calculate feature importance (simplified implementation)
   */
  private calculateFeatureImportance(
    neuralNetwork: NeuralNetwork,
    xTest: number[][],
    numFeatures: number,
  ): Record<string, number> {
    // This is a simplified implementation using permutation importance
    // For each feature, we permute its values and measure the drop in performance

    const featureImportance: Record<string, number> = {}

    // Make baseline predictions
    const baselinePredictions = neuralNetwork.predict(xTest)
    const baselineData = Array.from(baselinePredictions.dataSync())
    baselinePredictions.dispose()

    // For each feature, calculate importance
    for (let featureIndex = 0; featureIndex < numFeatures; featureIndex++) {
      // Create a copy of the test data
      const permutedData = xTest.map((row) => [...row])

      // Permute the feature
      const featureValues = xTest.map((row) => row[featureIndex])
      const shuffledValues = [...featureValues].sort(() => Math.random() - 0.5)

      for (let i = 0; i < permutedData.length; i++) {
        permutedData[i][featureIndex] = shuffledValues[i]
      }

      // Make predictions with permuted data
      const permutedPredictions = neuralNetwork.predict(permutedData)
      const permutedDataArray = Array.from(permutedPredictions.dataSync())
      permutedPredictions.dispose()

      // Calculate mean squared difference
      let squaredDiffSum = 0
      for (let i = 0; i < baselineData.length; i++) {
        const diff = baselineData[i] - permutedDataArray[i]
        squaredDiffSum += diff * diff
      }

      const importance = squaredDiffSum / baselineData.length
      featureImportance[`feature_${featureIndex}`] = importance
    }

    // Normalize importance values
    const totalImportance = Object.values(featureImportance).reduce((sum, val) => sum + val, 0)
    if (totalImportance > 0) {
      for (const feature in featureImportance) {
        featureImportance[feature] /= totalImportance
      }
    }

    return featureImportance
  }
}

// Create singleton instance
export const deepLearningService = new DeepLearningService()
