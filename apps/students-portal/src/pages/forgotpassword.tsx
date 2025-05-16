import Image from "next/image";
import loginprofile from "../assets/loginprofile.png";
import logo from "../assets/logo.png";
import { useState } from "react";
import { z } from "zod";
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useAuthContext } from "@/shared/context/auth";


const schema = z.object({
  email: z.string().email("Invalid email address")
});

type FormData = z.infer<typeof schema>;

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const {forgotPassword} = useAuthContext();

     const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });


  const onSubmit = async (data: FormData) => {
    setLoading(true);
    
    try {
      await forgotPassword(data);
      reset();
    } catch (e) {
      const loginError = e as Error;
      console.error("update password:", loginError.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className='bg-white grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2'>

      <div className="hidden lg:flex">
        <div className="bg-background text-white md:px-[75px] 2xl:h-screen ">
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
      <div className='md:px-[76px] 2xl:px-[76px]'>
         <div className="pt-[30px]  pb-[20px] xsm:px-5 flex items-end justify-end">
          <Image src={logo} alt="Logo" />
        </div>
         <div className="m-6">
             <button className=" text-[#212C4A] border-4 border-[#212C4A] py-2 px-2 rounded-md ">
                <Link href="/login" className="text-blue-500 hover:underline">       
                    <FaLongArrowAltLeft />
               </Link>
            </button>
         </div>

       <div className="p-5 mx-auto md:mt-[2.3rem] 2xl:mt-[10rem]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 xsm:gap-6"
            // className="flex flex-col gap-[5px] md:gap-1 2xl:gap-[3rem]"
          >
            <div>
              <input
                type="text"
                {...register("email")}
                placeholder="Email or phone number"
                 autoFocus
                className="w-full rounded-md py-2 px-3 2xl:mb-4 bg-white border focus:outline-none focus:border-background"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="pt-3 2xl:pt-14">
              <button
                type="submit"
                className="w-full bg-background text-white py-[1rem] rounded-md hover:bg-background focus:outline-none focus:ring focus:ring-blue-300 mb-4 text-[20px]"
                disabled={loading || !isDirty }
               
              >
                {loading ? "Loading..." : "continue"}
              </button>
            </div>
          </form>
          
        </div>
        </div>
    </div>
  )
}
