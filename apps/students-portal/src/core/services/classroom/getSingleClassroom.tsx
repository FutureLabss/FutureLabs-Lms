import axios, { AxiosResponse } from "axios";
import { NotificationType } from "@/core/types/enum/notification";
import useNotificationStore from "@/stores/notificationState";
// import { GetAllClassroom } from "@/core/types/interface/classroom.ts/getAllClassroom";
// import { GetAllClassroomResponse } from "@/core/types/interface/classroom.ts/getAllClassroom";
import { SingleClassroomResponse } from "@/core/types/interface/classroom.ts/getSingleClassroom";

const setNotification = useNotificationStore.getState().displayNotification;

export async function getSingleClassroom(
  id: string
): Promise<SingleClassroomResponse> {
  return axios
    .get<SingleClassroomResponse>(`/classrooms/${id}`)
    .then((res: AxiosResponse<SingleClassroomResponse>) => {
      if (res.status === 200) {
        // setNotification({
        //   type: NotificationType.success,
        //   content: {
        //     title: "Success",
        //     text: "Classroom datails retrieved successfully.",
        //   },
        // });
        return res.data;
      } else {
        throw new Error("Failed to retrieve classroom datails.");
      }
    })
    .catch((error) => {
      const errorMessage = error?.response?.data?.message;
      if (errorMessage) {
        setNotification({
          type: NotificationType.error,
          content: { title: "Error", text: errorMessage },
        });
      } else {
        setNotification({
          type: NotificationType.error,
          content: { title: "Error", text: "An unknown error occurred." },
        });
      }
      return Promise.reject(error);
    });
}
