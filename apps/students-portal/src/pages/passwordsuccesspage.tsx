import Image from "next/image";
import logo from "../assets/logo.png";
import auth from "../assets/auth.png";
import successlogin from "../assets/successlogin.png"
import { useRouter } from "next/router";

export default function PasswordSuccessPage() {
   const router = useRouter()
  const handleRedirectToLogin = () => {
    router.push("/login")
    console.log("login")
  }
  return (
    <div className="bg-white grid grid-cols-1 md:grid-cols-2 h-screen">
      <div className="bg-background text-white hidden md:flex items-center justify-center">
        <div className="md:pt-[2.55rem] 2xl:mt-[37rem]">
          <Image
            src={auth}
            alt="User Avatar"
            className="mx-auto w-[100%] md:w-[100%]"
          />
        </div>
      </div>
      
      <div className=" md:px-[76px] pt-10 xsm:px-4">
        <div className="flex items-end flex-row justify-end w-full">
          <Image src={logo} alt="Futurelabs Logo" />
        </div>
        <div className="text-center 2xl:mt-[18rem]">
          <h2 className="text-2xl font-semibold mb-4 text-black pt-5">
            Password created!
          </h2>
          <div className="py-[24px] w-full max-w-[232px] mx-auto">
          <Image
            src={successlogin}
            alt="Success Icon"
            className="mx-auto mb-4"
          />
          </div>
          <p className="text-gray-600 text-sm mb-6">
            Your password has been created successfully. <br />
            Please go ahead to log in.
          </p>
          <button
            type="button"
            className="bg-background text-white py-3 px-6 rounded-md 
            hover:bg-background-dark focus:outline-none focus:ring
             focus:ring-blue-300 text-[20px] w-full max-w-[491px]"
            onClick={handleRedirectToLogin}
          >
            To Login
          </button>
        </div>
      </div>
    </div>
  );
}
