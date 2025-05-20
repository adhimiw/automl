"use client"

import React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus } from "lucide-react"

interface TransformationType {
  id: string
  name: string
  description: string
  icon: React.ReactNode
}

interface AddTransformationDialogProps {
  onAddTransformation: (type: string) => void
}

export function AddTransformationDialog({ onAddTransformation }: AddTransformationDialogProps) {
  const [open, setOpen] = React.useState(false)

  const transformationTypes: TransformationType[] = [
    {
      id: "filter",
      name: "Filter",
      description: "Filter rows based on column values",
      icon: <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">F</div>,
    },
    {
      id: "sort",
      name: "Sort",
      description: "Sort data by one or more columns",
      icon: (
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">S</div>
      ),
    },
    {
      id: "rename",
      name: "Rename",
      description: "Rename columns",
      icon: (
        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">R</div>
      ),
    },
    {
      id: "calculate",
      name: "Calculate",
      description: "Create new columns with calculations",
      icon: (
        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">C</div>
      ),
    },
    {
      id: "aggregate",
      name: "Aggregate",
      description: "Group and aggregate data",
      icon: <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">A</div>,
    },
    {
      id: "join",
      name: "Join",
      description: "Join with another dataset",
      icon: (
        <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">J</div>
      ),
    },
  ]

  const handleSelect = (type: string) => {
    onAddTransformation(type)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Plus className="mr-2 h-4 w-4" /> Add Transformation
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Transformation</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          {transformationTypes.map((type) => (
            <Card
              key={type.id}
              className="cursor-pointer hover:border-primary transition-colors"
              onClick={() => handleSelect(type.id)}
            >
              <CardContent className="flex items-center p-4">
                {type.icon}
                <div className="ml-4">
                  <h3 className="font-medium">{type.name}</h3>
                  <p className="text-sm text-gray-500">{type.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
