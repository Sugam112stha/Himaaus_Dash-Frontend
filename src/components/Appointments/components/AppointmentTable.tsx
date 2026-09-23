import { Eye, Pencil, Trash2, CheckCircle2 } from 'lucide-react'
import type { Applicant, Status } from '../types'
import Pagination from './Pagination'





interface Props {
  items: Applicant[]
  currentPage: number
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
  onView: (a: Applicant) => void
  onEdit: (a: Applicant) => void
  onDelete: (a: Applicant) => void
  onStatusChange: (id: number, status: Status) => void
}

export default function AppointmentTable({
  items,
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onView,
  onEdit,
  onDelete,
  onStatusChange,
}: Props) {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  return (
    <div className="overflow-hidden rounded-2xl border border-surface-border bg-white shadow-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px] text-left">
          <thead>
            <tr className="border-b border-surface-border bg-slate-50/60">
              <th className="py-3.5 pl-5 pr-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Applicant
              </th>
              <th className="px-3 py-3.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Program &amp; Degree
              </th>
              <th className="px-3 py-3.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Destination
              </th>
              <th className="px-3 py-3.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Test Prep
              </th>
              <th className="px-3 py-3.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Status
              </th>
              <th className="px-3 py-3.5 pr-5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-border">
            {items.length === 0 && (
              <tr>
                <td colSpan={6} className="py-12 text-center text-sm text-slate-400">
                  No appointments found.
                </td>
              </tr>
            )}
            {items.map((a, idx) => (
              <tr key={a.id} className="group transition-colors hover:bg-slate-50/50">
                {/* Applicant */}
                <td className="py-3.5 pl-5 pr-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-xs font-bold text-blue-600 yit-appt-avatar-${idx % 10}`}
                    >
                      {a.avatar}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-surface-heading">
                        {a.name}
                      </p>
                      <p className="truncate text-xs text-slate-400">{a.email}</p>
                    </div>
                  </div>
                </td>

                {/* Program */}
                <td className="px-3 py-3.5">
                  <p className="text-sm font-medium text-surface-heading">{a.program}</p>
                  <p className="text-xs text-slate-400">{a.degree}</p>
                </td>

                {/* Destination — flag only, no country code */}
                <td className="px-3 py-3.5">
                  <span className="text-sm font-medium text-slate-700">
                    {a.destination}
                  </span>
                </td>

                {/* Test Prep */}
                <td className="px-3 py-3.5">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-bold yit-appt-test-${a.testType.toLowerCase()}`}
                  >
                    {a.testType} {a.testScore}
                  </span>
                </td>

                {/* Status */}
                <td className="px-3 py-3.5">
                  <select
                    value={a.status}
                    onChange={(e) => onStatusChange(a.id, e.target.value as Status)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold border border-slate-200 outline-none cursor-pointer transition-colors shadow-sm focus:border-brand-300 focus:ring-1 focus:ring-brand-200 yit-appt-status-${a.status.toLowerCase()}`}
                  >
                    <option value="Confirmed" className="bg-white text-emerald-600 font-semibold">Confirmed</option>
                    <option value="Pending" className="bg-white text-amber-600 font-semibold">Pending</option>
                    <option value="Cancelled" className="bg-white text-red-500 font-semibold">Cancelled</option>
                  </select>
                </td>

                {/* Actions */}
                <td className="px-3 py-3.5 pr-5">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onView(a)}
                      className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-blue-50 hover:text-brand-600"
                      title="View"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => onEdit(a)}
                      className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-amber-50 hover:text-amber-600"
                      title="Edit"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(a)}
                      className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
      />
    </div>
  )
}
