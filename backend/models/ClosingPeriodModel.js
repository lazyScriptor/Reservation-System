import pool from "../databaseConnection.js";

export const getPeriodByCidVidSingleDate = async (
  venueId,
  courtId,
  selectedDate
) => {
  try {
    const [response] = await pool.query(
      `
      SELECT *
      FROM closingperiods
      WHERE venue_id = ? OR court_id = ? AND date_type = 1 AND start_date = ?
      `,
      [venueId, courtId, selectedDate]
    );
  
    return response;
  } catch (error) {
    throw error;
  }
};

export const getPeriodByCidVidDateRange = async (
  venueId,
  courtId,
  selectedDate
) => {
  try {
    const [response] = await pool.query(
      `
      SELECT *
      FROM closingperiods
      WHERE (venue_id = ? OR court_id = ?) 
      AND (? BETWEEN start_date AND end_date) 
      AND date_type <> 1
      `,
      [venueId, courtId, selectedDate]
    );
    return response;
  } catch (error) {
    throw error;
  }
};
