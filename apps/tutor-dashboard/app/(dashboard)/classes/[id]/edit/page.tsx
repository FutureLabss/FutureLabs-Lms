"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calendar, Clock, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "@/components/ui/use-toast";

// Mock data for a specific class
const initialClassData = {
  id: "1",
  name: "Advanced Mathematics",
  description:
    "A comprehensive course covering advanced mathematical concepts including calculus, algebra, and geometry. Students will learn problem-solving techniques and applications in real-world scenarios.",
  program: "high",
  maxStudents: 20,
  currentStudents: 15,
  startDate: "2023-09-01",
  endDate: "2023-12-15",
  schedule: {
    daysOfWeek: ["Monday", "Wednesday", "Friday"],
    startTime: "14:00",
    endTime: "15:30",
  },
  status: "active",
};

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Class name must be at least 2 characters.",
  }),
  description: z.string().optional(),
  program: z.string({
    required_error: "Please select a program.",
  }),
  maxStudents: z.coerce.number().min(1, {
    message: "Class must allow at least 1 student.",
  }),
  startDate: z.string(),
  endDate: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  daysOfWeek: z.string(),
  status: z.enum(["active", "inactive", "completed"]),
});

export default function EditClassPage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("details");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [classData, setClassData] = useState(initialClassData);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      program: "",
      maxStudents: 20,
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      daysOfWeek: "",
      status: "active",
    },
  });

  // In a real application, you would fetch the class data based on the ID
  const classId = params.id as string;

  useEffect(() => {
    // Simulate API call to fetch class data
    const fetchClassData = async () => {
      setIsLoading(true);
      try {
        // In a real app, you would fetch data from your API
        // const response = await fetch(`/api/classes/${classId}`)
        // const data = await response.json()

        // For now, we'll use our mock data
        setTimeout(() => {
          setClassData(initialClassData);

          // Set form values
          form.reset({
            name: initialClassData.name,
            description: initialClassData.description || "",
            program: initialClassData.program,
            maxStudents: initialClassData.maxStudents,
            startDate: initialClassData.startDate,
            endDate: initialClassData.endDate,
            startTime: initialClassData.schedule.startTime,
            endTime: initialClassData.schedule.endTime,
            daysOfWeek: initialClassData.schedule.daysOfWeek.join(", "),
            status: initialClassData.status as
              | "active"
              | "inactive"
              | "completed",
          });

          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching class data:", error);
        toast({
          title: "Error",
          description: "Failed to load class data. Please try again.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    };

    fetchClassData();
  }, [classId, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSaving(true);

    // Simulate API call with a timeout
    setTimeout(() => {
      // In a real app, you would send the updated data to your API
      // await fetch(`/api/classes/${classId}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(values)
      // })

      toast({
        title: "Class updated",
        description: "The class has been updated successfully.",
      });

      setIsSaving(false);
      router.push(`/classes/${classId}`);
    }, 1500);
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading class data...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/classes/${classId}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Edit Class</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Class Information</CardTitle>
          <CardDescription>Update the details of this class</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList>
              <TabsTrigger value="details">Basic Details</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <TabsContent value="details" className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Class Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Advanced Mathematics"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          The name of your class as it will appear to students.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Provide a brief description of the class"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          A short description of what students will learn.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="program"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Program</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a program" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="elementary">
                                Elementary School
                              </SelectItem>
                              <SelectItem value="middle">
                                Middle School
                              </SelectItem>
                              <SelectItem value="high">High School</SelectItem>
                              <SelectItem value="college">College</SelectItem>
                              <SelectItem value="adult">
                                Adult Education
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            The educational program this class belongs to.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="maxStudents"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Maximum Students</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormDescription>
                            The maximum number of students allowed in this
                            class.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="schedule" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Date</FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                              <Input type="date" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Date</FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                              <Input type="date" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="startTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Time</FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                              <Input type="time" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="endTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Time</FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                              <Input type="time" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="daysOfWeek"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Days of Week</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Monday, Wednesday, Friday"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          The days of the week when this class will be held.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                <TabsContent value="settings" className="space-y-4">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Class Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Set the current status of this class.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push(`/classes/${classId}`)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
