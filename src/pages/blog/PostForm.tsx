import { useRef, useState, type FormEvent } from 'react'
import { Upload } from 'lucide-react'
import RichTextEditor from '../../components/RichTextEditor'
import type { PostInput } from '../../lib/blogStore'
import type { BlogPost } from '../../types'

const CATEGORIES = ['Educational', 'general', 'Visa', 'Scholarship', 'Events']

interface PostFormProps {
  initial?: BlogPost
  submitLabel: string
  onSubmit: (input: PostInput) => void
  onCancel: () => void
}

export default function PostForm({ initial, submitLabel, onSubmit, onCancel }: PostFormProps) {
  const [title, setTitle] = useState(initial?.title ?? '')
  const [link, setLink] = useState(initial?.link ?? '')
  const [author, setAuthor] = useState(initial?.author ?? '')
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? '')
  const [longDescription, setLongDescription] = useState(initial?.longDescription ?? '')
  const [category, setCategory] = useState(initial?.category ?? '')
  const [image, setImage] = useState(initial?.image ?? '')
  const [status, setStatus] = useState<'draft' | 'published'>(initial?.status ?? 'draft')
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleImagePick(file: File | undefined) {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setImage(reader.result as string)
    reader.readAsDataURL(file)
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!title.trim()) {
      setError('Please enter a blog post title.')
      return
    }
    onSubmit({
      title: title.trim(),
      link: link.trim(),
      author: author.trim(),
      excerpt: excerpt.trim(),
      longDescription,
      category,
      image,
      status,
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-xl2 border border-surface-border bg-white p-5 shadow-card sm:p-6"
    >
      <div>
        <h3 className="text-[14.5px] font-bold text-surface-heading">Post Details</h3>
        <p className="mt-0.5 text-[12.5px] text-surface-muted">
          Fill in the information for your new blog post
        </p>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-[13px] font-semibold text-surface-heading">Title</span>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter blog post title"
          className="w-full rounded-lg border border-surface-border bg-slate-50/70 px-3 py-2 text-[13px] text-slate-700 placeholder:text-slate-400 outline-none transition-colors focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100"
        />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-[13px] font-semibold text-surface-heading">Link</span>
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Enter blog post link"
          className="w-full rounded-lg border border-surface-border bg-slate-50/70 px-3 py-2 text-[13px] text-slate-700 placeholder:text-slate-400 outline-none transition-colors focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100"
        />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-[13px] font-semibold text-surface-heading">Author</span>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Enter author name"
          className="w-full rounded-lg border border-surface-border bg-slate-50/70 px-3 py-2 text-[13px] text-slate-700 placeholder:text-slate-400 outline-none transition-colors focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100"
        />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-[13px] font-semibold text-surface-heading">Excerpt</span>
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Brief description of the post"
          rows={3}
          className="w-full resize-y rounded-lg border border-surface-border bg-slate-50/70 px-3 py-2 text-[13px] text-slate-700 placeholder:text-slate-400 outline-none transition-colors focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100"
        />
      </label>

      <div>
        <span className="mb-1.5 block text-[13px] font-semibold text-surface-heading">
          Long Description
        </span>
        <RichTextEditor value={longDescription} onChange={setLongDescription} placeholder="Write the full post content..." />
      </div>

      <label className="block">
        <span className="mb-1.5 block text-[13px] font-semibold text-surface-heading">Category</span>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-lg border border-surface-border bg-slate-50/70 px-3 py-2 text-[13px] text-slate-700 outline-none transition-colors focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100"
        >
          <option value="">Select category</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <div>
        <span className="mb-1.5 block text-[13px] font-semibold text-surface-heading">Image</span>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleImagePick(e.target.files?.[0])}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-surface-border bg-slate-50/40 py-10 text-center hover:bg-slate-50"
        >
          {image ? (
            <img src={image} alt="Preview" className="h-32 w-auto rounded-md object-cover" />
          ) : (
            <>
              <Upload size={20} className="text-slate-400" />
              <span className="text-[13px] font-medium text-slate-600">Click to upload image</span>
              <span className="text-[11.5px] text-surface-muted">Recommended: 384 × 256 pixels</span>
            </>
          )}
        </button>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-[13px] font-semibold text-surface-heading">Status</span>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
          className="w-full rounded-lg border border-surface-border bg-slate-50/70 px-3 py-2 text-[13px] text-slate-700 outline-none transition-colors focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </label>

      {error && (
        <p className="rounded-lg bg-rose-50 px-3 py-2 text-[12.5px] font-medium text-rose-600">{error}</p>
      )}

      <div className="flex justify-end gap-2.5 pt-1">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-2 text-[13px] font-semibold text-rose-600 hover:bg-rose-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-lg bg-brand-400 px-4 py-2 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-brand-600"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  )
}
