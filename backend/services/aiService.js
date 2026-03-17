const axios = require("axios");
require("dotenv").config();
const OpenAI = require("openai");
const Analysis = require("../models/Analysis");

// 🔥 GROQ CLIENT
const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const analyzeData = async (data) => {
  try {
    // 🔥 STEP 1: CALL ML / FASTAPI
    const response = await axios.post(
      "http://127.0.0.1:8000/predict",
      {
        AQI: data.AQI,
        "PM2.5": data["PM2.5"],
        PM10: data.PM10
      }
    );

    const { score, risk } = response.data;

    let insight = "";
    let advice = [];

    try {
      // 🔥 STRONG PROMPT (NO MARKDOWN ISSUES)
      const prompt = `
You are an environmental health assistant.

AQI: ${data.AQI}
PM2.5: ${data["PM2.5"]}
PM10: ${data.PM10}
Risk Level: ${risk}

Respond EXACTLY in this format:

Explanation: <1 short human-friendly sentence about today's air>

Recommendations:
- <practical daily-life tip>
- <health-related precaution>
- <indoor/outdoor behavior advice>

Rules:
- No bold (**)
- No headings
- Keep it natural, like speaking to a person
`;
      // 🔥 GROQ CALL
      const llmResponse = await client.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: prompt }],
      });

      const text = llmResponse.choices[0].message.content;

      console.log("LLM RAW:", text); // ✅ debug

      // 🔥 CLEAN TEXT
      const cleanText = text
        .replace(/\*\*/g, "")
        .replace(/__/g, "")
        .trim();

      const lines = cleanText
        .split("\n")
        .map(l => l.trim())
        .filter(Boolean);

      let explanation = "";
      let tips = [];

      // 🔍 FIND EXPLANATION
      const expLine = lines.find(l =>
        l.toLowerCase().startsWith("explanation")
      );

      if (expLine) {
        explanation = expLine.replace(/Explanation:\s*/i, "");
      }

      // 🔍 FIND TIPS
      tips = lines
        .filter(l => l.startsWith("-"))
        .map(l => l.replace("- ", "").trim());

      insight = explanation || "Air quality conditions analyzed.";
      advice = tips.length ? tips : ["No recommendations available"];

    } catch (llmError) {
      console.error("Groq Error:", llmError.message);

      // 🔥 FALLBACK (ALWAYS WORKS)
      insight = `Air quality is ${risk.toLowerCase()} with AQI ${score}.`;

      if (risk === "HIGH" || risk === "VERY HIGH") {
        advice = [
          "Avoid outdoor activities",
          "Wear an N95 mask",
          "Use an air purifier indoors"
        ];
      } else if (risk === "MODERATE") {
        advice = [
          "Limit prolonged outdoor exposure",
          "Wear a mask in polluted areas",
          "Keep windows closed during peak hours"
        ];
      } else {
        advice = [
          "Air quality is safe",
          "No major precautions needed",
          "Enjoy outdoor activities"
        ];
      }
    }
 // ✅ SAFE INSERT (PUT HERE)
try {
  await Analysis.create({
    AQI: data.AQI,
    PM25: data["PM2.5"],
    PM10: data.PM10,
    score,
    risk,
    insight,
    advice
  });
} catch (dbError) {
  console.error("DB Save Error:", dbError.message);
}

// 🔥 return stays same
return {
  score,
  risk,
  insight,
  advice
};

  } catch (error) {
    console.error("ML API error:", error.message);

    return {
      score: 0,
      risk: "UNKNOWN",
      insight: "AI service unavailable",
      advice: ["System error", "Try again later", "Check backend"]
    };
  }
};

module.exports = { analyzeData };