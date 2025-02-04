import Image from "next/image"
import signup from "../../assets/signup/signup.png"
import logo from "../../assets/logo.png"
// import { useState } from "react";
// import { useRouter } from "next/router";
// import { useAuthContext } from "@/shared/context/auth";
// import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
// import { ICreatePassword } from "@/core/types/interface/auth";
import loginprofile from "../../assets/loginprofile.png"
import Link from "next/link";

export default function SignUpPage(){
      // const [error, setError] = useState<string[]>([]);
      // const [loading, setLoading] = useState(false);
      // const { CreatePassword } = useAuthContext();
      // const { query } = useRouter();
      // const [userData, setUserData]=useState<ICreatePassword>()

      // const [hidePassword, setHidePassword] = useState(false);
      // const togglePasswordVisibility = () => {
      //   setHidePassword(!hidePassword);
      // };
      // function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      //   const { value, name } = event.target;
      //   // setUserData({ ...userData, [name]: value });
      // }
       const onSubmit = async () => {
        console.log("hellow")
          // setLoading(true);
        };
        
        const {
            // register,
            handleSubmit,
            // formState: { errors },
          } = useForm<FormData>({
            // resolver: zodResolver(schema),
            mode: "onChange",
          });
    return(
        <div className="bg-white grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 h-full lg:min-h-[850px]">
            {/* right */}
        <div className="hidden lg:flex h-screen">
         <div className="w-full relative">
           <Image
             src={signup}
             alt="User Avatar"
             className=" object-cover w-full h-full "
           />
         <div className="absolute mt-[-62rem] text-start w-full max-w-[900px] px-[74px]">
            <h2 className=" text-[1rem] 2xl:text-[5rem] text-white font-semibold">
            Join Futurelabs and Start Your Tech  Journey!
            </h2>
            <p className="ext-[1rem] 2xl:text-[1.44rem] text-white font-normal" >
            Kick start your tech join with us and learn from the  industry best
            </p>
            <div className="bg-primary p-10 mt-[11rem] rounded-3xl">
                <p className="text-[1rem] 2xl:text-[1.5rem] text-white font-medium w-full max-w-[500px]" >
                My journey as a designer isnt complete without futurelabs. To anyone out there,take on the opportunity. Best wishes
                </p>
                <div className="flex gap-3 items-center pt-10">
            <Image
              src={loginprofile}
              alt="User Avatar"
              className="rounded-3xl w-20 h-20 mr-2"
            />
            <div className="mt-1 flex flex-col gap-4">
              <p className="font-medium text-lg 2xl:text-[1.5rem] text-white">Abraham</p>
              <p className="text-sm  2xl:text-[1.5rem] text-white">Designer</p>
            </div>
          </div>
            </div>
         </div>
         </div>
       </div>

       {/* left */}
       <div className="md:px-[76px] xsm:px-4 2xl:px-[8rem]">
         <div className="pt-[30px] pb-[10px] flex items-end flex-row justify-end">
           <Image src={logo} alt="Futurelabs Logo" />
         </div>
         {/* {error && <p className="text-red-500 text-sm text-center">{error}</p>} */}
         <div className="flex items-center space-x-4 md:mt-[5rem] 2xl:mt-[8rem]">
            <div className="flex items-center">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-black text-white text-[18px] font-bold" >
                1
              </div>
              <span className="ml-2 text-black text-[22px] font-semibold">Step 1</span>
            </div>
            <div className="flex-grow h-[2px] bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 text-gray-500 text-[18px] font-bold">
                2
              </div>
              <span className="ml-2 text-gray-500 text-[22px] font-semibold">Step 2</span>
            </div>
          </div>
         <div className="p-5 mx-auto ">
           <h2 className="text-2xl font-semibold mb-6 text-black">
           Welcome,Lets get to know you
           </h2>
           </div>
           <form
           onSubmit={handleSubmit(onSubmit)}
           className="flex flex-col gap-[27px] 2xl:gap-[3rem]"
           >
            <div className="flex flex-row gap-11">
                <input type="text"
                placeholder="First name" 
                className="w-full rounded-md py-4 px-3 mb-4 bg-[#f1f0f0] outline-gray-400 border focus:outline-none focus:"
                />
                <input type="text"
                placeholder="Last name" 
                className="w-full rounded-md py-3 px-3 mb-4 bg-[#f1f0f0] outline-gray-400 border focus:outline-none focus:"
                />
            </div>
             <input
               type="email"
            //    value={email}
            //    {...register("email")}
                placeholder="Johndoe@gmail.com"
               className="w-full rounded-md py-3 px-3 mb-4 bg-[#f1f0f0] outline-gray-400 border focus:outline-none focus:"
             />
             <input
               type="phnoeNumber"
            //    value={email}
            //    {...register("email")}
                placeholder="Phone number"
               className="w-full rounded-md py-3 px-3 mb-4 bg-[#f1f0f0] outline-gray-400 border focus:outline-none focus:"
             />
             <input
               type="address"
            //    value={email}
            //    {...register("email")}
                placeholder="address no.33 chubb road"
               className="w-full rounded-md py-3 px-3 mb-4 bg-[#f1f0f0] outline-gray-400 border focus:outline-none focus:"
             />
             <select id="Gender"
             className="w-full rounded-md py-3 px-3 mb-4 bg-[#f1f0f0] outline-gray-400 border focus:outline-none focus:"
              // className="bg-[#f1f0f0] border border-gray-300 text-gray-900 text-sm 
              // rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
              //  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
              //   dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
              <option selected className="text-[#686666]">Gender</option>
              <option value="Male" className="text-[#686666]">Male</option>
              <option value="Female" className="text-[#686666]">Female</option>
              <option value="Others" className="text-[#686666]">Others</option>
            </select>
            
                <Link href={"/signup/proceed"}>
             <div className="pb-5">
             <button
                // type="submit"
               className="w-full bg-background text-white py-3 rounded-md hover:bg-background-dark focus:outline-none focus:ring focus:ring-blue-300 text-[20px]"
             >
                {/* {!loading ? `Proceed` : "Loading..."} */}
                Proceed

             </button>
             </div>
                </Link>
             <div className="text-center">
              <p>
              Already have an account?<span className="text-[#007AFF] pl-2"> <Link href={"/login"}>Sign in now</Link></span>
              </p>
             </div>
           </form>
         </div>
     </div>
    )
}