import axios, { AxiosResponse } from "axios";
import { IUsers } from "../types/dto/users";
import { handleError } from "@/shared/components/common/exception/catchErrors";
import { ApiMEResponse, EditUserProfileData, ISingleUserData } from "../types/dto/singleuser";
import { METHODS } from "http";



export async function getAllUsers(): Promise<IUsers> {
  return axios
    .get<IUsers>("/service/learn")
    .then((response: AxiosResponse<IUsers>) => {
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
  try {
    const response = await axios.post<EditUserProfileData>(
      `profile/${profileId}`,
      formData,
      {
        params: {
          _method: "PUT"
        }
      }
    );
    return response.data;
  } catch (e: any) {
    const message = e.response?.data?.message || "Network Error";
    if (Array.isArray(message)) {
      const error = message.join("\n");
      console.error({ error });
      throw new Error(error);
    }
    throw new Error(message);
  }
}

// export async function editUserProfile(
//   profileId: string | undefined,
//   formData: EditUserProfileData,
// ): Promise<EditUserProfileData> {
//   if (!profileId) {
//     console.error("Profile ID is undefined")
//     throw new Error("Profile ID is required")
//   }

//   try {
//     const response = await axios.post<EditUserProfileData>(`profile/${profileId}`, formData, {
//       params: {
//         _method: "PUT",
//       },
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     })
//     return response.data
//   } catch (e: any) {
//     if (axios.isAxiosError(e)) {
//       const message = e.response?.data?.message || e.message
//       console.error("API Error:", message)
//       if (Array.isArray(message)) {
//         throw new Error(message.join("\n"))
//       }
//       throw new Error(message)
//     }
//     console.error("Unexpected Error:", e)
//     throw new Error("An unexpected error occurred")
//   }
// }



