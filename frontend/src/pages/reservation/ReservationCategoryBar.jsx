import { Button } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
// import { CourtTypeContext } from "../../../contexts/Contexts";

function ReservationCategoryBar() {
  const [buttonTypes, setButtonTypes] = useState([
    {
      id: 1,
      name: "Tennis",
      color: "success",
    },
    {
      id: 2,
      name: "Cricket",
      color: "error",
    },
  ]);
  const { courtCreateForm, setCourtCreateForm } = useContext(CourtTypeContext);

  useEffect(() => {
    console.log("object")
    if (courtCreateForm && courtCreateForm.courtName) {
      setButtonTypes((prev) => [
        ...prev,
        {
          id: prev.length + 1, // Ensure unique ID
          name: courtCreateForm.courtName,
          color: "success",
        },
      ]);
    }
  }, [courtCreateForm]);

  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -200, // Adjust this value as needed
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 200, // Adjust this value as needed
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full flex items-center gap-2">
      <button
        onClick={scrollLeft}
        className=" bg-gray-100 hover:bg-gray-300 transition-colors duration-200  p-4 rounded-full"
      >
        <GrPrevious />
      </button>

      <div
        className="flex items-center max-w-full overflow-x-scroll bg-brandBlue-50 p-4 rounded-xl hide-scrollbar"
        ref={scrollRef}
      >
        <div className="flex gap-4">
          {buttonTypes.map((button, index) => (
            <button
              className={`bg-brandBlue-400 text-white p-2 rounded-md hover:bg-brandBlue-500 whitespace-nowrap`}
              key={index}
            >
              {button.name}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={scrollRight}
        className=" bg-gray-100 hover:bg-gray-300 transition-colors duration-200  p-4 rounded-full"
      >
        <GrNext />
      </button>
    </div>
  );
}

export default ReservationCategoryBar;
