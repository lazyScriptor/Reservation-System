import React, { useContext, useEffect, useState } from "react";
import { CourtTypeContext } from "../../contexts/Contexts";
import dayjs from "dayjs"; // You can use dayjs for date/time manipulation

const array1 = [1, 2, 3, 4, 5, 6, 7];
const array2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function ReservationGrid() {
  const {
    courts,
    setCourts,
    courtCreateForm,
    setCourtCreateForm,
    courtTypes,
    setCourtTypes,
    selectedVenueId,
    setSelectedVenueId,
    venues,
    setVenues,
    handleGetCourts,
    openingHours,
    closingHours,
    timeDifference,
  } = useContext(CourtTypeContext);

  const [selectedSlots, setSelectedSlots] = useState({});
  const [divArray, setDivArray] = useState([]);
  const [timeLabels, setTimeLabels] = useState([]);

  // Generate time labels between opening and closing hours (each 2 cells = 1 hour)
  const generateTimeLabels = () => {
    const startTime = dayjs(openingHours, "HH:mm");
    const endTime = dayjs(closingHours, "HH:mm");
    const labels = [];

    let currentTime = startTime;
    while (currentTime.isBefore(endTime)) {
      labels.push(currentTime.format("HH:mm"));
      currentTime = currentTime.add(1, "hour"); // Add 1 hour
    }
    setTimeLabels(labels);
  };

  // Count slots based on the time difference
  const slotCounter = () => {
    if (timeDifference > 0) {
      const NumberOfSlots = Math.floor(timeDifference / 0.5);
      const slotsArray = Array(NumberOfSlots).fill("1 s");
      setDivArray(slotsArray);
    } else {
      console.error("Invalid timeDifference:", timeDifference);
    }
  };

  useEffect(() => {
    slotCounter();
    generateTimeLabels();
  }, [timeDifference, openingHours, closingHours]);

  const toggleSlot = (rowIndex, colIndex) => {
    const slotKey = `${rowIndex}-${colIndex}`;
    const name = array1[rowIndex - 1]; // Replace names if needed
    setSelectedSlots((prevSelected) => {
      const updatedSelected = {
        ...prevSelected,
        [slotKey]: !prevSelected[slotKey],
      };
      console.log("Relevant name:", name);
      return updatedSelected;
    });
  };

  return (
    <div className="flex flex-col py-10 bg-gray-200 items-center rounded-lg w-full">
      <div className="flex">
        {/* Vertical Court Names */}
        <div className="flex flex-col mr-4">
          {courts.map((court, index) => (
            <div
              key={index}
              className="w-14 aspect-square flex items-center justify-center border"
            >
              {court.court_name}
            </div>
          ))}
        </div>

        {/* Horizontal Scrollable Slots with Time Labels */}
        <div className="overflow-x-auto">
          <div>
            {/* Time Labels Row */}
            <div className="grid grid-flow-col auto-cols-[minmax(0,1fr)]">
              {timeLabels.map((label, index) => (
                <div
                  key={index}
                  className="col-span-2 text-center font-bold w-28"
                >
                  {label}
                </div>
              ))}
            </div>

            {/* Reservation Slots */}
            <div
              className="grid grid-flow-col auto-cols-[minmax(0,1fr)] border rounded-md"
              style={{
                gridTemplateRows: `repeat(${courts.length}, minmax(0, 1fr))`,
              }}
            >
              {courts.map((_, rowIndex) =>
                divArray.map((_, colIndex) => {
                  const displayRowIndex = rowIndex + 1;
                  const displayColIndex = colIndex + 1;
                  const slotKey = `${displayRowIndex}-${displayColIndex}`;
                  const isSelected = selectedSlots[slotKey];
                  return (
                    <div
                      key={`${displayRowIndex}-${displayColIndex}`}
                      className={`border rounded-lg aspect-square w-14 hover:bg-brandBlue/40 active:bg-brandBlue border-gray-300 p-2 transition-colors duration-100 cursor-pointer text-center ${
                        isSelected ? "bg-brandBlue text-white" : ""
                      }`}
                      onClick={() =>
                        toggleSlot(displayRowIndex, displayColIndex)
                      }
                    ></div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Display opening and closing hours */}
      <p>
        {openingHours}
        <br />
        {closingHours}
        <br />
        {timeDifference}
      </p>

      {/* Horizontal Costs (displaying slot cost) */}
      <div className="flex py-4 overflow-x-auto w-full">
        <div className="flex flex-row">
          {courts.map((court, index) => (
            <div
              key={index}
              className="flex justify-evenly w-14 whitespace-nowrap"
            >
              {`$${court.cost_per_hour} per hour`}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ReservationGrid;
