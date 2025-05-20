import { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LucideUpload, LucideDatabase, LucideBarChart } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Data Management",
  description: "Upload, explore, and transform your datasets",
}

export default function DataPage() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto py-6">
        <PageHeader
          heading="Data Management"
          subheading="Upload, explore, and transform your datasets"
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LucideUpload className="h-5 w-5" />
                Upload Dataset
              </CardTitle>
              <CardDescription>
                Upload a new dataset from your computer
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                Supported formats: CSV, Excel, JSON
              </p>
              <Button asChild>
                <Link href="/data/upload">Upload Dataset</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LucideDatabase className="h-5 w-5" />
                My Datasets
              </CardTitle>
              <CardDescription>
                Browse and manage your uploaded datasets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                View, edit, and delete your datasets
              </p>
              <Button asChild>
                <Link href="/data/datasets">View Datasets</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LucideBarChart className="h-5 w-5" />
                Data Transformations
              </CardTitle>
              <CardDescription>
                Transform and preprocess your data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                Clean, filter, and transform your datasets
              </p>
              <Button asChild>
                <Link href="/data/transform">Transform Data</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Recent Datasets</h2>
          <p className="text-muted-foreground mb-6">
            You haven't uploaded any datasets yet. Get started by uploading your first dataset.
          </p>
          <Button asChild>
            <Link href="/data/upload">Upload Your First Dataset</Link>
          </Button>
        </div>
      </div>
    </ProtectedRoute>
  )
}
