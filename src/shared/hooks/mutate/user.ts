import { editUserProfile } from "@/core/services/user";
import { EditUserProfileData } from "@/core/types/dto/singleuser";
import { IQueryOptions, IQueryArgs, IMutationHook, IMutationArgs } from "@/core/types/interface/query";
import { useCreateResources } from "../helper/mutation";

export function useEditUserProfile(profileId:string,  { onSuccess, onError, options }: IMutationHook) {
    const mutation: IMutationArgs<EditUserProfileData, EditUserProfileData> = {
        key: ["edit"],
        callback: (data:EditUserProfileData,) => editUserProfile(profileId, data),
        onSuccess: onSuccess,
        onError: onError,
        options,
    };
    return useCreateResources(mutation);
  }