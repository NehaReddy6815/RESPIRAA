const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");

const filePath = path.join(__dirname, "../dataset/Bangalore_AQI_Dataset.csv");

// 🔥 GLOBAL STATE (important for streaming)
let cachedData = [];
let currentIndex = 0;

// Load dataset once
function loadDataOnce() {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        try {
          const pm25 = parseFloat(row["PM2.5"]) || 0;
          const pm10 = parseFloat(row["PM10"]) || 0;
          const aqi = parseFloat(row["AQI"]) || 0;
          const co = parseFloat(row["CO"]) || 0;
          const no2 = parseFloat(row["NO2"]) || 0;
          const so2 = parseFloat(row["SO2"]) || 0;
          const o3 = parseFloat(row["O3"]) || 0;

          results.push({
            pm25,
            pm10,
            aqi,
            gas: co,
            no2,
            so2,
            o3,
            temperature: null,
            humidity: null,
            motion: Math.random() > 0.5,
            vibration: Math.random() > 0.5,
          });
        } catch (err) {
          console.log("Error parsing row:", err);
        }
      })
      .on("end", () => resolve(results))
      .on("error", reject);
  });
}

// 🔥 MAIN STREAM FUNCTION
async function getMappedData() {
  if (cachedData.length === 0) {
    cachedData = await loadDataOnce();
  }

  const data = cachedData[currentIndex];

  currentIndex = (currentIndex + 1) % cachedData.length;

  return data; // ✅ SINGLE OBJECT
}

module.exports = { getMappedData };