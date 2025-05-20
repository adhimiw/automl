import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { LucideArrowRight } from "lucide-react"

interface DataQualityProps {
  detailed?: boolean
}

export function DataQuality({ detailed = false }: DataQualityProps) {
  // Mock data for demonstration
  const qualityIssues = [
    {
      type: "missing",
      description: "Missing values",
      affectedColumns: ["age", "income", "occupation"],
      percentage: 3.2,
      severity: "medium",
    },
    {
      type: "outliers",
      description: "Potential outliers",
      affectedColumns: ["age", "spending"],
      percentage: 1.8,
      severity: "high",
    },
    {
      type: "duplicates",
      description: "Duplicate rows",
      affectedColumns: ["all"],
      percentage: 0.9,
      severity: "low",
    },
    {
      type: "inconsistent",
      description: "Inconsistent values",
      affectedColumns: ["category", "status"],
      percentage: 2.4,
      severity: "medium",
    },
  ]

  const overallScore = 87

  if (!detailed) {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Overall Quality Score</p>
            <p className="text-sm font-medium">{overallScore}/100</p>
          </div>
          <Progress value={overallScore} className="h-2" />
        </div>

        <div className="space-y-2">
          {qualityIssues.map((issue, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    issue.severity === "high"
                      ? "bg-destructive"
                      : issue.severity === "medium"
                        ? "bg-amber-500"
                        : "bg-yellow-500"
                  }`}
                />
                <span>{issue.description}</span>
              </div>
              <span>{issue.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="font-medium">Overall Quality Score</p>
          <p className="font-medium">{overallScore}/100</p>
        </div>
        <Progress value={overallScore} className="h-2" />
        <p className="text-sm text-muted-foreground">
          Your dataset has a good quality score, but there are some issues that should be addressed.
        </p>
      </div>

      <div className="space-y-4">
        {qualityIssues.map((issue, index) => (
          <div key={index} className="border rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      issue.severity === "high"
                        ? "bg-destructive"
                        : issue.severity === "medium"
                          ? "bg-amber-500"
                          : "bg-yellow-500"
                    }`}
                  />
                  <h4 className="font-medium">{issue.description}</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Affects {issue.percentage}% of your data</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {issue.affectedColumns.map((column, i) => (
                    <span key={i} className="bg-muted text-muted-foreground rounded-full px-2 py-0.5 text-xs">
                      {column}
                    </span>
                  ))}
                </div>
              </div>
              <span
                className={`text-xs font-medium rounded-full px-2 py-0.5 ${
                  issue.severity === "high"
                    ? "bg-red-100 text-red-800"
                    : issue.severity === "medium"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {issue.severity.charAt(0).toUpperCase() + issue.severity.slice(1)}
              </span>
            </div>
            <div className="flex justify-end">
              <Button variant="outline" size="sm">
                Fix Issue
                <LucideArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
