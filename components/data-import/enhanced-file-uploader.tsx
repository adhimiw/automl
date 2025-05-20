"use client"

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { LucideUpload, FileText, X, Check, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/hooks/use-toast'

interface EnhancedFileUploaderProps {
  onUploadComplete?: (uploadedFiles: any[]) => void
  projectId?: string
}

export function EnhancedFileUploader({ onUploadComplete, projectId }: EnhancedFileUploaderProps) {
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({})
  const { toast } = useToast()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles.map(file => 
      Object.assign(file, { preview: URL.createObjectURL(file) })
    )])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/json': ['.json'],
      'text/xml': ['.xml'],
      'application/x-parquet': ['.parquet']
    }
  })

  // Upload handling logic
  const handleUpload = async () => {
    setUploading(true)
    const uploadedFiles = []
    
    try {
      for (const file of files) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('name', file.name)
        
        if (projectId) {
          formData.append('project_id', projectId)
        }
        
        // Set initial progress
        setUploadProgress(prev => ({ ...prev, [file.name]: 0 }))
        
        // Upload file
        const response = await fetch('/api/datasets/upload', {
          method: 'POST',
          body: formData,
        })
        
        if (!response.ok) throw new Error(`Upload failed: ${response.statusText}`)
        
        const result = await response.json()
        uploadedFiles.push(result)
        
        // Set complete progress
        setUploadProgress(prev => ({ ...prev, [file.name]: 100 }))
      }
      
      toast({
        title: 'Upload Complete',
        description: `Successfully uploaded ${files.length} file(s)`,
      })
      
      if (onUploadComplete) {
        onUploadComplete(uploadedFiles)
      }
      
      setFiles([])
      setUploadProgress({})
    } catch (error) {
      console.error('Upload error:', error)
      toast({
        title: 'Upload Failed',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: 'destructive',
      })
    } finally {
      setUploading(false)
    }
  }

  // Remove a file from the list
  const removeFile = (index: number) => {
    const newFiles = [...files]
    const file = newFiles[index]
    
    // Revoke the object URL to avoid memory leaks
    if ('preview' in file) {
      URL.revokeObjectURL(file.preview as string)
    }
    
    newFiles.splice(index, 1)
    setFiles(newFiles)
  }

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-primary bg-primary/10' : 'hover:bg-muted/50'
        }`}
      >
        <input {...getInputProps()} />
        <LucideUpload className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-2 text-lg font-semibold">
          {isDragActive ? 'Drop files here' : 'Drag & Drop Files'}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          or click to browse your computer
        </p>
        <p className="text-xs text-muted-foreground mt-4">
          Supported formats: CSV, Excel, JSON, XML, Parquet
        </p>
      </div>

      {files.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Selected Files</h4>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setFiles([])}
              disabled={uploading}
            >
              Clear All
            </Button>
          </div>
          
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-2 border rounded">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium truncate max-w-[200px]">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                {uploading && uploadProgress[file.name] !== undefined ? (
                  <div className="w-24">
                    <Progress value={uploadProgress[file.name]} className="h-2" />
                  </div>
                ) : (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeFile(index)
                    }}
                    disabled={uploading}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
          
          <Button 
            className="w-full" 
            onClick={handleUpload} 
            disabled={uploading || files.length === 0}
          >
            {uploading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              `Upload ${files.length} File(s)`
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
