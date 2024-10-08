import express from "express";
import {
  authorizeCheck,
  getBrandNamesController,
} from "../controllers/UserController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("In the user route base");
});

router.post("/authorize-check", authorizeCheck);
router.get("/brand-names", getBrandNamesController);
export default router;
