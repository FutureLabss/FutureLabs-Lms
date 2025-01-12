import { StaticImageData } from "next/image";
import color from "../../../assets/courses/color.png"
import design from "../../../assets/courses/design.png"
import ux from "../../../assets/courses/ux.png"
import intro from "../../../assets/courses/intro.png"


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
      image: intro,
      title: "Product Design Introduction",
      instructor: "Boss Tee",
      role: "Product Designer",
      duration: "1 hr 20 minutes",
      progress: 0,
    },
    {
      image: color,
      title: "Design Principles",
      instructor: "Boss Tee",
      role: "Product Designer",
      duration: "1 hr 20 minutes",
      progress: 0,
    },
    {
      image: ux,
      title: "Introduction To UX Design",
      instructor: "Boss Tee",
      role: "Product Designer",
      duration: "1 hr 20 minutes",
      progress: 10,
    },
    {
      image: design,
      title: "Color Theory",
      instructor: "Boss Tee",
      role: "Product Designer",
      duration: "1 hr 20 minutes",
      progress: 0,
    },
    {
      image: design,
      title: "Color Theory",
      instructor: "Boss Tee",
      role: "Product Designer",
      duration: "1 hr 20 minutes",
      progress: 0,
    },
    {
      image: design,
      title: "Color Theory",
      instructor: "Boss Tee",
      role: "Product Designer",
      duration: "1 hr 20 minutes",
      progress: 0,
    },
  ];
  