import React from "react";
import { useParams } from "react-router-dom";
import VenueCourtAndCourtType from "./VenueCourtAndCourtType";
import ShiftDateCalendar from "./ShiftDateCalendar";
import NewReservationGrid from "./NewReservationGrid";
import CourtTypeContextProvider from "../../../../contexts/providers/CourtTypeContextProvider";

function ReservationBase() {
  const handleClick = () => {};
  const { tenantId } = useParams();
  localStorage.setItem("tenantId", tenantId);

  return (
    <div className="bg-gray-200 py-20 text-gray-700 h-[100vh]">
      <CourtTypeContextProvider>
        <VenueCourtAndCourtType />
        <ShiftDateCalendar />
        {/* <ReservationGrid /> */}
        <NewReservationGrid />
        {/* <ReservationBase/> */}
      </CourtTypeContextProvider>
    </div>
  );
}

export default ReservationBase;
