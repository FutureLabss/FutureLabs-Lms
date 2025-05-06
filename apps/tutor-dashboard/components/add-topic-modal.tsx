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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useCreateClassroomModulesTopic } from "@/hooks/mutate/classroom";
import { log } from "console";

const topicFormSchema = z.object({
  title: z.string().min(2, {
    message: "Topic title must be at least 2 characters.",
  }),
  description: z.string().optional(),
  // type: z.enum(["lesson", "quiz", "assignment", "resource"], {
  //   required_error: "Please select a topic type.",
  // }),
  duration: z.coerce.number().min(1, {
    message: "Duration must be at least 1 minute.",
  }),
});

type AddTopicModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTopicAdded: (topic: any) => void;
  moduleId?: string | null;
  classroomId?: string | null;
};

export function AddTopicModal({
  open,
  onOpenChange,
  onTopicAdded,
  classroomId,
  moduleId,
}: AddTopicModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate: createTopics } = useCreateClassroomModulesTopic({
    onSuccess(data) {},
    onError(error) {},
    classroomId: classroomId,
    moduleId: moduleId,
  });
  // console.log(createTopics);
  const form = useForm<z.infer<typeof topicFormSchema>>({
    resolver: zodResolver(topicFormSchema),
    defaultValues: {
      title: "",
      description: "",
      // type: "lesson",
      duration: 60,
    },
  });

  function onSubmit(values: z.infer<typeof topicFormSchema>) {
    if (!moduleId) return;
    setIsSubmitting(true);
    createTopics(
      {
        title: values.title,
        description: values.description,
        duration: values.duration,
      },
      {
        onSuccess: (data) => {
          // Call the callback with the new module
          onTopicAdded(data); // Assuming the API returns the created module

          // Reset form and state
          form.reset();
          setIsSubmitting(false);

          // Close the modal
          onOpenChange(false);
        },
        onError: (error) => {
          // Handle error (you might want to show a toast notification)
          console.error("Error creating module:", error);
          setIsSubmitting(false);
        },
      }
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Topic</DialogTitle>
          <DialogDescription>
            Create a new topic for this module
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Topic Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Introduction to Derivatives"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    A descriptive name for this topic.
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
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide a brief description of this topic"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    A short description of what this topic covers.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration (minutes)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>
                      Estimated time to complete this topic.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="pt-4">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="mr-2"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Add Topic
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
