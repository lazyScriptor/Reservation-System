import express from "express";
import {
  addTenantController,
  authorizeCheck,
  checkRefreshToken,
  getBrandNamesController,
} from "../controllers/UserController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("In the user route base");
});

router.post("/authorize-check", authorizeCheck);
router.get("/authorize-check/access-token", checkRefreshToken);
router.get("/brand-names", getBrandNamesController);
router.post("/tenant/add", addTenantController);
export default router;
