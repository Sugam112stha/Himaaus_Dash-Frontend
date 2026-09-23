import { useState, useRef, useEffect } from 'react'
import { MoreVertical, Archive, Trash2, Pencil } from 'lucide-react'

interface Props {
  onArchive: () => void
  onDelete: () => void
  onEdit: () => void
  isArchived: boolean
}

export default function ContactActionMenu({
  onArchive,
  onDelete,
  onEdit,
  isArchived,
}: Props) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
        aria-label="Contact actions"
      >
        <MoreVertical size={18} />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-20 mt-1 w-44 overflow-hidden rounded-xl border border-surface-border bg-white shadow-xl animate-in fade-in">
          <button
            onClick={() => {
              onEdit()
              setOpen(false)
            }}
            className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-sm text-slate-600 transition-colors hover:bg-slate-50"
          >
            <Pencil size={15} className="text-slate-400" />
            Edit
          </button>
          <button
            onClick={() => {
              onArchive()
              setOpen(false)
            }}
            className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-sm text-slate-600 transition-colors hover:bg-slate-50"
          >
            <Archive size={15} className="text-slate-400" />
            {isArchived ? 'Unarchive' : 'Archive'}
          </button>
          <div className="mx-2 border-t border-surface-border" />
          <button
            onClick={() => {
              onDelete()
              setOpen(false)
            }}
            className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-sm text-red-500 transition-colors hover:bg-red-50"
          >
            <Trash2 size={15} />
            Delete
          </button>
        </div>
      )}
    </div>
  )
}
