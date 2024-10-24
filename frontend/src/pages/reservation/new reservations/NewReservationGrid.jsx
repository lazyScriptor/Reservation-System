import React, { useContext, useState, useMemo } from "react";
import { CourtTypeContext } from "../../../contexts/Contexts";

function NewReservationGrid() {
  const {
    courts,
    clickedData,
    setClickedData,
    selectedDate,
    holidayArray,
  } = useContext(CourtTypeContext);

  // State to track hover position and hovered slotId
  const [hoverData, setHoverData] = useState({
    show: false,
    x: 0,
    y: 0,
    slotId: null,
    reason: "", // Add reason to hover data
  });

  // Function to handle mouse hover
  const handleMouseEnter = (e, slotcost, reason) => {
    const { clientX, clientY } = e;

    setHoverData({
      show: true,
      x: clientX,
      y: clientY,
      slotcost, // Pass the correct slotcost
      reason, // Pass the reason for the hover
    });
  };

  // Function to handle mouse leave
  const handleMouseLeave = () => {
    setHoverData({
      show: false,
      x: 0,
      y: 0,
      slotId: null,
      reason: "", // Reset reason on mouse leave
    });
  };

  // Memoize holiday time label checks for performance
  const isHolidayTimeLabel = useMemo(() => {
    return (courtId, slot) => {
      const holidayCourt = holidayArray.find(
        (holiday) => holiday.court_id === courtId
      );

      if (
        !holidayCourt ||
        !holidayCourt.response ||
        !holidayCourt.response.closingPeriods
      ) {
        return false; // No holiday data means the slot is available
      }

      const { dateRange, dateRangeRecurring } =
        holidayCourt.response.closingPeriods;
      const selectedDateObj = new Date(selectedDate);
      const selectedDayName = selectedDateObj.toLocaleString("default", {
        weekday: "long",
      });

      // Check if the selected date falls within the defined date range
      for (const period of dateRange) {
        const startDate = new Date(period.start_date);
        const endDate = new Date(period.end_date);

        // Check if selected date falls within the date range and matches the time slot
        if (selectedDateObj >= startDate && selectedDateObj <= endDate) {
          // Check if the slot start time matches any timeLabel in the period
          if (
            period.timeLabels.some(
              (timeLabel) => timeLabel.startTime === slot.startTime
            )
          ) {
            return true; // Slot is during a holiday period
          }
        }
      }

      // Check for recurring dates
      for (const recurring of dateRangeRecurring) {
        try {
          const { recurring_days } = JSON.parse(recurring.recurring_json);

          // If the selected day is in the recurring days, we need to check the time
          if (recurring_days.includes(selectedDayName)) {
            // Check if the time slot is within the defined time range
            const timeLabels = recurring.timeLabels || [];
            if (
              timeLabels.some(
                (timeLabel) => timeLabel.startTime === slot.startTime
              )
            ) {
              return true; // Slot is during a holiday period
            }
          }
        } catch (error) {
          console.error("Error parsing recurring JSON:", error);
        }
      }

      // No matching holiday found
      return false;
    };
  }, [holidayArray, selectedDate]);

  return (
    <div className="container">
      {/* Display all clicked data */}
      <div className="flex py-4 ">
        {clickedData.map((item, index) => (
          <div key={index} className="border py-2 mb-2">
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
      <div className="flex justify-center py-8">
        <div className="flex flex-col gap-2 w-full max-w-full ">
          {courts &&
            courts.map((court, index) => (
              <div
                key={index}
                className="flex gap-2 items-center justify-center  font-semibold p-4 bg-white border-gray-100 border-2 hover:border-brandBlue shadow-brandBlue rounded-xl shadow-sm hover:shadow-lg active:shadow-xl  transition-all duration-700"
              >
                {/* Fixed Court Name with Minimum Width */}
                <h2 className="flex text-xs w-20 min-w-[100px] whitespace-nowrap">
                  {court.court_name}
                </h2>

                {/* Scrollable Time Slot Grid */}
                <div className="flex overflow-x-auto w-full">
                  {court.timeLabels &&
                    court.timeLabels.map((label, idx) => {
                      const isHoliday = isHolidayTimeLabel(
                        court.court_id,
                        label
                      );
                      const reason = isHoliday
                        ? holidayArray
                            .find(
                              (holiday) => holiday.court_id === court.court_id
                            )
                            ?.response.closingPeriods.singleDate.find(
                              (period) =>
                                period.timeLabels.some(
                                  (timeLabel) =>
                                    timeLabel.startTime === label.startTime
                                )
                            )?.reason || "Closed for a reason."
                        : ""; // Default reason if not found

                      return (
                        <div key={idx}>
                          <div
                            onMouseEnter={(e) =>
                              handleMouseEnter(e, label.slotcost, reason)
                            } // Pass the reason
                            onMouseLeave={handleMouseLeave}
                            className={`border border-gray-300 aspect-square w-10 flex justify-center items-center ${
                              isHoliday ? "bg-red-300" : "bg-blue-100"
                            }`}
                          >
                            <p className="text-xs">{label.startTime}</p>
                          </div>
                          <p
                            className={`text-xs text-center ${
                              isHoliday ? "text-red-700" : "text-blue-700"
                            } py-2`}
                          >
                            {label.slotcost} {/* Display slot cost */}
                          </p>
                        </div>
                      );
                    })}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Tooltip div to display slotId and reason when hovering */}
      {hoverData.show && (
        <div
          className="absolute bg-gray-700 text-white text-xs px-2 py-1 rounded"
          style={{
            top: `${hoverData.y + 10}px`,
            left: `${hoverData.x + 10}px`,
          }}
        >
          Slot Cost: {hoverData.slotcost} <br />
          {hoverData.reason && <span>Reason: {hoverData.reason}</span>}
        </div>
      )}
    </div>
  );
}

export default NewReservationGrid;
