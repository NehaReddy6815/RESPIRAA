const express = require("express");
const cors = require("cors");

const app = express();

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