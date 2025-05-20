"use client"

import { useState } from 'react'
import { Handle, Position, NodeProps } from 'reactflow'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Calculator } from 'lucide-react'

export function CalculateNode({ data, isConnectable }: NodeProps) {
  const [newColumn, setNewColumn] = useState(data.newColumn || '')
  const [formula, setFormula] = useState(data.formula || '')

  const handleNewColumnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewColumn(e.target.value)
    data.newColumn = e.target.value
  }

  const handleFormulaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormula(e.target.value)
    data.formula = e.target.value
  }

  return (
    <Card className="w-[280px] shadow-md">
      <CardHeader className="bg-muted/50 p-3">
        <CardTitle className="text-sm flex items-center">
          <Calculator className="h-4 w-4 mr-2" />
          Calculate Field
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <div className="space-y-3">
          <div>
            <Label htmlFor="newColumn" className="text-xs">New Column Name</Label>
            <Input 
              id="newColumn" 
              value={newColumn} 
              onChange={handleNewColumnChange} 
              className="h-8 text-xs"
              placeholder="Enter new column name"
            />
          </div>
          
          <div>
            <Label htmlFor="formula" className="text-xs">Formula</Label>
            <Input 
              id="formula" 
              value={formula} 
              onChange={handleFormulaChange} 
              className="h-8 text-xs"
              placeholder="e.g., column1 * column2"
            />
          </div>
          
          <div className="text-xs text-muted-foreground">
            <p>Available columns:</p>
            <p className="text-xs font-mono mt-1 overflow-x-auto whitespace-nowrap">
              {data.availableColumns?.join(', ')}
            </p>
            <p className="mt-1">Operators: +, -, *, /, ()</p>
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
