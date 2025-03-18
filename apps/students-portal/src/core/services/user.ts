import axios, { AxiosResponse } from "axios";
import { IUsers } from "../types/dto/users";
import { handleError } from "@/shared/components/common/exception/catchErrors";
import { ApiMEResponse, EditUserProfileData, ISingleUserData } from "../types/dto/singleuser";

export async function getAllUsers(): Promise<IUsers[]> {
  return axios
    .get<IUsers[]>("/service/learn")
    .then((response: AxiosResponse<IUsers[]>) => {
      return response.data;
    })
    .catch(handleError);
}


export async function getSingleUserProfile(id: string): Promise<ISingleUserData> {
  return axios
    .get<ISingleUserData>(`/profile/${id}`)
    .then((response: AxiosResponse<ISingleUserData>) => {
      return response.data;
    })
    .catch((e) =>{
      const message = e.response?.data?.message || "Network Error";
      if (Array.isArray(message)) {
        const error = message.join("\n");
        console.log({ error });
        throw new Error(error);
      }
      throw new Error(message);
    });
}
export async function getMeUserProfile(): Promise<ApiMEResponse> {
  return axios
    .get<ApiMEResponse>("/me")
    .then((response: AxiosResponse<ApiMEResponse>) => {
      return response.data;
    })
    .catch(handleError);
}

export async function editUserProfile(profileId: string, formData: EditUserProfileData): Promise<EditUserProfileData> {
return axios.post<EditUserProfileData>(`profile/${profileId}`, formData,)
.then((response: AxiosResponse<EditUserProfileData>)=>{
  return response.data
}).catch(handleError);
  }



