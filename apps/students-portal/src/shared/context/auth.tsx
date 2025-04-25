import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthResponse } from "@/core/types/interface/auth";
import {
  login,
  logout,
  CreatePassword,
  VerifyEmail,
  SignUp,
  resendEmailVerification,
} from "../../core/services/auth";

interface AuthContextType {
  auth?: AuthResponse;
  login: typeof login;
  logout: typeof logout;
  islLoggedIn: boolean;
  loaded: boolean;
  CreatePassword: typeof CreatePassword;
  VerifyEmail: typeof VerifyEmail;
  SignUp: typeof SignUp;
  resendEmailVerification: typeof resendEmailVerification;
}

const usersContext = createContext<AuthContextType>({
  auth: undefined,
  login,
  logout,
  islLoggedIn: false,
  loaded: false,
  CreatePassword,
  VerifyEmail,
  SignUp,
  resendEmailVerification,
});

export default function AuthContext({ children }: { children: ReactNode }) {
  const [islLoggedIn, setILoggedIn] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [auth, setAuth] = useState<AuthResponse>();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const tokens = JSON.parse(storedToken);
        if (tokens.data?.token) {
          setILoggedIn(true);
          setAuth(tokens.data);
        }
      } catch (error) {
        console.error("Error parsing JSON from localStorage:", error);
      }
    }
    setLoaded(true);
  }, []);

  const value = {
    auth,
    login,
    logout,
    loaded,
    islLoggedIn,
    CreatePassword,
    VerifyEmail,
    SignUp,
    resendEmailVerification,
  };

  return (
    <>
      {loaded ? (
        <usersContext.Provider value={value}>{children}</usersContext.Provider>
      ) : (
        <></>
      )}
    </>
  );
}

const useAuthContext = () => useContext(usersContext);
export { useAuthContext };
