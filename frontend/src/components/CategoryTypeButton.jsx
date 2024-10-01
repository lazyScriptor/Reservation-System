import React from "react";

function CategoryTypeButton({
  name,
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
      className={`bg-${color} group aspect-video w-28 rounded-lg relative transition-all duration-700 hover:bg-opacity-50 hover:text-${hoverTextColor}`}
    >
      <p className="absolute transition-all duration-700 group-hover:text-${hoverTextColor} bottom-0 p-4 text-white font-bold text-xs">
        {name}
      </p>
    </button>
  );
}

export default CategoryTypeButton;
