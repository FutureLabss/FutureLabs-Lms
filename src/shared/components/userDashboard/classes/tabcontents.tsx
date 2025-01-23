import { Session } from '@/core/const/userdashboard/classes';
import Image from 'next/image';

type Props = {
  tabName: string;
  sessions: Session[];
};

const TabContents = ({ sessions, tabName }: Props) => {
  console.log(sessions, "sessions");

  return (
    <div className={`sessions grid ${tabName === "Upcoming sessions" ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3" : ""} gap-4`}>
      {(tabName === "Active sessions" || tabName === "Past sessions") && sessions.map((session, index) => (
        <div
          key={index}
          className="session-card border p-4 rounded shadow-md flex  items-start space-x-4"
        >
          <div className='flex flex-col gap-4 flex-1'>

            <div className='flex items-center gap-[9px]'>
              <Image
                src={session.avatar || "/avatar.png"}
                alt={session.name || ''}
                className="w-12 h-12 rounded-full"
                width={48}
                height={48}
              />
              <div className='flex flex-col'>
                <span> {session.name}</span>
                <span className="text-gray-500 text-[11px]">
                  {session.role}
                </span>
              </div>
            </div>
            <div>
              <h3 className='font-bold text-[1rem]'>{session.sessionTitle}</h3>
            </div>
          </div>

          {/* Render join button if available */}
          {session.joinButton && (
            <button
              disabled={!session.joinButton.isActive}
              className={`px-4 py-2 rounded text-white ${session.joinButton.isActive
                ? 'bg-primary hover:bg-primary/80'
                : 'bg-gray-300 cursor-not-allowed'
                }`}
            >
              {session.joinButton.text}
            </button>
          )}
        </div>
      ))}
      {
        tabName === "Upcoming sessions" && sessions.map((session, index) => (
          <div
            key={index}
            className={`flex flex-col gap-4 box-border p-4 rounded shadow-md`}
          >
            <h3 className="font-bold text-[20px]">{session.sessionTitle}</h3>

            {/* <div className="session-info max-w-[352px] w-full"> */}
            <div className='flex items-center gap-[9px]'>
              <Image
                src={session.avatar || "/avatar.png"}
                alt={session.name || ''}
                className="w-12 h-12 rounded-full"
                width={48}
                height={48}
              />
              <div className='flex flex-col'>
                <span> {session.name}</span>
                <span className="text-gray-500 text-[11px]">
                  {session.role}
                </span>
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <p className="text-sm text-gray-400 flex items-center gap-2">
                <Image src="/CalendarWeekFill.svg" alt="calender" width={16} height={16} />
                {session.date}
              </p>
              <p className="text-sm text-gray-400 flex items-center gap-2">
                <Image src="/ClockFill.svg" alt="calender" width={16} height={16} />
                {session.time}</p>
            </div>
          </div>

          // </div>
        ))
      }
    </div>
  );
};

export default TabContents;
