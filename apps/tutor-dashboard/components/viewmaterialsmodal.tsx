import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { useGetAllClasscroomMaterials } from "@/hooks/query/classroom";
  import { Button } from "./ui/button";
  import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
  } from "@radix-ui/react-dropdown-menu";
  import { MoreHorizontal } from "lucide-react";
  import { Dispatch, SetStateAction } from "react";
  import NextLink from "next/link";
import CourseCardSkeleton from "@/app/(dashboard)/classes/[id]/loading";

  
interface ViewMaterialsModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    classId: string;
    topicId: string;
    setSelectedTopic: Dispatch<SetStateAction<boolean>>;
  }
  
  export function ViewMaterialsModal({
    open,
    onOpenChange,
    classId,
    topicId,
  }: ViewMaterialsModalProps) {
    const { data: getMaterials, loading } = useGetAllClasscroomMaterials(
      classId,
      topicId
    );
  
    const materials = getMaterials?.data || [];
  
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>View materials</DialogTitle>
          </DialogHeader>
  
          {loading ? (
            <CourseCardSkeleton />
          ) : materials.length === 0 ? (
            <div className="text-center text-muted-foreground py-6">
              No materials found for this topic.
            </div>
          ) : (
            materials.map((material) => (
              <div
                key={material.title}
                className="flex items-center justify-between p-4"
              >
                <div>
                  <p className="font-medium">{material.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {material.type.toUpperCase()} • Added on{" "}
                    {/* Optional: format date if needed */}
                    {/* new Date(material.created_at).toLocaleDateString() */}
                  </p>
                </div>
  
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    asChild
                    className=""
                  >
                    <NextLink
                      href={material.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </NextLink>
                  </Button>
  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Download</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive focus:text-destructive">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))
          )}
        </DialogContent>
      </Dialog>
    );
  }