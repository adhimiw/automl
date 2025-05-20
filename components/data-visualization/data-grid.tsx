"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { LucideSearch, LucideDownload, LucideFilter } from "lucide-react"

interface Column {
  key: string
  label: string
  type: "string" | "number" | "date" | "boolean"
  sortable?: boolean
  filterable?: boolean
}

interface DataGridProps {
  columns: Column[]
  data: Record<string, any>[]
  pageSize?: number
  exportOptions?: {
    csv?: boolean
    excel?: boolean
    json?: boolean
  }
  onExport?: (format: string) => void
}

export function DataGrid({
  columns,
  data,
  pageSize = 10,
  exportOptions = { csv: true, json: true },
  onExport,
}: DataGridProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState<Record<string, any>>({})

  // Calculate total pages
  const totalPages = Math.ceil(data.length / pageSize)

  // Filter, sort, and paginate data
  const processedData = () => {
    let result = [...data]

    // Apply search
    if (searchTerm) {
      result = result.filter((row) =>
        Object.values(row).some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        result = result.filter((row) => String(row[key]).includes(String(value)))
      }
    })

    // Apply sorting
    if (sortColumn) {
      result.sort((a, b) => {
        const aValue = a[sortColumn]
        const bValue = b[sortColumn]

        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
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
        const headers = columns.map((col) => col.label).join(",")
        const rows = data
          .map((row) => columns.map((col) => `"${String(row[col.key]).replace(/"/g, '""')}"`).join(","))
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
        const jsonContent = JSON.stringify(data, null, 2)
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

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative">
          <LucideSearch className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          {exportOptions.csv && (
            <Button variant="outline" size="sm" onClick={() => handleExport("csv")}>
              <LucideDownload className="mr-2 h-4 w-4" />
              CSV
            </Button>
          )}
          {exportOptions.json && (
            <Button variant="outline" size="sm" onClick={() => handleExport("json")}>
              <LucideDownload className="mr-2 h-4 w-4" />
              JSON
            </Button>
          )}
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.key} className="whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <span
                      className={column.sortable ? "cursor-pointer" : ""}
                      onClick={() => column.sortable && handleSort(column.key)}
                    >
                      {column.label}
                      {sortColumn === column.key && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                    </span>
                    {column.filterable && (
                      <div className="relative ml-1">
                        <Select
                          onValueChange={(value) => handleFilter(column.key, value)}
                          value={filters[column.key] || "all"} // Updated default value
                        >
                          <SelectTrigger className="h-6 w-6 p-0">
                            <LucideFilter className="h-3 w-3" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All</SelectItem> // Updated value prop
                            {Array.from(new Set(data.map((row) => String(row[column.key])))).map((value) => (
                              <SelectItem key={value} value={value}>
                                {value}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {processedData().map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column) => (
                  <TableCell key={`${rowIndex}-${column.key}`}>{row[column.key]}</TableCell>
                ))}
              </TableRow>
            ))}
            {processedData().length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
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
  )
}
