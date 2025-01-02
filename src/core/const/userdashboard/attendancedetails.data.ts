import {  IconType } from "react-icons";
import { BsHouseDash } from "react-icons/bs";
import { MdOutlineAssignment } from "react-icons/md";
import { RiLiveLine } from "react-icons/ri";

interface IAttendanceData {
  title: string;
  value: string;
  icon:IconType
}

export const AttendaceDetails:IAttendanceData[] =[
    {
        title: "Course videos", value: "1 Watched",
        icon: BsHouseDash
    },
    {
        title: "Assignments done", value: "1 submission",
        icon: MdOutlineAssignment
    },
    {
        title: "Live sessions", value: "2 Attendance",
        icon: RiLiveLine
    },
    {
        title: "Hours attended", value: "5 hours",
        icon: MdOutlineAssignment
    },
  ]