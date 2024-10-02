import pool from "../databaseConnection.js";

export const createVenueDetails = async (formData) => {
  console.log("first");
  const {
    venueName,
    venueAddress,
    venueDescription,
    contactInfo,
    openingHours,
    closingHours,
    status,
  } = formData;

  try {
    console.log(formData);
    const [response] = await pool.query(
      `
      INSERT INTO venue(venue_name,user_id, venue_address, venue_description, contact_info, opening_hours, closing_hours, status, updated_at)
      VALUES (?, ?, ?, ?, ?, ?,?, ?, NOW())
      `,
      [
        venueName,
        1,
        venueAddress,
        venueDescription,
        contactInfo,
        openingHours,
        closingHours, // Include this value here
        status,
      ]
    );
    return response;
  } catch (error) {
    console.error(
      "Error occurred in courts model create courts details",
      error
    );
    throw new Error("Error occurred in courts model create courts details");
  }
};

export const getVenuesFromId = async (userId) => {
  try {
    const [response] = await pool.query(
      `
    SELECT venue_id,venue_name FROM venue WHERE user_id = ?
    `,
      [userId]
    );
    return response;
  } catch (error) {
    throw ("Error occured in the getVenueFromId model", error);
  }
};
