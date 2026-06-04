import { useState } from "react";
import axios from "axios";

function FeedbackStatus() {
  const [email, setEmail] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const [searched, setSearched] = useState(false);

  const checkStatus = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/feedback/email/${email}`
      );

      setFeedbacks(response.data);
      setSearched(true);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="feedback-card">
        <h1 className="feedback-title">
            Customer Feedback Status
        </h1>

        <p className="feedback-subtitle">
            View responses from the NexTribe team
        </p>

        <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
            setEmail(e.target.value)
            }
        />

        <button
            className="submit-btn"
            onClick={checkStatus}
        >
            Check Status
        </button>   

        <div style={{ marginBottom: "25px" }} />

        {feedbacks.map((feedback) => (
            <div
              key={feedback._id}
              style={{
                background: "#ffffff",
                borderRadius: "12px",
                padding: "20px",
                marginTop: "20px",
                border: "1px solid #e5e7eb",
                textAlign: "left",
              }}
            >
            <h3>{feedback.customerName}</h3>

            <p>
            <strong>Status:</strong>{" "}
            <span
                style={{
                color: feedback.adminReply
                    ? "#16a34a"
                    : "#ca8a04",
                fontWeight: "600",
                }}
            >
                {feedback.adminReply
                ? "Replied"
                : "Pending"}
            </span>
            </p>

            {feedback.adminReply && (
                <div style={{ marginTop: "15px" }}>
                    <strong>Admin Reply:</strong>
                    <p>{feedback.adminReply}</p>
                </div>
            )}
            </div>
        ))}
        {searched && feedbacks.length === 0 && (
            <p
                style={{
                    marginTop: "20px",
                    color: "#64748b",
                }}
            >
                No feedback found for this email.
            </p>
        )}
      </div>
    </div>
  );
}

export default FeedbackStatus;