import { getAllUsers } from "@/core/services/user";
import { IQueryArgs } from "@/core/types/interface/query";
import { useGetResourcesQuery } from "../helper/query";
import { IUsers } from "@/core/types/dto/users";

export function useGetAllUsers() {
    const Allusers: IQueryArgs<IUsers> = {
      key: ["users"],
      callback: () => getAllUsers(),
    };
    return useGetResourcesQuery(Allusers);
  }