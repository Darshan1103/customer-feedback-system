const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const feedbackRoutes = require("./routes/feedbackRoutes");  
const emailRoutes = require("./routes/emailRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/feedback", feedbackRoutes);   
app.use("/api/email", emailRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Customer Feedback API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

