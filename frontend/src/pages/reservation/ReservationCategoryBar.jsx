import { Button } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import { CourtTypeContext } from "../../contexts/Contexts";
import axios from "axios";
// import { CourtTypeContext } from "../../../contexts/Contexts";

function ReservationCategoryBar() {
  const [buttonTypes, setButtonTypes] = useState([]);
  const { courtTypes } = useContext(CourtTypeContext);
  const [venueCourtTypes, setVenueCourtTypes] = useState([]);
  const [venueId,setVenueId]=useState();
  useEffect(() => {
    setButtonTypes(courtTypes);
  }, [courtTypes]);

  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -200, // Adjust this value as needed
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 200, // Adjust this value as needed
        behavior: "smooth",
      });
    }
  };
  useEffect(() => {
    const fetchCourtTypes = async () => {
      try {
        const tenantId = localStorage.getItem("tenantId");
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/court-types/court-type-by-id-and-venue/${tenantId}/${venueId}`
        );
        setVenueCourtTypes(response.data.response);
      } catch (error) {
        console.error("Error fetching court types:", error);
      }
    };

    fetchCourtTypes();
  }, []); // Dependency on selectedVenueId
  return (
    <div className="w-full flex items-center gap-2">
      {/* Venue butons */}
      <div>
        
      </div>
      {/* Court type buttons */}
      <div>
        <button
          onClick={scrollLeft}
          className=" bg-gray-100 hover:bg-gray-300 transition-colors duration-200  p-4 rounded-full"
        >
          <GrPrevious />
        </button>

        <div
          className="flex items-center max-w-full overflow-x-scroll bg-brandBlue-50 p-4 rounded-xl hide-scrollbar"
          ref={scrollRef}
        >
          <div className="flex gap-4">
            {buttonTypes.map((button, index) => (
              <button
                className={`bg-brandBlue-400 text-brandBlue font-bold p-2 rounded-md hover:bg-brandBlue-500 whitespace-nowrap`}
                key={button.court_type}
              >
                {button.type_name}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={scrollRight}
          className=" bg-gray-100 hover:bg-gray-300 transition-colors duration-200  p-4 rounded-full"
        >
          <GrNext />
        </button>
      </div>
    </div>
  );
}

export default ReservationCategoryBar;
