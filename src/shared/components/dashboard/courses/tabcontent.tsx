import React from 'react';
import { ITabprops } from '../../../../pages/course/components/data/type';
type ContentProps = {
  activeTab: number;
  course: ITabprops[];
}

const TabContent = ({ activeTab, course }: ContentProps) => {
  const activeContent = course[activeTab]?.content;

  return (
    <div className="bg-white flex-1 rounded-[.5625rem] md:px-8 px-[12px] pt-2 pb-5 md:pb-4  md:pt-[56px] w-full md:max-w-[48.5rem]">
      <h2 className="text-[1.5rem] md:text-[1.75rem] font-semibold text-primary">
        {course[activeTab]?.title}
      </h2>
      {/* Conditional Rendering for Content */}
      {Array.isArray(activeContent) ? (
        <ul className="list-inside md:list-outside list-disc md:mt-4 md:px-6 flex flex-col gap-2">
          {activeContent.map((item, index) => (
            <li key={index} className='text-base md:text-[1.125rem]'>{item}</li>
          ))}
        </ul>
      ) : (
        <p className="text-base md:text-[1.125rem] mt-4 mb-5 leading-loose">{activeContent}</p>
      )}
    </div>
  );
};

export default TabContent;
