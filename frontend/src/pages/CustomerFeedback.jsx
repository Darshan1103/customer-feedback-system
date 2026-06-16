import axios from "axios";
import { useState } from "react";
import StarRating from "../components/StarRating";
import "../styles/Main.css";

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

    usabilityRating: 5,
    proteinAnalysisRating: 5,
    moleculeDiscoveryRating: 5,
    recommendationRating: 5,
    strengths: "",
    improvements: "",
    additionalComments: "",
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
        usabilityRating: 0,
        proteinAnalysisRating: 0,
        moleculeDiscoveryRating: 0,
        recommendationRating: 0,    
        strengths: "",
        improvements: "",
        additionalComments: "",
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

        <div className="rating-row">
          <span className="rating-title">
            Platform Usability
          </span>

          <StarRating
            rating={formData.usabilityRating}
            setRating={(value) =>
              setFormData({
                ...formData,
                usabilityRating: value,
              })
            }
          />
        </div>

        <div className="rating-row">
          <span className="rating-title">
            Protein Analysis Experience
          </span>

          <StarRating
            rating={formData.proteinAnalysisRating}
            setRating={(value) =>
              setFormData({
                ...formData,
                proteinAnalysisRating: value,
              })
            }
          />
        </div>

        <div className="rating-row">
          <span className="rating-title">
            Molecule Discovery Quality
          </span>

          <StarRating
            rating={formData.moleculeDiscoveryRating}
            setRating={(value) =>
              setFormData({
                ...formData,
                moleculeDiscoveryRating: value,
              })
            }
          />
        </div>

        <div className="rating-row">
          <span className="rating-title">
            Would You Recommend NexTribe?
          </span>

          <StarRating
            rating={formData.recommendationRating}
            setRating={(value) =>
              setFormData({
                ...formData,
                recommendationRating: value,
              })
            }
          />
        </div>

        <div className="section-divider"></div>

        <label>Strengths</label>
        <textarea
          name="strengths"
          placeholder="Share what you like about our platform?"
          value={formData.strengths}
          onChange={handleChange}
        />

        <label>Improvements</label>
        <textarea
          name="improvements"
          placeholder="Share your suggestions for improvement?"
          value={formData.improvements}
          onChange={handleChange}
        />
        <label>Additional Comments</label>
        <textarea
          name="additionalComments"
          placeholder="Any other feedback you would like to share?"
          value={formData.additionalComments}
          onChange={handleChange}
        />

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