"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { HelpTooltip } from "./help-tooltip"
import { ConceptExplanation } from "./concept-explanation"
import { WhyThisWorks } from "./why-this-works"
import { usePathname } from "next/navigation"

// Types
export type HelpContextType = {
  showHelp: boolean
  toggleHelp: () => void
  currentContext: string
  setCurrentContext: (context: string) => void
  openConceptExplanation: (concept: string, level?: string) => void
  openWhyThisWorks: (feature: string, context?: string) => void
  closeHelp: () => void
}

export type HelpProviderProps = {
  children: ReactNode
  defaultShowHelp?: boolean
}

// Create context
const HelpContext = createContext<HelpContextType | undefined>(undefined)

// Hook to use the help context
export function useHelp() {
  const context = useContext(HelpContext)
  if (context === undefined) {
    throw new Error("useHelp must be used within a HelpProvider")
  }
  return context
}

// Help Provider component
export function HelpProvider({ children, defaultShowHelp = false }: HelpProviderProps) {
  const [showHelp, setShowHelp] = useState(defaultShowHelp)
  const [currentContext, setCurrentContext] = useState("")
  const [conceptToExplain, setConceptToExplain] = useState<string | null>(null)
  const [conceptLevel, setConceptLevel] = useState<string>("intermediate")
  const [featureToExplain, setFeatureToExplain] = useState<string | null>(null)
  const [featureContext, setFeatureContext] = useState<string | null>(null)
  const pathname = usePathname()
  
  // Reset context when path changes
  useEffect(() => {
    setCurrentContext("")
  }, [pathname])
  
  // Toggle help visibility
  const toggleHelp = () => {
    setShowHelp(!showHelp)
  }
  
  // Open concept explanation
  const openConceptExplanation = (concept: string, level: string = "intermediate") => {
    setConceptToExplain(concept)
    setConceptLevel(level)
    setFeatureToExplain(null)
    setShowHelp(true)
  }
  
  // Open "Why This Works" explanation
  const openWhyThisWorks = (feature: string, context?: string) => {
    setFeatureToExplain(feature)
    setFeatureContext(context || null)
    setConceptToExplain(null)
    setShowHelp(true)
  }
  
  // Close help
  const closeHelp = () => {
    setShowHelp(false)
    setConceptToExplain(null)
    setFeatureToExplain(null)
  }
  
  // Context value
  const value = {
    showHelp,
    toggleHelp,
    currentContext,
    setCurrentContext,
    openConceptExplanation,
    openWhyThisWorks,
    closeHelp
  }
  
  return (
    <HelpContext.Provider value={value}>
      {children}
      
      {/* Render concept explanation if needed */}
      {showHelp && conceptToExplain && (
        <ConceptExplanation 
          concept={conceptToExplain} 
          level={conceptLevel}
          onClose={closeHelp}
        />
      )}
      
      {/* Render "Why This Works" explanation if needed */}
      {showHelp && featureToExplain && (
        <WhyThisWorks 
          feature={featureToExplain} 
          context={featureContext}
          onClose={closeHelp}
        />
      )}
    </HelpContext.Provider>
  )
}

// Helper components
export { HelpTooltip }
export { ConceptExplanation }
export { WhyThisWorks }
