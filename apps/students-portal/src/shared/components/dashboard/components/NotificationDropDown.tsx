import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/shared/components/ui/dropdown-menu"; // adjust import path
import { Bell, Loader } from "lucide-react";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { Notification } from "@/core/classNotifcationsTypes";

interface NotificationCount {
  notificationCount: number | undefined;
  allNotifications: Notification[] | undefined;
  allNotificationsLoading: boolean;
}

export default function NotificationsDropdown({
  notificationCount,
  allNotifications,
  allNotificationsLoading,
}: NotificationCount) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative cursor-pointer">
          {notificationCount! > 0 && (
            <span className="w-4 h-4 p-2 rounded-full bg-red-600 text-white absolute top-[-10px] right-[-8px] flex items-center justify-center text-[8px]">
              {notificationCount}
            </span>
          )}
          <Bell size={20} />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {allNotificationsLoading ? (
          <div className="flex justify-center p-4">
            <Loader className="animate-spin" />
          </div>
        ) : allNotifications?.length && notificationCount ? (
          allNotifications.map((notification) => (
            <DropdownMenuItem key={notification.id} asChild>
              <Link
                href={`/user/notification/${notification.id}`}
                className="flex justify-between items-center w-full"
              >
                <span className="text-sm text-[#85878D] font-medium">
                  {notification.title}
                </span>
                <span className="text-[#85878D] font-medium text-sm flex">
                  <IoIosArrowForward size={15} />
                </span>
              </Link>
            </DropdownMenuItem>
          ))
        ) : (
          <div className="px-3 py-2 text-sm text-gray-500">
            No notifications
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
