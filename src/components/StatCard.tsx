import type { StatCardData } from '../types'

export default function StatCard({ label, value, icon: Icon, iconBg, iconColor }: StatCardData) {
  return (
    <div className="group rounded-xl2 border border-surface-border bg-white p-4 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/60 sm:p-5">
      <div
        className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg transition-transform duration-200 group-hover:scale-105 ${iconBg}`}
      >
        <Icon size={19} className={iconColor} strokeWidth={2} />
      </div>
      <p className="truncate text-[12.5px] text-slate-500 sm:text-[13px]">{label}</p>
      <p className="mt-1 text-[21px] font-bold tracking-tight text-surface-heading sm:text-[24px]">{value}</p>
    </div>
  )
}
