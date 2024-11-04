import React from "react";
import CreateCourtTypeForm from "./CreateCourtTypeForm";
import CourtTypeContextProvider from "../../../../contexts/providers/CourtTypeContextProvider";
function CreateCourtTypeBase() {
  return (
    <div className=' bg-gray-200 text-gray-700 container py-8 rounded-lg'>
      <CourtTypeContextProvider>
        <CreateCourtTypeForm />
      </CourtTypeContextProvider>
    </div>
  );
}

export default CreateCourtTypeBase;
