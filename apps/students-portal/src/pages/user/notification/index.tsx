"use client";

import { useGetAllNotifications } from "@/shared/hooks/query/classroom/ClassroomNotificationQuries";
import UserLayout, { layoutInterface } from "@/shared/layouts/userLayout";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Skeleton } from "@/shared/components/ui/skeleton";

export default function NotificationLayout() {
  const { data: allNotifications, loading: allNotificationsLoading } =
    useGetAllNotifications();

  if (allNotificationsLoading) {
    return (
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="p-4 space-y-3">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-2/3" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen py-8">
      <div className="px-4">
        <h1 className="text-2xl font-semibold mb-6">Notifications</h1>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allNotifications?.data.map((notif) => {
            const isRead = notif.read;

            // Priority badge style mapping
            const priorityVariant =
              notif.priority === "high"
                ? "secondary"
                : notif.priority === "medium"
                ? "outline"
                : "default";

            return (
              <Link href={`/user/notification/${notif.id}`} key={notif.id}>
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="text-base font-medium">
                      {notif.title}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Badge variant={isRead ? "outline" : "destructive"}>
                        {isRead ? "Read" : "Unread"}
                      </Badge>
                      <Badge variant={priorityVariant}>
                        {notif.priority.charAt(0).toUpperCase() +
                          notif.priority.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {notif.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(notif.timestamp).toLocaleString()}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Layout(props: layoutInterface) {
  return <UserLayout {...props} title="Notification" description="" />;
}
NotificationLayout.Layout = Layout;
