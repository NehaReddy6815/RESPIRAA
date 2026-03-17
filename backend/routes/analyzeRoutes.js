const express = require("express");
const router = express.Router();
const { analyzeData } = require("../services/aiService");

// 🔥 POST route (main AI)
router.post("/", async (req, res) => {
  try {
    const result = await analyzeData(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Analysis failed" });
  }
});

// 🔥 TEST route (for browser)
router.get("/test", async (req, res) => {
  const sampleData = {
    AQI: 85,
    "PM2.5": 45,
    PM10: 80
  };

  const result = await analyzeData(sampleData);
  res.json(result);
});

module.exports = router;