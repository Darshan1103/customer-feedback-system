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
    
    overallExperience: String,
    platformUsability: String,
    aiMoleculeGeneration: String,
    proteinAnalysis: String,
    speedPerformance: String,
    accuracyReliability: String,
    dataVisualization: String,
    recommendation: String,

    adminReply: {
        type: String,
        default: ""
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("feedback", FeedbackSchema);