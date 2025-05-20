"use client"

import { useState } from 'react'
import { Handle, Position, NodeProps } from 'reactflow'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Filter } from 'lucide-react'

export function FilterNode({ data, isConnectable }: NodeProps) {
  const [column, setColumn] = useState(data.column || '')
  const [operator, setOperator] = useState(data.operator || 'equals')
  const [value, setValue] = useState(data.value || '')

  const handleColumnChange = (value: string) => {
    setColumn(value)
    data.column = value
  }

  const handleOperatorChange = (value: string) => {
    setOperator(value)
    data.operator = value
  }

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    data.value = e.target.value
  }

  return (
    <Card className="w-[280px] shadow-md">
      <CardHeader className="bg-muted/50 p-3">
        <CardTitle className="text-sm flex items-center">
          <Filter className="h-4 w-4 mr-2" />
          Filter Data
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
            <Label htmlFor="operator" className="text-xs">Operator</Label>
            <Select value={operator} onValueChange={handleOperatorChange}>
              <SelectTrigger id="operator" className="h-8 text-xs">
                <SelectValue placeholder="Select operator" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="equals" className="text-xs">Equals</SelectItem>
                <SelectItem value="not_equals" className="text-xs">Not Equals</SelectItem>
                <SelectItem value="greater_than" className="text-xs">Greater Than</SelectItem>
                <SelectItem value="less_than" className="text-xs">Less Than</SelectItem>
                <SelectItem value="contains" className="text-xs">Contains</SelectItem>
                <SelectItem value="starts_with" className="text-xs">Starts With</SelectItem>
                <SelectItem value="ends_with" className="text-xs">Ends With</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="value" className="text-xs">Value</Label>
            <Input 
              id="value" 
              value={value} 
              onChange={handleValueChange} 
              className="h-8 text-xs"
              placeholder="Enter value"
            />
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
