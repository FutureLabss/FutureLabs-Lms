import Image from "next/image";
import Avatar from "../../../assets/Avatar.png";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";

interface Props {
  display: boolean;
  onToggle: () => void;
  onLogout?: () => void;
  title: string;
  userId: string;
  description?: string;
}

export default function PreAppBar(props: Props) {
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
          className="flex flex-col md:flex-row items-center gap-2 cursor-pointer
          2xl:max-w-[800px] md:max-w-[400px] ml-auto"
        >
          <div>
            <Image
              src={Avatar}
              alt="profile"
              className="h-10 w-10 2xl:w-12 2xl:h-12 aspect-auto"
            />
          </div>
          <Link href={"/user/userProfile"}>
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
