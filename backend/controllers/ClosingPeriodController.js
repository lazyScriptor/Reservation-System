import {
  getPeriodByCidVidSingleDate,
  getPeriodByCidVidDateRange,
} from "../models/ClosingPeriodModel.js";

export const getPeriodByCidVidSingleDateController = async (item) => {
  try {
    const { venueId,courtId,selectedDate  } = item;

    const singleDateResponse = await getPeriodByCidVidSingleDate(
     venueId,courtId,selectedDate 
    );
    const dateRangeResponse = await getPeriodByCidVidDateRange(
     venueId,courtId,selectedDate 
    );

    const combinedResponse = {
      singleDate: singleDateResponse,
      dateRange: dateRangeResponse,
    };
    return (combinedResponse);
  } catch (error) {
    console.error(error);
    return ({ error: "Internal Server Error" });
  }
};
