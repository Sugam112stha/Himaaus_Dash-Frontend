import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Trash2 } from 'lucide-react'
import { getNotices, deleteNotice } from '../../lib/noticeStore'
import type { NoticeItem } from '../../types'

export default function AllNoticesPage() {
  const [notices, setNotices] = useState<NoticeItem[]>(() => getNotices())

  function handleDelete(id: string) {
    setNotices(deleteNotice(id))
  }

  return (
    <div className="mx-auto w-full max-w-[1100px] space-y-4 sm:space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-[18px] font-bold text-brand-600 sm:text-xl">All Notices</h2>
          <p className="mt-0.5 text-[12.5px] text-surface-muted">
            Manage announcements and notice board entries.
          </p>
        </div>
        <Link
          to="/notice/add-notice"
          className="flex items-center gap-1.5 rounded-lg bg-brand-600 px-3.5 py-2 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
        >
          <Plus size={16} />
          Add Notice
        </Link>
      </div>

      {notices.length === 0 ? (
        <div className="rounded-xl2 border border-dashed border-surface-border bg-white p-10 text-center">
          <p className="text-[13.5px] font-medium text-surface-heading">No notices yet</p>
          <p className="mt-1 text-[12.5px] text-surface-muted">
            Add your first notice to see it listed here.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl2 border border-surface-border bg-white shadow-card">
          <ul className="divide-y divide-surface-border">
            {notices.map((notice) => (
              <li key={notice.id} className="p-5">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div className="min-w-0">
                    <p className="text-[14px] font-semibold text-surface-heading">{notice.title}</p>
                    <p className="mt-2 text-[13px] leading-6 text-slate-600">{notice.description}</p>
                    <p className="mt-2 text-[12px] text-slate-400">Published on {notice.createdAt}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDelete(notice.id)}
                    className="mt-3 inline-flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-[13px] font-semibold text-rose-600 hover:bg-rose-100 md:mt-0"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
