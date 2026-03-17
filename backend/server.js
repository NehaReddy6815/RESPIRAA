require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected 🚀"))
  .catch(err => console.log(err));

app.use(cors());
app.use(express.json());

const dataRoutes = require("./routes/dataRoutes");
app.use("/", dataRoutes);
const analyzeRoutes = require("./routes/analyzeRoutes");


app.use("/analyze", analyzeRoutes);

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
console.log("ENV TEST:", process.env.WEATHER_API_KEY);
