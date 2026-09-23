import type { ReactNode } from "react";
import { Inbox, Plus } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  title = "No records found",
  description = "Try adjusting your search or add a new entry.",
  icon,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50">
        {icon ?? <Inbox className="h-6 w-6 text-slate-300" />}
      </div>
      <p className="text-sm font-medium text-slate-600">{title}</p>
      <p className="mt-1 max-w-xs text-sm text-slate-400">{description}</p>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-5 flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-brand-700 active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" />
          {actionLabel}
        </button>
      )}
    </div>
  );
}
