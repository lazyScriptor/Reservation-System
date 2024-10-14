import React, { useContext, useEffect, useState } from "react";
import { CourtTypeContext } from "../../../contexts/Contexts";
import dayjs from "dayjs";

function NewReservationGrid() {
  const [timeLabels, setTimeLabels] = useState([]);

  const generateTimeLabels = () => {
    const startTime = dayjs(openingHours, "HH:mm");
    const endTime = dayjs(closingHours, "HH:mm");

    const labels = [];

    let currentTime = startTime;
    while (currentTime.isBefore(endTime) || currentTime.isSame(endTime)) {
      labels.push(currentTime.format("HH:mm"));
      currentTime = currentTime.add(30, "minute"); // Add 30 minutes
    }
    setTimeLabels(labels);
  };

  const { courts, openingHours, clickedData, setClickedData, closingHours } =
    useContext(CourtTypeContext);

  useEffect(() => {
    generateTimeLabels();
  }, [courts]);

  const handleGridClick = (court, label) => {
    if (
      dayjs(label, "HH:mm").isAfter(dayjs(court.opening_hours, "HH:mm")) ||
      (dayjs(label, "HH:mm").isSame(dayjs(court.opening_hours, "HH:mm")) &&
        dayjs(label, "HH:mm").isBefore(dayjs(court.closing_hours, "HH:mm")))
    ) {
      const newEntry = {
        id: court.court_id,
        name: court.court_name,
        label,
        open: court.opening_hours,
        close: court.closing_hours,
        deadend: dayjs(label, "HH:mm").add(30, "minute").format("HH:mm"),
      };

      // Add new entry directly to clickedData
      setClickedData((prevData) => [...prevData, newEntry]);
    }
  };

  return (
    <div>
      {/* Display all clicked data */}
      <div className="flex  p-4">
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
      <div className="flex justify-center p-8 ">
        <div className="">
          {courts.map((court, index) => (
            <div
              key={index}
              className={`flex gap-2 justify-center items-center font-semibold`}
            >
              <h2 className="flex text-xs w-20 whitespace-nowrap">
                {court.court_name}
              </h2>

              <div className="flex">
                {timeLabels.map((label, index) => (
                  <div
                    key={index}
                    onClick={() => handleGridClick(court, label)} // Handle click
                    className={`border border-gray-400 aspect-square w-10 flex justify-center items-center ${
                      dayjs(label, "HH:mm").isBefore(
                        dayjs(court.opening_hours, "HH:mm")
                      ) ||
                      dayjs(label, "HH:mm").isAfter(
                        dayjs(court.closing_hours, "HH:mm")
                      ) ||
                      dayjs(label, "HH:mm").isSame(
                        dayjs(court.closing_hours, "HH:mm")
                      )
                        ? "cursor-crosshair bg-gray-300" // Disable cursor and apply styles for disabled state
                        : "cursor-pointer hover:bg-brandBlue/40 active:bg-brandBlue"
                    }`}
                  >
                    <p className="text-xs">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewReservationGrid;
