"use client";

import { useState } from "react";
import {
  Book,
  Calendar,
  FileText,
  Folder,
  GraduationCap,
  Users,
} from "lucide-react";
import Link from "next/link";

import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { AssignmentSubmissionDialog } from "@/shared/components/assignment-submission-dialog";
import { MaterialDownload } from "@/shared/components/material-download";
import UserLayout, { layoutInterface } from "@/shared/layouts/userLayout";

// Mock classroom data
const classroom = {
  message: "Classroom retrieved successfully",
  id: 8,
  name: "Basic of Data Analytics",
  description:
    "Learn the fundamentals of data analytics including data collection, processing, analysis, and visualization techniques.",
  image_url: null,
  image_public_id: null,
  section: null,
  status: "active",
  start_date: "2025-04-22",
  end_date: "2025-04-23",
  created_by: 4,
  updated_by: null,
  course_id: 1,
  created_at: "2025-04-21T14:38:39.000000Z",
  updated_at: "2025-04-21T14:38:39.000000Z",
  students_count: 1,
  modules_count: 3,
  tutors: [
    {
      id: 4,
      fullname: "Ukpono Titus",
      email: "ukponoFL@gmail.com",
    },
  ],
  students: [
    {
      id: 13,
      fullname: "Peter Ime",
      email: "reniy89307@f5url.com",
    },
  ],
  schedules: {
    id: 8,
    days_of_week: ["Monday"],
    start_date: "2025-04-22",
    end_date: "2025-04-23",
    start_time: "16:38:00",
    end_time: "18:38:00",
    status: "active",
    classroom_id: 8,
    created_at: "2025-04-21T14:38:40.000000Z",
    updated_at: "2025-04-21T14:38:40.000000Z",
  },
};

// Mock modules data
const modules = [
  {
    id: 1,
    title: "Introduction to Data Analytics",
    description: "Overview of data analytics concepts and tools",
    topics: [
      { id: 1, title: "What is Data Analytics?", duration: "45 mins" },
      { id: 2, title: "Data Collection Methods", duration: "60 mins" },
      { id: 3, title: "Data Processing Techniques", duration: "90 mins" },
    ],
  },
  {
    id: 2,
    title: "Data Visualization",
    description: "Learn how to create effective data visualizations",
    topics: [
      { id: 4, title: "Visualization Principles", duration: "60 mins" },
      { id: 5, title: "Chart Types and Their Uses", duration: "75 mins" },
      { id: 6, title: "Creating Interactive Dashboards", duration: "120 mins" },
    ],
  },
  {
    id: 3,
    title: "Data Analysis Tools",
    description: "Explore popular tools used in data analysis",
    topics: [
      {
        id: 7,
        title: "Introduction to Excel for Data Analysis",
        duration: "90 mins",
      },
      { id: 8, title: "SQL for Data Analysts", duration: "120 mins" },
      { id: 9, title: "Python Basics for Data Analysis", duration: "150 mins" },
    ],
  },
];

// Mock assignments data
const assignments = [
  {
    id: 1,
    title: "Data Collection Exercise",
    description: "Collect and organize data from provided sources",
    instructions:
      "1. Download the sample data files from the materials section.\n2. Organize the data into appropriate categories.\n3. Create a spreadsheet with the organized data.\n4. Write a brief summary of your findings (250-500 words).",
    due_date: "2025-04-25",
    status: "pending",
    points: 20,
  },
  {
    id: 2,
    title: "Visualization Project",
    description:
      "Create three different visualizations from the provided dataset",
    instructions:
      "1. Use the dataset provided in the materials section.\n2. Create three different types of visualizations (bar chart, line chart, pie chart, etc.).\n3. Each visualization should highlight a different aspect of the data.\n4. Include a brief explanation for each visualization explaining what insights it provides.",
    due_date: "2025-04-28",
    status: "pending",
    points: 30,
  },
  {
    id: 3,
    title: "Data Analysis Report",
    description: "Analyze the given dataset and write a comprehensive report",
    instructions:
      "1. Perform exploratory data analysis on the provided dataset.\n2. Identify key trends, patterns, and outliers.\n3. Create appropriate visualizations to support your findings.\n4. Write a comprehensive report (1000-1500 words) detailing your analysis process and findings.",
    due_date: "2025-05-02",
    status: "pending",
    points: 50,
  },
];

// Mock materials data
const materials = [
  {
    id: 1,
    title: "Data Analytics Fundamentals.pdf",
    type: "pdf",
    size: "2.4 MB",
    uploaded_at: "2025-04-21",
  },
  {
    id: 2,
    title: "Sample Dataset.xlsx",
    type: "excel",
    size: "1.8 MB",
    uploaded_at: "2025-04-21",
  },
  {
    id: 3,
    title: "Visualization Best Practices.pptx",
    type: "powerpoint",
    size: "5.2 MB",
    uploaded_at: "2025-04-22",
  },
  {
    id: 4,
    title: "Python for Data Analysis.zip",
    type: "archive",
    size: "8.7 MB",
    uploaded_at: "2025-04-22",
  },
];

export default function ClassroomDetailPage({
  params,
}: {
  params: { id: string };
}) {
  console.log(params);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedAssignment, setSelectedAssignment] = useState<
    (typeof assignments)[0] | null
  >(null);
  const [isAssignmentDialogOpen, setIsAssignmentDialogOpen] = useState(false);

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
  const openAssignmentDialog = (assignment: (typeof assignments)[0]) => {
    setSelectedAssignment(assignment);
    setIsAssignmentDialogOpen(true);
  };

  // Update the return statement to include the Toaster and AssignmentSubmissionDialog
  return (
    <div className="container mx-auto py-6">
      <Toaster />
      {selectedAssignment && (
        <AssignmentSubmissionDialog
          assignment={selectedAssignment}
          open={isAssignmentDialogOpen}
          onOpenChange={setIsAssignmentDialogOpen}
        />
      )}

      <div className="flex items-center justify-between mb-6">
        <div>
          <Link
            href="/user/classrooms"
            className="text-sm text-gray-600 hover:underline mb-2 inline-block"
          >
            ← Back to Classrooms
          </Link>
          <h1 className="text-3xl font-bold">{classroom.name}</h1>
          <p className="text-muted-foreground mt-1">{classroom.description}</p>
        </div>
        <Badge
          variant={classroom.status === "active" ? "default" : "secondary"}
          className="text-sm px-3 py-1"
        >
          {classroom.status}
        </Badge>
      </div>

      {/* me */}

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-4 lg:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="modules">Modules</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="materials">Materials</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Days
                    </h3>
                    <p>{classroom.schedules.days_of_week.join(", ")}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Time
                    </h3>
                    <p>
                      {formatTime(classroom.schedules.start_time)} -{" "}
                      {formatTime(classroom.schedules.end_time)}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Start Date
                    </h3>
                    <p>{formatDate(classroom.schedules.start_date)}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      End Date
                    </h3>
                    <p>{formatDate(classroom.schedules.end_date)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  People
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    Tutors
                  </h3>
                  {classroom.tutors.map((tutor) => (
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
                  ))}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    Students ({classroom.students_count})
                  </h3>
                  {classroom.students.map((student) => (
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
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="modules" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Book className="mr-2 h-5 w-5" />
                Modules ({modules.length})
              </CardTitle>
              <CardDescription>
                Course content is organized into modules with specific topics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {modules.map((module, index) => (
                  <div
                    key={module.id}
                    className="border rounded-lg overflow-hidden"
                  >
                    <div className="bg-slate-50 p-4 flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">
                          Module {index + 1}: {module.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {module.description}
                        </p>
                      </div>
                      <Badge variant="outline">
                        {module.topics.length} topics
                      </Badge>
                    </div>
                    <div className="divide-y">
                      {module.topics.map((topic) => (
                        <div
                          key={topic.id}
                          className="p-4 flex items-center justify-between"
                        >
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center mr-3">
                              <FileText className="h-4 w-4 text-slate-600" />
                            </div>
                            <span>{topic.title}</span>
                          </div>
                          <Badge variant="secondary">{topic.duration}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4">
          <Card>
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
          </Card>
        </TabsContent>

        <TabsContent value="materials" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Folder className="mr-2 h-5 w-5" />
                Course Materials ({materials.length})
              </CardTitle>
              <CardDescription>
                Download and access course materials provided by your instructor
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {materials.map((material) => (
                  <div
                    key={material.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded bg-slate-100 flex items-center justify-center mr-3">
                        <FileText className="h-5 w-5 text-slate-600" />
                      </div>
                      <div>
                        <p className="font-medium">{material.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {material.size} • Uploaded on{" "}
                          {formatDate(material.uploaded_at)}
                        </p>
                      </div>
                    </div>
                    <MaterialDownload material={material} />
                  </div>
                ))}
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
