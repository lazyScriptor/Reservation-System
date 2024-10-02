import { createCourtDetails } from "../models/CourtsModel.js";


const formatDateAndTime = (date) => {
  const formattedCreatedTime = date
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
  return formattedCreatedTime;
};

export const createCourtController = async (req, res) => {
  try {
    let formDetails = req.body;
    const createdTime = formatDateAndTime(new Date());
    const updatedTime = formatDateAndTime(new Date());

    // Add the formatted dates to the form details
    formDetails = {
      ...formDetails,
      createdTime,
      updatedTime,
    };

    // Insert court details into the database
    const response = await createCourtDetails(formDetails);

    // Check if rows were affected by the insertion
    if (response.affectedRows >= 1) {
      res.status(201).json({ message: "Court created successfully", response });
    } else {
      res.status(400).json({ message: "Court creation failed", response });
    }
  } catch (error) {
    console.error("Error occurred in create court controller: ", error);
    res.status(500).json({ error: "An internal server error occurred while creating the court" });
  }
};