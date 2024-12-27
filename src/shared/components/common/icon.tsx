import Image from "next/image";
import clxs from "clsx";
export const Icon = {
  Futurelogo: ({ className }: { className?: string }) => (
    <Image
      src="/futurelabs-logo.png"
      alt="Future logo"
      width={200}
      height={200}
      priority
      className={clxs("h-auto ", className)}
    />
  ),

  HamBurger: ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 5.25h16.5m-16.5 7.5h16.5m-16.5 7.5h16.5"
      />
    </svg>
  ),

  Close: ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  ),
};




