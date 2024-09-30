import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getUserCredentials } from "../models/UserModel.js";
import { createCourtDetails } from "../models/CourtsModel.js";
const saltRounds = 10;
const myPlaintextPassword = "s0//P4$$w0rD";
const someOtherPlaintextPassword = "not_bacon";

const formatDateAndTime = (date) => {
  const formattedCreatedTime = date
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
  return formattedCreatedTime;
};
export const authorizeCheck = async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await getUserCredentials(email);
    // bcrypt.hash("123", saltRounds, function (err, hash) {
    //   console.log(hash);
    // });
    const userData = response[0];
    if (userData) {
      if (bcrypt.compareSync(password, userData.password)) {
        const token = jwt.sign(
          {
            data: userData,
          },
          "cricket",
          { expiresIn: 60 * 60 }
        );
        return res.json({
          authorizationStatus: true,
          token,
          message: "Authorization successful",
          userFoundStatus: true,
        });
      } else {
        return res.json({
          authorizationStatus: false,
          token: false,
          message: "User found but Authorization failed",
          userFoundStatus: true,
        });
      }
    } else {
      return res.json({
        authorizationStatus: false,
        token: false,
        message: "User not found & Authorization failed ",
        userFoundStatus: false,
      });
    }
  } catch (error) {
    throw error;
  }
};
export const createCourtController = async (req, res) => {
  try {
    let formDetails = req.body; // Declare using 'let' to allow reassignment
    const createdTime = formatDateAndTime(new Date()); // Get the current date and time
    const updatedTime = formatDateAndTime(new Date()); // Get the current date and time

    // Format the date to MySQL compatible format

    formDetails = {
      ...formDetails,
      createdTime: createdTime, // Use the formatted date
      updatedTime: updatedTime, // Use the formatted date
    };

    const [response] = await createCourtDetails(formDetails);
    console.log("response in controller", response);

    res.status(201).json({ message: "Court created successfully", response });
  } catch (error) {
    console.error("Error occurred in create court controller: ", error);
    res.status(500).json({ error: "Error occurred while creating court" });
  }
};
