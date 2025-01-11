import { StaticImageData } from "next/image";
import dev from "../../../assets/dev.png"
import data from "../../../assets/data.png"
import digital from "../../../assets/digital.png"
import graphics from "../../../assets/graphics.png"
import product from "../../../assets/product.png"
import web from "../../../assets/web.png"


interface IExploreData {
    title: string;
    description: string;
    persons: string;
    img: StaticImageData
    href?: string
}

export const displayExploreData: IExploreData[] = [
    {
        title: 'Web Development',
        description: 'Learn how to build stunning web applications from scratch using HTML, CSS, JavaScript, and React.',
        persons: '300',
        img: dev,
        href: "/course"
    },
    {
        title: 'Product Design',
        description: 'Discover the principles of creating user-friendly designs with Figma and Adobe XD.',
        persons: '500',
        img: product

    },
    {
        title: 'Data Analytics',
        description: 'Master data visualization, SQL, and Python to uncover actionable insights.',
        persons: '200',
        img: data
    },
    {
        title: 'Web Design',
        description: 'Create visually appealing and functional websites with modern design principles.',
        persons: '150',
        img: web
    },
    {
        title: 'Graphics Design',
        description: 'Unleash your creativity with advanced graphic design techniques and tools.',
        persons: '100',
        img: graphics
    },
    {
        title: 'Digital Marketing',
        description: 'Explore marketing strategies, SEO, and social media marketing to grow businesses.',
        persons: '120',
        img: digital
    },
];


