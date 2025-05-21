"use client";

import { useState } from "react";
import {
  Book,
  Calendar,
  FileText,
  Folder,
  
  Users,
} from "lucide-react";
import Link from "next/link";

import { Badge } from "@/shared/components/ui/badge";
// import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";
import { Toaster } from "@/shared/components/ui/toaster";
// import { AssignmentSubmissionDialog } from "@/shared/components/assignment-submission-dialog";
// import { MaterialDownload } from "@/shared/components/material-download";
import UserLayout, { layoutInterface } from "@/shared/layouts/userLayout";
import { useGetSingleClassroom } from "@/shared/hooks/query/classroom/getSingleClassroom";
import { useParams } from "next/navigation";
import { useGetClassroomModules } from "@/shared/hooks/query/classroom/getClassroomModules";
import Button from "@/shared/components/common/Button";
import Modal from "@/shared/components/common/modal/modal";
import {
  useGetAllClassroomMaterials,
  useGetAllModuleTopics,
} from "@/shared/hooks/query/classroom/moduleTopicQuery";
import { ClassModulesApiResponse } from "@/core/types/interface/classroom.ts/getClassroomModule";
import {
  MaterialResponse,
  TopicsListResponse,
} from "@/core/types/interface/classroom.ts/moduleTopics";
import { MaterialDownload } from "@/shared/components/material-download";
import { Student, Tutor } from "@/core/types/interface/classroom.ts/getSingleClassroom";
import ModuleSkeletonLoader from "./moduleskeleton";
// import Loader from "@/shared/components/common/loader";
// import axios from "axios";
// import { ClassModulesApiResponse } from "@/core/types/interface/classroom.ts/getClassroomModule";
// import { SingleClassroomResponse } from "@/core/types/interface/classroom.ts/getSingleClassroom";
// import { useGetSingleModuleTopic } from "@/shared/hooks/query/classroom/moduleTopicQuery";

// Mock classroom data
// const classroom = {
//   message: "Classroom retrieved successfully",
//   id: 8,
//   name: "Basic of Data Analytics",
//   description:
//     "Learn the fundamentals of data analytics including data collection, processing, analysis, and visualization techniques.",
//   image_url: null,
//   image_public_id: null,
//   section: null,
//   status: "active",
//   start_date: "2025-04-22",
//   end_date: "2025-04-23",
//   created_by: 4,
//   updated_by: null,
//   course_id: 1,
//   created_at: "2025-04-21T14:38:39.000000Z",
//   updated_at: "2025-04-21T14:38:39.000000Z",
//   students_count: 1,
//   modules_count: 3,
//   tutors: [
//     {
//       id: 4,
//       fullname: "Ukpono Titus",
//       email: "ukponoFL@gmail.com",
//     },
//   ],
//   students: [
//     {
//       id: 13,
//       fullname: "Peter Ime",
//       email: "reniy89307@f5url.com",
//     },
//   ],
//   schedules: {
//     id: 8,
//     days_of_week: ["Monday"],
//     start_date: "2025-04-22",
//     end_date: "2025-04-23",
//     start_time: "16:38:00",
//     end_time: "18:38:00",
//     status: "active",
//     classroom_id: 8,
//     created_at: "2025-04-21T14:38:40.000000Z",
//     updated_at: "2025-04-21T14:38:40.000000Z",
//   },
// };

// Mock modules data
// const modules = [
//   {
//     id: 1,
//     title: "Introduction to Data Analytics",
//     description: "Overview of data analytics concepts and tools",
//     topics: [
//       { id: 1, title: "What is Data Analytics?", duration: "45 mins" },
//       { id: 2, title: "Data Collection Methods", duration: "60 mins" },
//       { id: 3, title: "Data Processing Techniques", duration: "90 mins" },
//     ],
//   },
//   {
//     id: 2,
//     title: "Data Visualization",
//     description: "Learn how to create effective data visualizations",
//     topics: [
//       { id: 4, title: "Visualization Principles", duration: "60 mins" },
//       { id: 5, title: "Chart Types and Their Uses", duration: "75 mins" },
//       { id: 6, title: "Creating Interactive Dashboards", duration: "120 mins" },
//     ],
//   },
//   {
//     id: 3,
//     title: "Data Analysis Tools",
//     description: "Explore popular tools used in data analysis",
//     topics: [
//       {
//         id: 7,
//         title: "Introduction to Excel for Data Analysis",
//         duration: "90 mins",
//       },
//       { id: 8, title: "SQL for Data Analysts", duration: "120 mins" },
//       { id: 9, title: "Python Basics for Data Analysis", duration: "150 mins" },
//     ],
//   },
// ];

// Mock assignments data
// const assignments = [
//   {
//     id: 1,
//     title: "Data Collection Exercise",
//     description: "Collect and organize data from provided sources",
//     instructions:
//       "1. Download the sample data files from the materials section.\n2. Organize the data into appropriate categories.\n3. Create a spreadsheet with the organized data.\n4. Write a brief summary of your findings (250-500 words).",
//     due_date: "2025-04-25",
//     status: "pending",
//     points: 20,
//   },
//   {
//     id: 2,
//     title: "Visualization Project",
//     description:
//       "Create three different visualizations from the provided dataset",
//     instructions:
//       "1. Use the dataset provided in the materials section.\n2. Create three different types of visualizations (bar chart, line chart, pie chart, etc.).\n3. Each visualization should highlight a different aspect of the data.\n4. Include a brief explanation for each visualization explaining what insights it provides.",
//     due_date: "2025-04-28",
//     status: "pending",
//     points: 30,
//   },
//   {
//     id: 3,
//     title: "Data Analysis Report",
//     description: "Analyze the given dataset and write a comprehensive report",
//     instructions:
//       "1. Perform exploratory data analysis on the provided dataset.\n2. Identify key trends, patterns, and outliers.\n3. Create appropriate visualizations to support your findings.\n4. Write a comprehensive report (1000-1500 words) detailing your analysis process and findings.",
//     due_date: "2025-05-02",
//     status: "pending",
//     points: 50,
//   },
// ];

// Mock materials data
// const materials = [
//   {
//     id: 1,
//     title: "Data Analytics Fundamentals.pdf",
//     type: "pdf",
//     size: "2.4 MB",
//     uploaded_at: "2025-04-21",
//   },
//   {
//     id: 2,
//     title: "Sample Dataset.xlsx",
//     type: "excel",
//     size: "1.8 MB",
//     uploaded_at: "2025-04-21",
//   },
//   {
//     id: 3,
//     title: "Visualization Best Practices.pptx",
//     type: "powerpoint",
//     size: "5.2 MB",
//     uploaded_at: "2025-04-22",
//   },
//   {
//     id: 4,
//     title: "Python for Data Analysis.zip",
//     type: "archive",
//     size: "8.7 MB",
//     uploaded_at: "2025-04-22",
//   },
// ];
//run build
interface ClassRoomTypes {
  classModules: ClassModulesApiResponse | undefined;
  isLoading: boolean;
  error: unknown;
  moduleTopics: TopicsListResponse | undefined;
  moduleTopicsError: unknown;
  moduleTopicsLoading: boolean;
  isModuleId: number | null;
  handleSetModuleId: (moduleId: number | null) => void;
  setPage: (page: number) => void;
  page: number;
  isFetching: boolean;
}

function ClassroomModuleCom({
  classModules,
  isLoading,
  isFetching,
  error,
  moduleTopics,
  moduleTopicsError,
  moduleTopicsLoading,
  handleSetModuleId,
  isModuleId,
  setPage,
  page,
}: ClassRoomTypes) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(classModules, "classModules");

  if (moduleTopicsError) return <div>Error loading topics</div>;

  if (isLoading) return <div>Loading modules...</div>;
  if (error) return <div>Error loading modules</div>;

  return (
    <TabsContent value="modules" className="space-y-4">
      <Card >
        <CardHeader >
          {classModules ? (
            <CardTitle className="flex items-center">
              <Book className="mr-2 h-5 w-5" />
              Modules ({classModules?.data?.length})
            </CardTitle>
          ) : null}

          {/* <CardTitle className="flex items-center">
            <Book className="mr-2 h-5 w-5" />
            Modules ({data?.data.length})
          </CardTitle> */}
          <CardContent className="p-0">
            {isLoading || isFetching ? (
              <ModuleSkeletonLoader />
            ) : classModules?.data?.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No modules available yet
              </p>
            ) : (
              <div className="space-y-6 ">
                {classModules?.data.map((module, index) => (
                  <div
                    key={module.id}
                    className="border rounded-lg overflow-hidden"
                  >
                    <div className="bg-slate-50 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between">
                      <div>
                        <h3 className="font-medium">
                          Module {index + 1}: {module.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {module.description}
                        </p>
                      </div>
                      <Badge variant="outline" className="mt-9 sm:mt-0">
                        {module.topics_count} topics
                      </Badge>
                    </div>
                    <div className="divide-y">
                      {/* { */}
                      {/* // module.topics.map((topic) => ( */}
                      <div
                        // key={topic.id}
                        className="p-4 flex flex-col sm:flex-row items-center gap-4 justify-between"
                      >
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center mr-3">
                            <FileText className="h-4 w-4 text-slate-600" />
                          </div>
                          <span>Materials: {module.materials_count}</span>
                        </div>
                        <Badge variant="secondary">
                          duration: {module.duration}
                        </Badge>
                        <Badge variant="secondary">
                          created by: {module.created_by}
                        </Badge>
                        {/* <Badge variant="outline"> */}
                        <Button
                          className="text-[10px] lg:text-base"
                          isBorder={true}
                          onClick={() => {
                            setIsModalOpen(true);
                            handleSetModuleId(module.id);
                          }}
                        >
                          View Topics
                        </Button>
                        {/* </Badge> */}
                      </div>
                      {/* // ))} */}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
          <CardDescription>
            Course content is organized into modules with specific topics
          </CardDescription>
        </CardHeader>
      </Card>
      {classModules?.meta && (
        <CardFooter className="flex items-center justify-center gap-4">
          <Button
            isBorder={true}
            disabled={
              page <= 1 || !classModules.links?.prev || isFetching || isLoading
            }
            onClick={() => setPage(page - 1)}
            className={`${
              page <= 1 || !classModules.links?.prev
                ? "cursor-not-allowed opacity-20 hover:none"
                : "bg-primary text-white"
            }`}
          >
            Previous
          </Button>
          <span>Page {classModules.meta.current_page}</span>
          <Button
            isBorder={true}
            disabled={!classModules.links?.next || isFetching || isLoading}
            onClick={() => setPage(page + 1)}
            className={`${
              !classModules.links?.next
                ? "cursor-not-allowed opacity-20"
                : "bg-primary text-white"
            }`}
          >
            Next
          </Button>
        </CardFooter>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          handleSetModuleId(null);
        }}
        title="Module Topics"
        displayClose={true}
      >
        {moduleTopicsLoading ? (
          <div>
            {/* <Loader /> */}
            loading...
          </div>
        ) : (
          <div>
            <h2 className="text-lg font-semibold mb-4">
              Module {isModuleId}: Topics {moduleTopics?.data?.length}
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Here are the topics for this module
            </p>
          </div>
        )}
        {moduleTopics?.data?.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No topics available yet
          </p>
        ) : (
          <div className="space-y-6">
            {moduleTopics?.data.map((topic, index) => (
              <div key={topic.id} className="border rounded-lg overflow-hidden">
                <div className="bg-slate-50 p-4 flex flex-col gap-4 sm:flex-row  items-center justify-between">
                  <div>
                    <h3 className="font-medium">
                      Topic {index + 1}: {topic.title}
                    </h3>
                    <p className="text-[10px] text-muted-foreground">
                      {topic.description}
                    </p>
                  </div>
                  <Badge variant="secondary">{topic.duration} materials</Badge>

                  <Badge variant="secondary">
                    created by: {topic.created_by}
                  </Badge>
                </div>
                <div className="divide-y"></div>
                <div className="p-4 flex items-center justify-between"></div>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </TabsContent>
  );
}

export default function ClassroomDetailPage() {
  const paramsN = useParams<{ id: string }>();
  const id = paramsN?.id;
  const [activeTab, setActiveTab] = useState("overview");
  const myId = id ? id : null;
  const [isModuleId, setIsModuleId] = useState<number | null>(null);
  const isQueryEnabled = !!id && !!isModuleId;
  const [page, setPage] = useState(1);
  const {
    data: singleClassroom,
    loading: singleClassroomLoading,
    error: singleClassroomError,
  } = useGetSingleClassroom(myId || "");

  // const classroomId = Number(id);
  const {
    data: classModules,
    loading: isLoading,
    isFetching,
    error,
  } = useGetClassroomModules(id, page);

  const {
    data: moduleTopics,
    error: moduleTopicsError,
    loading: moduleTopicsLoading,
  } = useGetAllModuleTopics(Number(id), Number(isModuleId), isQueryEnabled);

  const {
    data: allClassroomMaterials,
    loading: allClassroomMaterialsoading,
    error: allClassroomMaterialsrror,
  } = useGetAllClassroomMaterials(Number(id), !!Number(id));

  function handleSetModuleId(moduleId: number | null) {
    if (moduleId === null) {
      setIsModuleId(null);
    }
    setIsModuleId(moduleId);
  }

  // Pass an empty string or default value if id is not available

  if (singleClassroomLoading) return <div>Loading modules...</div>;
  if (singleClassroomError) return <div>Error loading modules</div>;
  if (allClassroomMaterialsrror) return <div>Error loading topics</div>;
  if (allClassroomMaterialsoading) return <div>Loading topics...</div>;

  // const assignments = singleClassroom.assignments || [];
  // const [selectedAssignment, setSelectedAssignment] = useState<
  //   (typeof assignments)[0] | null
  // >(null);
  // const [isAssignmentDialogOpen, setIsAssignmentDialogOpen] = useState(false);

  // Format time to be more readable
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = Number.parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  // Format date to be more readable
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Function to open the assignment dialog
  // const openAssignmentDialog = useCallback((assignment: (typeof assignments)[0]) => {
  //   setSelectedAssignment(assignment);
  //   setIsAssignmentDialogOpen(true);
  // }, []);

  // Update the return statement to include the Toaster and AssignmentSubmissionDialog
  // console.log(classModules, "modules");
  // if (!singleClass || !classModules) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="container mx-auto py-6">
      <Toaster />
      {/* {selectedAssignment && (
        <AssignmentSubmissionDialog
          assignment={selectedAssignment}
          open={isAssignmentDialogOpen}
          onOpenChange={setIsAssignmentDialogOpen}
        />
      )} */}

      <div className="flex items-center justify-between mb-6">
        <div>
          <Link
            href="/user/classrooms"
            className="text-sm text-gray-600 hover:underline mb-2 inline-block"
          >
            ← Back to Classrooms
          </Link>
          {singleClassroom ? (
            <h1 className="text-[22px] sm:text-3xl font-bold">{singleClassroom.name}</h1>
          ) : (
            <h1 className="text-3xl font-bold">Nil</h1>
          )}
          {singleClassroom ? (
            <p className="text-sm text-gray-500">
              {singleClassroom.description}
            </p>
          ) : (
            <p className="text-sm text-gray-500">Nil</p>
          )}
          {/* <p className="text-muted-foreground mt-1">{singleClassroom.description}</p> */}
        </div>
        {singleClassroom ? (
          <Badge
            variant={
              singleClassroom.status === "active" ? "default" : "secondary"
            }
            className="text-sm px-3 py-1"
          >
            {singleClassroom.status}
          </Badge>
        ) : null}
      </div>

      {/* me */}

      <Tabs
        value={activeTab}
        onValueChange={(value) => {
          if (value !== activeTab) {
            setActiveTab(value);
          }
        }}
        className="space-y-4"
      >
       
<TabsList className="w-auto justify-between flex overflow-x-auto sm:justify-between lg:grid lg:grid-cols-4 lg:w-auto ">
  <TabsTrigger value="overview" className="flex-shrink-0">Overview</TabsTrigger>
  <TabsTrigger value="modules" className="flex-shrink-0">Modules</TabsTrigger>
  <TabsTrigger value="assignments" className="flex-shrink-0">Assignments</TabsTrigger>
  <TabsTrigger value="materials" className="flex-shrink-0">Materials</TabsTrigger>
</TabsList>



        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-base sm:text-2xl">
                  <Calendar className="mr-2  h-5 w-5" />
                  Schedule Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div>
    <h3 className="text-sm font-medium text-muted-foreground">Days</h3>
    {singleClassroom ? (
      <p>
        {singleClassroom?.schedules?.days_of_week?.join(", ") ||
          "No schedule set"}
      </p>
    ) : (
      <p>Nil</p>
    )}
  </div>

  <div>
    <h3 className="text-sm font-medium text-muted-foreground">Time</h3>
    {singleClassroom ? (
      <p>
        {formatTime(singleClassroom.schedules.start_time)} -{" "}
        {formatTime(singleClassroom.schedules.end_time)}
      </p>
    ) : (
      <p>Nil</p>
    )}
  </div>

  <div>
    <h3 className="text-sm font-medium text-muted-foreground">Start Date</h3>
    {singleClassroom ? (
      <p>{formatDate(singleClassroom.schedules.start_date)}</p>
    ) : (
      <p>Nil</p>
    )}
  </div>

  <div>
    <h3 className="text-sm font-medium text-muted-foreground">End Date</h3>
    {singleClassroom ? (
      <p>{formatDate(singleClassroom.schedules.end_date)}</p>
    ) : (
      <p>Nil</p>
    )}
  </div>
</div>

              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-base sm:text-2xl">
                  <Users className="mr-2 h-5 w-5" />
                  People
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    Tutors
                  </h3>
                  {singleClassroom?.tutors.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No tutors assigned yet
                    </p>
                  ) : (
                    <div>
                      {singleClassroom?.tutors.map((tutor:Tutor) => (
                        <div key={tutor.id} className="flex items-center mb-3">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarFallback>
                              {tutor.fullname
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">
                              {tutor.fullname}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {tutor.email}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* {classroom.tutors.map((tutor) => (
                    <div key={tutor.id} className="flex items-center mb-3">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarFallback>
                          {tutor.fullname
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{tutor.fullname}</p>
                        <p className="text-xs text-muted-foreground">
                          {tutor.email}
                        </p>
                      </div>
                    </div>
                  ))} */}
                </div>
                <div>
                  {singleClassroom?.students.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No students enrolled yet
                    </p>
                  ) : (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">
                        Students
                      </h3>
                      {singleClassroom?.students.map((student:Student) => (
                        <div
                          key={student.id}
                          className="flex items-center mb-3"
                        >
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarFallback>
                              {student.fullname
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">
                              {student.fullname}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {student.email}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* {classroom.students.map((student) => (
                    <div key={student.id} className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarFallback>
                          {student.fullname
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">
                          {student.fullname}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {student.email}
                        </p>
                      </div>
                    </div>
                  ))} */}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {activeTab === "modules" && (
          <ClassroomModuleCom
            classModules={classModules}
            isLoading={isLoading}
            error={error}
            moduleTopics={moduleTopics}
            moduleTopicsError={moduleTopicsError}
            moduleTopicsLoading={moduleTopicsLoading}
            handleSetModuleId={handleSetModuleId}
            isModuleId={isModuleId}
            page={page}
            setPage={setPage}
            isFetching={isFetching}
          />
        )}

        <TabsContent value="assignments" className="space-y-4">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="flex justify-center items-center">
                <FileText className="mr-2 h-5 w-5 text-muted-foreground" />
                No Assignments
              </CardTitle>
              <CardDescription>
                You&apos;re all caught up! New assignments will appear here.
              </CardDescription>
            </CardHeader>
          </Card>
          {/* <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Assignments ({assignments.length})
              </CardTitle>
              <CardDescription>
                Complete and submit your assignments before the due date
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assignments.map((assignment) => (
                  <div
                    key={assignment.id}
                    className="border rounded-lg overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{assignment.title}</h3>
                        <Badge
                          variant={
                            assignment.status === "completed"
                              ? "default"
                              : "outline"
                          }
                        >
                          {assignment.status === "completed"
                            ? "Completed"
                            : "Pending"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {assignment.description}
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                          <span>Due: {formatDate(assignment.due_date)}</span>
                        </div>
                        <div className="flex items-center">
                          <GraduationCap className="mr-1 h-4 w-4 text-muted-foreground" />
                          <span>{assignment.points} points</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-slate-50 p-3 flex justify-end">
                      <Button onClick={() => openAssignmentDialog(assignment)}>
                        View & Submit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card> */}
        </TabsContent>

        <TabsContent value="materials" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Folder className="mr-2 h-5 w-5" />
                {/* Course Materials ({materials.length}) */}
              </CardTitle>
              <CardDescription>
                Download and access course materials provided by your instructor
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-2">
                {/* {allClassroomMaterials?.data?.map((module) => (
                  <div
                    key={module.id}
                    className="border rounded-lg overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">Module: {module.module}</h3>
                        <Badge variant="outline">
                          {module.module} materials
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex flex-col">
                          <p>Topics: {module.title}</p>
                          <p className="text-sm text-muted-foreground mb-3">
                            description: {module.description}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                          <span>
                            Created: {formatDate(module.created_at)}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                          <span>Created by: {module.created_by}</span>
                        </div>
                        <Badge variant="outline">
                          duration: {module.duration} mins
                        </Badge>
                        <div>
                          <Button
                            className="ml-2"
                            isBorder={true}
                            onClick={() => {
                              // setIsModalOpen(true);
                              // handleSetModuleId(module.id);
                            }}
                          >
                            View Materials
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))} */}
                {allClassroomMaterials?.data.map(
                  (material: MaterialResponse) => (
                    <div
                    key={material.id}
                    className="flex flex-col sm:flex-row  items-start sm:items-center justify-start sm:justify-between p-3 border rounded-lg"
                  >
                    {/* Left: Icon + Topic */}
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded bg-slate-100 flex items-center justify-center mr-3">
                        <FileText className="h-5 w-5 text-slate-600" />
                      </div>
                      <div>
                        <p className="text-sm sm:text-base font-medium">
                          Topic: {material.topic}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {/* Optional metadata */}
                        </p>
                      </div>
                    </div>
                  
                    {/* Right: Badges + Download */}
                    <div className="flex flex-wrap sm:flex-row gap-2 sm:gap-3 items-start sm:items-center sm:max-w-[60%]">
                      <Badge variant="secondary" className="text-[10px] sm:text-sm">
                        module: {material.module}
                      </Badge>
                      <Badge variant="secondary" className="text-[10px] sm:text-sm">
                        type: {material.type}
                      </Badge>
                      <Badge variant="secondary" className="text-[10px] sm:text-sm">
                        {material.title}
                      </Badge>
                      <MaterialDownload material={material} />
                    </div>
                  </div>
                  
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Layout(props: layoutInterface) {
  return <UserLayout {...props} title="My Classrooms" description="" />;
}
ClassroomDetailPage.Layout = Layout;
