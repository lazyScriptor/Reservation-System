import React from "react";

export default function InputFieldCustomized({ type, placeholder, register, name, ...rest }) {
  return (
    <div>
      <input
        name={name}
        placeholder={placeholder}
        // step={type == "time" ? 900 : undefined}  // Set 30-minute intervals for time inputs
        type={type}
        // {...register(name)}  
        className="border border-gray-300 p-1 pl-2 rounded-md w-full  text-brandOrange/80 focus:border-0  ring-brandOrange/60 focus:ring-brandOrange transition-all duration-400"
        {...rest} 
      />
    </div>
  );
}


