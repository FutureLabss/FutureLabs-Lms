import clsx from 'clsx';
import { Tab } from '@/core/const/userdashboard/classes';

type Props = {
  sessionTabs: Tab[];
  activeTab: string;
  setActiveTab: (tabName: string) => void;
};

export default function TabLayout({ sessionTabs, activeTab, setActiveTab }: Props) {
  return (
    <div className="flex flex-col bg-white rounded-[1.875rem]">
      <div className="flex flex-col sm:flex-row gap-2">
        {sessionTabs.map((tab) => (
          <button
            key={tab.tabName}
            className={clsx(
              'font-inter text-[1rem] sm:text-[1.125rem] xl:text-[20px] font-normal rounded-[1.875rem] w-full py-[1rem] text-center',
              {
                'bg-[#222D4B] text-white': tab.tabName === activeTab,
                'text-[#D9D9D9]': tab.tabName !== activeTab,
              }
            )}
            onClick={() => setActiveTab(tab.tabName)}
          >
            {tab.tabName}
          </button>
        ))}
      </div>
    </div>
  );
}
