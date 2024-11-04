import React from "react";
import CreateCourtForm from "./CreateCourtForm";
import CourtTypeContextProvider from "../../../../contexts/providers/CourtTypeContextProvider";
function CreateCourtBase() {
  return (
    <div className=' bg-gray-200 text-gray-700 container py-8 rounded-lg'>
      <CourtTypeContextProvider>

      <CreateCourtForm />
      </CourtTypeContextProvider>
    </div>
  );
}

export default CreateCourtBase;
