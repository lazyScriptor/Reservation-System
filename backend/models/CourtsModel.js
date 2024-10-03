import pool from "../databaseConnection.js";

export const createCourtDetails = async (formData) => {
  const {
    bookingLimit,
    costPerSlot,
    courtName,
    courtStatus,
    courtType,
    endTime,
    maintenanceStatus,
    startTime,
    venueName,
  } = formData;
  try {
    console.log(formData);
    const [response] = await pool.query(
      `
      INSERT INTO court(court_type_id,venue_id,court_name,cost_per_hour,status,opening_hours,closing_hours,booking_time_limit,maintenance_status) VALUES(?,?,?,?,?,?,?,?,?)
      `,
      [
        courtType,
        venueName,
        courtName,
        costPerSlot,
        courtStatus,
        startTime,
        endTime,
        bookingLimit,
        maintenanceStatus,
      ]
    );
    return response;
  } catch (error) {
    throw ("Error occured in courts model create courts details", error);
  }
};
export const getCourtsByVenueAndCourtType = async (venueId, courtTypeId) => {
  const [response] = await pool.query(
    `
    SELECT * 
    FROM court
    WHERE venue_id = ? AND court_type_id = ?
    `,
    [venueId, courtTypeId]
  );
  return response;
};
