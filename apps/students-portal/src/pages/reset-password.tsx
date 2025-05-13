import Image from "next/image";
import { useRouter } from "next/router";
import logo from "../assets/logo.png";
import loginprofile from "../assets/loginprofile.png";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { useParams } from "next/navigation";
import { useAuthContext } from "@/shared/context/auth";

// import { useRouter } from "next/router"

// Define schema with password and confirmPassword
const schema = z
  .object({
    new_password: z.string().min(6, "Password must be at least 6 characters long"),
    new_password_confirmation: z.string(),
  })
  .refine((data) => data.new_password === data.new_password_confirmation, {
    message: "Passwords do not match",
    path: ["new_password_confirmation"],
  });

type FormData = z.infer<typeof schema>;

export default function ResetForgotPassword() {
// const paramsP = useParams();
// console.log(paramsP,'hi there i am param');

const router = useRouter();
const [loading, setLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(false);
    const {resetForgotPassword} = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      new_password: "",
      new_password_confirmation: "",
    },
    mode: "onChange",
  });

//   const { email, token } = router.query;
 const { 'reset-token': resetToken, email } = router.query;
  const onSubmit = async (data: FormData) => {
    setLoading(true);
    console.log(data, 'for reset forgotpassword');
    
    try {
      if (!resetToken || !email) {
        console.error('Missing reset token or email');
        return;
      }
      const payload = {
        ...data,
        email: email as string,
        token: resetToken as string  
      };
     await resetForgotPassword(payload)
    //  await resetForgotPassword(data)
     console.log(data,'for testing');
     console.log(payload,'for testing for payload');
     
      reset();
    //   router.replace("/user");
    } catch (e) {
      console.error("Error logging in", e);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => setHidePassword(!hidePassword);

  return (
    <div className="bg-white grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
      {/* Left Section */}
      <div className="hidden lg:flex">
        <div className="bg-background text-white md:px-[75px] 2xl:h-screen">
          <div className="md:pt-[10.25rem] p-[3rem] 2xl:pt-[15.25rem]">
            <h2 className="md:text-[2rem] text-[1.5rem] 2xl:text-[3rem] font-bold">
              Join Futurelabs and Start Your Tech Journey!
            </h2>
            <p className="text-sm w-[100%] max-w-[290px]">
              Kick start your tech journey with us and learn from the industry
              best.
            </p>
          </div>
          <div className="md:pt-[8rem] 2xl:mt-[17rem] p-[3rem]">
            <p className="mb-2 text-sm w-[100%] max-w-[290px] md:leading-5">
              My journey as a designer isn&apos;t complete without Futurelabs.
              To anyone out there, take on the opportunity. Best wishes.
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
      <div className="md:px-[76px] 2xl:px-[76px]">
        <div className="pt-[30px] pb-[20px] xsm:px-5 flex items-end justify-end">
          <Image src={logo} alt="Logo" />
        </div>

             <div className="m-6">
                <button className=" text-[#212C4A] border-4 border-[#212C4A] py-2 px-2 rounded-md ">
                     <Link href="/forgotpassword" className="text-blue-500 hover:underline">       
                        <FaLongArrowAltLeft />
                    </Link>
                </button>
             </div>
        <div className="p-5 mx-auto md:mt-[2.3rem] 2xl:mt-[10rem]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 xsm:gap-6"
          >
            <div className="relative 2xl:pt-10">
              <input
                {...register("new_password")}
                type={hidePassword ? "text" : "password"}
                placeholder="Enter password"
                className="w-full rounded-md py-2 px-3 bg-white border focus:outline-none focus:border-background"
                autoComplete="off"
              />
              <div
                className="absolute right-3 top-3 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {hidePassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.new_password.message}
                </p>
              )}
            </div>

            <div className="relative 2xl:pt-10">
              <input
                {...register("new_password_confirmation")}
                type="password"
                placeholder="Confirm password"
                className="w-full rounded-md py-2 px-3 bg-white border focus:outline-none focus:border-background"
                autoComplete="off"
              />
               
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.new_password_confirmation.message}
                </p>
              )}
            </div>

            <div className="pt-3 2xl:pt-14">
              <button
                type="submit"
                className="w-full bg-background text-white py-[1rem] rounded-md hover:bg-background focus:outline-none focus:ring focus:ring-blue-300 mb-4 text-[20px]"
                disabled={loading}
                disabled={!isDirty}
                aria-busy={loading}
              
              >
                {loading ? "Loading..." : "Continue"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}