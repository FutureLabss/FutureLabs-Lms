"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { toast } from "@/shared/components/ui/use-toast";
import { Progress } from "@/shared/components/ui/progress";

interface MaterialDownloadProps {
  material: {
    id?: number;
    title?: string;
    type?: string;
    size?: string;
    uploaded_at?: string;
    url?: string; // In a real app, this would be the actual download URL
  };
}

export function MaterialDownload({ material }: MaterialDownloadProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const handleDownload = () => {
    setIsDownloading(true);
    setDownloadProgress(0);

    // Simulate download progress
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    // Simulate download completion
    setTimeout(() => {
      clearInterval(interval);
      setDownloadProgress(100);

      setTimeout(() => {
        setIsDownloading(false);

        toast({
          title: "Download complete",
          description: `${material.title} has been downloaded successfully.`,
        });

        // In a real application, you would trigger the actual file download here
        // For example:
        const link = document.createElement("a");
        link.href = material.url || "#";
        link.download = material.title || "downloaded-file";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, 500);
    }, 2000);
  };

  return (
    <div>
      {isDownloading ? (
        <div className="space-y-2 w-[120px]">
          <Progress value={downloadProgress} className="h-2" />
          <div className="text-xs text-center">{downloadProgress}%</div>
        </div>
      ) : (
        <Button
          variant="outline"
          size="sm"
          onClick={handleDownload}
          className="flex items-center gap-1"
        >
          <Download className="h-4 w-4" />
          Download
        </Button>
      )}
    </div>
  );
}
