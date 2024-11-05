import React, { useContext, useEffect, useState } from "react";

import { IoIosRefresh } from "react-icons/io";
import { CourtTypeContext } from "../../../../contexts/Contexts";

function VenueCourtAndCourtType() {
  const {
    courts,
    setCourts,
    openingHours,
    closingHours,
    courtCreateForm,
    setCourtCreateForm,
    courtTypes,
    setCourtTypes,
    selectedVenueId,
    setSelectedVenueId,
    venues,
    setVenues,
    handleGetCourts,
  } = useContext(CourtTypeContext);

  useEffect(() => {
    console.log(courts);
  }, [courts]);
  return (
    <div>
      <div className="container">
        <div className="flex items-center gap-8">
          <div className="">
            {/* Venue buttons */}
            <div className="bg-white flex gap-2 p-1">
              {venues.map((venue, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedVenueId(venue.venue_id)}
                  className="text-black bg-gray-300 p-1 px-2 font-semibold text-xs hover:bg-gray-500"
                >
                  {venue.venue_name}
                </button>
              ))}
            </div>
            <hr className="p-1" />

            {/* Court type buttons */}
            <div className="bg-white flex gap-2 p-1">
              {courtTypes.map((court, index) => (
                <button
                  onClick={() =>
                    handleGetCourts(selectedVenueId, court.court_type_id)
                  }
                  key={index}
                  className="text-black bg-gray-300 p-1 px-2 font-semibold text-xs hover:bg-gray-500"
                >
                  {court.type_name}
                </button>
              ))}
            </div>
            <hr className="p-1" />

            {/* Court buttons */}
            <div className="bg-white flex gap-2 p-1">
              {courts.map((court, index) => (
                <button
                  key={index}
                  className="text-black bg-gray-300 p-1 px-2 font-semibold text-xs hover:bg-gray-500"
                >
                  {court.court_name}
                </button>
              ))}
            </div>
          </div>

          {/* Refresh button */}
          {/* <div>
            <button
              className="text-lg"
              onClick={() => {
                setCourtTypes([]);
                setCourts([]);
              }}
            >
              <IoIosRefresh />
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default VenueCourtAndCourtType;
