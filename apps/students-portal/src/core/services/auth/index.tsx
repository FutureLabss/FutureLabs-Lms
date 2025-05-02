import axios from "axios";
import { setToken } from "@/core/config/api.config";
import { NotificationType } from "@/core/types/enum/notification";
import {
  AuthResponse,
  CreateUserProfile,
  ICreatePassword,
  ILogin,
  verifymail,
} from "@/core/types/interface/auth";
import useNotificationStore from "@/stores/notificationState";
// import { useRouter } from "next/router";
import { handleError } from "@/shared/components/common/exception/catchErrors";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

const setNotification = useNotificationStore.getState().displayNotification;

export const login = async (data: ILogin) => {
  return axios
    .post<AuthResponse>("/auth/login", data)
    .then((res) => {
      // console.log(res);
      if (res.status === 200 && res.data?.data?.token) {
        const token = res.data.data.token;
        localStorage.setItem("token", JSON.stringify({ data: { token } }));
        localStorage.setItem("studentProfile", JSON.stringify(res.data.data));

        setToken(token);
        setNotification({
          type: NotificationType.success,
          content: {
            title: "Login Successful",
            text: "Login Successful: Welcome back!",
          },
        });
        // Return the response data and let the component handle the navigation
        return res.data;
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
};

export const SignUp = async (userData: CreateUserProfile) => {
  return axios
    .post("/auth/register", userData)
    .then((res) => {
      localStorage.setItem("token", JSON.stringify(res.data));
      // console.log(res.status, "SignUp Response");
      if (res.status === 200) {
        // setToken(res.data?.data.token);
        setNotification({
          type: NotificationType.success,
          content: {
            title: "Successful",
            text: "Account Created Successfully!",
          },
        });
        // router.push(`/signup/accountcreated?email=${userData?.email}`);
        return res.data;
      }
      // setNotification({
      //   type: NotificationType.success,
      //   content: {
      //     title: "Successful",
      //     text: "Account Created Successfully!",
      //   },
      // });
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
};

export const CreatePassword = async (data: ICreatePassword) => {
  return axios
    .post("/auth/complete-registration", data)
    .then((res) => {
      if (res.status === 201 && res.data?.data?.token) {
        const token = res.data.data.token;
        localStorage.setItem("token", JSON.stringify({ data: { token } }));
        setToken(token);
        setNotification({
          type: NotificationType.success,
          content: { title: "Create Password Successful" },
        });
        // router.push("/user");
        return res.data;
      }
    })
    .catch(handleError);
};

export const VerifyEmail = async (data: verifymail) => {
  return axios
    .post("/verify/email", data)
    .then((res) => {
      localStorage.setItem("token", JSON.stringify(res.data));
      setToken(res.data?.token);
      setNotification({
        type: NotificationType.success,
        content: { title: "Verify Email Successful" },
      });
      return res.data;
    })
    .catch(handleError);
};

export const resendEmailVerification = async (profileId: string) => {
  return axios
    .get(`/resend/email/verification/${profileId}`)
    .then((res) => {
      setNotification({
        type: NotificationType.success,
        content: {
          title:
            "Please check your inbox and click on the link to verify your account.",
        },
      });
      return res.data;
    })
    .catch(handleError);
};

export const logout = (callback?: () => void) => {
  localStorage.removeItem("token");
  localStorage.removeItem("studentProfile");
  queryClient.removeQueries();
  if (callback) callback();
};
