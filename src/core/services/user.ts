import axios, { AxiosResponse } from "axios";
import { IUsers } from "../types/dto/users";
import { handleError } from "@/shared/components/common/exception/catchErrors";
import { ISingleUserData } from "../types/dto/singleuser";

export async function getAllUsers(): Promise<IUsers> {
    return axios
      .get<IUsers>("/service/learn")
      .then((response: AxiosResponse<IUsers>) => {
        return response.data;
      })
      .catch(handleError);
  }

  export async function getSingleUser(id: string): Promise<ISingleUserData> {
    return axios
      .get<ISingleUserData>(`/profile/${id}`)
      .then((response: AxiosResponse<ISingleUserData>) => {
        return response.data;
      })
      .catch((e) => {
        const message = e.response?.data?.message || "Network Error";
        if (Array.isArray(message)) {
          const error = message.join("\n");
          console.log({ error });
          throw new Error(error);
        }
        throw new Error(message);
      });
  }