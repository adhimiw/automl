"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LucideFileText, LucideDatabase, LucideBarChart2, LucideBrain } from "lucide-react"

interface Activity {
  id: string
  user: {
    name: string
    avatar?: string
  }
  action: string
  target: string
  targetType: "project" | "dataset" | "analysis" | "ai"
  timestamp: string
}

export function ActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchActivities = async () => {
      setLoading(true)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock data
      const mockActivities = [
        {
          id: "1",
          user: {
            name: "You",
            avatar: "",
          },
          action: "created",
          target: "Customer Segmentation",
          targetType: "project" as const,
          timestamp: "2 hours ago",
        },
        {
          id: "2",
          user: {
            name: "You",
            avatar: "",
          },
          action: "imported",
          target: "Sales Data Q3",
          targetType: "dataset" as const,
          timestamp: "Yesterday",
        },
        {
          id: "3",
          user: {
            name: "You",
            avatar: "",
          },
          action: "ran",
          target: "Correlation Analysis",
          targetType: "analysis" as const,
          timestamp: "3 days ago",
        },
        {
          id: "4",
          user: {
            name: "You",
            avatar: "",
          },
          action: "received",
          target: "AI Recommendation",
          targetType: "ai" as const,
          timestamp: "4 days ago",
        },
      ]

      setActivities(mockActivities)
      setLoading(false)
    }

    fetchActivities()
  }, [])

  const getActivityIcon = (type: Activity["targetType"]) => {
    switch (type) {
      case "project":
        return <LucideFileText className="h-4 w-4" />
      case "dataset":
        return <LucideDatabase className="h-4 w-4" />
      case "analysis":
        return <LucideBarChart2 className="h-4 w-4" />
      case "ai":
        return <LucideBrain className="h-4 w-4" />
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center space-x-4">
            <div className="h-8 w-8 animate-pulse rounded-full bg-muted"></div>
            <div className="space-y-2 flex-1">
              <div className="h-4 w-full animate-pulse rounded bg-muted"></div>
              <div className="h-3 w-1/2 animate-pulse rounded bg-muted"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start space-x-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src={activity.user.avatar || ""} alt={activity.user.name} />
            <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1 flex-1">
            <p className="text-sm">
              <span className="font-medium">{activity.user.name}</span>{" "}
              <span className="text-muted-foreground">{activity.action}</span>{" "}
              <span className="font-medium flex items-center space-x-1 inline-flex">
                {getActivityIcon(activity.targetType)}
                <span>{activity.target}</span>
              </span>
            </p>
            <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
