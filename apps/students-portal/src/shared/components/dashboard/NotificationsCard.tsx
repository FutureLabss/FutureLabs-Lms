"use client";

import { cn } from "@/core/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { NotificationDataDto } from "@/core/classNotifcationsTypes";
import { formatDateTime } from "../../../../utils/helpers";

export interface NotificationProps {
  notif: NotificationDataDto | undefined;
}

export default function NotificationCard({ notif }: NotificationProps) {
  const isRead = !!notif?.read_at;

  return (
    <Card className="w-full max-w-md shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-lg font-semibold">
          {notif?.data.tag}
        </CardTitle>
        <Badge
          variant={isRead ? "secondary" : "destructive"}
          className={cn("capitalize")}
        >
          {isRead ? "Read" : "Unread"}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-2 text-sm text-gray-600">
        <p className="font-medium">{notif?.data.message}</p>
        <div className="flex flex-col gap-1">
          <span>
            <span className="font-semibold">Type:</span> {notif?.data.type}
          </span>
          <span>
            <span className="font-semibold">Priority:</span>{" "}
            {notif?.data.priority}
          </span>
          <span>
            <span className="font-semibold">From user:</span>{" "}
            {notif?.notifiable_id}
          </span>
        </div>

        <div className="text-xs text-gray-500 space-y-1 mt-2">
          <p></p>
          <p>Created: {formatDateTime(notif?.created_at as string)}</p>
          {isRead && <p>Read: {formatDateTime(notif?.read_at as string)}</p>}
        </div>
      </CardContent>
    </Card>
  );
}
