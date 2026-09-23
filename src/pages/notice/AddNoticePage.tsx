import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { addNotice } from '../../lib/noticeStore'

export default function AddNoticePage() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    if (!title.trim() || !description.trim()) {
      setError('Please add both a title and description.')
      return
    }

    addNotice(title.trim(), description.trim())
    navigate('/notice/all-notices')
  }

  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="mb-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate('/notice/all-notices')}
          className="rounded-md p-1.5 text-slate-500 hover:bg-white hover:text-brand-600"
          aria-label="Back"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h2 className="text-[16px] font-bold text-brand-600 sm:text-lg">Add Notice</h2>
          <p className="mt-0.5 text-[12.5px] text-surface-muted">Publish a new notice or announcement.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-xl2 border border-surface-border bg-white p-5 shadow-card sm:p-6">
        <label className="block">
          <span className="mb-1.5 block text-[13px] font-semibold text-surface-heading">Title</span>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Enter notice title"
            className="w-full rounded-lg border border-surface-border bg-slate-50/70 px-3 py-2 text-[13px] text-slate-700 placeholder:text-slate-400 outline-none transition-colors focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-[13px] font-semibold text-surface-heading">Description</span>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={5}
            placeholder="Enter notice description"
            className="w-full resize-y rounded-lg border border-surface-border bg-slate-50/70 px-3 py-2 text-[13px] text-slate-700 placeholder:text-slate-400 outline-none transition-colors focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100"
          />
        </label>

        {error && <p className="rounded-lg bg-rose-50 px-3 py-2 text-[12.5px] font-medium text-rose-600">{error}</p>}

        <div className="flex justify-end gap-2.5 pt-1">
          <button
            type="button"
            onClick={() => navigate('/notice/all-notices')}
            className="rounded-lg border border-surface-border px-3.5 py-2 text-[13px] font-semibold text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-brand-600 px-3.5 py-2 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
          >
            Add Notice
          </button>
        </div>
      </form>
    </div>
  )
}
