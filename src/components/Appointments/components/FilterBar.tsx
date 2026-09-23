import { Plus } from 'lucide-react'
import { DESTINATIONS } from '../data'

const STATUS_FILTERS = ['All', 'Confirmed', 'Pending', 'Cancelled'] as const

interface Props {
  activeFilter: string
  onFilterChange: (f: string) => void
  selectedCountry: string
  onCountryChange: (c: string) => void
  onAddNew: () => void
}

export default function FilterBar({
  activeFilter,
  onFilterChange,
  selectedCountry,
  onCountryChange,
  onAddNew,
}: Props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-wrap items-center gap-3">
        {/* Status pills */}
        <div className="flex items-center gap-1 rounded-full border border-surface-border bg-white p-1 shadow-sm">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => onFilterChange(f)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${activeFilter === f
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Country dropdown */}
        <select
          value={selectedCountry}
          onChange={(e) => onCountryChange(e.target.value)}
          className="flex items-center gap-2 rounded-lg border border-surface-border bg-white px-3.5 py-2 text-xs font-medium text-slate-600 shadow-sm outline-none transition-colors hover:bg-slate-50 cursor-pointer"
        >
          <option value="All">All Countries</option>
          {Object.keys(DESTINATIONS).map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>

      </div>

      {/* Add button */}
      <button
        onClick={onAddNew}
        className="flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-600/20 transition-all hover:bg-brand-700 hover:shadow-lg"
      >
        <Plus size={16} /> Manual Add
      </button>
    </div>
  )
}

