import { GoDotFill } from "react-icons/go";

interface IProps {
    text: string;
    field?: string;
    className?: string;
    color?: string;
  }
  
  export default function Chip (props: IProps) {
    return (
      <span
        className={`px-3 py-2 rounded-full flex gap-1  ${props.color ?? getStatusColor(props.field || props.text)} ${
          props.className
        } `}
      >
        <GoDotFill className="mt-[3px]" />
        {props.text}
      </span>
    );
  }
  
  function getStatusColor(status: string) {
    const statusMap = new Map([
      ["done", "bg-[#F0FEED] text-[#259800]"],
      ["progress", "bg-[#EDF5FE] text-[#3083FF]"],
      ["pending", "bg-[#FEEDED] text-[#DC2626]"],
    ]);
  
    return statusMap.get(status.toLowerCase()) || "bg-gray-200";
  }
  