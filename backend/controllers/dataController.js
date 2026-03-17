const { getMappedData } = require("../services/datasetService");
const { analyzeData } = require("../services/aiService");

// 🔥 STREAMING DATA API
exports.loadDataset = async (req, res) => {
  try {
    const data = await getMappedData();
    res.json(data); // ✅ SINGLE OBJECT
  } catch (error) {
    res.status(500).json({ error: "Failed to load dataset" });
  }
};

// 🔥 AI ANALYSIS API (ML BASED)
exports.analyzeData = async (req, res) => {
  try {
    const input = req.body;

    const result = await analyzeData(input); // ✅ FIXED

    res.json({
      ...result,
    });
  } catch (error) {
    console.error("AI Error:", error.message);
    res.status(500).json({ error: "Analysis failed" });
  }
};