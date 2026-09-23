import { initials, subjectClassName } from '../data'
import type { Contact } from '../types'

interface Props {
  contacts: Contact[]
  selectedId: number | null
  onSelect: (contact: Contact) => void
  resultCount: number
}

export default function ContactList({
  contacts,
  selectedId,
  onSelect,
  resultCount,
}: Props) {
  return (
    <div className="flex h-full flex-col border-r border-surface-border bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-surface-border px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Priority Queue
          </span>
        </div>
        <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand-600">
          {resultCount} Found
        </span>
      </div>

      {/* Scrollable list */}
      <div className="scrollbar-thin flex-1 overflow-y-auto h-[714px] max-h-[714px]">
        {contacts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-sm text-slate-400">No contacts found</p>
          </div>
        )}

        {contacts.map((contact) => {
          const isActive = contact.id === selectedId
          const isUnread = !contact.isRead

          return (
            <button
              key={contact.id}
              onClick={() => onSelect(contact)}
              className={`group relative w-full border-b border-surface-border px-4 py-3.5 text-left transition-all ${
                isActive
                  ? 'border-l-[3px] border-l-brand-600 bg-brand-50/40 hover:bg-brand-50/60'
                  : 'border-l-[3px] border-l-transparent bg-white hover:bg-slate-50/80'
              }`}
            >
              {/* Name row */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[10px] font-bold ${
                      isUnread
                        ? 'bg-red-50 text-red-600 font-extrabold'
                        : 'bg-slate-200 text-brand-600'
                    }`}
                  >
                    {initials(contact.name)}
                  </div>
                  <div className="min-w-0 flex items-center gap-1.5">
                    <p
                      className={`truncate text-sm ${
                        isUnread
                          ? 'font-bold text-slate-950'
                          : 'font-semibold text-slate-700'
                      } group-hover:text-slate-950`}
                    >
                      {contact.name}
                    </p>
                    {isUnread && (
                      <span className="h-2 w-2 shrink-0 rounded-full bg-red-500" />
                    )}
                  </div>
                </div>
                <span
                  className={`shrink-0 text-[11px] ${
                    isUnread ? 'font-medium text-slate-500' : 'text-slate-400'
                  }`}
                >
                  {contact.createdAt}
                </span>
              </div>

              {/* Subject badge */}
              <div className="mt-1.5 ml-9">
                <span
                  className={`yit-contact-subject-${subjectClassName(
                    contact.subject
                  )} inline-block rounded px-1.5 py-0.5 text-[10px] ${
                    isUnread ? 'font-bold shadow-sm' : 'font-semibold'
                  }`}
                >
                  Subject: {contact.subject}
                </span>
              </div>

              {/* Message preview */}
              <p
                className={`mt-1 ml-9 truncate text-xs italic ${
                  isUnread
                    ? 'font-medium text-slate-700'
                    : 'text-slate-400 font-normal'
                }`}
              >
                "{contact.message.slice(0, 60)}..."
              </p>

              {/* Archived indicator */}
              {contact.isArchived && (
                <span className="mt-1.5 ml-9 inline-block rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-500">
                  Archived
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
