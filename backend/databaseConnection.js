import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    host: "192.168.10.75",
    user: "root1",
    password: "123",
    database: "reservation_system_new3",
  })
  .promise();

export default pool;
