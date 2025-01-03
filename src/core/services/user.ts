import axios, { AxiosResponse } from "axios";
import { IUsers } from "../types/dto/users";
import { handleError } from "@/shared/components/common/exception/catchErrors";

export async function getAllUsers(): Promise<IUsers> {
    return axios
      .get<IUsers>("/service/learn")
      .then((response: AxiosResponse<IUsers>) => {
        // console.log(response.data);
        return response.data;
      })
      .catch(handleError);
  }