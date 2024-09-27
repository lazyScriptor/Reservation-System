import * as React from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";

export default function ShiftDateCalendar() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="w-full">
        <DatePicker
          defaultValue={dayjs(Date())}
          className=""
          format="DD-MMMM-YYYY" // Display full month name
          renderInput={(params) => <TextField {...params} />}
        />
      </div>
    </LocalizationProvider>
  );
}
