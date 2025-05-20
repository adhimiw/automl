"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { LucideFile, LucideUpload, LucideX } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function FileUploader() {
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      setFiles([...files, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    const newFiles = [...files]
    newFiles.splice(index, 1)
    setFiles(newFiles)
  }

  const uploadFiles = async () => {
    if (files.length === 0) return

    setUploading(true)
    setProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })
    }, 200)

    // Simulate API call
    setTimeout(() => {
      clearInterval(interval)
      setProgress(100)

      setTimeout(() => {
        setUploading(false)
        toast({
          title: "Files uploaded successfully",
          description: `${files.length} file(s) have been uploaded and are being processed.`,
        })
        // In a real app, you would redirect to the data profiling page
        // router.push(`/data/profile/${datasetId}`)
      }, 500)
    }, 3000)
  }

  return (
    <div className="space-y-6">
      <div
        className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors"
        onClick={() => document.getElementById("file-upload")?.click()}
      >
        <LucideUpload className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-2 text-lg font-semibold">Drag & Drop Files</h3>
        <p className="text-sm text-muted-foreground mt-1">or click to browse your computer</p>
        <input
          id="file-upload"
          type="file"
          multiple
          className="hidden"
          onChange={handleFileChange}
          disabled={uploading}
        />
        <p className="text-xs text-muted-foreground mt-4">Supported formats: CSV, Excel, JSON, XML, Parquet</p>
      </div>

      {files.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-medium">Selected Files ({files.length})</h4>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                <div className="flex items-center">
                  <LucideFile className="h-5 w-5 mr-2 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => removeFile(index)} disabled={uploading}>
                  <LucideX className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {uploading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Uploading...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>
          )}

          <div className="flex justify-end">
            <Button onClick={uploadFiles} disabled={uploading}>
              {uploading ? "Uploading..." : "Upload Files"}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
