import React, { ChangeEvent } from 'react'
import Image from "next/image"
import logo from "../../../assets/logo.png"
import { CreateUserProfile } from '@/core/types/interface/auth';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import Link from 'next/link';
import { ageRange, experience, userSkill } from '@/core/const/signupdata';

interface Iprops {
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  setStep: (step: number) => void;
  formData: CreateUserProfile;
  handleSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  step: number;
  error: string[];
}

export default function SignupCmponentSecondForm(props: Iprops) {
  const goBack = () => {
    if (props.step > 1) {
      props.setStep(props.step - 1);
    }
  };

  return (
    <div className="md:px-[76px] xsm:px-4 2xl:px-[8rem] xsm:p-2">
      <div className="pt-[20px] pb-[10px] flex items-end flex-row justify-end">
        <Image src={logo} alt="Futurelabs Logo" />
      </div>
      {props.error && <p className="text-red-500 text-sm text-center">{props.error}</p>}
      <div className=" 2xl:mt-[3rem]">
        <button
          className="flex items-center justify-center space-x-3 text-gray-500 2xl:mb-[80px] pb-[30px]"
          //    onClick={() => router.back()}
          onClick={goBack}
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
        onSubmit={props.handleSubmit}
        className="flex flex-col gap-[5px] md:gap-1 2xl:gap-[3rem]"
      >
        <div className="relative w-full">
          <select id="skill"
            name="skill"
            value={props.formData?.skill}
            onChange={props.handleChange} required
            className="w-full appearance-none rounded-md py-3 px-3 pr-10 mb-4
              placeholder-gray-400 bg-[#f1f0f0] outline-gray-400 border focus:outline-none">
            <option selected className="text-[#686666]">Skill Choice</option>
            {userSkill[0].map((skill, index) => (
              <option key={index} value={skill} className="text-[#686666]">
                {skill}
              </option>
            ))}

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
            value={props.formData?.experience}
            onChange={props.handleChange} required
            className="w-full appearance-none rounded-md py-3 px-3 pr-10 mb-4 placeholder-gray-400 bg-[#f1f0f0] outline-gray-400 border focus:outline-none"
          >
            <option selected className="text-[#686666]">Skill  Level</option>
            {experience[0].map((level, index) => (
              <option key={index} value={level} className="text-[#686666]">
                {level}
              </option>
            ))}
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
            value={props.formData?.age_range}
            onChange={props.handleChange} required
            className="w-full appearance-none rounded-md py-3 px-3 pr-10 mb-4 placeholder-gray-400 bg-[#f1f0f0] outline-gray-400 border focus:outline-none"
          >
            <option selected className="text-[#686666]">Age range</option>
            {ageRange[0].map((age, index) => (
              <option key={index} value={age} className="text-[#686666]">
                {age}
              </option>
            ))}
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
          value={props.formData?.heard_about_us}
          onChange={props.handleChange} required
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
            {!props.loading ? `submit` : "Loading..."}
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
  )
}
