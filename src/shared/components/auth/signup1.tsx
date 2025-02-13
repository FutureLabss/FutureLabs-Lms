import React, { ChangeEvent } from 'react'
import logo from "../../../assets/logo.png"
import Image from "next/image"
import { CreateUserProfile } from '@/core/types/interface/auth';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { gender } from '@/core/const/signupdata';

interface Iprops {
    handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    setStep: (step: number) => void;
    formData: CreateUserProfile;
}
export default function SignupCmponentFirstForm(props: Iprops) {
    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const { first_name, surname, email, phone_number, address, gender } = props.formData;
        if (!first_name || !surname || !email || !phone_number || !address || gender === "male") {
            toast.error("Please fill in all required fields.");
            return;
        }
        props.setStep(2);
    };
    return (
        <div className="md:px-[76px] xsm:px-4 2xl:px-[8rem] xsm:p-2">
            <div className="pt-[20px] pb-[10px] flex items-end flex-row justify-end">
                <Image src={logo} alt="Futurelabs Logo" />
            </div>
            <div className="flex items-center space-x-4 md:mt-[2.3rem] 2xl:mt-[7rem] ">
                <div className="flex items-center">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-black
          text-white 2xl:text-2xl md:text-[1.3rem] text-[1rem] font-bold" >
                        1
                    </div>
                    <span className="ml-2 text-black 2xl:text-2xl md:text-[1.3rem] text-[1rem] font-semibold">Step 1</span>
                </div>
                <div className="flex-grow h-[2px] bg-gray-300"></div>
                <div className="flex items-center">
                    <div className="w-8 h-8 flex items-center justify-center 
         rounded-full bg-gray-300 text-gray-500 2xl:text-2xl md:text-[1.3rem] text-[1rem] font-bold">
                        2
                    </div>
                    <span className="ml-2 text-gray-500 2xl:text-2xl md:text-[1.3rem] text-[1rem] font-semibold">Step 2</span>
                </div>
            </div>
            <div className="p-5 mx-auto pt-10 md:pt-5">
                <h2 className="2xl:text-2xl md:text-[1.5rem] text-[1rem] font-semibold  text-black">
                    Welcome,Lets get to know you
                </h2>
            </div>
            <form
                className="flex flex-col gap-[5px] md:gap-1 2xl:gap-[3rem]"
            >
                <div className="flex flex-col md:flex-row 2xl:gap-11 gap-5 w-full">
                    <input type="text"
                        name="first_name"
                        value={props.formData.first_name}
                        onChange={props.handleChange} required
                        placeholder="First name"
                        className="w-full rounded-md py-3 px-3 mb-4 bg-[#f1f0f0]
            outline-gray-400 border focus:outline-none focus:"
                    />
                    <input type="text"
                        name="surname"
                        value={props.formData.surname}
                        onChange={props.handleChange} required
                        placeholder="surname"
                        className="w-full rounded-md py-3 px-3 mb-4 bg-[#f1f0f0]
            outline-gray-400 border focus:outline-none focus:"
                    />
                </div>
                <input
                    type="email"
                    name="email"
                    value={props.formData.email}
                    onChange={props.handleChange} required
                    placeholder="Johndoe@gmail.com"
                    className="w-full rounded-md py-3 px-3 mb-4 bg-[#f1f0f0] outline-gray-400 border focus:outline-none focus:"
                />
                <input
                    type="phone_number"
                    name="phone_number"
                    value={props.formData.phone_number}
                    onChange={props.handleChange} required
                    placeholder="Phone number"
                    className="w-full rounded-md py-3 px-3 mb-4 bg-[#f1f0f0] outline-gray-400 border focus:outline-none focus:"
                />
                <input
                    type="address"
                    name="address"
                    value={props.formData.address}
                    onChange={props.handleChange} required
                    placeholder="address no.33 chubb road"
                    className="w-full rounded-md py-3 px-3 mb-4 bg-[#f1f0f0] outline-gray-400 border focus:outline-none focus:"
                />
                <div className="relative w-full">
                    <select
                        id="Gender"
                        name="gender"
                        value={props.formData.gender}
                        onChange={props.handleChange} required
                        className="w-full appearance-none rounded-md py-3 px-3 pr-10 mb-4 placeholder-gray-400 bg-[#f1f0f0] outline-gray-400 border focus:outline-none"
                    >
                        <option selected className="text-[#686666]">Gender</option>
                        {gender[0].map((data, index) => (
                            <option key={index} value={data} className="text-[#686666]">
                                {data}
                            </option>
                        ))}
                    </select>
                    {/* Custom dropdown icon */}
                    <div className="absolute inset-y-0 justify-center right-3 flex items-center pointer-events-none">
                        <svg
                            className="w-6 h-6 text-gray-600"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
                <div className="pb-1 ">
                    <button
                        onClick={handleSubmit}
                        type="submit"
                        className="w-full bg-background text-white py-3 rounded-md hover:bg-background-dark focus:outline-none focus:ring focus:ring-blue-300 text-[20px]"
                    >
                        Proceed
                    </button>
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
