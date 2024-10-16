import pool from "../databaseConnection.js";
export const getHolidayByParamsRecurring = async (
  venueId,
  courtId,
  selectedDate
) => {
  try {
    const [response] = await pool.query(
      `
      SELECT * 
      FROM holidays
      WHERE holiday_date =? AND ( venue_id= ? OR court_id=? ) AND recurring_status = 1
      `,
      [selectedDate, venueId, courtId]
    );

    return { status: 200, data: response };
  } catch (error) {
    throw error;
  }
};
export const getHolidayByParamsNonRecurring = async (
  venueId,
  courtId,
  selectedDate
) => {
  console.log(venueId, courtId, selectedDate);
  try {
    const [response] = await pool.query(
      `
      SELECT * 
      FROM holidays
      WHERE holiday_date =? AND ( venue_id=? OR court_id=? ) AND recurring_status = 0
      `,
      [selectedDate, venueId, courtId]
    );
    console.log(response);
    return { status: 200, data: response };
  } catch (error) {
    throw error;
  }
};
