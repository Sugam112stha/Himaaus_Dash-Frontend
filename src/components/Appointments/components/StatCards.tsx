import { CalendarDays, AlertTriangle, Clock } from 'lucide-react'

interface Props {
  total: number
  pending: number
  confirmed: number
}

export default function StatCards({ total, pending, confirmed }: Props) {
  const remaining = Math.max(0, 30 - confirmed)

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {/* Total Bookings */}
      <div className="relative overflow-hidden rounded-2xl border border-surface-border bg-white p-5 shadow-card">
        <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
          Total Bookings
        </p>
        <p className="mt-2 text-4xl font-extrabold text-surface-heading">
          {total.toLocaleString()}
        </p>
        <div className="absolute -bottom-3 -right-3 grid grid-cols-4 gap-2 opacity-[0.06]">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="h-3 w-3 rounded-sm bg-slate-800" />
          ))}
        </div>
      </div>

      {/* Pending Review */}
      <div className="relative overflow-hidden rounded-2xl border border-surface-border bg-white p-5 shadow-card">
        <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
          Pending Review
        </p>
        <p className={`mt-2 text-4xl font-extrabold ${pending > 5 ? 'text-red-600' : 'text-brand-600'}`}>
          {pending}
        </p>
        {pending > 5 && (
          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-500">
            <AlertTriangle size={13} /> Requires immediate action
          </p>
        )}
        <div className="absolute -bottom-4 -right-4 opacity-[0.04]">
          <CalendarDays size={80} className="text-slate-800" />
        </div>
      </div>

      {/* Confirmed Today */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-5 text-white shadow-lg shadow-brand-600/20">
        <p className="text-[11px] font-bold uppercase tracking-widest text-blue-200">
          Confirmed Today
        </p>
        <p className="mt-2 text-4xl font-extrabold">{confirmed}</p>
        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-blue-200">
          <Clock size={13} /> {remaining} slots remaining for today
        </p>
      </div>
    </div>
  )
}
