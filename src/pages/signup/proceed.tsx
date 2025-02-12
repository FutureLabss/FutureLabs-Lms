import Image from "next/image"
import signup from "../../assets/signup/signup.png"
import logo from "../../assets/logo.png"
import { FaLongArrowAltLeft} from "react-icons/fa";
import loginprofile from "../../assets/loginprofile.png"
import Link from "next/link";
import { CreateUserProfile } from "@/core/types/interface/auth";
import { useAuthContext } from "@/shared/context/auth";
import router from "next/router";
import { ChangeEvent, useEffect, useState } from "react";

export default function ProceedSignUpPage(){
  const [formData, setFormData] = useState<CreateUserProfile | undefined>();
  const { SignUp } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string[]>([]);

  // useEffect(() => {
  //   const savedData = JSON.parse(localStorage.getItem("formData") || "{}");
  //   if (savedData) setFormData(savedData);
  // }, []);

  useEffect(() => {
    const storedData = localStorage.getItem("formData");
    if (storedData) {
      setFormData(JSON.parse(storedData)); 
    }
  }, []);
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      const updatedData = { ...formData, [name]: value };
      setFormData(updatedData);
      console.log("submit", formData);
      localStorage.setItem("formData", JSON.stringify(updatedData));
    };
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      try {
        if (formData) {
          console.log("submit", formData);
          await SignUp(formData);
        }
      } catch (e) {
        const loginError = e as Error;
        setError(loginError.message?.split("\n") ?? [loginError.message]);
      } finally {
        setLoading(false);
      }
    };
    
    return(
      <div className="bg-white grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 ">
            {/* right */}
            <div className="hidden lg:flex h-screen">
         <div className="w-full relative  h-full">
           <Image
             src={signup}
             alt="User Avatar"
             className=" object-cover w-full h-full "
           />
         <div className="absolute 2xl:mt-[-62rem] md:mt-[-37rem] text-start w-full md:w-max-[100px] max-w-[900px] 2xl:px-[74px] px-[55px]">
            <h2 className=" text-[1rem] md:text-[3rem] 2xl:text-[5rem]
             text-white font-semibold w-full md:max-w-[500px] md:leading-tight max-w-[900px] 2xl:px-[74px]">
            Join Futurelabs and Start Your Tech  Journey!
            </h2>
            <p className="text-[1rem]  2xl:text-[1.44rem] text-white font-normal" >
            Kick start your tech join with us and learn from the  industry best
            </p>
            <div className="bg-primary 2xl:p-10 p-4 mt-[8rem] rounded-3xl">
                <p className="text-[1rem] md:text-[1.2rem] 2xl:text-[1.5rem] text-white font-medium w-full max-w-[500px]" >
                My journey as a designer isnt complete without futurelabs. To anyone out there,take on the opportunity. Best wishes
                </p>
                <div className="flex gap-3 items-center pt-5">
            <Image
              src={loginprofile}
              alt="User Avatar"
              className="rounded-3xl w-20 h-20 mr-2"
            />
            <div className="mt-1 flex flex-col 2xl:gap-4 gap-1">
              <p className="font-medium text-lg 2xl:text-[1.5rem] text-white">Abraham</p>
              <p className="text-sm  2xl:text-[1.5rem] text-white">Designer</p>
            </div>
          </div>
            </div>
         </div>
         </div>
       </div>

       {/* left */}
       <div className="md:px-[76px] xsm:px-4 2xl:px-[8rem] xsm:p-2">
       <div className="pt-[20px] pb-[10px] flex items-end flex-row justify-end">
           <Image src={logo} alt="Futurelabs Logo" />
         </div>
         {/* {error && <p className="text-red-500 text-sm text-center">{error}</p>} */}
         <div className=" 2xl:mt-[3rem]">
         <button
                   className="flex items-center justify-center space-x-3 text-gray-500 2xl:mb-[80px] pb-[30px]"
                   onClick={() => router.back()}
                 >
                   <button className=" text-[#212C4A] border-4 border-[#212C4A] py-2 px-2 rounded-md ">
                     <FaLongArrowAltLeft />
                   </button>
                   <span className="2xl:text-2xl md:text-[1.5rem] text-[1rem] font-semibold pl-2 text-[#212C4A]">Previous</span>
                 </button>
         <div className="flex items-center space-x-4 ">
            <div className="flex items-center">
            <div className="w-8 h-8 flex items-center justify-center rounded-full
             bg-gray-300 text-gray-500 2xl:text-2xl md:text-[1.5rem] text-[1rem] font-bold">
                1
              </div>
              <span className="ml-2 text-gray-500 2xl:text-2xl md:text-[1.3rem] text-[1rem] font-semibold">Step 1</span>
            </div>
            <div className="flex-grow h-[2px] bg-gray-300"></div>
            <div className="flex items-center">
            <div className="w-8 h-8 flex items-center justify-center 
            rounded-full bg-black text-white 2xl:text-2xl md:text-[1.5rem] text-[1rem] font-bold" >
            2
              </div>
              <span className="ml-2 text-black 2xl:text-2xl md:text-[1.3rem] text-[1rem] font-semibold">Step 2</span>
            </div>
          </div>
         <div className="p-4 mx-auto ">
           <h2 className="2xl:text-2xl md:text-[1.5rem] text-[1rem] font-semibold mb-1 text-black">
           Lets know your Your Skills and Interests
                      </h2>
           </div>
         </div>
           <form
           onSubmit={handleSubmit}
           className="flex flex-col gap-[5px] md:gap-1 2xl:gap-[3rem]"
           >
            <div className="relative w-full">
             <select id="skill"
             name="skill"
             value={formData?.skill}
              onChange={handleChange} required
             className="w-full appearance-none rounded-md py-3 px-3 pr-10 mb-4 placeholder-gray-400 bg-[#f1f0f0] outline-gray-400 border focus:outline-none"
                >
              <option selected className="text-[#686666]">Skill Choice</option>
              <option value="Web Development" className="text-[#686666]">Web Development</option>
              <option value="UI/UX" className="text-[#686666]">UI/UX</option>
              <option value="Data Analytics" className="text-[#686666]">Data Analytics</option>
              <option value="Graphics" className="text-[#686666]">Graphics</option>
              <option value="Digital Marketing" className="text-[#686666]">Digital Marketing</option>
              <option value="Web Design" className="text-[#686666]">Web Design</option>

            </select>
            <div className="absolute inset-y-0 justify-center right-3 flex items-center pointer-events-none">
                <svg 
                  className="w-5 h-5 text-gray-600"
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <div className="relative w-full">
            <select id="experience"
            name="experience"
            value={formData?.experience}
             onChange={handleChange} required
             className="w-full appearance-none rounded-md py-3 px-3 pr-10 mb-4 placeholder-gray-400 bg-[#f1f0f0] outline-gray-400 border focus:outline-none"
                >
              <option selected className="text-[#686666]">Skill  Level</option>
              <option value="Beginner" className="text-[#686666]">Beginner</option>
              <option value="Intermediate" className="text-[#686666]">Intermediate</option>
              <option value="Advance" className="text-[#686666]">Advance</option>
            </select>
            <div className="absolute inset-y-0 justify-center right-3 flex items-center pointer-events-none">
                <svg 
                  className="w-5 h-5 text-gray-600"
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <div className="relative w-full">
            <select id="age_range"
             name="age_range"
             value={formData?.age_range}
              onChange={handleChange} required
              className="w-full appearance-none rounded-md py-3 px-3 pr-10 mb-4 placeholder-gray-400 bg-[#f1f0f0] outline-gray-400 border focus:outline-none"
                >
              <option selected className="text-[#686666]">Age range</option>
              <option value="12-15" className="text-[#686666]">12-15</option>
              <option value="16-20" className="text-[#686666]">16-20</option>
              <option value="21-29" className="text-[#686666]">21-29</option>
              <option value="30+" className="text-[#686666]">30+</option>
            </select>
            <div className="absolute inset-y-0 justify-center right-3 flex items-center pointer-events-none">
                <svg 
                  className="w-5 h-5 text-gray-600"
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <textarea
            name="heard_about_us"
            value={formData?.heard_about_us}
             onChange={handleChange} required
              placeholder="How did you hear about us" id=""
            className="w-full rounded-md py-4 px-3 mb-4 bg-[#f1f0f0] outline-gray-400 border focus:outline-none focus:"
>
            </textarea>
            
             <div className="pb-3">
              {/* <Link href={"/signup/accountcreated"}> */}
             <button
                type="submit"
               className="w-full bg-background text-white py-3 rounded-md hover:bg-background-dark focus:outline-none focus:ring focus:ring-blue-300 text-[20px]"
             >
                {!loading ? `submit` : "Loading..."}
             </button>
              {/* </Link> */}
             </div>
             <div className="text-center">
              <p className="text-sm">
              Already have an account?<span className="text-[#007AFF] pl-2"> <Link href={"/login"}>Sign in now</Link></span>
              </p>
             </div>
           </form>
         </div>
     </div>
    )
}