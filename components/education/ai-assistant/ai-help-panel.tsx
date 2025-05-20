"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  MessageSquare, 
  Send, 
  X, 
  Minimize2, 
  Maximize2,
  Bot,
  User,
  Loader2
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface AiHelpPanelProps {
  context?: string
  initialMessage?: string
  className?: string
}

export function AiHelpPanel({ 
  context, 
  initialMessage,
  className = ""
}: AiHelpPanelProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  
  // Add initial message from assistant
  useEffect(() => {
    if (initialMessage) {
      setMessages([
        {
          id: "initial",
          role: "assistant",
          content: initialMessage,
          timestamp: new Date()
        }
      ])
    } else {
      setMessages([
        {
          id: "initial",
          role: "assistant",
          content: "Hi there! I'm your AI assistant. How can I help you with your data science project today?",
          timestamp: new Date()
        }
      ])
    }
  }, [initialMessage])
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])
  
  // Toggle panel open/closed
  const togglePanel = () => {
    setIsOpen(!isOpen)
    setIsMinimized(false)
  }
  
  // Toggle panel minimized/maximized
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }
  
  // Send message
  const sendMessage = async () => {
    if (!input.trim()) return
    
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    
    try {
      // In a real app, this would call an API endpoint
      // For now, we'll simulate a delay and return a mock response
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Generate response based on user input
      let responseContent = ""
      
      if (input.toLowerCase().includes("feature") && input.toLowerCase().includes("selection")) {
        responseContent = "Feature selection is an important step in machine learning. It helps you identify the most relevant features for your model, which can improve performance and reduce overfitting. Would you like me to explain different feature selection techniques?"
      } else if (input.toLowerCase().includes("model") && input.toLowerCase().includes("evaluation")) {
        responseContent = "Model evaluation is crucial to understand how well your model performs. Common metrics include accuracy, precision, recall, F1 score for classification, and RMSE, MAE for regression. Would you like me to explain these metrics in more detail?"
      } else if (input.toLowerCase().includes("help") || input.toLowerCase().includes("tutorial")) {
        responseContent = "I can help you with various aspects of data science and machine learning. You can ask me about specific concepts, techniques, or get step-by-step guidance for your tasks. What specific area would you like help with?"
      } else {
        responseContent = `Thanks for your question! ${context ? `Based on the current context (${context}), ` : ''}I'd be happy to help you with that. Could you provide a bit more detail about what you're trying to accomplish?`
      }
      
      // Add assistant message
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: responseContent,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, assistantMessage])
    } catch (err) {
      console.error("Error sending message:", err)
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }
  
  // Handle input keypress
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
      {/* Chat button */}
      <Button
        onClick={togglePanel}
        className="h-12 w-12 rounded-full shadow-lg"
        size="icon"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
      
      {/* Chat panel */}
      {isOpen && (
        <Card className={`absolute bottom-16 right-0 w-80 md:w-96 shadow-xl transition-all ${
          isMinimized ? 'h-14' : 'h-[500px]'
        }`}>
          <CardHeader className="p-3 flex flex-row items-center justify-between">
            <CardTitle className="text-md flex items-center">
              <Bot className="h-5 w-5 mr-2" />
              AI Assistant
            </CardTitle>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" onClick={toggleMinimize} className="h-8 w-8">
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={togglePanel} className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          {!isMinimized && (
            <>
              <CardContent className="p-0">
                <ScrollArea className="h-[380px] px-4">
                  <div className="space-y-4 pt-4">
                    {messages.map((message) => (
                      <div 
                        key={message.id} 
                        className={`flex ${
                          message.role === "assistant" ? "justify-start" : "justify-end"
                        }`}
                      >
                        <div className="flex items-start gap-2 max-w-[80%]">
                          {message.role === "assistant" && (
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>AI</AvatarFallback>
                              <AvatarImage src="/ai-avatar.png" />
                            </Avatar>
                          )}
                          <div>
                            <div className={`rounded-lg p-3 ${
                              message.role === "assistant" 
                                ? "bg-muted" 
                                : "bg-primary text-primary-foreground"
                            }`}>
                              {message.content}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {message.timestamp.toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </div>
                          </div>
                          {message.role === "user" && (
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>
                                <User className="h-4 w-4" />
                              </AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="flex items-start gap-2 max-w-[80%]">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>AI</AvatarFallback>
                            <AvatarImage src="/ai-avatar.png" />
                          </Avatar>
                          <div className="rounded-lg bg-muted p-3">
                            <Loader2 className="h-4 w-4 animate-spin" />
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              </CardContent>
              
              <CardFooter className="p-3">
                <div className="flex w-full items-center gap-2">
                  <Input
                    placeholder="Type your question..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button 
                    size="icon" 
                    onClick={sendMessage}
                    disabled={isLoading || !input.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </>
          )}
        </Card>
      )}
    </div>
  )
}
