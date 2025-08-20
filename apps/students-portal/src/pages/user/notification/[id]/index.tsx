import NotificationCard from "@/shared/components/dashboard/NotificationsCard";
import { useGetSingleNotification } from "@/shared/hooks/query/classroom/ClassroomNotificationQuries";
import UserLayout, { layoutInterface } from "@/shared/layouts/userLayout";
import { useParams } from "next/navigation";
import React from "react";

function Notification() {
  const params = useParams();

  const id = params?.id as string | undefined;

  const { data: notification, loading: isLoading } = useGetSingleNotification(
    id as string
  );

  console.log(notification, "notification");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const notif = notification?.data;

  return <NotificationCard notif={notif} />;
}

export default Notification;

function Layout(props: layoutInterface) {
  return <UserLayout {...props} title="Notification" description="" />;
}
Notification.Layout = Layout;
