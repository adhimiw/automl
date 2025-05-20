/**
 * Data Analyzer - Functions for exploratory data analysis
 */

// Column data type
export type ColumnType = "numeric" | "categorical" | "datetime" | "boolean" | "unknown"

// Column statistics
export interface ColumnStats {
  name: string
  type: ColumnType
  count: number
  missing: number
  unique: number
  min?: number | string
  max?: number | string
  mean?: number
  median?: number
  std?: number
  mode?: string | number
  quantiles?: Record<string, number>
  histogram?: Array<{ bin: string | number; count: number }>
  frequent_values?: Array<{ value: string | number; count: number }>
}

// Dataset summary
export interface DatasetSummary {
  rowCount: number
  columnCount: number
  columns: ColumnStats[]
  correlations?: Record<string, Record<string, number>>
  missingValues?: Array<{ column: string; missing: number; total: number }>
}

/**
 * Detect column type based on values
 * @param values Array of column values
 * @returns Detected column type
 */
export function detectColumnType(values: any[]): ColumnType {
  // Filter out null and undefined values
  const nonNullValues = values.filter((v) => v !== null && v !== undefined)
  if (nonNullValues.length === 0) return "unknown"

  // Check if all values are numbers
  const allNumbers = nonNullValues.every((v) => typeof v === "number" || (typeof v === "string" && !isNaN(Number(v))))
  if (allNumbers) return "numeric"

  // Check if all values are booleans
  const allBooleans = nonNullValues.every((v) => typeof v === "boolean" || v === "true" || v === "false")
  if (allBooleans) return "boolean"

  // Check if all values are dates
  const allDates = nonNullValues.every((v) => {
    if (v instanceof Date) return true
    if (typeof v !== "string") return false
    const date = new Date(v)
    return !isNaN(date.getTime())
  })
  if (allDates) return "datetime"

  // Default to categorical
  return "categorical"
}

/**
 * Calculate basic statistics for a column
 * @param values Array of column values
 * @param name Column name
 * @returns Column statistics
 */
export function calculateColumnStats(values: any[], name: string): ColumnStats {
  // Count total, missing, and unique values
  const count = values.length
  const missing = values.filter((v) => v === null || v === undefined).length
  const uniqueValues = new Set(values.filter((v) => v !== null && v !== undefined))
  const unique = uniqueValues.size

  // Detect column type
  const type = detectColumnType(values)

  // Initialize stats object
  const stats: ColumnStats = {
    name,
    type,
    count,
    missing,
    unique,
  }

  // Calculate type-specific statistics
  if (type === "numeric") {
    // Convert values to numbers
    const numericValues = values
      .filter((v) => v !== null && v !== undefined)
      .map((v) => (typeof v === "number" ? v : Number(v)))
      .filter((v) => !isNaN(v))

    if (numericValues.length > 0) {
      // Calculate min, max, mean
      stats.min = Math.min(...numericValues)
      stats.max = Math.max(...numericValues)
      stats.mean = numericValues.reduce((sum, v) => sum + v, 0) / numericValues.length

      // Calculate median
      const sorted = [...numericValues].sort((a, b) => a - b)
      const mid = Math.floor(sorted.length / 2)
      stats.median = sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid]

      // Calculate standard deviation
      const variance =
        numericValues.reduce((sum, v) => sum + Math.pow(v - stats.mean!, 2), 0) / numericValues.length
      stats.std = Math.sqrt(variance)

      // Calculate quantiles
      stats.quantiles = {
        "25%": sorted[Math.floor(sorted.length * 0.25)],
        "50%": stats.median,
        "75%": sorted[Math.floor(sorted.length * 0.75)],
      }

      // Generate histogram
      const binCount = Math.min(10, unique)
      if (binCount > 1) {
        const binWidth = (stats.max - stats.min) / binCount
        const histogram: Array<{ bin: number; count: number }> = []

        for (let i = 0; i < binCount; i++) {
          const binStart = stats.min + i * binWidth
          const binEnd = binStart + binWidth
          const binLabel = i === binCount - 1 ? binEnd : binStart
          const count = numericValues.filter((v) => v >= binStart && (i === binCount - 1 ? v <= binEnd : v < binEnd)).length
          histogram.push({ bin: binLabel, count })
        }

        stats.histogram = histogram
      }
    }
  } else if (type === "categorical" || type === "boolean") {
    // Get non-null values
    const nonNullValues = values.filter((v) => v !== null && v !== undefined)

    if (nonNullValues.length > 0) {
      // Calculate value frequencies
      const frequencies: Record<string, number> = {}
      nonNullValues.forEach((v) => {
        const key = String(v)
        frequencies[key] = (frequencies[key] || 0) + 1
      })

      // Find mode (most frequent value)
      let maxFreq = 0
      let mode: string | undefined
      Object.entries(frequencies).forEach(([value, freq]) => {
        if (freq > maxFreq) {
          maxFreq = freq
          mode = value
        }
      })
      stats.mode = mode

      // Get most frequent values
      stats.frequent_values = Object.entries(frequencies)
        .map(([value, count]) => ({ value, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10)

      // Set min and max for categorical (first and last alphabetically)
      if (nonNullValues.length > 0) {
        const sorted = [...nonNullValues].sort()
        stats.min = sorted[0]
        stats.max = sorted[sorted.length - 1]
      }
    }
  } else if (type === "datetime") {
    // Convert values to dates
    const dateValues = values
      .filter((v) => v !== null && v !== undefined)
      .map((v) => (v instanceof Date ? v : new Date(v)))
      .filter((v) => !isNaN(v.getTime()))

    if (dateValues.length > 0) {
      // Calculate min and max dates
      stats.min = new Date(Math.min(...dateValues.map((d) => d.getTime()))).toISOString()
      stats.max = new Date(Math.max(...dateValues.map((d) => d.getTime()))).toISOString()
    }
  }

  return stats
}

/**
 * Calculate correlation between two numeric columns
 * @param x First column values
 * @param y Second column values
 * @returns Pearson correlation coefficient
 */
export function calculateCorrelation(x: number[], y: number[]): number {
  // Ensure both arrays have the same length
  if (x.length !== y.length || x.length === 0) {
    return NaN
  }

  // Calculate means
  const meanX = x.reduce((sum, val) => sum + val, 0) / x.length
  const meanY = y.reduce((sum, val) => sum + val, 0) / y.length

  // Calculate covariance and standard deviations
  let covariance = 0
  let varX = 0
  let varY = 0

  for (let i = 0; i < x.length; i++) {
    const diffX = x[i] - meanX
    const diffY = y[i] - meanY
    covariance += diffX * diffY
    varX += diffX * diffX
    varY += diffY * diffY
  }

  // Calculate correlation coefficient
  const stdX = Math.sqrt(varX)
  const stdY = Math.sqrt(varY)

  if (stdX === 0 || stdY === 0) {
    return NaN
  }

  return covariance / (stdX * stdY)
}

/**
 * Generate a complete dataset summary
 * @param data Array of data objects
 * @returns Dataset summary
 */
export function generateDatasetSummary(data: Record<string, any>[]): DatasetSummary {
  if (!data || data.length === 0) {
    return {
      rowCount: 0,
      columnCount: 0,
      columns: [],
    }
  }

  // Get column names from the first row
  const columnNames = Object.keys(data[0])
  const rowCount = data.length
  const columnCount = columnNames.length

  // Calculate statistics for each column
  const columns = columnNames.map((name) => {
    const values = data.map((row) => row[name])
    return calculateColumnStats(values, name)
  })

  // Calculate correlations between numeric columns
  const numericColumns = columns.filter((col) => col.type === "numeric")
  const correlations: Record<string, Record<string, number>> = {}

  numericColumns.forEach((col1) => {
    correlations[col1.name] = {}
    numericColumns.forEach((col2) => {
      if (col1.name === col2.name) {
        correlations[col1.name][col2.name] = 1
      } else {
        const values1 = data.map((row) => {
          const val = row[col1.name]
          return typeof val === "number" ? val : Number(val)
        }).filter((v) => !isNaN(v))
        
        const values2 = data.map((row) => {
          const val = row[col2.name]
          return typeof val === "number" ? val : Number(val)
        }).filter((v) => !isNaN(v))

        // Only calculate correlation if we have enough matching values
        if (values1.length > 5 && values2.length > 5) {
          // Use the minimum length
          const minLength = Math.min(values1.length, values2.length)
          correlations[col1.name][col2.name] = calculateCorrelation(
            values1.slice(0, minLength),
            values2.slice(0, minLength)
          )
        } else {
          correlations[col1.name][col2.name] = NaN
        }
      }
    })
  })

  // Calculate missing values
  const missingValues = columns.map((col) => ({
    column: col.name,
    missing: col.missing,
    total: col.count,
  })).filter((item) => item.missing > 0)

  return {
    rowCount,
    columnCount,
    columns,
    correlations,
    missingValues,
  }
}
