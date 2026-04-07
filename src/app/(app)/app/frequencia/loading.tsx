import { TableSkeleton } from "@/components/app/table-skeleton"
import { Skeleton } from "@/components/ui/skeleton"

export default function FrequenciaLoading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-8 w-28" />
          <Skeleton className="h-4 w-64" />
        </div>
      </div>
      {/* Filter controls skeleton */}
      <div className="flex gap-3 flex-wrap">
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-9 w-40" />
        <Skeleton className="h-9 w-32" />
      </div>
      <TableSkeleton columns={5} rows={10} />
    </div>
  )
}
