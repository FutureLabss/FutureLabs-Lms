import { CourseCardProps } from "@/core/const/userdashboard/courses/courses";
import Image from "next/image";
import avatar from "../../../../assets/Avatar.png"
import { FiClock } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function CourseCard(props: CourseCardProps) {
  const router = useRouter()

  const handleRedirect = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
    e.stopPropagation();
    if (props.id) {
    router.push(`/user/courses/${id}`)
    console.log(id, "courseId")
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md w-[100%] md:max-w-[528px] 2xl:max-w-[1000px]">
      <div className="flex flex-col xl:flex-row">
        {/* Course Image */}
        <div className="w-[100%]  2xl:max-w-[500px]  overflow-hidden">
          <Image
            src={props.image}
            alt={props.title}
            className="object-cover w-full h-full"

          />
        </div>
        {/* Course Details */}
        <div className="mt-4 py-4 px-3 text-left w-[100%]  ">
          <h3 className="text-[1rem] font-bold">{props.title}</h3>
          <div className="flex flex-col gap-5 pt-6">
            <div className="flex flex-row items-center gap-2 ">
              <div>
                <Image src={avatar} alt={""} />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-xs font-semibold text-[#202020]">{props.instructor}</p>
                <p className="text-[#202020] font-light text-[9px]">{props.role}</p>
              </div>
            </div>
            <div className="flex items-center text-sm text-secondary mt-2">
              <FiClock className="mr-1" />
              <span>{props.duration}</span>
            </div>
            {/* Progress Bar */}
          </div>
            <div className="mt-6">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${props.progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-secondary mt-1 text-right">
                {props.progress}% completed
              </p>
            <div  className="w-full mt-5 rounded-2xl  bg-[#212C4A] mb-6">
            <button
              onClick={(e) => handleRedirect(e, props.id)}
              className="w-full  px-[58px] py-[12px] text-center bg-[#212C4A] text-white rounded-2xl hover:bg-[#212C4A]">
              Start Course
            </button>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};

