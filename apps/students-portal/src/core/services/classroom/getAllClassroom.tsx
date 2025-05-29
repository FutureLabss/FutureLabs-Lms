import axios, { AxiosError, AxiosResponse } from "axios";
import { NotificationType } from "@/core/types/enum/notification";
import useNotificationStore from "@/stores/notificationState";
// import { GetAllClassroom } from "@/core/types/interface/classroom.ts/getAllClassroom";
import { GetAllClassroomResponse } from "@/core/types/interface/classroom.ts/getAllClassroom";

const setNotification = useNotificationStore.getState().displayNotification;

export async function getAllClassroom(): Promise<GetAllClassroomResponse> {
  return axios
    .get<GetAllClassroomResponse>("/classrooms")
    .then((res: AxiosResponse<GetAllClassroomResponse>) => {
      if (res.status === 200) {
        // setNotification({
        //   type: NotificationType.success,
        //   content: {
        //     title: "Success",
        //     text: "Classroom data retrieved successfully.",
        //   },
        // });
        return res.data;
      } else {
        throw new Error("Failed to retrieve classroom data.");
      }
    })
    .catch((error) => {
      console.log("allClaroom eror", error);
      if (error instanceof AxiosError) {
        const errorMessage = error?.message || "An unknown error occurred.";
        setNotification({
          type: NotificationType.error,
          content: { title: "Error", text: errorMessage },
        });
      }
      return Promise.reject(error);
    });
}
