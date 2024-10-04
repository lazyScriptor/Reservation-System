import React from "react";
import ReservationBase from "./ReservationBase";
import ReservationCategoryBar from "./ReservationCategoryBar";
import ShiftDateCalendar from "./ShiftDateCalendar";
import ReservationGrid from "./ReservationGrid";
import VenueCourtAndCourtType from "./new reservations/VenueCourtAndCourtType";
import NewReservationGrid from "./new reservations/NewReservationGrid";
import CourtTypeContextProvider from "../../contexts/providers/CourtTypeContextProvider";

function Reservation() {
  return (
    <CourtTypeContextProvider>
      <div className="bg-gray-200 text-gray-700">
        <VenueCourtAndCourtType />
        <ShiftDateCalendar />
        {/* <ReservationGrid /> */}
        <NewReservationGrid />
        {/* <ReservationBase/> */}
      </div>
    </CourtTypeContextProvider>
  );
}

export default Reservation;
