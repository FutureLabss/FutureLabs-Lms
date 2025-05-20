// import signup from '@/pages/signup'
import React from 'react'
import signup from "../../../assets/signup/signup.png"
import loginprofile from "../../../assets/loginprofile.png"
import Image from "next/image"

export default function Joinus() {
  return (
    <div>
        <div className="hidden lg:flex h-screen">
         <div className="w-full relative  h-full">
           <Image
             src={signup}
             alt="User Avatar"
             className=" object-cover w-full h-full"
           />
         <div className="absolute 2xl:mt-[-62rem] md:mt-[-37rem] text-start w-full md:w-max-[100px] max-w-[900px] 2xl:px-[74px] px-[55px]">
            <h2 className=" text-[1rem] md:text-[3rem] 2xl:text-[5rem]
             text-white font-semibold w-full md:max-w-[500px] md:leading-tight max-w-[900px] 2xl:px-[74px]">
            Join CleverClass and Start Your Tech  Journey!
            </h2>
            <p className="text-[1rem]  2xl:text-[1.44rem] text-white font-normal" >
            Kick start your tech join with us and learn from the  industry best
            </p>
            <div className="bg-primary 2xl:p-10 p-4 mt-[8rem] rounded-3xl">
                <p className="text-[1rem] md:text-[1.2rem] 2xl:text-[1.5rem] text-white font-medium w-full max-w-[500px]" >
                My journey as a designer isnt complete without CleverClass. To anyone out there,take on the opportunity. Best wishes
                </p>
                <div className="flex gap-3 items-center pt-5">
            <Image
              src={loginprofile}
              alt="User Avatar"
              className="rounded-3xl w-20 h-20 mr-2"/>
            <div className="mt-1 flex flex-col 2xl:gap-4 gap-1">
              <p className="font-medium text-lg 2xl:text-[1.5rem] text-white">Abraham</p>
              <p className="text-sm  2xl:text-[1.5rem] text-white">Designer</p>
            </div>
          </div>
          </div>
         </div>
         </div>
       </div>
    </div>
  )
}
