import axios from "axios";
import { useState } from "react";
import "../styles/Main.css";

const ratingOptions = [
  "Very Poor",
  "Poor",
  "Average",
  "Good",
  "Excellent",
];

function CustomerFeedback() {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    organization: "",
    role: "",
    scientificDomain: "",
    otherScientificDomain: "",
    organizationType: "",
    otherOrganizationType: "",

    teamSize: "",
    countryRegion: "",
    otherCountry: "",
    
    overallExperience: "",
    platformUsability: "",
    aiMoleculeGeneration: "",
    proteinAnalysis: "",
    speedPerformance: "",
    accuracyReliability: "",
    dataVisualization: "",
    recommendation: "",
    overallExperienceReason: "",
    platformUsabilityReason: "",
    aiMoleculeGenerationReason: "",
    proteinAnalysisReason: "",
    speedPerformanceReason: "",
    accuracyReliabilityReason: "",
    dataVisualizationReason: "",
    recommendationReason: "",

    continueSection2: "",

    // Additional Questions (drop-downs) 
    primaryUseCase: "",
    otherPrimaryUseCase: "",
    platformUsageFrequency: "",
    mostUsedFeature: "",
    toolComparison: "",
    aiSuggestionQuality: "",

    // Optional Additional questions (text areas)
    valuableThing: "",
    surprisedMoment: "",
    wishFeature: "",
    inaccurateResult: "",
    heardAboutBioNex: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  const [sendingOtp, setSendingOtp] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEmailChange = (e) => {
    setFormData({
      ...formData,
      email: e.target.value,
    });

    setOtp("");
    setOtpSent(false);
    setEmailVerified(false);
  };

  const showReasonField = (rating) => {
    return rating === "Very Poor" || rating === "Poor";
  };

  const showModal = (message, type = "info") => {
    setModalMessage(message);
    setModalType(type);
    setModalOpen(true);
  };


// Function to send OTP 
  const sendOtp = async () => {

    if (sendingOtp) return;
    setSendingOtp(true);

    try {

      if (!formData.email.trim()) {
        showModal("Enter email first","error");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/email/send-otp",
        {
          email: formData.email,
        }
      );

      showModal(response.data.message,"success");

      setOtpSent(true);

    } catch (error) {

      console.error(error);

      showModal("Failed to send OTP","error");
    }finally {
      setSendingOtp(false);
    }
  };


// Function to verify OTP
  const verifyOtp = async () => {

    if (!otp.trim()) {
      showModal("Please enter OTP first", "error");
      return;
    }

    try {

      const response = await axios.post(
        "http://localhost:5000/api/email/verify-otp",
        {
          email: formData.email,
          otp,
        }
      );

      if (response.data.verified) {
        setEmailVerified(true);
      }

    } catch (error) {
      showModal("Invalid OTP","error");
    }
  };

  const handleSubmit = async () => {
    
    setSuccessMessage("");

    if (!emailVerified) {
      showModal("Please verify your email first","error");
      return;
    }
    
    if (
      !formData.customerName.trim() ||
      !formData.email.trim() ||
      !formData.organization.trim() ||
      !formData.role.trim() ||
      !formData.scientificDomain.trim() ||
      !formData.organizationType.trim() ||
      !formData.teamSize.trim() ||
      !formData.countryRegion.trim()||
      !formData.overallExperience.trim() ||
      !formData.platformUsability.trim() ||
      !formData.aiMoleculeGeneration.trim() ||
      !formData.proteinAnalysis.trim() ||
      !formData.speedPerformance.trim() ||
      !formData.accuracyReliability.trim() ||
      !formData.dataVisualization.trim() ||
      !formData.recommendation.trim() ||
      !formData.continueSection2.trim() ||

      (formData.scientificDomain === "Other" && !formData.otherScientificDomain.trim()) ||

      (formData.organizationType === "Other" && !formData.otherOrganizationType.trim()) ||

      (formData.countryRegion === "Other" && !formData.otherCountry.trim()) ||

      (formData.continueSection2 === "Yes" && !formData.primaryUseCase.trim()) ||

      (formData.continueSection2 === "Yes" && 
        formData.primaryUseCase === "Other" && 
        !formData.otherPrimaryUseCase.trim()
      ) ||

      (formData.continueSection2 === "Yes" &&
        (!formData.platformUsageFrequency.trim() || !formData.mostUsedFeature.trim() ||
          !formData.toolComparison.trim() || !formData.aiSuggestionQuality.trim()
        )
      )      
    ) 
    {
      showModal("Please fill all the required fields","error");
      return;
    }

    if (
      (showReasonField(formData.overallExperience) && !formData.overallExperienceReason.trim()) ||

      (showReasonField(formData.platformUsability) && !formData.platformUsabilityReason.trim()) ||

      (showReasonField(formData.aiMoleculeGeneration) && !formData.aiMoleculeGenerationReason.trim()) ||

      (showReasonField(formData.proteinAnalysis) && !formData.proteinAnalysisReason.trim()) ||

      (showReasonField(formData.speedPerformance) && !formData.speedPerformanceReason.trim()) ||

      (showReasonField(formData.accuracyReliability) && !formData.accuracyReliabilityReason.trim()) ||

      (showReasonField(formData.dataVisualization) && !formData.dataVisualizationReason.trim()) ||

      (showReasonField(formData.recommendation) && !formData.recommendationReason.trim())
    ) {
      showModal("Please explain the reson behind Poor/Very Poor rating","error");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/feedback",
        formData
      );

      setSuccessMessage(
        "✓ Feedback submitted successfully"
      );

      setFormData({
        customerName: "",
        email: "",
        organization: "",
        role: "",

        scientificDomain: "",
        otherScientificDomain: "",
        organizationType: "",
        otherOrganizationType: "",
        teamSize: "",
        countryRegion: "",
        otherCountry: "",

        overallExperience: "",
        platformUsability: "",
        aiMoleculeGeneration: "",
        proteinAnalysis: "",
        speedPerformance: "",
        accuracyReliability: "",
        dataVisualization: "",
        recommendation: "",

        overallExperienceReason: "",
        platformUsabilityReason: "",
        aiMoleculeGenerationReason: "",
        proteinAnalysisReason: "",
        speedPerformanceReason: "",
        accuracyReliabilityReason: "",
        dataVisualizationReason: "",
        recommendationReason: "",

        continueSection2: "",

        primaryUseCase: "",
        otherPrimaryUseCase: "",
        platformUsageFrequency: "",
        mostUsedFeature: "",
        toolComparison: "",
        aiSuggestionQuality: "",

        valuableThing: "",
        surprisedMoment: "",
        wishFeature: "",
        inaccurateResult: "",
        heardAboutBioNex: "",
      });

      setOtp("");
      setOtpSent(false);
      setEmailVerified(false);

      console.log(response.data);
    } 
    catch (error) {
      console.error(error);
      showModal("Error submitting feedback","error");
      }
  };

  return (
    <div className="container">
      <div className="feedback-card">
        <h1 className="feedback-title">
          NexTribe Labs Feedback
        </h1>

        <p className="feedback-subtitle">
          Help us improve our AI Drug Discovery Platform
        </p>

        <label className="field-label">
          Full Name *
        </label>

        <input
          type="text"
          name="customerName"
          placeholder="Enter your full name"
          required
          value={formData.customerName}
          onChange={handleChange}
        />

        <label className="field-label">
          Email *
        </label>

        <input
          type="email"
          disabled={emailVerified}
          name="email"
          placeholder="Enter your email"
          required
          value={formData.email}
          onChange={handleEmailChange}
        />

        {!otpSent && (
          <button
            type="button"
            className="otp-btn"
            onClick={sendOtp}
            disabled={sendingOtp}
          >
            {sendingOtp ? "Sending..." : "Send OTP"}
          </button>
        )} 

        {otpSent && !emailVerified && (
          <>
            <input
              type="text"
              className="otp-input"
              placeholder="Enter OTP"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            />
            <div className="otp-actions">
            <button
              type="button"
              className="otp-btn"
              onClick={verifyOtp}
            >
              Verify OTP
            </button>

            <button
              type="button"
              className="otp-btn"
              onClick={sendOtp}
              disabled={sendingOtp}
            >
              {sendingOtp ? "Sending..." : "Resend OTP"}
            </button>
            </div>
          </>
        )}

        {emailVerified && (
          <div className="email-verified">
            ✓ Email Verified
          </div>
        )}

        <label className="field-label">
          Organization *
        </label>

        <input
          type="text"
          name="organization"
          placeholder="Enter your organization name"
          required
          value={formData.organization}
          onChange={handleChange}
        />

        <label className="field-label">
          Role *
        </label>

        <input
          type="text"
          name="role"
          placeholder="Enter your role"
          required
          value={formData.role}
          onChange={handleChange}
        />

        <label className="field-label">
          Scientific Domain *
        </label>

        <select
          name="scientificDomain"
          value={formData.scientificDomain}
          onChange={handleChange}
        >
          <option value="">Select Domain</option>
          <option value="Oncology">Oncology</option>
          <option value="Neurology">Neurology</option>
          <option value="Infectious Disease">
            Infectious Disease
          </option>
          <option value="Materials Science">
            Materials Science
          </option>
          <option value="Other">Other</option>
        </select>

        {formData.scientificDomain === "Other" && (
          <input
            type="text"
            name="otherScientificDomain"
            placeholder="Please specify"
            value={formData.otherScientificDomain}
            onChange={handleChange}
          />
        )}

        <label className="field-label">
          Organization Type *
        </label>

        <select
          name="organizationType"
          value={formData.organizationType}
          onChange={handleChange}
        >
          <option value="">Select Type</option>
          <option value="Pharma">Pharma</option>
          <option value="Biotech">Biotech</option>
          <option value="Academic">Academic</option>
          <option value="CRO">CRO</option>
          <option value="Government">Government</option>
          <option value="Startup">Startup</option>
          <option value="Other">Other</option>
        </select>

        {formData.organizationType === "Other" && (
          <input
            type="text"
            name="otherOrganizationType"
            placeholder="Please specify"
            value={formData.otherOrganizationType}
            onChange={handleChange}
          />
        )}

        <label className="field-label">
          Team Size *
        </label>

        <select
          name="teamSize"
          value={formData.teamSize}
          onChange={handleChange}
        >
          <option value="">Select Team Size</option>
          <option value="Solo">Solo</option>
          <option value="2-10">2-10</option>
          <option value="11-50">11-50</option>
          <option value="50+">50+</option>
        </select>

        <label className="field-label">
          Country / Region *
        </label>

        <select
          name="countryRegion"
          value={formData.countryRegion}
          onChange={handleChange}
        >
          <option value="">
            Select Country / Region
          </option>

          <option value="India">India</option>
          <option value="United States">United States</option>
          <option value="United Kingdom">United Kingdom</option>
          <option value="Germany">Germany</option>
          <option value="France">France</option>
          <option value="Canada">Canada</option>
          <option value="Australia">Australia</option>
          <option value="Japan">Japan</option>
          <option value="Singapore">Singapore</option>
          <option value="China">China</option>
          <option value="South Korea">South Korea</option>
          <option value="Other">Other</option>
        </select>

        {formData.countryRegion === "Other" && (
          <input
            type="text"
            name="otherCountry"
            placeholder="Please specify country"
            value={formData.otherCountry}
            onChange={handleChange}
          />
        )}

        <div className="section-divider"></div>

        <label className="field-label">
          Overall Platform Experience *
        </label>

        <div className="rating-options">
          {ratingOptions.map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="overallExperience"
                value={option}
                checked={
                  formData.overallExperience === option
                }
                onChange={handleChange}
              />
              {option}
            </label>
          ))}
        </div>

        {showReasonField(formData.overallExperience) && (
          <textarea
            name="overallExperienceReason"
            placeholder="Please tell us why..."
            value={formData.overallExperienceReason}
            onChange={handleChange}
          />
        )}

        <label className="field-label">
          Platform Usability & Navigation *
        </label>

        <div className="rating-options">
          {ratingOptions.map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="platformUsability"
                value={option}
                checked={
                  formData.platformUsability === option
                }
                onChange={handleChange}
              />
              {option}
            </label>
          ))}
        </div>

        {showReasonField(formData.platformUsability) && (
          <textarea
            name="platformUsabilityReason"
            placeholder="Please tell us why..."
            value={formData.platformUsabilityReason}
            onChange={handleChange}
          />
        )}

        <label className="field-label">
          AI Molecule Generation Quality *
        </label>

        <div className="rating-options">
          {ratingOptions.map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="aiMoleculeGeneration"
                value={option}
                checked={
                  formData.aiMoleculeGeneration === option
                }
                onChange={handleChange}
              />
              {option}
            </label>
          ))}
        </div>

        {showReasonField(formData.aiMoleculeGeneration) && (
          <textarea
            name="aiMoleculeGenerationReason"
            placeholder="Please tell us why..."
            value={formData.aiMoleculeGenerationReason}
            onChange={handleChange}
          />
        )}

        <label className="field-label">
          Protein Analysis & Insights *
        </label>

        <div className="rating-options">
          {ratingOptions.map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="proteinAnalysis"
                value={option}
                checked={
                  formData.proteinAnalysis === option
                }
                onChange={handleChange}
              />
              {option}
            </label>
          ))}
        </div>
          
        {showReasonField(formData.proteinAnalysis) && (
          <textarea
            name="proteinAnalysisReason"
            placeholder="Please tell us why..."
            value={formData.proteinAnalysisReason}
            onChange={handleChange}
          />
        )}

        <label className="field-label">
          Speed & Performance *
        </label>

        <div className="rating-options">
          {ratingOptions.map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="speedPerformance"
                value={option}
                checked={
                  formData.speedPerformance === option
                }
                onChange={handleChange}
              />
              {option}
            </label>
          ))}
        </div>

        {showReasonField(formData.speedPerformance) && (
          <textarea
            name="speedPerformanceReason"
            placeholder="Please tell us why..."
            value={formData.speedPerformanceReason}
            onChange={handleChange}
          />
        )}

        <label className="field-label">
          Result Accuracy & Reliability *
        </label>

        <div className="rating-options">
          {ratingOptions.map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="accuracyReliability"
                value={option}
                checked={
                  formData.accuracyReliability === option
                }
                onChange={handleChange}
              />
              {option}
            </label>
          ))}
        </div>

        {showReasonField(formData.accuracyReliability) && (
          <textarea
            name="accuracyReliabilityReason"  
            placeholder="Please tell us why..."
            value={formData.accuracyReliabilityReason}
            onChange={handleChange}
          />
        )}

        <label className="field-label">
          Data Visualization & Reports *
        </label>

        <div className="rating-options">
          {ratingOptions.map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="dataVisualization"
                value={option}
                checked={
                  formData.dataVisualization === option
                }
                onChange={handleChange}
              />
              {option}
            </label>
          ))}
        </div>

        {showReasonField(formData.dataVisualization) && (
          <textarea
            name="dataVisualizationReason"
            placeholder="Please tell us why..."
            value={formData.dataVisualizationReason}
            onChange={handleChange}
          />
        )}

        <label className="field-label">
          Would You Recommend NexTribe? *
        </label>

        <div className="rating-options">
          {ratingOptions.map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="recommendation"
                value={option}
                checked={
                  formData.recommendation === option
                }
                onChange={handleChange}
              />
              {option}
            </label>
          ))}
        </div>

        {showReasonField(formData.recommendation) && (
          <textarea
            name="recommendationReason" 
            placeholder="Please tell us why..."
            value={formData.recommendationReason}
            onChange={handleChange}
          />
        )}


        <div className="section-divider"></div>

        <label className="field-label">
          Do you have a minute to answer a few more questions?
        </label>

        <div className="rating-options">
          <label>
            <input
              type="radio"
              name="continueSection2"
              value="Yes"
              checked={formData.continueSection2 === "Yes"}
              onChange={handleChange}
            />
            Yes
          </label>

          <label>
            <input
              type="radio"
              name="continueSection2"
              value="Maybe Next Time"
              checked={formData.continueSection2 === "Maybe Next Time"}
              onChange={handleChange}
            />
            Maybe Next Time
          </label>
        </div>

        {formData.continueSection2 === "Yes" && (         // Section 2 questions (Drop-downs))
          <>
            <div className="section-divider"></div>

            <h3 className="section-title">
              Section 2
            </h3>

            <label className="field-label">
              What is your primary use case on BioNex? *
            </label>

            <select
              name="primaryUseCase"
              value={formData.primaryUseCase}
              onChange={handleChange}
            >
              <option value="">Select Use Case</option>

              <option value="Drug Target Identification">
                Drug Target Identification
              </option>

              <option value="Lead Compound Optimization">
                Lead Compound Optimization
              </option>

              <option value="Protein–Ligand Binding Analysis">
                Protein–Ligand Binding Analysis
              </option>

              <option value="De Novo Molecule Generation">
                De Novo Molecule Generation
              </option>

              <option value="Academic / Research Exploration">
                Academic / Research Exploration
              </option>

              <option value="Other">
                Other
              </option>
            </select>

            {formData.primaryUseCase === "Other" && (
              <textarea
                name="otherPrimaryUseCase"
                placeholder="Please specify your primary use case"
                value={formData.otherPrimaryUseCase}
                onChange={handleChange}
              />
            )}

            <label className="field-label">
              How often do you use the platform? *
            </label>

            <select
              name="platformUsageFrequency"
              value={formData.platformUsageFrequency}
              onChange={handleChange}
            >
              <option value="">Select Frequency</option>

              <option value="Daily">Daily</option>

              <option value="A few times a week">
                A few times a week
              </option>

              <option value="Weekly">Weekly</option>

              <option value="Monthly">Monthly</option>

              <option value="First time / Trial">
                First time / Trial
              </option>
            </select>

            <label className="field-label">
              Which feature do you use most? *
            </label>

            <select
              name="mostUsedFeature"
              value={formData.mostUsedFeature}
              onChange={handleChange}
            >
              <option value="">Select Feature</option>

              <option value="Molecule Discovery Engine">
                Molecule Discovery Engine
              </option>

              <option value="Protein Structure Analysis">
                Protein Structure Analysis
              </option>

              <option value="AI Suggestions / Generative AI">
                AI Suggestions / Generative AI
              </option>

              <option value="Data Export / Reports">
                Data Export / Reports
              </option>

              <option value="Collaboration / Team features">
                Collaboration / Team features
              </option>
            </select>

            <label className="field-label">
              How does BioNex compare to your previous tools or workflows? *
            </label>

            <select
              name="toolComparison"
              value={formData.toolComparison}
              onChange={handleChange}
            >
              <option value="">Select Option</option>

              <option value="Much Better">
                Much Better
              </option>

              <option value="Somewhat Better">
                Somewhat Better
              </option>

              <option value="About the Same">
                About the Same
              </option>

              <option value="Somewhat Worse">
                Somewhat Worse
              </option>

              <option value="Much Worse / First tool I've used">
                Much Worse / First tool I've used
              </option>
            </select>

            <label className="field-label">
              How would you describe the AI-generated molecule suggestions? *
            </label>

            <select
              name="aiSuggestionQuality"
              value={formData.aiSuggestionQuality}
              onChange={handleChange}
            >
              <option value="">Select Option</option>

              <option value="Highly relevant and novel">
                Highly relevant and novel
              </option>

              <option value="Relevant but expected">
                Relevant but expected
              </option>

              <option value="Hit or miss">
                Hit or miss
              </option>

              <option value="Mostly off-target">
                Mostly off-target
              </option>

              <option value="Haven't used this feature">
                Haven't used this feature
              </option>
            </select>

          <div className="section-divider"></div>

          <label className="field-label">
            What is the single most valuable thing BioNex has done for your research?
          </label>

          <textarea
            name="valuableThing"
            value={formData.valuableThing}
            onChange={handleChange}
            placeholder="Your answer"
          />

          <label className="field-label">
            Describe a moment where the AI results surprised or impressed you.
          </label>

          <textarea
            name="surprisedMoment"
            value={formData.surprisedMoment}
            onChange={handleChange}
            placeholder="Your answer"
          />

          <label className="field-label">
            What is the #1 feature you wish BioNex had?
          </label>

          <textarea
            name="wishFeature"
            value={formData.wishFeature}
            onChange={handleChange}
            placeholder="Your answer"
          />

          <label className="field-label">
            Was there any result or output that felt inaccurate or misleading?
          </label>

          <textarea
            name="inaccurateResult"
            value={formData.inaccurateResult}
            onChange={handleChange}
            placeholder="Your answer"
          />

          <label className="field-label">
            How did you hear about NexTribe / BioNex?
          </label>

          <textarea
            name="heardAboutBioNex"
            value={formData.heardAboutBioNex}
            onChange={handleChange}
            placeholder="Your answer"
          />

          </>
        )}

        {successMessage && (
          <div className="success-banner">
            {successMessage}
          </div>
        )}

        <button
          className="submit-btn"
          onClick={handleSubmit}
        >
          Submit Feedback
        </button>  
        
        <p
          style={{
            textAlign: "center",
            marginTop: "12px",
            fontSize: "14px",
          }}
        >
          <a
            href="/status"
            style={{
              color: "#3347c7",
              textDecoration: "none",
              fontWeight: "500",
            }}
          >
            Click to check your feedback status
          </a>
        </p>

        {modalOpen && (
          <div className="modal-overlay">
            <div className="custom-modal">

              <button
                className="modal-close"
                onClick={() => setModalOpen(false)}
              >
                ✕
              </button>

              <div className={`modal-message ${modalType}`}>
                {modalMessage}
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default CustomerFeedback;