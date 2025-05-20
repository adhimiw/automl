"use client"

import { useState } from 'react'
import { Handle, Position, NodeProps } from 'reactflow'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Database } from 'lucide-react'

export function DataSourceNode({ data, isConnectable }: NodeProps) {
  const [selectedColumns, setSelectedColumns] = useState<string[]>(data.selectedColumns || [])

  const handleColumnChange = (value: string) => {
    const newSelectedColumns = selectedColumns.includes(value)
      ? selectedColumns.filter(col => col !== value)
      : [...selectedColumns, value]
    
    setSelectedColumns(newSelectedColumns)
    data.selectedColumns = newSelectedColumns
  }

  return (
    <Card className="w-[280px] shadow-md">
      <CardHeader className="bg-muted/50 p-3">
        <CardTitle className="text-sm flex items-center">
          <Database className="h-4 w-4 mr-2" />
          Dataset Source
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Dataset:</span>
            <Badge variant="outline" className="text-xs">{data.datasetId}</Badge>
          </div>
          
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
          
          {selectedColumns.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {selectedColumns.map(col => (
                <Badge key={col} variant="secondary" className="text-xs">
                  {col}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
      
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-primary"
      />
    </Card>
  )
}
