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

    // Map to create an array of objects with venue_id and venue_name
    const venuesWithId = response.map((venue) => ({
      venue_id: venue.venue_id, // Assuming you have a column 'venue_id' in your response
      venue_name: venue.venue_name,
    }));

    const result = { Venues: venuesWithId };
    // Result format:
    // {
    //   "Venues": [
    //     { "venue_id": 1, "venue_name": "Venue 1" },
    //     { "venue_id": 2, "venue_name": "Venue 2" }
    //   ]
    // }

    res.json(result);
  } catch (error) {
    console.error("Error occurred in getVenueDetails controller: ", error); // Log the error
    res
      .status(500)
      .json({ error: "Error occurred while fetching venue details" }); // Send error response
  }
};
