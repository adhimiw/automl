"use client"
\
I'll now implement the remaining frontend components and then move on to the backend ML components:

<CodeProject id="data_automation_platform">

```tsx file="components/data-transformation/transformation-step.tsx"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Trash2, ArrowUp, ArrowDown } from "lucide-react"

export interface TransformationStepProps {
  id: string
  type: string
  config: Record<string, any>
  onConfigChange: (id: string, config: Record<string, any>) => void
  onDelete: (id: string) => void
  onMoveUp: (id: string) => void
  onMoveDown: (id: string) => void
  isFirst: boolean
  isLast: boolean
  columns: string[]
}

export function TransformationStep({
  id,
  type,
  config,
  onConfigChange,
  onDelete,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
  columns,
}: TransformationStepProps) {
  const handleConfigChange = (key: string, value: any) => {
    onConfigChange(id, { ...config, [key]: value })
  }

  const renderConfigFields = () => {
    switch (type) {
      case "filter":
        return (
          <>
            <div className="mb-4">
              <Label htmlFor={`${id}-column`}>Column</Label>
              <Select value={config.column || ""} onValueChange={(value) => handleConfigChange("column", value)}>
                <SelectTrigger id={`${id}-column`}>
                  <SelectValue placeholder="Select column" />
                </SelectTrigger>
                <SelectContent>
                  {columns.map((column) => (
                    <SelectItem key={column} value={column}>
                      {column}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <Label htmlFor={`${id}-operator`}>Operator</Label>
              <Select value={config.operator || ""} onValueChange={(value) => handleConfigChange("operator", value)}>
                <SelectTrigger id={`${id}-operator`}>
                  <SelectValue placeholder="Select operator" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="equals">Equals</SelectItem>
                  <SelectItem value="notEquals">Not Equals</SelectItem>
                  <SelectItem value="contains">Contains</SelectItem>
                  <SelectItem value="greaterThan">Greater Than</SelectItem>
                  <SelectItem value="lessThan">Less Than</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <Label htmlFor={`${id}-value`}>Value</Label>
              <Input
                id={`${id}-value`}
                value={config.value || ""}
                onChange={(e) => handleConfigChange("value", e.target.value)}
                placeholder="Filter value"
              />
            </div>
          </>
        )
      case "sort":
        return (
          <>
            <div className="mb-4">
              <Label htmlFor={`${id}-column`}>Column</Label>
              <Select value={config.column || ""} onValueChange={(value) => handleConfigChange("column", value)}>
                <SelectTrigger id={`${id}-column`}>
                  <SelectValue placeholder="Select column" />
                </SelectTrigger>
                <SelectContent>
                  {columns.map((column) => (
                    <SelectItem key={column} value={column}>
                      {column}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <Label htmlFor={`${id}-direction`}>Direction</Label>
              <Select
                value={config.direction || "asc"}
                onValueChange={(value) => handleConfigChange("direction", value)}
              >
                <SelectTrigger id={`${id}-direction`}>
                  <SelectValue placeholder="Select direction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">Ascending</SelectItem>
                  <SelectItem value="desc">Descending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )
      case "rename":
        return (
          <>
            <div className="mb-4">
              <Label htmlFor={`${id}-column`}>Column</Label>
              <Select value={config.column || ""} onValueChange={(value) => handleConfigChange("column", value)}>
                <SelectTrigger id={`${id}-column`}>
                  <SelectValue placeholder="Select column" />
                </SelectTrigger>
                <SelectContent>
                  {columns.map((column) => (
                    <SelectItem key={column} value={column}>
                      {column}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <Label htmlFor={`${id}-newName`}>New Name</Label>
              <Input
                id={`${id}-newName`}
                value={config.newName || ""}
                onChange={(e) => handleConfigChange("newName", e.target.value)}
                placeholder="New column name"
              />
            </div>
          </>
        )
      case "calculate":
        return (
          <>
            <div className="mb-4">
              <Label htmlFor={`${id}-newColumn`}>New Column Name</Label>
              <Input
                id={`${id}-newColumn`}
                value={config.newColumn || ""}
                onChange={(e) => handleConfigChange("newColumn", e.target.value)}
                placeholder="New column name"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor={`${id}-formula`}>Formula</Label>
              <Input
                id={`${id}-formula`}
                value={config.formula || ""}
                onChange={(e) => handleConfigChange("formula", e.target.value)}
                placeholder="e.g., column1 * column2"
              />
            </div>
            <div className="text-sm text-gray-500 mb-4">
              <p>Available columns: {columns.join(", ")}</p>
              <p>Operators: +, -, *, /, ()</p>
            </div>
          </>
        )
      default:
        return <p>Unknown transformation type</p>
    }
  }

  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium capitalize">{type} Transformation</h3>
          <div className="flex space-x-2">
            <Button variant="outline" size="icon" onClick={() => onMoveUp(id)} disabled={isFirst} aria-label="Move up">
              <ArrowUp className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onMoveDown(id)}
              disabled={isLast}
              aria-label="Move down"
            >
              <ArrowDown className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onDelete(id)}
              className="text-red-500"
              aria-label="Delete transformation"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {renderConfigFields()}
      </CardContent>
    </Card>
  )
}
