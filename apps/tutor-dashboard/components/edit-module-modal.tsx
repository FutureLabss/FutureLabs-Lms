"use client";

import { useState, useEffect } from "react";
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

const moduleFormSchema = z.object({
  title: z.string().min(2, {
    message: "Module title must be at least 2 characters.",
  }),
  description: z.string().optional(),
});

type EditModuleModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onModuleUpdated: (module: any) => void;
  module: any | null;
};

export function EditModuleModal({
  open,
  onOpenChange,
  onModuleUpdated,
  module,
}: EditModuleModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof moduleFormSchema>>({
    resolver: zodResolver(moduleFormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  // Update form values when module changes
  useEffect(() => {
    if (module && open) {
      form.reset({
        title: module.title,
        description: module.description || "",
      });
    }
  }, [module, form, open]);

  function onSubmit(values: z.infer<typeof moduleFormSchema>) {
    if (!module) return;

    setIsSubmitting(true);

    // Simulate API call with a timeout
    setTimeout(() => {
      // Create an updated module object
      const updatedModule = {
        ...module,
        title: values.title,
        description: values.description || "",
      };

      // Call the callback with the updated module
      onModuleUpdated(updatedModule);

      // Reset state
      setIsSubmitting(false);

      // Close the modal
      onOpenChange(false);
    }, 1000);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Module</DialogTitle>
          <DialogDescription>
            Update the details of this module
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
                Update Module
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
