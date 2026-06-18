const express = require("express");
const router = express.Router();
const SibApiV3Sdk = require("sib-api-v3-sdk");  //importing the  brevo library
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications["api-key"];

apiKey.apiKey = process.env.BREVO_API_KEY;

const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

const otpStore = {};

//to send OTP 
router.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email required",
      });
    }

    const otp =
      Math.floor(
        100000 + Math.random() * 900000
      ).toString();

    otpStore[email] = otp;

    await emailApi.sendTransacEmail({
    sender: {
        email: process.env.SENDER_EMAIL,
        name: process.env.SENDER_NAME,
    },

    to: [
        {
        email: email,
        },
    ],

    subject: "Your NexTribe Verification Code",

    htmlContent: `
        <h2>Email Verification</h2>

        <p>Your OTP is:</p>

        <h1>${otp}</h1>

        <p>Please use this code to verify your email.</p>
    `,
    });

    res.json({
    message: "OTP sent successfully",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});


//to verify the OTP
router.post("/verify-otp", (req, res) => {

  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({
      message: "Email and OTP required",
    });
  }

  if (otpStore[email] === otp) {

    delete otpStore[email];

    return res.json({
      verified: true,
      message: "OTP verified successfully",
    });
  }

  return res.status(400).json({
    verified: false,
    message: "Invalid OTP",
  });
});

module.exports = router;