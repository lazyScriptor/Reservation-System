import pool from "../databaseConnection.js";

export const createVenueDetails = async (formData) => {
  const {
    venueName,
    venueAddress,
    venueDescription,
    contactInfo,
    openingHours,
    closingHours,
    status,
    tenantId,
  } = formData;

  try {
    const [response] = await pool.query(
      `
      INSERT INTO venue(tenant_id, venue_name, venue_address, venue_description, contact_info, opening_hours, closing_hours, status, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
      `,
      [
        tenantId,
        venueName,
        venueAddress,
        venueDescription,
        contactInfo,
        openingHours,
        closingHours,
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

export const getVenuesFromId = async (tenantId) => {

  try {
    const [response] = await pool.query(
      `
    SELECT venue_id,venue_name FROM venue WHERE tenant_id = ?
    `,
      [tenantId]
    );
  
    return response;
  } catch (error) {
    throw ("Error occured in the getVenueFromId model", error);
  }
};
