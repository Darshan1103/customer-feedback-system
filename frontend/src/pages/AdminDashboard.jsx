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

        fetchFeedbacks();
    } catch (error) {
        console.error(error);
    }
  };

  return (
    <div className="admin-container">
      <h1 className="dashboard-title">
        Admin Dashboard
      </h1>
      <div className="stats-container">
        <div className="stat-card">
          <h3>{totalFeedbacks}</h3>
          <p>Total Feedbacks</p>
        </div>

        <div className="stat-card">
          <h3>{repliedFeedbacks}</h3>
          <p>Replied</p>
        </div>

        <div className="stat-card">
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

      {filteredFeedbacks.map((feedback) => (
      <div
        key={feedback._id}
        className="feedback-card"
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