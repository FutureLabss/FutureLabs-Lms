import { UserProgressData } from "@/core/const/userdashboard/progressdata";
import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";

export default function UserDashboardStudentProgress() {
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mt-5">
        {/* Left Section */}
        <div className="md:w-2/5 flex flex-col space-y-4">
          <div className="bg-white p-4 rounded-lg shadow flex-1">
            <h3 className="font-bold text-gray-700">Your Course Progress</h3>
            <div className="relative w-full bg-gray-200 rounded-full h-4 mt-2">
              <div
                className="bg-green-500 h-4 rounded-full"
                style={{ width: "0%" }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">0%</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow flex-1">
            <h3 className="font-bold text-gray-700">Your Grade Points</h3>
            <p className="text-gray-500">-</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow flex-1">
            <h3 className="font-semibold text-background text-xl">Tasks</h3>
            <div className="bg-pink-100 p-4 rounded-lg mt-5 text-pink-600 flex items-center justify-between">
              <div>
                <p className="text-sm text-[#A3072B] py-4">
                  Submit your assignment on colors
                </p>
                <p className="text-sm font-normal text-[#F64669] pt-1">
                  May 13, 09:00 AM
                </p>
              </div>
              <div>
                <IoIosArrowForward size={29} className="text-[#F64669]" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="md:w-3/5 flex flex-col space-y-6">
          <div className="bg-white p-4 rounded-lg shadow flex-1">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-gray-700">
                Upcoming live sessions
              </h3>
              <button className="text-black text-sm font-bold">View All</button>
            </div>
            <div className="mt-6 space-y-4">
              {
                UserProgressData && UserProgressData.length > 0 ? (
                  UserProgressData.map((session, index) => (
                    <div
                      key={index}
                      className="bg-white p-3 rounded-lg shadow-md"
                    >
                      <div className="flex flex-row items-center gap-2">
                        <div>
                          <Image src={session.img} alt={""} />
                        </div>
                        <div className="flex flex-col gap-2">
                          <p className="text-xs font-semibold text-[#202020]">
                            {session.name}
                          </p>
                          <p className="text-[#202020] font-light text-[9px]">
                            {session.title}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between w-full pt-5">
                        <div>
                          <h3 className="text-sm text-black font-medium">
                            {session.course}
                          </h3>
                          <p className="text-xs text-black font-normal">
                            {session.time}
                          </p>
                          <p className="text-xs text-secondary pt-2">
                            {session.duration}
                          </p>
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
                  ))
                ) : (
                  <p className="text-center text-gray-500">
                    No upcoming sessions
                  </p>
                )
                // UserProgressData.map((session, index) => (
                //   <div key={index} className="bg-white p-3 rounded-lg shadow-md">
                //     <div className="flex flex-row items-center gap-2">
                //       <div>
                //         <Image src={session.img} alt={""} />
                //       </div>
                //       <div className="flex flex-col gap-2">
                //         <p className="text-xs font-semibold text-[#202020]">
                //           {session.name}
                //         </p>
                //         <p className="text-[#202020] font-light text-[9px]">
                //           {session.title}
                //         </p>
                //       </div>
                //     </div>
                //     <div className="flex items-center justify-between w-full pt-5">
                //       <div>
                //         <h3 className="text-sm text-black font-medium">
                //           {session.course}
                //         </h3>
                //         <p className="text-xs text-black font-normal">
                //           {session.time}
                //         </p>
                //         <p className="text-xs text-secondary pt-2">
                //           {session.duration}
                //         </p>
                //       </div>
                //       <div className="w-full max-w-[200px]">
                //         <button
                //           className={`text-sm px-4 py-4 w-full max-w-[200px] rounded-lg ${
                //             session.joinable
                //               ? "bg-background text-white"
                //               : "bg-gray-300 text-gray-500"
                //           }`}
                //           disabled={!session.joinable}
                //         >
                //           {session.joinable ? "Join Now" : "Join Later"}
                //         </button>
                //       </div>
                //     </div>
                //   </div>
                // ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
