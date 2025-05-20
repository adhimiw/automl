"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  BarChart,
  Bar,
  Cell
} from "recharts"
import { 
  HelpCircle,
  BarChart2,
  LineChart as LineChartIcon,
  PieChart,
  Activity
} from "lucide-react"
import { 
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

interface ModelComparisonDashboardProps {
  modelId: string
  metrics: Record<string, any>
  confusionMatrix?: number[][]
  featureImportance?: Record<string, number>
  rocCurve?: Array<{x: number, y: number}>
  precisionRecallCurve?: Array<{x: number, y: number}>
  residualPlot?: Array<{actual: number, predicted: number}>
  problemType: string
  showOnlyVisualizations?: boolean
}

export function ModelComparisonDashboard({ 
  modelId,
  metrics,
  confusionMatrix,
  featureImportance,
  rocCurve,
  precisionRecallCurve,
  residualPlot,
  problemType,
  showOnlyVisualizations = false
}: ModelComparisonDashboardProps) {
  const [activeTab, setActiveTab] = useState(
    problemType === "regression" ? "residuals" : "confusion"
  )
  
  // Colors for charts
  const COLORS = [
    "#8884d8", "#83a6ed", "#8dd1e1", "#82ca9d", "#a4de6c",
    "#d0ed57", "#ffc658", "#ff8042", "#ff6361", "#bc5090"
  ]
  
  // Format feature importance for chart
  const featureImportanceData = featureImportance 
    ? Object.entries(featureImportance)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 10) // Show top 10 features
    : []
  
  // Format confusion matrix for display
  const formatConfusionMatrix = () => {
    if (!confusionMatrix) return null
    
    // For binary classification
    if (confusionMatrix.length === 2 && confusionMatrix[0].length === 2) {
      const [[tn, fp], [fn, tp]] = confusionMatrix
      
      return (
        <div className="grid grid-cols-2 grid-rows-2 gap-px bg-muted text-center">
          <div className="bg-background p-4">
            <div className="font-medium">True Negative</div>
            <div className="text-2xl font-bold mt-2">{tn}</div>
          </div>
          <div className="bg-background p-4">
            <div className="font-medium">False Positive</div>
            <div className="text-2xl font-bold mt-2">{fp}</div>
          </div>
          <div className="bg-background p-4">
            <div className="font-medium">False Negative</div>
            <div className="text-2xl font-bold mt-2">{fn}</div>
          </div>
          <div className="bg-background p-4">
            <div className="font-medium">True Positive</div>
            <div className="text-2xl font-bold mt-2">{tp}</div>
          </div>
        </div>
      )
    }
    
    // For multiclass classification
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-2 border bg-muted">Actual ↓ / Predicted →</th>
              {confusionMatrix[0].map((_, i) => (
                <th key={i} className="p-2 border bg-muted">Class {i}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {confusionMatrix.map((row, i) => (
              <tr key={i}>
                <th className="p-2 border bg-muted">Class {i}</th>
                {row.map((cell, j) => (
                  <td 
                    key={j} 
                    className={`p-2 border text-center ${
                      i === j ? 'bg-green-50 font-medium' : ''
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
  
  // Format residual plot data
  const residualData = residualPlot || []
  
  // Format ROC curve data
  const rocData = rocCurve || []
  
  // Format precision-recall curve data
  const prData = precisionRecallCurve || []

  return (
    <div className="space-y-6">
      {!showOnlyVisualizations && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Model Performance Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(metrics)
                .filter(([key]) => !key.includes('history') && typeof metrics[key] !== 'object')
                .slice(0, 4) // Show only top 4 metrics
                .map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      {key.replace(/_/g, ' ').toUpperCase()}
                    </div>
                    <div className="text-2xl font-bold">
                      {typeof value === 'number' ? value.toFixed(4) : value}
                    </div>
                  </div>
                ))
              }
            </div>
          </CardContent>
        </Card>
      )}
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          {problemType !== "regression" && (
            <TabsTrigger value="confusion" className="flex items-center">
              <BarChart2 className="h-4 w-4 mr-2" />
              Confusion Matrix
            </TabsTrigger>
          )}
          {problemType === "regression" && (
            <TabsTrigger value="residuals" className="flex items-center">
              <ScatterChart className="h-4 w-4 mr-2" />
              Residual Plot
            </TabsTrigger>
          )}
          <TabsTrigger value="importance" className="flex items-center">
            <BarChart2 className="h-4 w-4 mr-2" />
            Feature Importance
          </TabsTrigger>
          {problemType !== "regression" && (
            <TabsTrigger value="roc" className="flex items-center">
              <LineChartIcon className="h-4 w-4 mr-2" />
              ROC Curve
            </TabsTrigger>
          )}
          {problemType !== "regression" && (
            <TabsTrigger value="pr" className="flex items-center">
              <Activity className="h-4 w-4 mr-2" />
              Precision-Recall
            </TabsTrigger>
          )}
        </TabsList>
        
        {problemType !== "regression" && (
          <TabsContent value="confusion" className="pt-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Confusion Matrix</CardTitle>
                  <TooltipProvider>
                    <UITooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <HelpCircle className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-sm">
                        <p>The confusion matrix shows the counts of true positives, false positives, true negatives, and false negatives.</p>
                      </TooltipContent>
                    </UITooltip>
                  </TooltipProvider>
                </div>
              </CardHeader>
              <CardContent>
                {formatConfusionMatrix() || (
                  <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                    No confusion matrix data available
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        )}
        
        {problemType === "regression" && (
          <TabsContent value="residuals" className="pt-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Residual Plot</CardTitle>
                  <TooltipProvider>
                    <UITooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <HelpCircle className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-sm">
                        <p>The residual plot shows the difference between actual and predicted values. Ideally, points should be randomly scattered around the horizontal axis.</p>
                      </TooltipContent>
                    </UITooltip>
                  </TooltipProvider>
                </div>
              </CardHeader>
              <CardContent>
                {residualData.length > 0 ? (
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart
                        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                      >
                        <CartesianGrid />
                        <XAxis 
                          type="number" 
                          dataKey="actual" 
                          name="Actual" 
                          label={{ value: 'Actual Values', position: 'insideBottomRight', offset: -10 }}
                        />
                        <YAxis 
                          type="number" 
                          dataKey="predicted" 
                          name="Predicted" 
                          label={{ value: 'Predicted Values', angle: -90, position: 'insideLeft' }}
                        />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                        <Line 
                          type="monotone" 
                          dataKey="predicted" 
                          stroke="#ff7300" 
                          dot={false} 
                        />
                        <Scatter name="Values" data={residualData} fill="#8884d8" />
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                    No residual plot data available
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        )}
        
        <TabsContent value="importance" className="pt-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Feature Importance</CardTitle>
                <TooltipProvider>
                  <UITooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <HelpCircle className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-sm">
                      <p>Feature importance shows which features have the most impact on the model's predictions.</p>
                    </TooltipContent>
                  </UITooltip>
                </TooltipProvider>
              </div>
            </CardHeader>
            <CardContent>
              {featureImportanceData.length > 0 ? (
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={featureImportanceData}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis 
                        type="category" 
                        dataKey="name" 
                        width={120}
                        tick={{ fontSize: 12 }}
                      />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#8884d8">
                        {featureImportanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                  No feature importance data available
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {problemType !== "regression" && (
          <TabsContent value="roc" className="pt-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">ROC Curve</CardTitle>
                  <TooltipProvider>
                    <UITooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <HelpCircle className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-sm">
                        <p>The ROC curve shows the trade-off between true positive rate and false positive rate. A perfect classifier would reach the top-left corner.</p>
                      </TooltipContent>
                    </UITooltip>
                  </TooltipProvider>
                </div>
              </CardHeader>
              <CardContent>
                {rocData.length > 0 ? (
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={rocData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="x" 
                          label={{ value: 'False Positive Rate', position: 'insideBottomRight', offset: -10 }}
                        />
                        <YAxis 
                          label={{ value: 'True Positive Rate', angle: -90, position: 'insideLeft' }}
                        />
                        <Tooltip />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="y" 
                          name="ROC Curve" 
                          stroke="#8884d8" 
                          activeDot={{ r: 8 }} 
                        />
                        {/* Diagonal reference line */}
                        <Line 
                          type="monotone" 
                          dataKey="x" 
                          name="Random Classifier" 
                          stroke="#ff7300" 
                          strokeDasharray="5 5" 
                          dot={false} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                    No ROC curve data available
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        )}
        
        {problemType !== "regression" && (
          <TabsContent value="pr" className="pt-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Precision-Recall Curve</CardTitle>
                  <TooltipProvider>
                    <UITooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <HelpCircle className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-sm">
                        <p>The precision-recall curve shows the trade-off between precision and recall. A perfect classifier would reach the top-right corner.</p>
                      </TooltipContent>
                    </UITooltip>
                  </TooltipProvider>
                </div>
              </CardHeader>
              <CardContent>
                {prData.length > 0 ? (
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={prData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="x" 
                          label={{ value: 'Recall', position: 'insideBottomRight', offset: -10 }}
                        />
                        <YAxis 
                          label={{ value: 'Precision', angle: -90, position: 'insideLeft' }}
                        />
                        <Tooltip />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="y" 
                          name="Precision-Recall Curve" 
                          stroke="#8884d8" 
                          activeDot={{ r: 8 }} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                    No precision-recall curve data available
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
