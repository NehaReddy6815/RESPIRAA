const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema({
  AQI: Number,
  PM25: Number,
  PM10: Number,
  score: Number,
  risk: String,
  insight: String,
  advice: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Analysis", analysisSchema);