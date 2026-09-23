import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ImageOff, Plus, Trash2 } from 'lucide-react'
import type { GalleryItem } from '../../types'
import { getGalleryItems, deleteGalleryItem } from '../../lib/galleryStore'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function AllMediaPage() {
  const [items, setItems] = useState<GalleryItem[]>(() => getGalleryItems())
  const [deleteId, setDeleteId] = useState<string | null>(null)

  function confirmDelete() {
    if (deleteId) {
      setItems(deleteGalleryItem(deleteId))
      setDeleteId(null)
    }
  }

  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-4 sm:space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-[18px] font-bold text-brand-600 sm:text-xl">Gallery</h2>
          <p className="mt-0.5 text-[12.5px] text-surface-muted">
            {items.length} photo{items.length === 1 ? '' : 's'} in your media library
          </p>
        </div>
        <Link
          to="/gallery/upload"
          className="flex items-center gap-1.5 rounded-lg bg-brand-600 px-3.5 py-2 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
        >
          <Plus size={16} />
          Upload
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl2 border border-dashed border-surface-border bg-white p-10 text-center">
          <ImageOff className="mx-auto text-slate-300" size={28} />
          <p className="mt-2 text-[13.5px] font-medium text-surface-heading">No photos yet</p>
          <p className="mt-1 text-[12.5px] text-surface-muted">
            Upload your first photo to see it appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="group overflow-hidden rounded-xl2 border border-surface-border bg-white shadow-card"
            >
              <div className="relative aspect-square overflow-hidden bg-slate-100">
                <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" />
                <button
                  onClick={() => setDeleteId(item.id)}
                  className="absolute right-2 top-2 rounded-md bg-white/90 p-1.5 text-slate-500 opacity-0 shadow-sm transition-opacity hover:bg-rose-50 hover:text-rose-500 group-hover:opacity-100"
                  aria-label="Delete photo"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <div className="p-3">
                <p className="truncate text-[12.5px] font-semibold text-surface-heading">
                  {item.title}
                </p>
                <div className="mt-1 flex items-center justify-between">
                  <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10.5px] font-semibold text-brand-600">
                    {item.category}
                  </span>
                  <span className="text-[10.5px] text-surface-muted">
                    {formatDate(item.uploadedAt)}
                  </span>
                </div>
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
            <h3 className="text-[14.5px] font-bold text-surface-heading">Delete this photo?</h3>
            <p className="mt-1.5 text-[13px] text-surface-muted">
              This can't be undone. The photo will be permanently removed.
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
