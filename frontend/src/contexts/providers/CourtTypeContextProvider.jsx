import React, { useEffect, useState } from "react";
import { CourtTypeContext } from "../Contexts"; // Ensure this is correctly imported
import axios from "axios";

// Provider component to pass down context value
export function CourtTypeContextProvider({ children }) {
  const [courtCreateForm, setCourtCreateForm] = useState(null); // Initialize state
  const [venues, setVenues] = useState([]);
  const [courtTypes, setCourtTypes] = useState([]);
  const [selectedVenueId, setSelectedVenueId] = useState(""); // State to track selected venue

  useEffect(() => {
    const fetchCourtTypes = async () => {
      if (selectedVenueId) {
        try {
          const tenantId = localStorage.getItem("tenantId");
          const response = await axios.get(
            `${
              import.meta.env.VITE_API_URL
            }/court-types/court-type-by-id-and-venue/${tenantId}/${selectedVenueId}`
          );
          if (courtTypes) {
            setCourtTypes(response.data.response);
          } else {
            setCourtTypes([]);
          }
        } catch (error) {
          setCourtTypes([]);

          console.error("Error fetching court types:", error);
        }
      } else {
        setCourtTypes([]); // Reset court types if no venue is selected
      }
    };

    fetchCourtTypes();
  }, [selectedVenueId]); // Dependency on selectedVenueId
  useEffect(() => {
    const fetchVenueNames = async () => {
      try {
        const tenantId = localStorage.getItem("tenantId");
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/venue/name/${tenantId}`
        );
        console.log("venue typeds", response.data.Venues);

        setVenues(response.data.Venues);
      } catch (error) {
        console.error("Error fetching venue names:", error);
      }
    };

    fetchVenueNames();
  }, [courtTypes]);
  return (
    <CourtTypeContext.Provider
      value={{
        courtCreateForm,
        setCourtCreateForm,
        courtTypes,
        setCourtTypes,
        selectedVenueId,
        setSelectedVenueId,
        venues,
        setVenues,
      }}
    >
      {children}
    </CourtTypeContext.Provider>
  );
}

export default CourtTypeContextProvider; // This exports it as default
