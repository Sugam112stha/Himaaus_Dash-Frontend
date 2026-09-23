import type { StatusBadgeProps } from "../types/common";

const toneStyles: Record<StatusBadgeProps["tone"], string> = {
  green: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  slate: "bg-slate-100 text-slate-600 ring-slate-500/20",
  red: "bg-rose-50 text-rose-700 ring-rose-600/20",
  blue: "bg-blue-50 text-blue-700 ring-blue-600/20",
  amber: "bg-amber-50 text-amber-700 ring-amber-600/20",
};

const dotStyles: Record<StatusBadgeProps["tone"], string> = {
  green: "bg-emerald-500",
  slate: "bg-slate-400",
  red: "bg-rose-500",
  blue: "bg-blue-500",
  amber: "bg-amber-500",
};

export default function StatusBadge({ status, tone }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${toneStyles[tone]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dotStyles[tone]}`} />
      {status}
    </span>
  );
}
