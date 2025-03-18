import React, { useState, ReactNode,  useEffect } from "react";

type TabProps = {
  label?: ReactNode;
  icon?: ReactNode;
  content?: ReactNode;
  disabled?: boolean;

};

interface TabComponentProps {
  tabs: TabProps[];
  searchPlaceholder?: string;
  defaultTab?: number;
  onTabChange?: (index: number) => void;
  justify?:string
}

export default function Tabs({ tabs, searchPlaceholder, onTabChange, defaultTab = 0, justify="justify-center" }: TabComponentProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  useEffect(() => {
    if(onTabChange){
      onTabChange(activeTab);
    }
    // onTabChange && onTabChange(activeTab);
  }, [activeTab]);


  return (
    <div className="w-full ">
      <div className={`flex  w-full items-center border-b-2 ${justify}`}>
        {tabs?.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            // className={`flex items-center py-2 px-4 -mb-px text-sm font-medium text-center border-b-2 transition-all duration-300 ${
            //   activeTab === index
            //     ? "text-primary border-primary"
            //     : "text-gray-500 border-transparent hover:text-gray-700 hover:border-white"
            // }`}
            className={`flex items-center py-2 px-4 -mb-px text-sm font-medium text-center  transition-all duration-300 ${
              activeTab === index
                ? "text-primary border-secondary border-b-2"
                : `text-[#CBD5E1] border-gray-300 ${tab.disabled ? 'cursor-not-allowed opacity-50' : 'hover:text-gray-700 hover:border-white'}`
            }`}
            disabled={tab.disabled}
          >
            {tab.icon}
            <span className="ml-2">{tab.label}</span>
          </button>
        ))}
      </div>
      {searchPlaceholder ? (
        <div>
          <input type="text" placeholder={""} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
        </div>
      ) : null}
      <div className="relative">
        <div className={`transition-opacity duration-300 ease-in-out  left-0 w-full `}>{tabs[activeTab].content}</div>
      </div>
    </div>
  );
}
