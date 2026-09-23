import type { GalleryItem } from '../types'

const STORAGE_KEY = 'himaaus-dash-gallery-items'

const DEFAULT_ITEMS: GalleryItem[] = []

export function getGalleryItems(): GalleryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_ITEMS
    return JSON.parse(raw) as GalleryItem[]
  } catch {
    return DEFAULT_ITEMS
  }
}

function saveGalleryItems(items: GalleryItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export function addGalleryItem(data: { title: string; category: string; imageUrl: string }): GalleryItem[] {
  const newItem: GalleryItem = {
    id: `gal-${Date.now()}`,
    ...data,
    uploadedAt: new Date().toISOString().slice(0, 10),
  }
  const updated = [newItem, ...getGalleryItems()]
  saveGalleryItems(updated)
  return updated
}

export function deleteGalleryItem(id: string): GalleryItem[] {
  const updated = getGalleryItems().filter((item) => item.id !== id)
  saveGalleryItems(updated)
  return updated
}
