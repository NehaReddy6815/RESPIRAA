import { useEffect, useState } from "react";
import GlassCard from "@/components/GlassCard";

interface ProfileData {
  full_name: string;
  age: number | null;
  gender: string | null;
  has_breathing_issues: boolean | null;
  has_allergies: boolean | null;
  has_asthma: boolean | null;
  has_heart_condition: boolean | null;
  other_conditions: string | null;
}

const Profile = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [latest, setLatest] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("userProfile");
    const analysis = localStorage.getItem("latestResult");

    if (stored) {
      const data = JSON.parse(stored);

      setProfile({
        full_name: data.name,
        age: Number(data.age),
        gender: data.gender,
        has_breathing_issues: data.conditions.has_breathing_issues,
        has_allergies: data.conditions.has_allergies,
        has_asthma: data.conditions.has_asthma,
        has_heart_condition: data.conditions.has_heart_condition,
        other_conditions: data.otherConditions,
      });
    }

    if (analysis) {
      setLatest(JSON.parse(analysis));
    }
  }, []);

  // 🔥 PERSONALIZED RISK LOGIC
  const getPersonalRisk = () => {
    if (!latest) return "UNKNOWN";

    let risk = latest.risk;

    if (
      risk === "MODERATE" &&
      (profile?.has_asthma || profile?.has_breathing_issues)
    ) {
      return "HIGH";
    }

    if (
      risk === "LOW" &&
      (profile?.has_asthma || profile?.has_allergies)
    ) {
      return "MODERATE";
    }

    return risk;
  };

  const personalRisk = getPersonalRisk();

  // 🎨 COLOR
  const riskColor =
    personalRisk === "HIGH"
      ? "text-red-400"
      : personalRisk === "MODERATE"
      ? "text-yellow-400"
      : "text-green-400";

  // 🧠 SMART RECOMMENDATIONS
  const getRecommendations = () => {
    const tips: string[] = [];

    if (profile?.has_asthma) {
      tips.push("Avoid outdoor exposure due to asthma");
    }

    if (profile?.has_allergies) {
      tips.push("Wear a mask to reduce allergen exposure");
    }

    if (latest?.risk === "HIGH") {
      tips.push("Stay indoors and keep windows closed");
    }

    if (latest?.risk === "MODERATE") {
      tips.push("Limit prolonged outdoor activity");
    }

    if (tips.length === 0) {
      tips.push("Air quality is safe — enjoy your day outdoors!");
    }

    return tips;
  };

  const recommendations = getRecommendations();

  return (
    <div className="space-y-6">

      {/* 🔹 HERO */}
      <GlassCard className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">

          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-blue-500 p-[2px]">
            <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                alt="avatar"
                className="w-full h-full"
              />
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-bold">
              {profile?.full_name || "User"}
            </h1>
            <p className="text-sm text-muted-foreground">
              Your health profile
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-2xl font-bold text-primary">7</p>
          <p className="text-xs text-muted-foreground">Day Streak 🔥</p>
        </div>
      </GlassCard>

      {/* 🔹 DETAILS */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <GlassCard className="p-4">
          <p className="text-xs text-muted-foreground">Age</p>
          <p className="text-lg font-semibold">
            {profile?.age || "--"}
          </p>
        </GlassCard>

        <GlassCard className="p-4">
          <p className="text-xs text-muted-foreground">Gender</p>
          <p className="text-lg font-semibold capitalize">
            {profile?.gender || "--"}
          </p>
        </GlassCard>

        <GlassCard className="p-4">
          <p className="text-xs text-muted-foreground">Profile Status</p>
          <p className="text-lg font-semibold text-primary">
            Active
          </p>
        </GlassCard>
      </div>

      {/* 🔥 PERSONALIZED RISK */}
      {latest && (
        <GlassCard className="p-5">
          <h2 className="text-lg font-semibold mb-2">
            Personalized Risk
          </h2>

          <p className={`text-2xl font-bold ${riskColor}`}>
            {personalRisk}
          </p>

          <p className="text-sm text-muted-foreground mt-2">
            Based on your health conditions and current air quality
          </p>
        </GlassCard>
      )}

      {/* 🧠 RECOMMENDATIONS */}
      <GlassCard className="p-5">
        <h2 className="text-lg font-semibold mb-3">
          Recommendations for You
        </h2>

        <ul className="space-y-2 text-sm">
          {recommendations.map((tip, i) => (
            <li key={i}>• {tip}</li>
          ))}
        </ul>
      </GlassCard>

      {/* 📊 LAST ANALYSIS */}
      {latest && (
        <GlassCard className="p-5">
          <h2 className="text-lg font-semibold mb-2">
            Last Analysis
          </h2>

          <div className="text-sm space-y-1">
            <p>Score: {latest.score}</p>
            <p>Risk: {latest.risk}</p>
            <p>AQI: {latest.AQI}</p>
          </div>
        </GlassCard>
      )}

    </div>
  );
};

export default Profile;