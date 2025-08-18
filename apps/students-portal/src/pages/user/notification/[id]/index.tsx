import { useGetSingleNotification } from "@/shared/hooks/query/classroom/ClassroomNotificationQuries";
import UserLayout, { layoutInterface } from "@/shared/layouts/userLayout";
import { useParams } from "next/navigation";
import React from "react";

function Notification() {
  const { id } = useParams();

  const { data: notification, loading: isLoading } = useGetSingleNotification(
    id as string
  );

  console.log(notification, "notification");
  // const isId = !id || id === "undefined" ? false : true;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{notification?.data?.title}</h1>
      <p>{notification?.data?.type}</p>
      <p>{notification?.data?.message}</p>
      {/* <p>{formatDay(notification?)}</p> */}
    </div>
  );
}

export default Notification;

function Layout(props: layoutInterface) {
  return <UserLayout {...props} title="Notification" description="" />;
}
Notification.Layout = Layout;
