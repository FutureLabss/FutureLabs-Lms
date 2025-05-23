import { toast } from "sonner";
import axios, { AxiosResponse } from "axios";
import { AssignmentSubmissionDTO } from "@/core/types/interface/classroom.ts/moduleTopics";
import { IAssignmentSubmission } from "@/shared/components/assignment-submission-dialog";
export async function postAssignment({
  assignmentId,
  data,
}: {
  assignmentId: number;
  data: IAssignmentSubmission;
}): Promise<AssignmentSubmissionDTO> {
  return axios
    .post<AssignmentSubmissionDTO>(
      `/student/assignments/${assignmentId}/submit`,
      data
    )
    .then((res: AxiosResponse<AssignmentSubmissionDTO>) => res.data)
    .catch((error) => {
      if (error instanceof Error) {
        const errorMessage = error?.message || "Failed to post assignment.";
        toast.error(errorMessage, {
          description: "Something went wrong." + errorMessage,
        });
      }
      return Promise.reject(error);
    });
}
