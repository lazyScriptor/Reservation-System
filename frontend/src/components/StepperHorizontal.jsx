import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateVenueForm from "../pages/reservation/forms/CreateVenueForm";
import CourtCreateForm from "../pages/reservation/forms/CourtCreateFrom";

const buttonArray = [
  {
    id: 1,
    name: "Venue Form",
    destination: "/google.com",
  },
  {
    id: 2,
    name: "Court Form",
    destination: "/youtube.com",
  },
  // Add more buttons if needed
];

function StepperHorizontal({ color }) {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  return (
    <div>
      <div className="container">
        <div className="bg-gray-100 rounded-lg flex justify-center gap-4 p-1">
          {buttonArray.map((button, index) => (
            <div key={index} className="flex items-center gap-4 group">
              <div
                className="flex flex-col justify-center cursor-pointer"
                onClick={() => {
                  setCount(button.id); // Set count to the button's id on click
                }}
              >
                <button
                  className={`py-2 px-3 rounded-full text-white font-bold ${
                    button.id <= count ? `bg-${color}` : "bg-gray-400"
                  }`}
                >
                  {button.id}
                </button>
                <p className="font-bold text-center group-hover:text-red-500">
                  {button.name}
                </p>
              </div>

              {/* Conditionally color the <hr> */}
              {index !== buttonArray.length - 1 && (
                <hr
                  className={`w-full border-2 ${
                    button.id <= count ? `border-${color}` : "border-gray-400"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StepperHorizontal;
