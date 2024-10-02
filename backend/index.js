import express from "express";
import userRoute from "./routes/User.js";
import venueRoute from "./routes/Venue.js";
import courtsRoute from "./routes/Courts.js";
import courtTypesRoute from './routes/CourtTypes.js'
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/user", userRoute);
app.use("/venue", venueRoute);
app.use("/court", courtsRoute);
app.use("/court-types", courtTypesRoute);

app.listen(3005, () => {
  console.log("Server starts on port 3005");
});
