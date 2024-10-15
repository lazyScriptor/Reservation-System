import {
  getPeriodByCidVidSingleDate,
  getPeriodByCidVidDateRange,
} from "../models/ClosingPeriodsModel"; // Adjust the import path as necessary

export const getPeriodByCidVidSingleDateController = async (req, res) => {
  try {
    const { holidayDate, venueId, courtId } = req.params;

    const singleDateResponse = await getPeriodByCidVidSingleDate(
      holidayDate,
      venueId,
      courtId
    );
    const dateRangeResponse = await getPeriodByCidVidDateRange(
      holidayDate,
      venueId,
      courtId
    );

    const combinedResponse = {
      singleDate: singleDateResponse,
      dateRange: dateRangeResponse,
    };
    return res.status(200).json(combinedResponse);
  } catch (error) {
    console.error(error); 
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
