"use client"

import { useState } from 'react'
import { Handle, Position, NodeProps } from 'reactflow'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Sigma, RefreshCw } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function StatsSummaryNode({ data, isConnectable }: NodeProps) {
  const [selectedColumns, setSelectedColumns] = useState<string[]>(data.selectedColumns || [])
  const [activeTab, setActiveTab] = useState('table')

  const handleColumnChange = (value: string) => {
    const newSelectedColumns = selectedColumns.includes(value)
      ? selectedColumns.filter(col => col !== value)
      : [...selectedColumns, value]
    
    setSelectedColumns(newSelectedColumns)
    data.selectedColumns = newSelectedColumns
  }

  return (
    <Card className="w-[350px] shadow-md">
      <CardHeader className="bg-muted/50 p-3">
        <CardTitle className="text-sm flex items-center">
          <Sigma className="h-4 w-4 mr-2" />
          Statistics Summary
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
                <TabsTrigger value="table" className="text-xs">Table</TabsTrigger>
                <TabsTrigger value="json" className="text-xs">JSON</TabsTrigger>
              </TabsList>
              <TabsContent value="table" className="mt-2">
                <div className="max-h-[200px] overflow-auto">
                  <Table className="text-xs">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Metric</TableHead>
                        {selectedColumns.map(col => (
                          <TableHead key={col}>{col}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {['count', 'mean', 'std', 'min', '25%', '50%', '75%', 'max'].map(metric => (
                        <TableRow key={metric}>
                          <TableCell className="font-medium">{metric}</TableCell>
                          {selectedColumns.map(col => (
                            <TableCell key={col}>
                              {data.results[col]?.[metric]?.toFixed(2) || 'N/A'}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              <TabsContent value="json" className="mt-2">
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
