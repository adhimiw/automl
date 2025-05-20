"use client"

import { useState, useCallback, useRef, useEffect } from 'react'
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  Panel,
  MarkerType,
  Connection,
  Edge,
  Node,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Plus, 
  Play, 
  Save, 
  Trash2, 
  Filter, 
  ArrowUpDown, 
  Calculator, 
  RefreshCw,
  Database,
  FileInput
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

// Import node components
import { FilterNode } from './nodes/filter-node'
import { SortNode } from './nodes/sort-node'
import { CalculateNode } from './nodes/calculate-node'
import { OutputNode } from './nodes/output-node'

// Node types mapping
const nodeTypes = {
  filter: FilterNode,
  sort: SortNode,
  calculate: CalculateNode,
  output: OutputNode,
}

interface PipelineBuilderProps {
  datasetId: string
  columns: string[]
  onExecute?: (pipeline: any) => Promise<any>
  onSave?: (pipeline: any) => Promise<any>
}

export function PipelineBuilder({ datasetId, columns, onExecute, onSave }: PipelineBuilderProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [isExecuting, setIsExecuting] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null)
  const { toast } = useToast()

  // Initialize with input and output nodes
  useEffect(() => {
    const initialNodes = [
      {
        id: 'input',
        type: 'input',
        data: { 
          label: 'Dataset Input',
          datasetId,
        },
        position: { x: 250, y: 25 },
        style: {
          background: '#f1f5f9',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '10px',
          width: 180,
        },
      },
      {
        id: 'output',
        type: 'output',
        data: { 
          label: 'Transformed Output',
          previewAvailable: false,
          onSave: handleSaveTransformedDataset,
        },
        position: { x: 250, y: 350 },
      },
    ]
    
    setNodes(initialNodes)
  }, [datasetId, setNodes])

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ 
      ...params, 
      markerEnd: { type: MarkerType.Arrow },
      style: { stroke: '#64748b', strokeWidth: 2 },
      animated: true,
    }, eds)),
    [setEdges]
  )

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()

      const type = event.dataTransfer.getData('application/reactflow')
      
      if (!type || !reactFlowInstance || !reactFlowWrapper.current) return

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      })
      
      const newNode = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: { 
          availableColumns: columns,
        },
      }

      setNodes((nds) => nds.concat(newNode))
    },
    [reactFlowInstance, setNodes, columns]
  )

  const onNodeDragStop = useCallback((_: React.MouseEvent, node: Node) => {
    // Update node position in state if needed
  }, [])

  const handleExecutePipeline = async () => {
    try {
      setIsExecuting(true)
      
      // Validate pipeline
      const inputConnections = edges.filter(edge => edge.source === 'input')
      if (inputConnections.length === 0) {
        toast({
          title: 'Invalid Pipeline',
          description: 'Input node must be connected to at least one transformation',
          variant: 'destructive',
        })
        return
      }

      const outputConnections = edges.filter(edge => edge.target === 'output')
      if (outputConnections.length === 0) {
        toast({
          title: 'Invalid Pipeline',
          description: 'Output node must be connected to a transformation',
          variant: 'destructive',
        })
        return
      }
      
      // Create pipeline definition
      const pipeline = {
        datasetId,
        nodes: nodes.map(node => ({
          id: node.id,
          type: node.type,
          data: node.data,
        })),
        edges: edges,
      }
      
      // Execute pipeline
      if (onExecute) {
        const result = await onExecute(pipeline)
        
        // Update output node with preview data
        setNodes(nodes => nodes.map(node => {
          if (node.id === 'output') {
            return {
              ...node,
              data: {
                ...node.data,
                previewAvailable: true,
                rowCount: result.rowCount,
                columnCount: result.columnCount,
              }
            }
          }
          return node
        }))
        
        toast({
          title: 'Pipeline Executed',
          description: `Transformed dataset has ${result.rowCount} rows and ${result.columnCount} columns`,
        })
      }
    } catch (error) {
      console.error('Error executing pipeline:', error)
      toast({
        title: 'Execution Failed',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: 'destructive',
      })
    } finally {
      setIsExecuting(false)
    }
  }

  const handleSaveTransformedDataset = async () => {
    try {
      setIsSaving(true)
      
      // Create pipeline definition
      const pipeline = {
        datasetId,
        nodes: nodes.map(node => ({
          id: node.id,
          type: node.type,
          data: node.data,
        })),
        edges: edges,
      }
      
      // Save pipeline and transformed dataset
      if (onSave) {
        const result = await onSave(pipeline)
        
        toast({
          title: 'Dataset Saved',
          description: `Transformed dataset "${result.name}" has been saved`,
        })
      }
    } catch (error) {
      console.error('Error saving transformed dataset:', error)
      toast({
        title: 'Save Failed',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: 'destructive',
      })
    } finally {
      setIsSaving(false)
    }
  }

  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <div className="h-[600px] w-full">
      <ReactFlowProvider>
        <div className="h-full w-full" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeDragStop={onNodeDragStop}
            nodeTypes={nodeTypes}
            fitView
          >
            <Controls />
            <Background />
            
            <Panel position="top-right">
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  onClick={handleExecutePipeline}
                  disabled={isExecuting}
                >
                  {isExecuting ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Executing...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Execute Pipeline
                    </>
                  )}
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => {
                    setNodes([])
                    setEdges([])
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              </div>
            </Panel>
            
            <Panel position="top-left">
              <Card>
                <CardContent className="p-3">
                  <h3 className="text-sm font-medium mb-2">Transformations</h3>
                  <div className="flex flex-col gap-2">
                    <div
                      className="border rounded p-2 flex items-center cursor-grab bg-background"
                      onDragStart={(e) => onDragStart(e, 'filter')}
                      draggable
                    >
                      <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">Filter</span>
                    </div>
                    <div
                      className="border rounded p-2 flex items-center cursor-grab bg-background"
                      onDragStart={(e) => onDragStart(e, 'sort')}
                      draggable
                    >
                      <ArrowUpDown className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">Sort</span>
                    </div>
                    <div
                      className="border rounded p-2 flex items-center cursor-grab bg-background"
                      onDragStart={(e) => onDragStart(e, 'calculate')}
                      draggable
                    >
                      <Calculator className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">Calculate</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Panel>
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  )
}
