import { StaticImageData } from "next/image";
// import avatar from "../../../assets/Avatar.png";

interface IUserProgressData {
  name: string;
  title: string;
  course: string;
  time: string;
  duration: string;
  img: StaticImageData;
  joinable: boolean;
}

export const UserProgressData: IUserProgressData[] = [
  // {
  //   name: "Boss Tee",
  //   title:"Tutor",
  //   course: "UX Design Fundamentals",
  //   time: "1:30pm",
  //   duration: "1 hr 20 minutes",
  //   joinable: true,
  //   img:avatar,
  //   },
  // {
  //   name: "Emediong",
  //   course: "Interaction Design",
  //   title:"Students",
  //   time: "1:30pm",
  //   duration: "1 hr 20 minutes",
  //   joinable: false,
  //   img:avatar,
  // },
];
