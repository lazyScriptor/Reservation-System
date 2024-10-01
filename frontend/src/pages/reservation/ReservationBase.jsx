import React, { useState } from "react";
import CreateVenueForm from "./forms/CreateVenueForm";
import CourtCreateFrom from "./forms/CourtCreateFrom";
import CategoryTypeButton from "../../components/CategoryTypeButton";

function ReservationBase() {
  const [disableStatus, setDisableStatus] = useState(false);
  const [count, setCount] = useState(1);
  

  // Function to update the count based on button click
  const handleClick = (number) => {
    setCount(number); // Correct way to set the count
  };

  return (
    <div className="py-8">
      <div className="container bg-gray-300 rounded-xl py-8">
        <div className="grid grid-col-1 lg:grid-cols-3 gap-4">
          {/* Left bar */}
          <div className="col-span-1">
            <div className="flex flex-col gap-4 p-4">
              <CategoryTypeButton
                name="Create Venue"
                color="brandBlue"
                hoverTextColor="brandBlue"
                handleClick={() => handleClick(1)}
                disableStatus={disableStatus}
              />
              <CategoryTypeButton
                name="Create Court"
                color="brandBlue"
                hoverTextColor="brandDarkPurple"
                handleClick={() => handleClick(2)} // Call handleClick for court form
              />
            </div>
          </div>
          {/* Right bar */}
          <div className="col-span-2 p-4">
            {count === 1 ? (
              <CreateVenueForm />
            ) : count === 2 ? (
              <CourtCreateFrom />
            ) : (
              <p>Select an option from the left to proceed</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReservationBase;
