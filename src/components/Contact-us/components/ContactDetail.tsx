import { MapPin, Mail, Tag, Phone, MessageSquare, ArrowLeft } from 'lucide-react'
import { Archive } from 'lucide-react'
import { initials, subjectClassName } from '../data'
import type { Contact } from '../types'
import ContactActionMenu from './ContactActionMenu'

interface Props {
  contact: Contact | null
  onArchive: (id: number) => void
  onDelete: (contact: Contact) => void
  onEdit: (contact: Contact) => void
  onBackToList?: () => void
}

export default function ContactDetail({
  contact,
  onArchive,
  onDelete,
  onEdit,
  onBackToList,
}: Props) {
  if (!contact) {
    return (
      <div className="flex flex-1 items-center justify-center bg-white p-8">
        <div className="text-center">
          <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
            <MessageSquare size={28} className="text-slate-300" />
          </div>
          <p className="text-sm font-medium text-slate-400">
            Select a contact to view details
          </p>
        </div>
      </div>
    )
  }

  const ini = initials(contact.name)

  return (
    <div className="flex flex-1 flex-col h-full bg-white min-h-0">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-surface-border px-6 py-5">
        <div className="flex items-center gap-4">
          {onBackToList && (
            <button
              onClick={onBackToList}
              className="mr-1 rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 lg:hidden xl:hidden"
              title="Back to list"
            >
              <ArrowLeft size={18} />
            </button>
          )}

          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-200 text-lg font-bold text-brand-600 shadow-sm">
              {ini}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-surface-heading leading-tight break-all">
              {contact.name}
            </h2>
            {/* Info row */}
            <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <MapPin size={12} className="text-brand-500" />
                {contact.location}
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1">
                <Mail size={12} className="text-brand-500" />
                {contact.email}
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1">
                <Phone size={12} className="text-brand-500" />
                {contact.phone}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Archive quick button */}
          <button
            onClick={() => onArchive(contact.id)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
            title={contact.isArchived ? 'Unarchive' : 'Archive'}
          >
            <Archive size={18} />
          </button>

          {/* Three-dot menu */}
          <ContactActionMenu
            onArchive={() => onArchive(contact.id)}
            onDelete={() => onDelete(contact)}
            onEdit={() => onEdit(contact)}
            isArchived={contact.isArchived}
          />
        </div>
      </div>

      {/* Scrollable details body */}
      <div className="scrollbar-thin flex-1 overflow-y-auto px-6 py-4 space-y-4 min-h-0">
        {/* Subject badge */}
        <div>
          <span
            className={`yit-contact-subject-${subjectClassName(contact.subject)} inline-block rounded-md px-2.5 py-1 text-xs font-semibold`}
          >
            Subject: {contact.subject}
          </span>
          {contact.isArchived && (
            <span className="ml-2 inline-block rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500">
              Archived
            </span>
          )}
        </div>

        {/* Message section */}
        <div className="rounded-xl border border-surface-border bg-slate-50/50 p-5 min-h-[150px] h-auto">
          <div className="mb-3 flex items-center gap-2">
            <MessageSquare size={15} className="text-slate-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Message
            </span>
          </div>
          <p className="whitespace-pre-line text-sm leading-relaxed text-slate-600 break-words font-medium">
            {contact.message}
          </p>
        </div>
      </div>
    </div>
  )
}
