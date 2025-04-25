/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { GoPlus } from "react-icons/go";
import { LuScanLine } from "react-icons/lu";
import { MdQrCode2 } from "react-icons/md";
import { FiMinusCircle } from "react-icons/fi";
import { BiMessageDetail } from "react-icons/bi";
import { LuHash } from "react-icons/lu";
import { IoRepeat } from "react-icons/io5";
import { ImBin } from "react-icons/im";
import { CiHome } from "react-icons/ci";
import { FaUsers } from "react-icons/fa6";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { FaUserTimes } from "react-icons/fa";
import { TiPencil } from "react-icons/ti";
import { FiSearch } from "react-icons/fi";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { LuRefreshCcw } from "react-icons/lu";
import { GoCopy } from "react-icons/go";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
// import { FaTrashAlt } from "react-icons/fa";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Link = (props: React.SVGProps<SVGSVGElement>) => (
  <LuScanLine {...(props as any)} />
);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Qr = (props: React.SVGProps<SVGSVGElement>) => (
  <MdQrCode2 {...(props as any)} />
);
export const Circle = (props: React.SVGProps<SVGSVGElement>) => (
  <FiMinusCircle {...(props as any)} />
);
export const Message = (props: React.SVGProps<SVGSVGElement>) => (
  <BiMessageDetail {...(props as any)} />
);
export const Hash = (props: React.SVGProps<SVGSVGElement>) => (
  <LuHash {...(props as any)} />
);
export const Repeat = (props: React.SVGProps<SVGSVGElement>) => (
  <IoRepeat {...(props as any)} />
);
export const Bin = (props: React.SVGProps<SVGSVGElement>) => (
  <RiDeleteBin5Line {...(props as any)} />
);
export const Home = (props: React.SVGProps<SVGSVGElement>) => (
  <CiHome {...(props as any)} />
);
export const Plus = (props: React.SVGProps<SVGSVGElement>) => (
  <GoPlus {...(props as any)} />
);
export const Userg = (props: React.SVGProps<SVGSVGElement>) => (
  <FaUsers {...(props as any)} />
);
export const Pencil = (props: React.SVGProps<SVGSVGElement>) => (
  <HiOutlinePencilAlt {...(props as any)} />
);
export const Usercancel = (props: React.SVGProps<SVGSVGElement>) => (
  <FaUserTimes {...(props as any)} />
);
export const Edit = (props: React.SVGProps<SVGSVGElement>) => (
  <TiPencil {...(props as any)} />
);
export const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <FiSearch {...(props as any)} />
);
export const QuesCircle = (props: React.SVGProps<SVGSVGElement>) => (
  <FaRegCircleQuestion {...(props as any)} />
);
export const UploadDel = (props: React.SVGProps<SVGSVGElement>) => (
  <ImBin {...(props as any)} />
);
export const UploadRefresh = (props: React.SVGProps<SVGSVGElement>) => (
  <LuRefreshCcw {...(props as any)} />
);
export const Copy = (props: React.SVGProps<SVGSVGElement>) => (
  <GoCopy {...(props as any)} />
);
export const ArrowRight = (props: React.SVGProps<SVGSVGElement>) => (
  <MdOutlineArrowRightAlt {...(props as any)} />
);

// export const Usercancel = (props: React.SVGProps<SVGSVGElement>) => <FaUserTimes  {...props} />;
