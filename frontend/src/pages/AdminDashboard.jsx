import axios from 'axios';
import { useEffect, useState } from 'react';
    
function AdminDashboard() {
  const [feedbacks, setFeedbacks] = useState([]);


  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/feedback"
      );

      setFeedbacks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>

      {feedbacks.map((feedback) => (
        <div
          key={feedback._id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "15px",
            marginBottom: "15px",
          }}
        >
          <h3>{feedback.customerName}</h3>

          <p>Email: {feedback.email}</p>

          <p>Organization: {feedback.organization}</p>

          <p>Role: {feedback.role}</p>

          <p>Usability Rating: {feedback.usabilityRating}</p>

          <p>
            Protein Analysis Rating:
            {feedback.proteinAnalysisRating}
          </p>

          <p>
            Molecule Discovery Rating:
            {feedback.moleculeDiscoveryRating}
          </p>

          <p>
            Recommendation Rating:
            {feedback.recommendationRating}
          </p>

          <p>
            <strong>Strengths:</strong>
            {feedback.strengths}
          </p>

          <p>
            <strong>Improvements:</strong>
            {feedback.improvements}
          </p>

          <p>
            <strong>Comments:</strong>
            {feedback.additionalComments}
          </p>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;