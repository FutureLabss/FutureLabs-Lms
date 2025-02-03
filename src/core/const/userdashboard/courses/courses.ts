import { StaticImageData } from "next/image";
import color from "../../../../assets/courses/color.png"
import design from "../../../../assets/courses/design.png"
import ux from "../../../../assets/courses/ux.png"
import intro from "../../../../assets/courses/intro.png"

export interface CourseSection {
  title: string
  duration: string
  completed?: boolean
}
 export interface CourseCardProps{
    id: string
    title: string
    image:StaticImageData   
    instructor: string
    role: string
    duration: string
    progress: number
    description?: string
    sections?: CourseSection[]
  }
export const courses:CourseCardProps[] = [
    {
      image: intro,
      title: "Product Design Introduction",
      instructor: "Boss Tee",
      role: "Product Designer",
      duration: "1 hr 20 minutes",
      progress: 0,
      id: "1",
    },
    {
      image: color,
      title: "Design Principles",
      instructor: "Boss Tee",
      role: "Product Designer",
      duration: "1 hr 20 minutes",
      progress: 0,
      id: "2"
    },
    {
      image: ux,
      title: "Introduction To UX Design",
      instructor: "Boss Tee",
      role: "Product Designer",
      duration: "1 hr 20 minutes",
      progress: 10,
      id: "3"
    },
    {
      image: design,
      title: "Color Theory",
      instructor: "Boss Tee",
      role: "Product Designer",
      duration: "1 hr 20 minutes",
      progress: 0,
      id: "4"
    },
    {
      image: design,
      title: "Color Theory",
      instructor: "Boss Tee",
      role: "Product Designer",
      duration: "1 hr 20 minutes",
      progress: 0,
      id: "5"
    },
    {
      image: design,
      title: "Color Theory",
      instructor: "Boss Tee",
      role: "Product Designer",
      duration: "1 hr 20 minutes",
      progress: 0,
      id: "6"
    },
  ];
  