import { useGetAllClassroomAssignments } from "@/hooks/query/classroom";
import { GradeStatus, SubmittedAssignment } from "@/lib/types/classroom";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import GradingModal from "./gradingm-modal";
import { Button } from "./ui/button";
import { usegradingstudentsubmittedassignment } from "@/hooks/mutate/classroom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
type ViewSubmittedAssignmentsModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  classId: string;
  assignmentId: string;
};

export function ViewSubmittedAssignmentsModal({
  open,
  onOpenChange,
  classId,
  assignmentId,
}: ViewSubmittedAssignmentsModalProps) {
  const { data, isLoading, error, refetch: refetchSubmissions, isFetching,   } = useGetAllClassroomAssignments(
    classId, 
    !!classId, 
    "submissions"
  );
  
  const submissions = (data?.data || []) as SubmittedAssignment[];
  const [gradingModalOpen, setGradingModalOpen] = useState(false);
  const [localSubmissions, setLocalSubmissions] = useState<SubmittedAssignment[]>([]);
  const [currentSubmission, setCurrentSubmission] = useState<SubmittedAssignment>();
const { mutate: gradeSubmission, isLoading: isMutating } = usegradingstudentsubmittedassignment({
  assignmentId: currentSubmission?.id,
  onSuccess: () => {
    console.log("Grade submitted successfully");
    setGradingModalOpen(false);
    refetchSubmissions();
  },
  onError: (error) => {
    console.error("Error submitting grade:", error);
  }
});
//  const { mutate: gradeSubmission, isLoading: isMutating, } = usegradingstudentsubmittedassignment({
//   assignmentId: currentSubmission?.id,
//  onSuccess: () => {
//     console.log("Grade submitted successfully");
//     setGradingModalOpen(false);
//   },
//   onError: (error) => {
//     console.error("Error submitting grade:", error);
//   }
// });

  const handleGradeClick = (submission: SubmittedAssignment) => {
    setCurrentSubmission(submission);
    setGradingModalOpen(true);
  };

const handleGradeSubmit = async (score: number, gradeStatus: GradeStatus, feedback?: string) => {
  if (!currentSubmission) return false;
  
  const gradeData = {
    score,
    grade_status: gradeStatus,
    feedback: feedback,
  };
  
  try {
    await gradeSubmission(gradeData); 
    return true;
  } catch (error) {
    console.error("Error submitting grade:", error);
    return false;
  }
};

//  const handleGradeSubmit = async (score: number, gradeStatus: GradeStatus, feedback?: string) => {
//     if (!currentSubmission) return;
//     const gradeData = {
//     score,
//     grade_status: gradeStatus,
//     feedback: feedback,
//   };
//     await gradeSubmission(gradeData);
//   };

  const filteredSubmissions = submissions.filter(
    submission => submission.assignment.id.toString() === assignmentId.toString()
  );

  const renderFilePreview = (filePath: string) => {
    if (!filePath || filePath === "N/A") return null;
    
    let fileType = "File";
    if (filePath.includes('image/upload')) fileType = "Image";
    else if (filePath.includes('video/upload')) fileType = "Video";

    return (
      <a
        href={filePath}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-blue-600 underline hover:text-blue-800"
      >
        View {fileType} (opens in new tab)
      </a>
    );
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'graded': return 'default';
      case 'pending': return 'secondary';
      case 'rejected': return 'destructive';
      case 'cancelled': return 'outline';
      default: return 'outline';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'graded': return 'Graded';
      case 'pending': return 'Pending Review';
      case 'rejected': return 'Rejected';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[800px] overflow-y-auto max-h-[80vh]  ">
          <DialogHeader className="space-y-3">
            <DialogTitle>Assignment Submissions</DialogTitle>
            <DialogDescription>
              {filteredSubmissions.length > 0 && (
                <span className="font-medium">
                  {filteredSubmissions[0].assignment.title}
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <p>Loading submissions...</p>
              </div>
            ) : error ? (
              <div className="text-center py-8 text-destructive">
                Error loading submissions
              </div>
            ) : filteredSubmissions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No submissions found for this assignment.
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Assignment Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Due Date</p>
                      <p>{new Date(filteredSubmissions[0].assignment.due_date).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Classroom</p>
                      <p>{filteredSubmissions[0].assignment.classroom}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Created By</p>
                      <p>{filteredSubmissions[0].assignment.created_by}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-muted-foreground">Description</p>
                      <p>{filteredSubmissions[0].assignment.description}</p>
                    </div>
                  </div>
                </div>
                <Separator />
                <div>
                  <h3 className="font-medium mb-4">Student Submissions ({filteredSubmissions.length})</h3>
                  <div className="space-y-4">
                    {filteredSubmissions.map((submission) => (
                      <div
                        key={submission.id}
                        className="border rounded-lg p-4"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="font-medium">{submission.student.fullname}</h4>
                            <p className="text-sm text-muted-foreground">
                              {submission.student.email}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Submitted: {new Date(submission.submitted_at).toLocaleString()}
                            </p>
                            
                          </div>
                          <div>
                      <p className="text-muted-foreground">Total Points</p>
                      <p>{filteredSubmissions[0].assignment.points}</p>
                    </div>
                          <div className="flex gap-2">
                            <Badge variant={submission.late_submission ? "destructive" : "outline"}>
                              {submission.late_submission ? "Late" : "On Time"}
                            </Badge>
                            <Badge variant={getStatusVariant(submission.grade_status)}>
                              {getStatusText(submission.grade_status)}
                            </Badge>
                          </div>
                        </div>
                        {submission.submission_text && (
                          <div className="mb-4">
                            <h5 className="text-sm font-medium mb-1">Submission Text</h5>
                            <p className="text-sm bg-gray-50 p-3 rounded">
                              {submission.submission_text}
                            </p>
                          </div>
                        )}
                        {submission.file_path && submission.file_path !== "N/A" && (
                          <div className="mb-4">
                            <h5 className="text-sm font-medium mb-1">Submission File</h5>
                            <div className="mt-2">
                              {renderFilePreview(submission.file_path)}
                            </div>
                          </div>
                        )}
                        <div className="flex justify-between items-center">
                          <div>
                            {submission.grade_status === "graded" ? (
                              <div className="flex items-center gap-4">
                                <div>
                                  <p className="text-sm text-muted-foreground">Score</p>
                                  <p className="font-medium">
                                    {submission.score} / {submission.assignment.points}
                                  </p>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleGradeClick(submission)}
                                >
                                  Update Grade
                                </Button>
                              </div>
                            ) : (
                              <Button
                                variant="default"
                                size="sm"
                                onClick={() => handleGradeClick(submission)}
                              >
                                Grade Assignment
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {currentSubmission && (
        <GradingModal
          open={gradingModalOpen}
          onOpenChange={setGradingModalOpen}
          submission={currentSubmission}
          onGradeSubmit={handleGradeSubmit}
          maxPoints={currentSubmission.assignment.points}
          isSubmitting={isMutating}
        />
      )}
    </>
  );
}