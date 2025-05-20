"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  LucideSearch,
  LucideDownload,
  LucideFilter,
  LucideRefreshCw,
  LucideColumns,
  LucideArrowUpDown,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { lt } from "lodash" // Importing lt from lodash to fix undeclared variable error

interface Column {
  key: string
  label: string
  type: "string" | "number" | "date" | "boolean"
  sortable?: boolean
  filterable?: boolean
  visible?: boolean
  width?: string
  render?: (value: any, row: Record<string, any>) => React.ReactNode
}

interface EnhancedDataGridProps {
  columns: Column[]
  data: Record<string, any>[]
  pageSize?: number
  exportOptions?: {
    csv?: boolean
    excel?: boolean
    json?: boolean
  }
  onExport?: (format: string) => void
  onRowClick?: (row: Record<string, any>) => void
  onRefresh?: () => void
  isLoading?: boolean
  selectable?: boolean
  onSelectionChange?: (selectedRows: Record<string, any>[]) => void
  className?: string
}

export function EnhancedDataGrid({
  columns: initialColumns,
  data,
  pageSize = 10,
  exportOptions = { csv: true, json: true },
  onExport,
  onRowClick,
  onRefresh,
  isLoading = false,
  selectable = false,
  onSelectionChange,
  className = "",
}: EnhancedDataGridProps) {
  const [columns, setColumns] = useState<Column[]>(
    initialColumns.map((col) => ({ ...col, visible: col.visible !== false })),
  )
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState<Record<string, any>>({})
  const [selectedRows, setSelectedRows] = useState<Record<string, any>[]>([])
  const [selectAll, setSelectAll] = useState(false)

  // Calculate total pages
  const filteredData = applyFiltersAndSearch(data, filters, searchTerm)
  const totalPages = Math.ceil(filteredData.length / pageSize)

  // Handle column visibility changes
  const toggleColumnVisibility = (key: string, visible: boolean) => {
    setColumns(columns.map((col) => (col.key === key ? { ...col, visible } : col)))
  }

  // Handle row selection
  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(selectedRows)
    }
  }, [selectedRows, onSelectionChange])

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([])
    } else {
      setSelectedRows([...filteredData])
    }
    setSelectAll(!selectAll)
  }

  const toggleRowSelection = (row: Record<string, any>) => {
    const isSelected = selectedRows.some((selectedRow) => selectedRow === row)
    if (isSelected) {
      setSelectedRows(selectedRows.filter((selectedRow) => selectedRow !== row))
      setSelectAll(false)
    } else {
      setSelectedRows([...selectedRows, row])
      if (selectedRows.length + 1 === filteredData.length) {
        setSelectAll(true)
      }
    }
  }

  // Filter and search data
  function applyFiltersAndSearch(data: Record<string, any>[], filters: Record<string, any>, searchTerm: string) {
    let result = [...data]

    // Apply search
    if (searchTerm) {
      result = result.filter((row) =>
        Object.entries(row).some(([key, value]) => {
          const column = columns.find((col) => col.key === key)
          if (!column || !column.visible) return false
          return String(value).toLowerCase().includes(searchTerm.toLowerCase())
        }),
      )
    }

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== "all") {
        result = result.filter((row) => String(row[key]).includes(String(value)))
      }
    })

    return result
  }

  // Process data (filter, sort, paginate)
  const processedData = () => {
    const result = applyFiltersAndSearch(data, filters, searchTerm)

    // Apply sorting
    if (sortColumn) {
      result.sort((a, b) => {
        const aValue = a[sortColumn]
        const bValue = b[sortColumn]

        if (lt(aValue, bValue)) return sortDirection === "asc" ? -1 : 1 // Using lt from lodash
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
        return 0
      })
    }

    // Apply pagination
    const startIndex = (currentPage - 1) * pageSize
    return result.slice(startIndex, startIndex + pageSize)
  }

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(columnKey)
      setSortDirection("asc")
    }
  }

  const handleFilter = (columnKey: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [columnKey]: value,
    }))
    setCurrentPage(1) // Reset to first page when filtering
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    setCurrentPage(1) // Reset to first page when searching
  }

  const handleExport = (format: string) => {
    if (onExport) {
      onExport(format)
    } else {
      // Default export implementation
      if (format === "csv") {
        const visibleColumns = columns.filter((col) => col.visible)
        const headers = visibleColumns.map((col) => col.label).join(",")
        const rows = data
          .map((row) => visibleColumns.map((col) => `"${String(row[col.key]).replace(/"/g, '""')}"`).join(","))
          .join("\n")

        const csvContent = `${headers}\n${rows}`
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.setAttribute("download", "export.csv")
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } else if (format === "json") {
        const visibleColumns = columns.filter((col) => col.visible)
        const filteredData = data.map((row) => {
          const filteredRow: Record<string, any> = {}
          visibleColumns.forEach((col) => {
            filteredRow[col.key] = row[col.key]
          })
          return filteredRow
        })

        const jsonContent = JSON.stringify(filteredData, null, 2)
        const blob = new Blob([jsonContent], { type: "application/json" })
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.setAttribute("download", "export.json")
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    }
  }

  const visibleColumns = columns.filter((col) => col.visible)

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <LucideSearch className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          {onRefresh && (
            <Button variant="outline" size="sm" onClick={onRefresh} disabled={isLoading}>
              <LucideRefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <LucideColumns className="mr-2 h-4 w-4" />
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {columns.map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.key}
                  checked={column.visible}
                  onCheckedChange={(checked) => toggleColumnVisibility(column.key, checked)}
                >
                  {column.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <LucideDownload className="mr-2 h-4 w-4" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {exportOptions.csv && (
                <DropdownMenuCheckboxItem onClick={() => handleExport("csv")}>Export as CSV</DropdownMenuCheckboxItem>
              )}
              {exportOptions.json && (
                <DropdownMenuCheckboxItem onClick={() => handleExport("json")}>Export as JSON</DropdownMenuCheckboxItem>
              )}
              {exportOptions.excel && (
                <DropdownMenuCheckboxItem onClick={() => handleExport("excel")}>
                  Export as Excel
                </DropdownMenuCheckboxItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {Object.keys(filters).length > 0 && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(filters).map(([key, value]) => {
            if (!value || value === "all") return null
            const column = columns.find((col) => col.key === key)
            return (
              <Badge key={key} variant="outline" className="flex items-center gap-1">
                {column?.label}: {value}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 ml-1"
                  onClick={() => handleFilter(key, "all")}
                >
                  <LucideFilter className="h-3 w-3" />
                </Button>
              </Badge>
            )
          })}
          {Object.keys(filters).some((key) => filters[key] && filters[key] !== "all") && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 text-xs"
              onClick={() => {
                setFilters({})
                setCurrentPage(1)
              }}
            >
              Clear All
            </Button>
          )}
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {selectable && (
                <TableHead className="w-[40px]">
                  <Checkbox checked={selectAll} onCheckedChange={toggleSelectAll} aria-label="Select all rows" />
                </TableHead>
              )}
              {visibleColumns.map((column) => (
                <TableHead key={column.key} className="whitespace-nowrap" style={{ width: column.width }}>
                  <div className="flex items-center gap-1">
                    <span
                      className={column.sortable ? "cursor-pointer" : ""}
                      onClick={() => column.sortable && handleSort(column.key)}
                    >
                      {column.label}
                      {sortColumn === column.key && (
                        <LucideArrowUpDown
                          className={`ml-1 h-3 w-3 inline ${sortDirection === "desc" ? "rotate-180" : ""}`}
                        />
                      )}
                    </span>
                    {column.filterable && (
                      <div className="relative ml-1">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
                              <LucideFilter className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start">
                            <DropdownMenuLabel>Filter {column.label}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem
                              checked={!filters[column.key] || filters[column.key] === "all"}
                              onCheckedChange={() => handleFilter(column.key, "all")}
                            >
                              All
                            </DropdownMenuCheckboxItem>
                            {Array.from(new Set(data.map((row) => String(row[column.key])))).map((value) => (
                              <DropdownMenuCheckboxItem
                                key={value}
                                checked={filters[column.key] === value}
                                onCheckedChange={() => handleFilter(column.key, value)}
                              >
                                {value}
                              </DropdownMenuCheckboxItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: pageSize }).map((_, index) => (
                <TableRow key={`loading-${index}`}>
                  {selectable && (
                    <TableCell className="w-[40px]">
                      <div className="h-4 w-4 animate-pulse bg-muted rounded" />
                    </TableCell>
                  )}
                  {visibleColumns.map((column) => (
                    <TableCell key={`loading-${index}-${column.key}`}>
                      <div className="h-4 w-full animate-pulse bg-muted rounded" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : processedData().length > 0 ? (
              processedData().map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  className={onRowClick ? "cursor-pointer hover:bg-muted/50" : ""}
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  {selectable && (
                    <TableCell className="w-[40px]" onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={selectedRows.includes(row)}
                        onCheckedChange={() => toggleRowSelection(row)}
                        aria-label={`Select row ${rowIndex + 1}`}
                      />
                    </TableCell>
                  )}
                  {visibleColumns.map((column) => (
                    <TableCell key={`${rowIndex}-${column.key}`}>
                      {column.render ? column.render(row[column.key], row) : row[column.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={visibleColumns.length + (selectable ? 1 : 0)} className="h-24 text-center">
                  {searchTerm || Object.keys(filters).some((key) => filters[key] && filters[key] !== "all") ? (
                    <div className="flex flex-col items-center justify-center">
                      <LucideSearch className="h-8 w-8 text-muted-foreground mb-2" />
                      <p>No results found.</p>
                      <Button
                        variant="link"
                        onClick={() => {
                          setSearchTerm("")
                          setFilters({})
                        }}
                      >
                        Clear search and filters
                      </Button>
                    </div>
                  ) : (
                    <p>No data available.</p>
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {filteredData.length > 0 ? (
            <>
              Showing {Math.min((currentPage - 1) * pageSize + 1, filteredData.length)} to{" "}
              {Math.min(currentPage * pageSize, filteredData.length)} of {filteredData.length} entries
              {selectedRows.length > 0 && ` (${selectedRows.length} selected)`}
            </>
          ) : (
            "No entries to show"
          )}
        </div>

        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                />
              </PaginationItem>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum = i + 1

                // Adjust page numbers for pagination with many pages
                if (totalPages > 5) {
                  if (currentPage <= 3) {
                    pageNum = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i
                  } else {
                    pageNum = currentPage - 2 + i
                  }
                }

                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink isActive={currentPage === pageNum} onClick={() => setCurrentPage(pageNum)}>
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                )
              })}

              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  )
}
