import { useEffect, useState } from "react";
import axios from "axios";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import GlassCard from "@/components/GlassCard";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="glass-card p-3 text-sm">
      <p className="text-foreground font-semibold mb-1">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color }}>
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
};

const Trends = () => {
  const [records, setRecords] = useState<any[]>([]);

  // 🔥 FETCH FROM BACKEND
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/analyze/history");
        setRecords(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  // 🔥 FORMAT DATA FOR CHART
  const chartData = records.map((r) => ({
    time: new Date(r.createdAt).toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
}),
    aqi: r.AQI,
    pm25: r.PM25,
    pm10: r.PM10,
  }));

  // 🔥 CALCULATIONS
  const peakAQI = Math.max(...records.map((r) => r.AQI || 0));

  const avgPM25 =
    records.length > 0
      ? (
          records.reduce((sum, r) => sum + (r.PM25 || 0), 0) /
          records.length
        ).toFixed(1)
      : 0;

  const trend =
    records.length > 1 && records[records.length - 1].AQI < records[0].AQI
      ? "↓ Improving"
      : "↑ Worsening";

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-foreground tracking-display">
          Trend Analysis
        </h1>
        <p className="text-muted-foreground">
          Real-time air quality metrics over time
        </p>
      </header>

      <GlassCard className="p-8">
        <h3 className="text-lg font-bold text-foreground mb-6">
          AQI & Particulate Matter — Today
        </h3>

        <div className="h-[360px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="tealGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(168, 64%, 52%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(168, 64%, 52%)" stopOpacity={0} />
                </linearGradient>

                <linearGradient id="amberGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="time" stroke="rgba(255,255,255,0.3)" />
              <YAxis stroke="rgba(255,255,255,0.3)" />
              <Tooltip content={<CustomTooltip />} />

              <Area
                type="monotone"
                dataKey="aqi"
                name="AQI"
                stroke="hsl(168, 64%, 52%)"
                fill="url(#tealGrad)"
                strokeWidth={2}
              />

              <Area
                type="monotone"
                dataKey="pm25"
                name="PM2.5"
                stroke="#f59e0b"
                fill="url(#amberGrad)"
                strokeWidth={2}
              />

              <Area
                type="monotone"
                dataKey="pm10"
                name="PM10"
                stroke="#8b5cf6"
                fill="transparent"
                strokeWidth={2}
                strokeDasharray="6 3"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* 🔥 DYNAMIC STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="p-6">
          <p className="stat-label">Peak AQI</p>
          <p className="text-2xl font-bold mt-1 text-primary">
            {peakAQI || "--"}
          </p>
        </GlassCard>

        <GlassCard className="p-6">
          <p className="stat-label">Avg PM2.5</p>
          <p className="text-2xl font-bold mt-1 text-amber-400">
            {avgPM25} µg/m³
          </p>
        </GlassCard>

        <GlassCard className="p-6">
          <p className="stat-label">Trend</p>
          <p className="text-2xl font-bold mt-1 text-emerald-400">
            {trend}
          </p>
        </GlassCard>
      </div>
    </div>
  );
};

export default Trends;