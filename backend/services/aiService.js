const axios = require("axios");
require("dotenv").config();
const OpenAI = require("openai");

// 🔥 GROQ CLIENT
const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const analyzeData = async (data) => {
  try {
    // 🔥 STEP 1: CALL ML MODEL
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
      const prompt = `
You are an environmental health assistant.

AQI: ${data.AQI}
PM2.5: ${data["PM2.5"]}
PM10: ${data.PM10}
Risk: ${risk}
Score: ${score}

Give:
1. Short explanation (1–2 lines)
2. 2 simple recommendations (bullet points)
`;

      // 🔥 GROQ LLM CALL
      const llmResponse = await client.chat.completions.create({
        model: "llama-3.1-8b-instant", // ✅ WORKING MODEL
        messages: [{ role: "user", content: prompt }],
      });

      const text = llmResponse.choices[0].message.content;

      // 🔥 CLEAN OUTPUT
      const lines = text.split("\n").filter(l => l.trim() !== "");

      insight = lines[0] || "No insight";

      advice = lines
        .slice(1, 3)
        .map(l => l.replace(/^[-•]\s*/, ""));

    } catch (llmError) {
      console.error("Groq Error:", llmError.message);

      // 🔥 FALLBACK (VERY IMPORTANT)
      insight = "AI insight unavailable";

      if (risk === "HIGH") {
        advice = ["Avoid outdoor activities", "Use mask or purifier"];
      } else if (risk === "MODERATE") {
        advice = ["Limit outdoor exposure", "Monitor air quality"];
      } else {
        advice = ["Air quality is safe", "No precautions needed"];
      }
    }

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
      advice: ["System error"]
    };
  }
};

module.exports = { analyzeData };