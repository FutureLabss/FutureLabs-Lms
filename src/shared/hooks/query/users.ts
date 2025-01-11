import { getAllUsers, getSingleUser } from "@/core/services/user";
import { IQueryArgs, IQueryOptions } from "@/core/types/interface/query";
import { useGetResourcesQuery } from "../helper/query";
import { IUsers } from "@/core/types/dto/users";
import { ISingleUserData } from "@/core/types/dto/singleuser";

export function useGetAllUsers() {
    const Allusers: IQueryArgs<IUsers> = {
      key: ["users"],
      callback: () => getAllUsers(),
    };
    return useGetResourcesQuery(Allusers);
  }

//   export function useGetSingleUsersAcount(id: string, options: IQueryOptions = {}) {
//   const singleuser: IQueryArgs<ISingleUserData> = {
//     key: ["singleuser", { id }],
//     callback: () => getSingleUser(id),
//   };
//   return useGetResourcesQuery(singleuser, options);
// }