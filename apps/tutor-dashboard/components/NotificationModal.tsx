import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notification: {
    title: string;
    message: string;
    created_at: string;
    updated_at: Date;
    priority?: string;
  } | null;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  notification,
}) => {
  if (!notification) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            {notification.title || "Notification"}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-2 text-sm text-gray-600">{notification.message}</div>
        <div className="mt-4 text-xs text-gray-400">
          Priority: {notification.priority || "Normal"}
        </div>
        <div className="text-xs text-gray-400">
          Sent: {new Date(notification.created_at).toLocaleString()}
        </div>
        <div className="text-xs text-gray-400">
          Updated: {new Date(notification.updated_at).toLocaleString()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationModal;
