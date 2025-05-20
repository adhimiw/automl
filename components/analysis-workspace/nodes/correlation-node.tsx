"use client"

import { useState } from 'react'
import { Handle, Position, NodeProps } from 'reactflow'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { GitBranch } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function CorrelationNode({ data, isConnectable }: NodeProps) {
  const [selectedColumns, setSelectedColumns] = useState<string[]>(data.selectedColumns || [])
  const [method, setMethod] = useState<string>(data.method || 'pearson')
  const [activeTab, setActiveTab] = useState('heatmap')

  const handleColumnChange = (value: string) => {
    const newSelectedColumns = selectedColumns.includes(value)
      ? selectedColumns.filter(col => col !== value)
      : [...selectedColumns, value]
    
    setSelectedColumns(newSelectedColumns)
    data.selectedColumns = newSelectedColumns
  }

  const handleMethodChange = (value: string) => {
    setMethod(value)
    data.method = value
  }

  // Function to generate a color based on correlation value
  const getCorrelationColor = (value: number) => {
    if (isNaN(value)) return 'bg-gray-200'
    
    if (value >= 0.8) return 'bg-red-600 text-white'
    if (value >= 0.6) return 'bg-red-400 text-white'
    if (value >= 0.4) return 'bg-red-300'
    if (value >= 0.2) return 'bg-red-200'
    if (value >= 0) return 'bg-gray-100'
    if (value >= -0.2) return 'bg-blue-100'
    if (value >= -0.4) return 'bg-blue-200'
    if (value >= -0.6) return 'bg-blue-300'
    if (value >= -0.8) return 'bg-blue-400 text-white'
    return 'bg-blue-600 text-white'
  }

  return (
    <Card className="w-[350px] shadow-md">
      <CardHeader className="bg-muted/50 p-3">
        <CardTitle className="text-sm flex items-center">
          <GitBranch className="h-4 w-4 mr-2" />
          Correlation Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <div className="space-y-3">
          <div>
            <Label htmlFor="columns" className="text-xs">Select Columns</Label>
            <Select>
              <SelectTrigger id="columns" className="h-8 text-xs">
                <SelectValue placeholder="Select columns" />
              </SelectTrigger>
              <SelectContent>
                {data.columns?.map((col: string) => (
                  <SelectItem key={col} value={col} className="text-xs">{col}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="method" className="text-xs">Correlation Method</Label>
            <Select value={method} onValueChange={handleMethodChange}>
              <SelectTrigger id="method" className="h-8 text-xs">
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pearson" className="text-xs">Pearson</SelectItem>
                <SelectItem value="spearman" className="text-xs">Spearman</SelectItem>
                <SelectItem value="kendall" className="text-xs">Kendall</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {selectedColumns.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {selectedColumns.map(col => (
                <Badge key={col} variant="secondary" className="text-xs">
                  {col}
                </Badge>
              ))}
            </div>
          )}
          
          {data.results ? (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="heatmap" className="text-xs">Heatmap</TabsTrigger>
                <TabsTrigger value="table" className="text-xs">Table</TabsTrigger>
              </TabsList>
              <TabsContent value="heatmap" className="mt-2">
                <div className="max-h-[200px] overflow-auto">
                  <div className="grid grid-cols-[auto_repeat(auto-fill,minmax(60px,1fr))]">
                    {/* Header row */}
                    <div className="p-1 text-xs font-medium"></div>
                    {selectedColumns.map(col => (
                      <div key={col} className="p-1 text-xs font-medium text-center truncate" title={col}>
                        {col}
                      </div>
                    ))}
                    
                    {/* Data rows */}
                    {selectedColumns.map(row => (
                      <>
                        <div key={`row-${row}`} className="p-1 text-xs font-medium truncate" title={row}>
                          {row}
                        </div>
                        {selectedColumns.map(col => {
                          const value = data.results?.[row]?.[col] || 0
                          return (
                            <div 
                              key={`${row}-${col}`} 
                              className={`p-1 text-xs text-center ${getCorrelationColor(value)}`}
                              title={`${row} vs ${col}: ${value.toFixed(2)}`}
                            >
                              {value.toFixed(2)}
                            </div>
                          )
                        })}
                      </>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="table" className="mt-2">
                <pre className="text-xs bg-muted p-2 rounded max-h-[200px] overflow-auto">
                  {JSON.stringify(data.results, null, 2)}
                </pre>
              </TabsContent>
            </Tabs>
          ) : (
            <div className="flex items-center justify-center h-[100px] text-muted-foreground text-xs">
              Execute analysis to see results
            </div>
          )}
        </div>
      </CardContent>
      
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-primary"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-primary"
      />
    </Card>
  )
}
