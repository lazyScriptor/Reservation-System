import express from "express";
import { getPeriodByCidVidSingleDateController } from "../controllers/ClosingPeriodController.js";
import { getHolidayByParamsController } from "../controllers/HolidayController.js";

const router = express.Router();

// Base route for holiday closing
router.get("/", (req, res) => {
  res.send("In the holiday closing route base");
});

router.post("/times", async (req, res) => {
  const array = req.body.holidayArray;
  let completeArray = [];

  try {
    // Use Promise.all to handle async operations within the array
    await Promise.all(
      array.map(async (item) => {
        // Fetch the singleDate and holiday responses
        const singleDataResponse = await getPeriodByCidVidSingleDateController({
          ...item,
          selectedDate: new Date(item.selectedDate).toISOString().slice(0, 10),
        });
        const holidayResponse = await getHolidayByParamsController(item);

        // Create the object and push to completeArray
        completeArray.push({
          venue_id: item.venueId,
          court_id: item.courtId,
          selectedDate: new Date(item.selectedDate).toLocaleDateString(),
          response: {
            closingPeriods: singleDataResponse,
            holidays: holidayResponse,
          },
        });
      })
    );

    return res.status(200).json(completeArray);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
