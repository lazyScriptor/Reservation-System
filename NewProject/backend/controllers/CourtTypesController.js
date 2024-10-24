import {
  createCourtTypeDetails,
  getCourtTypeByTenantId,
  getCourtTypeByTenantIdAndVenue,
} from "../models/CourtTypesModel.js";

const formatDateAndTime = (date) => {
  const formattedCreatedTime = date
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
  return formattedCreatedTime;
};

export const getCourtTypeByTenantIdController = async (req, res) => {
  try {
    const tenantId = req.params.tenantId;

    // Input validation (ensure tenantId is provided and valid)
    if (!tenantId) {
      return res.status(400).json({ message: "Tenant ID is required" });
    }

    const response = await getCourtTypeByTenantId(tenantId);

    if (response.length === 0) {
      return res
        .status(404)
        .json({ message: "No court types found for the given tenant" });
    }

    // Optionally, you can format the response or add additional logic here
    res
      .status(200)
      .json({ message: "Court types fetched successfully", response });
  } catch (error) {
    console.error("Error in fetching court types for tenant:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error. Could not fetch court types." });
  }
};

export const getCourtTypeByTenantIdAndVenueController = async (req, res) => {
  try {
    const tenantId = req.params.tenantId;
    const venueId = req.params.venueId;

    // Input validation (ensure tenantId and venueId are provided and valid)
    if (!tenantId || !venueId) {
      return res
        .status(400)
        .json({ message: "Tenant ID and venue ID are required" });
    }

    const response = await getCourtTypeByTenantIdAndVenue(tenantId, venueId);

    if (response.length === 0) {
      return res.status(404).json({
        message: "No court types found for the given tenant and venue",
      });
    }

    // Optionally, you can format the response or add additional logic here
    res
      .status(200)
      .json({ message: "Court types fetched successfully", response });
  } catch (error) {
    console.error("Error in fetching court types for tenant and venue:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error. Could not fetch court types." });
  }
};

export const createCourtTypeDetailsController = async (req, res) => {
  const formData = req.body;

  // Input validation
  const { courtDescription, courtName, courtType, venueName } = formData;
  if (!courtDescription || !courtName || !courtType || !venueName) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const response = await createCourtTypeDetails(formData);
    res.status(201).json({
      message: "Court type details created successfully",
      courtTypeId: response.insertId, // Assuming you're returning the insert ID
    });
  } catch (error) {
    console.error("Error occurred while creating court type details:", error);
    res.status(500).json({
      message: "Failed to create court type details. Please try again later.",
    });
  }
};
