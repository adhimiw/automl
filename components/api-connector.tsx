"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export function ApiConnector() {
  const [apiType, setApiType] = useState("rest")
  const [authType, setAuthType] = useState("none")
  const [connecting, setConnecting] = useState(false)
  const { toast } = useToast()

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault()

    setConnecting(true)

    // Simulate API call
    setTimeout(() => {
      setConnecting(false)
      toast({
        title: "API connected successfully",
        description: "Your API connection has been established.",
      })
      // In a real app, you would redirect to the data preview page
      // router.push(`/data/api/${connectionId}`)
    }, 2000)
  }

  return (
    <form onSubmit={handleConnect} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="api-type">API Type</Label>
          <Select value={apiType} onValueChange={setApiType}>
            <SelectTrigger id="api-type">
              <SelectValue placeholder="Select API type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rest">REST API</SelectItem>
              <SelectItem value="graphql">GraphQL</SelectItem>
              <SelectItem value="soap">SOAP</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="url">API URL</Label>
          <Input id="url" placeholder="https://api.example.com/data" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="auth-type">Authentication</Label>
          <Select value={authType} onValueChange={setAuthType}>
            <SelectTrigger id="auth-type">
              <SelectValue placeholder="Select authentication type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="basic">Basic Auth</SelectItem>
              <SelectItem value="apikey">API Key</SelectItem>
              <SelectItem value="oauth2">OAuth 2.0</SelectItem>
              <SelectItem value="bearer">Bearer Token</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {authType === "basic" && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="API username" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="API password" />
            </div>
          </div>
        )}
        
        {authType === "apikey" && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="key-name">Key Name</Label>
              <Input id="key-name" placeholder="e.g., X-API-Key" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="key-value">Key Value</Label>
              <Input id="key-value" placeholder="Your API key" />
            </div>
          </div>
        )}
        
        {authType === "bearer" && (
          <div className="space-y-2">
            <Label htmlFor="token">Bearer Token</Label>
            <Input id="token" placeholder="Your bearer token" />
          </div>
        )}
        
        {apiType === "rest" && (
          <div className="space-y-2">
            <Label htmlFor="method">HTTP Method</Label>
            <Select defaultValue="GET">
              <SelectTrigger id="method">
                <SelectValue placeholder="Select HTTP method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GET">GET</SelectItem>
                <SelectItem value="POST">POST</SelectItem>
                <SelectItem value="PUT">PUT</SelectItem>
                <SelectItem value="DELETE">DELETE</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
        
        <Tabs defaultValue="headers" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="headers">Headers</TabsTrigger>
            <TabsTrigger value="params">Parameters</TabsTrigger>
            <TabsTrigger value="body">Request Body</TabsTrigger>
          </TabsList>
          <TabsContent value="headers" className="space-y-2 pt-2">
            <Textarea 
              placeholder="Content-Type: application/json\nAccept: application/json"
              className="min-h-[100px] font-mono text-sm"
            />
          </TabsContent>
          <TabsContent value="params" className="space-y-2 pt-2">
            <Textarea 
              placeholder="param1=value1\nparam2=value2"
              className="min-h-[100px] font-mono text-sm"
            />
          </TabsContent>
          <TabsContent value="body" className="space-y-2 pt-2">
            <Textarea 
              placeholder="{\n  \"key\": \"value\"\n}"
              className="min-h-[100px] font-mono text-sm"
            />
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="flex justify-between">
        <Button type="button" variant="outline">
          Test Connection
        </Button>
        <Button type="submit" disabled={connecting}>
          {connecting ? "Connecting..." : "Connect"}
        </Button>
      </div>
    </form>
  )
}
