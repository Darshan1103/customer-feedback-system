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
    overallExperienceReason: String,
    platformUsability: String,
    platformUsabilityReason: String,
    aiMoleculeGeneration: String,
    aiMoleculeGenerationReason: String,
    proteinAnalysis: String,
    proteinAnalysisReason: String,
    speedPerformance: String,
    speedPerformanceReason: String,
    accuracyReliability: String,
    accuracyReliabilityReason: String,
    dataVisualization: String,
    dataVisualizationReason: String,
    recommendation: String,
    recommendationReason: String,

    continueSection2: String,

    primaryUseCase: String,
    otherPrimaryUseCase: String,
    platformUsageFrequency: String,
    mostUsedFeature: String,
    toolComparison: String,
    aiSuggestionQuality: String,

    valuableThing: String,
    surprisedMoment: String,
    wishFeature: String,
    inaccurateResult: String,
    heardAboutBioNex: String,

    adminReply: {
        type: String,
        default: ""
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("feedback", FeedbackSchema);