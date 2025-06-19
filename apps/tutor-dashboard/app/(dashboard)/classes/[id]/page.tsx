    "use client"
    import {  useEffect, useState } from "react"
    import Link from "next/link"
    import { ArrowLeft, Calendar, Clock, Edit, MoreHorizontal, Plus, Trash, Users, Layers } from "lucide-react"
    import { Button } from "@/components/ui/button"
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
    import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
    import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    } from "@/components/ui/dropdown-menu"
    import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    } from "@/components/ui/dialog"
    import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
    import { AddStudentModal } from "@/components/add-student-modal"
    import { StudentProgressModal } from "@/components/student-progress-modal"
    import { Badge } from "@/components/ui/badge"
    import { toast } from "@/components/ui/use-toast"
    import { ToastAction } from "@/components/ui/toast"
    import { AddMaterialModal } from "@/components/add-material-modal"
    import { EditClassModal } from "@/components/edit-class-modal"
    import { AddModuleModal } from "@/components/add-module-modal"
    import { EditModuleModal } from "@/components/edit-module-modal"
    import { AddTopicModal } from "@/components/add-topic-modal"
    import { EditTopicModal } from "@/components/edit-topic-modal"
    import {
    useGetAllClasscroomModules,
    useGetAllClassroomAssignments,
    useGetAllClassroomMaterials,
    useGetSingleClassroom,
    } from "@/hooks/query/classroom"
    import { useRouter } from "next/navigation"
    import { useParams } from "next/navigation"
    import type { IclassRoomMaterials, IclassRoomModules, IsingleClassroomDetails, Itopic, LocalClassData, Module } from "@/lib/types/classroom"
    import DisplayTopicDetails from "@/components/displaytopicdetails"
    import { ViewSingleModuleModal } from "@/components/viewsinglemodule"
    import CourseCardSkeleton from "./loading"
    import { Skeleton } from "@/components/ui/skeleton"
    import { useDeleteClassroom, useDeleteClassroomModule } from "@/hooks/mutate/classroom"
    import DeleteClassRoomModal from "@/components/delete-class-modal"
    import DeleteClassRoomModuleModal from "@/components/delete-module-modal"
    import ViewClassRoomMaterials from "@/components/viewclassroommaterials"
    import { AddAssignmentModal } from "@/components/add-assignments-modal"
    import ViewAssignments from "@/components/viewsassignments"
    import { IAPIFilter } from "@/lib/types/query"
    import ModulesTabContent from "@/components/ModulesTabContent"

    const createDefaultClassData = (apiData: IsingleClassroomDetails): LocalClassData => {
    return {
    id: apiData?.id,
    name: apiData?.name,
    description: apiData?.description,
    section: apiData?.section,
    currentStudents: apiData?.students_count,
    startDate: apiData?.start_date,
    endDate: apiData?.end_date,
    schedule: {
    daysOfWeek: apiData?.schedules?.days_of_week,
    startTime: apiData?.schedules?.start_time,
    endTime: apiData?.schedules?.end_time,
    },
    status: apiData?.status === "active" ? "active" : "inactive",
    tutorId: apiData?.created_by,
    students: apiData?.students || [],
    materials: [],
    assignments: [],
    modules: [],
    }
    }
    export default function ClassDetailsPage() {
    const router = useRouter()
    const params = useParams()
    const classId = params?.id as string
    const { data: classData, loading } = useGetSingleClassroom(classId)
    // let loading = true
    const [localClassData, setLocalClassData] = useState<LocalClassData | null>(null)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [isAddStudentDialogOpen, setIsAddStudentDialogOpen] = useState(false)

    const [isAddAssignmentDialogOpen, setIsAddAssignmentDialogOpen] = useState(false)
    const [studentToRemove, setStudentToRemove] = useState<string | null>(null)
    const [isRemoveStudentDialogOpen, setIsRemoveStudentDialogOpen] = useState(false)
    const [selectedStudent, setSelectedStudent] = useState<any | null>(null)
    const [isProgressModalOpen, setIsProgressModalOpen] = useState(false)
    const [isEditClassDialogOpen, setIsEditClassDialogOpen] = useState(false)
    const [isAddModuleDialogOpen, setIsAddModuleDialogOpen] = useState(false)
    const [isViewModuleDialogOpen, setIsViewModuleDialogOpen] = useState(false)
    const [selectedModuleId, setSelectedModuleId] = useState<string | null | undefined>(null)
    const [isEditModuleDialogOpen, setIsEditModuleDialogOpen] = useState(false)
    const [isDeleteModuleDialogOpen, setIsDeleteModuleDialogOpen] = useState(false)
    const [isAddTopicDialogOpen, setIsAddTopicDialogOpen] = useState(false)
    const [selectedModule, setSelectedModule] = useState<any | null>(null)
    const [isEditTopicDialogOpen, setIsEditTopicDialogOpen] = useState(false)
    const [isDeleteTopicDialogOpen, setIsDeleteTopicDialogOpen] = useState(false)
    const [selectedTopic, setSelectedTopic] = useState<any | null>(null)
    const [isDeleting, setIsDeleting] = useState(false);

    const { mutate: deleteSingleClassroom, isLoading } = useDeleteClassroom({
    onSuccess: () => {
      toast({
        title: "Classroom deleted",
        description: "The Classroom has been successfully deleted.",
        variant: "destructive",
      });
      setIsDeleteDialogOpen(false);
      router.push("/classes");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "An error occurred while deleting the classroom.",
        variant: "destructive",
      });
    },
    classroomId: classId
    });
    const moduleId = params.selectedModuleId as string
    const [selectedTopicModuleId, setSelectedTopicModuleId] = useState<string | null | undefined>(null)
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const { 
    data: getmodules, 
    current_page, 
    totalPages,
    hasNextPage,
    hasPrevPage,
    } = useGetAllClasscroomModules(classId, page, pageSize);

    const handlePageChange = (newPage: number) => {
    setPage(newPage);
    };

    const handlePageSizeChange = (newPage: number, newSize: number) => {
    setPageSize(newSize);
    setPage(newPage);
    };


    //  const { 
    //     data: getmodules, 
    //     error, 
    //     refetch 
    //   } = useGetAllClasscroomModules(classId, page, pageSize);
    //   console.log(getmodules)

    const { mutateAsync: deleteClassroomModule, isLoading: isDeletingModule } = useDeleteClassroomModule({
  onSuccess: () => {
    toast({
      title: "Module deleted",
      description: "The module has been successfully deleted.",
      variant: "destructive",
    });
  },
  onError: () => {
    toast({
      title: "Error",
      description: "An error occurred while deleting the module.",
      variant: "destructive",
    });
  },
  classroomId: classId,
  moduleId: moduleId
});

    // const { mutate: deleteClassroomModule, isLoading:loaded } = useDeleteClassroomModule({
    // onSuccess: () => {
    // toast({
    //   title: "Module deleted",
    //   description: "The module has been successfully deleted.",
    //   variant: "destructive",
    // });
    // },
    // onError: () => {
    // toast({
    //   title: "Error",
    //   description: "An error occurred while deleting the module.",
    //   variant: "destructive",
    // });
    // },
    // classroomId: classId,
    // moduleId: moduleId 
    // });
    useEffect(() => {
    if (classData) {
    const defaultData = createDefaultClassData(classData)
    setLocalClassData(defaultData)
    }
    }, [classData])
    useEffect(() => {
    if (getmodules?.data && localClassData) {
    setLocalClassData((prevData) => {
      if (!prevData) return null
      return {
        ...prevData,
        modules: getmodules.data,
      }
    })
    }
    }, [getmodules?.data])

    // useEffect(() => {
    //   if (getmodules?.data) {
    //     setLocalClassData({
    //       modules: getmodules.data,
    //     });
    //   }
    // }, [getmodules]);

    // // Add a useEffect to update localClassData when classData changes
    // useEffect(() => {
    //   if (classData) {
    //     // If classData doesn't have modules, add an empty array
    //     const updatedClassData = {
    //       ...classData,
    //       modules: classData?.modules || [],
    //       assignments:
    //         classData.assignments?.map((assignment: { submissions: any; }) => ({
    //           ...assignment,
    //           submissions: assignment.submissions || [],
    //         })) || [],
    //       materials: classData.materials || [],
    //     };
    //     // Type assertion to match the expected type
    //     setLocalClassData(updatedClassData as typeof initialClassData);
    //   }
    // }, [classData]);
    ;
    const handleAddStudent = (student: any) => {
    // console.log(st)
    // Check if student is already in the class
    const isStudentAlreadyEnrolled = localClassData?.students.some((s) => s.id === student.id)
    if (isStudentAlreadyEnrolled) {
    toast({
      title: "Student already enrolled",
      description: `${student.fullname} is already enrolled in this class.`,
      variant: "destructive",
    })
    return
    }
    // Add student to the class
    if (!localClassData) return
    const updatedClassData = {
    ...localClassData,
    students: [...localClassData.students, student],
    currentStudents: localClassData.currentStudents + 1,
    }
    setLocalClassData(updatedClassData)
    toast({
    title: "Student added",
    description: `${student.fullname} has been added to ${localClassData.name}.`,
    })
    }
    const handleRemoveStudent = (studentId: string) => {
    setStudentToRemove(studentId)
    setIsRemoveStudentDialogOpen(true)
    }
    const confirmRemoveStudent = () => {
    if (!studentToRemove || !localClassData) return
    const studentToRemoveData = localClassData.students.find((s) => s.id === studentToRemove)
    const updatedStudents = localClassData.students.filter((s) => s.id !== studentToRemove)
    const updatedClassData = {
    ...localClassData,
    students: updatedStudents,
    currentStudents: localClassData.currentStudents - 1,
    }
    setLocalClassData(updatedClassData)
    setIsRemoveStudentDialogOpen(false)
    setStudentToRemove(null)
    toast({
    title: "Student removed",
    description: `${studentToRemoveData?.name} has been removed from ${localClassData.name}.`,
    action: studentToRemoveData && (
      <ToastAction altText="Undo" onClick={() => handleAddStudent(studentToRemoveData)}>
        Undo
      </ToastAction>
    ),
    })
    }
    const handleViewProgress = (student: any) => {
    setSelectedStudent(student)
    setIsProgressModalOpen(true)
    }
    const handleAddMaterial = (material: IclassRoomMaterials) => {
    // Add material to the class
    if (!localClassData) return
    const updatedClassData = {
    ...localClassData,
    materials: [...localClassData.materials, material],
    }
    setLocalClassData(updatedClassData)
    toast({
    title: "Material added",
    description: `${material.title} has been added to ${localClassData.name}.`,
    })
    }

    // Add a handler function for adding a module
    // Fix for the handleAddModule function
    const handleAddModule = (module: IclassRoomModules) => {
    if (!localClassData) return;
    console.log("Received module in handleAddModule:", module);
    let moduleTitle;
    if (typeof module === 'object' && module !== null) {
    moduleTitle = module.title || 
              (module.title && module.title) || 
              (module.title && module.title) || 
              "New module";
    } else {
    moduleTitle = "New module";
    }

    const updatedClassData = {
    ...localClassData,
    modules: [...localClassData.modules, module],
    };

    setLocalClassData(updatedClassData);

    toast({
    title: "Module added",
    description: `${moduleTitle} has been added to ${updatedClassData.name || "your class"}.`,
    });
    }

    // Add a handler function for editing a module
    const handleEditModule = (updatedModule: any) => {
    // Update the module in the class
    if (!localClassData) return
    const updatedModules = localClassData.modules.map((module) => {
    if (module.id === updatedModule.id) {
      return updatedModule
    }
    return module
    })
    const updatedClassData = {
    ...localClassData,
    modules: updatedModules,
    }
    setLocalClassData(updatedClassData)
    toast({
    title: "Module updated",
    description: `${updatedModule.title} has been updated successfully.`,
    })
    }

    // Add a handler function for deleting a module
    const handleDeleteModule = async () => {
  if (!selectedModuleId || !localClassData) return;
  
  try {
    await deleteClassroomModule({ 
      classroomId: classId, 
      moduleId: selectedModuleId 
    });
    
    const updatedModules = localClassData.modules.filter(
      (module) => module.id !== selectedModuleId
    );
    
    setLocalClassData({
      ...localClassData,
      modules: updatedModules,
    });
    
    setSelectedModuleId(null);
    setSelectedModule(null);
  } catch (error) {
    // Error is handled by the mutation's onError
  }
  finally{
  setIsDeleteModuleDialogOpen(false)
  }
};
    // const handleDeleteModule = async () => {
    // if (!selectedModuleId || !localClassData) return;
    // setIsDeleting(true);
    // try {
    // await deleteClassroomModule({ classroomId: classId, moduleId: selectedModuleId });
    // const updatedModules = localClassData.modules.filter((module) => module.id !== selectedModuleId);
    // const moduleToDelete = localClassData.modules.find((module) => module.id === selectedModuleId);
    // const updatedClassData = {
    //   ...localClassData,
    //   modules: updatedModules,
    // };
    // setLocalClassData(updatedClassData);
    // setIsDeleteModuleDialogOpen(false);
    // setSelectedModuleId(null);
    // setSelectedModule(null);
    // } catch (error) {
    // } 
    // // finally {
    // // setIsDeleting(false);
    // // }
    // };

    // Add a handler function for adding a topic to a module
    const handleAddTopic = (topic: Itopic) => {
    console.log("Received topic:", topic);
    if (!selectedModuleId || !localClassData) return;
    const updatedModules = localClassData.modules.map((module) => {
      if (module.id === selectedModuleId) {
        return {
          ...module,
          topics: [...(module?.topics || []), topic],
        }
      }
      return module
    })
    const updatedClassData = {
      ...localClassData,
      modules: updatedModules,
    }
    setLocalClassData(updatedClassData)
    toast({
      title: "Topic added",
      description: `${topic.title} has been added to the module`,
    })
    }

    // Add these handler functions after the other handler functions
    // Add a handler function for editing a topic
    const handleEditTopic = (updatedTopic: any) => {
    if (!selectedTopicModuleId) return
    // Update the topic in the module
    if (!localClassData) return
    const updatedModules = localClassData.modules.map((module) => {
    if (module.id === selectedTopicModuleId) {
      return {
        ...module,
        topics: module.topics?.map((topic) => {
          if (topic.id === updatedTopic.id) {
            return updatedTopic
          }
          return topic
        }),
      }
    }
    return module
    })

    const updatedClassData = {
    ...localClassData,
    modules: updatedModules,
    }
    setLocalClassData(updatedClassData)
    toast({
    title: "Topic updated",
    description: `${updatedTopic.title} has been updated successfully.`,
    })
    }

    // Add a handler function for deleting a topic
    const handleDeleteTopic = () => {
    if (!selectedTopicModuleId || !selectedTopic) return
    // Find the module and remove the topic
    if (!localClassData) return
    const updatedModules = localClassData.modules.map((module) => {
    if (module.id === selectedTopicModuleId) {
      return {
        ...module,
        topics: module.topics?.filter((topic) => topic.id !== selectedTopic.id) || [],
      }
    }
    return module
    })
    const updatedClassData = {
    ...localClassData,
    modules: updatedModules,
    }
    setLocalClassData(updatedClassData)
    setIsDeleteTopicDialogOpen(false)
    setSelectedTopic(null)
    setSelectedTopicModuleId(null)
    toast({
    title: "Topic deleted",
    description: `${selectedTopic.title} has been deleted successfully.`,
    })
    }

    // Add a handler function for updating the class
    // // Update the handleUpdateClass function to use the updateClassData method
    const handleUpdateClass = async (updatedClass: any) => {}
    //   try {
    //     await updateClassData(updatedClass);

    //     toast({
    //       title: "Class updated",
    //       description: `${updatedClass.name} has been updated successfully.`,
    //     });
    //   } catch (error) {
    //     toast({
    //       title: "Error",
    //       description: "Failed to update class. Please try again.",
    //       variant: "destructive",
    //     });
    //   }
    // };

    // // Add a loading state
    // if (isLoading) {
    //   return (
    //     <div className="flex flex-col items-center justify-center min-h-[60vh]">
    //       <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
    //       <p className="text-muted-foreground">Loading class data...</p>
    //     </div>
    //   );
    // }

    // // Add an error state
    // if (error) {
    //   return (
    //     <div className="flex flex-col items-center justify-center min-h-[60vh]">
    //       <AlertTriangle className="h-8 w-8 text-destructive mb-4" />
    //       <p className="text-muted-foreground">
    //         Failed to load class data. Please try again.
    //       </p>
    //       <Button onClick={refreshClass} className="mt-4">
    //         Retry
    //       </Button>
    //     </div>
    //   );
    // }


    // handle add assignments
    const handleAddAssignment = (assignment: any) => {
    if (!localClassData) return;

    const updatedClassData = {
    ...localClassData,
    assignments: [...localClassData.assignments, assignment],
    };

    setLocalClassData(updatedClassData);

    toast({
    title: "Assignment added",
    description: `${assignment.title} has been added to ${localClassData.name}.`,
    });
    };
    return (
    <div className="flex flex-col gap-4">
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon" asChild>
        <Link href="/classes">
          <ArrowLeft className="h-4 w-4" />
        </Link>
      </Button>
      <div className="flex-1">
      {loading ?(
              <Skeleton className="h-4 w-44" />
            ): (
        <h1 className="text-3xl font-bold tracking-tight">
          {localClassData?.name }
        </h1>
            )}
        <p className="text-muted-foreground">{localClassData?.section}</p>
      </div>
      <div className="flex items-center gap-2">
        {/* Update the Edit Class button to open the modal */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit Class
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setIsEditClassDialogOpen(true)}>Quick Edit</DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/classes/${classId}/edit`}>Full Edit</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Duplicate Class</DropdownMenuItem>
            <DropdownMenuItem>Export Data</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              Delete Class
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>

    <div className="grid gap-4 md:grid-cols-7">
      <div className="space-y-4 md:col-span-5">
        {loading ? (
          <CourseCardSkeleton />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>{classData?.name}</CardTitle>
              {/* <CardTitle>Class Details</CardTitle> */}
              <CardDescription>View and manage class information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Description</h3>
                  <p className="text-sm text-muted-foreground mt-1">{classData?.description}</p>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <h3 className="font-medium flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      Schedule
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {localClassData?.schedule?.daysOfWeek?.join(", ") ?? "No days selected"}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      Time
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {localClassData?.schedule.startTime} - {localClassData?.schedule.endTime}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium flex items-center">
                      <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                      Students
                    </h3>
                    {/* <p className="text-sm text-muted-foreground mt-1">
                    {localClassData.currentStudents} /{" "}
                    {localClassData.maxStudents}
                  </p> */}
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="font-medium">Start Date</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {localClassData?.startDate
                        ? new Date(localClassData.startDate).toLocaleDateString()
                        : "No start date"}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium">End Date</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {localClassData?.startDate
                        ? new Date(localClassData.startDate).toLocaleDateString()
                        : "No start date"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        <Tabs defaultValue="modules" className="space-y-4">
          <TabsList>
            <TabsTrigger value="modules">Modules</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="materials">Materials</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
          </TabsList>
          {/* Modules Tab Content */}
          <ModulesTabContent
            getmodules={getmodules}
            loading={loading}
            classId={classId}
            selectedTopic={selectedTopic}
            currentPage={current_page}
            totalPages={totalPages}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
            handlePageChange={handlePageChange}
            handlePageSizeChange={handlePageSizeChange}
            handleAddMaterial={handleAddMaterial}
            setIsAddModuleDialogOpen={setIsAddModuleDialogOpen}
            setIsEditModuleDialogOpen={setIsEditModuleDialogOpen}
            setIsViewModuleDialogOpen={setIsViewModuleDialogOpen}
            setIsDeleteModuleDialogOpen={setIsDeleteModuleDialogOpen}
            setIsAddTopicDialogOpen={setIsAddTopicDialogOpen}
            setIsEditTopicDialogOpen={setIsEditTopicDialogOpen}
            setIsDeleteTopicDialogOpen={setIsDeleteTopicDialogOpen}
            setSelectedModule={setSelectedModule}
            setSelectedModuleId={setSelectedModuleId}
            setSelectedTopic={setSelectedTopic}
            setSelectedTopicModuleId={setSelectedTopicModuleId}
          />
          <TabsContent value="students" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Students</h2>
                <p className="text-sm text-muted-foreground">
                  {localClassData?.students.length} of students enrolled
                </p>
              </div>
              <Button onClick={() => setIsAddStudentDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Student
              </Button>
            </div>
            {localClassData?.students.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <Users className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No students enrolled</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    This class doesn't have any students yet. Add students to get started.
                  </p>
                  <Button onClick={() => setIsAddStudentDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Student
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {localClassData?.students.map((student) => (
                      <div key={student.id} className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                            <AvatarFallback>{student?.name ? student.name.charAt(0) : "?"}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-muted-foreground">{student.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="ml-2">
                            Enrolled: {new Date(student.enrollmentDate).toLocaleDateString()}
                          </Badge>
                          <Button variant="outline" size="sm" onClick={() => handleViewProgress(student)}>
                            View Progress
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewProgress(student)}>
                                View Progress
                              </DropdownMenuItem>
                              <DropdownMenuItem>Send Message</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-destructive focus:text-destructive"
                                onClick={() => handleRemoveStudent(student.id)}
                              >
                                Remove from Class
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
                      {/* add materials */}
          <TabsContent value="materials" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Materials</h2>
            </div>
              <ViewClassRoomMaterials classId={classId} />
          </TabsContent>
          {/*add  assignments */}
          <TabsContent value="assignments" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Assignments</h2>
              <Button onClick={() => setIsAddAssignmentDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Assignment
              </Button>
            </div>
            <ViewAssignments
            classId={classId} />
            
          </TabsContent>
        </Tabs>
      </div>
      <div className="space-y-4 md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Class Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status</span>
                <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-2 py-1 rounded-full text-xs">
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Students</span>
                <span className="text-sm">{localClassData?.students.length} </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Materials</span>
                <span className="text-sm">{localClassData?.materials.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Assignments</span>
                <span className="text-sm">{localClassData?.assignments.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Modules</span>
                <span className="text-sm">{localClassData?.modules?.length || 0}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg border">
                  <div className="flex-shrink-0 w-12 h-12 flex flex-col items-center justify-center rounded-md bg-primary/10 text-primary">
                    <span className="text-xs font-medium">SEP</span>
                    <span className="text-lg font-bold">{i + 10}</span>
                  </div>
                  <div>
                    <p className="font-medium">Session {i}</p>
                    <p className="text-xs text-muted-foreground">
                      {localClassData?.schedule.startTime} - {localClassData?.schedule.endTime}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    {/* add assignments modal */}
    <AddAssignmentModal
    open={isAddAssignmentDialogOpen}
    onOpenChange={setIsAddAssignmentDialogOpen}
    onAssignmentAdded={handleAddAssignment}
    classId={classId} 
    />

    {/* Delete Class Dialog */}
    <DeleteClassRoomModal
      open={isDeleteDialogOpen}
      onOpenChange={setIsDeleteDialogOpen}
      onDelete={() => deleteSingleClassroom(classId)}
      isLoading={isLoading}
    />
    {/* Delete Module Dialog */}
    <DeleteClassRoomModuleModal
      open={isDeleteModuleDialogOpen}
      onOpenChange={setIsDeleteModuleDialogOpen}
      onDelete={handleDeleteModule}
      isLoading={isDeletingModule}
    />
    {/* Add Student Modal */}
    <AddStudentModal
      open={isAddStudentDialogOpen}
      onOpenChange={setIsAddStudentDialogOpen}
      onStudentAdded={handleAddStudent}
      classId={classId}
    />
    {/* Remove Student Dialog */}
    <Dialog open={isRemoveStudentDialogOpen} onOpenChange={setIsRemoveStudentDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remove Student</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove this student from the class? They will lose access to all class materials
            and assignments.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsRemoveStudentDialogOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={confirmRemoveStudent}>
            <Trash className="mr-2 h-4 w-4" />
            Remove Student
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    {/* Student Progress Modal */}
    {selectedStudent && (
      <StudentProgressModal
        open={isProgressModalOpen}
        onOpenChange={setIsProgressModalOpen}
        student={selectedStudent}
        classData={localClassData}
      />
    )}
    {/* Add Material Modal */}
    {/* <AddMaterialModal
      open={isAddMaterialDialogOpen}
      onOpenChange={setIsAddMaterialDialogOpen}
      onMaterialAdded={handleAddMaterial}
      classId={classId}
      topicId={selectedTopic}
    /> */}
    {/* Edit Class Modal */}
    <EditClassModal
      open={isEditClassDialogOpen}
      onOpenChange={setIsEditClassDialogOpen}
      onClassUpdated={handleUpdateClass}
      classData={{
        ...localClassData,
        status: localClassData?.status as "active" | "inactive" | "completed",
      }}
    />
    {/* Add Module Modal */}
    <AddModuleModal
      open={isAddModuleDialogOpen}
      onOpenChange={setIsAddModuleDialogOpen}
      onModuleAdded={handleAddModule}
      classId={classId}
    />
    {/* Edit Module Modal */}
    <EditModuleModal
      open={isEditModuleDialogOpen}
      onOpenChange={setIsEditModuleDialogOpen}
      onModuleUpdated={handleEditModule}
      module={selectedModule}
    />
    {/* Add Topic Modal */}
    <AddTopicModal
      open={isAddTopicDialogOpen}
      onOpenChange={setIsAddTopicDialogOpen}
      onTopicAdded={handleAddTopic}
      moduleId={selectedModuleId}
      classroomId={classId}
    />
    {/* Delete Topic Dialog */}
    <Dialog open={isDeleteTopicDialogOpen} onOpenChange={setIsDeleteTopicDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Topic</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this topic? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsDeleteTopicDialogOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDeleteTopic}>
            <Trash className="mr-2 h-4 w-4" />
            Delete Topic
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    {/* Edit Topic Modal */}
    <EditTopicModal
      open={isEditTopicDialogOpen}
      onOpenChange={setIsEditTopicDialogOpen}
      onTopicUpdated={handleEditTopic}
      topic={selectedTopic}
      moduleId={selectedTopicModuleId}
    />
    {/* view single module modal */}
    {selectedModuleId && (
      <ViewSingleModuleModal
        open={isViewModuleDialogOpen}
        onOpenChange={setIsViewModuleDialogOpen}
        classroomId={classId}
        moduleId={selectedModuleId}
      />
    )}
    </div>
    )
    }