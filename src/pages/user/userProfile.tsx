import UserLayout, { type layoutInterface } from "@/shared/layouts/userLayout";
import Image from "next/image";
import profile1 from "../../assets/userdashboardimages/profile1.png";
import { IoMdCloudUpload } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import Breadcrumb from "@/shared/components/common/breadcrumbs/breadcrumbs";
import { useEditUserProfile } from "@/shared/hooks/mutate/user";
import { useGetMeprofile } from "@/shared/hooks/query/users";
import { useState, useRef } from "react";
import type { EditUserProfileData } from "@/core/types/dto/singleuser";

export default function UserProfilePage() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: user } = useGetMeprofile();
  const userId = user?.data?.id;

  const { mutate: editUser } = useEditUserProfile(userId as string, {
    onSuccess() {
      console.log("Profile updated successfully");
    },
    onError(error) {
      console.error("Error updating profile:", error);
    },
  });

  const createFormData = (data: EditUserProfileData): FormData => {
    const formData = new FormData();
    formData.append("_method", data._method);
    formData.append("first_name", data.first_name);
    formData.append("surname", data.surname);
    formData.append("age_range", data.age_range);
    formData.append("gender", data.gender);
    formData.append("state", data.state);
    formData.append("lga", data.lga);
    formData.append("phone_number", data.phone_number);
    if (data.image) {
      formData.append("image", data.image);
    }
    return formData;
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const localImageUrl = URL.createObjectURL(file);
      setProfileImage(localImageUrl);

      const imageData: EditUserProfileData = {
        _method: "PUT",
        first_name: user?.data.fullname || "",
        surname: user?.data.fullname || "",
        age_range: "",
        gender: "",
        state: "",
        lga: "",
        phone_number: user?.data.profile.phone_number || "",
        image: file,
      };

      const formData = createFormData(imageData);

      try {
        editUser(formData as unknown as EditUserProfileData);
        console.log("Profile image updated successfully");
      } catch (error) {
        console.error("Error uploading profile image:", error);
      }
    } else {
      console.error("No file selected for upload");
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const profileData = {
    "Full name": user?.data.fullname || "Big John Doe",
    "Email address": user?.data.email || "BigJohnDoe@gmail.com",
    "Phone number": user?.data.profile.phone_number || "+234123456789",
    "Chosen skill": "Product Design",
    "Contact Address": user?.data.profile.address || "No. 3 Chubb Road, Ikot Ekpene, Akwa Ibom",
    // "image_url":user?.data.profile.image_url
  };
  console.log("Profile Image URL:", user?.data.profile.image_url);
  

  return (
    <div>
      <div className="pb-5 sm:mt-[-5rem] ">
        <Breadcrumb />
      </div>
      <div className="bg-white w-full h-full flex justify-center py-10 mt-10">
        <div className=" ">
          <div className="flex justify-end px-5">
            <button
              className="px-4 py-[10px] text-sm font-medium
           text-black bg-transparent  border border-[#212C4A] rounded-xl hover:bg-transparent flex gap-2"
            >
              <MdEdit size={19} />
              Edit profile
            </button>
          </div>
          {/* Left Column: Avatar */}
          <div className="w-full max-w-4xl flex flex-col md:flex-row gap-8 pl-14 p-6">
            <div className="flex flex-col items-center gap-4 ">
              <div className="relative w-[409px] h-[409px]">
                {/* <Image
                  src={profileImage || user?.data.profile.image_url || profile1}
                  alt="profile"
                  layout="fill"
                  objectFit="cover"
                  className=""
                /> */}
                {user?.data.profile.image_url ? (
                <Image
                  src={user?.data.profile.image_url}
                  alt="profile"
                  layout="fill"
                  objectFit="cover"
                  unoptimized
                />
              ) : (
                <Image src={profile1} alt="profile"
                layout="fill"
                objectFit="cover" />
              )}
              </div>
              <div className="flex flex-row justify-end items-end w-full">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  onClick={triggerFileInput}
                  className="px-4 py-[10px] text-sm font-medium
                  text-black bg-transparent  border border-[#212C4A] rounded-xl hover:bg-transparent flex gap-2"
                >
                  <IoMdCloudUpload size={19} />
                  Upload photo
                </button>
              </div>
            </div>

            {/* Right Column: Profile Details */}
            <div className="flex-1 w-full md:w-2/3">
              <ul className="text-gray-700 space-y-4 ">
                {Object.entries(profileData).map(([label, value], index) => (
                  <li key={index}>
                    <strong>{label}:</strong> <br /> {value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Layout(props: layoutInterface) {
  return <UserLayout {...props} title="" description="" />;
}

UserProfilePage.Layout = Layout;