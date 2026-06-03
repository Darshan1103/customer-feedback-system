const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema(
  {
    customerName: String,
    email: String,
    organization: String,
    role: String,
    usabilityRating: Number,
    uiRating: Number,
    recommendationRating: Number,
    strengths: String,
    improvements: String,
    additionalComments: String,
    adminReply: {
        type: String,
        default: ""
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("feedback", FeedbackSchema);