import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { studentStories } from "@/core/const/landingpage/studentstories";

export default function StudentStoriesCardComponent() {
    return (  
    <div className="bg-black text-white py-8 px-4 h-full" >
        <Swiper
            spaceBetween={20}
            slidesPerView={1}
            // pagination={{ clickable: true }}
            // navigation
            navigation={{ 
                nextEl: '.swiper-button-next', 
                prevEl: '.swiper-button-prev' 
            }}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
            modules={[Pagination, Navigation, Autoplay]}
            className="w-full  "
        >
            {studentStories.map((story) => (
                <SwiperSlide key={story.id} className="h-[]">
                    <div className="flex flex-col md:flex-row  gap-6">
                        <div className="w-full max-w-[550px] h-full max-h-[350px] mx-auto">
                            <Image
                                src={story.image}
                                alt={story.name}
                                className="rounded-lg w-full h-full object-cover "
                                layout="responsive"
                            />
                        </div>
                        <div className="w-full md:w-1/2 pt-[50px]">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold">
                                Real <span className="text-orange-500">Stories</span>, <br /> Real{" "}
                                <span className="text-orange-500">Transformations</span>
                            </h2>
                        </div>
                        <div className="md:pt-[13rem] xsm:pt-[7rem] xs:pt-[2rem] xxs:pt-[2.7rem] ">
                            <p className="font-semibold">{story.name}</p>
                            <p className="text-orange-500">{story.role}</p>
                        </div>
                        <p className="text-gray-300 xs:pt-[0.75rem] mt-[3rem] mb-6 w-[100%] max-w-[543px] text-sm font-light  md:leading-[1rem]">{story.story}</p>
                    </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
            <style jsx>{`
            .swiper-button-next,
            .swiper-button-prev {
            background-color:white;
                color: white;
                font-size: 2rem;
            }
            .swiper-button-next:hover,
            .swiper-button-prev:hover {
                background-color: rgba(0, 0, 0, 0.5); 
                border-radius: 50%; 
            }
        `}</style>
    </div>
    );
}
