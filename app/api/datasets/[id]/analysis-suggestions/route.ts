import { NextRequest, NextResponse } from 'next/server'
import { generateAnalysisSuggestions } from '@/lib/ai/analysis-suggestions'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const datasetId = params.id
    
    // In a real app, fetch the dataset from the database
    // For now, we'll use mock data
    const mockDataset = {
      name: "Sales Data",
      description: "Monthly sales data with expenses and profit by category",
      rowCount: 12,
      columns: [
        { name: "month", type: "string" },
        { name: "sales", type: "number" },
        { name: "expenses", type: "number" },
        { name: "profit", type: "number" },
        { name: "category", type: "string" },
      ],
      sampleData: [
        { month: "Jan", sales: 1200, expenses: 800, profit: 400, category: "A" },
        { month: "Feb", sales: 1400, expenses: 900, profit: 500, category: "B" },
        { month: "Mar", sales: 1100, expenses: 700, profit: 400, category: "A" },
      ]
    }
    
    // Generate analysis suggestions
    const suggestions = await generateAnalysisSuggestions(mockDataset)
    
    return NextResponse.json({ suggestions })
  } catch (error) {
    console.error('Error generating analysis suggestions:', error)
    return NextResponse.json(
      { error: 'Failed to generate analysis suggestions' },
      { status: 500 }
    )
  }
}
