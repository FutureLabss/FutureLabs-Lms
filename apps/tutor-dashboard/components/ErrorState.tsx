// components/ErrorState.tsx
"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorState({
  message = "Something went wrong while loading courses.",
  onRetry,
}: {
  message?: string;
  onRetry: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-[300px] text-center px-4">
      <AlertTriangle className="w-10 h-10 text-red-500 mb-4" />
      <h2 className="text-lg font-semibold mb-2 text-red-600">{message}</h2>
      <Button variant="outline" onClick={onRetry}>
        Retry
      </Button>
    </div>
  );
}
