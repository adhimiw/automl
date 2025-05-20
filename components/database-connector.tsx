"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export function DatabaseConnector() {
  const [dbType, setDbType] = useState("")
  const [connecting, setConnecting] = useState(false)
  const { toast } = useToast()

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault()

    setConnecting(true)

    // Simulate API call
    setTimeout(() => {
      setConnecting(false)
      toast({
        title: "Database connected successfully",
        description: "Your database connection has been established.",
      })
      // In a real app, you would redirect to the table selection page
      // router.push(`/data/database/${connectionId}`)
    }, 2000)
  }

  return (
    <form onSubmit={handleConnect} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="db-type">Database Type</Label>
          <Select value={dbType} onValueChange={setDbType}>
            <SelectTrigger id="db-type">
              <SelectValue placeholder="Select database type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mysql">MySQL / MariaDB</SelectItem>
              <SelectItem value="postgres">PostgreSQL</SelectItem>
              <SelectItem value="sqlserver">SQL Server</SelectItem>
              <SelectItem value="oracle">Oracle</SelectItem>
              <SelectItem value="mongodb">MongoDB</SelectItem>
              <SelectItem value="bigquery">Google BigQuery</SelectItem>
              <SelectItem value="snowflake">Snowflake</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="host">Host / Connection String</Label>
          <Input id="host" placeholder="e.g., localhost or connection URL" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="port">Port</Label>
            <Input id="port" placeholder="e.g., 3306" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="database">Database Name</Label>
            <Input id="database" placeholder="e.g., my_database" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" placeholder="Database username" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Database password" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="ssl">SSL Options</Label>
          <Select defaultValue="require">
            <SelectTrigger id="ssl">
              <SelectValue placeholder="Select SSL option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="disable">Disable</SelectItem>
              <SelectItem value="prefer">Prefer</SelectItem>
              <SelectItem value="require">Require</SelectItem>
              <SelectItem value="verify-ca">Verify CA</SelectItem>
              <SelectItem value="verify-full">Verify Full</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline">
          Test Connection
        </Button>
        <Button type="submit" disabled={!dbType || connecting}>
          {connecting ? "Connecting..." : "Connect"}
        </Button>
      </div>
    </form>
  )
}
