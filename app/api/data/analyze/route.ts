import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { parseUserId } from "@/lib/utils/user-id"
import db from "@/lib/db"
import { createAuditLog } from "@/lib/db/audit-logs"

export async function POST(request: Request) {
  try {
    // Check authentication
    const session = await getServerSession()
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Parse and validate the user ID
    const userId = parseUserId(session.user.id)
    if (userId === null) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 })
    }

    // Get request body
    const body = await request.json()
    const { dataset_id } = body

    // Validate input
    if (!dataset_id) {
      return NextResponse.json({ error: "Dataset ID is required" }, { status: 400 })
    }

    // Check if dataset exists and user has access
    const datasetResult = await db.query(
      `SELECT d.*, p.user_id 
       FROM datasets d
       JOIN projects p ON d.project_id = p.id
       WHERE d.id = $1`,
      [dataset_id]
    )

    if (datasetResult.rows.length === 0) {
      return NextResponse.json({ error: "Dataset not found" }, { status: 404 })
    }

    const dataset = datasetResult.rows[0]
    
    // Check if user has access to the dataset
    if (dataset.user_id !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // Get dataset data
    // In a real implementation, you would load the dataset from storage
    // For now, we'll generate mock data for demonstration
    const data = generateMockData(dataset)

    // Analyze the data
    const analysis = analyzeData(data, dataset)

    // Log the analysis
    await createAuditLog({
      user_id: userId,
      action: "dataset_analyze",
      entity_type: "dataset",
      entity_id: dataset_id.toString(),
      details: { dataset_id },
    })

    // Return the analysis
    return NextResponse.json({
      success: true,
      analysis,
    })
  } catch (error) {
    console.error("Error analyzing dataset:", error)
    return NextResponse.json({ error: "Failed to analyze dataset" }, { status: 500 })
  }
}

/**
 * Generate mock data for a dataset
 * @param dataset Dataset metadata
 * @returns Mock data
 */
function generateMockData(dataset: any): any[] {
  const { row_count = 100, column_count = 5 } = dataset
  const data = []

  // Generate column names
  const columns = []
  for (let i = 0; i < column_count; i++) {
    if (i === 0) {
      columns.push("id")
    } else if (i === 1) {
      columns.push("category")
    } else {
      columns.push(`value${i}`)
    }
  }

  // Generate rows
  for (let i = 0; i < Math.min(row_count, 1000); i++) {
    const row: Record<string, any> = {}
    
    // Generate values for each column
    columns.forEach((column, j) => {
      if (column === "id") {
        row[column] = i + 1
      } else if (column === "category") {
        const categories = ["A", "B", "C", "D"]
        row[column] = categories[Math.floor(Math.random() * categories.length)]
      } else {
        // Generate numeric values
        row[column] = Math.round(Math.random() * 100)
      }
    })
    
    data.push(row)
  }

  return data
}

/**
 * Analyze data
 * @param data Dataset data
 * @param dataset Dataset metadata
 * @returns Analysis results
 */
function analyzeData(data: any[], dataset: any): any {
  // Extract column names
  const columns = Object.keys(data[0] || {})

  // Calculate basic statistics for each column
  const columnStats = columns.map(column => {
    const values = data.map(row => row[column])
    
    // Determine column type
    let type = "unknown"
    if (column === "id") {
      type = "id"
    } else if (column === "category") {
      type = "categorical"
    } else {
      type = "numeric"
    }
    
    // Calculate statistics based on column type
    const stats: Record<string, any> = {
      name: column,
      type,
      count: values.length,
      missing: values.filter(v => v === null || v === undefined).length,
      unique: new Set(values).size,
    }
    
    if (type === "numeric") {
      const numericValues = values.filter(v => typeof v === "number")
      if (numericValues.length > 0) {
        stats.min = Math.min(...numericValues)
        stats.max = Math.max(...numericValues)
        stats.mean = numericValues.reduce((sum, v) => sum + v, 0) / numericValues.length
        
        // Calculate median
        const sorted = [...numericValues].sort((a, b) => a - b)
        const mid = Math.floor(sorted.length / 2)
        stats.median = sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid]
        
        // Calculate standard deviation
        const variance = numericValues.reduce((sum, v) => sum + Math.pow(v - stats.mean, 2), 0) / numericValues.length
        stats.std = Math.sqrt(variance)
      }
    } else if (type === "categorical") {
      // Calculate frequency distribution
      const frequencies: Record<string, number> = {}
      values.forEach(value => {
        const key = String(value)
        frequencies[key] = (frequencies[key] || 0) + 1
      })
      stats.frequencies = Object.entries(frequencies)
        .map(([value, count]) => ({ value, count }))
        .sort((a, b) => b.count - a.count)
    }
    
    return stats
  })

  // Calculate correlations between numeric columns
  const numericColumns = columnStats.filter(col => col.type === "numeric")
  const correlations: Record<string, Record<string, number>> = {}
  
  numericColumns.forEach(col1 => {
    correlations[col1.name] = {}
    numericColumns.forEach(col2 => {
      if (col1.name === col2.name) {
        correlations[col1.name][col2.name] = 1
      } else {
        // Calculate correlation
        const values1 = data.map(row => row[col1.name])
        const values2 = data.map(row => row[col2.name])
        
        // Calculate means
        const mean1 = values1.reduce((sum, v) => sum + v, 0) / values1.length
        const mean2 = values2.reduce((sum, v) => sum + v, 0) / values2.length
        
        // Calculate covariance and variances
        let covariance = 0
        let variance1 = 0
        let variance2 = 0
        
        for (let i = 0; i < values1.length; i++) {
          const diff1 = values1[i] - mean1
          const diff2 = values2[i] - mean2
          covariance += diff1 * diff2
          variance1 += diff1 * diff1
          variance2 += diff2 * diff2
        }
        
        // Calculate correlation coefficient
        const correlation = covariance / (Math.sqrt(variance1) * Math.sqrt(variance2))
        correlations[col1.name][col2.name] = correlation
      }
    })
  })

  return {
    dataset_id: dataset.id,
    dataset_name: dataset.name,
    row_count: data.length,
    column_count: columns.length,
    columns: columnStats,
    correlations,
    created_at: new Date().toISOString(),
  }
}
