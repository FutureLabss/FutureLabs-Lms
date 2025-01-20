import Image from "next/image";
import logo from "../assets/logo.png";
import loginprofile from "../assets/loginprofile.png";
import google from "../assets/google.png";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useAuthContext } from "@/shared/context/auth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { GoDotFill } from "react-icons/go";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Use at least 8 characters")
   ,
  remember_me: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const { login } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(false);
  const [error, setError] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      remember_me: false,
    },
    mode: "onChange",
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await login(data);
      reset();
    } catch (e) {
      const loginError = e as Error;
      setError(loginError.message?.split("\n") ?? [loginError.message]);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => setHidePassword(!hidePassword);

  return (
    <div className="bg-white grid grid-cols-1 md:grid-cols-2">
      {/* Left Section */}
      <div className="hidden md:flex">
      <div className="bg-background text-white md:px-[75px] ">
        <div className="md:pt-[15.25rem] p-[3rem]">
          <h2 className="md:text-[3rem] text-[1.5rem] font-bold">
            Join Futurelabs and Start Your Tech Journey!
          </h2>
          <p className="text-sm w-[100%] max-w-[290px]">
            Kick start your tech journey with us and learn from the industry
            best.
          </p>
        </div>
        <div className="md:pt-[8rem] p-[3rem]">
          <p className="mb-2 text-sm w-[100%] max-w-[290px] md:leading-5">
            My journey as a designer isn&apos;t complete without Futurelabs. To anyone out
            there, take on the opportunity. Best wishes.
          </p>
          <div className="flex items-center pt-3">
            <Image
              src={loginprofile}
              alt="User Avatar"
              className="rounded-full w-10 h-10 mr-2"
            />
            <div>
              <p className="font-medium">Abraham</p>
              <p className="text-sm">Designer</p>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Right Section */}
      <div className="md:px-[76px]">
        <div className="pt-[30px] pb-[20px] xsm:px-5 flex items-end justify-end">
          <Image src={logo} alt="Logo" />
        </div>
        {error.length > 0 && (
          <div className="mt-2 text-red-500 px-3">
            {error.map((e, index) => (
              <p key={index} className="flex items-center">
                <GoDotFill className="mr-2" />
                {e}
              </p>
            ))}
          </div>
        )}
        <div className="p-5 mx-auto md:mt-[10rem]">
          <h2 className="text-2xl font-semibold mb-6 text-black">
            Nice to have you back!
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col xsm:gap-6">
            <div>
            <input
              type="text"
              {...register("email")}
              placeholder="Email or phone number"
              className="w-full rounded-md py-2 px-3 mb-4 bg-white border focus:outline-none focus:border-background"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
            </div>

            <div className="relative">
              <input
                {...register("password")}
                type={hidePassword ? "text" : "password"}
                placeholder="Enter password"
                className="w-full rounded-md py-2 px-3 mb-4
                 bg-white border focus:outline-none focus:border-background"
                autoComplete="off"
              />
              <div
                className="absolute right-3 top-3 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {hidePassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
            </div>

            <div className="flex items-center pt-2">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  {...register("remember_me")}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-gray-300 rounded-full peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer-checked:bg-blue-600 transition-all peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white  after:border after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                <span className="ml-3 text-sm font-medium text-gray-900">Remember me</span>
              </label>
            </div>
            <div className="pt-10">
            <button
              type="submit"
              className="w-full bg-background text-white py-[1rem] rounded-md hover:bg-background focus:outline-none focus:ring focus:ring-blue-300 mb-4 text-[20px]"
              disabled={loading}
            >
              {loading ? "Loading..." : "Sign in"}
            </button>
            </div>

            <hr />
            <button
              type="button"
              className="w-full bg-gray-100 text-black py-[1rem] rounded-md flex items-center gap-3 justify-center text-[20px] mt-4"
            >
              <Image src={google} alt="Google Logo" className="w-6 h-6" />
              Or sign in with Google
            </button>
          </form>
          <p className="text-center mt-5 text-gray-600 text-sm">
            Don&apos;t have an account?{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Sign up now
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
