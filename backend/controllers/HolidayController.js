import {
  getHolidayByParamsNonRecurring,
  getHolidayByParamsRecurring,
} from "../models/HolidayModel.js";

export const getHolidayByParamsController = async (item) => {
  try {
    const { venueId,courtId,selectedDate } = item;
  

    // Fetch recurring and non-recurring holidays
    const recurring = await getHolidayByParamsRecurring(venueId, courtId, selectedDate);
    const nonRecurring = await getHolidayByParamsNonRecurring(venueId, courtId, selectedDate);

    // Instead of sending a response, return the data
    return {
      recurring: recurring.data,
      nonRecurring: nonRecurring.data,
    };
  } catch (error) {
    console.error(error); 
    throw error; // Propagate error up to be handled by the caller
  }
};
