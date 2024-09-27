import React, { useState } from "react";

// Time and court data
const hours = [
  "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"
];
const courts = ["Court 1", "Court 2", "Court 3", "Court 4", "Court 5", "Court 6"];

const ReservationGrid = () => {
  // State to track selected slots
  const [selectedSlots, setSelectedSlots] = useState({});

  // Toggle slot selection and log pressed slots
  const toggleSlot = (court, time) => {
    const slotKey = `${court}-${time}`;
    setSelectedSlots((prevSelected) => {
      const updatedSelected = {
        ...prevSelected,
        [slotKey]: !prevSelected[slotKey],
      };
      // Print the selected slots in the console
      console.log("Selected slots:", updatedSelected);
      return updatedSelected;
    });
  };

  return (
    <div className="w-full max-w-full overflow-x-auto ">
      {/* Make the grid scrollable horizontally */}
      <div className="grid grid-cols-[80px_repeat(15,minmax(20px,1fr))] min-w-[500px]">
        {/* Header Row (Time Slots) */}
        <div className="bg-gray-200 p-1 text-center font-bold text-xs">Court/Time</div>
        {hours.map((time) => (
          <div key={time} className="bg-gray-200 py-1 text-center text-xs">
            {time}
          </div>
        ))}

        {/* Rows for each court */}
        {courts.map((court) => (
          <React.Fragment key={court}>
            {/* Court Name Column */}
            <div className="bg-gray-100 p-1 text-center text-xs">
              {court}
            </div>
            {/* Time Slot Columns */}
            {hours.map((time) => {
              const slotKey = `${court}-${time}`;
              const isSelected = selectedSlots[slotKey] || false;
              return (
                <div
                  key={time}
                  className={`p-1 border hover:bg-blue-200 cursor-pointer text-xs ${
                    isSelected ? "bg-blue-400 text-white" : "bg-white"
                  }`}
                  onClick={() => toggleSlot(court, time)}
                >
                  {/* Time Slot */}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ReservationGrid;
