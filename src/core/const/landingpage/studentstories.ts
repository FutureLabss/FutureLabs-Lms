import { StaticImageData } from "next/image";
import designer from "../../../assets/designer.png"; 

interface IStoriesCard{
    id: number;
    name: string,
    role: string,
    story: string;
    image: StaticImageData,
}
export  const studentStories:IStoriesCard[] = [
    {
        id: 1,
        name: "Abraham Udoinyang",
        role: "Designer",
        story:
            "Future Labs Academy transformed my career! I went from having no tech background to designing user-centered products with confidence. The hands-on approach and expert guidance made all the difference",
        image: designer,
    },
    {
        id: 2,
        name: "Jane Doe",
        role: "Developer",
        story:
            "Joining Future Labs Academy was the best decision I made! The mentorship and projects helped me land my first developer job.",
        image: designer,
    },
    {
        id: 3,
        name: "John Smith",
        role: "Product Manager",
        story:
            "The hands-on approach at Future Labs Academy gave me the confidence to lead product development and succeed in the tech industry.",
        image: designer,
    },
    {
        id: 4,
        name: "John Smith",
        role: "Product Manager",
        story:
            "The hands-on approach at Future Labs Academy gave me the confidence to lead product development and succeed in the tech industry.",
        image: designer,
    },
    {
        id: 5,
        name: "John Smith",
        role: "Product Manager",
        story:
            "The hands-on approach at Future Labs Academy gave me the confidence to lead product development and succeed in the tech industry.",
        image: designer,
    },
];