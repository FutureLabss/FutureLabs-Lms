"use client";

import { useNotification } from "@/hooks/useNotification";

import { useSession } from "next-auth/react";
import { Bell } from "lucide-react";
import { useState } from "react";

import React from "react";
import { useGetAllNotifications } from "@/hooks/query/notifications";
import NotificationModal from "../components/NotificationModal";

const AppNotification = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id || null;

  const { markAsRead, unreadCount } = useNotification(userId);
  const [open, setOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const { data: notification, loading } = useGetAllNotifications();
  console.log({ notification }, "this is notidy");

  const handleNotificationClick = (n: any) => {
    markAsRead(n.id);
    setSelectedNotification(n);
  };

  const totalCount = notification?.data?.length || 0;
  // const totalCount = notification?.length || 0;

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)}>
        <Bell className="w-5 h-5 text-gray-700" />
        {/* {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
      
        )} */}
        {totalCount > 0 && (
          <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white w-3 h-3 rounded-full flex items-center justify-center">
            {totalCount}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border rounded shadow-md z-50 max-h-80 overflow-y-auto">
          <div className="p-2 border-b font-semibold">Notifications</div>
          <ul>
            {notification &&
              notification.data.map((n) => (
                <li
                  key={n.id}
                  onClick={() => handleNotificationClick(n)}
                  className={`p-3 text-sm cursor-pointer hover:bg-gray-100 ${
                    n.read ? "text-gray-500" : "font-semibold"
                  }`}
                >
                  <div>{n.message}</div>
                  <div className="text-xs text-gray-400">
                    {new Date(n.created_at).toLocaleString()}
                  </div>
                </li>
              ))}
            {notification && notification.length > 0 && (
              <li className="p-3 text-sm text-gray-400">No notifications.</li>
            )}
          </ul>
        </div>
      )}
      <NotificationModal
        isOpen={!!selectedNotification}
        onClose={() => setSelectedNotification(null)}
        notification={selectedNotification}
      />
    </div>
  );
};

export default AppNotification;

// "use client";

// import { useNotification } from "@/hooks/useNotification";
// import { useSession } from "next-auth/react";
// import { Bell } from "lucide-react";
// import { useState } from "react";
// import NotificationModal from "@/components/NotificationModal";
// import { useGetAllNotifications } from "@/hooks/query/notifications";

// const AppNotification = () => {
//   const { data: session } = useSession();
//   const userId = session?.user?.id || null;

//   const { markAsRead, unreadCount } = useNotification(userId);
//   const [open, setOpen] = useState(false);
//   const [selectedNotification, setSelectedNotification] = useState(null);

//   const { data: notification } = useGetAllNotifications();

//   const handleNotificationClick = (n: any) => {
//     markAsRead(n.id);
//     setSelectedNotification(n);
//   };

//   return (
//     <div className="relative">
//       <button onClick={() => setOpen(!open)}>
//         <Bell className="w-5 h-5 text-gray-700" />
//         {unreadCount > 0 && (
//           <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center">
//             {unreadCount}
//           </span>
//         )}
//       </button>

//       {open && (
//         <div className="absolute right-0 mt-2 w-80 bg-white border rounded shadow-md z-50 max-h-80 overflow-y-auto">
//           <div className="p-2 border-b font-semibold">Notifications</div>
//           <ul>
//             {notification?.data.map((n) => (
//               <li
//                 key={n.id}
//                 onClick={() => handleNotificationClick(n)}
//                 className={`p-3 text-sm cursor-pointer hover:bg-gray-100 ${
//                   n.read ? "text-gray-500" : "font-semibold"
//                 }`}
//               >
//                 <div>{n.message}</div>
//                 <div className="text-xs text-gray-400">
//                   {new Date(n.created_at).toLocaleString()}
//                 </div>
//               </li>
//             ))}
//             {notification && notification.length === 0 && (
//               <li className="p-3 text-sm text-gray-400">No notifications.</li>
//             )}
//           </ul>
//         </div>
//       )}

//       <NotificationModal
//         isOpen={!!selectedNotification}
//         onClose={() => setSelectedNotification(null)}
//         notification={selectedNotification}
//       />
//     </div>
//   );
// };

// export default AppNotification;
