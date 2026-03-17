const express = require("express");
const router = express.Router();

const { loadDataset, analyzeData } = require("../controllers/dataController");

// GET → streaming dataset
router.get("/dataset", loadDataset);

// POST → AI analysis
router.post("/analyze", analyzeData);

module.exports = router;