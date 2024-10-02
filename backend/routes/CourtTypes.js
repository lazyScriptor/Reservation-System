import express from "express";
import { createCourtTypeDetailsController, getCourtTypeByTenantIdAndVenueController, getCourtTypeByTenantIdController } from "../controllers/CourtTypesController.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("In the CourtsType route base");
});

router.get("/court-type-by-id/:tenantId", getCourtTypeByTenantIdController);
router.get("/court-type-by-id-and-venue/:tenantId/:venueId", getCourtTypeByTenantIdAndVenueController);
router.post("/create-court-type",createCourtTypeDetailsController)
export default router;
