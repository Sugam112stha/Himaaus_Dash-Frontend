import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import type { EventItem } from '../../types'
import { getUpcomingEvents, deleteEvent } from '../../lib/eventStore'
import EventList from './EventList'

export default function UpcomingEventsPage() {
  const [events, setEvents] = useState<EventItem[]>(() => getUpcomingEvents())

  function handleDelete(id: string) {
    deleteEvent(id)
    setEvents(getUpcomingEvents())
  }

  return (
    <div className="mx-auto w-full max-w-[1000px] space-y-4 sm:space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-[18px] font-bold text-brand-600 sm:text-xl">Upcoming Events</h2>
          <p className="mt-0.5 text-[12.5px] text-surface-muted">
            Events that haven't happened yet, soonest first.
          </p>
        </div>
        <Link
          to="/events/add-event"
          className="flex items-center gap-1.5 rounded-lg bg-brand-600 px-3.5 py-2 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
        >
          <Plus size={16} />
          Add Event
        </Link>
      </div>

      <EventList
        events={events}
        emptyTitle="No upcoming events"
        emptyHint="Add an event with a future date to see it here."
        onDelete={handleDelete}
      />
    </div>
  )
}
