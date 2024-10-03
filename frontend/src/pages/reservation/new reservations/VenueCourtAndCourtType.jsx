import React, { useContext, useEffect, useState } from "react";
import { CourtTypeContext } from "../../../contexts/Contexts";
import axios from "axios";

function VenueCourtAndCourtType() {

  const {
    courtCreateForm,
    setCourtCreateForm,
    courtTypes,
    setCourtTypes,
    selectedVenueId,
    setSelectedVenueId,
    venues,
    setVenues,
  } = useContext(CourtTypeContext);
  return (
    <div>
      <div className="container">
        <div className="bg-white flex gap-4 p-2 ">
          {venues.map((venue, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedVenueId(venue.venue_id);
              }}
              className="text-black bg-gray-300 p-4 hover:bg-gray-500"
            >
              {venue.venue_name}
            </button>
          ))}
        </div>
        <div className="bg-white flex gap-4 p-2 ">
          {courtTypes.map((court, index) => (
            <button
              key={index}
              className="text-black bg-gray-300 p-4 hover:bg-gray-500"
            >
              {court.type_name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VenueCourtAndCourtType;
