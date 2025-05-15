"use client";

import { useState } from "react";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useGetAllStudentsClasses } from "@/hooks/query/get-students";
import { AddStudent } from "@/lib/types/get-student";
import { useAddStudentToClassroom } from "@/hooks/mutate/classroom";

const studentFormSchema = z.object({
  name: z.string().min(2, {
    message: "Student name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().optional(),
  guardianName: z.string().optional(),
  guardianEmail: z
    .string()
    .email({
      message: "Please enter a valid email address.",
    })
    .optional(),
  level: z.string({
    required_error: "Please select a student level.",
  }),
});

type AddStudentModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStudentAdded: (student: any) => void;
  classId: string | number;
};

export function AddStudentModal({
  open,
  onOpenChange,
  onStudentAdded,
  classId,
}: AddStudentModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchResults, setSearchResults] = useState<AddStudent[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [selectedExistingStudent, setSelectedExistingStudent] = useState<
    any | null
  >(null);
  const [addNewStudent, setAddNewStudent] = useState(false);
  const { data: studentsData, loading: studentsDataLoading } =
    useGetAllStudentsClasses();
  const { mutate: addStudentToClassroom } = useAddStudentToClassroom({
    onSuccess: () => {
      console.log("Student added successfully");
    },
    onError: (error) => {
      console.error("Error adding student:", error);
    },
  });
  // console.log("Students Data:", studentsData);

  const form = useForm<z.infer<typeof studentFormSchema>>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      guardianName: "",
      guardianEmail: "",
      level: "",
    },
  });

  // Mock function to search for existing students
  const searchStudents = (query: string) => {
    setIsSearching(true);
    // Simulate API call delay
    // const results = [
    //   {
    //     id: 101,
    //     name: "Alice Johnson",
    //     email: "alice@example.com",
    //     level: "Intermediate",
    //   },
    //   {
    //     id: 102,
    //     name: "Bob Smith",
    //     email: "bob@example.com",
    //     level: "Beginner",
    //   },
    //   {
    //     id: 103,
    //     name: "Charlie Brown",
    //     email: "charlie@example.com",
    //     level: "Advanced",
    //   },
    // ];
    let results =
      studentsData?.data?.filter(
        (student) =>
          student.fullname.toLowerCase().includes(query.toLowerCase()) ||
          student.fullname.toLowerCase().includes(query.toLowerCase())
      ) || [];

    setSearchResults(results);
    setIsSearching(false);
    // setTimeout(() => {
    //   // Mock results
    // }, 500);
  };

  function onSubmit(values: z.infer<typeof studentFormSchema>) {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      // Create a new student object
      const newStudent = {
        id: Math.floor(Math.random() * 1000), // Generate a random ID for demo purposes
        name: values.name,
        email: values.email,
        phone: values.phone,
        guardianName: values.guardianName,
        guardianEmail: values.guardianEmail,
        level: values.level,
        avatar: "/placeholder.svg",
        enrollmentDate: new Date().toISOString(),
      };

      // Call the callback with the new student
      onStudentAdded(newStudent);

      // Reset form and state
      form.reset();
      setIsSubmitting(false);
      setAddNewStudent(false);
      setSelectedExistingStudent(null);
      setSearchQuery("");
      setSearchResults([]);

      // Close the modal
      onOpenChange(false);
    }, 1000);
  }

  function handleExistingStudentSubmit() {
    // console.log(selectedExistingStudent, "exisiting");

    setIsSubmitting(true);

    if (selectedExistingStudent) {
      // Add enrollment date to the selected student
      const studentWithEnrollment = {
        ...selectedExistingStudent,
        enrollmentDate: new Date().toISOString(),
      };
      addStudentToClassroom({
        classroomId: String(classId),
        userId: selectedExistingStudent?.id,
      });

      // Call the callback with the selected student
      onStudentAdded(studentWithEnrollment);
    }

    // Reset state
    setIsSubmitting(false);
    setSelectedExistingStudent(null);
    setSearchQuery("");
    setSearchResults([]);

    // Close the modal
    onOpenChange(false);
    // setTimeout(() => {
    // }, 1000);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        {studentsDataLoading ? (
          <div className="flex justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <DialogHeader>
            <DialogTitle>Add Student to Class</DialogTitle>
            <DialogDescription>
              Search for an existing student or add a new one to this class.
            </DialogDescription>
          </DialogHeader>
        )}

        {!addNewStudent ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Input
                  type="search"
                  placeholder="Search students by name or email..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (e.target.value.length > 2) {
                      searchStudents(e.target.value);
                    } else {
                      setSearchResults([]);
                    }
                  }}
                />
              </div>
              <Button
                variant="outline"
                onClick={() => searchStudents(searchQuery)}
                disabled={searchQuery.length < 3}
              >
                Search
              </Button>
            </div>

            {isSearching && (
              <div className="flex justify-center py-4">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            )}

            {!isSearching && searchResults.length > 0 && (
              <div className="border rounded-md divide-y max-h-[300px] overflow-y-auto">
                {searchResults.map((student) => (
                  <div
                    key={student.id}
                    className={`flex items-center justify-between p-3 cursor-pointer hover:bg-muted ${
                      selectedExistingStudent?.id === student.id
                        ? "bg-muted"
                        : ""
                    }`}
                    onClick={() => setSelectedExistingStudent(student)}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {student.fullname.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{student.fullname}</p>
                        <p className="text-sm text-muted-foreground">
                          {student.email}
                        </p>
                      </div>
                    </div>
                    {/* <div className="text-sm text-muted-foreground">
                      Level: {student.level}
                    </div> */}
                  </div>
                ))}
              </div>
            )}

            {!isSearching &&
              searchQuery.length > 2 &&
              searchResults.length === 0 && (
                <div className="text-center py-4 border rounded-md">
                  <p className="text-muted-foreground">No students found</p>
                </div>
              )}

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setAddNewStudent(true)}>
                Add New Student
              </Button>
              <div className="space-x-2">
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleExistingStudentSubmit}
                  disabled={!selectedExistingStudent || isSubmitting}
                >
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Add to Class
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="student@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This will be used for login and communications.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Student Level</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">
                            Intermediate
                          </SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">
                  Guardian Information (Optional)
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="guardianName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Guardian Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Guardian's full name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="guardianEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Guardian Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="guardian@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <DialogFooter className="pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setAddNewStudent(false)}
                  className="mr-auto"
                >
                  Back to Search
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="ml-auto mr-2"
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Add Student
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
