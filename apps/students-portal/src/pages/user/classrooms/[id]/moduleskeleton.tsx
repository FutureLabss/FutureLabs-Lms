import React from "react";

// Skeleton loader component for module list
function ModuleSkeletonLoader() {
  return (
    <div className="space-y-6">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="border rounded-lg overflow-hidden p-4 animate-pulse bg-gray-200"
        >
          <div className="h-6 bg-gray-300 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
          <div className="flex justify-between">
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/6"></div>
            <div className="h-4 bg-gray-300 rounded w-1/6"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ModuleSkeletonLoader;
