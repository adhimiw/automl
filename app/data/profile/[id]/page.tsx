import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataSummary } from "@/components/data-summary"
import { ColumnList } from "@/components/column-list"
import { DataPreview } from "@/components/data-preview"
import { DataQuality } from "@/components/data-quality"
import { LucideArrowRight, LucideDownload, LucideEdit } from "lucide-react"
import Link from "next/link"

export default function DataProfilePage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the dataset profile based on the ID
  const datasetId = params.id

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
          <div>
            <h1 className="text-3xl font-bold">Dataset Profile</h1>
            <p className="text-muted-foreground">Automatic analysis of your dataset structure and quality</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <LucideDownload className="mr-2 h-4 w-4" />
              Export Profile
            </Button>
            <Link href={`/data/clean/${datasetId}`}>
              <Button>
                Proceed to Cleaning
                <LucideArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Dataset Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <DataSummary />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Data Quality</CardTitle>
            </CardHeader>
            <CardContent>
              <DataQuality />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">AI Insights</CardTitle>
              <CardDescription>Automated observations about your data</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="bg-blue-100 text-blue-800 rounded-full px-2 py-0.5 text-xs font-medium mt-0.5">
                    Insight
                  </span>
                  <span>3 columns have more than 5% missing values</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-amber-100 text-amber-800 rounded-full px-2 py-0.5 text-xs font-medium mt-0.5">
                    Warning
                  </span>
                  <span>Column 'age' contains potential outliers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-green-100 text-green-800 rounded-full px-2 py-0.5 text-xs font-medium mt-0.5">
                    Suggestion
                  </span>
                  <span>Consider encoding categorical variables for machine learning</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-purple-100 text-purple-800 rounded-full px-2 py-0.5 text-xs font-medium mt-0.5">
                    Correlation
                  </span>
                  <span>Strong correlation detected between 'income' and 'spending'</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="preview" className="w-full">
          <TabsList className="w-full max-w-md">
            <TabsTrigger value="preview">Data Preview</TabsTrigger>
            <TabsTrigger value="columns">Columns</TabsTrigger>
            <TabsTrigger value="quality">Quality Issues</TabsTrigger>
          </TabsList>
          <TabsContent value="preview" className="mt-6">
            <Card>
              <CardHeader className="pb-0">
                <div className="flex items-center justify-between">
                  <CardTitle>Data Preview</CardTitle>
                  <Button variant="outline" size="sm">
                    <LucideEdit className="mr-2 h-4 w-4" />
                    Edit Data
                  </Button>
                </div>
                <CardDescription>Showing first 100 rows of your dataset</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <DataPreview />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="columns" className="mt-6">
            <Card>
              <CardHeader className="pb-0">
                <CardTitle>Column Analysis</CardTitle>
                <CardDescription>Detailed analysis of each column in your dataset</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ColumnList />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="quality" className="mt-6">
            <Card>
              <CardHeader className="pb-0">
                <CardTitle>Quality Issues</CardTitle>
                <CardDescription>Identified data quality issues and recommended actions</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <DataQuality detailed />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
