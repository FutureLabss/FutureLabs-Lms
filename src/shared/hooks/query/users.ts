import { getAllUsers, getMeUserProfile, getSingleUserProfile } from "@/core/services/user";
import { IQueryArgs, IQueryOptions } from "@/core/types/interface/query";
import { useGetResourcesQuery } from "../helper/query";
import { IUsers } from "@/core/types/dto/users";
import { ApiMEResponse, ISingleUserData } from "@/core/types/dto/singleuser";

export function useGetAllUsers() {
  const Allusers: IQueryArgs<IUsers> = {
    key: ["users"],
    callback: () => getAllUsers(),
  };
  return useGetResourcesQuery(Allusers);
}

export function useGetSingleUsersprofile(id: string, options: IQueryOptions = {}) {
  const singleuser: IQueryArgs<ISingleUserData> = {
    key: ["userProfile", { id }],
    callback: () => getSingleUserProfile(id),
  };
  return useGetResourcesQuery(singleuser, options);
}

export function useGetMeprofile(options: IQueryOptions = {}) {
  const meuser: IQueryArgs<ApiMEResponse> = {
    key: ["getMe"],
    callback: () => getMeUserProfile(),
  };
  return useGetResourcesQuery(meuser, {...options,
    loadingConfig:{displayLoader:false}});
}
