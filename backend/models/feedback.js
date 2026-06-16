const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema(
  {
    customerName: String,
    email: String,
    organization: String,
    role: String,
    scientificDomain: String,
    otherScientificDomain: String,

    organizationType: String,
    otherOrganizationType: String,

    teamSize: String,
    countryRegion: String,
    otherCountry: String,
    
    usabilityRating: Number,
    proteinAnalysisRating: Number,
    moleculeDiscoveryRating: Number,
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