import React from "react";

function Button1({ content, hover_text_color, clickHandler }) {
  const bgClass =
    hover_text_color == "black" ? "hover:text-black" : "hover:text-white";
  return (
    <button
      onClick={clickHandler}
      className={`border-2 border-transparent bg-brandBlue hover:bg-transparent hover:border-2 hover:border-brandBlue ${bgClass} active:bg-brandBlue p-2 rounded-full px-4 text-white font-semibold text-xs duration-200 transition-all`}
    >
      {content}
    </button>
  );
}

export default Button1;
