import React from "react";
import { useNavigate } from "react-router-dom";
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
];
function StepperHorizontal() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="container">
        <div className="bg-gray-100 rounded-lg flex justify-center gap-4  p-1">
          {buttonArray.map((button, index) => (
            <div className="flex items-center gap-4 group ">
              <div
                className="flex flex-col justify-center"
                onClick={() => {
                  navigate(`${button.destination}`);
                }}
              >
                <button className="bg-brandBlue  py-2 px-3 rounded-full text-white font-bold ">
                  {button.id}
                </button>
                <p className="font-bold text-center group-hover:text-red-500 cursor-pointer">
                  {button.name}
                </p>
              </div>

              <hr className="w-full border-2 border-brandBlue" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StepperHorizontal;
