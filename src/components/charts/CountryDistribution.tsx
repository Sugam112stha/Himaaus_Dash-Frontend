import { MapPin } from 'lucide-react'
import { countryStats } from '../../data'

export default function CountryDistribution() {
  return (
    <div className="rounded-xl2 border border-surface-border bg-white p-4 shadow-card transition-shadow hover:shadow-md sm:p-5">
      <h2 className="text-[14.5px] font-bold text-surface-heading sm:text-[15px]">Country-wise Student Distribution</h2>
      <p className="mb-5 text-[12.5px] text-slate-400 sm:text-[13px]">Students by destination country</p>

      <ul className="space-y-4">
        {countryStats.map((c) => (
          <li key={c.country} className="flex flex-wrap items-center gap-3 sm:flex-nowrap">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <MapPin size={16} strokeWidth={2.25} />
            </div>
            <div className="min-w-[84px] flex-1 sm:min-w-[92px] sm:flex-none">
              <p className="text-[13.5px] font-semibold text-surface-heading">{c.country}</p>
              <p className="text-[12px] text-slate-400">{c.students} Students</p>
            </div>
            <div className="flex w-full items-center gap-3 sm:w-auto sm:flex-1">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-600 transition-all duration-500"
                  style={{ width: `${c.percent}%` }}
                />
              </div>
              <span className="w-9 shrink-0 text-right text-[12.5px] font-semibold text-slate-500">
                {c.percent}%
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
