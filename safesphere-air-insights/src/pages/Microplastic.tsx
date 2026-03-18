import { useState } from "react";
import GlassCard from "@/components/GlassCard";

const Microplastic = () => {
  const [diameter, setDiameter] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const analyzeParticle = () => {
    const d = Number(diameter);

    if (!d) return;

    // ✅ MICROPLASTIC RANGE: 1 μm – 100 μm
    if (d >= 1 && d <= 100) {
      setResult("Microplastic Detected");
    } else {
      setResult("No Microplastic Detected");
    }
  };

  return (
    <div className="space-y-6">
      
      {/* INPUT CARD */}
      <GlassCard className="p-6 space-y-4">
        <h2 className="text-xl font-bold">
          Microplastic Detection
        </h2>

        <input
          type="number"
          placeholder="Enter particle diameter (μm)"
          value={diameter}
          onChange={(e) => setDiameter(e.target.value)}
          className="input-glass w-full"
        />

        {/* ✅ Hint */}
        <p className="text-xs text-muted-foreground">
          Microplastic range: 1 μm – 100 μm
        </p>

        <button
          onClick={analyzeParticle}
          className="btn-primary w-full py-2.5 text-sm"
        >
          Analyze Particle
        </button>
      </GlassCard>

      {/* RESULT */}
      {result && (
        <GlassCard className="p-6">
          <p className="text-lg font-semibold">
            Result:{" "}
            <span
              className={
                result === "Microplastic Detected"
                  ? "text-red-400"
                  : "text-green-400"
              }
            >
              {result}
            </span>
          </p>
        </GlassCard>
      )}

    </div>
  );
};

export default Microplastic;