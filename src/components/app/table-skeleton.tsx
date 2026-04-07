import { Skeleton } from "@/components/ui/skeleton"

interface TableSkeletonProps {
  columns?: number
  rows?: number
}

export function TableSkeleton({ columns = 5, rows = 8 }: TableSkeletonProps) {
  return (
    <div className="w-full overflow-hidden rounded-lg border">
      {/* Header row */}
      <div className="flex items-center gap-4 border-b bg-muted/50 px-4 py-3">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className="h-4 flex-1" style={{ maxWidth: i === 0 ? "160px" : undefined }} />
        ))}
      </div>

      {/* Body rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="flex items-center gap-4 border-b px-4 py-3 last:border-0"
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton
              key={colIndex}
              className="h-4 flex-1"
              style={{
                maxWidth:
                  colIndex === 0
                    ? "200px"
                    : colIndex === columns - 1
                    ? "80px"
                    : undefined,
                opacity: colIndex === columns - 1 ? 0.6 : 1,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
