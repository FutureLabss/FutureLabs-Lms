import axios, { AxiosResponse } from "axios";
import { IUsers } from "../types/dto/users";
import { handleError } from "@/shared/components/common/exception/catchErrors";
import { ApiMEResponse, ISingleUserData } from "../types/dto/singleuser";



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
// const meProfile = async () => {
//   try {
//     const response = await axios.get("/me");
//     if (!response.data) {
//       throw new Error("Unexpected response: data is null or undefined");
//     }
//     console.log("Response Data:", response.data);
//     return response.data;
//   } catch (e) {
//     const message = e.response?.data?.message || "Network Error";
//     if (Array.isArray(message)) {
//       throw new Error(message.join("\n"));
//     }
//     throw new Error(message);
//   }
// };

// meProfile()
// export async function getMeProfile(): Promise<ApiMEResponse> {
//   return axios
//     .get<ApiMEResponse>("/me")
//     .then((response: AxiosResponse<ApiMEResponse>) => {
//       return response.data;
//     })
//     .catch((e) =>{
//       const message = e.response?.data?.message || "Network Error";
//       if (Array.isArray(message)) {
//         const error = message.join("\n");
//         console.log({ error });
//         throw new Error(error);
//       }
//       throw new Error(message);
//     });
// }