import React, { useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  displayClose?: boolean;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, displayClose = false, title, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (event: any) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    // if (isOpen) {
    //   document.addEventListener('mousedown', handleOutsideClick);
    // } else {
    //   document.removeEventListener('mousedown', handleOutsideClick);
    // }
    // return () => {
    //   document.removeEventListener('mousedown', handleOutsideClick);
    // };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      onClick={handleOutsideClick}
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-[40] p-1 flex items-center justify-center"
    >
      <div ref={modalRef} className="relative p-7 border w-[32rem] shadow-lg rounded-lg bg-white">
        <div className="flex justify-between items-center">
          {title && <div className="text-lg font-semibold">{title}</div>}
          {displayClose && (
            <button onClick={onClose} className="text-black close-modal">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        <div className="my-2.5">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
