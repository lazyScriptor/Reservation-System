import { getCourtTypeByTenantId } from "../models/CourtTypesModel.js";

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
