"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Loader2, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DeleteClassroomModuleProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onDelete: () => void
  isSubmitting?: boolean 
}

export default function DeleteClassRoomModuleModal({
  open,
  onOpenChange,
  onDelete,
  isSubmitting = false, 
}: DeleteClassroomModuleProps) {
  const handleDelete = () => {
    onDelete()
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        if (isSubmitting) return 
        onOpenChange(newOpen)
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Module</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this module? All topics within this module will also be deleted. This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash className="mr-2 h-4 w-4" />
                Delete Module
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
