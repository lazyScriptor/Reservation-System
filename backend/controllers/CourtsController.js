import {
  createCourtDetails,
  getCourtsByVenueAndCourtType,
} from "../models/CourtsModel.js";

const formatDateAndTime = (date) => {
  const formattedCreatedTime = date
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
  return formattedCreatedTime;
};

export const createCourtController = async (req, res) => {
  try {
    let formDetails = req.body;
    const createdTime = formatDateAndTime(new Date());
    const updatedTime = formatDateAndTime(new Date());

    // Add the formatted dates to the form details
    formDetails = {
      ...formDetails,
      createdTime,
      updatedTime,
    };

    // Insert court details into the database
    const response = await createCourtDetails(formDetails);

    // Check if rows were affected by the insertion
    if (response.affectedRows >= 1) {
      res.status(201).json({ message: "Court created successfully", response });
    } else {
      res.status(400).json({ message: "Court creation failed", response });
    }
  } catch (error) {
    console.error("Error occurred in create court controller: ", error);
    res.status(500).json({
      error: "An internal server error occurred while creating the court",
    });
  }
};
export const getCourtsByVenueAndCourtTypeController = async (req, res) => {
  const venueId = req.params.venueId;
  const courtTypeId = req.params.courtTypeId;

  try {
    const response = await getCourtsByVenueAndCourtType(venueId, courtTypeId);

    // Process Courts by Venue and Court Type (updatedResponse1)
    const updatedResponse = response.CourtsByVenueAndCourtType.map((court) => {
      const { opening_hours, closing_hours, cost_per_hour } = court;

      // Convert opening and closing hours to Date objects
      const startTime = new Date(`1970-01-01T${opening_hours}Z`);
      const endTime = new Date(`1970-01-01T${closing_hours}Z`);

      // Generate time slots with 30-minute intervals
      const timeLabels = [];
      let currentSlotId = 1;
      let currentTime = startTime;

      while (currentTime < endTime) {
        const nextTime = new Date(currentTime.getTime() + 30 * 60000); // 30 minutes added
        timeLabels.push({
          slotId: currentSlotId++,
          startTime: currentTime.toISOString().substring(11, 16), // Get only time part HH:MM
          endTime: nextTime.toISOString().substring(11, 16),
          slotcost: cost_per_hour, // Initially set to cost_per_hour, can be updated later
        });
        currentTime = nextTime;
      }

      return {
        ...court,
        timeLabels,
      };
    });

    // Process specialCost (updatedResponse2)
    response.specialCost.forEach((specialCost) => {
      const { courtcost_courtid, courtcost_starttime, courtcost_endtime, courtcost_cost } = specialCost;

      // Convert start and end times of special cost to Date objects
      const specialStartTime = new Date(`1970-01-01T${courtcost_starttime}Z`);
      const specialEndTime = new Date(`1970-01-01T${courtcost_endtime}Z`);

      // Find the matching court from updatedResponse
      const matchingCourt = updatedResponse.find((court) => court.court_id == courtcost_courtid);
      if (matchingCourt) {
        matchingCourt.timeLabels.forEach((slot) => {
          // Convert slot start and end times to Date objects for comparison
          const slotStartTime = new Date(`1970-01-01T${slot.startTime}Z`);
          const slotEndTime = new Date(`1970-01-01T${slot.endTime}Z`);

          // Check if the slot falls within or overlaps with the special cost time range
         
          if (
            (slotStartTime >= specialStartTime && slotStartTime < specialEndTime) || // Slot starts in the range
            (slotEndTime > specialStartTime && slotEndTime <= specialEndTime) || // Slot ends in the range
            (slotStartTime <= specialStartTime && slotEndTime >= specialEndTime) // Slot fully contains the range
          ) {
            // Update the slotcost with the special cost
            
            slot.slotcost = courtcost_cost;
          }
        
        });
      }
    });

    res.status(201).json({
      message: "Courts fetched successfully",
      response: updatedResponse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
