import UserLayout, { layoutInterface } from "@/shared/layouts/userLayout";
import profile1 from "../../assets/userdashboardimages/profile1.png";
import Image from "next/image";
import { IoMdCloudUpload } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import Breadcrumb from "@/shared/components/common/breadcrumbs/breadcrumbs";



export default function UserProfilePage() {
  return (
    <div>
      <div className="pb-5 sm:mt-[-5rem] ">
      <Breadcrumb />
      </div>
    <div className="bg-white w-full h-full flex justify-center py-10 mt-10">
      <div className=" ">
      <div className="flex justify-end px-5">
      <button className="px-4 py-[10px] text-sm font-medium
           text-black bg-transparent  border border-[#212C4A] rounded-xl hover:bg-transparent flex gap-2">
            <MdEdit size={19}/>
            Upload photo
          </button>
          </div>
        {/* Left Column: Avatar */}
        <div className="w-full max-w-4xl flex flex-col md:flex-row gap-8 pl-14 p-6">
        <div className="flex flex-col items-center gap-4 w-full md:w-1/3">
          <Image
            src={profile1}
            alt="profile"
            // className="w-32 h-32 rounded-full object-cover"
          />
          <div className="flex flex-row justify-end items-end w-full">
          <button className="px-4 py-[10px] text-sm font-medium
           text-black bg-transparent  border border-[#212C4A] rounded-xl hover:bg-transparent flex gap-2">
            <IoMdCloudUpload size={19}/>
            Upload photo
          </button>
          </div>
        </div>

        {/* Right Column: Profile Details */}
        <div className="flex-1 w-full md:w-2/3">
          {/* Profile Details */}
          <ul className="text-gray-700 space-y-4 ">
            <li>
              <strong>Full name:</strong> <br /> Big John Doe
            </li>
            <li>
              <strong>Email address:</strong> <br /> BigJohnDoe@gmail.com
            </li>
            <li>
              <strong>Phone number:</strong> <br /> +234123456789
            </li>
            <li>
              <strong>Chosen skill:</strong> <br /> Product Design
            </li>
            <li>
              <strong>Contact Address:</strong> <br /> No. 3 Chubb Road, Ikot
              Ekpene, Akwa Ibom
            </li>
          </ul>
        </div>
        </div>
      </div>
    </div>
    </div>
  );
}

function Layout(props: layoutInterface) {
  return (
    <UserLayout {...props} title="" description="" />
  );
}

UserProfilePage.Layout = Layout;
