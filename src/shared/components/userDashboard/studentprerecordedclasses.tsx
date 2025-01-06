import {  prerecordedClasses } from "@/core/const/userdashboard/attendancedetails.data";
import Image from "next/image";

export default function UserDashboardPreRecordedClasses(){
    return(
        <div className="bg-white p-4 rounded-lg shadow mt-6 border w-full">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-black text-xl">Pre-recorded courses</h3>
          <button className="text-black text-sm font-bold">View All</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-4">
          {prerecordedClasses.map((items) => (
              <div key={items.title} className="bg-white p-3 rounded-lg shadow flex flex-col gap-2 ">
                <div>
                  <Image src={items.img} alt={""} />
                </div>
                <div>
                  <p className="bg-[#F9731680] text-[#F13E3E] px-[9px] py-[2px] rounded-full w-full max-w-[77px] text-[6px] text-start">{items.title}</p>
                </div>
                <div>
                <p className="text-sm font-semibold">
                 {items.description}
                </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    )
}