import { ClassroomDetail } from "@/components/classroom-detail"
import { ClassroomProvider } from "@/components/classroom-provider"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function ClassroomDetailPage({ params }: { params: { id: string } }) {
  return (
    <SidebarProvider>
      <ClassroomProvider>
        <ClassroomDetail id={params.id} />
      </ClassroomProvider>
    </SidebarProvider>
  )
}
