import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { ImagePlus } from 'lucide-react'
import { addGalleryItem } from '../../lib/galleryStore'

const CATEGORIES = ['Campus', 'Events', 'Students', 'Staff', 'Other']

export default function UploadPage() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [error, setError] = useState('')

  // Read the chosen photo as a data URL so we can preview and store it
  // without a server to upload it to.
  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setImageUrl(reader.result as string)
    reader.readAsDataURL(file)
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!title.trim() || !imageUrl) {
      setError('Please add a title and choose a photo.')
      return
    }
    addGalleryItem({ title: title.trim(), category, imageUrl })
    navigate('/gallery/all-media')
  }

  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="mb-4">
        <h2 className="text-[18px] font-bold text-brand-600 sm:text-xl">Upload Photo</h2>
        <p className="mt-0.5 text-[12.5px] text-surface-muted">
          Add a new photo to the gallery.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl2 border border-surface-border bg-white p-5 shadow-card sm:p-6"
      >
        <label className="block">
          <span className="mb-1.5 block text-[13px] font-semibold text-surface-heading">
            Title
          </span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Orientation Day 2026"
            className="w-full rounded-lg border border-surface-border bg-slate-50/70 px-3 py-2 text-[13px] text-slate-700 placeholder:text-slate-400 outline-none transition-colors focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-[13px] font-semibold text-surface-heading">
            Category
          </span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg border border-surface-border bg-slate-50/70 px-3 py-2 text-[13px] text-slate-700 outline-none transition-colors focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-[13px] font-semibold text-surface-heading">
            Photo
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full rounded-lg border border-surface-border bg-slate-50/70 text-[13px] text-slate-700 file:mr-3 file:rounded-md file:border-0 file:bg-brand-50 file:px-3 file:py-2 file:text-[12.5px] file:font-semibold file:text-brand-600 hover:file:bg-brand-100"
          />
        </label>

        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Preview"
            className="aspect-video w-full rounded-lg border border-surface-border object-cover"
          />
        ) : (
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
            onClick={() => navigate('/gallery/all-media')}
            className="rounded-lg border border-surface-border px-3.5 py-2 text-[13px] font-semibold text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-brand-600 px-3.5 py-2 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  )
}
