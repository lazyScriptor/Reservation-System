import express from "express";
import { getCourtTypeByTenantIdController } from "../controllers/CourtTypesController.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("In the CourtsType route base");
});

router.get("/court-type-by-id/:tenantId", getCourtTypeByTenantIdController);

export default router;
