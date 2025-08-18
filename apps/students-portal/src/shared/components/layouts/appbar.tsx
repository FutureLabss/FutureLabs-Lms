import Image from "next/image";
import Avatar from "../../../assets/Avatar.png";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import { Bell, Loader } from "lucide-react";
import {
  useGetAllNotifications,
  useGetNotificationsCount,
} from "@/shared/hooks/query/classroom/ClassroomNotificationQuries";
import Modal from "../common/modal/modal";
import { useState } from "react";

interface Props {
  display: boolean;
  onToggle: () => void;
  onLogout?: () => void;
  title: string;
  userId: string;
  description?: string;
}

export default function PreAppBar(props: Props) {
  const [showModal, setShowModal] = useState(false);
  const { data: notificationCount, loading: isLoading } =
    useGetNotificationsCount();

  const { data: allNotifications, loading: allNotificationsLoading } =
    useGetAllNotifications();

  const { title, description } = props;

  return (
    <div className="flex justify-between items-center md:flex-none">
      <div className="py-2 px-5 lg:hidden" onClick={props.onToggle}>
        <svg
          className="h-6 w-6 text-blue-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
      </div>
      <div className="flex flex-row w-full py-4 gap-4 md:gap-0 lg:ml-[16rem] 2xl:ml-[22rem] px-3 sm:px-5 items-center lg:justify-between">
        <div className="w-full sm:mx-auto  text-center md:mx-0 md:max-w-[400px]">
          <h3 className="md:text-[27px] xsm:text-[1.15rem] xxs:text-[1.35rem] font-bold">
            {title}
          </h3>
          <p className="text-[1rem] 2xl:text-[1rem] text-gray-600  hidden md:col lg:flex font-[400]">
            {description}
          </p>
          {/* <h3 className="text-[27px] font-bold pt-2">Welcome manny 👋🏻</h3> */}
        </div>
        <div
          className="flex flex-col md:flex-row items-center gap-6 cursor-pointer
          2xl:max-w-[800px] md:max-w-[400px] ml-auto"
        >
          <div className="relative" onClick={() => setShowModal(true)}>
            {isLoading && !notificationCount ? null : (
              <span className=" w-4 h-4 p-2 rounded-full bg-red-600 text-white absolute top-[-10px] right-[-8px] flex items-center justify-center text-[8px]">
                {notificationCount?.count}
              </span>
            )}
            <Bell size={25} />
          </div>
          <Link href={"/user/userProfile"} className="flex gap-2">
            <div>
              <Image
                src={Avatar}
                alt="profile"
                className="h-10 w-10 2xl:w-12 2xl:h-12 aspect-auto"
              />
            </div>
            <div
              //  onClick={toggleModal}
              className="text-xs flex flex-row  items-center"
            >
              <p className="md:text-[.9rem]  text-[#85878D] font-medium">
                profile
              </p>
              {/* <div className=""> */}
              <IoIosArrowForward size={15} />
              {/* </div> */}
            </div>
          </Link>
        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center gap-4">
            <span
              className={`cursor-pointer text-center text-[#85878D] font-medium text-2xl`}
            >
              Notifications
            </span>
          </div>
          {allNotificationsLoading ? (
            <Loader className="animate-spin" />
          ) : (
            allNotifications?.data?.map((notification) => (
              <div
                key={notification.id}
                className="flex flex-row items-center gap-4"
              >
                <Link
                  href={`/user/notification/${notification.id}`}
                  className={`cursor-pointer text-center text-[#85878D] font-medium text-sm flex justify-between w-full items-center`}
                >
                  {notification.title}

                  {notification.read ? (
                    <span className="text-[#85878D] font-medium text-sm flex">
                      <IoIosArrowForward size={15} />
                    </span>
                  ) : (
                    <span className="text-[#85878D] font-medium text-sm flex">
                      <IoIosArrowForward size={15} />
                    </span>
                  )}
                </Link>
              </div>
            ))
          )}
        </div>
      </Modal>
    </div>
  );
}
