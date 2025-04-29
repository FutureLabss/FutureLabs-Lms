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
  isLoggedIn: boolean;
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
  isLoggedIn: false,
  loaded: false,
  CreatePassword,
  VerifyEmail,
  SignUp,
  resendEmailVerification,
});

export default function AuthContext({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [auth, setAuth] = useState<AuthResponse>();

  useEffect(() => {
    const checkAuth = () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        try {
          const parsedToken = JSON.parse(storedToken);
          if (parsedToken?.data?.token) {
            setIsLoggedIn(true);
            setAuth(parsedToken.data);
          } else {
            localStorage.removeItem("token");
            setIsLoggedIn(false);
            setAuth(undefined);
          }
        } catch (error) {
          console.error("Error parsing token from localStorage:", error);
          localStorage.removeItem("token");
          setIsLoggedIn(false);
          setAuth(undefined);
        }
      }
      setLoaded(true);
    };

    checkAuth();
  }, []);

  const value = {
    auth,
    login,
    logout,
    loaded,
    isLoggedIn,
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
        <div>Loading...</div>
      )}
    </>
  );
}

const useAuthContext = () => useContext(usersContext);
export { useAuthContext };
