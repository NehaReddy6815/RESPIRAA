import { useState } from "react";
import GlassCard from "@/components/GlassCard";

const Analyze = () => {
  const [aqi, setAqi] = useState("");
  const [pm25, setPm25] = useState("");
  const [pm10, setPm10] = useState("");

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!aqi || !pm25 || !pm10) return;

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          AQI: Number(aqi),
          "PM2.5": Number(pm25),
          PM10: Number(pm10),
        }),
      });

      const data = await res.json();

      setResult(data);

      // 🔥 SAVE FOR DASHBOARD
      localStorage.setItem(
        "latestResult",
        JSON.stringify({
          ...data,
          AQI: aqi,
          PM25: pm25,
          PM10: pm10,
        })
      );

      // 🔥 TRIGGER DASHBOARD UPDATE
      window.dispatchEvent(new Event("analysisDone"));

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🎨 Risk badge styles
  const getRiskStyle = (risk: string) => {
    if (risk === "LOW") return "badge-low";
    if (risk === "MODERATE") return "badge-med";
    if (risk === "HIGH") return "badge-high";
    return "badge-med";
  };

  return (
    <div className="space-y-6">
      
      {/* INPUT CARD */}
      <GlassCard className="p-6 space-y-4">
        <h2 className="text-xl font-bold text-foreground">
          Analyze Air Quality
        </h2>

        <div className="grid grid-cols-3 gap-4">
          <input
            value={aqi}
            onChange={(e) => setAqi(e.target.value)}
            placeholder="AQI"
            className="input-glass"
          />
          <input
            value={pm25}
            onChange={(e) => setPm25(e.target.value)}
            placeholder="PM2.5"
            className="input-glass"
          />
          <input
            value={pm10}
            onChange={(e) => setPm10(e.target.value)}
            placeholder="PM10"
            className="input-glass"
          />
        </div>

        <button
          onClick={handleAnalyze}
          className="btn-primary w-full"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </GlassCard>

      {/* RESULT CARD */}
      {result && (
        <GlassCard className="p-6 space-y-4">
          
          {/* Score + Risk */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Score</p>
              <p className="text-3xl font-bold text-primary">
                {result.score}
              </p>
            </div>

            <div className={`px-4 py-4 text-xs rounded-full font-medium ${getRiskStyle(result.risk)}`}>
              {result.risk}
            </div>
          </div>

          {/* Insight */}
          <div>
            <p className="text-sm text-muted-foreground mb-1">
              Insight
            </p>
            <p className="text-foreground leading-relaxed">
              {result.insight}
            </p>
          </div>

          {/* Recommendations */}
          {result.advice && result.advice.length > 0 && (
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Recommendations
              </p>

              <ul className="space-y-2">
                {result.advice.map((tip: string, index: number) => (
                  <li
                    key={index}
                    className="bg-white/5 border border-white/10 px-3 py-2 rounded-lg text-sm"
                  >
                    • {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

        </GlassCard>
      )}
    </div>
  );
};

export default Analyze;