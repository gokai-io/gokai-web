import { TableSkeleton } from "@/components/app/table-skeleton"
import { Skeleton } from "@/components/ui/skeleton"

export default function EventosLoading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-4 w-60" />
        </div>
        <Skeleton className="h-9 w-32 shrink-0" />
      </div>
      <TableSkeleton columns={6} rows={8} />
    </div>
  )
}
