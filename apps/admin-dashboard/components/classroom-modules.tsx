"use client"

import { useState } from "react"
import { Clock, FileText, MoreVertical, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { AddModuleDialog } from "./add-module-dialog"
import { EditModuleDialog } from "./edit-module-dialog"

interface ClassroomModulesProps {
  classroom: Classroom
}

export function ClassroomModules({ classroom }: ClassroomModulesProps) {
  const { removeModule } = useClassrooms()
  const [isAddModuleOpen, setIsAddModuleOpen] = useState(false)
  const [moduleToEdit, setModuleToEdit] = useState<string | null>(null)
  const [moduleToDelete, setModuleToDelete] = useState<string | null>(null)

  const handleDeleteModule = () => {
    if (moduleToDelete) {
      removeModule(classroom.id, moduleToDelete)
      setModuleToDelete(null)
    }
  }

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Modules ({classroom.modules.length})</h2>
        <Button onClick={() => setIsAddModuleOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Module
        </Button>
      </div>

      {classroom.modules.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 border rounded-md">
          <div className="text-center">
            <h3 className="text-lg font-medium">No modules found</h3>
            <p className="text-muted-foreground mt-1">Create modules to organize your course content</p>
            <Button className="mt-4" onClick={() => setIsAddModuleOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Module
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {classroom.modules.map((module) => (
            <Card key={module.id}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-base">{module.title}</CardTitle>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setModuleToEdit(module.id)}>Edit Module</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-500" onClick={() => setModuleToDelete(module.id)}>
                      Delete Module
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{module.description}</p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Duration: {module.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>Materials: {module.materials}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <AddModuleDialog classroomId={classroom.id} open={isAddModuleOpen} onOpenChange={setIsAddModuleOpen} />

      {moduleToEdit && (
        <EditModuleDialog
          classroomId={classroom.id}
          moduleId={moduleToEdit}
          open={!!moduleToEdit}
          onOpenChange={(open) => !open && setModuleToEdit(null)}
        />
      )}

      <AlertDialog open={!!moduleToDelete} onOpenChange={(open) => !open && setModuleToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Module</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this module? This action cannot be undone and will remove all associated
              materials.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteModule} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
