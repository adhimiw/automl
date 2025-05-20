import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function DataPreview() {
  // Mock data for demonstration
  const columns = [
    { name: "id", type: "integer" },
    { name: "name", type: "string" },
    { name: "age", type: "integer" },
    { name: "gender", type: "string" },
    { name: "income", type: "float" },
    { name: "spending", type: "float" },
    { name: "category", type: "string" },
  ]

  const rows = [
    { id: 1, name: "John Smith", age: 34, gender: "Male", income: 65000, spending: 48000, category: "A" },
    { id: 2, name: "Jane Doe", age: 28, gender: "Female", income: 72000, spending: 52000, category: "B" },
    { id: 3, name: "Robert Johnson", age: 45, gender: "Male", income: 58000, spending: 41000, category: "A" },
    { id: 4, name: "Emily Wilson", age: 31, gender: "Female", income: 67000, spending: 49000, category: "C" },
    { id: 5, name: "Michael Brown", age: 52, gender: "Male", income: 81000, spending: 62000, category: "B" },
    { id: 6, name: "Sarah Davis", age: 29, gender: "Female", income: 59000, spending: 44000, category: "A" },
    { id: 7, name: "David Miller", age: 41, gender: "Male", income: 75000, spending: 58000, category: "C" },
    { id: 8, name: "Lisa Garcia", age: 36, gender: "Female", income: 63000, spending: 47000, category: "B" },
    { id: 9, name: "James Wilson", age: 48, gender: "Male", income: 69000, spending: 51000, category: "A" },
    { id: 10, name: "Jennifer Martinez", age: 33, gender: "Female", income: 71000, spending: 54000, category: "C" },
  ]

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead key={index} className="whitespace-nowrap">
                <div className="flex flex-col">
                  <span>{column.name}</span>
                  <span className="text-xs text-muted-foreground font-normal">{column.type}</span>
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column, colIndex) => (
                <TableCell key={colIndex}>{row[column.name as keyof typeof row]?.toString() || ""}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
