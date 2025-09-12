import { createUser, deleteUser, updateUser } from "@/services/userService";
import { useCreateResources } from "../helper/mutation";
import { User } from "../../lib/types/types";

export function useCreateUser() {
  return useCreateResources<Omit<User, "id">, User, unknown>({
    key: ["users"],
    callback: (user) => createUser(user),
  });
}

// export function useUpdateUser() {
//   return useCreateResources<{ id: string; user: Partial<User> }, User, unknown>(
//     {
//       key: ["users"],
//       callback: ({ id, user }) => updateUser(id, user),
//     }
//   );
// }
export function useUpdateUser() {
  return useCreateResources<{ id: string; user: Partial<User> }, User, unknown>(
    {
      key: ["users"],
      callback: ({ id, user }) => updateUser(id, user),
    }
  );
}

export function useDeleteUser() {
  return useCreateResources<string, { message: string }, unknown>({
    key: ["users"],
    callback: (id) => deleteUser(id),
  });
}
