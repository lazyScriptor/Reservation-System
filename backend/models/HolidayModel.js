import pool from "../databaseConnection.js";
export const getHolidayByParamsRecurring = async (
  venueId,
  courtId,
  selectedDate
) => {
  try {
    // Query 1: Check for holidays with specific courtId
    const [courtSpecificResponse] = await pool.query(
      `
      SELECT * 
      FROM holidays
      WHERE holiday_date = ? AND ( venue_id = ? AND court_id = ? ) AND recurring_status = 1
      `,
      [selectedDate, venueId, courtId]
    );

    // Query 2: Check for holidays with no specific courtId (null courtId)
    const [venueWideResponse] = await pool.query(
      `
      SELECT * 
      FROM holidays
      WHERE holiday_date = ? AND ( venue_id = ? AND court_id IS NULL ) AND recurring_status = 1
      `,
      [selectedDate, venueId]
    );

    // If either response has results, return the first non-empty result
    if (courtSpecificResponse.length > 0) {
      return { status: 200, data: courtSpecificResponse };
    } else if (venueWideResponse.length > 0) {
      return { status: 200, data: venueWideResponse };
    }

    // If no results from either query, return an empty array
    return { status: 200, data: [] };
  } catch (error) {
    throw error;
  }
};

export const getHolidayByParamsNonRecurring = async (
  venueId,
  courtId,
  selectedDate
) => {
  try {
    // Query 1: Check for non-recurring holidays with specific courtId
    const [courtSpecificResponse] = await pool.query(
      `
      SELECT * 
      FROM holidays
      WHERE holiday_date = ? AND ( venue_id = ? AND court_id = ? ) AND recurring_status = 0
      `,
      [selectedDate, venueId, courtId]
    );

    // Query 2: Check for non-recurring holidays with no specific courtId (venue-wide)
    const [venueWideResponse] = await pool.query(
      `
      SELECT * 
      FROM holidays
      WHERE holiday_date = ? AND ( venue_id = ? AND court_id IS NULL ) AND recurring_status = 0
      `,
      [selectedDate, venueId]
    );

    // If either response has results, return the first non-empty result
    if (courtSpecificResponse.length > 0) {
      return { status: 200, data: courtSpecificResponse };
    } else if (venueWideResponse.length > 0) {
      return { status: 200, data: venueWideResponse };
    }

    // If no results from either query, return an empty array
    return { status: 200, data: [] };
  } catch (error) {
    throw error;
  }
};