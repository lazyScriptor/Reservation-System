import pool from "../databaseConnection.js";

export const getPeriodByCidVidSingleDate = async (
  venueId,
  courtId,
  selectedDate
) => {
  try {
    // Query 1: Check for closing periods specific to the courtId
    const [courtSpecificResponse] = await pool.query(
      `
      SELECT *
      FROM closingperiods
      WHERE venue_id = ? AND court_id = ? AND date_type = 1 AND start_date = ?
      AND recurring_status = 0
      `,
      [venueId, courtId, selectedDate]
    );

    // Query 2: Check for closing periods that apply to the entire venue (court_id IS NULL)
    const [venueWideResponse] = await pool.query(
      `
      SELECT *
      FROM closingperiods
      WHERE venue_id = ? AND court_id IS NULL AND date_type = 1 AND start_date = ? AND recurring_status = 0
      `,
      [venueId, selectedDate]
    );
    
    // Return the first non-empty response
    if (courtSpecificResponse.length > 0) {
      return courtSpecificResponse;
    } else if (venueWideResponse.length > 0) {
      return venueWideResponse;
    }

    // Return an empty array if no results
    return [];
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
    // Query 1: Check for date range closing periods specific to the courtId
    const [courtSpecificResponse] = await pool.query(
      `
      SELECT *
      FROM closingperiods
      WHERE venue_id = ? AND court_id = ? 
      AND date_type <> 1
      AND ? BETWEEN start_date AND end_date AND recurring_status = 0
      `,
      [venueId, courtId, selectedDate]
    );

    // Query 2: Check for date range closing periods that apply to the entire venue (court_id IS NULL)
    const [venueWideResponse] = await pool.query(
      `
      SELECT *
      FROM closingperiods
      WHERE venue_id = ? AND court_id IS NULL
      AND date_type <> 1
      AND ? BETWEEN start_date AND end_date AND recurring_status = 0
      `,
      [venueId, selectedDate]
    );

    // Return the first non-empty response
    if (courtSpecificResponse.length > 0) {
      return courtSpecificResponse;
    } else if (venueWideResponse.length > 0) {
      return venueWideResponse;
    }

    // Return an empty array if no results
    return [];
  } catch (error) {
    throw error;
  }
};
export const getPeriodByCidVidRecursionsDateRange = async (
  venueId,
  courtId,
  selectedDate
) => {
  try {
    // Query 1: Check for date range closing periods specific to the courtId
    const [courtSpecificResponse] = await pool.query(
      `
      SELECT *
      FROM closingperiods
      WHERE venue_id = ? AND court_id = ? 
      AND ? BETWEEN start_date AND end_date AND recurring_status = 1
      `,
      [venueId, courtId, selectedDate]
    );

    // Query 2: Check for date range closing periods that apply to the entire venue (court_id IS NULL)
    const [venueWideResponse] = await pool.query(
      `
      SELECT *
      FROM closingperiods
      WHERE venue_id = ? AND court_id IS NULL
      AND ? BETWEEN start_date AND end_date AND recurring_status = 1
      `,
      [venueId, selectedDate]
    );

    // Return the first non-empty response
    if (courtSpecificResponse.length > 0) {
      return courtSpecificResponse;
    } else if (venueWideResponse.length > 0) {
      return venueWideResponse;
    }

    // Return an empty array if no results
    return [];
  } catch (error) {
    throw error;
  }
};
