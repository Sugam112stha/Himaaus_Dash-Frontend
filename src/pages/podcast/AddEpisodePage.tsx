// The "Add Episode" page. On purpose, this form only asks for two things:
// a title (so it's identifiable in the list) and a video link. Paste a
// YouTube, Vimeo, or direct video URL — nothing else to fill in.

import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link2 } from 'lucide-react'
import { addEpisode } from '../../lib/podcastStore'
import { getVideoInfo } from '../../lib/videoLink'

export default function AddEpisodePage() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [error, setError] = useState('')

  const preview = videoUrl.trim() ? getVideoInfo(videoUrl) : null

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (!title.trim() || !videoUrl.trim()) {
      setError('Please add both a title and a video link.')
      return
    }

    const info = getVideoInfo(videoUrl)
    if (info.kind === 'unknown') {
      setError("That doesn't look like a valid YouTube, Vimeo, or video file link.")
      return
    }

    addEpisode(title.trim(), videoUrl.trim())
    // Take the user straight to the list so they can see it was added.
    navigate('/podcast/all-episodes')
  }

  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="mb-4">
        <h2 className="text-[15px] font-bold text-surface-heading sm:text-base">Add Episode</h2>
        <p className="mt-0.5 text-[12.5px] text-surface-muted">
          Paste a video link and give it a title — that's all you need.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl2 border border-surface-border bg-white p-5 shadow-card sm:p-6"
      >
        <label className="block">
          <span className="mb-1.5 block text-[13px] font-semibold text-surface-heading">
            Episode Title
          </span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Studying in Australia: What to Expect"
            className="w-full rounded-lg border border-surface-border bg-slate-50/70 px-3 py-2 text-[13px] text-slate-700 placeholder:text-slate-400 outline-none transition-colors focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-[13px] font-semibold text-surface-heading">
            Video Link
          </span>
          <span className="relative block">
            <Link2
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
              className="w-full rounded-lg border border-surface-border bg-slate-50/70 py-2 pl-9 pr-3 text-[13px] text-slate-700 placeholder:text-slate-400 outline-none transition-colors focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100"
            />
          </span>
          <span className="mt-1.5 block text-[11.5px] text-surface-muted">
            Works with YouTube, Vimeo, or a direct video file link (.mp4, .webm).
          </span>
        </label>

        {/* Live preview once a recognizable link is pasted */}
        {preview && preview.kind !== 'unknown' && preview.embedUrl && (
          <div className="overflow-hidden rounded-lg border border-surface-border bg-black">
            {preview.kind === 'direct' ? (
              <video src={preview.embedUrl} controls className="aspect-video w-full" />
            ) : (
              <iframe
                src={preview.embedUrl}
                title="Video preview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="aspect-video w-full"
              />
            )}
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
            onClick={() => navigate('/podcast/all-episodes')}
            className="rounded-lg border border-surface-border px-3.5 py-2 text-[13px] font-semibold text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-brand-600 px-3.5 py-2 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
          >
            Add Episode
          </button>
        </div>
      </form>
    </div>
  )
}


