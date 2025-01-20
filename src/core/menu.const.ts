import { BsHouseDash } from "react-icons/bs";
import { Menu } from "./types/interface/menu";
import { AdminRoutes } from "./routes.const";
import { SlGraduation } from "react-icons/sl";
import { MdOutlineAssignment } from "react-icons/md";
import { RiLiveLine } from "react-icons/ri";
import { MdLeaderboard } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";





// import { LuUsers2 } from "react-icons/lu";
// import { Menu } from "../types/interfaces/components/menu.interface";

export const AdminMenus: Menu[] = [
  {
    title: "Dashboard",
    id: "1",
    icon: BsHouseDash,
    path: `${AdminRoutes.DASHBOARD}`,
  },
  {
    title: "Courses",
    id: "2",
    icon: SlGraduation,
    path: `${AdminRoutes.COURSES}`,
  },
  {
    title: "Assignments",
    id: "3",
    icon: MdOutlineAssignment,
    path: `${AdminRoutes.PAYMENT}`,
    disabled: false,
  },
  {
    title: "Live Classes",
    id: "4",
    icon: RiLiveLine,
    path: `${AdminRoutes.LIVESESSIONS}`,
    disabled: true,
  },
  {
    title: "Leaderboard",
    id: "5",
    icon: MdLeaderboard,
    disabled: true,
    path: `${AdminRoutes.LEADERBOARD}`,
  },
  {
    title: "Notifications",
    id: "6",
    icon: IoIosNotificationsOutline,
    disabled: true,
    path: `${AdminRoutes.NOTIFICATION}`,
  },
 
];

export const AdminMenuLookup = AdminMenus.reduce<{ [key: string]: Menu }>((val, item) => {
  val = { ...val, [item.path]: item };
  return val;
}, {});


