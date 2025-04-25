"use client";

import type React from "react";

import { useState } from "react";
import { Calendar, FileText, Upload, X } from "lucide-react";

import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Textarea } from "@/shared/components/ui/textarea";
import { Separator } from "@/shared/components/ui/separator";
import { Progress } from "@/shared/components/ui/progress";
import { toast } from "@/shared/components/ui/use-toast";

interface AssignmentSubmissionDialogProps {
  assignment: {
    id: number;
    title: string;
    description: string;
    due_date: string;
    status: string;
    points: number;
    instructions?: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AssignmentSubmissionDialog({
  assignment,
  open,
  onOpenChange,
}: AssignmentSubmissionDialogProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Format date to be more readable
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (files.length === 0) {
      toast({
        title: "No files attached",
        description:
          "Please attach at least one file to submit your assignment.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    // Simulate API call
    setTimeout(() => {
      clearInterval(interval);
      setUploadProgress(100);

      setTimeout(() => {
        setIsSubmitting(false);
        setFiles([]);
        setComment("");
        setUploadProgress(0);

        toast({
          title: "Assignment submitted",
          description: "Your assignment has been submitted successfully.",
        });

        onOpenChange(false);
      }, 500);
    }, 3000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{assignment.title}</DialogTitle>
          <DialogDescription>
            View assignment details and submit your work before the due date.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm">
              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Due:</span>
              <span className="ml-1 font-medium">
                {formatDate(assignment.due_date)}
              </span>
            </div>
            <Badge
              variant={
                assignment.status === "completed" ? "default" : "outline"
              }
            >
              {assignment.status === "completed" ? "Completed" : "Pending"}
            </Badge>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-1">Description</h3>
            <p className="text-sm text-muted-foreground">
              {assignment.description}
            </p>
          </div>

          {assignment.instructions && (
            <div>
              <h3 className="text-sm font-medium mb-1">Instructions</h3>
              <p className="text-sm text-muted-foreground">
                {assignment.instructions}
              </p>
            </div>
          )}

          <Separator />

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Your Submission</h3>

                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <input
                    type="file"
                    id="file-upload"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                    disabled={isSubmitting}
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center cursor-pointer"
                  >
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm font-medium">Click to upload files</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PDF, DOCX, XLSX, ZIP, or images up to 10MB
                    </p>
                  </label>
                </div>

                {files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <h4 className="text-sm font-medium">Attached Files</h4>
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-slate-50 p-2 rounded-md"
                      >
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 text-muted-foreground mr-2" />
                          <span className="text-sm truncate max-w-[300px]">
                            {file.name}
                          </span>
                          <span className="text-xs text-muted-foreground ml-2">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => removeFile(index)}
                          disabled={isSubmitting}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">
                  Comments (Optional)
                </h3>
                <Textarea
                  placeholder="Add any comments about your submission..."
                  className="resize-none"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>

              {isSubmitting && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Assignment"}
                </Button>
              </DialogFooter>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
