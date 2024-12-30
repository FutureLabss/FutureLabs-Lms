import { cardData } from "@/core/const/landingpage/studentprogress.data";
import Image from "next/image";
import { IoPerson } from "react-icons/io5";

export default function StudentProgressCardComponent() {
    return (
        <div className="flex flex-col md:flex-row justify-around gap-[52px] p-6 md:py-[69px] md:px-[81px] bg-white">
            {cardData.map((card, index) => (
        // <div
        //     key={index}
        //     className={`${card.bgColor} text-white rounded-lg p-6 
        //     flex flex-col shadow-lg border border-red-600`}
        // >
        <div
        key={index}
        className={`text-white w-[100%] md:max-w-[390px] h-[55vh]
            rounded-lg p-6 flex flex-col justify-between shadow-lg ${
            card.bgColor === "orange"
                ? "bg-orange-500"
                : card.bgColor === "blue"
                ? "bg-blue-74"
                : "bg-black"
        }`}
    >
            <div className="items-start mb-2">
                <div className='flex flex-row items-start '>
                <span className=" text-[30px] font-bold flex flex-row gap-1"> 
                    <card.icon /> <span className='mt-[-3px] text-[30px]'>{card.title}</span></span>
                </div>
            </div>
            <div className="md:py-5 ">
                <Image src={card.img} alt={""} />
            </div>
            <div className="items-end flex flex-col ">
            <div className="text-3xl font-bold">{card.count}</div>
            <div className="text-[20px] ">{card.description}</div>
            </div>
        </div>
            ))}
        </div>
    )
}