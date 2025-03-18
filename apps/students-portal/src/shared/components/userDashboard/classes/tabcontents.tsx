import { Session } from '@/core/const/userdashboard/classes';
import { Icon } from '../../common/icon';
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
          className="session-card border justify-between pl-[33px] pr-[3.375rem] py-8 rounded shadow-md flex items-center space-x-4 max-w-[874px] w-full"
        >
          <div className='flex flex-col gap-4'>

            <div className='flex items-center gap-[9px]'>
              <Image
                src={session.avatar || "/avatar.png"}
                alt={session.name || ''}
                className="w-12 h-12 rounded-full"
                width={48}
                height={48}
              />
              <div className='flex flex-col'>
                <span className='font-semibold'> {session.tutor}</span>
                <span className="text-gray-500 text-[11px]">
                  {session.role}
                </span>
              </div>
            </div>
            <div>
              <h3 className='font-bold text-[20px]'>{session.sessionTitle}</h3>
              <div>
                <p>{session.time}</p>
              </div>
            </div>
            {tabName !== "Active sessions" ? (<div className='flex flex-col gap-2'>
              <p className="text-sm text-black flex items-center gap-2">
                <Icon.CalenderWeek className="w-4 h-4 text-primary" />
                {session.date}
              </p>
              <p className="text-sm text-black flex items-center gap-2">
                <Icon.ClockFill className="w-4 h-4 text-primary" />
                {session.time}</p>
            </div>) : (
              <div className='flex gap-4 items-center text-secondary'>
                <Icon.Timer />
                <div className=' bg-secondary w-[1.2px] h-7 rotate-[180deg] '></div>
                <p>{session.duration}</p>
              </div>
            )}
          </div>

          {tabName === "Past sessions" && (
            <p className='text-[#F57F20] flex gap-4 items-center text-[1.3125rem]'><Icon.TimerFill className='size-8' /> {session.timer}</p>

          )}


          {session.joinButton && (
            <button
              disabled={!session.joinButton.isActive}
              className={`px-4 py-[11px] max-w-[195px] w-full rounded text-white ${session.joinButton.isActive
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
                <span className='font-semibold'> {session.name}</span>
                <span className="text-gray-500 text-[11px]">
                  {session.role}
                </span>
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <p className="text-sm text-gray-400 flex items-center gap-2">
                <Icon.CalenderWeek className="w-4 h-4 text-[#D3D2D2]" />
                {session.date}
              </p>
              <p className="text-sm text-gray-400 flex items-center gap-2">
                <Icon.ClockFill className="w-4 h-4 text-[#D3D2D2]" />
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
