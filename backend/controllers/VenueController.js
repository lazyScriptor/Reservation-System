import { createVenueDetails, getVenuesFromId } from "../models/VenueModel.js";

export const createVenueController = async (req, res) => {
  try {
    let formDetails = req.body;

    formDetails = {
      ...formDetails,
      // updatedTime: updatedTime, // Use the formatted date
    };

    const [response] = await createVenueDetails(formDetails);
    console.log("response in controller", response);

    res.status(201).json({ message: "Court created successfully", response });
  } catch (error) {
    console.error("Error occurred in create court controller: ", error);
    res.status(500).json({ error: "Error occurred while creating court" });
  }
};
export const getVenuesFromIdController = async (req, res) => {
  try {
    const userId = req.params.id;
    const response = await getVenuesFromId(userId);

    if (!response.length) {
      return res
        .status(404)
        .json({ message: "No venues found for this user." });
    }

    const venueNames = response.map((venue) => venue.venue_name);
    const result = { Venues: venueNames };
    // {
    //   "Venues": [
    //     "Venue 1",
    //     "Venue 2"
    //   ]
    // }This is the result format
    res.json(result);
  } catch (error) {
    console.error("Error occurred in getVenueDetails controller: ", error); // Log the error
    res
      .status(500)
      .json({ error: "Error occurred while fetching venue details" }); // Send error response
  }
};
