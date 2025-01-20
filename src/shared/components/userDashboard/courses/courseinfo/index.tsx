import EmptyState from "@/shared/components/common/emptyState/empty";

export const tabs = [
    // {
    //   label: "Weekly Subscription Plans",
    //   content: 
    //     <WeeklyPlan />
    // },
    {
      label: "Overview",
      content:(
        <div className="mt-10">
            <hr />
            <div className="flex justify-between mt-5">
        <div><p className="text-sm font-bold text-black">Description</p></div>
        <div className=" w-full max-w-[500px] text-[#475569]">
            <p className="text-sm ">
            Are you tired of awkward silences and cringe-worthy conversations? Do you want to connect 
            with people effortlessly and leave a positive, lasting impression? Welcome to How to Speak to 
            Anyone Without Being Cringe, a transformative course designed to equip 
            you with the skills and confidence to engage in meaningful, enjoyable conversations with anyone, 
            anytime.
            </p>
            <br />
            <h3 className="text-sm font-bold text-black">What You&apos;sll Learn:</h3>
            <br />
            <p>Master the Art of Small Talk: Learn the secrets to initiating and 
              maintaining engaging small talk without feeling awkward or forced.
              Build Genuine Connections: Discover techniques for creating authentic connections that 
              go beyond surface-level interactions.
              Improve Your Listening Skills: Understand the 
              importance of active listening and how to make others feel heard and valued.</p>
              <br />
              <ul className="list-disc ">
                <li>
                Build Genuine Connections: Discover techniques for creating authentic 
                connections that go beyond surface-level interactions.
                </li>
                <li>
                Improve Your Listening Skills: Understand the importance of active listening and how to make others 
                feel heard and valued.
                </li>

              </ul>
        </div>
            </div>
        {/* <EmptyState /> */}
        </div>),
    //   disabled: true, 
    },
    {
      label: "Notes",
      content:(
      <>
      <h1>Notes</h1>
      <EmptyState />

      </>),
    //   disabled: true, 
    },
    {
      label:"Announcements",
      content:(
        <>
        <h1>Announcements</h1>
        <EmptyState />
        </>),
    //   disabled: true, 
    },
  ];