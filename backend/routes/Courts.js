import express from "express";
import { createCourtController } from "../controllers/CourtsController.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("In the Courts route base");
});

router.post("/create-court",createCourtController);

export default router;
