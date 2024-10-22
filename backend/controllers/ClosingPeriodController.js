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

    const dateRangeRecurringResponse =
      await getPeriodByCidVidRecursionsDateRange(
        venueId,
        courtId,
        selectedDate
      );
    console.log("recurring dates",dateRangeRecurringResponse);
    const combinedResponse = {
      singleDate: singleDateResponse,
      dateRange: dateRangeResponse,
      dateRangeRecurring: dateRangeRecurringResponse,
    };
    return combinedResponse;
  } catch (error) {
    console.error(error);
    return { error: "Internal Server Error" };
  }
};
