import React from "react";
import ReservationBase from "./ReservationBase";
import ReservationCategoryBar from "./ReservationCategoryBar";
import ShiftDateCalendar from "./ShiftDateCalendar";
import ReservationGrid from "./ReservationGrid";
import VenueCourtAndCourtType from "./new reservations/VenueCourtAndCourtType";
import NewReservationGrid from "./new reservations/NewReservationGrid";
import CourtTypeContextProvider from "../../contexts/providers/CourtTypeContextProvider";
import { useParams } from "react-router-dom";

function Reservation() {
  const handleClick = () => {};
  const { tenantId } = useParams();
  localStorage.setItem("tenantId", tenantId);

  return (
    <CourtTypeContextProvider>
      <div className="bg-gray-50 text-gray-700 h-[100vh]">
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
''