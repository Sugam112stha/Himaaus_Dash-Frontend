import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Props {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
}

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}: Props) {
  const start = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1
  const end = Math.min(currentPage * itemsPerPage, totalItems)

  return (
    <div className="flex items-center justify-between border-t border-surface-border px-5 py-3.5 bg-white">
      <p className="text-xs text-slate-400">
        Showing {start}–{end} of {totalItems} results
      </p>
      <div className="flex items-center gap-1">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 disabled:opacity-40"
        >
          <ChevronLeft size={16} />
        </button>
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => onPageChange(i + 1)}
            className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold transition-all ${
              currentPage === i + 1
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => onPageChange(currentPage + 1)}
          className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 disabled:opacity-40"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}
