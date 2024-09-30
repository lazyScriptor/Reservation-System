import React from "react";
import ShiftDateCalendar from "./ShiftDateCalendar";
import ReservationCategoryBar from "./ReservationCategoryBar";
import ReservationGrid from "./ReservationGrid";
import CourtCreateFrom from "./forms/CourtCreateFrom";

function ReservationBase() {
  return (
    <div className="py-8 ">
      <div className="container bg-gray-300 rounded-xl py-8">
        <div className="grid grid-col-1 lg:grid-cols-3 gap-4">
          {/* Left bar */}
          <div className="col-span-1">
            {/* <ShiftDateCalendar /> */}
          </div>
          {/* Right bar */}
          <div className="col-span-2  p-4">
            {/* <ReservationGrid /> */}
            <CourtCreateFrom />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReservationBase;
