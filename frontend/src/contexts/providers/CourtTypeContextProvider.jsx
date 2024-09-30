import React, { useEffect, useState } from "react";
import { CourtTypeContext } from "../Contexts"; // Ensure this is correctly imported

// Provider component to pass down context value
export function CourtTypeContextProvider({ children }) {
  const [courtCreateForm, setCourtCreateForm] = useState(null); // Initialize state

  useEffect(() => {
    console.log("From the context provider: ", courtCreateForm);
  }, [courtCreateForm]);
  return (
    <CourtTypeContext.Provider value={{ courtCreateForm, setCourtCreateForm }}>
      {children}
    </CourtTypeContext.Provider>
  );
}

export default CourtTypeContextProvider; // This exports it as default
