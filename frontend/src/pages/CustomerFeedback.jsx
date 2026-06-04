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
    if (
      !formData.customerName.trim() ||
      !formData.email.trim() ||
      !formData.organization.trim() ||
      !formData.role.trim()
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