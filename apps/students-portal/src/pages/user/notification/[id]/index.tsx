import { queryClient } from "@/core/services/auth";
import NotificationCard from "@/shared/components/dashboard/NotificationsCard";
import { useMarkNotificationAsRead } from "@/shared/hooks/mutate/notificationMutate";

import UserLayout, { layoutInterface } from "@/shared/layouts/userLayout";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

function Notification() {
  const params = useParams();

  const id = params?.id as string | undefined;

  const {
    mutate,
    data: notification,
    isLoading,
  } = useMarkNotificationAsRead({
    onSuccess: () => {
      queryClient.invalidateQueries(["classroomNotifications"], {
        exact: true,
      });
    },
    onError: () => {},
  });

  useEffect(() => {
    if (id) {
      mutate(id);
    }
  }, [id, mutate]);

  console.log(notification, "notification");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <NotificationCard notif={notification?.data} />;
}

export default Notification;

function Layout(props: layoutInterface) {
  return <UserLayout {...props} title="Notification" description="" />;
}
Notification.Layout = Layout;
