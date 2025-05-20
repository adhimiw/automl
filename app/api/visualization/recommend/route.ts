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
    const { dataset_id, analysis_id } = body

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

    // Get dataset analysis if analysis_id is provided
    let analysis = null
    if (analysis_id) {
      const analysisResult = await db.query(
        `SELECT * FROM analyses WHERE id = $1 AND dataset_id = $2`,
        [analysis_id, dataset_id]
      )
      
      if (analysisResult.rows.length > 0) {
        analysis = analysisResult.rows[0]
      }
    }

    // Generate visualization recommendations
    const recommendations = generateVisualizationRecommendations(dataset, analysis)

    // Log the recommendation generation
    await createAuditLog({
      user_id: userId,
      action: "visualization_recommend",
      entity_type: "dataset",
      entity_id: dataset_id.toString(),
      details: { dataset_id, analysis_id },
    })

    // Return the recommendations
    return NextResponse.json({
      success: true,
      recommendations,
    })
  } catch (error) {
    console.error("Error generating visualization recommendations:", error)
    return NextResponse.json({ error: "Failed to generate visualization recommendations" }, { status: 500 })
  }
}

/**
 * Generate visualization recommendations for a dataset
 * @param dataset Dataset metadata
 * @param analysis Dataset analysis (optional)
 * @returns Visualization recommendations
 */
function generateVisualizationRecommendations(dataset: any, analysis: any | null): any[] {
  // This is a placeholder - in a real implementation, you would use the dataset schema
  // and analysis results to generate intelligent recommendations
  
  // Mock column metadata
  const columns = [
    { name: "id", type: "numeric" },
    { name: "category", type: "categorical" },
    { name: "value1", type: "numeric" },
    { name: "value2", type: "numeric" },
    { name: "value3", type: "numeric" },
  ]
  
  // Generate recommendations based on column types
  const recommendations = []
  
  // Find categorical columns
  const categoricalColumns = columns.filter(col => col.type === "categorical")
  
  // Find numeric columns
  const numericColumns = columns.filter(col => col.type === "numeric" && col.name !== "id")
  
  // Recommendation 1: Bar chart for categorical distribution
  if (categoricalColumns.length > 0) {
    const catColumn = categoricalColumns[0]
    recommendations.push({
      id: "bar-chart-1",
      type: "bar",
      title: `Distribution of ${catColumn.name}`,
      description: `Bar chart showing the distribution of ${catColumn.name}`,
      columns: [catColumn.name],
      config: {
        xAxis: catColumn.name,
        yAxis: "count",
        color: "#3b82f6",
      },
      created_at: new Date().toISOString(),
    })
  }
  
  // Recommendation 2: Pie chart for categorical distribution
  if (categoricalColumns.length > 0) {
    const catColumn = categoricalColumns[0]
    recommendations.push({
      id: "pie-chart-1",
      type: "pie",
      title: `Distribution of ${catColumn.name}`,
      description: `Pie chart showing the distribution of ${catColumn.name}`,
      columns: [catColumn.name],
      config: {
        nameKey: catColumn.name,
        valueKey: "count",
      },
      created_at: new Date().toISOString(),
    })
  }
  
  // Recommendation 3: Line chart for numeric values
  if (numericColumns.length >= 2) {
    recommendations.push({
      id: "line-chart-1",
      type: "line",
      title: "Numeric Values Comparison",
      description: "Line chart comparing multiple numeric values",
      columns: numericColumns.map(col => col.name),
      config: {
        xAxis: "id",
        yAxisKeys: numericColumns.map(col => col.name),
      },
      created_at: new Date().toISOString(),
    })
  }
  
  // Recommendation 4: Scatter plot for correlation
  if (numericColumns.length >= 2) {
    const xColumn = numericColumns[0]
    const yColumn = numericColumns[1]
    recommendations.push({
      id: "scatter-plot-1",
      type: "scatter",
      title: `${xColumn.name} vs ${yColumn.name}`,
      description: `Scatter plot showing the relationship between ${xColumn.name} and ${yColumn.name}`,
      columns: [xColumn.name, yColumn.name],
      config: {
        xAxis: xColumn.name,
        yAxis: yColumn.name,
        color: "#ef4444",
      },
      created_at: new Date().toISOString(),
    })
  }
  
  // Recommendation 5: Bar chart for categorical vs numeric
  if (categoricalColumns.length > 0 && numericColumns.length > 0) {
    const catColumn = categoricalColumns[0]
    const numColumn = numericColumns[0]
    recommendations.push({
      id: "bar-chart-2",
      type: "bar",
      title: `${numColumn.name} by ${catColumn.name}`,
      description: `Bar chart showing ${numColumn.name} grouped by ${catColumn.name}`,
      columns: [catColumn.name, numColumn.name],
      config: {
        xAxis: catColumn.name,
        yAxis: numColumn.name,
        color: "#10b981",
      },
      created_at: new Date().toISOString(),
    })
  }
  
  return recommendations
}
