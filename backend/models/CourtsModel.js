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
  try {
    
  } catch (error) {
    throw ("Error occured in courts model create courts details", error);
  }
};
