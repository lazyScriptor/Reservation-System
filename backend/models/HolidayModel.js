import pool from "../databaseConnection.js";
export const getHolidayByParamsRecurring = async (
  holidayDate,
  venueId,
  courtId
) => {
  try {
    const [response] = await pool.query(
      `
      SELECT * 
      FROM holidays
      WHERE holiday_date =? OR venue_id=? OR court_id=? AND recurring_status = 1
      `,
      [holidayDate, venueId, courtId]
    );

    return { status: 200, data: response };
  } catch (error) {
    throw error;
  }
};
export const getHolidayByParamsNonRecurring = async (
  holidayDate,
  venueId,
  courtId
) => {
  try {
    const [response] = await pool.query(
      `
      SELECT * 
      FROM holidays
      WHERE holiday_date =? OR venue_id=? OR court_id=? AND recurring_status = 0
      `,
      [holidayDate, venueId, courtId]
    );

    return { status: 200, data: response };
  } catch (error) {
    throw error;
  }
};
