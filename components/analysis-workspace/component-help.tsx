"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { HelpCircle, RefreshCw, X } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { generateComponentHelp } from '@/lib/ai/analysis-suggestions'

interface ComponentHelpProps {
  componentType: string
  context?: any
  onClose: () => void
}

export function ComponentHelp({ componentType, context, onClose }: ComponentHelpProps) {
  const [helpContent, setHelpContent] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    async function fetchHelp() {
      setLoading(true)
      try {
        // In a real app, this would call an API endpoint
        // For now, we'll call the function directly
        const content = await generateComponentHelp(componentType, context)
        setHelpContent(content)
      } catch (error) {
        console.error('Error fetching component help:', error)
        toast({
          title: 'Error',
          description: 'Failed to load help content',
          variant: 'destructive',
        })
        
        // Fallback content
        setHelpContent(`
## ${componentType} Component

This component helps you analyze your data. Due to an error, detailed help content couldn't be loaded.

### Basic Usage
- Select the columns you want to analyze
- Configure any additional settings
- Execute the analysis to see results

For more help, please try again later or consult the documentation.
        `)
      } finally {
        setLoading(false)
      }
    }

    fetchHelp()
  }, [componentType, context, toast])

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md flex items-center">
          <HelpCircle className="h-4 w-4 mr-2" />
          {componentType} Help
        </CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ) : (
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <div dangerouslySetInnerHTML={{ __html: helpContent?.replace(/\n/g, '<br>') || '' }} />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
