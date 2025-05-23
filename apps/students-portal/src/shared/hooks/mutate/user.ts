import { editUserProfile } from "@/core/services/user";
import { EditUserProfileData } from "@/core/types/dto/singleuser";
import { IMutationHook, IMutationArgs } from "@/core/types/interface/query";
import { useCreateResources } from "../helper/mutation";
import { postAssignment } from "@/core/services/classroom/postAssigment";
import { IAssignmentSubmission } from "@/shared/components/assignment-submission-dialog";
import { AssignmentSubmissionDTO } from "@/core/types/interface/classroom.ts/moduleTopics";

export function useEditUserProfile(profileId: string, { onSuccess, onError, options }: IMutationHook) {
    const mutation: IMutationArgs<EditUserProfileData, EditUserProfileData> = {
        key: ["useredit"],
        callback: (data: EditUserProfileData,) => editUserProfile(profileId, data),
        onSuccess: onSuccess,
        onError: onError,
        options,
    };
    return useCreateResources(mutation);
}


export function usePostAssignments(
    assignmentId: number,
    { onSuccess, onError, options }: IMutationHook
) {
    const mutation: IMutationArgs<IAssignmentSubmission, AssignmentSubmissionDTO> = {
        key: ["classroomAssignment", { assignmentId }],
        callback: (data: IAssignmentSubmission) =>
            postAssignment({ assignmentId, data }),
        onSuccess: onSuccess,
        onError: onError,
        options,
    };
    return useCreateResources(mutation);
}