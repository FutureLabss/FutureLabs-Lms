import { AttendaceDetails } from "@/core/const/userdashboard/attendancedetails.data";

export default function UserDashboardAttendanceDetails() {
    return (
      <div className=" pt-4 md:pt-6 lg:pt-8">
        <div className="grid xsm:grid-cols-1  xxs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3
         lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {AttendaceDetails.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-3 flex flex-row gap-3 items-center"
            >
                <div className="bg-[#F57F2033] p-[18px] rounded-full ">
                    <item.icon className="text-[#F57F20]" />
                </div>
                <div className="flex flex-col items-start">
              <span className="font-semibold lg:text-[1rem] text-sm">{item.value}</span>
              <span className="text-[#202020] lg:text-[1rem] font-bold  text-sm">{item.title}</span>
                </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  