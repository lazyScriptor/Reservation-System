import React, { useContext, useEffect, useState } from "react";
import { CourtTypeContext } from "../../../contexts/Contexts";
import dayjs from "dayjs";

function NewReservationGrid() {
  const [timeLabels, setTimeLabels] = useState([]);
  const [temp, setTemp] = useState({});

  const generateTimeLabels = () => {
    const startTime = dayjs(openingHours, "HH:mm");
    const endTime = dayjs(closingHours, "HH:mm");
    const labels = [];

    let currentTime = startTime;
    while (currentTime.isBefore(endTime) || currentTime.isSame(endTime)) {
      labels.push(currentTime.format("HH:mm"));
      currentTime = currentTime.add(30, "minute"); // Add 1 hour
    }
    setTimeLabels(labels);
    console.log("dawd", labels);
  };

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
  useEffect(() => {
    generateTimeLabels();
  }, [courts]);
  return (
    <div>
      start time : {temp.open}
      <div className="flex justify-center p-8 border-2 border-gray-500">
        <div className="">
          {courts.map((court, index) => (
            <div key={index} className={`flex`}>
              <h2 className="flex whitespace-nowrap text-ellipsis">
                {court.court_name}
              </h2>

              <div className="flex ">
                {timeLabels.map((label, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      if (
                        dayjs(label, "HH:mm").isAfter(
                          dayjs(court.opening_hours, "HH:mm")
                        ) ||
                        (dayjs(label, "HH:mm").isSame(
                          dayjs(court.opening_hours, "HH:mm")
                        ) &&
                          dayjs(label, "HH:mm").isBefore(
                            dayjs(court.closing_hours, "HH:mm")
                          ))
                      ) {
                        setTemp({
                          id: court.court_id,
                          name: court.court_name,
                          lbl: label,
                          open: court.opening_hours,
                          close: court.closing_hours,
                          deadend: dayjs(label, "HH:mm")
                            .add(30, "minute")
                            .format("HH:mm"),
                        });
                        console.log(
                          court.court_id,
                          court.court_name,
                          label,
                          court.opening_hours,
                          court.closing_hours,
                          "deadend",
                          dayjs(label, "HH:mm")
                            .add(30, "minute")
                            .format("HH:mm")
                        );
                      }
                    }}
                    className={`border border-gray-400 aspect-square w-10 flex justify-center items-center${
                      dayjs(label, "HH:mm").isBefore(
                        dayjs(court.opening_hours, "HH:mm")
                      ) ||
                      dayjs(label, "HH:mm").isAfter(
                        dayjs(court.closing_hours, "HH:mm")
                      ) ||
                      dayjs(label, "HH:mm").isSame(
                        dayjs(court.closing_hours, "HH:mm")
                      )
                        ? "cursor-not-allowed bg-gray-300" // Disable cursor and apply styles for disabled state
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
