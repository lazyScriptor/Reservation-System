import React, { useContext, useState } from "react";
import { CourtTypeContext } from "../../../contexts/Contexts";

function NewReservationGrid() {
  const {
    courts,
    openingHours,
    clickedData,
    setClickedData,
    selectedDate,
    closingHours,
    holidayArray,
    setHolidayArray,
  } = useContext(CourtTypeContext);

  // State to track hover position and hovered slotId
  const [hoverData, setHoverData] = useState({
    show: false,
    x: 0,
    y: 0,
    slotId: null,
  });

  // Function to handle mouse hover
  const handleMouseEnter = (e, slotcost) => {
    const { clientX, clientY } = e;

    setHoverData({
      show: true,
      x: clientX,
      y: clientY,
      slotcost, // Pass the correct slotcost
    });
  };

  // Function to handle mouse leave
  const handleMouseLeave = () => {
    setHoverData({
      show: false,
      x: 0,
      y: 0,
      slotId: null,
    });
  };

  const isHolidayTimeLabel = (courtId, slot) => {
    // console.log("Checking for holiday - Court:", courtId, "Slot:", slot.startTime);

    const holidayCourt = holidayArray.find(
      (holiday) => holiday.court_id == courtId
    );

    if (!holidayCourt) {
      return false; // No holiday data means the slot is available
    }

    // Ensure holidayCourt has the response and closingPeriods
    if (!holidayCourt.response || !holidayCourt.response.closingPeriods) {
      return false;
    }

    const { singleDate, dateRange, dateRangeRecurring } =
      holidayCourt.response.closingPeriods;
    const allPeriods = [...singleDate, ...dateRange, ...dateRangeRecurring];

    // Normalize function to format time for comparison
    const normalizeTime = (time) => {
      const [hours, minutes] = time.split(":").map(Number);
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
    };

    // Check if the slot time matches any timeLabel in any of the periods
    for (const period of allPeriods) {
      if (
        period.timeLabels &&
        period.timeLabels.some(
          (timeLabel) =>
            normalizeTime(timeLabel.startTime) === normalizeTime(slot.startTime)
        )
      ) {
        return true; // Slot is during a holiday period
      }
    }

    // No matching holiday found
    return false;
  };

  return (
    <div>
      {/* Display all clicked data */}
      <div className="flex p-4">
        {clickedData.map((item, index) => (
          <div key={index} className="border p-2 mb-2">
            <p>
              <strong>Court Name:</strong> {item.name}
            </p>
            <p>
              <strong>Start Time:</strong> {item.label}
            </p>
            <p>
              <strong>End Time:</strong> {item.deadend}
            </p>
          </div>
        ))}
      </div>

      {/* Grid for court and time labels */}
      <div className="flex justify-center p-8">
        <div>
          {courts &&
            courts.map((court, index) => (
              <div
                key={index}
                className={`flex gap-2 justify-center items-center font-semibold`}
              >
                <h2 className="flex text-xs w-20 whitespace-nowrap">
                  {court.court_name}
                </h2>

                <div className="flex">
                  {court.timeLabels &&
                    court.timeLabels.map((label, idx) => (
                      <div
                        key={idx}
                        onMouseEnter={(e) =>
                          handleMouseEnter(e, label.slotcost)
                        }
                        onMouseLeave={handleMouseLeave}
                        className={`border border-gray-400 aspect-square w-10 flex justify-center items-center ${
                          isHolidayTimeLabel(
                            court.court_id,
                            label,
                            selectedDate
                          )
                            ? "bg-purple-300"
                            : court.status === "available"
                            ? "bg-green-300"
                            : court.status === "booked"
                            ? "bg-yellow-300"
                            : court.status === "undermaintenance"
                            ? "bg-red-300"
                            : "bg-white"
                        }`}
                      >
                        <p className="text-xs">{label.startTime}</p>
                      </div>
                    ))}
                  | {openingHours} || {closingHours}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Tooltip div to display slotId when hovering */}
      {hoverData.show && (
        <div
          className="absolute bg-gray-700 text-white text-xs px-2 py-1 rounded"
          style={{
            top: `${hoverData.y + 10}px`,
            left: `${hoverData.x + 10}px`,
          }}
        >
          Slot Cost: {hoverData.slotcost}
        </div>
      )}
    </div>
  );
}

export default NewReservationGrid;
