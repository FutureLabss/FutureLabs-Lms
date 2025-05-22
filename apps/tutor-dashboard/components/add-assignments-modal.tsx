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
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { useCreateClassroomAssignments } from "@/hooks/mutate/classroom";

// Replace with your actual hook to create assignments
// import { useCreateAssignment } from "@/hooks/mutate/assignments";

const assignmentFormSchema = z.object({
  title: z.string().min(2, {
    message: "Assignment title must be at least 2 characters.",
  }),
  description: z.string().optional(),
  dueDate: z.string().min(1, {
    message: "Due date is required.",
  }),
  points: z
    .number({ invalid_type_error: "Points must be a number" })
    .min(1, { message: "Points must be greater than 0." }),
});

type AddAssignmentModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAssignmentAdded: (assignment: any) => void;
  classId: string;
};

export function AddAssignmentModal({
  open,
  onOpenChange,
  onAssignmentAdded,
  classId,
}: AddAssignmentModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutate: createAssignment } = useCreateClassroomAssignments({
    classroomId: classId,
  });

  const form = useForm<z.infer<typeof assignmentFormSchema>>({
    resolver: zodResolver(assignmentFormSchema),
    defaultValues: {
      title: "",
      description: "",
      dueDate: "",
      points: 10,
    },
  });

  function onSubmit(values: z.infer<typeof assignmentFormSchema>) {
    setIsSubmitting(true);
    const newClassRoomAssigment = {
        title: values.title,
        description: values.description || "",
        due_date: values.dueDate,
        points: values.points,
    };
    createAssignment(
    newClassRoomAssigment,
    {
      onSuccess: (data) => {
        const toAddClassroomAssignment = {
      ...data,
      title: values.title,
      description: values.description || "",
      due_date: values.dueDate,
      points: values.points,
    };
    onAssignmentAdded(toAddClassroomAssignment);
    form.reset();
    setIsSubmitting(false);
    onOpenChange(false);
      },
        onError: (error) => {
          console.error("Error creating assignment:", error);
          setIsSubmitting(false);
        },
      }
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Assignment</DialogTitle>
          <DialogDescription>
            Create a new assignment for your class
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Homework 1" {...field} />
                  </FormControl>
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
                      placeholder="What is this assignment about?"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="points"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Points</FormLabel>
                  <FormControl>
                    <Input type="number" min={1} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Add Assignment
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
