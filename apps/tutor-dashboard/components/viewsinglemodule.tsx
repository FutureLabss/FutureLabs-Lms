import { useGetSingleClasscroomModules } from "@/hooks/query/classroom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type AddModuleModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    classroomId: string;
    moduleId: string;
  };
  export function ViewSingleModuleModal({
    open,
    onOpenChange,
    classroomId,
    moduleId,
  }: AddModuleModalProps) {
    const { data: retrivedSingleModule } = useGetSingleClasscroomModules(classroomId, moduleId);
    console.log(retrivedSingleModule, "singlemodule");
    console.log(classroomId, "id");
    console.log(moduleId, "id");
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>View Single Module</DialogTitle>
            <DialogDescription>
              Displaying details for module ID: {moduleId}
            </DialogDescription>
          </DialogHeader>
          {/* Render data here */}
        </DialogContent>
      </Dialog>
    );
  }
  