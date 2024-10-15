import { React, useContext } from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import { CourtTypeContext } from "../../contexts/Contexts";

export default function ShiftDateCalendar() {
  const {
    courts,
    openingHours,
    clickedData,
    setClickedData,
    closingHours,
    selectedDate,
    setSelectedDate,
  } = useContext(CourtTypeContext);

  const handleDateChange = (newValue) => {
    const selectedDate = newValue.format("YYYY-MM-DD");
    setSelectedDate(selectedDate);
    console.log(selectedDate);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="container py-12">
        <DatePicker
          defaultValue={dayjs()}
          className=""
          format="DD-MMMM-YYYY" // Display full month name
          renderInput={(params) => <TextField {...params} />}
          onChange={handleDateChange} // Add onChange to capture the selected date
        />
      </div>
    </LocalizationProvider>
  );
}
