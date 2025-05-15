"use client"
import { useGetAllClasscroomModulesTopic } from '@/hooks/query/classroom';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import { Plus, BookOpen, FileText, MoreHorizontal } from 'lucide-react';
import React, { Dispatch, SetStateAction, useState } from 'react'
import { Button } from "@/components/ui/button"
import { AddMaterialModal } from './add-material-modal';
import { ViewMaterialsModal } from './viewmaterialsmodal';
import CourseCardSkeleton from '@/app/(dashboard)/classes/[id]/loading';

interface TopicProps{
    setSelectedModuleId:Dispatch<SetStateAction<string | null | undefined>>,
    setIsAddTopicDialogOpen:Dispatch<SetStateAction<boolean>>,
    setSelectedTopic:Dispatch<any>,
    setIsDeleteTopicDialogOpen:Dispatch<SetStateAction<boolean>>,
    classId: string,
    moduleId:string,
    setSelectedTopicModuleId:Dispatch<SetStateAction<string | null | undefined>>,
    setIsEditTopicDialogOpen:Dispatch<SetStateAction<boolean>>,
    selectedTopic:any,
    handleAddMaterial:(material: any) => void
}
export default function DisplayTopicDetails(props: TopicProps) {
    const [isAddMaterialDialogOpen, setIsAddMaterialDialogOpen] = useState(false);
    const [isViewMaterialsDialogOpen, setIsViewMaterialsDialogOpen] = useState(false);
  
    const {
      setSelectedModuleId,
      setIsAddTopicDialogOpen,
      setSelectedTopic,
      setIsDeleteTopicDialogOpen,
      setSelectedTopicModuleId,
      setIsEditTopicDialogOpen,
      classId,
      moduleId,
      selectedTopic,
      handleAddMaterial,
    } = props;
  
    const { data: getmodulesTopic, loading } = useGetAllClasscroomModulesTopic(
      classId,
      moduleId
    );
  
    const topics = getmodulesTopic?.data || [];
  
    return (
      <div>
        {loading ? (
          <CourseCardSkeleton />
        ) : topics.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-4 text-center border rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">No topics in this module yet</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedModuleId(moduleId);
                setIsAddTopicDialogOpen(true);
              }}
            >
              <Plus className="mr-2 h-3 w-3" />
              Add Topic
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {topics.map((topic) => (
              <div
                key={topic.id}
                className="flex items-center justify-between p-3 bg-muted rounded-md"
              >
                <div className="flex items-center gap-2">
                  {topic.title === "lesson" ? (
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  )}
                  <div>
                    <p className="text-sm font-medium">{topic.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {topic.duration} min •{" "}
                      {topic.title.charAt(0).toUpperCase() + topic.title.slice(1)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedTopic(topic);
                      setIsViewMaterialsDialogOpen(true);
                    }}
                  >
                    View
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white p-3">
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedTopic(topic);
                          setSelectedTopicModuleId(moduleId);
                          setIsEditTopicDialogOpen(true);
                        }}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="pt-1"
                        onClick={() => {
                          setSelectedTopic(topic);
                          setIsAddMaterialDialogOpen(true);
                        }}
                      >
                        Add Material
                      </DropdownMenuItem>
                      <DropdownMenuItem className="pt-1">Reorder</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive pt-1"
                        onClick={() => {
                          setSelectedTopic(topic);
                          setSelectedTopicModuleId(moduleId);
                          setIsDeleteTopicDialogOpen(true);
                        }}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        )}
  
        <AddMaterialModal
          open={isAddMaterialDialogOpen}
          onOpenChange={setIsAddMaterialDialogOpen}
          onMaterialAdded={handleAddMaterial}
          classId={classId}
          topicId={selectedTopic?.id}
        />
  
        {selectedTopic && (
          <ViewMaterialsModal
            open={isViewMaterialsDialogOpen}
            onOpenChange={setIsViewMaterialsDialogOpen}
            classId={classId}
            topicId={selectedTopic?.id}
            setSelectedTopic={setSelectedTopic}
          />
        )}
      </div>
    );
  }
