import React from "react";
import ReservationBase from "./ReservationBase";
import ReservationCategoryBar from "./ReservationCategoryBar";
import ShiftDateCalendar from "./ShiftDateCalendar";
import ReservationGrid from "./ReservationGrid";
import VenueCourtAndCourtType from "./new reservations/VenueCourtAndCourtType";

function Reservation() {
  return (
    <div className="bg-gray-200 text-gray-700">
      <VenueCourtAndCourtType />
      <ShiftDateCalendar />
      <ReservationGrid />
      {/* <ReservationBase/> */}
    </div>
  );
}

export default Reservation;
