import { Loader2 } from "lucide-react";

interface FormButtonsProps {
  saveLabel: string;
  onCancel: () => void;
  isSaving?: boolean;
}

export default function FormButtons({ saveLabel, onCancel, isSaving = false }: FormButtonsProps) {
  return (
    <div className="sticky bottom-0 -mx-6 mt-8 flex justify-end gap-3 border-t border-slate-100 bg-white/95 px-6 py-4 backdrop-blur sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0">
      <button
        type="button"
        onClick={onCancel}
        className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 active:scale-[0.98]"
      >
        Cancel
      </button>
      <button
        type="submit"
        disabled={isSaving}
        className="flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-brand-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
        {saveLabel}
      </button>
    </div>
  );
}
