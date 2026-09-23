import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { CalendarDays, ImagePlus } from 'lucide-react'
import { addEvent } from '../../lib/eventStore'

export default function AddEventPage() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [error, setError] = useState('')

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setImageUrl(reader.result as string)
    reader.readAsDataURL(file)
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!title.trim() || !date) {
      setError('Please add a title and a date.')
      return
    }

    addEvent({
      title: title.trim(),
      description: description.trim(),
      date,
      location: location.trim(),
      imageUrl,
    })

    // A future date belongs on Upcoming; a past date belongs on Past Events.
    const isFuture = date >= new Date().toISOString().slice(0, 10)
    navigate(isFuture ? '/events/upcoming' : '/events/past-events')
  }

  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="mb-4">
        <h2 className="text-[18px] font-bold text-brand-600 sm:text-xl">Add Event</h2>
        <p className="mt-0.5 text-[12.5px] text-surface-muted">
          It'll automatically show up under Upcoming or Past Events based on its date.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl2 border border-surface-border bg-white p-5 shadow-card sm:p-6"
      >
        <label className="block">
          <span className="mb-1.5 block text-[13px] font-semibold text-surface-heading">
            Event Title
          </span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Australia Study Fair 2026"
            className="w-full rounded-lg border border-surface-border bg-slate-50/70 px-3 py-2 text-[13px] text-slate-700 placeholder:text-slate-400 outline-none transition-colors focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100"
          />
        </label>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-[13px] font-semibold text-surface-heading">
              Date
            </span>
            <span className="relative block">
              <CalendarDays
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-lg border border-surface-border bg-slate-50/70 py-2 pl-9 pr-3 text-[13px] text-slate-700 outline-none transition-colors focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100"
              />
            </span>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-[13px] font-semibold text-surface-heading">
              Location
            </span>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Kathmandu Office"
              className="w-full rounded-lg border border-surface-border bg-slate-50/70 px-3 py-2 text-[13px] text-slate-700 placeholder:text-slate-400 outline-none transition-colors focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100"
            />
          </label>
        </div>

        <label className="block">
          <span className="mb-1.5 block text-[13px] font-semibold text-surface-heading">
            Description
          </span>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What's this event about?"
            className="w-full resize-none rounded-lg border border-surface-border bg-slate-50/70 px-3 py-2 text-[13px] leading-relaxed text-slate-700 placeholder:text-slate-400 outline-none transition-colors focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-[13px] font-semibold text-surface-heading">
            Cover Image (optional)
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full rounded-lg border border-surface-border bg-slate-50/70 text-[13px] text-slate-700 file:mr-3 file:rounded-md file:border-0 file:bg-brand-50 file:px-3 file:py-2 file:text-[12.5px] file:font-semibold file:text-brand-600 hover:file:bg-brand-100"
          />
        </label>

        {imageUrl && (
          <img
            src={imageUrl}
            alt="Preview"
            className="aspect-video w-full rounded-lg border border-surface-border object-cover"
          />
        )}
        {!imageUrl && (
          <div className="flex aspect-video w-full items-center justify-center rounded-lg border border-dashed border-surface-border bg-slate-50 text-slate-300">
            <ImagePlus size={28} />
          </div>
        )}

        {error && (
          <p className="rounded-lg bg-rose-50 px-3 py-2 text-[12.5px] font-medium text-rose-600">
            {error}
          </p>
        )}

        <div className="flex justify-end gap-2.5 pt-1">
          <button
            type="button"
            onClick={() => navigate('/events/upcoming')}
            className="rounded-lg border border-surface-border px-3.5 py-2 text-[13px] font-semibold text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-brand-600 px-3.5 py-2 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
          >
            Add Event
          </button>
        </div>
      </form>
    </div>
  )
}
