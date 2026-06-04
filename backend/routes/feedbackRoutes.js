const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");

// Save feedback
router.post("/", async (req, res) => {
  try {
    const feedback = await Feedback.create(req.body);
    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all feedback
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({
      createdAt: -1,
    });

    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/email/:email", async (req, res) => {
  try {
    const feedbacks = await Feedback.find({
      email: req.params.email,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Update admin reply
router.put("/:id/reply", async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      {
        adminReply: req.body.adminReply,
      },
      { new: true }
    );

    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;