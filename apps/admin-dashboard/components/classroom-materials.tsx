"use client"

import { useState } from "react"
import { FileText, FileIcon as FilePdf, FileVideo, LinkIcon, MoreVertical, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useClassrooms, type Classroom } from "./classroom-provider"
import { AddMaterialDialog } from "./add-material-dialog"

interface ClassroomMaterialsProps {
  classroom: Classroom
}

export function ClassroomMaterials({ classroom }: ClassroomMaterialsProps) {
  const { removeMaterial } = useClassrooms()
  const [isAddMaterialOpen, setIsAddMaterialOpen] = useState(false)
  const [materialToDelete, setMaterialToDelete] = useState<string | null>(null)

  const handleDeleteMaterial = () => {
    if (materialToDelete) {
      removeMaterial(classroom.id, materialToDelete)
      setMaterialToDelete(null)
    }
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FilePdf className="h-10 w-10 text-red-500" />
      case "video":
        return <FileVideo className="h-10 w-10 text-blue-500" />
      case "link":
        return <LinkIcon className="h-10 w-10 text-green-500" />
      default:
        return <FileText className="h-10 w-10 text-gray-500" />
    }
  }

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Materials ({classroom.materials.length})</h2>
        <Button onClick={() => setIsAddMaterialOpen(true)}>
          <Upload className="mr-2 h-4 w-4" />
          Add Material
        </Button>
      </div>

      {classroom.materials.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 border rounded-md">
          <div className="text-center">
            <h3 className="text-lg font-medium">No materials found</h3>
            <p className="text-muted-foreground mt-1">Upload materials for your students</p>
            <Button className="mt-4" onClick={() => setIsAddMaterialOpen(true)}>
              <Upload className="mr-2 h-4 w-4" />
              Add Material
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {classroom.materials.map((material) => {
            const module = classroom.modules.find((m) => m.id === material.moduleId)

            return (
              <div key={material.id} className="flex items-start gap-4 rounded-lg border p-4">
                {getFileIcon(material.type)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-medium truncate">{material.title}</h3>
                      <p className="text-sm text-muted-foreground">Module: {module?.title || "Unknown"}</p>
                      <p className="text-xs text-muted-foreground mt-1">Uploaded: {formatDate(material.uploadedAt)}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <a href={material.url} target="_blank" rel="noopener noreferrer" className="flex w-full">
                            View Material
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Download</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500" onClick={() => setMaterialToDelete(material.id)}>
                          Delete Material
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <AddMaterialDialog
        classroomId={classroom.id}
        modules={classroom.modules}
        open={isAddMaterialOpen}
        onOpenChange={setIsAddMaterialOpen}
      />

      <AlertDialog open={!!materialToDelete} onOpenChange={(open) => !open && setMaterialToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Material</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this material? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteMaterial} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
}
