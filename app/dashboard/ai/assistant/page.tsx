"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Send, Bot, User, Loader2, FileText, Database, BarChart, Code, RefreshCw, Sparkles } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import type { SuggestionRequest } from "@/lib/ai/suggestion-engine"

interface Message {
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface SuggestionCategory {
  id: string
  name: string
  description: string
  icon: React.ReactNode
}

export default function AIAssistantPage() {
  const { data: session } = useSession()
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI assistant for data analysis and machine learning. How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState("chat")

  const suggestionCategories: SuggestionCategory[] = [
    {
      id: "data_cleaning",
      name: "Data Cleaning",
      description: "Get suggestions for cleaning and preprocessing your data",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      id: "feature_engineering",
      name: "Feature Engineering",
      description: "Discover ways to create better features from your data",
      icon: <Database className="h-5 w-5" />,
    },
    {
      id: "model_selection",
      name: "Model Selection",
      description: "Find the best models for your specific problem",
      icon: <Bot className="h-5 w-5" />,
    },
    {
      id: "visualization",
      name: "Visualization",
      description: "Get ideas for visualizing your data effectively",
      icon: <BarChart className="h-5 w-5" />,
    },
    {
      id: "analysis",
      name: "Analysis",
      description: "Receive suggestions for analyzing your data",
      icon: <Sparkles className="h-5 w-5" />,
    },
    {
      id: "performance_improvement",
      name: "Performance Improvement",
      description: "Learn how to improve your model's performance",
      icon: <RefreshCw className="h-5 w-5" />,
    },
  ]

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // In a real app, this would be an API call to your backend
      // For demo purposes, we'll simulate a response
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const assistantMessage: Message = {
        role: "assistant",
        content: generateMockResponse(input),
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error sending message:", error)

      const errorMessage: Message = {
        role: "assistant",
        content: "I'm sorry, I encountered an error processing your request. Please try again.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleGetSuggestions = async (type: string) => {
    setActiveTab("chat")
    setIsLoading(true)

    const category = suggestionCategories.find((cat) => cat.id === type)

    if (!category) return

    const userMessage: Message = {
      role: "user",
      content: `Can you give me suggestions for ${category.name.toLowerCase()}?`,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    try {
      // In a real app, this would be an API call to your backend
      const request: SuggestionRequest = {
        type: type as any,
        context: {
          user_goal: "Improve my data analysis and model performance",
        },
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const assistantMessage: Message = {
        role: "assistant",
        content: generateMockSuggestionResponse(type),
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error getting suggestions:", error)

      const errorMessage: Message = {
        role: "assistant",
        content: "I'm sorry, I encountered an error generating suggestions. Please try again.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="container mx-auto py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="h-[calc(100vh-8rem)]">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                <h2 className="text-lg font-medium">AI Assistant</h2>
              </div>
              <CardDescription>Get help with data analysis, visualization, and machine learning</CardDescription>
            </CardHeader>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="px-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="chat">Chat</TabsTrigger>
                  <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="chat" className="flex flex-col h-[calc(100vh-16rem)]">
                <ScrollArea className="flex-1 p-6">
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                          <Avatar>
                            {message.role === "user" ? (
                              <>
                                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                                <AvatarFallback>
                                  <User className="h-5 w-5" />
                                </AvatarFallback>
                              </>
                            ) : (
                              <>
                                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Assistant" />
                                <AvatarFallback>
                                  <Bot className="h-5 w-5" />
                                </AvatarFallback>
                              </>
                            )}
                          </Avatar>
                          <div>
                            <div
                              className={`rounded-lg p-4 ${
                                message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                              }`}
                            >
                              <p className="whitespace-pre-wrap">{message.content}</p>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{formatTimestamp(message.timestamp)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
                <CardFooter className="border-t p-4">
                  <div className="flex w-full items-center space-x-2">
                    <Textarea
                      placeholder="Type your message..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage()
                        }
                      }}
                      className="min-h-[60px]"
                    />
                    <Button type="submit" size="icon" onClick={handleSendMessage} disabled={isLoading || !input.trim()}>
                      {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                    </Button>
                  </div>
                </CardFooter>
              </TabsContent>

              <TabsContent value="suggestions" className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {suggestionCategories.map((category) => (
                    <Card
                      key={category.id}
                      className="cursor-pointer hover:border-primary transition-colors"
                      onClick={() => handleGetSuggestions(category.id)}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2">
                          {category.icon}
                          <h2 className="text-lg font-medium">{category.name}</h2>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{category.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        <div>
          <Card className="h-[calc(100vh-8rem)]">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                <h2 className="text-lg font-medium">Recent Activity</h2>
              </div>
              <CardDescription>Your recent interactions with the AI assistant</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(100vh-16rem)]">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Data Cleaning Suggestions</h3>
                      <Badge variant="outline">Today</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Received 5 suggestions for cleaning your customer dataset
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Model Comparison</h3>
                      <Badge variant="outline">Yesterday</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Compared performance of Random Forest vs. XGBoost models
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Feature Engineering</h3>
                      <Badge variant="outline">3 days ago</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Created 3 new features based on AI suggestions</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Visualization Help</h3>
                      <Badge variant="outline">1 week ago</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Got recommendations for visualizing time series data
                    </p>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Mock response generator for demo purposes
function generateMockResponse(input: string): string {
  const lowerInput = input.toLowerCase()

  if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
    return "Hello! How can I help you with your data analysis or machine learning tasks today?"
  }

  if (lowerInput.includes("data cleaning") || lowerInput.includes("clean")) {
    return "For data cleaning, I recommend:\n\n1. Check for missing values and decide on an imputation strategy\n2. Remove duplicate records\n3. Handle outliers using statistical methods\n4. Standardize text fields (case, formatting)\n5. Validate data types and ranges\n\nWould you like me to elaborate on any of these steps?"
  }

  if (lowerInput.includes("model") || lowerInput.includes("algorithm")) {
    return "Based on your needs, here are some model recommendations:\n\n1. For classification: Random Forest, XGBoost, or Logistic Regression\n2. For regression: Linear Regression, Gradient Boosting, or Neural Networks\n3. For time series: ARIMA, Prophet, or LSTM networks\n\nThe best choice depends on your specific data and requirements. Would you like more details about any of these models?"
  }

  if (lowerInput.includes("visualization") || lowerInput.includes("chart") || lowerInput.includes("graph")) {
    return "For effective data visualization, consider:\n\n1. Bar charts for categorical comparisons\n2. Line charts for time series data\n3. Scatter plots for relationship analysis\n4. Heatmaps for correlation matrices\n5. Box plots for distribution analysis\n\nThe choice depends on what insights you're trying to highlight. What kind of data are you working with?"
  }

  return (
    "I understand you're asking about " +
    input.substring(0, 30) +
    "... Could you provide more details about your specific needs or the dataset you're working with? This will help me give you more targeted assistance."
  )
}

// Mock suggestion response generator for demo purposes
function generateMockSuggestionResponse(type: string): string {
  switch (type) {
    case "data_cleaning":
      return "Here are my suggestions for data cleaning:\n\n1. **Handle Missing Values**: Use imputation techniques like mean/median for numerical data and mode for categorical data.\n\n2. **Remove Duplicates**: Check for and remove duplicate records that could skew your analysis.\n\n3. **Standardize Text Fields**: Ensure consistent formatting for text data (case, spacing, special characters).\n\n4. **Outlier Detection**: Use statistical methods like IQR or Z-score to identify and handle outliers.\n\n5. **Data Type Conversion**: Ensure all columns have the appropriate data types for analysis.\n\nWould you like code examples for any of these techniques?"

    case "feature_engineering":
      return "Here are my suggestions for feature engineering:\n\n1. **Create Interaction Features**: Combine existing features to capture relationships between variables.\n\n2. **Polynomial Features**: Generate polynomial and interaction terms for linear models.\n\n3. **Time-Based Features**: Extract components from dates (day of week, month, quarter) for time series data.\n\n4. **Text Vectorization**: Convert text data into numerical features using techniques like TF-IDF or word embeddings.\n\n5. **Dimensionality Reduction**: Use PCA or t-SNE to reduce feature space while preserving information.\n\nWhich of these would be most relevant to your current project?"

    case "model_selection":
      return "Here are my recommendations for model selection:\n\n1. **Random Forest**: Excellent for most classification and regression tasks with good interpretability.\n\n2. **Gradient Boosting (XGBoost/LightGBM)**: Often provides state-of-the-art performance on structured data.\n\n3. **Neural Networks**: Best for complex patterns in large datasets, especially for image, text, or sequence data.\n\n4. **Linear/Logistic Regression**: Good baseline models with high interpretability for simpler relationships.\n\n5. **Support Vector Machines**: Effective for high-dimensional spaces and clear margin of separation.\n\nThe best choice depends on your data characteristics and requirements for interpretability vs. performance."

    case "visualization":
      return "Here are my suggestions for data visualization:\n\n1. **Distribution Analysis**: Use histograms and box plots to understand your data distribution.\n\n2. **Correlation Heatmap**: Visualize relationships between numerical variables.\n\n3. **Pair Plots**: Examine pairwise relationships across multiple variables.\n\n4. **Time Series Decomposition**: Break down time series into trend, seasonality, and residual components.\n\n5. **Feature Importance Plot**: Visualize which features contribute most to your model's predictions.\n\nWhat kind of insights are you trying to highlight with your visualizations?"

    case "analysis":
      return "Here are my suggestions for data analysis:\n\n1. **Exploratory Data Analysis (EDA)**: Start with summary statistics and distribution visualizations.\n\n2. **Correlation Analysis**: Identify relationships between variables using correlation matrices and statistical tests.\n\n3. **Segmentation Analysis**: Group similar data points using clustering techniques.\n\n4. **Trend Analysis**: Identify patterns over time in your data.\n\n5. **Hypothesis Testing**: Validate assumptions and compare groups using statistical tests.\n\nWhich analysis technique would be most helpful for your current project?"

    case "performance_improvement":
      return "Here are my suggestions for improving model performance:\n\n1. **Hyperparameter Tuning**: Use grid search or Bayesian optimization to find optimal parameters.\n\n2. **Feature Selection**: Remove irrelevant features that might be adding noise.\n\n3. **Ensemble Methods**: Combine multiple models to improve overall performance.\n\n4. **Cross-Validation**: Use k-fold cross-validation to get more reliable performance estimates.\n\n5. **Address Class Imbalance**: Use techniques like SMOTE or class weights for imbalanced classification problems.\n\nWhat specific performance issues are you trying to address?"

    default:
      return "I don't have specific suggestions for that category yet. Could you tell me more about what you're looking for?"
  }
}
