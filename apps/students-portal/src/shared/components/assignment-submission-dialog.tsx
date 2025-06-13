"use client";

// import { DialogFooter } from "@/components/ui/dialog";

import type React from "react";

import { useState } from "react";
import { Calendar, FileText, Upload, X } from "lucide-react";
// import { uploadToCloudinary } from "./cloudinary-upload"; // Add this import

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
import { toast } from "sonner";
import { uploadToCloudinary } from "@/core/services/cloudinary";

interface AssignmentSubmissionDialogProps {
  assignment: {
    id: number;
    title: string;
    description: string;
    due_date: string;
    status?: string;
    points: number;
    instructions?: string;
    classroom?: string;
    created_date?: string;
    module?: string;
    topic?: string;
    updated_by?: string;
    submission?: {
      id: number;
      student: string;
      assignment_id: number;
      submitted_at: string;
      score: number;
      status: "submitted" | "not_submitted";
      grade_status: "pending" | "graded";
    };
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
  postAssignment: (data: IAssignmentSubmission) => void;
}

export interface IAssignmentSubmission {
  submission_text: string;
  file_path: string | null;
  public_id: string | null;
}

export function AssignmentSubmissionDialog({
  assignment,
  open,
  onOpenChange,
  postAssignment,
}: AssignmentSubmissionDialogProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<
    Array<{
      file: File;
      cloudinary: { secure_url: string; public_id: string } | null;
    }>
  >([]);

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

      // Initialize uploadedFiles entries for the new files
      setUploadedFiles((prev) => [
        ...prev,
        ...newFiles.map((file) => ({ file, cloudinary: null })),
      ]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);

      // Initialize uploadedFiles entries for the new files
      setUploadedFiles((prev) => [
        ...prev,
        ...newFiles.map((file) => ({ file, cloudinary: null })),
      ]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (files.length === 0) {
      toast.error("No files attached", {
        description:
          "Please attach at least one file to submit your assignment.",
      });
      return;
    }

    setIsSubmitting(true);
    setUploadProgress(0);

    try {
      // Upload each file to Cloudinary
      const totalFiles = files.length;
      let completedUploads = 0;

      const uploadPromises = files.map(async (file, index) => {
        try {
          const cloudinaryData = await uploadToCloudinary(file);

          // Update the uploadedFiles state with the Cloudinary data
          setUploadedFiles((prev) => {
            const newState = [...prev];
            if (newState[index]) {
              newState[index].cloudinary = cloudinaryData;
            }
            return newState;
          });

          completedUploads++;
          setUploadProgress(Math.round((completedUploads / totalFiles) * 100));

          return cloudinaryData;
        } catch (error) {
          console.error(`Error uploading ${file.name}:`, error);
          toast.error(`Failed to upload ${file.name}`, {
            description: "Please try again or choose a different file.",
          });
          throw error;
        }
      });

      // Wait for all uploads to complete
      const cloudinaryResults = await Promise.all(uploadPromises);

      // Prepare assignment submission object
      interface CloudinaryResult {
        secure_url: string;
        public_id: string;
      }

      // Use the first uploaded file's data, or null if none
      const firstResult: CloudinaryResult | undefined = cloudinaryResults[0];

      const submission: IAssignmentSubmission = {
        submission_text: comment,
        file_path: firstResult ? firstResult.secure_url : null,
        public_id: firstResult ? firstResult.public_id : null,
      };
      // Log the submission data that would be sent to the server
      console.log("Assignment submission data:", submission);

      // Simulate API call to submit the assignment with Cloudinary URLs
      postAssignment(submission);
      // setTimeout(() => {
      // toast("Assignment submitted", {
      //   description:
      //     "Your assignment has been submitted successfully with all files uploaded to Cloudinary.",
      // });
      setIsSubmitting(false);
      setFiles([]);
      setComment("");
      setUploadProgress(0);
      setUploadedFiles([]);

      onOpenChange(false);
    } catch (error) {
      console.error("Error during submission:", error);
      setIsSubmitting(false);
      toast.error("Submission failed", {
        description:
          "There was an error submitting your assignment. Please try again.",
      });
    }
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
                assignment?.submission?.status === "submitted"
                  ? "default"
                  : "outline"
              }
            >
              {assignment?.submission?.status === "submitted"
                ? "Completed"
                : "Pending"}
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

                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    isDragging
                      ? "border-primary bg-primary/5"
                      : "border-muted-foreground/25"
                  }`}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
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
                    <Upload
                      className={`h-8 w-8 mb-2 ${
                        isDragging ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                    <p className="text-sm font-medium">
                      {isDragging
                        ? "Drop files here"
                        : "Click to upload or drag & drop files"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PDF, DOCX, XLSX, ZIP, or images up to 10MB
                    </p>
                  </label>
                </div>

                {files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <h4 className="text-sm font-medium">Attached Files</h4>
                    {files.map((file, index) => {
                      const uploadedFile = uploadedFiles[index];
                      const isUploaded = uploadedFile?.cloudinary !== null;

                      return (
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
                            {isSubmitting && (
                              <span className="ml-2 text-xs">
                                {isUploaded ? (
                                  <span className="text-green-500">
                                    Uploaded
                                  </span>
                                ) : (
                                  <span className="text-amber-500">
                                    Uploading...
                                  </span>
                                )}
                              </span>
                            )}
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
                      );
                    })}
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
                <Button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    assignment?.submission?.status === "submitted"
                  }
                >
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
