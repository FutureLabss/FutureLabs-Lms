import Button from '@/shared/components/common/Button';
import Image, { StaticImageData } from 'next/image';
import React from 'react';
import { IoPerson } from "react-icons/io5";
import { FaUserGraduate } from "react-icons/fa";



interface ICardProps {
  title: string;
  description: string;
  persons: string;
  img:StaticImageData
}

export default function CardComponent (props: ICardProps){
  return (
    <div className='flex flex-col md:flex-row w-[100%] md:max-w-[606px] md:mx-auto '>
        <div  className='w-[100%] max-w-[271px] md:mx-[auto]: rounded-l-lg'>
      <Image src={props.img} alt={'images'} className='rounded-l-lg w-[100%]' />
        </div>
        <div className="bg-white rounded-r-lg shadow-md p-4 text-left w-[100%]">
        <div className="flex  justify-between items-center mb-2">
            <div className='flex flex-row gap-5'>
            <span className="text-gray-700 text-sm font-bold flex flex-row gap-1"> <IoPerson /> <span className='mt-[-3px]'>{props.persons}+</span></span>
            </div>
            <span className="text-red-500 text-lg font-bold">🔥</span>
        </div>
        <div className='md:pt-[12rem] pt-[]'>
        <h3 className="text-lg font-semibold text-gray-900">{props.title}</h3>
        <p className="text-gray-600 text-sm mt-2 font-bold">
            {props.description.length > 100 ? `${props.description.slice(0, 100)}...` : props.description}
        </p>
        </div>
        <div className='mt-4 bg-background text-white rounded-lg'>
        <Button className=" py-2 px-4 w-fit text-white md:max-w-[400px] md:w-full rounded ">
            Learn more →
        </Button>
        </div>
        </div>

    </div>
  );
};
;
