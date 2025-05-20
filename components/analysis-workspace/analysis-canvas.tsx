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
import {
  Plus,
  Play,
  Save,
  Trash2,
  BarChart2,
  LineChart,
  PieChart,
  Calculator,
  RefreshCw,
  Table,
  FileText,
  Sigma,
  GitBranch,
  Workflow,
  HelpCircle
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { ComponentHelp } from './component-help'

// Import node components
import { StatsSummaryNode } from './nodes/stats-summary-node'
import { CorrelationNode } from './nodes/correlation-node'
import { BarChartNode } from './nodes/bar-chart-node'
import { ScatterPlotNode } from './nodes/scatter-plot-node'
import { DataSourceNode } from './nodes/data-source-node'
import { OutputNode } from './nodes/output-node'

// Node types mapping
const nodeTypes = {
  statsSummary: StatsSummaryNode,
  correlation: CorrelationNode,
  barChart: BarChartNode,
  scatterPlot: ScatterPlotNode,
  dataSource: DataSourceNode,
  output: OutputNode,
}

interface AnalysisCanvasProps {
  datasetId: string
  columns: string[]
  data?: any[]
  onExecute?: (analysis: any) => Promise<any>
  onSave?: (analysis: any) => Promise<any>
}

export function AnalysisCanvas({ datasetId, columns, data, onExecute, onSave }: AnalysisCanvasProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [isExecuting, setIsExecuting] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const [showHelp, setShowHelp] = useState(false)
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null)
  const { toast } = useToast()

  // Initialize with data source node
  useEffect(() => {
    const initialNodes = [
      {
        id: 'dataSource',
        type: 'dataSource',
        data: {
          label: 'Dataset Source',
          datasetId,
          columns,
          data,
        },
        position: { x: 250, y: 25 },
      },
      {
        id: 'output',
        type: 'output',
        data: {
          label: 'Analysis Output',
          onSave: handleSaveAnalysis,
        },
        position: { x: 250, y: 400 },
      },
    ]

    setNodes(initialNodes)
  }, [datasetId, columns, data, setNodes])

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
          columns,
          data,
        },
      }

      setNodes((nds) => nds.concat(newNode))
    },
    [reactFlowInstance, setNodes, columns, data]
  )

  const handleExecuteAnalysis = async () => {
    try {
      setIsExecuting(true)

      // Validate analysis flow
      const dataSourceConnections = edges.filter(edge => edge.source === 'dataSource')
      if (dataSourceConnections.length === 0) {
        toast({
          title: 'Invalid Analysis Flow',
          description: 'Data source node must be connected to at least one analysis component',
          variant: 'destructive',
        })
        return
      }

      // Create analysis definition
      const analysis = {
        datasetId,
        nodes: nodes.map(node => ({
          id: node.id,
          type: node.type,
          data: node.data,
        })),
        edges: edges,
      }

      // Execute analysis
      if (onExecute) {
        const result = await onExecute(analysis)

        // Update nodes with results
        setNodes(nodes => nodes.map(node => {
          if (node.id !== 'dataSource' && node.id !== 'output') {
            return {
              ...node,
              data: {
                ...node.data,
                results: result[node.id],
              }
            }
          }
          return node
        }))

        toast({
          title: 'Analysis Executed',
          description: 'Analysis components have been updated with results',
        })
      }
    } catch (error) {
      console.error('Error executing analysis:', error)
      toast({
        title: 'Execution Failed',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: 'destructive',
      })
    } finally {
      setIsExecuting(false)
    }
  }

  const handleSaveAnalysis = async () => {
    try {
      setIsSaving(true)

      // Create analysis definition
      const analysis = {
        datasetId,
        nodes: nodes.map(node => ({
          id: node.id,
          type: node.type,
          data: node.data,
        })),
        edges: edges,
      }

      // Save analysis
      if (onSave) {
        const result = await onSave(analysis)

        toast({
          title: 'Analysis Saved',
          description: `Analysis "${result.name}" has been saved`,
        })
      }
    } catch (error) {
      console.error('Error saving analysis:', error)
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
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView
          >
            <Controls />
            <Background />

            <Panel position="top-right">
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleExecuteAnalysis}
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
                      Execute Analysis
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
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    // Show help for the analysis canvas itself
                    setSelectedNode({
                      id: 'canvas',
                      type: 'Analysis Canvas',
                      data: { columns, data },
                      position: { x: 0, y: 0 },
                    } as Node)
                    setShowHelp(true)
                  }}
                >
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Help
                </Button>
              </div>
            </Panel>

            <Panel position="top-left">
              <Card>
                <CardContent className="p-3">
                  <h3 className="text-sm font-medium mb-2">Analysis Components</h3>
                  <div className="flex flex-col gap-2">
                    <div
                      className="border rounded p-2 flex items-center cursor-grab bg-background"
                      onDragStart={(e) => onDragStart(e, 'statsSummary')}
                      draggable
                    >
                      <Sigma className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">Statistics Summary</span>
                    </div>
                    <div
                      className="border rounded p-2 flex items-center cursor-grab bg-background"
                      onDragStart={(e) => onDragStart(e, 'correlation')}
                      draggable
                    >
                      <GitBranch className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">Correlation Analysis</span>
                    </div>
                    <div
                      className="border rounded p-2 flex items-center cursor-grab bg-background"
                      onDragStart={(e) => onDragStart(e, 'barChart')}
                      draggable
                    >
                      <BarChart2 className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">Bar Chart</span>
                    </div>
                    <div
                      className="border rounded p-2 flex items-center cursor-grab bg-background"
                      onDragStart={(e) => onDragStart(e, 'scatterPlot')}
                      draggable
                    >
                      <Workflow className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">Scatter Plot</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Panel>

            {showHelp && selectedNode && (
              <Panel position="bottom-right" className="w-96">
                <ComponentHelp
                  componentType={selectedNode.type || 'unknown'}
                  context={selectedNode.data}
                  onClose={() => setShowHelp(false)}
                />
              </Panel>
            )}
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  )
}
