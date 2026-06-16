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

  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    
    setSuccessMessage("");

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
      (
        formData.scientificDomain === "Other" &&
        !formData.otherScientificDomain.trim()
      )
      ||
      (
        formData.organizationType === "Other" &&
        !formData.otherOrganizationType.trim()
      )
      ||
      (
        formData.countryRegion === "Other" &&
        !formData.otherCountry.trim()
      )
      ||
      (
      formData.countryRegion === "Other" &&
      !formData.otherCountry.trim()
      )
    ) {
      alert(
        "Please fill all required fields."
      );
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
      });

      console.log(response.data);
      } catch (error) {
      console.error(error);
      alert("Error submitting feedback");
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
          name="email"
          placeholder="Enter your email"
          required
          value={formData.email}
          onChange={handleChange}
        />

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

      </div>
    </div>
  );
}

export default CustomerFeedback;