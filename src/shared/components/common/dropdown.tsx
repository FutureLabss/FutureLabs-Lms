import { useEffect, useRef } from "react";

interface IDropdown {
  onClose: () => void;
  isOpen: boolean;
  onClick: (action: string) => void;
}

const Actions = [
  { title: "Profile", value: "profile" },
  { title: "Settings", value: "settings" },
  { title: "Logout", value: "logout" },
];

const DropdownMenu = (props: IDropdown) => {
  const { isOpen, onClose } = props;
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);
  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute top-[5rem] right-0 bg-white shadow-md rounded-md px-4 py-5 w-[18rem] z-[1000]"
    >
      <div className="flex flex-col gap-4">
        {Actions.map((action) => (
          <h3
            key={action.value}
            className="cursor-pointer"
            onClick={() => props.onClick && props.onClick(action.value)}
          >
            {action.title}
          </h3>
        ))}
      </div>
    </div>
  );
};

export default DropdownMenu;
