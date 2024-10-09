import React, { useState } from "react";

import CategoryTypeButton from "../../components/CategoryTypeButton";
import CreateVenueForm from "./client/forms/CreateVenueForm";
import CreateCourtForm from "./client/forms/CreateCourtForm";
import CreateCourtTypeForm from "./client/forms/CreateCourtTypeForm";

function ReservationBase() {
  const [disableStatus, setDisableStatus] = useState(false);
  const [count, setCount] = useState(1);

  // Function to update the count based on button click
  const handleClick = (number) => {
    setCount(number); // Correct way to set the count
  };

  return (
    <div className="py-8">
      <div className="container  rounded-xl py-8">
        <div className="grid grid-col-1 lg:grid-cols-3 gap-4">
          {/* Left bar */}
          <div className="col-span-1">
            <div className="flex flex-col gap-4 p-4 ">
              <CategoryTypeButton
                name="I got a new Arena"
                description="When you create venues, notice that you have to create court types as well as courts inside them"
                color="white"
                hoverTextColor="brandBlue"
                handleClick={() => handleClick(1)}
                disableStatus={disableStatus}
              />
              <CategoryTypeButton
                name="Create court types"
                description="If you create a court type, make sure to create courts as well. Otherwise customers will not be able to make reservations"
                color="white"
                hoverTextColor="brandBlue"
                handleClick={() => handleClick(2)} // Call handleClick for court form
              />
              <CategoryTypeButton
                name="Make a new court"
                description="This is the last step, beware of the schdule type. It will be the interface that customer will see"
                color="white"
                hoverTextColor="brandBlue"
                handleClick={() => handleClick(3)} // Call handleClick for court form
              />
            </div>
          </div>
          {/* Right bar */}
          <div className="col-span-2 p-4">
            {count === 1 ? (
              <CreateVenueForm />
            ) : count === 2 ? (
              <CreateCourtTypeForm />
            ) : count === 3 ? (
              <CreateCourtForm />
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
