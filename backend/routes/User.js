import express from "express";
import {
  addTenantController,
  authorizeCheck,
  getBrandNamesController,
} from "../controllers/UserController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("In the user route base");
});

router.post("/authorize-check", authorizeCheck);
router.get("/brand-names", getBrandNamesController);
router.post("/tenant/add", addTenantController);
export default router;
