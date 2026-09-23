// Where blog posts are kept.
//
// Same pattern as podcastStore.ts: "All Posts" and "New Post" are two
// separate pages/URLs, so state is saved to localStorage instead of a
// normal useState, so it survives navigation and page refreshes.

import type { BlogPost } from '../types'

const STORAGE_KEY = 'himaaus-dash-blog-posts'

const DEFAULT_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'Study Abroad Dynamics Are Changing: What Students Should Know',
    link: '',
    author: 'Anup Acharya',
    excerpt:
      'Studying abroad is still a dream for many students, but the global international student recruitment process has changed significantly in recent years.',
    longDescription: '',
    category: 'Educational',
    image: 'https://api.himaaus.com/media/blogs/e95cc2d0-30cb-4bad-b8cd-a231aa346302.png',
    status: 'published',
    date: '2026-01-13',
  },
  {
    id: 'post-2',
    title: 'Your Trusted Partner for a Better Future – Himalus Consultancy',
    link: '',
    author: 'Himaaus',
    excerpt:
      'Choosing the right guidance can make a big difference in shaping your future. At Himalus Consultancy, we are committed to helping students and professionals make informed decisions.',
    longDescription: '',
    category: 'general',
    image: 'https://api.himaaus.com/media/blogs/bg1.jpg',
    status: 'published',
    date: '2025-12-19',
  },
]

export function getPosts(): BlogPost[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_POSTS
    return JSON.parse(raw) as BlogPost[]
  } catch {
    return DEFAULT_POSTS
  }
}

export function getPost(id: string): BlogPost | undefined {
  return getPosts().find((p) => p.id === id)
}

function savePosts(posts: BlogPost[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
}

export interface PostInput {
  title: string
  link: string
  author: string
  excerpt: string
  longDescription: string
  category: string
  image: string
  status: 'draft' | 'published'
}

// Add a new post to the front of the list and save it.
export function addPost(input: PostInput): BlogPost[] {
  const newPost: BlogPost = {
    id: `post-${Date.now()}`,
    date: new Date().toISOString().slice(0, 10),
    ...input,
  }
  const updated = [newPost, ...getPosts()]
  savePosts(updated)
  return updated
}

// Update an existing post by id and save it.
export function updatePost(id: string, input: PostInput): BlogPost[] {
  const updated = getPosts().map((p) => (p.id === id ? { ...p, ...input } : p))
  savePosts(updated)
  return updated
}

// Remove a post by id and save it.
export function deletePost(id: string): BlogPost[] {
  const updated = getPosts().filter((p) => p.id !== id)
  savePosts(updated)
  return updated
}
