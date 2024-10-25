import express from "express";
import userRoute from "./routes/User.js";
import venueRoute from "./routes/Venue.js";
import courtsRoute from "./routes/Courts.js";
import courtTypesRoute from "./routes/CourtTypes.js";
import holidayAndClosing from "./routes/HolidayANDClosing.js";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(cookieParser());
app.use(express.json());

// Define allowed origins
const allowedOrigins = [
  "http://192.168.10.75:5173", // Replace with your personal laptop's IP
  "http://localhost:5173", // Local development
];

// Use CORS with the allowed origins
app.use(
  cors({
    credentials: true,
    origin: allowedOrigins,
  })
);

app.use("/user", userRoute);
app.use("/venue", venueRoute);
app.use("/court", courtsRoute);
app.use("/court-types", courtTypesRoute);
app.use("/close", holidayAndClosing);

app.listen(3005, "192.168.10.75", () => {
  console.log("Server starts on port 3005");
});
