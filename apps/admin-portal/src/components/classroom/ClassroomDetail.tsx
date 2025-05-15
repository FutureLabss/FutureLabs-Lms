import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Users, BookOpen, FileText, ClipboardList, BarChart2, Megaphone, Settings } from "lucide-react";
import StudentsTab from "@/components/classrooms/tabs/StudentsTab";
import ModulesTab from "@/components/classrooms/tabs/ModulesTab";
import MaterialsTab from "@/components/classrooms/tabs/MaterialsTab";
import AssignmentsTab from "@/components/classrooms/tabs/AssignmentsTab";
import StudentProgressTab from "@/components/classrooms/tabs/StudentProgressTab";
import AnnouncementsTab from "@/components/classrooms/tabs/AnnouncementsTab";
import { useToast } from "@/components/ui/use-toast";
import { Classroom, ClassroomStatus, Tutor } from "@/types/classroom";
import { Avatar } from "@/components/ui/avatar";

interface ClassroomDetailProps {
  id?: string;
}

const ClassroomDetail: React.FC<ClassroomDetailProps> = ({ id }) => {
  const params = useParams();
  const classroomId = id || params?.id as string || "";
  const router = useRouter();
  const { toast } = useToast();
  const [isCompleted, setIsCompleted] = useState(false);

  // Mock classroom data with tutors - would be fetched from API
  const classroom = {
    id: classroomId,
    name: "UI Design Fundamentals",
    program: "UX/UI Design",
    course: "Design Basics",
    description: "A comprehensive introduction to UI design principles and practices.",
    studentCount: 24,
    moduleCount: 6,
    status: "active" as ClassroomStatus,
    startDate: "2023-08-15",
    endDate: "2023-12-15",
    tutors: [
      {
        id: "t1",
        name: "Thomas Anderson",
        email: "thomas.anderson@example.com",
        role: "Lead Tutor",
        profileImage: "https://i.pravatar.cc/150?img=33"
      },
      {
        id: "t2",
        name: "Lisa Wong",
        email: "lisa.wong@example.com",
        role: "Assistant Tutor",
        profileImage: "https://i.pravatar.cc/150?img=47"
      }
    ]
  };

  const handleStatusChange = (checked: boolean) => {
    setIsCompleted(checked);
    
    toast({
      title: checked ? "Classroom marked as completed" : "Classroom marked as active",
      description: `${classroom.name} has been updated.`,
    });
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center mb-6 space-x-2">
        <Button
          variant="ghost"
          size="sm"
          className="pl-0"
          onClick={() => router.push("/classrooms")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Classrooms
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl">{classroom.name}</CardTitle>
            <div className="text-sm text-muted-foreground mt-1">
              {classroom.program} • {classroom.course}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              onClick={() => router.push(`/classroom-management/${classroom.id}`)}
            >
              <Settings className="mr-2 h-4 w-4" />
              Manage Classroom
            </Button>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground mr-2">
                {isCompleted ? "Completed" : "Active"}
              </span>
              <Switch
                checked={isCompleted}
                onCheckedChange={handleStatusChange}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{classroom.description}</p>
          <div className="mt-4 flex items-center space-x-4">
            <div className="flex items-center">
              <Users className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{classroom.studentCount} Students</span>
            </div>
            <div className="flex items-center">
              <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{classroom.moduleCount} Modules</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="students" className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="students">
            <Users className="mr-2 h-4 w-4" />
            Students
          </TabsTrigger>
          <TabsTrigger value="modules">
            <BookOpen className="mr-2 h-4 w-4" />
            Modules
          </TabsTrigger>
          <TabsTrigger value="materials">
            <FileText className="mr-2 h-4 w-4" />
            Materials
          </TabsTrigger>
          <TabsTrigger value="assignments">
            <ClipboardList className="mr-2 h-4 w-4" />
            Assignments
          </TabsTrigger>
          <TabsTrigger value="progress">
            <BarChart2 className="mr-2 h-4 w-4" />
            Progress
          </TabsTrigger>
          <TabsTrigger value="announcements">
            <Megaphone className="mr-2 h-4 w-4" />
            Announcements
          </TabsTrigger>
        </TabsList>

        <TabsContent value="students">
          <StudentsTab classroomId={classroomId} />
        </TabsContent>
        <TabsContent value="modules">
          <ModulesTab classroomId={classroomId} />
        </TabsContent>
        <TabsContent value="materials">
          <MaterialsTab classroomId={classroomId} />
        </TabsContent>
        <TabsContent value="assignments">
          <AssignmentsTab classroomId={classroomId} />
        </TabsContent>
        <TabsContent value="progress">
          <StudentProgressTab classroomId={classroomId} />
        </TabsContent>
        <TabsContent value="announcements">
          <AnnouncementsTab classroomId={classroomId} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClassroomDetail;
