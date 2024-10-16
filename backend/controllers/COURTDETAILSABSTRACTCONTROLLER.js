import { getCourtsByVenueAndCourtTypeController } from "./CourtsController.js";
import { getHolidayByParamsController } from "./HolidayController.js";

export const getCompleteCourtDetails = async (req, res) => {
  const { venueId, courtId, formattedDate } = req.params;
  try {
    const response1 = await getCourtsByVenueAndCourtTypeController(req, res);
    // const response2 = await getHolidayByParamsController(req.body[0])

  
    res.status(201).json({
      message: "Courts fetched successfully",
      response: response1,

    });
  } catch (err) {
    throw err;
  }
};

const handleHoldiaysWithCourts = async (venueId, selectedDate, courtId) => {
  const holidayResponse = await getHolidayByParamsController({
    venueId,
    courtId,
    selectedDate,
  });
  return holidayResponse;
};
const handleClosingsWithCourts = async (venueId, selectedDate, courtId) => {
  const closingResponse = await getHolidayByParamsController({
    venueId,
    courtId,
    selectedDate,
  });
  return closingResponse;
};
