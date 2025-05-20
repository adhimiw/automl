import fs from "fs"
import path from "path"
import { parse } from "csv-parse/sync"
import { v4 as uuidv4 } from "uuid"
import { serverEnv } from "../env"

/**
 * Core Data Processor class for handling data operations
 */
class DataProcessor {
  private datasets: Map<string, any[]>
  private datasetMetadata: Map<string, any>
  private uploadDir: string

  constructor() {
    this.datasets = new Map()
    this.datasetMetadata = new Map()
    this.uploadDir = serverEnv.app.uploadDir

    // Ensure upload directory exists
    this.ensureUploadDir()
  }

  /**
   * Ensure the upload directory exists
   */
  private async ensureUploadDir() {
    try {
      await fs.promises.mkdir(this.uploadDir, { recursive: true })
      console.log(`Upload directory ensured at ${this.uploadDir}`)
    } catch (error) {
      console.error("Error creating upload directory:", error)
    }
  }

  /**
   * Load a CSV file into memory
   * @param {string} filePath - Path to the CSV file
   * @param {Object} options - CSV parsing options
   * @returns {Object} Dataset information
   */
  loadCsvFile(filePath: string, options: any = {}) {
    try {
      // Default options
      const parseOptions = {
        columns: true,
        skip_empty_lines: true,
        trim: true,
        ...options,
      }

      // Read and parse the file
      const fileContent = fs.readFileSync(filePath, "utf8")
      const records = parse(fileContent, parseOptions)

      // Generate a unique ID for this dataset
      const datasetId = uuidv4()

      // Store the dataset
      this.datasets.set(datasetId, records)

      // Create and store metadata
      const metadata = this.generateMetadata(records, path.basename(filePath))
      this.datasetMetadata.set(datasetId, metadata)

      console.log(`Loaded dataset ${datasetId} with ${records.length} records and ${metadata.columnCount} columns`)

      return {
        datasetId,
        metadata,
      }
    } catch (error) {
      console.error("Error loading CSV file:", error)
      throw new Error(`Failed to load CSV file: ${error.message}`)
    }
  }

  // ... rest of the DataProcessor class implementation ...
}

export default DataProcessor
