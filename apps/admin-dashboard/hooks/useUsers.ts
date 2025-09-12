import { useGetResourcesQuery, usePaginationQuery } from "./helper/query";
import { useCreateResources } from "./helper/mutation";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "@/services/userService";
import { IQueryArgs } from "@/lib/types/query";
import { GetUsersRespones } from "@/lib/types/get-ussers";
import { User } from "@/types/users";

export function useUsers() {
  const AllUsers: IQueryArgs<GetUsersRespones> = {
    key: ["users"],
    callback: () => getUsers(),
  };
  return useGetResourcesQuery(AllUsers);
}

export function useUser(id: string) {
  const UserQuery: IQueryArgs<User> = {
    key: ["user", { id }],
    callback: () => getUser(id),
  };

  return useGetResourcesQuery(UserQuery);
}
