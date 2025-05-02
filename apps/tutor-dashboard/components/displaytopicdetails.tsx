import { useGetAllClasscroomModulesTopic } from '@/hooks/query/classroom';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import { Plus, BookOpen, FileText, MoreHorizontal } from 'lucide-react';
import React, { Dispatch, SetStateAction } from 'react'
import { Button } from "@/components/ui/button"

interface TopicProps{
    setSelectedModuleId:Dispatch<SetStateAction<string | null | undefined>>,
    setIsAddTopicDialogOpen:Dispatch<SetStateAction<boolean>>,
    setSelectedTopic:Dispatch<any>,
    setIsDeleteTopicDialogOpen:Dispatch<SetStateAction<boolean>>,
    classId: string,
    moduleId:string,
    setSelectedTopicModuleId:Dispatch<SetStateAction<string | null | undefined>>,
    setIsEditTopicDialogOpen:Dispatch<SetStateAction<boolean>>,
}
export default function DisplayTopicDetails(props:TopicProps) {
    const {setSelectedModuleId, setIsAddTopicDialogOpen, 
        setSelectedTopic, setIsDeleteTopicDialogOpen, 
        setSelectedTopicModuleId, setIsEditTopicDialogOpen, classId, moduleId} = props
    const {data: getmodulesTopic } = useGetAllClasscroomModulesTopic(classId, moduleId );
    return (
        <div>
        {!getmodulesTopic?.data || getmodulesTopic?.data.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-4 text-center border rounded-lg">
        <p className="text-sm text-muted-foreground mb-2">No topics in this module yet</p>
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
        ) : (
        <div className="space-y-2">
        {getmodulesTopic?.data.map((topic) => (
        <div key={topic.id} className="flex items-center justify-between p-3 bg-muted rounded-md">
        <div className="flex items-center gap-2">
        {topic.title === "lesson" ? (
        <BookOpen className="h-4 w-4 text-muted-foreground" />
        ) : (
        <FileText className="h-4 w-4 text-muted-foreground" />
        )}
        <div>
        <p className="text-sm font-medium">{topic.title}</p>
        <p className="text-xs text-muted-foreground">
        {topic.duration} min • {topic.title.charAt(0).toUpperCase() + topic.title.slice(1)}
        </p>
        </div>
        </div>
        <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm">View</Button>
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
        <MoreHorizontal className="h-4 w-4" />
        </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => {
        setSelectedTopic(topic);
        setSelectedTopicModuleId(module.id);
        setIsEditTopicDialogOpen(true);
        }}>
        Edit
        </DropdownMenuItem>
        <DropdownMenuItem>Reorder</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
        className="text-destructive focus:text-destructive"
        onClick={() => {
        setSelectedTopic(topic);
        setSelectedTopicModuleId(module.id);
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
</div>
)
}
