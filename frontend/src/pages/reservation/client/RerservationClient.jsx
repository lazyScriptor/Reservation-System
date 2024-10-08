import React from "react";
import ReservationBase from "../ReservationBase";
import CourtTypeContextProvider from "../../../contexts/providers/CourtTypeContextProvider";

function RerservationClient() {
  return (
    <div>
      <CourtTypeContextProvider>
        <ReservationBase />
      </CourtTypeContextProvider>
    </div>
  );
}

export default RerservationClient;
