import { X } from 'lucide-react'
import { useState, useEffect } from 'react'
import type { Contact, ContactFormData, InquirySubject } from '../types'
import { INQUIRY_SUBJECTS } from '../types'

interface Props {
  open: boolean
  onClose: () => void
  onSave: (data: ContactFormData) => void
  initial: Contact | null
}

const emptyForm: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  location: '',
  subject: 'Test Preparation',
  subjectDetail: '',
  message: '',
}

export default function AddContactModal({
  open,
  onClose,
  onSave,
  initial,
}: Props) {
  const [form, setForm] = useState<ContactFormData>(emptyForm)

  useEffect(() => {
    if (initial) {
      setForm({
        name: initial.name,
        email: initial.email,
        phone: initial.phone,
        location: initial.location,
        subject: initial.subject,
        subjectDetail: initial.subjectDetail,
        message: initial.message,
      })
    } else {
      setForm(emptyForm)
    }
  }, [initial, open])

  if (!open) return null

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSave(form)
  }

  const isEdit = !!initial

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-surface-border bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-surface-border px-6 py-4">
          <h3 className="text-lg font-bold text-surface-heading">
            {isEdit ? 'Edit Contact' : 'Add New Contact'}
          </h3>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5">
          {/* Row: Name + Email */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-500">
                Full Name *
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-surface-border px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                placeholder="e.g. Nischal Rai"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-500">
                Email *
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-surface-border px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                placeholder="email@example.com"
              />
            </div>
          </div>

          {/* Row: Phone + Location */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-500">
                Phone
              </label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full rounded-lg border border-surface-border px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                placeholder="+44 7700 900000"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-500">
                Location
              </label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                className="w-full rounded-lg border border-surface-border px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                placeholder="London, United Kingdom"
              />
            </div>
          </div>

          {/* Row: Subject */}
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-500">
              Subject *
            </label>
            <select
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="w-full cursor-pointer rounded-lg border border-surface-border px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            >
              {INQUIRY_SUBJECTS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>


          {/* Message */}
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-500">
              Message *
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full resize-none rounded-lg border border-surface-border px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
              placeholder="Enter inquiry message..."
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-surface-border py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-lg bg-brand-600 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
            >
              {isEdit ? 'Update Contact' : 'Add Contact'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
