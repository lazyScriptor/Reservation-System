import { getCourtsByVenueAndCourtTypeController } from "./CourtsController.js";

export const getCompleteCourtDetails = async (req, res) => {
  try {
    const response1 = await getCourtsByVenueAndCourtTypeController(req, res);
    
    res.status(201).json({
    
      message: "Courts fetched successfully",
      response: response1,
    });
  } catch (err) {
    throw err;
  }
};
