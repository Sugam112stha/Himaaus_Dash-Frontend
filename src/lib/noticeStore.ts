import type { NoticeItem } from '../types'

const STORAGE_KEY = 'himaaus-dash-notice-items'

const DEFAULT_NOTICES: NoticeItem[] = [
  {
    id: 'notice-1',
    title: 'Holiday Closure',
    description: 'Our office will be closed on 15 August for Independence Day.',
    createdAt: '2026-08-01',
  },
  {
    id: 'notice-2',
    title: 'New Student Session',
    description: 'A webinar on study abroad opportunities is scheduled for next Monday.',
    createdAt: '2026-08-05',
  },
]

export function getNotices(): NoticeItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_NOTICES
    return JSON.parse(raw) as NoticeItem[]
  } catch {
    return DEFAULT_NOTICES
  }
}

function saveNotices(items: NoticeItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export function addNotice(title: string, description: string): NoticeItem[] {
  const newNotice: NoticeItem = {
    id: `notice-${Date.now()}`,
    title,
    description,
    createdAt: new Date().toISOString().slice(0, 10),
  }
  const updated = [newNotice, ...getNotices()]
  saveNotices(updated)
  return updated
}

export function deleteNotice(id: string): NoticeItem[] {
  const updated = getNotices().filter((item) => item.id !== id)
  saveNotices(updated)
  return updated
}
