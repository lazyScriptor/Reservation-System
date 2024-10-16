import React, { useEffect, useState } from "react";
import { CourtTypeContext } from "../Contexts"; // Ensure this is correctly imported
import axios from "axios";

// Provider component to pass down context value
export function CourtTypeContextProvider({ children }) {
  const [courtCreateForm, setCourtCreateForm] = useState(null); // Initialize state
  const [venues, setVenues] = useState([]);
  const [courtTypes, setCourtTypes] = useState([]);
  const [selectedVenueId, setSelectedVenueId] = useState(""); // State to track selected venue
  const [tenantId, setTenantId] = useState(localStorage.getItem("tenantId")); // State to store tenantId
  const [courts, setCourts] = useState([]);
  const [openingHours, setOpeningHours] = useState(); // State for minimum opening hours
  const [closingHours, setClosingHours] = useState(); // State for maximum closing hours
  const [timeDifference, setTimeDifference] = useState(); // State for time difference
  const [clickedData, setClickedData] = useState([]); // Array to store clicked data
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [holidayArray, setHolidayArray] = useState([]);
  const getTimeDifference = (openingTime, closingTime) => {
    // Convert the opening and closing hours into Date objects
    const opening = new Date(`1970-01-01T${openingTime}Z`);
    const closing = new Date(`1970-01-01T${closingTime}Z`);

    // Calculate the difference in milliseconds
    const differenceInMs = closing - opening;

    // Convert milliseconds into hours
    const differenceInHours = differenceInMs / (1000 * 60 * 60); // 1000 ms * 60 sec * 60 min = 1 hour

    return differenceInHours.toFixed(2); // Return the difference rounded to 2 decimal places
  };
  // Fetch courts by venue and court type and calculate the minimum and maximum time
  const handleGetCourts = async (venueId, courtTypeId) => {
    const formattedDate = selectedDate.toISOString().slice(0, 10); // '2024-10-16'

    if (venueId && courtTypeId) {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/court/courts-by-venue-and-courttypee/${venueId}/${courtTypeId}/${formattedDate}`
        );

        const fetchedCourts = response.data.response;
        console.log(
          "court types in provider handlegecourts handler",
          fetchedCourts
        );
        if (response.data.response) {
          setCourts(fetchedCourts);

          // Calculate the minimum opening and maximum closing times
          const { minOpeningTime, maxClosingTime } = fetchedCourts.reduce(
            (acc, court) => {
              const opening = court.opening_hours;
              const closing = court.closing_hours;

              if (opening < acc.minOpeningTime) {
                acc.minOpeningTime = opening;
              }
              if (closing > acc.maxClosingTime) {
                acc.maxClosingTime = closing;
              }

              return acc;
            },
            {
              minOpeningTime: fetchedCourts[0].opening_hours, // Initialize with the first court's opening time
              maxClosingTime: fetchedCourts[0].closing_hours, // Initialize with the first court's closing time
            }
          );
          const difference = getTimeDifference(minOpeningTime, maxClosingTime);
          setTimeDifference(difference);
          // Update the state with the calculated min/max times
          setOpeningHours(minOpeningTime);
          setClosingHours(maxClosingTime);
        } else {
          setCourts([]); // Reset if no courts found
        }
      } catch (error) {
        setCourts([]);
        console.error("Error fetching courts:", error);
      }
    } else {
      setCourts([]); // Reset courts if no venue or court type is selected
    }
  };

  // Listening to the tenant id
  useEffect(() => {
    const storedTenantId = localStorage.getItem("tenantId");
    if (storedTenantId !== tenantId) {
      setTenantId(storedTenantId);
    }
  }, [tenantId]);

  // Fetch court types by venueID and tenantId
  useEffect(() => {
    const fetchCourtTypes = async () => {
      if (selectedVenueId && tenantId) {
        try {
          const response = await axios.get(
            `${
              import.meta.env.VITE_API_URL
            }/court-types/court-type-by-id-and-venue/${tenantId}/${selectedVenueId}`
          );
          if (response.data.response) {
            setCourtTypes(response.data.response);
          } else {
            setCourtTypes([]); // Reset if no court types found
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
  }, [selectedVenueId, tenantId]);

  // Fetch venue names by tenant id
  useEffect(() => {
    const fetchVenueNames = async () => {
      if (tenantId) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/venue/name/${tenantId}`
          );
          console.log("venue types", response.data.Venues);
          setVenues(response.data.Venues);
        } catch (error) {
          console.error("Error fetching venue names:", error);
        }
      }
    };

    fetchVenueNames();
  }, [tenantId]);

  // Empty the courts and court types arrays when venues or court types change
  useEffect(() => {
    setCourts([]);
  }, [venues, courtTypes]);

  useEffect(() => {
    setCourtTypes([]);
  }, [venues]);

  useEffect(() => {
    // Build the holidayArray from courts
    const newHolidayArray = courts.map((item) => ({
      venueId: item.venue_id,
      courtId: item.court_id,
      selectedDate: selectedDate,
    }));

    setHolidayArray(newHolidayArray);

    const getHolidayData = async () => {
      try {
        // Only send the request if there is data in the courts array
        if (newHolidayArray.length > 0) {
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/close/times`, // Change to POST request
            { holidayArray: newHolidayArray } // Send holidayArray in the body
          );

          // Handle the response (e.g., store the data in a state or process it)
          console.log("Holiday data response:", response.data);
        }
      } catch (error) {
        console.error("Error fetching holiday data:", error);
      }
    };

    if (newHolidayArray.length > 0) {
      getHolidayData();
    }
  }, [selectedDate, courts]); // Only trigger when courts or selectedDate change

  return (
    <CourtTypeContext.Provider
      value={{
        courts,
        setCourts,
        courtCreateForm,
        setCourtCreateForm,
        courtTypes,
        setCourtTypes,
        selectedVenueId,
        setSelectedVenueId,
        venues,
        setVenues,
        handleGetCourts,
        openingHours, // Pass down the calculated opening hours
        closingHours, // Pass down the calculated closing hours
        timeDifference,
        clickedData,
        setClickedData,
        selectedDate,
        setSelectedDate,
      }}
    >
      {children}
    </CourtTypeContext.Provider>
  );
}

export default CourtTypeContextProvider;
