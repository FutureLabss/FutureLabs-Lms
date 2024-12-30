import Image from "next/image";
import logo from "../assets/logo.png"
import loginprofile from "../assets/loginprofile.png"
import google from "../assets/google.png"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useAuthContext } from "@/shared/context/auth";
import { ILogin } from "@/core/types/interface/auth";
import { GoDotFill } from "react-icons/go";

export default function LoginPage() {
    const { login } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string[]>([]);
    const [hidePassword, setHidePassword] = useState(false);
    const [data, setData] = useState<ILogin>({
      email: "",
      password: "",
    });
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      const { value, name } = event.target;
      setData({ ...data, [name]: value });
    }
   
    const handleClick = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setError([]);
      console.log(data)
      try {
        setLoading(true);
        await login(data);
        setLoading(false);
      } catch (e) {
        const loginError = e as Error;
        setError(loginError.message?.split("\n") ?? [loginError.message]);
        setLoading(false);
      }
    };
    const togglePasswordVisibility = () => {
        setHidePassword(!hidePassword);
      };
    return (
      <div className="bg-white grid grid-cols-1 md:grid-cols-2 ">
          <div className="bg-background text-white md:px-[75px] ">
            <div className="md:pt-[15.25rem] p-[3rem]">
              <h2 className="md:text-[3rem] text-[1.5rem] font-bold">Join Futurelabs and Start Your Tech Journey!</h2>
              <p className="text-sm w-[100%] max-w-[290px]">Kick start your tech join with us and learn from the industry best</p>
            </div>
            <div className="md:pt-[8rem] p-[3rem]">
              <p className=" mb-2 text-sm w-[100%] max-w-[290px] md:leading-5">My journey as a designer isn&apos;t complete without futurelabs. To anyone out there, take on the opportunity. Best wishes</p>
              <div className="flex items-center pt-3">
                <Image src={loginprofile} alt="User Avatar" className="rounded-full w-10 h-10 mr-2" /> {/* Placeholder image */}
                <div>
                  <p className="font-medium">Abraham</p>
                  <p className="text-sm">Designer</p>
                </div>
              </div>
            </div>
          </div>
  
          {/* Right Side (Light) */}
          <div className="md:px-[76px]">
          <div className="pt-[30px] pb-[20px] flex items-end flex-row justify-end ">
            <Image src={logo} alt={""} />
        </div>
        <div className="mt-2">
            {error?.length ? (
              <div className="flex flex-col">
                {error?.map((e) => (
                  <p key={e} className="text-red">
                    {" "}
                    <div className="flex flex-row  text-red-500">
                      <GoDotFill color="inherit" className="mt-1" />
                      <span>{e}</span>
                    </div>
                  </p>
                ))}
              </div>
            ) : null}
          </div>
          <div className="p-5 mx-auto md:mt-[10rem]">
            <h2 className="text-2xl font-semibold mb-6 text-black">Nice to have you back!</h2>
            <form onSubmit={handleClick}>
              <input
                type="text"
                name="email"
                onChange={handleChange}
                value={data.email}
                placeholder="Email or phone number"
                className="w-full rounded-md py-2 px-3 mb-4 bg-white outline-gray-400 border focus:outline-none focus:border-background"
              />
               <div className={`mt-2 relative   `}>
            <div className="absolute right-3 bottom-[25px] cursor-pointer" onClick={togglePasswordVisibility}>
              {hidePassword ? (
                <FaRegEye size={20} className="text-gray-600" />
              ) : (
                <FaRegEyeSlash size={20} className="text-gray-600" />
              )}
            </div>
            <div className="mt-2">
              <input
                name="password"
                type={hidePassword ? "text" : "password"}
                placeholder="Enter password"
                onChange={handleChange}
                value={data.password}
                className="w-full rounded-md py-2 px-3 mb-4 bg-white outline-gray-400 border focus:outline-none focus:border-background"
                autoComplete="off"
              />
            </div>
          </div>
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <input type="checkbox" id="remember" className="mr-2" />
                  <label htmlFor="remember" className="text-sm text-black ">Remember me</label>
                </div>
                <a href="#" className="text-sm text-blue-500 hover:underline">Forgot password?</a>
              </div>
              <div className="mt-[54px]">     
                <div className="mb-10">
              <button
                type="submit"
                 className="w-full bg-background text-white py-[1rem] 
              rounded-md hover:bg-background focus:outline-none 
              focus:ring focus:ring-blue-300 mb-4 text-[20px]">
                 {!loading ? ` Sign in` : "Loading..."}
                Sign in
              </button>
                </div>
                <hr />
                <div className="pt-10">
              <button className="w-full bg-gray-100 text-white py-[1rem] rounded-md
               hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 flex
                items-center gap-3 justify-center text-[20px]">
              <Image src={google} alt={""}  className=""/>
                Or sign in with Google
              </button>
                </div>

              </div>
              <p className="text-center mt-5 text-gray-600 text-sm">Don&apos;t have an account? <a href="#" className="text-blue-500 hover:underline">Sign up now</a></p>
            </form>
          </div>
          </div>
        {/* </div> */}
      </div>
    );
  }