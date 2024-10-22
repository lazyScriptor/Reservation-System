import {
  createCourtDetails,
  getCourtsByVenueAndCourtType,
} from "../models/CourtsModel.js";
import { getPeriodByCidVidSingleDateController } from "./ClosingPeriodController.js";
import { getHolidayByParamsController } from "./HolidayController.js";

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
  const selectedDate = req.params.formattedDate;

  try {
    const response = await getCourtsByVenueAndCourtType(venueId, courtTypeId);

    // Find the minimum start time and maximum end time across all courts
    let minStartTime = new Date("1970-01-01T23:59:00Z");
    let maxEndTime = new Date("1970-01-01T00:00:00Z");

    response.CourtsByVenueAndCourtType.forEach((court) => {
      const startTime = new Date(`1970-01-01T${court.opening_hours}Z`);
      const endTime = new Date(`1970-01-01T${court.closing_hours}Z`);

      if (startTime < minStartTime) minStartTime = startTime;
      if (endTime > maxEndTime) maxEndTime = endTime;
    });

    // Create the full range of time slots from minStartTime to maxEndTime
    const fullTimeSlots = [];
    let currentSlotTime = minStartTime;
    let currentSlotId = 1;

    while (currentSlotTime < maxEndTime) {
      const nextSlotTime = new Date(currentSlotTime.getTime() + 30 * 60000); // 30 minutes added
      fullTimeSlots.push({
        slotId: currentSlotId++,
        startTime: currentSlotTime.toISOString().substring(11, 16),
        endTime: nextSlotTime.toISOString().substring(11, 16),
        slotcost: 0, // Placeholder cost, will be updated per court
        disableStatus: 1, // Disabled by default, will be updated if applicable
      });
      currentSlotTime = nextSlotTime;
    }

    // Process Courts by Venue and Court Type (updatedResponse)
    const updatedResponse = response.CourtsByVenueAndCourtType.map((court) => {
      const { opening_hours, closing_hours, cost_per_hour, court_id, status } =
        court;

      // Convert opening and closing hours to Date objects
      const courtStartTime = new Date(`1970-01-01T${opening_hours}Z`);
      const courtEndTime = new Date(`1970-01-01T${closing_hours}Z`);

      // Copy the fullTimeSlots and mark those slots that match the court's active hours
      const courtTimeLabels = fullTimeSlots.map((slot) => {
        const slotStartTime = new Date(`1970-01-01T${slot.startTime}Z`);
        const slotEndTime = new Date(`1970-01-01T${slot.endTime}Z`);

        // Determine if the slot is within the court's operating hours
        if (slotStartTime >= courtStartTime && slotEndTime <= courtEndTime) {
          return {
            ...slot,
            slotcost: cost_per_hour, // Set court's cost per hour for active slots
            disableStatus: status === "available" ? 0 : 1, // Enable or disable based on court status
          };
        }
        return slot; // Keep disabled slots outside the court's hours
      });

      return {
        ...court,
        timeLabels: courtTimeLabels,
      };
    });

    // Process specialCost (updatedResponse2)
    response.specialCost.forEach((specialCost) => {
      const {
        courtcost_courtid,
        courtcost_starttime,
        courtcost_endtime,
        courtcost_cost,
      } = specialCost;

      // Convert start and end times of special cost to Date objects
      const specialStartTime = new Date(`1970-01-01T${courtcost_starttime}Z`);
      const specialEndTime = new Date(`1970-01-01T${courtcost_endtime}Z`);

      // Find the matching court from updatedResponse
      const matchingCourt = updatedResponse.find(
        (court) => court.court_id === courtcost_courtid
      );
      if (matchingCourt) {
        matchingCourt.timeLabels.forEach((slot) => {
          // Convert slot start and end times to Date objects for comparison
          const slotStartTime = new Date(`1970-01-01T${slot.startTime}Z`);
          const slotEndTime = new Date(`1970-01-01T${slot.endTime}Z`);

          // Check if the slot falls within or overlaps with the special cost time range
          if (
            (slotStartTime >= specialStartTime &&
              slotStartTime < specialEndTime) || // Slot starts in the range
            (slotEndTime > specialStartTime && slotEndTime <= specialEndTime) || // Slot ends in the range
            (slotStartTime <= specialStartTime && slotEndTime >= specialEndTime) // Slot fully contains the range
          ) {
            // Update the slotcost with the special cost
            slot.slotcost = courtcost_cost;
          }
        });
      }
    });

    // Add venue details to each court in the updatedResponse
    updatedResponse.forEach((court) => {
      const matchingVenue = response.venue.find(
        (venue) => venue.venue_id == venueId // Ensure we are matching by the correct venue ID
      );

      if (matchingVenue) {
        const { venue_id, venue_name, status } = matchingVenue;
        court.venueDetails = {
          venue_id,
          venue_name,
          isVenueDisabled:
            status == "open"
              ? false
              : status == "closed"
              ? true
              : status == "under maintenance"
              ? true
              : false, // Update based on your status logic
        };
      }
    });

    // Return the updated response with courts
    return updatedResponse;
  } catch (error) {
    console.error("Error occurred in get courts controller: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
