import { type LucideIcon } from "lucide-react";
import GlassCard from "./GlassCard";

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  trend: number;
}

const StatCard = ({ label, value, icon: Icon, trend }: StatCardProps) => (
  <GlassCard className="p-6">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-primary/20 rounded-lg">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <span
        className={`text-xs font-medium px-2 py-1 rounded-full ${
          trend > 0 ? "badge-high" : trend < 0 ? "badge-low" : "badge-med"
        }`}
      >
        {trend > 0 ? "+" : ""}
        {trend}%
      </span>
    </div>
    <p className="text-muted-foreground text-sm font-medium">{label}</p>
    <p className="text-2xl font-bold text-foreground mt-1 tabular-nums">{value}</p>
  </GlassCard>
);

export default StatCard;
