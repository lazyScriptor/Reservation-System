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
