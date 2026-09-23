import { useState, type FormEvent } from 'react'
import { Pencil, Plus, Trash2, X, PlusCircle, Check, HelpCircle } from 'lucide-react'
import type { EligibilityCriteria } from '../types'
import { eligibilityCriteria as initialCriteria } from '../data'

type EnglishReqForm = {
  test: string
  minScore: string
}

type FormState = {
  country: string
  minGPA: string
  englishTestRequirements: EnglishReqForm[]
  requiredDocuments: string[]
  isActive: boolean
}

const EMPTY_FORM: FormState = {
  country: '',
  minGPA: '',
  englishTestRequirements: [{ test: 'IELTS', minScore: '' }],
  requiredDocuments: [],
  isActive: true,
}

export default function EligibilityCriteriaPage() {
  const [criteriaList, setCriteriaList] = useState<EligibilityCriteria[]>(initialCriteria)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  // Form states
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [newDocName, setNewDocName] = useState('')

  function openAddModal() {
    setEditingId(null)
    setForm(EMPTY_FORM)
    setModalOpen(true)
  }

  function openEditModal(crit: EligibilityCriteria) {
    setEditingId(crit.id)
    setForm({
      country: crit.country,
      minGPA: crit.minGPA,
      englishTestRequirements: crit.englishTestRequirements.map((r) => ({ ...r })),
      requiredDocuments: [...crit.requiredDocuments],
      isActive: crit.isActive,
    })
    setModalOpen(true)
  }

  function toggleActive(id: string) {
    setCriteriaList((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive, lastUpdated: new Date().toISOString().slice(0, 10) } : c))
    )
  }

  function handleAddEnglishReq() {
    setForm((f) => ({
      ...f,
      englishTestRequirements: [...f.englishTestRequirements, { test: 'IELTS', minScore: '' }],
    }))
  }

  function handleRemoveEnglishReq(index: number) {
    setForm((f) => ({
      ...f,
      englishTestRequirements: f.englishTestRequirements.filter((_, i) => i !== index),
    }))
  }

  function handleEnglishReqChange(index: number, field: keyof EnglishReqForm, value: string) {
    setForm((f) => {
      const copy = [...f.englishTestRequirements]
      copy[index] = { ...copy[index], [field]: value }
      return { ...f, englishTestRequirements: copy }
    })
  }

  function handleAddDocument() {
    if (newDocName.trim() && !form.requiredDocuments.includes(newDocName.trim())) {
      setForm((f) => ({
        ...f,
        requiredDocuments: [...f.requiredDocuments, newDocName.trim()],
      }))
      setNewDocName('')
    }
  }

  function handleRemoveDocument(doc: string) {
    setForm((f) => ({
      ...f,
      requiredDocuments: f.requiredDocuments.filter((d) => d !== doc),
    }))
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const today = new Date().toISOString().slice(0, 10)

    if (editingId) {
      setCriteriaList((prev) =>
        prev.map((c) => (c.id === editingId ? { ...c, ...form, lastUpdated: today } : c))
      )
    } else {
      const newCriteria: EligibilityCriteria = {
        id: `ec-${Date.now()}`,
        ...form,
        lastUpdated: today,
      }
      setCriteriaList((prev) => [newCriteria, ...prev])
    }
    setModalOpen(false)
  }

  function confirmDelete() {
    if (deleteId) {
      setCriteriaList((prev) => prev.filter((c) => c.id !== deleteId))
      setDeleteId(null)
    }
  }

  return (
    <div className="mx-auto w-full max-w-[1000px] space-y-4 sm:space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-[15px] font-bold text-surface-heading sm:text-base">
            Eligibility Criteria
          </h2>
          <p className="mt-0.5 text-[12.5px] text-surface-muted">
            Manage academic and language criteria requirements per country.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-1.5 rounded-lg bg-brand-600 px-3.5 py-2 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
        >
          <Plus size={16} />
          Add Criteria
        </button>
      </div>

      {/* Grid of Criteria */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {criteriaList.map((crit) => (
          <div
            key={crit.id}
            className={`rounded-xl2 border border-surface-border bg-white p-5 shadow-card transition-all ${
              !crit.isActive ? 'opacity-70 bg-slate-50/50' : ''
            }`}
          >
            {/* Header info */}
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-[16px] font-bold text-surface-heading flex items-center gap-2">
                  {crit.country}
                  {!crit.isActive && (
                    <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold uppercase text-slate-500">
                      Inactive
                    </span>
                  )}
                </h3>
                <p className="text-[11px] text-slate-400">Last updated {crit.lastUpdated}</p>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => toggleActive(crit.id)}
                  className={`rounded px-2 py-1 text-[11px] font-bold transition-colors ${
                    crit.isActive
                      ? 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                      : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                  }`}
                >
                  {crit.isActive ? 'Deactivate' : 'Activate'}
                </button>
                <button
                  onClick={() => openEditModal(crit)}
                  className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-brand-600"
                  aria-label="Edit"
                >
                  <Pencil size={15} />
                </button>
                <button
                  onClick={() => setDeleteId(crit.id)}
                  className="rounded-md p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                  aria-label="Delete"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>

            {/* GPA */}
            <div className="mt-4 border-t border-slate-100 pt-3">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Min Academic Requirement
              </span>
              <p className="mt-0.5 text-[13.5px] font-bold text-slate-800">{crit.minGPA}</p>
            </div>

            {/* English requirements */}
            <div className="mt-3.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                English Test Requirements
              </span>
              <div className="space-y-1">
                {crit.englishTestRequirements.map((req, i) => (
                  <div key={i} className="flex justify-between items-center rounded-lg bg-slate-50 px-2.5 py-1.5 text-[12.5px]">
                    <span className="font-semibold text-slate-700">{req.test}</span>
                    <span className="text-slate-650">{req.minScore}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Required Documents */}
            <div className="mt-4">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                Required Documents
              </span>
              <div className="flex flex-wrap gap-1.5">
                {crit.requiredDocuments.map((doc, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 rounded bg-brand-50/50 px-2 py-0.5 text-[11.5px] text-brand-700"
                  >
                    <Check size={10} strokeWidth={3} /> {doc}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-[2px]"
          onClick={() => setModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-xl2 border border-surface-border bg-white shadow-lg flex flex-col max-h-[90vh]"
          >
            <div className="flex items-center justify-between border-b border-surface-border px-5 py-4">
              <h3 className="text-[14.5px] font-bold text-surface-heading">
                {editingId ? 'Edit Criteria' : 'Add Criteria'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="rounded-md p-1 text-slate-400 hover:bg-slate-50 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto space-y-4 px-5 py-4">
              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="mb-1.5 block text-[13px] font-semibold text-surface-heading">Country</span>
                  <input
                    type="text"
                    required
                    value={form.country}
                    onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
                    placeholder="e.g. Australia"
                    className="w-full rounded-lg border border-surface-border bg-slate-50/70 px-3 py-2 text-[13px] text-slate-700 outline-none focus:border-brand-400 focus:bg-white"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-[13px] font-semibold text-surface-heading">Min GPA / Percentage</span>
                  <input
                    type="text"
                    required
                    value={form.minGPA}
                    onChange={(e) => setForm((f) => ({ ...f, minGPA: e.target.value }))}
                    placeholder="e.g. 2.8 GPA or 60%"
                    className="w-full rounded-lg border border-surface-border bg-slate-50/70 px-3 py-2 text-[13px] text-slate-700 outline-none focus:border-brand-400 focus:bg-white"
                  />
                </label>
              </div>

              {/* English test scores */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[13px] font-semibold text-surface-heading">English Language Requirements</span>
                  <button
                    type="button"
                    onClick={handleAddEnglishReq}
                    className="text-[11.5px] font-bold text-brand-650 flex items-center gap-1 hover:text-brand-700"
                  >
                    <PlusCircle size={13} /> Add Test
                  </button>
                </div>
                <div className="space-y-2">
                  {form.englishTestRequirements.map((req, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <select
                        value={req.test}
                        onChange={(e) => handleEnglishReqChange(index, 'test', e.target.value)}
                        className="rounded-lg border border-surface-border bg-slate-50/70 px-2 py-2 text-[13px] text-slate-700 outline-none focus:border-brand-400 focus:bg-white"
                      >
                        <option value="IELTS">IELTS</option>
                        <option value="PTE">PTE</option>
                        <option value="TOEFL">TOEFL</option>
                        <option value="OET">OET</option>
                      </select>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 6.5 overall (no band < 6.0)"
                        value={req.minScore}
                        onChange={(e) => handleEnglishReqChange(index, 'minScore', e.target.value)}
                        className="flex-1 rounded-lg border border-surface-border bg-slate-50/70 px-3 py-2 text-[13px] text-slate-700 outline-none focus:border-brand-400 focus:bg-white"
                      />
                      {form.englishTestRequirements.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveEnglishReq(index)}
                          className="text-slate-400 hover:text-rose-500 p-1"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Required Documents */}
              <div>
                <span className="mb-1.5 block text-[13px] font-semibold text-surface-heading">Required Documents</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. SOP, Academic Transcripts"
                    value={newDocName}
                    onChange={(e) => setNewDocName(e.target.value)}
                    className="flex-1 rounded-lg border border-surface-border bg-slate-50/70 px-3 py-2 text-[13px] text-slate-700 outline-none focus:border-brand-400 focus:bg-white"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleAddDocument()
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddDocument}
                    className="rounded-lg bg-slate-100 hover:bg-slate-200 px-3 py-2 text-[13px] font-semibold text-slate-700"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {form.requiredDocuments.length === 0 ? (
                    <p className="text-[11.5px] text-slate-450 italic">No documents added yet.</p>
                  ) : (
                    form.requiredDocuments.map((doc, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 rounded bg-brand-50 px-2 py-0.5 text-[11.5px] text-brand-700 font-medium"
                      >
                        {doc}
                        <button
                          type="button"
                          onClick={() => handleRemoveDocument(doc)}
                          className="hover:text-rose-600 focus:outline-none"
                        >
                          <X size={10} />
                        </button>
                      </span>
                    ))
                  )}
                </div>
              </div>

              {/* Status */}
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))}
                  className="rounded border-surface-border text-brand-600 focus:ring-brand-500 h-4 w-4"
                />
                <span className="text-[13px] font-semibold text-surface-heading">Set as Active</span>
              </label>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-surface-border">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-lg border border-surface-border px-4 py-2 text-[13px] font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-brand-600 px-4 py-2 text-[13px] font-semibold text-white shadow-sm hover:bg-brand-700"
                >
                  {editingId ? 'Save Changes' : 'Add Criteria'}
                </button>
              </div>
            </form>
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
            <h3 className="text-[14.5px] font-bold text-surface-heading">Delete these criteria?</h3>
            <p className="mt-1.5 text-[13px] text-surface-muted">
              This can't be undone. The eligibility criteria will be permanently removed.
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
