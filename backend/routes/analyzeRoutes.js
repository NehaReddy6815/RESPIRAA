const express = require("express");
const router = express.Router();
const Analysis = require("../models/Analysis");
const axios = require("axios");

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

// 🔥 GET ALL HISTORY (for Trends)
router.get("/history", async (req, res) => {
  try {
    const data = await Analysis.find().sort({ createdAt: 1 });
    res.json(data);
  } catch (err) {
    console.error("History Error:", err.message);
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

// 🌍 AQI ROUTE
router.get("/aqi", async (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;

  console.log("LAT:", lat, "LON:", lon); // 👈 DEBUG

  try {
    const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}`;

    console.log("URL:", url); // 👈 DEBUG

    const response = await axios.get(url);

    res.json(response.data);

  } catch (err) {
    console.error("ERROR:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch AQI" });
  }
});

module.exports = router;