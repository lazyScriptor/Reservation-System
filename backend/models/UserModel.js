import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "reservation_system",
  })
  .promise();

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
