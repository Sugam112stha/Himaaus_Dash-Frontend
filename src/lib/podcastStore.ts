// Where podcast episodes are kept.
//
// In plain words: "All Episodes" and "Add Episode" are two separate pages
// (two separate URLs), so they can't just share a normal useState — each
// page starts fresh when you navigate to it. Instead we save the episode
// list to the browser's localStorage, so:
//   - adding an episode on one page shows up when you go to the other
//   - the list survives a page refresh
//
// (Same "not a real database" caveat as everywhere else in this frontend-
// only project — this lives in the visitor's own browser, not a server.)

import type { PodcastEpisode } from '../types'

const STORAGE_KEY = 'himaaus-dash-podcast-episodes'

const DEFAULT_EPISODES: PodcastEpisode[] = []

export function getEpisodes(): PodcastEpisode[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_EPISODES
    return JSON.parse(raw) as PodcastEpisode[]
  } catch {
    return DEFAULT_EPISODES
  }
}

function saveEpisodes(episodes: PodcastEpisode[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(episodes))
}

// Add a new episode to the front of the list and save it.
export function addEpisode(title: string, videoUrl: string): PodcastEpisode[] {
  const newEpisode: PodcastEpisode = {
    id: `ep-${Date.now()}`,
    title,
    videoUrl,
    addedAt: new Date().toISOString(),
  }
  const updated = [newEpisode, ...getEpisodes()]
  saveEpisodes(updated)
  return updated
}

// Remove an episode by id and save it.
export function deleteEpisode(id: string): PodcastEpisode[] {
  const updated = getEpisodes().filter((ep) => ep.id !== id)
  saveEpisodes(updated)
  return updated
}
