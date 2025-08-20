"use client";

import { cn } from "@/core/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

interface NotificationProps {
  notif: {
    id: string;
    notifiable_id: string;
    created_at: string;
    updated_at: string;
    read_at?: string | null;
    data: {
      tag: string;
      message: string;
      type: string;
      priority: string;
    };
  };
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
          <p>Created: {notif?.created_at}</p>
          <p>Updated: {notif?.updated_at}</p>
          {isRead && <p>Read: {notif?.read_at}</p>}
        </div>
      </CardContent>
    </Card>
  );
}
