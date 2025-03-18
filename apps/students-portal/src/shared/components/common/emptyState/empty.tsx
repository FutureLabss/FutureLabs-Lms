import React from "react";
import emptyState from "../../../../assets/emptyState.png"
import Image, { StaticImageData } from "next/image";

interface IProps {
  title?: string;
  text?: string;
  imgSrc?: string | StaticImageData;
  action?: React.ElementType;
  titleClass?: string;
  padding?: string;
}
const defaultTitle = "No Content Available";
const defaultText = "There is nothing to display here at the moment.";

export default function EmptyState({ padding = "py-20", ...props }: IProps) {
  return (
    <div className={`flex flex-col items-center justify-center ${padding} text-center`}>
      <Image src={props.imgSrc ?? emptyState} alt="No data" className="max-w-xs 2xl:w-full 2xl:h-ful" />
      <h2 className={`font-medium mb-1 ${props.titleClass ?? "mt-[1.9rem]"} 2xl:text-[3rem]`}>{props.title || defaultTitle}</h2>
      <p className="text-gray-500 text-sm  2xl:text-[2rem]">{props.text || defaultText}</p>
      {props.action ? (
        <div className="mt-5">
          <props.action />
        </div>
      ) : null}
    </div>
  );
}
