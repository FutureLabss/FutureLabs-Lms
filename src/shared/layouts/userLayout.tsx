// import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { useAuthContext } from "../context/auth";
import AppDrawer from "../components/layouts/sidebar";
// import AppBar from "../components/layout/appBar";
// import AppDrawer from "../components/layout/appDrawer";
// import Modal from "../components/common/modal";
// import Button from "../components/common/button/button";

export interface layoutInterface {
  children?: ReactNode | undefined;
  title: string;
  description: string;
}

export default function UserLayout(props: layoutInterface) {
  // const { title, description } = props;
  const [showDrawer, setShowDrawer] = useState(false);
  // const [logoutModal, setLogoutModal] = useState(false);
  const { islLoggedIn, loaded } = useAuthContext();
  //   const router = useRouter();

  useEffect(() => {
    if (!loaded) return;
    // if (!islLoggedIn) {
    //   router.push("/");
    // }
  }, [islLoggedIn, loaded]);

  const toggleDrawer = () => {
    setShowDrawer((val) => !val);
  };

  const toggleLogOutModal = () => {
    // setLogoutModal((val) => !val);
    console.log("heloo")
  };

  // const handleLogout = () => {
  //   logout(toggleLogOutModal);
  // };

  return (
    <>
      {/* {islLoggedIn ? ( */}
        <div className="h-screen ">
          
          <div className="max-w-[2540px] mx-auto w-full flex flex-row ">
          <div className="">
            <AppDrawer onLogout={toggleLogOutModal} display={showDrawer} onToggle={toggleDrawer} />
          </div>
          <div className=" bg-white text-gray-900 flex flex-col gap-y-1 w-full   ">
            <div className="flex-col  lg:pl-[16rem] 2xl:pl-[30rem]  bg-white flex gap-y-1 w-full p-5 md:p-7">
              {props.children}
            </div>
          </div>
          </div>
        </div>
      {/* ) : (
        <></>
      )} */}

      {/* <Modal isOpen={logoutModal} onClose={() => setLogoutModal(false)}>
        <div className="py-5 bg-white">
          <p className="text-center">Are you sure you want to logout?</p>
          <div className="flex flex-row justify-around mt-5">
            <Button primary className="cursor-pointer" onClick={handleLogout}>
              Yes
            </Button>
            <Button secondary className="cursor-pointer" onClick={toggleLogOutModal}>
              No
            </Button>
          </div>
        </div>
      </Modal> */}
    </>
  );
}
