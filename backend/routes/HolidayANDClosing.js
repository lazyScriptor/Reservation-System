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

  try {
    // Use Promise.all to handle async operations within the array
    const results = await Promise.all(
      array.map(async (item) => {
        const singleDateResponse = await getPeriodByCidVidSingleDateController(
          item
        );
        const holidayResponse = await getHolidayByParamsController(item);

        console.log("output",{
          venue_id: item.venueId,
          court_id: item.courtId,
          response: {
            singleDate: singleDateResponse,
            holidays: holidayResponse,
          },
        });
        return {
          venue_id: item.venueId,
          court_id: item.courtId,
          response: {
            singleDate: singleDateResponse,
            holidays: holidayResponse,
          },
        };
      })
    );

    // Send all results after processing the entire array
    return res.status(200).json(results);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
