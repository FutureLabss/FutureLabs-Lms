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
import EmptyState from "@/shared/components/common/emptyState/empty";

export default function UserProfilePage() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: user, loading } = useGetMeprofile();
  const userId = user?.data?.id;
  console.log(user);

  const { mutate: editUser } = useEditUserProfile(userId as string, {
    onSuccess(data) {
      console.log("Profile updated successfully", data);
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
    formData.append("phone_number", data.phone);
    formData.append("image", data.image);
    return formData;
  };

  // const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     const localImageUrl = URL.createObjectURL(file);
  //     setProfileImage(localImageUrl);
  //     const imageData: EditUserProfileData = {
  //       _method: "PUT",
  //       first_name: user?.data.fullname || "",
  //       surname: user?.data.fullname || "",
  //       age_range: "",
  //       gender: "",
  //       state: "",
  //       lga: "",
  //       phone_number: user?.data.profile.phone_number || "",
  //       image: file,
  //     };
  //     const formData = createFormData(imageData);
  //     console.log("these are edited formData",formData)
  //     try {
  //       editUser(formData as unknown as EditUserProfileData);
  //       console.log("Profile image updated successfully", formData);
  //     } catch (error) {
  //       console.error("Error uploading profile image:", error);
  //     }
  //   } else {
  //     console.error("No file selected for upload");
  //   }
  // };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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
        phone: user?.data?.profile?.phone || "",
        image: file,
      };

      const formData = createFormData(imageData);
      console.log("these are edited formData", formData);

      try {
        editUser(formData as unknown as EditUserProfileData);
        // isFetching();
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
    "Full name": user?.data?.fullname,
    "Email address": user?.data?.email,
    "Phone number": user?.data?.phone,
    "Chosen skill": "Product Design",
    "Contact Address": user?.data?.address,
    // "image_url":user?.data.profile.image_url
  };

  return (
    <div>
      <div className="pb-5 sm:mt-[-5rem] ">
        <Breadcrumb />
      </div>
      <div className="bg-white w-full h-full flex justify-center py-10 mt-10">
  <div className="w-full">
    {loading ? (
      <EmptyState />
    ) : (
      <>
        {/* Edit Button - Top Right */}
        <div className="flex justify-end px-5">
          <button
            className="px-4 py-[10px] text-sm font-medium text-black bg-transparent border border-[#212C4A] rounded-xl hover:bg-transparent flex gap-2"
          >
            <MdEdit size={19} />
            Edit profile
          </button>
        </div>

        {/* Layout Container */}
        <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-8 p-4 sm:p-6 2xl:pt-60">
          
          {/* Left Column: Avatar */}
          <div className="flex flex-col items-center gap-4 md:items-start">
            <div className="relative w-48 h-48 sm:w-[409px] sm:h-[409px]">
              {user?.data?.profile?.image_url && (
                <Image
                  src={
                    profileImage || user?.data?.profile?.image_url || profile1
                  }
                  alt="profile"
                  layout="fill"
                  objectFit="cover"
                  unoptimized
                />
              )}
            </div>
          </div>

          {/* Right Column: Details + Upload */}
          <div className="flex flex-col justify-between w-full md:w-2/3">
            <div className="text-gray-700 space-y-4 text-sm sm:text-base">
              {Object.entries(profileData).map(([label, value], index) => (
                <div key={index}>
                  <strong>{label}:</strong>
                  <br />
                  {value}
                </div>
              ))}
            </div>

            {/* Upload Photo - Order last on mobile, unchanged on desktop */}
            <div className="flex justify-center md:justify-end mt-6 md:mt-10 order-last md:order-none">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
              <button
                onClick={triggerFileInput}
                className="px-4 py-[10px] text-sm font-medium text-black border border-[#212C4A] rounded-xl bg-transparent hover:bg-gray-100 flex gap-2"
              >
                <IoMdCloudUpload size={19} />
                Upload photo
              </button>
            </div>
          </div>
        </div>
      </>
    )}
  </div>
</div>

    </div>
  );
}

function Layout(props: layoutInterface) {
  return <UserLayout {...props} title="" description="" />;
}

UserProfilePage.Layout = Layout;
