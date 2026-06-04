import axios from "axios";
import { useState } from "react";
import StarRating from "../components/StarRating";

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/feedback",
      formData
    );

    alert("Feedback Submitted Successfully");

    console.log(response.data);
    } catch (error) {
    console.error(error);
    alert("Error submitting feedback");
    }
  };

  return (
    <div className="container">
      <div className="feedback-card">
        <h1>NexTribe Labs Feedback</h1>
        <h2>Help us improve our Platform</h2>

        <input
          type="text"
          name="customerName"
          placeholder="Full Name"
          value={formData.customerName}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="organization"
          placeholder="Organization"
          value={formData.organization}
          onChange={handleChange}
        />

        <input
          type="text"
          name="role"
          placeholder="Role"
          value={formData.role}
          onChange={handleChange}
        />

        <label>Platform Usability</label>

        <StarRating
          rating={formData.usabilityRating}
          setRating={(value) =>
          setFormData({
          ...formData,
          usabilityRating: value,
          })
        }
        />

        <p>{formData.usabilityRating} / 5</p>

        <label>Protein Analysis Experience</label>
        <StarRating
          rating={formData.proteinAnalysisRating}
          setRating={(value) =>
            setFormData({
              ...formData,
              proteinAnalysisRating: value,
            })
          }
        />

        <p>{formData.proteinAnalysisRating} / 5</p>

        <label>Molecule Discovery Quality</label>

        <StarRating
          rating={formData.moleculeDiscoveryRating}
          setRating={(value) =>
            setFormData({
              ...formData,
              moleculeDiscoveryRating: value,
            })
          }
        />

        <p>{formData.moleculeDiscoveryRating} / 5</p>

        <label>Would You Recommend BioNex?</label>

        <StarRating
          rating={formData.recommendationRating}
          setRating={(value) =>
            setFormData({
              ...formData,
              recommendationRating: value,
            })
          }
        />

        <p>{formData.recommendationRating} / 5</p>

        <textarea
          name="strengths"
          placeholder="What did you like?"
          value={formData.strengths}
          onChange={handleChange}
        />

        <textarea
          name="improvements"
          placeholder="What can be improved?"
          value={formData.improvements}
          onChange={handleChange}
        />

        <textarea
          name="additionalComments"
          placeholder="Additional Comments"
          value={formData.additionalComments}
          onChange={handleChange}
        />

        <button onClick={handleSubmit}>
        Submit Feedback
        </button>  
      </div>
    </div>
  );
}

export default CustomerFeedback;