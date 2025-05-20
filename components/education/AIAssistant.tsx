/**
 * AI Assistant Component
 *
 * This component provides an AI assistant that can answer questions about
 * educational content and provide contextual help.
 */
import React, { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Bot, User, Send, Lightbulb, BookOpen, FileText, X, Maximize, Minimize } from 'lucide-react'
import { searchKnowledgeBase } from '@/lib/education/content-generator'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  relatedContent?: {
    type: 'concept' | 'tutorial'
    id: string | number
    title: string
  }[]
}

interface AIAssistantProps {
  currentContext?: {
    type: 'concept' | 'tutorial' | 'learning_path'
    id: string | number
    title: string
  }
  onConceptSelect?: (conceptId: string | number) => void
  onTutorialSelect?: (tutorialId: string | number) => void
}

export function AIAssistant({
  currentContext,
  onConceptSelect,
  onTutorialSelect
}: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hi there! I\'m your AI learning assistant. I can help you understand concepts, explain code, and suggest learning resources. What would you like to learn about today?',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isMinimized, setIsMinimized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Generate context-aware suggestions based on current content
  useEffect(() => {
    if (currentContext) {
      if (currentContext.type === 'concept') {
        setSuggestions([
          `Explain ${currentContext.title} in simpler terms`,
          `What are some practical applications of ${currentContext.title}?`,
          `What should I learn after ${currentContext.title}?`,
          `Show me an example of ${currentContext.title}`
        ])
      } else if (currentContext.type === 'tutorial') {
        setSuggestions([
          `What are the prerequisites for this tutorial?`,
          `I'm stuck on this tutorial. Can you help?`,
          `Explain the code in this tutorial`,
          `What are some common mistakes to avoid in this tutorial?`
        ])
      } else if (currentContext.type === 'learning_path') {
        setSuggestions([
          `How long will it take to complete this learning path?`,
          `What will I learn in this path?`,
          `Is this learning path right for beginners?`,
          `What jobs require the skills in this learning path?`
        ])
      }
    } else {
      setSuggestions([
        'What topics should I learn first in data science?',
        'Explain machine learning in simple terms',
        'What\'s the difference between supervised and unsupervised learning?',
        'How do I prepare data for a machine learning model?'
      ])
    }
  }, [currentContext])

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // Prepare conversation history
      const history = messages.slice(-4).map(msg => ({
        role: msg.role,
        content: msg.content
      }))

      // Call the AI assistant API
      const response = await fetch('/api/education/ai-assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: input,
          context: currentContext,
          history
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get AI response')
      }

      const data = await response.json()

      // Add assistant message
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
        relatedContent: data.related_content
      }

      setMessages(prev => [...prev, assistantMessage])

      // Update suggestions if provided
      if (data.suggested_queries && data.suggested_queries.length > 0) {
        setSuggestions(data.suggested_queries)
      }
    } catch (error) {
      console.error('Error getting AI response:', error)

      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I apologize, but I encountered an error while processing your request. Please try again later.',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
  }

  // Handle related content click
  const handleRelatedContentClick = (content: Message['relatedContent'][0]) => {
    if (content.type === 'concept') {
      onConceptSelect?.(content.id)
    } else {
      onTutorialSelect?.(content.id)
    }
  }

  // Format timestamp
  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          size="icon"
          className="h-12 w-12 rounded-full shadow-lg"
          onClick={() => setIsMinimized(false)}
        >
          <Bot className="h-6 w-6" />
        </Button>
      </div>
    )
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 md:w-96 shadow-lg z-50 flex flex-col h-[500px] max-h-[80vh]">
      <CardHeader className="py-3 flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/assets/images/ai-assistant.png" alt="AI Assistant" />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-base">Learning Assistant</CardTitle>
            <CardDescription className="text-xs">Powered by AI</CardDescription>
          </div>
        </div>
        <div className="flex space-x-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsMinimized(true)}>
            <Minimize className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsMinimized(true)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <Tabs defaultValue="chat" className="flex-1 flex flex-col">
        <TabsList className="mx-4 mb-2">
          <TabsTrigger value="chat" className="flex-1">Chat</TabsTrigger>
          <TabsTrigger value="suggestions" className="flex-1">Suggestions</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="flex-1 flex flex-col px-0 m-0 data-[state=active]:flex-1">
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`
                  max-w-[80%] rounded-lg p-3
                  ${message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                  }
                `}>
                  <div className="flex items-center space-x-2 mb-1">
                    {message.role === 'assistant' ? (
                      <Bot className="h-4 w-4" />
                    ) : (
                      <User className="h-4 w-4" />
                    )}
                    <span className="text-xs opacity-70">
                      {formatTimestamp(message.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm">{message.content}</p>

                  {message.relatedContent && message.relatedContent.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-primary/10">
                      <p className="text-xs mb-1">Related Resources:</p>
                      <div className="space-y-1">
                        {message.relatedContent.map((content, index) => (
                          <div
                            key={index}
                            className="flex items-center text-xs p-1 rounded hover:bg-primary/10 cursor-pointer"
                            onClick={() => handleRelatedContentClick(content)}
                          >
                            {content.type === 'concept' ? (
                              <BookOpen className="h-3 w-3 mr-1 flex-shrink-0" />
                            ) : (
                              <FileText className="h-3 w-3 mr-1 flex-shrink-0" />
                            )}
                            <span className="truncate">{content.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </CardContent>

          <Separator />

          <CardFooter className="p-3">
            <form
              className="flex w-full items-center space-x-2"
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage()
              }}
            >
              <Input
                type="text"
                placeholder="Ask a question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !input.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </TabsContent>

        <TabsContent value="suggestions" className="flex-1 overflow-y-auto data-[state=active]:flex-1">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center space-x-2">
              <Lightbulb className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Suggested Questions</h3>
            </div>

            {currentContext && (
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm font-medium">Current Context:</p>
                <div className="flex items-center mt-1">
                  {currentContext.type === 'concept' && <BookOpen className="h-4 w-4 mr-1" />}
                  {currentContext.type === 'tutorial' && <FileText className="h-4 w-4 mr-1" />}
                  {currentContext.type === 'learning_path' && <Lightbulb className="h-4 w-4 mr-1" />}
                  <span className="text-sm">{currentContext.title}</span>
                </div>
              </div>
            )}

            <div className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-2"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
