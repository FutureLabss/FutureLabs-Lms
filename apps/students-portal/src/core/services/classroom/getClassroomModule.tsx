import axios, { AxiosResponse } from "axios";
import { NotificationType } from "@/core/types/enum/notification";
import useNotificationStore from "@/stores/notificationState";
import { ClassModulesApiResponse } from "@/core/types/interface/classroom.ts/getClassroomModule";

const setNotification = useNotificationStore.getState().displayNotification;

export async function getClassroomModules(
  id: string
): Promise<ClassModulesApiResponse> {
  return axios
    .get<ClassModulesApiResponse>(`/classrooms/${id}/modules`)
    .then((res: AxiosResponse<ClassModulesApiResponse>) => {
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
        throw new Error("Failed to retrieve classroom modules.");
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
