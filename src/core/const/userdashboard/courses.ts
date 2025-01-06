import { StaticImageData } from "next/image";
import profile1 from "../../../assets/userdashboardimages/profile1.png"


export interface CourseCardProps {
   image:StaticImageData,
    title: string;
    instructor: string;
    role: string;
    duration: string;
    progress: number;
  }
export const courses:CourseCardProps[] = [
    {
      image: profile1,
      title: "Product Design Introduction",
      instructor: "Boss Tee",
      role: "Product Designer",
      duration: "1 hr 20 minutes",
      progress: 0,
    },
    {
      image: profile1,
      title: "Design Principles",
      instructor: "Boss Tee",
      role: "Product Designer",
      duration: "1 hr 20 minutes",
      progress: 0,
    },
    {
      image: profile1,
      title: "Introduction To UX Design",
      instructor: "Boss Tee",
      role: "Product Designer",
      duration: "1 hr 20 minutes",
      progress: 10,
    },
    {
      image: profile1,
      title: "Color Theory",
      instructor: "Boss Tee",
      role: "Product Designer",
      duration: "1 hr 20 minutes",
      progress: 0,
    },
  ];
  