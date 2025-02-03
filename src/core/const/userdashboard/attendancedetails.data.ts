import { StaticImageData } from "next/image";
import {  IconType } from "react-icons";
import { BsHouseDash } from "react-icons/bs";
import { MdOutlineAssignment } from "react-icons/md";
import { RiLiveLine } from "react-icons/ri";
import prerecorded from "../../../assets/userdashboardimages/prerecorded.png"
import profile from "../../../assets/courses/avatar.png"

interface IAttendanceData {
  title: string;
  value: string;
  icon:IconType
}
interface IPreRecordedData {
    img:StaticImageData
    description: string;
    progress: number;
    profile:StaticImageData;
    name:string;
    role:string;
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


export const prerecordedClasses:IPreRecordedData[] =[
    {
        description: "Beginner's Guide to Becoming A Designer",
        img: prerecorded,
        progress: 20,
        profile: profile,
        name: "Boss tee",
        role: "Product Designer"
    },
    {
        description: "Beginner's Guide to Becoming A Designer",
        img: prerecorded,
        progress: 2,
        profile: profile,
         name: "Boss tee",
        role: "Product Designer"
    },
    {
        description: "Beginner's Guide to Becoming A Designere",
        img: prerecorded,
        progress: 10,
        profile: profile,
        name: "Boss tee",
        role: "Product Designer"
    },
    {
        description: "Beginner's Guide to Becoming A Designer",
        img: prerecorded,
        progress: 3,
        profile: profile,
        name: "Boss tee",
        role: "Product Designer"
    },
  ]