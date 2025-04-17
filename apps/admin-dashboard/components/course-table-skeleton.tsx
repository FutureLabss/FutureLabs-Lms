import { Skeleton } from "@/components/ui/skeleton"

export function CourseTableSkeleton() {
  return (
    <div className="rounded-md border">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-3 text-left text-sm font-medium">Course Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Program</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Branch</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Students</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Modules</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Completion</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Views</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-3">
                  <Skeleton className="h-5 w-40" />
                </td>
                <td className="px-4 py-3">
                  <Skeleton className="h-5 w-24" />
                </td>
                <td className="px-4 py-3">
                  <Skeleton className="h-5 w-28" />
                </td>
                <td className="px-4 py-3">
                  <Skeleton className="h-5 w-10" />
                </td>
                <td className="px-4 py-3">
                  <Skeleton className="h-5 w-10" />
                </td>
                <td className="px-4 py-3">
                  <Skeleton className="h-5 w-16" />
                </td>
                <td className="px-4 py-3">
                  <Skeleton className="h-5 w-12" />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
