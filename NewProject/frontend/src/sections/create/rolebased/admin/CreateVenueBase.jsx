import React from "react";
import CreateVenueForm from "./CreateVenueForm";
import CourtTypeContextProvider from "../../../../contexts/providers/CourtTypeContextProvider";

function CreateVenueBase() {
  return (
    <div className=' bg-gray-200 text-gray-700 container py-8 rounded-lg'>
      <CourtTypeContextProvider>
        <CreateVenueForm />
      </CourtTypeContextProvider>
    </div>
  );
}

export default CreateVenueBase;
