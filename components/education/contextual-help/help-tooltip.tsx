"use client"

import { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { HelpCircle, BookOpen, Lightbulb } from "lucide-react"
import { useHelp } from "./help-provider"

interface HelpTooltipProps {
  children?: ReactNode
  content: string
  concept?: string
  feature?: string
  context?: string
  icon?: "help" | "book" | "lightbulb"
  className?: string
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
}

export function HelpTooltip({ 
  children, 
  content, 
  concept, 
  feature,
  context,
  icon = "help",
  className = "",
  side = "top",
  align = "center"
}: HelpTooltipProps) {
  const { openConceptExplanation, openWhyThisWorks } = useHelp()
  
  // Get icon component
  const IconComponent = () => {
    switch (icon) {
      case "book":
        return <BookOpen className="h-4 w-4" />
      case "lightbulb":
        return <Lightbulb className="h-4 w-4" />
      case "help":
      default:
        return <HelpCircle className="h-4 w-4" />
    }
  }
  
  // Handle learn more click
  const handleLearnMore = () => {
    if (concept) {
      openConceptExplanation(concept)
    } else if (feature) {
      openWhyThisWorks(feature, context)
    }
  }

  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          {children || (
            <Button variant="ghost" size="icon" className={`h-5 w-5 ${className}`}>
              <IconComponent />
            </Button>
          )}
        </TooltipTrigger>
        <TooltipContent 
          side={side} 
          align={align}
          className="max-w-sm p-4"
        >
          <div className="space-y-2">
            <p>{content}</p>
            {(concept || feature) && (
              <Button 
                variant="link" 
                size="sm" 
                className="p-0 h-auto text-xs"
                onClick={handleLearnMore}
              >
                Learn more
              </Button>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
