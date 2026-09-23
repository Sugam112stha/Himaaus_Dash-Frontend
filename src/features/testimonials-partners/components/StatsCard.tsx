import { TrendingDown, TrendingUp } from "lucide-react";
import type { StatsCardProps } from "../types/common";

const accentStyles: Record<NonNullable<StatsCardProps["accent"]>, string> = {
  blue: "bg-brand-50 text-brand-600",
  green: "bg-emerald-50 text-emerald-600",
  amber: "bg-amber-50 text-amber-600",
  red: "bg-rose-50 text-rose-600",
  slate: "bg-slate-100 text-slate-600",
};

export default function StatsCard({ label, value, icon, accent = "blue", hint, trend }: StatsCardProps) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-soft">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{value}</p>
          {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
          {trend && (
            <p
              className={`mt-2 flex items-center gap-1 text-xs font-medium ${
                trend.direction === "up" ? "text-emerald-600" : "text-rose-600"
              }`}
            >
              {trend.direction === "up" ? (
                <TrendingUp className="h-3.5 w-3.5" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5" />
              )}
              {trend.value}
            </p>
          )}
        </div>
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${accentStyles[accent]}`}>{icon}</div>
      </div>
    </div>
  );
}
