import { Filter } from 'lucide-react'
import { INQUIRY_SUBJECTS } from '../types'

interface Props {
  value: string
  onChange: (v: string) => void
}

export default function SubjectFilter({ value, onChange }: Props) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5 sm:pl-3">
        <Filter size={13} className="text-slate-400" />
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="cursor-pointer appearance-none rounded-lg border border-surface-border bg-white py-1.5 sm:py-2 pl-8 sm:pl-9 pr-6 sm:pr-8 text-xs font-semibold text-slate-600 shadow-sm outline-none transition-colors hover:bg-slate-50 focus:border-brand-300 focus:ring-2 focus:ring-brand-100"
      >
        <option value="All">All Subjects</option>
        {INQUIRY_SUBJECTS.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-2.5">
        <svg
          className="h-3.5 w-3.5 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  )

}
