import Button from "@/shared/components/common/Button";
import Image from 'next/image';
import { Icon } from "@/shared/components/common/icon";
import Pricing from "./components/Pricing";
import Footer from "@/shared/components/common/Footer";
import Navbar from "@/shared/components/common/NavBar";
import TabComponent from "./components/tab";
import { courses } from "./components/data/course";
import { useState } from "react";
import TabContent from "./components/tabcontent";
import { useSearchParams } from "next/navigation";





export default function CoursePage() {
  const [activeTab, setActiveTab] = useState(0);
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const course = courses.find((item) => item.id === id);

  return (

    <div className="flex flex-col bg-[#F5F5FA] min-h-screen max-w-[1440px] mx-auto">
      <Navbar />
      {
        // courses.map((course) => (
        <div className="px-6 md:px-20 pt-[90px]" key={course?.id}>
          <div>
            <Image
              src={course?.img || '/images/techhub.png'}
              alt={'images'}
              width={1440}
              height={400}
              className="object-cover w-full"
            />
          </div>

          <div className="mt-12 mb-5 max-w-[49.0625rem] w-full rounded-[30px]">
            <TabComponent
              course={course?.tabs || []}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>
          <div className="flex gap-6 flex-col lg:flex-row mt-4 ">
            <TabContent activeTab={activeTab} course={course?.tabs || []} />
            <div className='bg-primary flex self-end flex-col gap-4 text-white flex-1 px-12 py-[80px] rounded-[.5625rem] w-full lg:max-w-[29.625rem]'>
              {course?.pricing.map((detail, index) => (
                <p key={index} className="text-[1.5rem] md:text-2xl font-light">
                  {detail.title}:
                  <span className="block py-1 font-bold  text-[1.125rem]  md:text-[1.75rem]">{detail.value}</span>
                </p>
              ))}
            </div>

          </div>
          <div className="py-4 w-full">
            <h2 className=" text-[28px] font-semibold py-[30px]">This Course include</h2>
            <div className="flex gap-6 w-full items-center flex-col md:flex-row">
              <ul className="flex-1 bg-white p-5 md:p-[40px] rounded-[20px] md:text-[1.4375rem] w-full flex flex-col gap-6 max-w-[48.5rem]">
                <li className="flex gap-4 items-center"> <Icon.GradCap /> Pre recorded Courses for Self paced learnes</li>
                <li className="flex gap-4 items-center"> <Icon.VideoBold /> and recordings of the class.</li>
                <li className="flex gap-4 items-center"> <Icon.TaskSquare /> Assignments to track your progress</li>
              </ul>
              <div className="flex flex-col gap-2 flex-1 self-start md:self-end w-full md:max-w-[29.625rem]">
                <p className="text-[1.8rem] md:text-[2.5rem]">Are you ready to learn ?</p>
                <p>Lets get started</p>
                <Button color="primary" className="py-4">Apply now</Button>
              </div>
            </div>
          </div>
          <div className="flex-col flex gap-6 mt-5 md:mt-[10.375rem]">
            <div className="flex flex-col gap-[1.6875rem]">
              <h2 className="text-center text-[1.5rem] md:text-[2.5rem] font-bold">
                Simple, transparent pricing
              </h2>
              <p className="text-center text-[#848199] text-[.975rem] md:text-[1.25rem]">
                No contracts. No surprise fees.
              </p>
            </div>
            <div className="mb-4 md:mb-[4.375rem]">
              <Pricing course={course?.pricingPlans || []} />
            </div>
          </div>
        </div>
        // ))
      }

      <div>
        <Footer />
      </div>
    </div >
  );

}

