
import { NotificationType } from "@/core/types/enum/notification";
import useNotificationStore from "@/stores/notificationState";
import React, { useEffect } from "react";
import { IoIosClose } from "react-icons/io";

let timeoutVar: number | undefined;

export default function NotificationComponent() {
  const { display, setDisplay, data } = useNotificationStore((state) => state);

  const { delay = 4, content, type = NotificationType.info } = data;

  useEffect(() => {
    if (display) {
      timeoutVar = window.setTimeout(() => {
        setDisplay(false);
      }, delay * 1000);
    } else {
      if (timeoutVar) window.clearTimeout(timeoutVar);
    }
    return () => {
      if (timeoutVar) window.clearTimeout(timeoutVar);
    };
  }, [display, delay, setDisplay]);

  const onClose = () => {
    setDisplay(false);
  };

  const colors = {
    [NotificationType.error]: {
      text: "text-error-500",
      bg: "bg-error-100",
      border: "border-error-500",
    },
    [NotificationType.success]: {
      text: "text-green-500",
      bg: "bg-green-100",
      border: "border-green-500",
    },
    [NotificationType.info]: {
      text: "text-secondary-500",
      bg: "bg-secondary-100",
      border: "border-secondary-500",
    },
    [NotificationType.warning]: {
      text: "text-waring-500",
      bg: "bg-waring-100",
      border: "border-waring-500",
    },
  };

  if (!display) return null;
  if (!content?.title) return null;

  return (
    <div
      className={`max-w-md w-full bg-white shadow-lg top-[10%] fixed right-0 z-[51] rounded-[0.25rem] pointer-events-auto ring-1 ring-error-50 border-l-[0.6rem] ${colors[type].border} ring-opacity-5 overflow-hidden`}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <div className={`${colors[type].bg} rounded-lg p-1`}>
              <svg
                className={`h-6 w-6 ${colors[type].text} bg-err`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <div className="ml-3 w-0 text-sm flex-1 pt-0.5 space-y-[0.13rem]">
            <p className="font-medium text-gray-900">{content?.title ?? ""}</p>
            <p className="mt-1 text-gray-500">{content?.text ?? ""}</p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              className="bg-white rounded-md inline-flex text-black focus:outline-none focus:ring-2 focus:ring-offset-2"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <IoIosClose className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
