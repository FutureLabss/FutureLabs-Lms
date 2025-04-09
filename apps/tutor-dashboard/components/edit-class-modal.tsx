"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import type { Class } from "@/lib/types";

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

type EditClassModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClassUpdated: (updatedClass: any) => void;
  classData: Class;
};

export function EditClassModal({
  open,
  onOpenChange,
  onClassUpdated,
  classData,
}: EditClassModalProps) {
  const [activeTab, setActiveTab] = useState("details");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: classData.name,
      description: classData.description || "",
      program: classData.program,
      maxStudents: classData.maxStudents,
      startDate: classData.startDate,
      endDate: classData.endDate,
      startTime: classData.schedule.startTime,
      endTime: classData.schedule.endTime,
      daysOfWeek: classData.schedule.daysOfWeek.join(","),
      status: classData.status,
    },
  });

  // Update form values when classData changes
  useEffect(() => {
    if (classData && open) {
      form.reset({
        name: classData.name,
        description: classData.description || "",
        program: classData.program,
        maxStudents: classData.maxStudents,
        startDate: classData.startDate,
        endDate: classData.endDate,
        startTime: classData.schedule.startTime,
        endTime: classData.schedule.endTime,
        daysOfWeek: classData.schedule.daysOfWeek.join(", "),
        status: classData.status,
      });
    }
  }, [classData, form, open]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    // Simulate API call with a timeout
    setTimeout(() => {
      // Create an updated class object
      const updatedClass = {
        ...classData,
        name: values.name,
        description: values.description,
        program: values.program,
        maxStudents: values.maxStudents,
        startDate: values.startDate,
        endDate: values.endDate,
        schedule: {
          daysOfWeek: values.daysOfWeek.split(",").map((day) => day.trim()),
          startTime: values.startTime,
          endTime: values.endTime,
        },
        status: values.status,
      };

      // Call the callback with the updated class
      onClassUpdated(updatedClass);

      // Show success toast
      toast({
        title: "Class updated",
        description: "The class has been updated successfully.",
      });

      // Close the modal
      onOpenChange(false);
      setIsSubmitting(false);
      setActiveTab("details");
    }, 1000);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Class</DialogTitle>
          <DialogDescription>
            Update the details of this class
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-2">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Basic Details</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(
                onSubmit as SubmitHandler<z.infer<typeof formSchema>>
              )}
              className="space-y-4 mt-4"
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
                          The maximum number of students allowed in this class.
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

              <DialogFooter className="mt-6">
                <div className="flex justify-between w-full">
                  <div>
                    {activeTab !== "details" && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          if (activeTab === "schedule") setActiveTab("details");
                          if (activeTab === "settings")
                            setActiveTab("schedule");
                        }}
                      >
                        Previous
                      </Button>
                    )}
                  </div>
                  <div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => onOpenChange(false)}
                      className="mr-2"
                    >
                      Cancel
                    </Button>
                    {activeTab !== "settings" ? (
                      <Button
                        type="button"
                        onClick={() => {
                          if (activeTab === "details") setActiveTab("schedule");
                          if (activeTab === "schedule")
                            setActiveTab("settings");
                        }}
                      >
                        Next
                      </Button>
                    ) : (
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Updating..." : "Update Class"}
                      </Button>
                    )}
                  </div>
                </div>
              </DialogFooter>
            </form>
          </Form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
