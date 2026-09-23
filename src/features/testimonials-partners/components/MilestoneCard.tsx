import type { Milestone } from "../types/milestone";
import MilestoneIcon from "./MilestoneIcon";
import StatusBadge from "./StatusBadge";
import ActionButtons from "./ActionButtons";

interface MilestoneCardProps {
  milestone: Milestone;
  onEdit: () => void;
  onDelete: () => void;
}

export default function MilestoneCard({ milestone, onEdit, onDelete }: MilestoneCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-soft">
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
          <MilestoneIcon name={milestone.icon} className="h-5 w-5" />
        </div>
        <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-md bg-slate-100 px-1.5 text-xs font-semibold text-slate-600">
          #{milestone.displayOrder}
        </span>
      </div>

      <div>
        <p className="text-3xl font-semibold tracking-tight text-slate-900">
          {milestone.value.toLocaleString()}
          <span className="text-brand-600">{milestone.suffix}</span>
        </p>
        <p className="mt-1 text-sm font-medium text-slate-700">{milestone.title}</p>
      </div>

      <p className="line-clamp-2 flex-1 text-sm text-slate-500">{milestone.description}</p>

      <div className="flex items-center justify-between border-t border-slate-50 pt-3">
        <StatusBadge status={milestone.status} tone={milestone.status === "Visible" ? "green" : "slate"} />
        <ActionButtons onEdit={onEdit} onDelete={onDelete} />
      </div>
    </div>
  );
}
