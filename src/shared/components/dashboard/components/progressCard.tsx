import { cardData } from "@/core/const/landingpage/studentprogress.data";
import Image from "next/image";

export default function StudentProgressCardComponent() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3
         justify-around gap-[20px] p-6 md:py-[69px] bg-white" id="why-future-academy">
            {cardData.map((card, index) => (
                <div
                    key={index}
                    className={`text-white w-[100%] md:max-w-[700px] h-[55vh]
            rounded-lg p-6 flex flex-col justify-between shadow-lg ${card.bgColor === "orange"
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