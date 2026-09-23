import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import type { Applicant, Status } from '../types'
import { DESTINATIONS, TEST_TYPES } from '../data'

interface Props {
  open: boolean
  onClose: () => void
  onSave: (data: {
    name: string
    email: string
    program: string
    degree: string
    destination: string
    testType: string
    testScore: string
    status: Status
    additionalMessage?: string
  }) => void
  initial?: Applicant | null
}

const EMPTY = {
  name: '',
  email: '',
  program: '',
  degree: '',
  destination: 'United Kingdom',
  testType: 'IELTS',
  testScore: '',
  status: 'Pending' as Status,
  additionalMessage: '',
}

export default function AppointmentModal({ open, onClose, onSave, initial }: Props) {
  const [form, setForm] = useState(EMPTY)

  useEffect(() => {
    if (initial) {
      setForm({
        name: initial.name,
        email: initial.email,
        program: initial.program,
        degree: initial.degree,
        destination: initial.destination,
        testType: initial.testType,
        testScore: initial.testScore,
        status: initial.status,
        additionalMessage: initial.additionalMessage || '',
      })
    } else {
      setForm(EMPTY)
    }
  }, [initial, open])

  if (!open) return null

  const isEdit = !!initial

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(form)
  }

  const set = (key: string, val: string) => setForm((p) => ({ ...p, [key]: val }))

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-lg rounded-2xl border border-surface-border bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-surface-border px-6 py-4">
          <h2 className="text-lg font-bold text-surface-heading">
            {isEdit ? 'Edit Appointment' : 'Add New Appointment'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[65vh] space-y-4 overflow-y-auto px-6 py-5">
          {/* Name + Email */}
          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-slate-500">Full Name *</span>
              <input
                required
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                className="w-full rounded-lg border border-surface-border bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                placeholder="e.g. Nischal Rai"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-slate-500">Email *</span>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
                className="w-full rounded-lg border border-surface-border bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                placeholder="nischal@example.com"
              />
            </label>
          </div>

          {/* Program + Degree */}
          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-slate-500">Program *</span>
              <input
                required
                value={form.program}
                onChange={(e) => set('program', e.target.value)}
                className="w-full rounded-lg border border-surface-border bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                placeholder="e.g. Data Science"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-slate-500">Degree *</span>
              <input
                required
                value={form.degree}
                onChange={(e) => set('degree', e.target.value)}
                className="w-full rounded-lg border border-surface-border bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                placeholder="Masters of Science"
              />
            </label>
          </div>

          {/* Destination */}
          <label className="block">
            <span className="mb-1 block text-xs font-semibold text-slate-500">Destination *</span>
            <select
              required
              value={form.destination}
              onChange={(e) => set('destination', e.target.value)}
              className="w-full rounded-lg border border-surface-border bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            >
              {Object.entries(DESTINATIONS).map(([name]) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </label>

          {/* Test type + Score */}
          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-slate-500">Test Type *</span>
              <select
                required
                value={form.testType}
                onChange={(e) => {
                  const val = e.target.value
                  set('testType', val)
                  if (val === 'None') {
                    set('testScore', '')
                  }
                }}
                className="w-full rounded-lg border border-surface-border bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
              >
                {TEST_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-slate-500">
                Test Score{form.testType !== 'None' && ' *'}
              </span>
              <input
                required={form.testType !== 'None'}
                disabled={form.testType === 'None'}
                value={form.testScore}
                onChange={(e) => set('testScore', e.target.value)}
                className={`w-full rounded-lg border border-surface-border px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100 ${
                  form.testType === 'None' ? 'bg-slate-200 cursor-not-allowed opacity-60' : 'bg-slate-50'
                }`}
                placeholder={form.testType === 'None' ? 'N/A' : 'e.g. 7.5'}
              />
            </label>
          </div>

          {/* Status */}
          <label className="block">
            <span className="mb-1 block text-xs font-semibold text-slate-500">Status</span>
            <select
              value={form.status}
              onChange={(e) => set('status', e.target.value)}
              className="w-full rounded-lg border border-surface-border bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            >
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </label>

          {/* Additional Message */}
          <label className="block">
            <span className="mb-1 block text-xs font-semibold text-slate-500">Additional Message</span>
            <textarea
              value={form.additionalMessage}
              onChange={(e) => set('additionalMessage', e.target.value)}
              className="w-full rounded-lg border border-surface-border bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100 min-h-[80px]"
              placeholder="Enter any additional messages or notes..."
            />
          </label>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-surface-border px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-surface-border px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-brand-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
          >
            {isEdit ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  )
}
