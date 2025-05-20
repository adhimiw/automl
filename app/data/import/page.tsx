"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileUploader } from "@/components/file-uploader"
import { DatabaseConnector } from "@/components/database-connector"
import { ApiConnector } from "@/components/api-connector"
import { EnhancedFileUploader } from "@/components/data-import/enhanced-file-uploader"
import { SampleDatasetBrowser } from "@/components/data-import/sample-dataset-browser"
import { useToast } from "@/hooks/use-toast"

export default function DataImportPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("file")

  const handleUploadComplete = (uploadedFiles: any[]) => {
    if (uploadedFiles && uploadedFiles.length > 0) {
      toast({
        title: "Upload Complete",
        description: `Successfully uploaded ${uploadedFiles.length} file(s)`,
      })

      // Redirect to the first dataset
      router.push(`/dashboard/datasets/${uploadedFiles[0].dataset_id}`)
    }
  }

  const handleSampleImport = (dataset: any) => {
    if (dataset) {
      toast({
        title: "Dataset Imported",
        description: `Successfully imported ${dataset.name}`,
      })

      // Redirect to the dataset
      router.push(`/dashboard/datasets/${dataset.dataset_id}`)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav />
          <UserNav />
        </div>
      </header>
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Import Data</h1>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="file">File Upload</TabsTrigger>
              <TabsTrigger value="database">Database</TabsTrigger>
              <TabsTrigger value="api">API</TabsTrigger>
              <TabsTrigger value="samples">Sample Datasets</TabsTrigger>
            </TabsList>
            <TabsContent value="file" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Files</CardTitle>
                  <CardDescription>Drag and drop files or click to browse your computer</CardDescription>
                </CardHeader>
                <CardContent>
                  <EnhancedFileUploader onUploadComplete={handleUploadComplete} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="database" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Connect to Database</CardTitle>
                  <CardDescription>Connect to SQL databases, NoSQL databases, or data warehouses</CardDescription>
                </CardHeader>
                <CardContent>
                  <DatabaseConnector />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="api" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Connect to API</CardTitle>
                  <CardDescription>Import data from REST APIs, GraphQL, or SOAP web services</CardDescription>
                </CardHeader>
                <CardContent>
                  <ApiConnector />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="samples" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sample Datasets</CardTitle>
                  <CardDescription>Explore and import curated datasets for experimentation</CardDescription>
                </CardHeader>
                <CardContent>
                  <SampleDatasetBrowser onImport={handleSampleImport} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
