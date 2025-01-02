import { ReactNode, useEffect, useState } from "react";
import { useAuthContext } from "../context/auth";
import AppDrawer from "../components/layouts/sidebar";
import PreAppBar from "../components/layouts/appbar";


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
  }, [islLoggedIn, loaded]);

  const toggleDrawer = () => {
    setShowDrawer((val) => !val);
  };

  const toggleLogOutModal = () => {
    console.log("heloo")
  };

  return (
    <>
      {/* {islLoggedIn ? ( */}
        <div className="h-screen ">
          
          <div className="max-w-[2540px] mx-auto w-full flex flex-row ">
          <div className="">
            <AppDrawer onLogout={toggleLogOutModal} display={showDrawer} onToggle={toggleDrawer} />
          </div>
          <div className=" bg-[#f1f1f1] text-gray-900 flex flex-col gap-y-1 w-full   ">
          <PreAppBar onToggle={toggleDrawer} display={false} />
            <div className="flex-col  lg:pl-[16rem] 2xl:pl-[30rem]  bg-[#f1f1f1] flex gap-y-1 w-full p-5 md:p-7">
              {props.children}
            </div>
          </div>
          </div>
        </div>
      {/* ) : (
        <></>
      )} */}
    
    </>
  );
}
