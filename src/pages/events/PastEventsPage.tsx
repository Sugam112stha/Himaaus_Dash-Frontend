import { useState } from 'react'
import type { EventItem } from '../../types'
import { getPastEvents, deleteEvent } from '../../lib/eventStore'
import EventList from './EventList'

export default function PastEventsPage() {
  const [events, setEvents] = useState<EventItem[]>(() => getPastEvents())

  function handleDelete(id: string) {
    deleteEvent(id)
    setEvents(getPastEvents())
  }

  return (
    <div className="mx-auto w-full max-w-[1000px] space-y-4 sm:space-y-5">
      <div>
        <h2 className="text-[18px] font-bold text-brand-600 sm:text-xl">Past Events</h2>
        <p className="mt-0.5 text-[12.5px] text-surface-muted">
          Events that have already happened, most recent first.
        </p>
      </div>

      <EventList
        events={events}
        emptyTitle="No past events"
        emptyHint="Events move here automatically once their date has passed."
        onDelete={handleDelete}
      />
    </div>
  )
}
