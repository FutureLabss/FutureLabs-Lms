import { setToken } from "@/core/config/api.config";
import { NotificationType } from "@/core/types/enum/notification";
import { AuthResponse, CreateUserProfile, ICreatePassword, ILogin, verifymail } from "@/core/types/interface/auth";
import useNotificationStore from "@/stores/notificationState";
import axios from "axios";
import router from "next/router";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  auth?: AuthResponse;
  login: (data: ILogin) => void;
  logout: (callback?: () => void) => void;
  islLoggedIn: boolean;
  loaded: boolean;
  CreatePassword: (data: ICreatePassword) => void;
  VerifyEmail: (data: verifymail) => void;
  SignUp:(userData: CreateUserProfile)=>void;
  resendEmailVerification:(profileId:string) => void;
}

const usersContext = createContext<AuthContextType>({
  auth: undefined,
  login: async () => { },
  logout: () => { },
  islLoggedIn: false,
  loaded: false,
  CreatePassword: () => { },
  VerifyEmail: () => { },
  SignUp: () => { },
  resendEmailVerification:()=>{ },
});

export default function AuthContext({ children }: { children: ReactNode }) {
  const [islLoggedIn, setILoggedIn] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [auth, setAuth] = useState<AuthResponse>();
  const setNotification = useNotificationStore((state) => state.displayNotification);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const tokens = JSON.parse(storedToken);
        if (tokens?.data.token) {
          setToken(tokens.data.token);
          setILoggedIn(true);
          setAuth(tokens.data);
        }
      } catch (error) {
        console.error("Error parsing JSON from localStorage:", error);
      }
    }
    setLoaded(true);
  }, []);


  const CreatePassword = async (data: ICreatePassword) => {
    const response = await axios.post("/auth/complete-registration", data)
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.data));
        setToken(res.data?.token);
        setAuth({ ...res.data });
        setILoggedIn(true);
        setNotification({
          type: NotificationType.success,
          content: {
            title: "Create Password Successful",
          },
        });
        router.push("/user");
      })
      .catch((e) => {
        const message = e.response?.data?.message || "Network Error";
        if (Array.isArray(message)) {
          const error = message.join("\n");
          throw new Error(error);
        }
        throw new Error(message);
      });
    return response;
  };
  const VerifyEmail = async (data: verifymail) => {
    const response = await axios.post("/verify/email", data)
      .then((res) => {
        console.log(res.data)
        localStorage.setItem("token", JSON.stringify(res.data));
        setToken(res.data?.token);
        setAuth({ ...res.data });
        setILoggedIn(true);
        setNotification({
          type: NotificationType.success,
          content: {
            title: "Verify email Successful",
          },
        });
        // return res?.data;
        // router.push("/passwordsuccesspage");
      })
      .catch((e) => {
        const message = e.response?.data?.message || "Network Error";
        if (Array.isArray(message)) {
          const error = message.join("\n");
          throw new Error(error);
        }
        throw new Error(message);
      });
    return response;
  };
  const resendEmailVerification = async ( profileId:string) => {
    const response = await axios.get(`/resend/email/verification/${profileId}}`)
      .then((res) => {
        console.log(res.data)
        localStorage.setItem("token", JSON.stringify(res.data));
        setToken(res.data?.token);
        setAuth({ ...res.data });
        setILoggedIn(true);
        setNotification({
          type: NotificationType.success,
          content: {
            title: "Please check your inbox and click on the link to verify your account.",
          },
        });
      })
      .catch((e) => {
        const message = e.response?.data?.message || "Network Error";
        if (Array.isArray(message)) {
          const error = message.join("\n");
          throw new Error(error);
        }
        throw new Error(message);
      });
    return response;
  };
  const login = async (data: ILogin) => {
    const Promise = await axios
      .post<AuthResponse>("/auth/login", data)
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.data));
        setToken(res.data?.data.token);
        setAuth({ ...res.data });
        setILoggedIn(true);
        setNotification({
          type: NotificationType.success,
          content: {
            title: "Login Successful",
            text: "Login Successful: Welcome back!",
          },
        });
        router.push("/user");
      })
      .catch((e) => {
        const message = e.response?.data?.message || "Network Error";
        if (Array.isArray(message)) {
          const error = message.join("\n");
          throw new Error(error);
        }
        throw new Error(message);
      });
    return Promise;
  };
  const SignUp = async(userData: CreateUserProfile)=>{
    const Promise = await axios.post("/auth/register", userData)
    .then((res) => {
      localStorage.setItem("token", JSON.stringify(res.data));
      setToken(res.data?.data.token);
      setAuth({ ...res.data });
      setNotification({
        type: NotificationType.success,
        content: {
          title: "Successful",
          text: "Account Created Successfully!",
        },
      });
      router.push(`/signup/accountcreated?email=${(userData?.email)}`);
      // router.push("/signup/accountcreated");
    })
    .catch((e) => {
      const message = e.response?.data?.message || "Network Error";
      if (Array.isArray(message)) {
        const error = message.join("\n");
        throw new Error(error);
      }
      throw new Error(message);
    });
    return Promise;
  }

  const logout = (callback?: () => void) => {
    localStorage.removeItem("token");
    setILoggedIn(false);
    if (callback) callback();
  };



  const value = { auth, login, logout, loaded, islLoggedIn, 
    CreatePassword, VerifyEmail, SignUp, resendEmailVerification };

  return <>{loaded ? <usersContext.Provider value={value}>{children}</usersContext.Provider> : <> </>}</>;
}
const useAuthContext = () => useContext(usersContext);
export { useAuthContext };
