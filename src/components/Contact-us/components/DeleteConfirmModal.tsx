import { AlertTriangle } from 'lucide-react'

interface Props {
  open: boolean
  name: string
  onClose: () => void
  onConfirm: () => void
}

export default function DeleteConfirmModal({
  open,
  name,
  onClose,
  onConfirm,
}: Props) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-sm rounded-2xl border border-surface-border bg-white p-6 text-center shadow-2xl">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
          <AlertTriangle size={24} className="text-red-500" />
        </div>
        <h3 className="text-lg font-bold text-surface-heading">
          Delete Contact
        </h3>
        <p className="mt-2 text-sm text-slate-500">
          Are you sure you want to delete{' '}
          <span className="font-semibold text-slate-700">{name}</span>'s
          inquiry? This action cannot be undone.
        </p>
        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-surface-border py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-red-500 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
