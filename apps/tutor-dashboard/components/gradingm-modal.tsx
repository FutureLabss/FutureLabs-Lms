import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { GradeStatus, SubmittedAssignment } from "@/lib/types/classroom";
import { SetStateAction, useState } from "react";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import { Loader2 } from "lucide-react";

type GradingModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  submission: SubmittedAssignment;
  onGradeSubmit: (score: number, gradeStatus: GradeStatus, feedback?: string) => void;
  maxPoints: number;
  isSubmitting?: boolean;
};
const statusOptions: GradeStatus[] = ['graded', 'pending', 'rejected', 'cancelled'];

function GradingModal({
  open,
  onOpenChange,
  submission,
  onGradeSubmit,
  maxPoints,
  isSubmitting,
}: GradingModalProps) {
  const [score, setScore] = useState<string>(
    submission.score !== "N/A" ? submission.score.toString() : ""
  );
  const [feedback, setFeedback] = useState<string>("");
  const [gradeStatus, setGradeStatus] = useState<GradeStatus>(
    submission.grade_status === "pending" ? "pending" : "graded"
  );
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const numericScore = parseFloat(score);
    if (isNaN(numericScore) || numericScore < 0 || numericScore > maxPoints) {
      return;
    }
    onGradeSubmit(numericScore, gradeStatus, feedback);
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Grade Assignment</DialogTitle>
          <DialogDescription>
            Grading submission by {submission.student.fullname}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="score">Score (out of {maxPoints})</Label>
              <Input
                id="score"
                type="number"
                min="0"
                max={maxPoints}
                step="0.1"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                required
              />
            </div>
            <div>
              <Label>Grade Status</Label>
              <div className="flex flex-wrap gap-4 mt-2">
                {statusOptions.map((status) => (
                  <label key={status} className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={gradeStatus === status}
                      onChange={() => setGradeStatus(status)}
                      className="h-4 w-4"
                    />
                    <Badge variant={getStatusVariant(status)}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Badge>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="feedback">Feedback (optional)</Label>
              <Textarea
                id="feedback"
                value={feedback}
                onChange={(e: { target: { value: SetStateAction<string>; }; }) => setFeedback(e.target.value)}
                placeholder="Add feedback for the student..."
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Submit Grade
                {/* {isSubmitting ? "Submitting..." : "Submit Grade"} */}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
export default GradingModal;