import React from "react";
import ShiftDateCalendar from "./ShiftDateCalendar";

function ReservationBase() {
  return (
    <div className="py-8 ">
      <div className="container bg-gray-300 rounded-xl py-8">
        <div className="grid grid-col-1 lg:grid-cols-3 gap-4">
          {/* Left bar */}
          <div className="col-span-1">
            <ShiftDateCalendar />
          </div>
          {/* Right bar */}
          <div className="col-span-2  p-4">
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReservationBase;
