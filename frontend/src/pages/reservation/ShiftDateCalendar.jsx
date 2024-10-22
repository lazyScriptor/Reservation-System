import React, { useContext } from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import { CourtTypeContext } from "../../contexts/Contexts";

export default function ShiftDateCalendar() {
  const {
    selectedDate,
    setSelectedDate,
  } = useContext(CourtTypeContext);

  const handleDateChange = (newValue) => {
    if (newValue && newValue.isValid()) {
      const dateObject = newValue.toDate(); // Convert dayjs object to JavaScript Date object
      setSelectedDate(dateObject);
      console.log("Selected date:", dateObject);
    } else {
      console.log("Invalid date selected");
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="container py-12">
        <DatePicker
          value={dayjs(selectedDate)} // Use dayjs to format the selected date
          format="DD-MMMM-YYYY" // Display full month name
          renderInput={(params) => <TextField {...params} />}
          onChange={handleDateChange} // Update to use the new handleDateChange
        />
      </div>
    </LocalizationProvider>
  );
}
