import { AlertTriangle, Loader2, X } from "lucide-react";

interface DeleteModalProps {
  isOpen: boolean;
  itemName: string;
  onCancel: () => void;
  onConfirm: () => void;
  isDeleting?: boolean;
}

export default function DeleteModal({ isOpen, itemName, onCancel, onConfirm, isDeleting = false }: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-soft">
        <div className="flex items-start justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-50">
            <AlertTriangle className="h-5 w-5 text-rose-600" />
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <h3 className="mt-4 text-base font-semibold text-slate-900">Delete this item?</h3>
        <p className="mt-1.5 text-sm text-slate-500">
          Are you sure you want to delete <span className="font-medium text-slate-700">"{itemName}"</span>? This
          action cannot be undone.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex items-center gap-2 rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-rose-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isDeleting && <Loader2 className="h-4 w-4 animate-spin" />}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
