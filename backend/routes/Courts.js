import express from "express";
import { createCourtController, getCourtsByVenueAndCourtTypeController } from "../controllers/CourtsController.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("In the Courts route base");
});

router.post("/create-court",createCourtController);
router.get('/courts-by-venue-and-courttype/:venueId/:courtTypeId',getCourtsByVenueAndCourtTypeController)


export default router;
