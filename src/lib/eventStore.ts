import type { EventItem } from '../types'

const STORAGE_KEY = 'himaaus-dash-events'

const DEFAULT_EVENTS: EventItem[] = []

export function getEvents(): EventItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_EVENTS
    return JSON.parse(raw) as EventItem[]
  } catch {
    return DEFAULT_EVENTS
  }
}

function saveEvents(events: EventItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events))
}

export function addEvent(data: {
  title: string
  description: string
  date: string
  location: string
  imageUrl: string | null
}): EventItem[] {
  const newEvent: EventItem = {
    id: `evt-${Date.now()}`,
    ...data,
    createdAt: new Date().toISOString().slice(0, 10),
  }
  const updated = [newEvent, ...getEvents()]
  saveEvents(updated)
  return updated
}

export function deleteEvent(id: string): EventItem[] {
  const updated = getEvents().filter((event) => event.id !== id)
  saveEvents(updated)
  return updated
}

// Today's date as YYYY-MM-DD, so string comparison against event.date works.
function todayISO(): string {
  return new Date().toISOString().slice(0, 10)
}

// Soonest first.
export function getUpcomingEvents(): EventItem[] {
  const today = todayISO()
  return getEvents()
    .filter((event) => event.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
}

// Most recent first.
export function getPastEvents(): EventItem[] {
  const today = todayISO()
  return getEvents()
    .filter((event) => event.date < today)
    .sort((a, b) => b.date.localeCompare(a.date))
}
