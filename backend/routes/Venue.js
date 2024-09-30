import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("In the venue route base");
});

export default router;
