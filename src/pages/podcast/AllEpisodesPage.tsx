// The "All Episodes" page. Shows every episode that's been added, each
// with its video playable right in the card, newest first.

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Trash2 } from 'lucide-react'
import type { PodcastEpisode } from '../../types'
import { getEpisodes, deleteEpisode } from '../../lib/podcastStore'
import { getVideoInfo } from '../../lib/videoLink'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function EpisodePlayer({ episode }: { episode: PodcastEpisode }) {
  const info = getVideoInfo(episode.videoUrl)

  if (info.kind === 'direct' && info.embedUrl) {
    return <video src={info.embedUrl} controls className="aspect-video w-full" />
  }

  if (info.embedUrl) {
    return (
      <iframe
        src={info.embedUrl}
        title={episode.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="aspect-video w-full"
      />
    )
  }

  // Fallback for a link we couldn't recognize — still show it as a link.
  return (
    <div className="flex aspect-video w-full items-center justify-center bg-slate-800 px-4 text-center text-[12.5px] text-slate-300">
      Couldn't preview this link — {episode.videoUrl}
    </div>
  )
}

export default function AllEpisodesPage() {
  const [episodes, setEpisodes] = useState<PodcastEpisode[]>(() => getEpisodes())
  const [deleteId, setDeleteId] = useState<string | null>(null)

  function confirmDelete() {
    if (deleteId) {
      setEpisodes(deleteEpisode(deleteId))
      setDeleteId(null)
    }
  }

  return (
    <div className="mx-auto w-full max-w-[1000px] space-y-4 sm:space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-[15px] font-bold text-surface-heading sm:text-base">
            All Episodes
          </h2>
          <p className="mt-0.5 text-[12.5px] text-surface-muted">
            {episodes.length} episode{episodes.length === 1 ? '' : 's'} published
          </p>
        </div>
        <Link
          to="/podcast/add-episode"
          className="flex items-center gap-1.5 rounded-lg bg-brand-600 px-3.5 py-2 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
        >
          <Plus size={16} />
          Add Episode
        </Link>
      </div>

      {episodes.length === 0 ? (
        <div className="rounded-xl2 border border-dashed border-surface-border bg-white p-10 text-center">
          <p className="text-[13.5px] font-medium text-surface-heading">No episodes yet</p>
          <p className="mt-1 text-[12.5px] text-surface-muted">
            Add your first episode to see it appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {episodes.map((episode) => (
            <div
              key={episode.id}
              className="overflow-hidden rounded-xl2 border border-surface-border bg-white shadow-card"
            >
              <EpisodePlayer episode={episode} />
              <div className="flex items-start justify-between gap-2 p-4">
                <div className="min-w-0">
                  <p className="truncate text-[13.5px] font-bold text-surface-heading">
                    {episode.title}
                  </p>
                  <p className="mt-0.5 text-[11.5px] text-surface-muted">
                    Added {formatDate(episode.addedAt)}
                  </p>
                </div>
                <button
                  onClick={() => setDeleteId(episode.id)}
                  className="shrink-0 rounded-md p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-500"
                  aria-label="Delete episode"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
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
            <h3 className="text-[14.5px] font-bold text-surface-heading">Delete this episode?</h3>
            <p className="mt-1.5 text-[13px] text-surface-muted">
              This can't be undone. The episode will be permanently removed.
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
