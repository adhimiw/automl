"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Search, Database, BarChart2, RefreshCw } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { Skeleton } from '@/components/ui/skeleton'

interface SampleDataset {
  id: string
  name: string
  description: string
  domain: string
  rows: number
  columns: number
  preview_url: string
  tags: string[]
}

interface SampleDatasetBrowserProps {
  onImport?: (dataset: any) => void
  projectId?: string
}

export function SampleDatasetBrowser({ onImport, projectId }: SampleDatasetBrowserProps) {
  const [datasets, setDatasets] = useState<SampleDataset[]>([])
  const [filteredDatasets, setFilteredDatasets] = useState<SampleDataset[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDomain, setSelectedDomain] = useState('all')
  const [loading, setLoading] = useState(true)
  const [importing, setImporting] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    async function fetchSampleDatasets() {
      try {
        const response = await fetch('/api/datasets/samples')
        if (!response.ok) throw new Error('Failed to fetch sample datasets')
        const data = await response.json()
        setDatasets(data)
        setFilteredDatasets(data)
      } catch (error) {
        console.error('Error fetching sample datasets:', error)
        toast({
          title: 'Error',
          description: 'Failed to load sample datasets',
          variant: 'destructive',
        })
      } finally {
        setLoading(false)
      }
    }

    fetchSampleDatasets()
  }, [toast])

  // Filter datasets based on search term and selected domain
  useEffect(() => {
    let filtered = datasets
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        dataset => 
          dataset.name.toLowerCase().includes(term) || 
          dataset.description.toLowerCase().includes(term) ||
          dataset.tags.some(tag => tag.toLowerCase().includes(term))
      )
    }
    
    if (selectedDomain !== 'all') {
      filtered = filtered.filter(dataset => dataset.domain === selectedDomain)
    }
    
    setFilteredDatasets(filtered)
  }, [searchTerm, selectedDomain, datasets])

  const handleImport = async (datasetId: string) => {
    try {
      setImporting(datasetId)
      
      const url = projectId 
        ? `/api/datasets/samples/${datasetId}/import?project_id=${projectId}`
        : `/api/datasets/samples/${datasetId}/import`
        
      const response = await fetch(url, {
        method: 'POST',
      })
      
      if (!response.ok) throw new Error('Failed to import dataset')
      
      const data = await response.json()
      
      toast({
        title: 'Dataset Imported',
        description: 'Sample dataset has been imported successfully',
      })
      
      if (onImport) {
        onImport(data)
      }
    } catch (error) {
      console.error('Error importing sample dataset:', error)
      toast({
        title: 'Import Failed',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: 'destructive',
      })
    } finally {
      setImporting(null)
    }
  }

  // Get unique domains for filtering
  const domains = ['all', ...Array.from(new Set(datasets.map(dataset => dataset.domain)))]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search sample datasets..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Tabs value={selectedDomain} onValueChange={setSelectedDomain} className="w-full sm:w-auto">
          <TabsList className="w-full sm:w-auto">
            {domains.map(domain => (
              <TabsTrigger key={domain} value={domain} className="capitalize">
                {domain}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-4 w-1/3 mb-4" />
                <div className="flex gap-2">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-5 w-12" />
                </div>
              </CardContent>
              <CardFooter>
                <Skeleton className="h-9 w-20 mr-2" />
                <Skeleton className="h-9 w-20" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : filteredDatasets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDatasets.map(dataset => (
            <Card key={dataset.id}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="h-5 w-5 mr-2" />
                  {dataset.name}
                </CardTitle>
                <CardDescription>{dataset.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Rows</span>
                  <span className="font-medium">{dataset.rows.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground">Columns</span>
                  <span className="font-medium">{dataset.columns}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {dataset.tags.map(tag => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <a href={dataset.preview_url} target="_blank" rel="noopener noreferrer">
                    Preview
                  </a>
                </Button>
                <Button 
                  onClick={() => handleImport(dataset.id)}
                  disabled={importing === dataset.id}
                >
                  {importing === dataset.id ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Importing...
                    </>
                  ) : (
                    'Import'
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <BarChart2 className="h-12 w-12 mx-auto text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No datasets found</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  )
}
