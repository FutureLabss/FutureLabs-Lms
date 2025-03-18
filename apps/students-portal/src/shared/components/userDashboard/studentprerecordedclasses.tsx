import {  prerecordedClasses } from "@/core/const/userdashboard/attendancedetails.data";
import Image from "next/image";

export default function UserDashboardPreRecordedClasses(){
    return(
        <div className="bg-white p-4 rounded-lg shadow mt-6 border w-full">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-black text-xl">Pre-recorded courses</h3>
          <button className="text-black text-sm font-bold">View All</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lgg:grid-cols-3 xl:grid-cols-4 gap-5 mt-6">
          {prerecordedClasses.map((items) => (
              <div key={items.name} className="bg-white p-3 rounded-3xl shadow-2xl flex flex-col gap-2">
                <div className="w-full overflow-hidden">
                  <Image src={items.img} alt={""} objectFit="cover"  
                  className="w-full   overflow-hidden"/>
                </div>
                <div>
                <p className="text-sm font-semibold">
                 {items.description}
                </p>
                </div>
                <div className="flex flex-row gap-4 mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-[#4CC21A] h-2 rounded-full"
                  style={{ width: `${items.progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-[#4CC21A] font-medium mt-[-5px] text-right">
                {items.progress}%
              </p>
                </div>
                <div className="flex flex-row items-center gap-2 mt-2 ">
              <div className="">
                <Image src={items.profile} alt={""} 
                className="rounded-full w-[26px] h-[26px]" />
              </div>
              <div className="flex flex-col gap-1 mt-3">
                <p className="text-xs font-semibold text-[#202020]">{items.name}</p>
                <p className="text-[#202020] font-light text-[9px]">{items.role}</p>
              </div>
            </div>
            <div  className="w-full mt-5 rounded-full  bg-[#212C4A] mb-6">
            <button
              className="w-full text-xs px-[58px] py-[12px] text-center bg-[#212C4A]
               text-white rounded-full hover:bg-[#212C4A]">
              Continue watching
            </button>
            </div>
              </div>
            ))}
        </div>
      </div>
    )
}