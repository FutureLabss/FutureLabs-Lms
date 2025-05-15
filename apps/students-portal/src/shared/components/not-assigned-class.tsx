"use client";

import { useState, useEffect } from "react";
import { AlertCircle, X } from "lucide-react";
import { Alert, AlertDescription } from "@/shared/components/ui/alert";
import { Button } from "@/shared/components/ui/button";

interface NotAssignedClassAlertProps {
  isAssigned: boolean;
  onDismiss?: () => void;
}

export function NotAssignedClassAlert({
  isAssigned,
  onDismiss,
}: NotAssignedClassAlertProps) {
  const [isVisible, setIsVisible] = useState(!isAssigned);

  useEffect(() => {
    if (isAssigned) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, [isAssigned]);

  if (!isVisible) return null;

  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) onDismiss();
  };

  return (
    <Alert
      variant="primary"
      className="sticky top-0 z-50 rounded-none border-t-0 border-x-0 flex items-center justify-between"
    >
      <div className="flex items-center">
        <AlertCircle className="h-4 w-4 mr-2" />
        <AlertDescription className="font-medium">
          You have not been assigned to a class yet. Please contact your
          instructor.
        </AlertDescription>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleDismiss}
        className="h-6 w-6 rounded-full"
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Dismiss</span>
      </Button>
    </Alert>
  );
}
