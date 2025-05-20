/**
 * Chart Generator - Generates chart configurations based on data
 */

// Chart types
export type ChartType = "bar" | "line" | "pie" | "scatter" | "histogram" | "heatmap" | "boxplot"

// Column data type
export type ColumnType = "numeric" | "categorical" | "datetime" | "boolean"

// Column metadata
export interface ColumnMetadata {
  name: string
  type: ColumnType
  unique_values?: number
  min?: number
  max?: number
  mean?: number
  median?: number
  std?: number
  missing?: number
}

// Dataset metadata
export interface DatasetMetadata {
  columns: ColumnMetadata[]
  row_count: number
}

// Chart configuration
export interface ChartConfig {
  type: ChartType
  title: string
  description?: string
  xAxis?: string
  yAxis?: string | string[]
  data?: any[]
  options?: Record<string, any>
}

/**
 * Generate chart configurations based on dataset metadata
 * @param metadata Dataset metadata
 * @returns Array of chart configurations
 */
export function generateChartConfigurations(metadata: DatasetMetadata): ChartConfig[] {
  const charts: ChartConfig[] = []
  const { columns, row_count } = metadata

  // Get numeric and categorical columns
  const numericColumns = columns.filter((col) => col.type === "numeric")
  const categoricalColumns = columns.filter((col) => col.type === "categorical" && col.unique_values && col.unique_values <= 10)
  const datetimeColumns = columns.filter((col) => col.type === "datetime")

  // Generate bar charts for categorical columns
  categoricalColumns.forEach((catCol) => {
    charts.push({
      type: "bar",
      title: `Distribution of ${catCol.name}`,
      description: `Bar chart showing the distribution of ${catCol.name}`,
      xAxis: catCol.name,
      yAxis: "count",
    })

    // Generate bar charts for categorical vs numeric
    numericColumns.forEach((numCol) => {
      charts.push({
        type: "bar",
        title: `${numCol.name} by ${catCol.name}`,
        description: `Bar chart showing ${numCol.name} grouped by ${catCol.name}`,
        xAxis: catCol.name,
        yAxis: numCol.name,
      })
    })
  })

  // Generate scatter plots for numeric columns
  if (numericColumns.length >= 2) {
    for (let i = 0; i < numericColumns.length - 1; i++) {
      for (let j = i + 1; j < numericColumns.length; j++) {
        charts.push({
          type: "scatter",
          title: `${numericColumns[i].name} vs ${numericColumns[j].name}`,
          description: `Scatter plot showing the relationship between ${numericColumns[i].name} and ${numericColumns[j].name}`,
          xAxis: numericColumns[i].name,
          yAxis: numericColumns[j].name,
        })
      }
    }
  }

  // Generate line charts for datetime columns
  datetimeColumns.forEach((dateCol) => {
    numericColumns.forEach((numCol) => {
      charts.push({
        type: "line",
        title: `${numCol.name} over time`,
        description: `Line chart showing ${numCol.name} over ${dateCol.name}`,
        xAxis: dateCol.name,
        yAxis: numCol.name,
      })
    })
  })

  // Generate pie charts for categorical columns with few unique values
  categoricalColumns
    .filter((col) => col.unique_values && col.unique_values <= 5)
    .forEach((catCol) => {
      charts.push({
        type: "pie",
        title: `Distribution of ${catCol.name}`,
        description: `Pie chart showing the distribution of ${catCol.name}`,
        xAxis: catCol.name,
        yAxis: "count",
      })
    })

  return charts
}

/**
 * Generate chart data based on raw data and chart configuration
 * @param data Raw data
 * @param config Chart configuration
 * @returns Processed data for the chart
 */
export function generateChartData(data: Record<string, any>[], config: ChartConfig): any[] {
  const { type, xAxis, yAxis } = config

  if (!xAxis) {
    return []
  }

  switch (type) {
    case "bar":
      return processBarChartData(data, xAxis, yAxis as string)
    case "line":
      return data
    case "pie":
      return processPieChartData(data, xAxis)
    case "scatter":
      return data
    default:
      return data
  }
}

/**
 * Process data for bar charts
 * @param data Raw data
 * @param xAxis X-axis column
 * @param yAxis Y-axis column
 * @returns Processed data for bar chart
 */
function processBarChartData(data: Record<string, any>[], xAxis: string, yAxis: string): any[] {
  if (yAxis === "count") {
    // Count frequency of each category
    const counts: Record<string, number> = {}
    data.forEach((row) => {
      const key = String(row[xAxis] || "Unknown")
      counts[key] = (counts[key] || 0) + 1
    })
    return Object.entries(counts).map(([name, value]) => ({ name, value }))
  } else {
    // Group by category and calculate average of numeric column
    const groups: Record<string, { sum: number; count: number }> = {}
    data.forEach((row) => {
      const key = String(row[xAxis] || "Unknown")
      const value = Number(row[yAxis] || 0)
      if (!groups[key]) {
        groups[key] = { sum: 0, count: 0 }
      }
      groups[key].sum += value
      groups[key].count += 1
    })
    return Object.entries(groups).map(([name, { sum, count }]) => ({
      name,
      value: count > 0 ? sum / count : 0,
    }))
  }
}

/**
 * Process data for pie charts
 * @param data Raw data
 * @param categoryColumn Category column
 * @returns Processed data for pie chart
 */
function processPieChartData(data: Record<string, any>[], categoryColumn: string): any[] {
  // Count frequency of each category
  const counts: Record<string, number> = {}
  data.forEach((row) => {
    const key = String(row[categoryColumn] || "Unknown")
    counts[key] = (counts[key] || 0) + 1
  })
  return Object.entries(counts).map(([name, value]) => ({ name, value }))
}
