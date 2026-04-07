import { TableSkeleton } from "@/components/app/table-skeleton"
import { Skeleton } from "@/components/ui/skeleton"

export default function ModalidadesLoading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-9 w-40 shrink-0" />
      </div>
      <div className="flex justify-end">
        <Skeleton className="h-9 w-40" />
      </div>
      <TableSkeleton columns={5} rows={6} />
    </div>
  )
}
