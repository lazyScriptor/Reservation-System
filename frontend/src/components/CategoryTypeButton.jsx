import React from "react";

export default function CategoryTypeButton({
  name,
  description,
  color,
  hoverTextColor,
  handleClick,
  disableStatus,
  setDisableStatus,
}) {
  return (
    <button
      disabled={disableStatus}
      onClick={handleClick} // Use the handleClick prop directly
      className={`bg-${color} flex flex-col items-start p-4 gap-2 border-gray-100 border-2 hover:border-${hoverTextColor} justify-start shadow-${hoverTextColor} rounded-xl shadow-md hover:shadow-lg active:shadow-xl  transition-all duration-700  `}
    >
      <p
        className={`transition-all text-start duration-700  hover:text-${hoverTextColor} text-gray-500 font-bold `}
      >
        {name}
      </p>
      <p className={` text-xs text-start text-gray-500`}>{description}</p>
    </button>
  );
}

 
