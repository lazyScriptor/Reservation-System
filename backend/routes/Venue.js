import express from "express";
import {
  createVenueController,
  getVenuesFromIdController,
} from "../controllers/VenueController.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("In the venue route base");
});
router.post("/create-venue", createVenueController);
router.get(`/name/:tenantId`, getVenuesFromIdController);
export default router;
