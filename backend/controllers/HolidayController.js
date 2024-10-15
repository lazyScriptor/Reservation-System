import {
  getHolidayByParamsNonRecurring,
  getHolidayByParamsRecurring,
} from "../models/HolidayModel";

export const getHolidayByParamsController = async (req, res) => {
  try {
    const { holidayDate, venueId, courtId } = req.params;

    const recurring = await getHolidayByParamsRecurring(holidayDate, venueId, courtId);
    const nonRecurring = await getHolidayByParamsNonRecurring(holidayDate, venueId, courtId);
    
    const response = {
      data: {
        recurring,
        nonRecurring,
      },
    };
    
    return res.status(200).json(response);
  } catch (error) {
    console.error(error); 
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
