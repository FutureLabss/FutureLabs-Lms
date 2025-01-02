import Image from "next/image";
import logo from "../assets/logo.png";
import auth from "../assets/auth.png";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/router";
import { ICreatePassword } from "@/core/types/interface/auth";
import { useAuthContext } from "@/shared/context/auth";

export default function CreatePasswordPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { CreatePassword } = useAuthContext();
  const [userData, useUserData]=useState<ICreatePassword>({
    email: "",
    password: "",
    confirmPassword:""
  })
  const [hidePassword, setHidePassword] = useState(false);
  const router = useRouter()
  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };
  // const handleRedirectToSuccessPage =()=>{
  //   console.log("createPassword")
  //   router.push("/passwordsuccesspage")
  // }
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;
    useUserData({ ...userData, [name]: value });
  }
  const handleSubmitForm = async (event: React.FormEvent) => {
    event.preventDefault();
    const { email, password, confirmPassword } = userData;
    if (!email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    setError(null);
    try {
      await CreatePassword(userData);
      router.push("/passwordsuccesspage");
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    }
  };
  return (
    <div className="bg-white grid grid-cols-1 md:grid-cols-2 ">
      <div className="bg-background text-white flex items-center justify-center">
        <div className=" pt-10">
          <Image
            src={auth}
            alt="User Avatar"
            className="mx-auto w-[100%] md:w-[100%]"
          />
        </div>
      </div>
      {/* <div className="bg-background text-white md:px-[75px] ">
        <div className="md:pt-[2.55rem]">
          <Image
            src={auth}
            alt="User Avatar"
            className="mx-auto w-[100%] md:w-[100%]"
          />
        </div>
      </div> */}
      <div className="md:px-[76px]">
        <div className="pt-[30px] pb-[10px] flex items-end flex-row justify-end">
          <Image src={logo} alt="Futurelabs Logo" />
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <div className="p-5 mx-auto md:mt-[5rem]">
          <h2 className="text-2xl font-semibold mb-6 text-black">
            Create password 
          </h2>
          <form
          onSubmit={handleSubmitForm}
          className="flex flex-col gap-[27px]"
          >
            <input
              type="email"
              name="email"
              value={userData.email}
              placeholder="Johndoe@gmail.com"
              onChange={handleChange}
              className="w-full rounded-md py-3 px-3 mb-4 bg-white outline-gray-400 border focus:outline-none focus:border-background"
            />
            <div className="relative mb-4">
              <input
              onChange={handleChange}
              name="password"
              value={userData.password}
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
            <div className="relative mb-4">
              <input
              name="confirmPassword"
              value={userData.confirmPassword}
              onChange={handleChange}
                type={hidePassword ? "text" : "password"}
                placeholder="Confirm password"
                className="w-full rounded-md py-3 px-3 bg-white outline-gray-400 border focus:outline-none focus:border-background"
                autoComplete="off"
              />
            <div className="flex items-center  pt-[20px]">
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
            <button
               type="submit"
              className="w-full bg-background text-white py-3 rounded-md hover:bg-background-dark focus:outline-none focus:ring focus:ring-blue-300 text-[20px]"
            >
               {!loading ? `Set password` : "Loading..."}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
