"use client"

import { Handle, Position, NodeProps } from 'reactflow'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Save, FileText } from 'lucide-react'

export function OutputNode({ data, isConnectable }: NodeProps) {
  return (
    <Card className="w-[280px] shadow-md">
      <CardHeader className="bg-muted/50 p-3">
        <CardTitle className="text-sm flex items-center">
          <FileText className="h-4 w-4 mr-2" />
          Analysis Output
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <div className="space-y-3">
          {data.resultsAvailable ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Components:</span>
                <Badge variant="outline" className="text-xs">{data.componentCount}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Visualizations:</span>
                <Badge variant="outline" className="text-xs">{data.visualizationCount}</Badge>
              </div>
              <Button 
                size="sm" 
                className="w-full text-xs mt-2"
                onClick={data.onSave}
              >
                <Save className="h-3 w-3 mr-1" />
                Save Analysis
              </Button>
            </div>
          ) : (
            <div className="text-center py-2">
              <p className="text-xs text-muted-foreground">
                Connect analysis components to see results
              </p>
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
    </Card>
  )
}
