// import { useState, useEffect } from "react";
// import { io, Socket } from "socket.io-client";
// import { Notification } from "@/lib/types/Notification";

// let socket: Socket | null = null;
// export function useNotification(userId: string | null) {
//   const [notifications, setNotifications] = useState<Notification[]>([]);

//   useEffect(() => {
//     if (!userId) return;

//     const fetchNotifications = async () => {
//       const res = await fetch(`/api/notification`);
//       const data = await res.json();
//       setNotifications(data);
//     };
//     fetchNotifications();

//     socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
//       query: { userId },
//     });
//     socket.on("newNotification", (notify: Notification) => {
//       setNotifications((prev) => [notify, ...prev]);
//     });
//     return () => {
//       if (socket) {
//         socket?.disconnect();
//       }
//     };
//   }, [userId]);
//   const markAsRead = async (id: string) => {
//     await fetch(`/api/notification/${id}/read`, { method: "PATCH" });
//     setNotifications((prev) =>
//       prev.map((n) => (n.id === id ? { ...n, read: true } : n))
//     );
//   };

//   return {
//     notifications,
//     markAsRead,
//     unreadCount: notifications.filter((n) => !n.read).length,
//   };
// }
