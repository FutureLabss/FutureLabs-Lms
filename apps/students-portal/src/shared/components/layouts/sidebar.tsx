import logo from "../../../assets/logo.png";
import Link from "next/link";
import { FaTimes } from "react-icons/fa";
import Image from "next/image";
import useActiveMenu from "@/shared/hooks/layout/activeMenu";
import { AdminMenus } from "@/core/menu.const";
import { CiSettings } from "react-icons/ci";
import { SlSupport } from "react-icons/sl";
import { CiLogout } from "react-icons/ci";
import { useRouter } from "next/router";
import { useAuthContext } from "@/shared/context/auth";
// import Modal from "../common/modal/modal";
// import { useState } from "react";

interface Props {
  display: boolean;
  onToggle: () => void;
  onLogout?: () => void;
}

export default function AppDrawer(props: Props) {
  const { display, onToggle } = props;
  const currentMenuItem = useActiveMenu();
  const router = useRouter();
  const { logout } = useAuthContext();
  // const [logoutModal, setLogoutModal] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };
  //  const handleOpenModal = ()=>{
  //   setLogoutModal(true);
  //   };
  //   const toggleLogoutModal = () => {
  //     setLogoutModal((val) => !val);
  //   };

  return (
    <>
      <div
        className={`w-[15rem] 2xl:w-[20rem] justify-between py-3 px-[2rem] fixed lg:flex z-20 lg:z-auto border-x h-screen 
          lg:h-[calc(100vh)] bg-gray-50 flex flex-col gap-1 overflow-y-auto
        ${display ? "flex" : "hidden"}
        ${display ? "top-0 " : ""} `}
      >
        <div>
          <div className="flex flex-row justify-between">
            <div>
              <Image src={logo} alt={""} />
            </div>
            <div className="lg:hidden flex justify-end cursor-pointer" onClick={onToggle}>
              <FaTimes className="text-secondary" />
            </div>
          </div>
          <div className="md:pt-[56px]">
            {AdminMenus.map((item) => {
              const isActive =
                currentMenuItem && currentMenuItem.path !== "" && item.path === currentMenuItem.path;
              return (
                <Link
                  href={item.disabled ? "#" : item.path}
                  key={item.path}
                  className={`flex items-center py-3 px-4 rounded-md gap-3
                    ${item.disabled ? "cursor-not-allowed text-gray-400" : "cursor-pointer"}
                    ${isActive ? "text-secondary font-semibold" : "text-[#202020] hover:text-secondary"}`}
                  onClick={(e) => {
                    if (item.disabled) e.preventDefault();
                  }}
                >
                  {item.icon && (
                    <item.icon
                      size={20}
                      className={`${isActive ? "text-secondary" : item.disabled ? "text-gray-400" : "text-gray-700"}`}
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
                <SlSupport />
              </span>
              <span className="text-sm font-medium  2xl:text-base text-[#202020]">Support</span>
            </Link>
            <div className="pb-[1.5rem]">
              <button
                onClick={handleLogout}
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
        {/* <Modal isOpen={logoutModal} onClose={() => setLogoutModal(false)}>
        <div className="py-5 bg-white">
          <p className="text-center">Are you sure you want to logout?</p>
          <div className="flex flex-row gap-5  ">
            <div className=" text-secondary-default font-medium text-[14px] sm:text-[20px] font-manrope
         border border-secondary-default px-5 py-1 rounded">
              <button className="cursor-pointer" onClick={handleLogout}>Yes</button>
            </div>
            <div className=" text-white font-medium text-[14px] sm:text-[20px] font-manrope
         bg-secondary-default px-3 py-1 rounded">
              <button className="cursor-pointer" onClick={toggleLogoutModal}>No</button>
            </div>
          </div>
        </div>
      </Modal> */}
      </div>
      {display && (
        <div
          className="fixed inset-0 z-[1] bg-black bg-opacity-30 lg:hidden"
          onClick={onToggle}
        ></div>
      )}
    </>
  );
}
