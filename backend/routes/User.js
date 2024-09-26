import express from "express";
import { authorizeCheck } from "../controllers/UserController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("In the user route base");
});

router.post("/authorize-check", authorizeCheck);

export default router;
