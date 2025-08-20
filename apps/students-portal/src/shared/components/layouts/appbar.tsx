import Image from "next/image";
import Avatar from "../../../assets/Avatar.png";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import {
  useGetAllNotifications,
  useGetNotificationsCount,
} from "@/shared/hooks/query/classroom/ClassroomNotificationQuries";

import NotificationsDropdown from "../dashboard/components/NotificationDropDown";

interface Props {
  display: boolean;
  onToggle: () => void;
  onLogout?: () => void;
  title: string;
  userId: string;
  description?: string;
}

export default function PreAppBar(props: Props) {
  const { data: notificationCount } = useGetNotificationsCount();

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
          <h3 className="md:text-[27px] xsm:text-[1.15rem] xxs:text-[1.35rem] text-left font-bold">
            {title}
          </h3>
          <p className="text-[1rem] 2xl:text-[1rem] text-gray-600  hidden md:col lg:flex font-[400]">
            {description}
          </p>
          {/* <h3 className="text-[27px] font-bold pt-2">Welcome manny 👋🏻</h3> */}
        </div>
        <div
          className="flex  flex-row items-center gap-6 cursor-pointer
          2xl:max-w-[800px] md:max-w-[400px] ml-auto felx-1"
        >
          <div>
            <NotificationsDropdown
              notificationCount={notificationCount?.count}
              allNotifications={allNotifications?.data}
              allNotificationsLoading={allNotificationsLoading}
            />
          </div>
          <Link
            href={"/user/userProfile"}
            className="flex flex-col sm:flex-row gap-2 flex-1"
          >
            <div className="w-10 ">
              <Image
                src={Avatar}
                alt="profile"
                width={40}
                height={40}
                className="h-10 w-10 "
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
    </div>
  );
}
