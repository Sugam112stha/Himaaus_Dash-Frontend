import type { Milestone } from "../types/milestone";
import MilestoneCard from "./MilestoneCard";
import EmptyState from "./EmptyState";

interface MilestoneGridProps {
  milestones: Milestone[];
  isLoading: boolean;
  onEdit: (milestone: Milestone) => void;
  onDelete: (milestone: Milestone) => void;
}

function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-card">
      <div className="skeleton h-12 w-12 rounded-xl" />
      <div className="mt-4 skeleton h-7 w-24 rounded" />
      <div className="mt-2 skeleton h-3.5 w-2/3 rounded" />
      <div className="mt-4 space-y-2">
        <div className="skeleton h-3 w-full rounded" />
        <div className="skeleton h-3 w-5/6 rounded" />
      </div>
    </div>
  );
}

export default function MilestoneGrid({ milestones, isLoading, onEdit, onDelete }: MilestoneGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (milestones.length === 0) {
    return (
      <EmptyState title="No milestones found" description="Try a different search term or add a new milestone." />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 xl:grid-cols-3">
      {milestones.map((milestone) => (
        <MilestoneCard
          key={milestone.id}
          milestone={milestone}
          onEdit={() => onEdit(milestone)}
          onDelete={() => onDelete(milestone)}
        />
      ))}
    </div>
  );
}
