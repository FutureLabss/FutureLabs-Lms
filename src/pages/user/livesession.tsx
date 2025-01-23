import TabLayout from '@/shared/components/userDashboard/classes/tab';
import TabContents from '@/shared/components/userDashboard/classes/tabcontents';
import UserLayout, { layoutInterface } from '@/shared/layouts/userLayout';
import React, { useState } from 'react';
import { sessionTabs } from '@/core/const/userdashboard/classes';

export default function UserLiveClasses() {
  const [activeTab, setActiveTab] = useState<string>(
    sessionTabs.find((tab) => tab.isActive)?.tabName || sessionTabs[0].tabName
  );

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <div className=''>
      <TabLayout
        sessionTabs={sessionTabs}
        activeTab={activeTab}
        setActiveTab={handleTabClick}
      />
      {/* Render Tab Content */}
      <div className="tab-content mt-4  py-[55px] px-[22px] rounded-[10px]">
        {sessionTabs
          .filter((tab) => tab.tabName === activeTab)
          .map((tab) => (
            <TabContents key={tab.tabName} tabName={tab.tabName} sessions={tab.sessions} />
          ))}
      </div>
    </div>
  );
}

function Layout(props: layoutInterface) {
  return (
    <UserLayout {...props} title="Live Classes" description="" />
  );
}

UserLiveClasses.Layout = Layout;
