import React from "react";
import clxs from "clsx";

interface ButtonProps {
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  radius?: "small" | "medium" | "large" | "full" | "extraSmall" | "rounded16"; // Add extraSmall
  loading?: boolean;
  color?: "orange" | "black"
  isBorder?: boolean; // New prop for color
  // New prop to show the loading spinner
}

export default function Button({
  className,
  onClick,
  children,
  radius = "medium",
  type = "button",
  color = "black",
  isBorder = false,
  disabled = false,
  loading = false, // Default to false
}: ButtonProps) {

  const radiusStyles = {
    extraSmall: "rounded-[10px]",
    rounded16: "rounded-[16px]",
    small: "rounded-[20px]",
    medium: "rounded-lg",
    large: "rounded-xl",
    full: "rounded-full",
  };

  const colorStyles = {
    orange: "bg-secondary text-white hover:bg-black-200 ",
    black: isBorder
      ? "border border-primary text-primary hover:text-white hover:border-transparent hover:bg-secondary"
      : "hover:bg-secondary bg-transparent text-primary hover:text-white hover:border-transparent",
  };


  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading} // Disable the button when loading
      className={clxs(
        radiusStyles[radius],
        colorStyles[color],
        "px-4 py-2 rounded-md focus:outline-none focus:ring-2 transition duration-200",
        "text-primary  disabled:bg-gray-400 disabled:cursor-not-allowed",
        className // Allow custom className to override or add styles
      )}
    >
      {loading ? (
        <div className="flex justify-center items-center ">
          <svg
            className="w-5 h-5 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 0116 0 8 8 0 01-16 0z"
            ></path>
          </svg>
        </div>
      ) : (
        children // Show the button text if not loading
      )}
    </button>
  );
};


