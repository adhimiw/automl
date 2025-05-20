/**
 * Concept Editor Component
 * 
 * This component provides a form for creating and editing concept explanations.
 */
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { X, Plus, Upload, Save, Eye } from 'lucide-react'
import { VisualAid } from '@/lib/education/content-generator'

interface ConceptEditorProps {
  concept?: {
    id?: string | number
    title: string
    content: string
    summary: string
    related_concepts: string[]
    prerequisites: string[]
    difficulty: 'beginner' | 'intermediate' | 'advanced'
    visual_aids: VisualAid[]
    category: string
    tags: string[]
  }
  onSave: (concept: ConceptEditorProps['concept']) => void
  onPreview: () => void
}

export function ConceptEditor({
  concept,
  onSave,
  onPreview
}: ConceptEditorProps) {
  const router = useRouter()
  const isEditing = !!concept?.id
  
  // Initialize state with concept data or defaults
  const [title, setTitle] = useState(concept?.title || '')
  const [content, setContent] = useState(concept?.content || '')
  const [summary, setSummary] = useState(concept?.summary || '')
  const [relatedConcepts, setRelatedConcepts] = useState<string[]>(concept?.related_concepts || [])
  const [prerequisites, setPrerequisites] = useState<string[]>(concept?.prerequisites || [])
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>(concept?.difficulty || 'beginner')
  const [visualAids, setVisualAids] = useState<VisualAid[]>(concept?.visual_aids || [])
  const [category, setCategory] = useState(concept?.category || '')
  const [tags, setTags] = useState<string[]>(concept?.tags || [])
  
  // Form inputs for adding items
  const [newRelatedConcept, setNewRelatedConcept] = useState('')
  const [newPrerequisite, setNewPrerequisite] = useState('')
  const [newTag, setNewTag] = useState('')
  const [newVisualAid, setNewVisualAid] = useState<Partial<VisualAid>>({
    type: 'image',
    url: '',
    alt_text: '',
    caption: ''
  })
  
  // Handle adding related concept
  const handleAddRelatedConcept = () => {
    if (newRelatedConcept && !relatedConcepts.includes(newRelatedConcept)) {
      setRelatedConcepts([...relatedConcepts, newRelatedConcept])
      setNewRelatedConcept('')
    }
  }
  
  // Handle removing related concept
  const handleRemoveRelatedConcept = (concept: string) => {
    setRelatedConcepts(relatedConcepts.filter(c => c !== concept))
  }
  
  // Handle adding prerequisite
  const handleAddPrerequisite = () => {
    if (newPrerequisite && !prerequisites.includes(newPrerequisite)) {
      setPrerequisites([...prerequisites, newPrerequisite])
      setNewPrerequisite('')
    }
  }
  
  // Handle removing prerequisite
  const handleRemovePrerequisite = (prerequisite: string) => {
    setPrerequisites(prerequisites.filter(p => p !== prerequisite))
  }
  
  // Handle adding tag
  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag])
      setNewTag('')
    }
  }
  
  // Handle removing tag
  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag))
  }
  
  // Handle adding visual aid
  const handleAddVisualAid = () => {
    if (
      newVisualAid.type &&
      newVisualAid.url &&
      newVisualAid.alt_text &&
      newVisualAid.caption
    ) {
      setVisualAids([...visualAids, newVisualAid as VisualAid])
      setNewVisualAid({
        type: 'image',
        url: '',
        alt_text: '',
        caption: ''
      })
    }
  }
  
  // Handle removing visual aid
  const handleRemoveVisualAid = (index: number) => {
    setVisualAids(visualAids.filter((_, i) => i !== index))
  }
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields
    if (!title || !content || !summary || !category) {
      alert('Please fill in all required fields')
      return
    }
    
    // Create concept object
    const conceptData = {
      id: concept?.id,
      title,
      content,
      summary,
      related_concepts: relatedConcepts,
      prerequisites,
      difficulty,
      visual_aids: visualAids,
      category,
      tags
    }
    
    // Call onSave callback
    onSave(conceptData)
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? 'Edit Concept' : 'New Concept'}</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Basic Information */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Title <span className="text-destructive">*</span></Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Linear Regression"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category <span className="text-destructive">*</span></Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fundamentals">Fundamentals</SelectItem>
                    <SelectItem value="statistics">Statistics</SelectItem>
                    <SelectItem value="machine_learning">Machine Learning</SelectItem>
                    <SelectItem value="deep_learning">Deep Learning</SelectItem>
                    <SelectItem value="data_visualization">Data Visualization</SelectItem>
                    <SelectItem value="data_engineering">Data Engineering</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="summary">Summary <span className="text-destructive">*</span></Label>
              <Textarea
                id="summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="A brief summary of the concept"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select value={difficulty} onValueChange={(value: 'beginner' | 'intermediate' | 'advanced') => setDifficulty(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Separator />
          
          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content">Content <span className="text-destructive">*</span></Label>
            <Tabs defaultValue="write">
              <TabsList className="mb-2">
                <TabsTrigger value="write">Write</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
              
              <TabsContent value="write">
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter the concept content in HTML format"
                  className="min-h-[300px] font-mono"
                  required
                />
              </TabsContent>
              
              <TabsContent value="preview">
                <div 
                  className="min-h-[300px] p-4 border rounded-md overflow-auto prose max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </TabsContent>
            </Tabs>
          </div>
          
          <Separator />
          
          {/* Related Concepts */}
          <div className="space-y-4">
            <Label>Related Concepts</Label>
            
            <div className="flex flex-wrap gap-2">
              {relatedConcepts.map((concept) => (
                <Badge key={concept} variant="secondary" className="flex items-center gap-1">
                  {concept}
                  <button
                    type="button"
                    onClick={() => handleRemoveRelatedConcept(concept)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Input
                value={newRelatedConcept}
                onChange={(e) => setNewRelatedConcept(e.target.value)}
                placeholder="Add related concept"
                className="flex-1"
              />
              <Button type="button" onClick={handleAddRelatedConcept} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Prerequisites */}
          <div className="space-y-4">
            <Label>Prerequisites</Label>
            
            <div className="flex flex-wrap gap-2">
              {prerequisites.map((prerequisite) => (
                <Badge key={prerequisite} variant="outline" className="flex items-center gap-1">
                  {prerequisite}
                  <button
                    type="button"
                    onClick={() => handleRemovePrerequisite(prerequisite)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Input
                value={newPrerequisite}
                onChange={(e) => setNewPrerequisite(e.target.value)}
                placeholder="Add prerequisite"
                className="flex-1"
              />
              <Button type="button" onClick={handleAddPrerequisite} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Tags */}
          <div className="space-y-4">
            <Label>Tags</Label>
            
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} className="flex items-center gap-1">
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add tag"
                className="flex-1"
              />
              <Button type="button" onClick={handleAddTag} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Visual Aids */}
          <div className="space-y-4">
            <Label>Visual Aids</Label>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {visualAids.map((aid, index) => (
                <div key={index} className="border rounded-lg p-4 relative">
                  <button
                    type="button"
                    onClick={() => handleRemoveVisualAid(index)}
                    className="absolute top-2 right-2 hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  
                  <div className="space-y-2">
                    <p className="font-medium">{aid.type.charAt(0).toUpperCase() + aid.type.slice(1)}</p>
                    <p className="text-sm truncate">{aid.url}</p>
                    <p className="text-sm text-muted-foreground">{aid.caption}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Add Visual Aid</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="visual-aid-type">Type</Label>
                  <Select 
                    value={newVisualAid.type as string} 
                    onValueChange={(value) => setNewVisualAid({ ...newVisualAid, type: value as VisualAid['type'] })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="image">Image</SelectItem>
                      <SelectItem value="chart">Chart</SelectItem>
                      <SelectItem value="diagram">Diagram</SelectItem>
                      <SelectItem value="animation">Animation</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="visual-aid-url">URL</Label>
                  <Input
                    id="visual-aid-url"
                    value={newVisualAid.url || ''}
                    onChange={(e) => setNewVisualAid({ ...newVisualAid, url: e.target.value })}
                    placeholder="e.g., /assets/images/linear-regression.png"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="visual-aid-alt">Alt Text</Label>
                  <Input
                    id="visual-aid-alt"
                    value={newVisualAid.alt_text || ''}
                    onChange={(e) => setNewVisualAid({ ...newVisualAid, alt_text: e.target.value })}
                    placeholder="e.g., Linear regression line fitting data points"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="visual-aid-caption">Caption</Label>
                  <Input
                    id="visual-aid-caption"
                    value={newVisualAid.caption || ''}
                    onChange={(e) => setNewVisualAid({ ...newVisualAid, caption: e.target.value })}
                    placeholder="e.g., A linear regression line showing the best fit through data points"
                  />
                </div>
              </CardContent>
              
              <CardFooter>
                <Button type="button" onClick={handleAddVisualAid} variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Visual Aid
                </Button>
              </CardFooter>
            </Card>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onPreview}>
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          
          <Button type="submit">
            <Save className="h-4 w-4 mr-2" />
            {isEditing ? 'Update Concept' : 'Create Concept'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
