"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LucideBarChart2, LucideEdit } from "lucide-react"

export function ColumnList() {
  // Mock data for demonstration
  const columns = [
    {
      name: "id",
      type: "integer",
      completeness: 100,
      uniqueness: 100,
      min: 1,
      max: 1245,
      mean: 623,
      stdDev: 359.2,
      distribution: "uniform",
    },
    {
      name: "name",
      type: "string",
      completeness: 100,
      uniqueness: 99.8,
      minLength: 5,
      maxLength: 28,
      avgLength: 12.4,
      topValues: ["John Smith", "Jane Doe", "Michael Brown"],
    },
    {
      name: "age",
      type: "integer",
      completeness: 96.8,
      uniqueness: 5.2,
      min: 18,
      max: 82,
      mean: 42.7,
      stdDev: 12.3,
      distribution: "normal",
    },
    {
      name: "gender",
      type: "string",
      completeness: 98.4,
      uniqueness: 0.2,
      categories: ["Male", "Female", "Other"],
      topValues: ["Male", "Female", "Other"],
      distribution: "categorical",
    },
    {
      name: "income",
      type: "float",
      completeness: 94.5,
      uniqueness: 78.3,
      min: 25000,
      max: 150000,
      mean: 68452.32,
      stdDev: 18234.45,
      distribution: "right-skewed",
    },
    {
      name: "spending",
      type: "float",
      completeness: 93.2,
      uniqueness: 82.1,
      min: 12000,
      max: 120000,
      mean: 51234.87,
      stdDev: 15432.12,
      distribution: "right-skewed",
    },
    {
      name: "category",
      type: "string",
      completeness: 97.8,
      uniqueness: 0.3,
      categories: ["A", "B", "C", "D"],
      topValues: ["A", "B", "C", "D"],
      distribution: "categorical",
    },
  ]

  const [selectedColumn, setSelectedColumn] = useState(columns[0])

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-1 border rounded-md overflow-hidden">
        <div className="bg-muted p-3 border-b">
          <h3 className="font-medium">Columns</h3>
        </div>
        <div className="divide-y">
          {columns.map((column, index) => (
            <div
              key={index}
              className={`p-3 cursor-pointer hover:bg-muted/50 ${selectedColumn.name === column.name ? "bg-muted/50" : ""}`}
              onClick={() => setSelectedColumn(column)}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">{column.name}</span>
                <span className="text-xs bg-muted rounded px-2 py-0.5">{column.type}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Completeness: {column.completeness}%</span>
                <span>Uniqueness: {column.uniqueness}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="md:col-span-2 border rounded-md overflow-hidden">
        <div className="bg-muted p-3 border-b flex items-center justify-between">
          <h3 className="font-medium">Column Details: {selectedColumn.name}</h3>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm">
              <LucideBarChart2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <LucideEdit className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="p-4">
          <Tabs defaultValue="stats">
            <TabsList className="w-full max-w-md">
              <TabsTrigger value="stats">Statistics</TabsTrigger>
              <TabsTrigger value="quality">Quality</TabsTrigger>
              <TabsTrigger value="distribution">Distribution</TabsTrigger>
            </TabsList>

            <TabsContent value="stats" className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                {selectedColumn.type === "integer" || selectedColumn.type === "float" ? (
                  <>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Minimum</p>
                      <p className="font-medium">{selectedColumn.min}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Maximum</p>
                      <p className="font-medium">{selectedColumn.max}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Mean</p>
                      <p className="font-medium">{selectedColumn.mean}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Standard Deviation</p>
                      <p className="font-medium">{selectedColumn.stdDev}</p>
                    </div>
                  </>
                ) : selectedColumn.type === "string" ? (
                  <>
                    {selectedColumn.minLength && (
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Min Length</p>
                        <p className="font-medium">{selectedColumn.minLength}</p>
                      </div>
                    )}
                    {selectedColumn.maxLength && (
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Max Length</p>
                        <p className="font-medium">{selectedColumn.maxLength}</p>
                      </div>
                    )}
                    {selectedColumn.avgLength && (
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Average Length</p>
                        <p className="font-medium">{selectedColumn.avgLength}</p>
                      </div>
                    )}
                    {selectedColumn.categories && (
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Categories</p>
                        <p className="font-medium">{selectedColumn.categories.length}</p>
                      </div>
                    )}
                  </>
                ) : null}
              </div>

              {selectedColumn.topValues && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Top Values</p>
                  <div className="space-y-1">
                    {selectedColumn.topValues.map((value, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span>{value}</span>
                        <span className="text-muted-foreground">
                          {Math.round(100 / selectedColumn.topValues.length)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="quality" className="space-y-4 pt-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm">Completeness</p>
                  <p className="text-sm font-medium">{selectedColumn.completeness}%</p>
                </div>
                <Progress value={selectedColumn.completeness} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm">Uniqueness</p>
                  <p className="text-sm font-medium">{selectedColumn.uniqueness}%</p>
                </div>
                <Progress value={selectedColumn.uniqueness} className="h-2" />
              </div>

              {selectedColumn.completeness < 100 && (
                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md text-sm">
                  <p className="font-medium text-amber-800">Missing Values</p>
                  <p className="text-amber-700 mt-1">
                    This column has {(100 - selectedColumn.completeness).toFixed(1)}% missing values. Consider using
                    imputation techniques to fill these gaps.
                  </p>
                  <Button size="sm" variant="outline" className="mt-2">
                    Fix Missing Values
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="distribution" className="pt-4">
              <div className="h-48 flex items-center justify-center border rounded-md bg-muted/50">
                <div className="text-center">
                  <LucideBarChart2 className="h-12 w-12 mx-auto text-muted-foreground" />
                  <p className="mt-2 text-muted-foreground">Distribution visualization would appear here</p>
                  <p className="text-xs text-muted-foreground">{selectedColumn.distribution} distribution</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
