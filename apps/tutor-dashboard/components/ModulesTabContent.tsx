import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Layers, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TabsContent } from "@/components/ui/tabs";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Skeleton } from "./ui/skeleton";
import CourseCardSkeleton from "@/app/(dashboard)/classes/[id]/loading";
import { ClassroomResponse, IclassRoomMaterials, Module } from "@/lib/types/classroom";
import DisplayTopicDetails from "./displaytopicdetails";
import Pagination from "./ui/pagination";

interface ModulesTabContentProps {
  getmodules?: ClassroomResponse;
  loading: boolean;
  classId: string;
  selectedTopic: any;
  currentPage: number;
  totalPages: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
  // Handlers
  handlePageChange: (page: number) => void;
  handlePageSizeChange: (page: number, size: number) => void;
  handleAddMaterial: (material: IclassRoomMaterials) => void;

  // Dialog control setters
  setIsAddModuleDialogOpen: (open: boolean) => void;
  setIsEditModuleDialogOpen: (open: boolean) => void;
  setIsViewModuleDialogOpen: (open: boolean) => void;
  setIsDeleteModuleDialogOpen: (open: boolean) => void;
  setIsAddTopicDialogOpen: Dispatch<SetStateAction<boolean>>;
  setIsEditTopicDialogOpen: Dispatch<SetStateAction<boolean>>;
  setIsDeleteTopicDialogOpen: Dispatch<SetStateAction<boolean>>;

  // Selection setters
  setSelectedModule: (module: Module) => void;
  setSelectedModuleId: Dispatch<SetStateAction<string | null | undefined>>;
  setSelectedTopic: (topic: any) => void;
  setSelectedTopicModuleId: Dispatch<SetStateAction<string | null | undefined>>;
}

const ModulesTabContent: React.FC<ModulesTabContentProps> = ({
  getmodules,
  loading,
  classId,
  selectedTopic,
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,   
  handlePageChange,
  handlePageSizeChange,
  handleAddMaterial,
  setIsAddModuleDialogOpen,
  setIsEditModuleDialogOpen,
  setIsViewModuleDialogOpen,
  setIsDeleteModuleDialogOpen,
  setIsAddTopicDialogOpen,
  setIsEditTopicDialogOpen,
  setIsDeleteTopicDialogOpen,
  setSelectedModule,
  setSelectedModuleId,
  setSelectedTopic,
  setSelectedTopicModuleId,
}) => {

  return (
    <TabsContent value="modules" className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Modules</h2>
          {loading ? (
            <Skeleton className="h-4 w-44" />
          ) : (
            <p className="text-sm text-muted-foreground">
              {getmodules?.data?.length || 0} modules in this class
            </p>
          )}
        </div>
        <Button onClick={() => setIsAddModuleDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Module
        </Button>
      </div>

      {loading ? (
        <CourseCardSkeleton />
      ) : !getmodules?.data || getmodules?.data?.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6 text-center">
            <Layers className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No modules created</h3>
            <p className="text-sm text-muted-foreground mb-4">
              This class doesn't have any modules yet. Add modules to organize your course content.
            </p>
            <Button onClick={() => setIsAddModuleDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Module
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {getmodules?.data?.map((module) => (
            <Card key={module.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{module.title}</CardTitle>
                    <CardDescription>{module.description}</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => {
                        setSelectedModuleId(module.id);
                        setIsViewModuleDialogOpen(true);
                      }}>
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => {
                        setSelectedModule(module);
                        setIsEditModuleDialogOpen(true);
                      }}>
                        Edit Module
                      </DropdownMenuItem>
                      <DropdownMenuItem>Reorder Module</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => {
                        setSelectedModuleId(module.id);
                        setSelectedModule(module);
                        setIsDeleteModuleDialogOpen(true);
                      }}>
                        Delete Module
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Topics</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedModuleId(module.id);
                      setIsAddTopicDialogOpen(true);
                    }}
                  >
                    <Plus className="mr-2 h-3 w-3" />
                    Add Topic
                  </Button>
                </div>
                <DisplayTopicDetails
                  setSelectedModuleId={setSelectedModuleId}
                  setIsAddTopicDialogOpen={setIsAddTopicDialogOpen}
                  setSelectedTopic={setSelectedTopic}
                  setIsDeleteTopicDialogOpen={setIsDeleteTopicDialogOpen}
                  classId={classId}
                  moduleId={module?.id}
                  setIsEditTopicDialogOpen={setIsEditTopicDialogOpen}
                  setSelectedTopicModuleId={setSelectedTopicModuleId}
                  selectedTopic={selectedTopic}
                  handleAddMaterial={handleAddMaterial}
                />
              </CardContent>
            </Card>
          ))}

          {getmodules?.meta && (
          <Pagination
            currentPage={currentPage} 
            totalPages={totalPages} 
            pageSize={getmodules.meta.per_page}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
          />
        )}
        </div>
      )}
    </TabsContent>
  );
};

export default ModulesTabContent;