import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "reservation_system_new3",
  })
  .promise();

export default pool;
