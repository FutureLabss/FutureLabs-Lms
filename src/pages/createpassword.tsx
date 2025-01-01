import Image from "next/image";
import logo from "../assets/logo.png";
import auth from "../assets/auth.png";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/router";

export default function CreatePasswordPage() {
  const [hidePassword, setHidePassword] = useState(false);
  const router = useRouter()
  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };
  const handleRedirectToSuccessPage =()=>{
    console.log("createPassword")
    router.push("/passwordsuccesspage")
  }
  return (
    <div className="bg-white grid grid-cols-1 md:grid-cols-2 ">
      <div className="bg-background text-white md:px-[75px]">
        <div className="md:pt-[2.55rem]">
          <Image
            src={auth}
            alt="User Avatar"
            className="mx-auto w-[100%] md:w-[100%]"
          />
        </div>
      </div>
      <div className="md:px-[76px]">
        <div className="pt-[30px] pb-[20px] flex items-end flex-row justify-end">
          <Image src={logo} alt="Futurelabs Logo" />
        </div>
        <div className="p-5 mx-auto md:mt-[5rem]">
          <h2 className="text-2xl font-semibold mb-6 text-black">
            Create password
          </h2>
          <form
          className="flex flex-col gap-10"
          >
            {/* Email Field */}
            <input
              type="email"
              placeholder="Johndoe@gmail.com"
              className="w-full rounded-md py-3 px-3 mb-4 bg-white outline-gray-400 border focus:outline-none focus:border-background"
            />

            {/* Password Field */}
            <div className="relative mb-4">
              <input
                name="password"
                type={hidePassword ? "text" : "password"}
                placeholder="Enter password"
                className="w-full rounded-md py-3 px-3 bg-white outline-gray-400 border focus:outline-none focus:border-background"
                autoComplete="off"
              />
              <div
                className="absolute right-3 top-3 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {hidePassword ? (
                  <FaRegEye size={20} className="text-gray-600" />
                ) : (
                  <FaRegEyeSlash size={20} className="text-gray-600" />
                )}
              </div>
            <div className="pt-[20px]">
              <p className="text-secondary text-[10px] font-semibold">
              Use at least 8 characters, including uppercase, lowercase, numbers, and special characters.
              </p>
            </div>
            </div>

            {/* Confirm Password Field */}
            <div className="relative mb-4">
              <input
                name="confirmPassword"
                type={hidePassword ? "text" : "password"}
                placeholder="Confirm password"
                className="w-full rounded-md py-3 px-3 bg-white outline-gray-400 border focus:outline-none focus:border-background"
                autoComplete="off"
              />
            <div className="flex items-center mb-6 pt-[20px]">
              <input
                type="checkbox"
                id="rememberMe"
                className="w-4 h-4 mr-2 text-background"
              />
              <label htmlFor="rememberMe" className="text-sm text-gray-600">
                Remember me
              </label>
            </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              onClick={handleRedirectToSuccessPage}
              className="w-full bg-background text-white py-3 rounded-md hover:bg-background-dark focus:outline-none focus:ring focus:ring-blue-300 text-[20px]"
            >
              Set password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
