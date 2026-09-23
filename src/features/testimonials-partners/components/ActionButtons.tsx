import { Pencil, Trash2 } from "lucide-react";

interface ActionButtonsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export default function ActionButtons({ onEdit, onDelete }: ActionButtonsProps) {
  return (
    <div className="flex items-center justify-end gap-1.5">
      <button
        type="button"
        onClick={onEdit}
        title="Edit"
        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-brand-50 hover:text-brand-600"
      >
        <Pencil className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={onDelete}
        title="Delete"
        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}
