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
export const getBrandNames = async () => {
  try {
    const [response] = await pool.query(`
      SELECT user_id,tenant_id,first_name,email,brand_name
      FROM users
      WHERE user_type='client' AND membership_status= 'active'
      `);
      return response
  } catch (error) {
    throw error;
  }
};
