import React from "react";
import ReservationBase from "./ReservationBase";
import ReservationCategoryBar from "./ReservationCategoryBar";
import ShiftDateCalendar from "./ShiftDateCalendar";
import ReservationGrid from "./ReservationGrid";
import VenueCourtAndCourtType from "./new reservations/VenueCourtAndCourtType";
import CourtTypeContextProvider from "../../contexts/providers/CourtTypeContextProvider";

function Reservation() {
  return (
    <CourtTypeContextProvider>
      <div className="bg-gray-200 text-gray-700">
        <VenueCourtAndCourtType />
        <ShiftDateCalendar />
        <ReservationGrid />

        {/* <ReservationBase/> */}
      </div>
    </CourtTypeContextProvider>
  );
}

export default Reservation;
