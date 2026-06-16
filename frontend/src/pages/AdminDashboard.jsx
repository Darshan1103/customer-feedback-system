import axios from 'axios';
import { useEffect, useState } from 'react';
import "../styles/AdminDashboard.css";

function AdminDashboard() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [replyText, setReplyText] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const totalFeedbacks = feedbacks.length;

  const repliedFeedbacks = feedbacks.filter(
    (item) => item.adminReply && item.adminReply.trim() !== ""
  ).length;

  const pendingReplies = totalFeedbacks - repliedFeedbacks;
  
  const filteredFeedbacks = feedbacks.filter(
    (feedback) =>
      feedback.customerName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      feedback.email
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
  );
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

  const handleReplyChange = (id, value) => {
  setReplyText({
      ...replyText,
      [id]: value,
    });
  };

  const saveReply = async (id) => {
    try {
        await axios.put(
        `http://localhost:5000/api/feedback/${id}/reply`,
        {
            adminReply: replyText[id],
        }
        );

        alert("Reply Saved");

        await fetchFeedbacks();
    } catch (error) {
        console.error(error);
    }
  };

  return (
    <div className="admin-container">
      <h1 className="dashboard-title">
        Admin Dashboard
      </h1>
      <p className="dashboard-subtitle">
        Manage and respond to customer feedback
      </p>
      <div className="stats-container">
        <div className="stat-card">
          <h3>{totalFeedbacks}</h3>
          <p>Total Feedbacks</p>
        </div>

        <div className="stat-card replied-card">
          <h3>{repliedFeedbacks}</h3>
          <p>Replied</p>
        </div>

        <div className="stat-card pending-card">
          <h3>{pendingReplies}</h3>
          <p>Pending Replies</p>
        </div>
      </div>


      <input
        className="search-box"
        type="text"
        placeholder="Search by name or email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredFeedbacks.length === 0 && (
        <p
          style={{
            textAlign: "center",
            color: "#64748b",
          }}
        >
          No feedbacks found.
        </p>
      )}

      {filteredFeedbacks.map((feedback) => (
      <div
        key={feedback._id}
        className="feedback-card"
      > 

          <div
            className={
              feedback.adminReply
              ? "status replied"
              : "status pending"
            }
          >
            {feedback.adminReply
                ? "Replied"
                : "Pending Reply"}
         </div>


          <h3>{feedback.customerName}</h3>

          <p><strong>Email:</strong> {feedback.email}</p>

          <p><strong>Organization:</strong> {feedback.organization}</p>

          <p><strong>Role:</strong> {feedback.role}</p>

          <p><strong>Scientific Domain:</strong>{" "}{
            feedback.scientificDomain === "Other"
              ? feedback.otherScientificDomain
              : feedback.scientificDomain
          }
          </p>

          <p><strong>Organization Type:</strong>{" "}{
            feedback.organizationType === "Other"
              ? feedback.otherOrganizationType
              : feedback.organizationType
          }
          </p>

          <p><strong>Team Size:</strong>{" "}{feedback.teamSize}</p>

          <p><strong>Country / Region:</strong>{" "}{
            feedback.countryRegion === "Other"
              ? feedback.otherCountry
              : feedback.countryRegion
          }
          </p>

          <p><strong>Overall Experience:</strong>{" "}{feedback.overallExperience}</p>
          {feedback.overallExperienceReason && (
            <p>
              <strong>Reason:</strong>{" "}
              <span className="reason-text">
                {feedback.overallExperienceReason}
              </span>

            </p>
          )}

          <p><strong>Platform Usability:</strong>{" "}{feedback.platformUsability}</p>
          {feedback.platformUsabilityReason && (
            <p>
              <strong>Reason:</strong>{" "}
              <span className="reason-text">
                {feedback.platformUsabilityReason}
              </span>
            </p>
          )}

          <p><strong>AI Molecule Generation:</strong>{" "}{feedback.aiMoleculeGeneration}</p>
          {feedback.aiMoleculeGenerationReason && (
            <p>
              <strong>Reason:</strong>{" "}
              <span className="reason-text">
                {feedback.aiMoleculeGenerationReason}
              </span>
            </p>
          )}

          <p><strong>Protein Analysis:</strong>{" "}{feedback.proteinAnalysis}</p>  
          {feedback.proteinAnalysisReason && (
            <p>
              <strong>Reason:</strong>{" "}
              <span className="reason-text">
                {feedback.proteinAnalysisReason}
              </span>
            </p>
          )}

          <p><strong>Speed Performance:</strong>{" "}{feedback.speedPerformance}</p>
          {feedback.speedPerformanceReason && (
            <p>
              <strong>Reason:</strong>{" "}
              <span className="reason-text">
                {feedback.speedPerformanceReason}
              </span>
                
            </p>

          )}

          <p><strong>Accuracy & Reliability:</strong>{" "}{feedback.accuracyReliability}</p>
          {feedback.accuracyReliabilityReason && (
            <p>
              <strong>Reason:</strong>{" "}
              <span className="reason-text">
                {feedback.accuracyReliabilityReason}
              </span>
            </p>
          )}

          <p><strong>Data Visualization:</strong>{" "}{feedback.dataVisualization}</p>
          {feedback.dataVisualizationReason && (
            <p>
              <strong>Reason:</strong>{" "}
              <span className="reason-text">
                {feedback.dataVisualizationReason}
              </span>
            </p>
          )}

          <p><strong>Recommendation:</strong>{" "}{feedback.recommendation}</p>
          {feedback.recommendationReason && (
            <p>
              <strong>Reason:</strong>{" "}
              <span className="reason-text">
                {feedback.recommendationReason}
              </span>
            </p>
          )}

          <hr />

          <h4>Admin Reply</h4>

          <textarea
          rows="3"
          placeholder="Write a reply..."
          value={replyText[feedback._id] || ""}
          onChange={(e) =>
              handleReplyChange(
              feedback._id,
              e.target.value
              )
          }
          />

          <br />

          <button
          className="reply-btn"
          onClick={() =>
              saveReply(feedback._id)
          }
          >
          Save Reply
          </button>

          {feedback.adminReply && (
          <p>
              <strong>Saved Reply:</strong>
              {feedback.adminReply}
          </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;