"use client"

import { useState } from 'react'
import { Handle, Position, NodeProps } from 'reactflow'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { ArrowUpDown } from 'lucide-react'

export function SortNode({ data, isConnectable }: NodeProps) {
  const [column, setColumn] = useState(data.column || '')
  const [direction, setDirection] = useState(data.direction || 'ascending')

  const handleColumnChange = (value: string) => {
    setColumn(value)
    data.column = value
  }

  const handleDirectionChange = (value: string) => {
    setDirection(value)
    data.direction = value
  }

  return (
    <Card className="w-[280px] shadow-md">
      <CardHeader className="bg-muted/50 p-3">
        <CardTitle className="text-sm flex items-center">
          <ArrowUpDown className="h-4 w-4 mr-2" />
          Sort Data
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <div className="space-y-3">
          <div>
            <Label htmlFor="column" className="text-xs">Column</Label>
            <Select value={column} onValueChange={handleColumnChange}>
              <SelectTrigger id="column" className="h-8 text-xs">
                <SelectValue placeholder="Select column" />
              </SelectTrigger>
              <SelectContent>
                {data.availableColumns?.map((col: string) => (
                  <SelectItem key={col} value={col} className="text-xs">{col}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="direction" className="text-xs">Direction</Label>
            <Select value={direction} onValueChange={handleDirectionChange}>
              <SelectTrigger id="direction" className="h-8 text-xs">
                <SelectValue placeholder="Select direction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ascending" className="text-xs">Ascending</SelectItem>
                <SelectItem value="descending" className="text-xs">Descending</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
