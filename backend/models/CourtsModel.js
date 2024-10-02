import pool from "../databaseConnection.js";

export const getUserCredentials = async (email) => {
  try {
    const [response] = await pool.query("SELECT * FROM users WHERE email =? ", [
      email,
    ]);
    return response;
  } catch (error) {
    throw error;
  }
};
export const createCourtDetails = async (formData) => {
  const {
    intervalSize,
    costPerSlot,
    noOfAreas,
    endTime,
    startTime,
    venueName,
    courtType,
    courtName,
    createdTime,
    updatedTime,
  } = formData;
  try {
    console.log(formData);
    const [response] = await pool.query(
      `
      INSERT INTO court(venue_id,court_type_id,court_name,cost_per_slot,slot_size,booking_time_limit,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?)
      `,
      [
        venueName,
        courtType,
        courtName,
        costPerSlot,
        intervalSize,
        null,
        createdTime,
        updatedTime,
      ]
    );
    return response;
  } catch (error) {
    throw ("Error occured in courts model create courts details", error);
  }
};
