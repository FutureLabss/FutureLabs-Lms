import { UserProgressData } from "@/core/const/userdashboard/progressdata";
import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";

export default function UserDashboardStudentProgress(){
    return(
        <div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-5">
             {/* left Section */}
          <div className="md:col-span-2 space-y-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-bold text-gray-700">Your Course Progress</h3>
              <div className="relative w-full bg-gray-200 rounded-full h-4 mt-2">
                <div
                  className="bg-green-500 h-4 rounded-full"
                  style={{ width: "10%" }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">10%</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-bold text-gray-700">Your Grade Points</h3>
              <p className="text-gray-500">-</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold text-background text-xl ">Tasks</h3>
              <div className="bg-pink-100 p-4 rounded-lg mt-5 text-pink-600 flex items-center justify-between">
                <div>
                <p className="text-sm text-[#A3072B] py-4">
                  Submit your assignment on colors
                </p>
                  <p  className="text-sm font-normal text-[#F64669] pt-1">May 13, 09:00 AM</p>
                </div>
                <div >
                   <IoIosArrowForward size={29} className="text-[#F64669]"/>
                </div>
              </div>
            </div>
          </div>
  
          {/* Right Section */}
          <div className="space-y-6 md:col-span-3">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-gray-700">
                  Upcoming live sessions
                </h3>
                <button className="text-black text-sm font-bold">View All</button>
              </div>
              <div className="mt-6 space-y-4">
                {UserProgressData.map((session, index) => (
                  <div
                    key={index}
                    className=" bg-white p-3 rounded-lg shadow-md"
                  >
                    <div className="flex flex-row items-center gap-2">
                        <div>
                            <Image src={session.img} alt={""} />
                        </div>
                        <div>
                        <p className="text-xs font-semibold text-[#202020]">{session.name}</p>
                      <p className="text-[#202020] font-light text-[9px]">{session.title}</p>
                        </div>
                    </div>
                    <div  className="flex items-center justify-between w-full pt-3">
                    <div>
                        <div>
                        <h3 className="text-sm text-black font-medium">{session.course}</h3>
                      <p className="text-xs text-black font-normal">
                     {session.time}
                      </p>
                        </div>
                      <p className="text-xs text-secondary pt-2">{session.duration}</p>
                    </div>
                    <div className="w-full max-w-[200px]">
                    <button
                      className={`text-sm px-4 py-4 w-full max-w-[200px] rounded-lg ${
                        session.joinable
                          ? "bg-background text-white"
                          : "bg-gray-300 text-gray-500"
                      }`}
                      disabled={!session.joinable}
                    >
                      {session.joinable ? "Join Now" : "Join Later"}
                    </button>
                    </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        </div>
    )
}