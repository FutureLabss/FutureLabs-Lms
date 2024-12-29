import Image from "next/image";
import Avatar from "../../../assets/Avatar.png"
import DropdownMenu from "../common/dropdown";
import useActiveMenu from "@/shared/hooks/layout/activeMenu";
import { useAuthContext } from "@/shared/context/auth";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";


interface Props {
    display: boolean;
    onToggle: () => void;
    onLogout?: () => void;
  }

export default function PreAppBar(props:Props){
    const { display, onToggle }=props
  const currentMenuItem = useActiveMenu();
  const [isOpen, setIsOpen] = useState(false);
  // const toggleDropdown = () => setIsOpen(!isOpen);
  const { auth } = useAuthContext();

  const handleDropdownAction = (action: string) => {
    if (action == "logout") {
      if (props.onLogout) props.onLogout();
    }
    setIsOpen(false);
  };
    return(
        <div>
             <div className="py-2 lg:hidden" onClick={props.onToggle}>
            <svg className="h-6 w-6 text-blue-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
        <div className="flex flex-row lg:mt-[1.75rem] px-5 justify-between" >
            <div>
                <h3 className="text-[27px] font-bold pt-2">Welcome Sir manny 👋🏻</h3>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4 cursor-pointer
          2xl:max-w-[800px]">
            <div>
          <Image src={Avatar} alt="profile" className="2xl:w-20 2xl:h-20" />
            </div>
          <div className="text-xs flex flex-row md:gap-4">
            <p className="md:text-[1.1rem] text-[#85878D] font-medium">profile</p>
          <div className="mt-[-3]">
          <IoIosArrowForward size={29}/>
          </div>
          </div>
            </div>
          {/* <div className="">
            {isOpen ? (
              <DropdownMenu isOpen={isOpen} onClick={handleDropdownAction} onClose={() => setIsOpen(false)} />
            ) : null}
          </div> */}
        </div>
        </div>
    )
}

