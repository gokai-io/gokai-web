import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { EmptyState } from "@/components/app/empty-state"
import { cn } from "@/lib/utils"

export interface Column<T> {
  key: string
  header: string
  cell?: (item: T) => React.ReactNode
  className?: string
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  onRowClick?: (item: T) => void
  emptyMessage?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  onRowClick,
  emptyMessage = "Nenhum registro encontrado.",
}: DataTableProps<T>) {
  if (data.length === 0) {
    return <EmptyState title={emptyMessage} />
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead key={col.key} className={col.className}>
              {col.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, rowIndex) => (
          <TableRow
            key={rowIndex}
            onClick={onRowClick ? () => onRowClick(item) : undefined}
            className={cn(onRowClick && "cursor-pointer")}
          >
            {columns.map((col) => (
              <TableCell key={col.key} className={col.className}>
                {col.cell
                  ? col.cell(item)
                  : String(item[col.key] ?? "")}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
