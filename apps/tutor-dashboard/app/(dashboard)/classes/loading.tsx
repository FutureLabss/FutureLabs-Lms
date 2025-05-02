// export default function Loading() {
//   return <div className='text-bold'>loading...</div>
// }

'use client'
import { Loader } from "lucide-react";

export default function LoadingClassroom({ message = "Loading, please wait..." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Loader className="w-16 h-16 text-blue-500 animate-spin" />
      <p className="mt-4 text-lg font-medium text-gray-700">{message}</p>
    </div>
  );
}