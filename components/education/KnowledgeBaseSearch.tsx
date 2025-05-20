/**
 * Knowledge Base Search Component
 * 
 * This component provides a search interface for the educational content
 * with filtering by category, difficulty, and tags.
 */
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Search, Book, FileText, Filter, X } from 'lucide-react'
import { searchKnowledgeBase, KnowledgeBaseSearchParams } from '@/lib/education/content-generator'

// Difficulty badge colors
const difficultyColors = {
  beginner: 'bg-green-100 text-green-800 hover:bg-green-200',
  intermediate: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
  advanced: 'bg-red-100 text-red-800 hover:bg-red-200'
}

interface KnowledgeBaseSearchProps {
  onConceptSelect?: (conceptId: string | number) => void
  onTutorialSelect?: (tutorialId: string | number) => void
  initialQuery?: string
}

export function KnowledgeBaseSearch({
  onConceptSelect,
  onTutorialSelect,
  initialQuery = ''
}: KnowledgeBaseSearchProps) {
  const router = useRouter()
  const [query, setQuery] = useState(initialQuery)
  const [searchParams, setSearchParams] = useState<KnowledgeBaseSearchParams>({
    query: initialQuery,
    limit: 10,
    offset: 0
  })
  const [results, setResults] = useState<any>({
    total_results: 0,
    results: [],
    categories: {},
    tags: {}
  })
  const [loading, setLoading] = useState(false)
  const [activeFilters, setActiveFilters] = useState<{
    category?: string,
    difficulty?: string,
    tags: string[]
  }>({
    tags: []
  })
  const [showFilters, setShowFilters] = useState(false)
  
  // Perform search when search parameters change
  useEffect(() => {
    const fetchResults = async () => {
      if (!searchParams.query) return
      
      setLoading(true)
      try {
        const response = await searchKnowledgeBase(searchParams)
        if (response.success && response.data) {
          setResults(response.data)
        }
      } catch (error) {
        console.error('Error searching knowledge base:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchResults()
  }, [searchParams])
  
  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchParams({
      ...searchParams,
      query,
      offset: 0 // Reset pagination when performing a new search
    })
  }
  
  // Handle filter changes
  const handleCategoryFilter = (category: string) => {
    setActiveFilters(prev => ({
      ...prev,
      category: prev.category === category ? undefined : category
    }))
    
    setSearchParams(prev => ({
      ...prev,
      category: prev.category === category ? undefined : category,
      offset: 0 // Reset pagination when changing filters
    }))
  }
  
  const handleDifficultyFilter = (difficulty: string) => {
    setActiveFilters(prev => ({
      ...prev,
      difficulty: prev.difficulty === difficulty ? undefined : difficulty
    }))
    
    setSearchParams(prev => ({
      ...prev,
      difficulty: prev.difficulty === difficulty ? undefined : difficulty as any,
      offset: 0 // Reset pagination when changing filters
    }))
  }
  
  const handleTagFilter = (tag: string) => {
    const newTags = activeFilters.tags.includes(tag)
      ? activeFilters.tags.filter(t => t !== tag)
      : [...activeFilters.tags, tag]
    
    setActiveFilters(prev => ({
      ...prev,
      tags: newTags
    }))
    
    setSearchParams(prev => ({
      ...prev,
      tags: newTags.length > 0 ? newTags : undefined,
      offset: 0 // Reset pagination when changing filters
    }))
  }
  
  // Handle pagination
  const loadMore = () => {
    setSearchParams(prev => ({
      ...prev,
      offset: (prev.offset || 0) + (prev.limit || 10)
    }))
  }
  
  // Clear all filters
  const clearFilters = () => {
    setActiveFilters({
      tags: []
    })
    
    setSearchParams(prev => ({
      query: prev.query,
      limit: prev.limit,
      offset: 0
    }))
  }
  
  // Handle result selection
  const handleResultSelect = (result: any) => {
    if (result.steps) {
      // It's a tutorial
      onTutorialSelect?.(result.id)
    } else {
      // It's a concept
      onConceptSelect?.(result.id)
    }
  }
  
  return (
    <div className="space-y-6">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search for concepts, tutorials, or topics..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
          {(activeFilters.category || activeFilters.difficulty || activeFilters.tags.length > 0) && (
            <Badge variant="secondary" className="ml-2">
              {[
                activeFilters.category ? 1 : 0,
                activeFilters.difficulty ? 1 : 0,
                activeFilters.tags.length
              ].reduce((a, b) => a + b, 0)}
            </Badge>
          )}
        </Button>
      </form>
      
      {/* Active Filters */}
      {(activeFilters.category || activeFilters.difficulty || activeFilters.tags.length > 0) && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          
          {activeFilters.category && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Category: {activeFilters.category}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => handleCategoryFilter(activeFilters.category!)}
              />
            </Badge>
          )}
          
          {activeFilters.difficulty && (
            <Badge 
              className={`flex items-center gap-1 ${difficultyColors[activeFilters.difficulty as keyof typeof difficultyColors] || ''}`}
            >
              {activeFilters.difficulty}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => handleDifficultyFilter(activeFilters.difficulty!)}
              />
            </Badge>
          )}
          
          {activeFilters.tags.map(tag => (
            <Badge key={tag} variant="outline" className="flex items-center gap-1">
              {tag}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => handleTagFilter(tag)}
              />
            </Badge>
          ))}
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearFilters}
            className="h-7 px-2"
          >
            Clear all
          </Button>
        </div>
      )}
      
      {/* Filters Panel */}
      {showFilters && (
        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Categories */}
              <div>
                <h3 className="font-medium mb-2">Categories</h3>
                <div className="space-y-2">
                  {Object.entries(results.categories || {}).map(([category, count]) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`category-${category}`}
                        checked={activeFilters.category === category}
                        onCheckedChange={() => handleCategoryFilter(category)}
                      />
                      <label 
                        htmlFor={`category-${category}`}
                        className="text-sm flex items-center justify-between w-full cursor-pointer"
                      >
                        <span>{category}</span>
                        <Badge variant="secondary">{count as number}</Badge>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Difficulty */}
              <div>
                <h3 className="font-medium mb-2">Difficulty</h3>
                <div className="space-y-2">
                  {['beginner', 'intermediate', 'advanced'].map((difficulty) => (
                    <div key={difficulty} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`difficulty-${difficulty}`}
                        checked={activeFilters.difficulty === difficulty}
                        onCheckedChange={() => handleDifficultyFilter(difficulty)}
                      />
                      <label 
                        htmlFor={`difficulty-${difficulty}`}
                        className="text-sm cursor-pointer"
                      >
                        {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Tags */}
              <div>
                <h3 className="font-medium mb-2">Tags</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {Object.entries(results.tags || {})
                    .sort((a, b) => (b[1] as number) - (a[1] as number))
                    .slice(0, 10)
                    .map(([tag, count]) => (
                      <div key={tag} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`tag-${tag}`}
                          checked={activeFilters.tags.includes(tag)}
                          onCheckedChange={() => handleTagFilter(tag)}
                        />
                        <label 
                          htmlFor={`tag-${tag}`}
                          className="text-sm flex items-center justify-between w-full cursor-pointer"
                        >
                          <span>{tag}</span>
                          <Badge variant="secondary">{count as number}</Badge>
                        </label>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Search Results */}
      {searchParams.query && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {loading ? 'Searching...' : `${results.total_results} results for "${searchParams.query}"`}
            </h2>
            
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="concepts">Concepts</TabsTrigger>
                <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="space-y-4">
            <TabsContent value="all" className="space-y-4 mt-0">
              {results.results.map((result: any) => (
                <Card 
                  key={result.id} 
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => handleResultSelect(result)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {result.steps ? (
                          <FileText className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <Book className="h-5 w-5 text-muted-foreground" />
                        )}
                        <CardTitle className="text-lg">{result.title}</CardTitle>
                      </div>
                      <Badge className={difficultyColors[result.difficulty as keyof typeof difficultyColors] || ''}>
                        {result.difficulty}
                      </Badge>
                    </div>
                    <CardDescription>{result.summary}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    {result.steps ? (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{result.steps.length} steps</span>
                        <span>•</span>
                        <span>{result.estimated_time} minutes</span>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {result.related_concepts.slice(0, 3).map((concept: string) => (
                          <Badge key={concept} variant="outline">
                            {concept}
                          </Badge>
                        ))}
                        {result.related_concepts.length > 3 && (
                          <Badge variant="outline">+{result.related_concepts.length - 3} more</Badge>
                        )}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">{result.category}</Badge>
                      {result.tags.slice(0, 2).map((tag: string) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardFooter>
                </Card>
              ))}
              
              {results.results.length === 0 && !loading && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No results found. Try a different search term or filters.</p>
                </div>
              )}
              
              {results.total_results > (searchParams.offset || 0) + (searchParams.limit || 10) && (
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={loadMore}
                  disabled={loading}
                >
                  Load More
                </Button>
              )}
            </TabsContent>
            
            <TabsContent value="concepts" className="space-y-4 mt-0">
              {results.results
                .filter((result: any) => !result.steps)
                .map((result: any) => (
                  <Card 
                    key={result.id} 
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => onConceptSelect?.(result.id)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <Book className="h-5 w-5 text-muted-foreground" />
                          <CardTitle className="text-lg">{result.title}</CardTitle>
                        </div>
                        <Badge className={difficultyColors[result.difficulty as keyof typeof difficultyColors] || ''}>
                          {result.difficulty}
                        </Badge>
                      </div>
                      <CardDescription>{result.summary}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {result.related_concepts.slice(0, 3).map((concept: string) => (
                          <Badge key={concept} variant="outline">
                            {concept}
                          </Badge>
                        ))}
                        {result.related_concepts.length > 3 && (
                          <Badge variant="outline">+{result.related_concepts.length - 3} more</Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              
              {results.results.filter((result: any) => !result.steps).length === 0 && !loading && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No concepts found. Try a different search term or filters.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="tutorials" className="space-y-4 mt-0">
              {results.results
                .filter((result: any) => result.steps)
                .map((result: any) => (
                  <Card 
                    key={result.id} 
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => onTutorialSelect?.(result.id)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <CardTitle className="text-lg">{result.title}</CardTitle>
                        </div>
                        <Badge className={difficultyColors[result.difficulty as keyof typeof difficultyColors] || ''}>
                          {result.difficulty}
                        </Badge>
                      </div>
                      <CardDescription>{result.summary}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{result.steps.length} steps</span>
                        <span>•</span>
                        <span>{result.estimated_time} minutes</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              
              {results.results.filter((result: any) => result.steps).length === 0 && !loading && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No tutorials found. Try a different search term or filters.</p>
                </div>
              )}
            </TabsContent>
          </div>
        </div>
      )}
    </div>
  )
}
