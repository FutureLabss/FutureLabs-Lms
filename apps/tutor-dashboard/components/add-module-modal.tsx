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
  import { useCreateClassroomModules } from "@/hooks/mutate/classroom";

  const moduleFormSchema = z.object({
    title: z.string().min(2, {
      message: "Module title must be at least 2 characters.",
    }),
    description: z.string().optional(),
  });

  type AddModuleModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onModuleAdded: (module: any) => void;
    classId: string;
  };

  export function AddModuleModal({
    open,
    onOpenChange,
    onModuleAdded,
    classId,
  }: AddModuleModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
  const {mutate: createModules}=useCreateClassroomModules({
    onSuccess(data) {},
    onError(error) {},
    classroomId: classId
  })
  console.log(createModules, "cretae modulues")
    const form = useForm<z.infer<typeof moduleFormSchema>>({
      resolver: zodResolver(moduleFormSchema),
      defaultValues: {
        title: "",
        description: "",
      },
    });

    function onSubmit(values: z.infer<typeof moduleFormSchema>) {
      setIsSubmitting(true);
      
      // Call the mutation instead of using setTimeout
      createModules({
        title: values.title,
        description: values.description || "",
        // Include any other required fields for your API
      }, {
        onSuccess: (data) => {
          // Call the callback with the new module
          onModuleAdded(data); // Assuming the API returns the created module
          
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
        }
      });
    }

    // function onSubmit(values: z.infer<typeof moduleFormSchema>) {
    //   setIsSubmitting(true);

    //   // Simulate API call with a timeout
    //   setTimeout(() => {
    //     // Create a new module object
    //     const newModule = {
    //       id: Math.floor(Math.random() * 1000).toString(), // Generate a random ID for demo purposes
    //       title: values.title,
    //       description: values.description || "",
    //       order: Date.now(), // Use timestamp for ordering
    //       topics: [], // Initialize with empty topics array
    //     };

    //     // Call the callback with the new module
    //     onModuleAdded(newModule);

    //     // Reset form and state
    //     form.reset();
    //     setIsSubmitting(false);

    //     // Close the modal
    //     onOpenChange(false);
    //   }, 1000);
    // }

    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add Module</DialogTitle>
            <DialogDescription>
              Create a new module to organize your class content
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Module Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Introduction to Calculus"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      A descriptive name for this module.
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
                        placeholder="Provide a brief description of this module"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      A short description of what this module covers.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                  Add Module
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
  }