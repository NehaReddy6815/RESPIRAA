import { Activity, ShieldCheck, TrendingUp, Wind, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import GlassCard from "@/components/GlassCard";
import StatCard from "@/components/StatCard";

const Dashboard = () => {
  const [data, setData] = useState<any>(null);

  const loadData = () => {
    const stored = localStorage.getItem("latestResult");
    if (stored) {
      setData(JSON.parse(stored));
    }
  };

  useEffect(() => {
    loadData();

    // 🔥 LISTEN FOR ANALYZE EVENT
    window.addEventListener("analysisDone", loadData);

    return () => {
      window.removeEventListener("analysisDone", loadData);
    };
  }, []);

  const getRiskStyle = (risk: string) => {
    if (risk === "LOW") return "badge-low";
    if (risk === "MODERATE") return "badge-med";
    if (risk === "HIGH") return "badge-high";
    return "badge-med";
  };

  const getProgressColor = (risk: string) => {
    if (risk === "LOW") return "from-emerald-500 to-primary";
    if (risk === "MODERATE") return "from-yellow-500 to-amber-400";
    if (risk === "HIGH") return "from-red-500 to-destructive";
    return "from-primary to-blue-500";
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold">SafeSphere</h1>
        <p className="text-muted-foreground">AI Powered Microplastic Monitoring</p>
      </header>

      <GlassCard className="p-8">
        <div className="grid grid-cols-2 gap-8 items-center">

          {/* LEFT */}
          <div>
            <h2 className="text-muted-foreground mb-2">Microplastic Index</h2>

            <div className="flex items-center gap-4">
              <span className="text-6xl font-bold">
                {data?.score || "--"}
              </span>

              <span className={`${getRiskStyle(data?.risk)} px-3 py-1 rounded-full`}>
                {data?.risk || "No Data"}
              </span>
            </div>

            <div className="mt-4 h-2 bg-white/10 rounded">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${data?.score || 0}%` }}
                className={`h-full bg-gradient-to-r ${getProgressColor(data?.risk)}`}
              />
            </div>

            <p className="text-sm mt-4 text-muted-foreground">
              {data?.insight || "Run analysis to see insights"}
            </p>
          </div>

          {/* RIGHT */}
          <div className="grid grid-cols-2 gap-4">
            <div className="card">AQI: {data?.AQI || "--"}</div>
            <div className="card">PM2.5: {data?.PM25 || "--"}</div>
            <div className="card">PM10: {data?.PM10 || "--"}</div>
            <div className="card">Humidity: --</div>
          </div>

        </div>
      </GlassCard>

      <div className="grid grid-cols-4 gap-6">
        <StatCard label="City Hotspots" value="12 Active" icon={Activity} trend={-2} />
        <StatCard label="Health Alerts" value="0 Critical" icon={ShieldCheck} trend={0} />
        <StatCard label="Predictions" value={data?.risk || "--"} icon={TrendingUp} trend={5} />
        <StatCard label="Air Insights" value={`${data?.score || "--"} Score`} icon={Wind} trend={-1} />
      </div>

      {!data && (
        <p className="text-center text-muted-foreground">
          No data yet. Go to Analyze 🚀
        </p>
      )}
    </div>
  );
};

export default Dashboard;