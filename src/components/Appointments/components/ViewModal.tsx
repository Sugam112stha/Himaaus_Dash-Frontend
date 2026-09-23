import { X, MapPin, Mail, Phone, GraduationCap, BookOpen, FlaskConical, MessageSquare } from 'lucide-react'
import type { Applicant } from '../types'

interface Props {
  open: boolean
  onClose: () => void
  applicant: Applicant | null
}

const statusColors: Record<string, string> = {
  Confirmed: 'text-emerald-600 bg-emerald-50 border-emerald-200',
  Pending: 'text-amber-600 bg-amber-50 border-amber-200',
  Cancelled: 'text-red-500 bg-red-50 border-red-200',
}

export default function ViewModal({ open, onClose, applicant }: Props) {
  if (!open || !applicant) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md max-h-[90vh] flex flex-col rounded-2xl border border-surface-border bg-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-surface-border px-6 py-4 shrink-0">
          <h2 className="text-lg font-bold text-surface-heading">Applicant Details</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5 overflow-y-auto flex-1 min-h-0 scrollbar-thin">
          {/* Name + Avatar */}
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-lg font-bold text-white">
              {applicant.avatar}
            </div>
            <div>
              <p className="text-lg font-bold text-surface-heading">{applicant.name}</p>
              <p className="text-sm text-slate-400">{applicant.email}</p>
            </div>
          </div>

          {/* Info grid */}
          <div className="space-y-3">
            <div className="flex items-start gap-3 rounded-lg bg-slate-50 p-3">
              <GraduationCap size={16} className="mt-0.5 shrink-0 text-brand-500" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Program & Degree</p>
                <p className="text-sm font-medium text-surface-heading">{applicant.program}</p>
                <p className="text-xs text-slate-500">{applicant.degree}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg bg-slate-50 p-3">
              <MapPin size={16} className="mt-0.5 shrink-0 text-brand-500" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Destination</p>
                <p className="text-sm font-medium text-surface-heading">
                  {applicant.destination}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg bg-slate-50 p-3">
              <FlaskConical size={16} className="mt-0.5 shrink-0 text-brand-500" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Test Preparation</p>
                <p className="text-sm font-medium text-surface-heading">
                  {applicant.testType} — {applicant.testScore}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3">
              <span className="text-xs font-semibold text-slate-500">Status</span>
              <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusColors[applicant.status]}`}>
                {applicant.status}
              </span>
            </div>

            {applicant.additionalMessage && (
              <div className="flex items-start gap-3 rounded-lg bg-slate-50 p-3">
                <MessageSquare size={16} className="mt-0.5 shrink-0 text-brand-500" />
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Additional Message</p>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed whitespace-pre-wrap break-words">{applicant.additionalMessage}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-surface-border px-6 py-4 shrink-0">
          <button
            onClick={onClose}
            className="w-full rounded-lg bg-slate-100 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
