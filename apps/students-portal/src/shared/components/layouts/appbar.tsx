import Image from "next/image";
import Avatar from "../../../assets/Avatar.png"
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";


interface Props {
    display: boolean;
    onToggle: () => void;
    onLogout?: () => void;
    title:string;
    userId:string;
    description?:string;
  }

export default function PreAppBar(props:Props){
  const { title, description } = props; 
    return(
        <div className="">
             <div className="py-2 px-5 lg:hidden" onClick={props.onToggle}>
            <svg className="h-6 w-6 text-blue-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <div className="flex flex-row lg:mt-[1.75rem] lg:ml-[16rem] 2xl:ml-[22rem] px-5 justify-between items-start">
  <div className="w-full xsm:max-w-[210px] xxs:max-w-[240px] md:max-w-[400px]">
    <h3 className="md:text-[27px] xsm:text-[1.15rem] xxs:text-[1.35rem] font-bold pt-2">{title}</h3>
    <p className="text-[1rem] 2xl:text-[1rem] text-gray-600 hidden md:col lg:flex font-[400]">
      {description}
    </p>
  </div>

  <div className="flex flex-row items-center gap-2 sm:gap-4 cursor-pointer 2xl:max-w-[800px] flex-shrink-0">
    <div>
      <Image src={Avatar} alt="profile" className="w-10 h-10 sm:w-12 sm:h-12 2xl:w-20 2xl:h-20 object-cover rounded-full" />
    </div>
    <Link href="/user/userProfile">
      <div className="text-xs flex flex-row items-center gap-2 sm:gap-4">
        <p className="md:text-[1.1rem] text-[#85878D] font-medium whitespace-nowrap">profile</p>
        <IoIosArrowForward size={20} />
      </div>
    </Link>
  </div>
</div>

        </div>
    )
}

