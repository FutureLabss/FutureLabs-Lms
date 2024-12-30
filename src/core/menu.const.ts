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
    path: `${AdminRoutes.USERS}`,
  },
  {
    title: "Assignments",
    id: "3",
    icon: MdOutlineAssignment,
    path: `${AdminRoutes.PAYMENT}`,
  },
  {
    title: "Live Classes",
    id: "2",
    icon: RiLiveLine,
    path: `${AdminRoutes.AdminTeam}`,
    // disabled: true,
  },
  {
    title: "Leaderboard",
    id: "2",
    icon: MdLeaderboard,
    // disabled: false,
    path: `${AdminRoutes.SUBSCRIPTION}`,
  },
  {
    title: "Notifications",
    id: "2",
    icon: IoIosNotificationsOutline,
    // disabled: false,
    path: `${AdminRoutes.SUBSCRIPTION}`,
  },
];

export const AdminMenuLookup = AdminMenus.reduce<{ [key: string]: Menu }>((val, item) => {
  val = { ...val, [item.path]: item };
  return val;
}, {});
