export function DataSummary() {
  // Mock data for demonstration
  const summary = {
    rowCount: 1245,
    columnCount: 15,
    dataTypes: {
      numeric: 8,
      categorical: 5,
      datetime: 1,
      text: 1,
    },
    missingValues: "3.2%",
    duplicateRows: 12,
    memoryUsage: "2.4 MB",
    lastUpdated: "2 hours ago",
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Rows</p>
          <p className="text-xl font-medium">{summary.rowCount.toLocaleString()}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Columns</p>
          <p className="text-xl font-medium">{summary.columnCount}</p>
        </div>
      </div>

      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">Data Types</p>
        <div className="flex gap-2">
          <span className="bg-blue-100 text-blue-800 rounded-full px-2 py-0.5 text-xs font-medium">
            {summary.dataTypes.numeric} Numeric
          </span>
          <span className="bg-green-100 text-green-800 rounded-full px-2 py-0.5 text-xs font-medium">
            {summary.dataTypes.categorical} Categorical
          </span>
          <span className="bg-purple-100 text-purple-800 rounded-full px-2 py-0.5 text-xs font-medium">
            {summary.dataTypes.datetime} Datetime
          </span>
          <span className="bg-amber-100 text-amber-800 rounded-full px-2 py-0.5 text-xs font-medium">
            {summary.dataTypes.text} Text
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Missing Values</p>
          <p className="text-lg font-medium">{summary.missingValues}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Duplicate Rows</p>
          <p className="text-lg font-medium">{summary.duplicateRows}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Memory Usage</p>
          <p className="text-lg font-medium">{summary.memoryUsage}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Last Updated</p>
          <p className="text-lg font-medium">{summary.lastUpdated}</p>
        </div>
      </div>
    </div>
  )
}
