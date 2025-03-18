import { ITabprops } from '@/core/types/interface/landing/courses';
import clsx from 'clsx';



type Props = {
  course: ITabprops[];
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>
};


export default function TabComponent({ course, activeTab, setActiveTab }: Props) {

  return (
    <div className='flex flex-col bg-white rounded-[1.875rem]'>
      <div className='flex flex-col sm:flex-row gap-2'>
        {course.map((link: ITabprops, index: number) => (

          <button
            key={link.tab}
            className={clsx('font-inter text-[1rem] sm:text-[1.125rem] xl:text-[20px] text-nowrap font-normal  rounded-[1.875rem]  w-full py-[1rem] text-center ', {
              " bg-[#222D4B] text-white": index === activeTab,
              " text-[#D9D9D9]": index !== activeTab,

            })} onClick={() => setActiveTab(index)}>
            {link.tab}
          </button>
        ))}
      </div>

      {/* <div className='bg-white flex-1 rounded-[.5625rem] px-8 md:px-[2.6875rem] pt-5 pb-5 md:pb-0 md:pt-[56px] w-full md:max-w-[48.5rem]'>
        <h2 className="text-[1.5rem] md:text-2xl font-light">

          {course[activeTab]?.title}
        </h2>
        {Array.isArray(course[activeTab]?.content) ? (
          <ul className="list-disc ml-6">
            {course[activeTab]?.content.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="text-base md:text-lg mt-4">{course[activeTab]?.content}</p>
        )}
      </div> */}
    </div >
  )
}
