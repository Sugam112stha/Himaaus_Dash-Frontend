import { Mail, Archive, Plus } from 'lucide-react'
import SubjectFilter from './SubjectFilter'

interface Props {
  mailFilter: 'all' | 'unread' | 'archived'
  setMailFilter: (filter: 'all' | 'unread' | 'archived') => void
  subjectFilter: string
  setSubjectFilter: (subject: string) => void
  unreadCount: number
  archivedCount: number
  onAddNewContact: () => void
}

export default function ContactHeader({
  mailFilter,
  setMailFilter,
  subjectFilter,
  setSubjectFilter,
  unreadCount,
  archivedCount,
  onAddNewContact,
}: Props) {
  return (
    <div className="mb-4 flex flex-col md:flex-row md:items-center justify-between gap-3 px-1">
      <h1 className="text-xl font-bold text-surface-heading">
        Contact Management
      </h1>

      <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full md:w-auto">
        {/* All Mail button */}
        <button
          onClick={() => {
            setMailFilter('all')
            setSubjectFilter('All')
          }}
          className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 sm:px-3.5 sm:py-2 text-xs font-semibold shadow-sm transition-colors ${
            mailFilter === 'all'
              ? 'border-brand-300 bg-brand-50 text-brand-700'
              : 'border-surface-border bg-white text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Mail size={13} />
          All Mail
        </button>

        {/* Unread button */}
        <button
          onClick={() => {
            setMailFilter('unread')
          }}
          className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 sm:px-3.5 sm:py-2 text-xs font-semibold shadow-sm transition-colors ${
            mailFilter === 'unread'
              ? 'border-brand-300 bg-brand-50 text-brand-700'
              : 'border-surface-border bg-white text-slate-600 hover:bg-slate-50'
          }`}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          Unread
          {unreadCount > 0 && (
            <span className="ml-0.5 rounded-full bg-red-50 px-1.5 py-0.5 text-[10px] font-bold text-red-600">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Subject filter */}
        <SubjectFilter value={subjectFilter} onChange={setSubjectFilter} />

        {/* Archive toggle */}
        <button
          onClick={() => {
            setMailFilter('archived')
          }}
          className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 sm:px-3.5 sm:py-2 text-xs font-semibold shadow-sm transition-colors ${
            mailFilter === 'archived'
              ? 'border-brand-300 bg-brand-50 text-brand-700'
              : 'border-surface-border bg-white text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Archive size={13} />
          Archived
          {archivedCount > 0 && (
            <span className="ml-0.5 rounded-full bg-brand-100 px-1.5 py-0.5 text-[10px] font-bold text-brand-700">
              {archivedCount}
            </span>
          )}
        </button>

        {/* Add new button */}
        <button
          onClick={onAddNewContact}
          className="flex items-center gap-1.5 rounded-lg sm:rounded-xl bg-brand-600 px-3 py-1.5 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md shadow-brand-600/20 transition-all hover:bg-brand-700 hover:shadow-lg"
        >
          <Plus size={14} className="shrink-0" />
          <span className="hidden sm:inline">Add New Contact</span>
          <span className="inline sm:hidden">Add Contact</span>
        </button>
      </div>
    </div>
  )
}
