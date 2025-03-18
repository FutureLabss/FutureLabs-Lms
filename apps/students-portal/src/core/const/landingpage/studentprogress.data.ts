import students from "../../../assets/students.png"
import graduates from "../../../assets/graduates.png"
import { StaticImageData } from "next/image";
import { IoPerson } from "react-icons/io5";
import { FaUserGraduate } from "react-icons/fa";
import { MdOutlineWork } from "react-icons/md";
import {  IconType } from "react-icons";


interface Card {
    title: string;
    count: string;
    description: string;
    bgColor: string;
    img:StaticImageData
    icon:IconType
};;

    export const cardData: Card[] = [
        {
            title: "Students",
            count: "650 +",
            description: "Since Inception",
            bgColor: "orange",
            img: students,
            icon: IoPerson
        },
        {
            title: "Graduates",
            count: "250 +",
            description: "With track record",
            bgColor: "blue",
            img: graduates,
            icon: FaUserGraduate
        },
        {
            title: "Job Placements",
            count: "120 +",
            description: "Based on recommendation",
            bgColor: "black",
            img: graduates,
            icon: MdOutlineWork
        },
    ];
