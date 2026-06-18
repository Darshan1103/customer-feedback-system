const express = require("express");
const router = express.Router();

const otpStore = {};

router.post("/send-otp", async (req, res) => {
  res.json({
    message: "Route working"
  });
});

module.exports = router;