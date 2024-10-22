import {
  getPeriodByCidVidSingleDate,
  getPeriodByCidVidDateRange,
  getPeriodByCidVidRecursionsDateRange,
} from "../models/ClosingPeriodModel.js";

export const getPeriodByCidVidSingleDateController = async (item) => {
  try {
    const { venueId, courtId, selectedDate } = item;

    const singleDateResponse = await getPeriodByCidVidSingleDate(
      venueId,
      courtId,
      selectedDate
    );
    const dateRangeResponse = await getPeriodByCidVidDateRange(
      venueId,
      courtId,
      selectedDate
    );
    const dateRangeRecurringResponse = await getPeriodByCidVidRecursionsDateRange(
      venueId,
      courtId,
      selectedDate
    );

    // Helper function to generate time slots
    const generateTimeSlots = (response) => {
      return response.map((item) => {
        const { start_time, end_time } = item;
        // Convert opening and closing hours to Date objects
        const startTime = new Date(`1970-01-01T${start_time}Z`);
        const endTime = new Date(`1970-01-01T${end_time}Z`);

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
          });
          currentTime = nextTime;
        }
        return {
          ...item,
          timeLabels,
        };
      });
    };

    // Generate time slots for all three responses
    const updatedSingleDateResponse = generateTimeSlots(singleDateResponse);
    const updatedDateRangeResponse = generateTimeSlots(dateRangeResponse);
    const updatedDateRangeRecurringResponse = generateTimeSlots(
      dateRangeRecurringResponse
    );

    const combinedResponse = {
      singleDate: updatedSingleDateResponse,
      dateRange: updatedDateRangeResponse,
      dateRangeRecurring: updatedDateRangeRecurringResponse,
    };

    return combinedResponse;
  } catch (error) {
    console.error(error);
    return { error: "Internal Server Error" };
  }
};
