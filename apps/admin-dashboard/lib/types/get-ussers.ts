import { User } from "./types";
export interface AddUsers {
  id: number;
  fullname: string;
  email: string;
  joined: string;
}

export interface GetUsersRespones {
  message: string;
  data: User[];
}

export interface AddUsersRespones {
  message: string;
  not_added: string;
}
