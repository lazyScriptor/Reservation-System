import express from "express";
import userRoute from "./routes/User.js";
import venueRoute from "./routes/Venue.js";
import courtsRoute from "./routes/Courts.js";
import courtTypesRoute from "./routes/CourtTypes.js";
import holidayAndClosing from "./routes/HolidayANDClosing.js";
import cors from "cors";

const app = express();
app.use(express.json());

// Define allowed origins
const allowedOrigins = [
  "http://192.168.10.75:5173", // Replace with your personal laptop's IP
];

// Use CORS with the allowed origins
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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
