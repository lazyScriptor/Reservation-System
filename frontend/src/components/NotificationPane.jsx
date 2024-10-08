import React, { useEffect } from "react";

export default function NotificationPane({ message, type, visible, onClose }) {
  useEffect(() => {
    if (visible) {
      // Automatically close the notification after 3 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer); // Cleanup the timer when the component unmounts
    }
  }, [visible, onClose]);

  if (!visible) return null; // If not visible, return nothing

  return (
    <div
      className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center gap-4 transition-all duration-300 transform ${
        type === "success"
          ? "bg-green-100 text-green-700 border border-green-400"
          : "bg-red-100 text-red-700 border border-red-400"
      } ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[-10px]" // Transition effect
      }`}
    >
      {/* Icon */}
      <div>
        {type === "success" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-green-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-red-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
      </div>
      {/* Message */}
      <span className="flex-grow text-sm font-medium">{message}</span>
      {/* Close Button */}
      <button
        onClick={onClose}
        className={`text-lg font-bold focus:outline-none ${
          type === "success" ? "text-green-700" : "text-red-700"
        }`}
      >
        &times;
      </button>
    </div>
  );
}
