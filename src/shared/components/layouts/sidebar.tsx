import logo from "../../../assets/logo.png"
import Link from "next/link";
import { FaTimes } from "react-icons/fa";
import { useAuthContext } from "@/shared/context/auth";
import { useState } from "react";
import Image from "next/image";
import Avatar from "../../../assets/Avatar.png"
import useActiveMenu from "@/shared/hooks/layout/activeMenu";
import DropdownMenu from "../common/dropdown";
import { AdminMenus } from "@/core/menu.const";
import { CiSettings } from "react-icons/ci";
import { SlSupport } from "react-icons/sl";
import { CiLogout } from "react-icons/ci";




interface Props {
  display: boolean;
  onToggle: () => void;
  onLogout?: () => void;
}

export default function AppDrawer(props:Props) {
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

  return (
    <>
      <div
        className={`w-[15rem] 2xl:w-[20rem] justify-between py-3 px-[2rem] fixed lg:flex z-20 lg:z-auto border-x h-screen 
          lg:h-[calc(100vh)] bg-gray-50 flex flex-col gap-1 overflow-y-auto
        ${display ? "flex" : "hidden"}
        ${display ? "top-0 " : ""} `}
      >
        <div className="flex mb-8 lg:hidden justify-between border">
          <h2 className="text-2xl lg:text-2xl font-semibold p-5">{currentMenuItem?.title || "Dashboard"}</h2>
          <div className="flex justify-end cursor-pointer" onClick={onToggle}>
            <FaTimes />
          </div>
        </div>
        <div>
        <div>
          <Image src={logo} alt={""} />
        </div>
        <div className="md:pt-[56px]">
        {AdminMenus.filter((item) => !item.disabled).map((item) => {
          const isActive = currentMenuItem && currentMenuItem.path != "" && item.path == currentMenuItem.path;
          return (
            <Link
            href={item.disabled ? "#" : item.path}
            key={item.path}
            className={`flex items-center py-3 px-4 rounded-md gap-3
              ${item.disabled ? "cursor-not-allowed" : "cursor-pointer"} 
              ${isActive ? "text-secondary font-semibold" : "text-[#202020] hover:text-secondary"}`}
          >
            {item.icon && (
              <item.icon
                size={20}
                className={`${isActive ? "text-secondary" : "text-gray-700"} `}
              />
            )}
            <span className="text-sm font-medium 2xl:text-base">{item.title}</span>
          </Link>
          );
        })}
        </div>
        </div>

        <div className="">
          <div className="">
            <h4 className="text-[#202020] text-[1rem] px-2 ">SETTINGS</h4>
            <Link
              href="#settings"
              className="flex items-center py-3 gap-3 texttext-[#202020] hover:text-secondary"
            >
              <span>
                <CiSettings />
              </span>
              <span className="text-sm font-medium 2xl:text-base">Settings</span>
            </Link>
            <Link
              href="#support"
              className="flex items-center py-3 gap-3 text-[#202020] hover:text-secondary"
            >
              <span>
               < SlSupport />
              </span>
              <span className="text-sm font-medium  2xl:text-base text-[#202020]">Support</span>
            </Link>
            <div className="pb-[1.5rem]">
            <button
              onClick={props.onLogout}
              className="flex items-center gap-3 text-red-600 hover:text-red-700"
            >
              <span>
                <CiLogout />
              </span>
              <span className="text-sm font-medium 2xl:text-base">Logout</span>
            </button>
            </div>
          </div>
        </div>
      </div>
      
      {display ? (
        <div onClick={onToggle} className="opacity-30 fixed inset-0 z-10 bg-black lg:hidden h-screen"></div>
      ) : null}
    </>
  );
}
