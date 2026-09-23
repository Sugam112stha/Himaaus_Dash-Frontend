import { useState, type FormEvent } from 'react'
import { Pencil, Plus, Trash2, X, Search, Filter, CheckCircle, AlertCircle, Clock, Eye } from 'lucide-react'
import type { EligibilitySubmission } from '../types'
import { eligibilitySubmissions as initialSubmissions } from '../data'

type FormState = {
  studentName: string
  email: string
  phone: string
  destinationCountry: string
  highestQualification: string
  gpaOrPercentage: string
  englishTest: string
  englishScore: string
  status: 'Pending' | 'Approved' | 'Rejected'
}

const EMPTY_FORM: FormState = {
  studentName: '',
  email: '',
  phone: '',
  destinationCountry: 'Australia',
  highestQualification: '',
  gpaOrPercentage: '',
  englishTest: 'IELTS',
  englishScore: '',
  status: 'Pending',
}

export default function EligibilitySubmissionsPage() {
  const [submissions, setSubmissions] = useState<EligibilitySubmission[]>(initialSubmissions)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [countryFilter, setCountryFilter] = useState('All')

  // Modals state
  const [formModalOpen, setFormModalOpen] = useState(false)
  const [detailModalOpen, setDetailModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [selectedSubmission, setSelectedSubmission] = useState<EligibilitySubmission | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const [form, setForm] = useState<FormState>(EMPTY_FORM)

  function openAddModal() {
    setEditingId(null)
    setForm(EMPTY_FORM)
    setFormModalOpen(true)
  }

  function openEditModal(sub: EligibilitySubmission, e: React.MouseEvent) {
    e.stopPropagation()
    setEditingId(sub.id)
    setForm({
      studentName: sub.studentName,
      email: sub.email,
      phone: sub.phone,
      destinationCountry: sub.destinationCountry,
      highestQualification: sub.highestQualification,
      gpaOrPercentage: sub.gpaOrPercentage,
      englishTest: sub.englishTest,
      englishScore: sub.englishScore,
      status: sub.status,
    })
    setFormModalOpen(true)
  }

  function openDetailModal(sub: EligibilitySubmission) {
    setSelectedSubmission(sub)
    setDetailModalOpen(true)
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const today = new Date().toISOString().slice(0, 10)

    if (editingId) {
      setSubmissions((prev) =>
        prev.map((s) => (s.id === editingId ? { ...s, ...form } : s))
      )
    } else {
      const newSubmission: EligibilitySubmission = {
        id: `es-${Date.now()}`,
        ...form,
        submittedAt: today,
      }
      setSubmissions((prev) => [newSubmission, ...prev])
    }
    setFormModalOpen(false)
  }

  function confirmDelete(e: React.MouseEvent) {
    e.stopPropagation()
    if (deleteId) {
      setSubmissions((prev) => prev.filter((s) => s.id !== deleteId))
      setDeleteId(null)
      if (selectedSubmission?.id === deleteId) {
        setDetailModalOpen(false)
      }
    }
  }

  function updateStatus(id: string, newStatus: 'Pending' | 'Approved' | 'Rejected') {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
    )
    if (selectedSubmission && selectedSubmission.id === id) {
      setSelectedSubmission((prev) => prev ? { ...prev, status: newStatus } : null)
    }
  }

  // Get unique countries for filter dropdown
  const countries = Array.from(new Set(submissions.map((s) => s.destinationCountry)))

  // Filtered submissions
  const filteredSubmissions = submissions.filter((sub) => {
    const matchesSearch =
      sub.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.highestQualification.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === 'All' || sub.status === statusFilter
    const matchesCountry = countryFilter === 'All' || sub.destinationCountry === countryFilter

    return matchesSearch && matchesStatus && matchesCountry
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Approved':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11.5px] font-medium text-emerald-700">
            <CheckCircle size={12} /> Approved
          </span>
        )
      case 'Rejected':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-[11.5px] font-medium text-rose-700">
            <AlertCircle size={12} /> Rejected
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[11.5px] font-medium text-amber-700">
            <Clock size={12} /> Pending
          </span>
        )
    }
  }

  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-4 sm:space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-[15px] font-bold text-surface-heading sm:text-base">
            Eligibility Submissions
          </h2>
          <p className="mt-0.5 text-[12.5px] text-surface-muted">
            Review and manage student eligibility assessment submissions.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-1.5 rounded-lg bg-brand-600 px-3.5 py-2 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
        >
          <Plus size={16} />
          Add Submission
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl2 border border-surface-border bg-white p-4 shadow-card">
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by student, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-surface-border bg-slate-50/70 py-2 pl-9 pr-4 text-[13px] text-slate-700 placeholder:text-slate-400 outline-none transition-colors focus:border-brand-400 focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Filter size={14} className="text-slate-400" />
            <span className="text-[12px] font-medium text-slate-500">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-surface-border bg-slate-50/70 px-2.5 py-1.5 text-[12.5px] text-slate-600 outline-none focus:border-brand-400 focus:bg-white"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[12px] font-medium text-slate-500">Country:</span>
            <select
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              className="rounded-lg border border-surface-border bg-slate-50/70 px-2.5 py-1.5 text-[12.5px] text-slate-600 outline-none focus:border-brand-400 focus:bg-white"
            >
              <option value="All">All Countries</option>
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Submissions Table / Grid */}
      <div className="overflow-hidden rounded-xl2 border border-surface-border bg-white shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-surface-border bg-slate-50 text-[12px] font-semibold uppercase tracking-wider text-slate-500">
                <th className="px-5 py-3">Student Details</th>
                <th className="px-5 py-3">Destination</th>
                <th className="px-5 py-3">Qualification & GPA</th>
                <th className="px-5 py-3">English Test</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border">
              {filteredSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-[13px] text-slate-400">
                    No submissions found matching criteria.
                  </td>
                </tr>
              ) : (
                filteredSubmissions.map((sub) => (
                  <tr
                    key={sub.id}
                    onClick={() => openDetailModal(sub)}
                    className="group cursor-pointer hover:bg-slate-50/70"
                  >
                    <td className="px-5 py-3.5">
                      <p className="text-[13.5px] font-bold text-surface-heading group-hover:text-brand-600">
                        {sub.studentName}
                      </p>
                      <p className="text-[11.5px] text-slate-400">{sub.email}</p>
                      <p className="text-[11.5px] text-slate-400">{sub.phone}</p>
                    </td>
                    <td className="px-5 py-3.5 text-[13px] text-slate-600">
                      {sub.destinationCountry}
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="text-[13px] font-medium text-slate-700 truncate max-w-[200px]" title={sub.highestQualification}>
                        {sub.highestQualification}
                      </p>
                      <p className="text-[11.5px] text-brand-600 font-semibold">{sub.gpaOrPercentage}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="text-[13px] font-medium text-slate-700">{sub.englishTest}</p>
                      <p className="text-[11.5px] text-slate-400">{sub.englishScore}</p>
                    </td>
                    <td className="px-5 py-3.5">{getStatusBadge(sub.status)}</td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => openDetailModal(sub)}
                          className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                          title="View Details"
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          onClick={(e) => openEditModal(sub, e)}
                          className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-brand-600"
                          title="Edit Submission"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setDeleteId(sub.id)
                          }}
                          className="rounded-md p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-500"
                          title="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Form Modal */}
      {formModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-[2px]"
          onClick={() => setFormModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-xl2 border border-surface-border bg-white shadow-lg flex flex-col max-h-[90vh]"
          >
            <div className="flex items-center justify-between border-b border-surface-border px-5 py-4">
              <h3 className="text-[14.5px] font-bold text-surface-heading">
                {editingId ? 'Edit Submission' : 'Add Assessment Submission'}
              </h3>
              <button
                onClick={() => setFormModalOpen(false)}
                className="rounded-md p-1 text-slate-400 hover:bg-slate-50 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto space-y-4 px-5 py-4">
              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="mb-1.5 block text-[13px] font-semibold text-surface-heading">Student Name</span>
                  <input
                    type="text"
                    required
                    value={form.studentName}
                    onChange={(e) => setForm((f) => ({ ...f, studentName: e.target.value }))}
                    placeholder="e.g. Aarav Patel"
                    className="w-full rounded-lg border border-surface-border bg-slate-50/70 px-3 py-2 text-[13px] text-slate-700 outline-none focus:border-brand-400 focus:bg-white"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-[13px] font-semibold text-surface-heading">Email Address</span>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder="e.g. aarav@example.com"
                    className="w-full rounded-lg border border-surface-border bg-slate-50/70 px-3 py-2 text-[13px] text-slate-700 outline-none focus:border-brand-400 focus:bg-white"
                  />
                </label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="mb-1.5 block text-[13px] font-semibold text-surface-heading">Phone Number</span>
                  <input
                    type="text"
                    required
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    placeholder="e.g. +977-9801234567"
                    className="w-full rounded-lg border border-surface-border bg-slate-50/70 px-3 py-2 text-[13px] text-slate-700 outline-none focus:border-brand-400 focus:bg-white"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-[13px] font-semibold text-surface-heading">Destination Country</span>
                  <select
                    value={form.destinationCountry}
                    onChange={(e) => setForm((f) => ({ ...f, destinationCountry: e.target.value }))}
                    className="w-full rounded-lg border border-surface-border bg-slate-50/70 px-3 py-2 text-[13px] text-slate-700 outline-none focus:border-brand-400 focus:bg-white"
                  >
                    <option value="Australia">Australia</option>
                    <option value="USA">USA</option>
                    <option value="Canada">Canada</option>
                    <option value="UK">UK</option>
                    <option value="New Zealand">New Zealand</option>
                  </select>
                </label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="mb-1.5 block text-[13px] font-semibold text-surface-heading">Highest Qualification</span>
                  <input
                    type="text"
                    required
                    value={form.highestQualification}
                    onChange={(e) => setForm((f) => ({ ...f, highestQualification: e.target.value }))}
                    placeholder="e.g. High School (10+2)"
                    className="w-full rounded-lg border border-surface-border bg-slate-50/70 px-3 py-2 text-[13px] text-slate-700 outline-none focus:border-brand-400 focus:bg-white"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-[13px] font-semibold text-surface-heading">GPA / Percentage</span>
                  <input
                    type="text"
                    required
                    value={form.gpaOrPercentage}
                    onChange={(e) => setForm((f) => ({ ...f, gpaOrPercentage: e.target.value }))}
                    placeholder="e.g. 3.2 GPA or 75%"
                    className="w-full rounded-lg border border-surface-border bg-slate-50/70 px-3 py-2 text-[13px] text-slate-700 outline-none focus:border-brand-400 focus:bg-white"
                  />
                </label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="mb-1.5 block text-[13px] font-semibold text-surface-heading">English Test</span>
                  <select
                    value={form.englishTest}
                    onChange={(e) => setForm((f) => ({ ...f, englishTest: e.target.value }))}
                    className="w-full rounded-lg border border-surface-border bg-slate-50/70 px-3 py-2 text-[13px] text-slate-700 outline-none focus:border-brand-400 focus:bg-white"
                  >
                    <option value="IELTS">IELTS</option>
                    <option value="PTE">PTE</option>
                    <option value="TOEFL">TOEFL</option>
                    <option value="None">None</option>
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-[13px] font-semibold text-surface-heading">English Score Details</span>
                  <input
                    type="text"
                    required
                    value={form.englishScore}
                    onChange={(e) => setForm((f) => ({ ...f, englishScore: e.target.value }))}
                    placeholder="e.g. 6.5 Overall (no band < 6)"
                    className="w-full rounded-lg border border-surface-border bg-slate-50/70 px-3 py-2 text-[13px] text-slate-700 outline-none focus:border-brand-400 focus:bg-white"
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-1.5 block text-[13px] font-semibold text-surface-heading">Assessment Status</span>
                <select
                  value={form.status}
                  onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as any }))}
                  className="w-full rounded-lg border border-surface-border bg-slate-50/70 px-3 py-2 text-[13px] text-slate-700 outline-none focus:border-brand-400 focus:bg-white"
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </label>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-surface-border">
                <button
                  type="button"
                  onClick={() => setFormModalOpen(false)}
                  className="rounded-lg border border-surface-border px-4 py-2 text-[13px] font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-brand-600 px-4 py-2 text-[13px] font-semibold text-white shadow-sm hover:bg-brand-700"
                >
                  {editingId ? 'Save Changes' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Details View Modal */}
      {detailModalOpen && selectedSubmission && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-[2px]"
          onClick={() => setDetailModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-xl2 border border-surface-border bg-white shadow-lg overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-surface-border px-5 py-4 bg-slate-50">
              <div>
                <h3 className="text-[14.5px] font-bold text-surface-heading">Assessment Details</h3>
                <p className="text-[11.5px] text-slate-400">ID: {selectedSubmission.id}</p>
              </div>
              <button
                onClick={() => setDetailModalOpen(false)}
                className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            <div className="px-5 py-4 space-y-4 text-[13px]">
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Student Info</p>
                <p className="mt-1 text-[15px] font-bold text-surface-heading">{selectedSubmission.studentName}</p>
                <p className="text-slate-600">{selectedSubmission.email}</p>
                <p className="text-slate-600">{selectedSubmission.phone}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-3">
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Destination</p>
                  <p className="mt-1 font-semibold text-slate-800">{selectedSubmission.destinationCountry}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Submission Date</p>
                  <p className="mt-1 text-slate-600">{selectedSubmission.submittedAt}</p>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Academic Record</p>
                <p className="mt-1 text-slate-800 font-semibold">{selectedSubmission.highestQualification}</p>
                <p className="text-brand-600 font-bold">{selectedSubmission.gpaOrPercentage}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-3">
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Language Test</p>
                  <p className="mt-1 font-semibold text-slate-850">{selectedSubmission.englishTest}</p>
                  <p className="text-slate-500 text-[12px]">{selectedSubmission.englishScore}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Current Status</p>
                  <div className="mt-1.5">{getStatusBadge(selectedSubmission.status)}</div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4 flex gap-2 items-center justify-between">
                <div className="flex gap-1.5">
                  <button
                    onClick={() => updateStatus(selectedSubmission.id, 'Approved')}
                    className="rounded-md bg-emerald-600 hover:bg-emerald-700 px-3 py-1.5 text-[11.5px] font-semibold text-white transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(selectedSubmission.id, 'Rejected')}
                    className="rounded-md bg-rose-600 hover:bg-rose-700 px-3 py-1.5 text-[11.5px] font-semibold text-white transition-colors"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => updateStatus(selectedSubmission.id, 'Pending')}
                    className="rounded-md bg-slate-100 hover:bg-slate-200 px-3 py-1.5 text-[11.5px] font-semibold text-slate-600 transition-colors"
                  >
                    Mark Pending
                  </button>
                </div>

                <div className="flex gap-1">
                  <button
                    onClick={(e) => {
                      setFormModalOpen(false)
                      openEditModal(selectedSubmission, e)
                    }}
                    className="rounded-md p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                    title="Edit"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => setDeleteId(selectedSubmission.id)}
                    className="rounded-md p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                    title="Delete"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-[2px]"
          onClick={() => setDeleteId(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-xl2 border border-surface-border bg-white p-5 shadow-lg"
          >
            <h3 className="text-[14.5px] font-bold text-surface-heading">Delete this submission?</h3>
            <p className="mt-1.5 text-[13px] text-surface-muted">
              This can't be undone. The student submission will be permanently removed.
            </p>
            <div className="mt-4 flex justify-end gap-2.5">
              <button
                onClick={() => setDeleteId(null)}
                className="rounded-lg border border-surface-border px-3.5 py-2 text-[13px] font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="rounded-lg bg-rose-600 px-3.5 py-2 text-[13px] font-semibold text-white shadow-sm hover:bg-rose-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
