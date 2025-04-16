// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { z } from "zod"
// import { Button } from "@/components/ui/button"
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Textarea } from "@/components/ui/textarea"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { ArrowLeft, Calendar, Clock } from "lucide-react"
// import Link from "next/link"
// import { useCreateClassroom } from "@/hooks/mutate/classroom"

// const formSchema = z.object({
//   name: z.string().min(2, {
//     message: "Class name must be at least 2 characters.",
//   }),
//   description: z.string().optional(),
//   course: z.string({
//     required_error: "Please select a program.",
//   }),
//   startDate: z.string(),
//   endDate: z.string(),
//   startTime: z.string(),
//   endTime: z.string(),
//   daysOfWeek: z.string(),
// })

// export default function NewClassPage() {
//   const router = useRouter()
//   const [activeTab, setActiveTab] = useState("details")
//   const {mutate: createclassroomdata}=useCreateClassroom({onSuccess(data) {
      
//   },
// onError(error) {
    
// },})
// console.log(createclassroomdata)
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//       description: "",
//       course: "",
//       startDate: "",
//       endDate: "",
//       startTime: "",
//       endTime: "",
//       daysOfWeek: "",
//     },
//   })

//   function onSubmit(values: z.infer<typeof formSchema>) {
//     console.log(values)
//     createclassroomdata(values)
//     router.push("/classes")
//   }

//   return (
//     <div className="flex flex-col gap-4">
//       <div className="flex items-center gap-2">
//         <Button variant="ghost" size="icon" asChild>
//           <Link href="/classes">
//             <ArrowLeft className="h-4 w-4" />
//           </Link>
//         </Button>
//         <h1 className="text-3xl font-bold tracking-tight">Create New Class</h1>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>Class Information</CardTitle>
//           <CardDescription>Fill in the details to create a new class</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
//             <TabsList>
//               <TabsTrigger value="details">Basic Details</TabsTrigger>
//               <TabsTrigger value="schedule">Schedule</TabsTrigger>
//               <TabsTrigger value="materials">Materials</TabsTrigger>
//             </TabsList>

//             <Form {...form}>
//               <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//                 <TabsContent value="details" className="space-y-4">
//                   <FormField
//                     control={form.control}
//                     name="name"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Class Name</FormLabel>
//                         <FormControl>
//                           <Input placeholder="e.g., Advanced Mathematics" {...field} />
//                         </FormControl>
//                         <FormDescription>The name of your class as it will appear to students.</FormDescription>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={form.control}
//                     name="description"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Description</FormLabel>
//                         <FormControl>
//                           <Textarea
//                             placeholder="Provide a brief description of the class"
//                             className="resize-none"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormDescription>A short description of what students will learn.</FormDescription>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <div className="grid gap-4 md:grid-cols-2">
//                     <FormField
//                       control={form.control}
//                       name="course"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Program</FormLabel>
//                           <Select onValueChange={field.onChange} defaultValue={field.value}>
//                             <FormControl>
//                               <SelectTrigger>
//                                 <SelectValue placeholder="Select a program" />
//                               </SelectTrigger>
//                             </FormControl>
//                             <SelectContent>
//                               <SelectItem value="elementary">Elementary School</SelectItem>
//                               <SelectItem value="middle">Middle School</SelectItem>
//                               <SelectItem value="high">High School</SelectItem>
//                               <SelectItem value="college">College</SelectItem>
//                               <SelectItem value="adult">Adult Education</SelectItem>
//                             </SelectContent>
//                           </Select>
//                           <FormDescription>The educational program this class belongs to.</FormDescription>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </div>
//                 </TabsContent>

//                 <TabsContent value="schedule" className="space-y-4">
//                   <div className="grid gap-4 md:grid-cols-2">
//                     <FormField
//                       control={form.control}
//                       name="startDate"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Start Date</FormLabel>
//                           <FormControl>
//                             <div className="flex items-center">
//                               <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
//                               <Input type="date" {...field} />
//                             </div>
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />

//                     <FormField
//                       control={form.control}
//                       name="endDate"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>End Date</FormLabel>
//                           <FormControl>
//                             <div className="flex items-center">
//                               <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
//                               <Input type="date" {...field} />
//                             </div>
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </div>

//                   <div className="grid gap-4 md:grid-cols-2">
//                     <FormField
//                       control={form.control}
//                       name="startTime"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Start Time</FormLabel>
//                           <FormControl>
//                             <div className="flex items-center">
//                               <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
//                               <Input type="time" {...field} />
//                             </div>
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />

//                     <FormField
//                       control={form.control}
//                       name="endTime"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>End Time</FormLabel>
//                           <FormControl>
//                             <div className="flex items-center">
//                               <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
//                               <Input type="time" {...field} />
//                             </div>
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </div>

//                   <FormField
//                     control={form.control}
//                     name="daysOfWeek"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Days of Week</FormLabel>
//                         <FormControl>
//                           <Input placeholder="e.g., Monday, Wednesday, Friday" {...field} />
//                         </FormControl>
//                         <FormDescription>The days of the week when this class will be held.</FormDescription>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </TabsContent>

//                 <TabsContent value="materials" className="space-y-4">
//                   <div className="flex flex-col gap-4 p-6 border-2 border-dashed rounded-lg">
//                     <p className="text-center text-muted-foreground">You can add materials after creating the class</p>
//                   </div>
//                 </TabsContent>

//                 <div className="flex justify-end gap-2">
//                   <Button type="button" variant="outline" onClick={() => router.push("/classes")}>
//                     Cancel
//                   </Button>
//                   {activeTab !== "details" && (
//                     <Button
//                       type="button"
//                       variant="outline"
//                       onClick={() => {
//                         if (activeTab === "schedule") setActiveTab("details")
//                         if (activeTab === "materials") setActiveTab("schedule")
//                       }}
//                     >
//                       Previous
//                     </Button>
//                   )}
//                   {activeTab !== "materials" ? (
//                     <Button
//                       type="button"
//                       onClick={() => {
//                         if (activeTab === "details") setActiveTab("schedule")
//                         if (activeTab === "schedule") setActiveTab("materials")
//                       }}
//                     >
//                       Next
//                     </Button>
//                   ) : (
//                     <Button type="submit">Create Class</Button>
//                   )}
//                 </div>
//               </form>
//             </Form>
//           </Tabs>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }
