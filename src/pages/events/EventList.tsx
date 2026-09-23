// Shared by both the "Upcoming" and "Past Events" pages, since they show
// the same kind of card — just a different, already-filtered list of
// events passed in as a prop.

import { CalendarDays, MapPin, Trash2 } from 'lucide-react'
import type { EventItem } from '../../types'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

interface EventListProps {
  events: EventItem[]
  emptyTitle: string
  emptyHint: string
  onDelete: (id: string) => void
}

export default function EventList({ events, emptyTitle, emptyHint, onDelete }: EventListProps) {
  if (events.length === 0) {
    return (
      <div className="rounded-xl2 border border-dashed border-surface-border bg-white p-10 text-center">
        <CalendarDays className="mx-auto text-slate-300" size={28} />
        <p className="mt-2 text-[13.5px] font-medium text-surface-heading">{emptyTitle}</p>
        <p className="mt-1 text-[12.5px] text-surface-muted">{emptyHint}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {events.map((event) => (
        <div
          key={event.id}
          className="overflow-hidden rounded-xl2 border border-surface-border bg-white shadow-card"
        >
          {event.imageUrl ? (
            <img src={event.imageUrl} alt={event.title} className="aspect-video w-full object-cover" />
          ) : (
            <div className="flex aspect-video w-full items-center justify-center bg-slate-100 text-slate-300">
              <CalendarDays size={26} />
            </div>
          )}

          <div className="p-4">
            <div className="flex items-start justify-between gap-2">
              <p className="text-[14px] font-bold text-surface-heading">{event.title}</p>
              <button
                onClick={() => onDelete(event.id)}
                className="shrink-0 rounded-md p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-500"
                aria-label="Delete event"
              >
                <Trash2 size={15} />
              </button>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-surface-muted">
              <span className="flex items-center gap-1.5">
                <CalendarDays size={13} />
                {formatDate(event.date)}
              </span>
              {event.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin size={13} />
                  {event.location}
                </span>
              )}
            </div>

            {event.description && (
              <p className="mt-2.5 text-[13px] leading-relaxed text-slate-600">
                {event.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
