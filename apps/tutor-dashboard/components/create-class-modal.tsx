"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useCreateClassroom } from "@/hooks/mutate/classroom"
import { ClassroomScheduleResponse } from "@/lib/types/classroom"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Class name must be at least 2 characters.",
  }),
  description: z.string().optional(),
  course: z.string({
    required_error: "Please select a program.",
  }),
  start_date: z.string(),
  end_date: z.string(),
  start_time: z.string(),
  end_time: z.string(),
  days_of_week: z.string(),
  status: z.enum(["active", "inactive"]),
})

type CreateClassModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  // onClassCreated: (newClass: any) => void
}

export function CreateClassModal({ open, onOpenChange }: CreateClassModalProps) {
  const [activeTab, setActiveTab] = useState("details")
  const { mutate: createclassroomdata } = useCreateClassroom({ onSuccess(data) { }, onError(error) { } })
  console.log(createclassroomdata)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      course: "",
      start_date: "",
      end_date: "",
      start_time: "",
      end_time: "",
      days_of_week: "",
      status: "active",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newClass: ClassroomScheduleResponse = {
      classroom: {
        name: values.name,
        course: values.course,
        status: values.status,
        description: values.description,
        start_date: values.start_date,
        end_date: values.end_date,
      },
      schedule: {
        // days_of_week: values.days_of_week.split(",").map((day) => day.trim()()),
        // days_of_week: values.days_of_week.split(",").map((day) => day.trim()),
        days_of_week: values.days_of_week
          .split(",")
          .map((day) => {
            const trimmed = day.trim().toLowerCase();
            return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
          }),

        start_time: values.start_time,
        end_time: values.end_time,
        start_date: values.start_date,
        end_date: values.end_date,
        status: values.status,
      },
    };
    createclassroomdata(newClass);
    onOpenChange(false);
    form.reset();
    setActiveTab("details");
  }


  // function onSubmit(values: z.infer<typeof formSchema>) {
  //   const newClass = {
  //     name: values.name,
  //     program: values.course,
  //     status: values.status,
  //     description: values.description,
  //     schedule: {
  //       daysOfWeek: values.days_of_week.split(",").map((day) => day.trim()),
  //       startTime: values.start_time,
  //       endTime: values.end_time,
  //     },
  //     startDate: values.start_date,
  //     endDate: values.end_date,
  //   }   
  //   // onClassCreated(newClass)
  //   createclassroomdata(newClass)
  //   console.log(newClass)
  //   onOpenChange(false)
  //   form.reset()
  //   setActiveTab("details")
  // }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Class</DialogTitle>
          <DialogDescription>Fill in the details to create a new class</DialogDescription>
        </DialogHeader>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-2">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Basic Details</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
              <TabsContent value="details" className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Class Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Advanced Mathematics" {...field} />
                      </FormControl>
                      <FormDescription>The name of your class as it will appear to students.</FormDescription>
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
                      <FormDescription>A short description of what students will learn.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="course"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Program</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a program" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value=" Web development">Web Development</SelectItem>
                            <SelectItem value="Marketing">Marketing</SelectItem>
                            <SelectItem value="Data Analytics">Data Analytics</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>The educational program this class belongs to.</FormDescription>
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
                    name="start_date"
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
                    name="end_date"
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
                    name="start_time"
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
                    name="end_time"
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
                  name="days_of_week"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Days of Week</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Monday, Wednesday, Friday" {...field} />
                      </FormControl>
                      <FormDescription>The days of the week when this class will be held.</FormDescription>
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
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Set whether this class is active or inactive.</FormDescription>
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
                          if (activeTab === "schedule") setActiveTab("details")
                          if (activeTab === "settings") setActiveTab("schedule")
                        }}
                      >
                        Previous
                      </Button>
                    )}
                  </div>
                  <div>
                    <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="mr-2">
                      Cancel
                    </Button>
                    {activeTab !== "settings" ? (
                      <Button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault() // Prevent form submission
                          if (activeTab === "details") setActiveTab("schedule")
                          if (activeTab === "schedule") setActiveTab("settings")
                        }}
                      >
                        Next
                      </Button>
                    ) : (
                      <Button type="submit">Create Class</Button>
                    )}
                  </div>
                </div>
              </DialogFooter>
            </form>
          </Form>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
