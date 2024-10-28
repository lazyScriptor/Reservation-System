import express from "express";
import {
  addTenantController,
  authorizeCheck,
  getBrandNamesController,
  refreshToken,
  verifyJwt,
} from "../controllers/UserController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("In the user route base");
});

router.post("/authorize-check", authorizeCheck);

router.get("/brand-names", getBrandNamesController);
router.post("/tenant/add", addTenantController);
router.get("/isUserAuth", verifyJwt, (req, res) => {
  return res.json({ auth: true, message: "You have a valid token" });
});
router.get("/refresh-token", refreshToken);
export default router;
