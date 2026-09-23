// Turns a pasted video link into something we can actually play.
//
// In plain words: people will paste all kinds of links — a YouTube link,
// a Vimeo link, or a direct .mp4 link. This file figures out which kind
// of link it is, and gives back an "embed" address we can put in an
// <iframe> (for YouTube/Vimeo) or tells us to use a plain <video> tag
// (for direct file links).

export type VideoKind = 'youtube' | 'vimeo' | 'direct' | 'unknown'

export interface VideoInfo {
  kind: VideoKind
  embedUrl: string | null
}

function getYouTubeId(url: URL): string | null {
  if (url.hostname.includes('youtu.be')) {
    return url.pathname.slice(1) || null
  }
  if (url.hostname.includes('youtube.com')) {
    if (url.pathname === '/watch') return url.searchParams.get('v')
    if (url.pathname.startsWith('/embed/')) return url.pathname.replace('/embed/', '')
    if (url.pathname.startsWith('/shorts/')) return url.pathname.replace('/shorts/', '')
  }
  return null
}

function getVimeoId(url: URL): string | null {
  if (!url.hostname.includes('vimeo.com')) return null
  const match = url.pathname.match(/\/(\d+)/)
  return match ? match[1] : null
}

export function getVideoInfo(rawUrl: string): VideoInfo {
  try {
    const url = new URL(rawUrl.trim())

    const youtubeId = getYouTubeId(url)
    if (youtubeId) {
      return { kind: 'youtube', embedUrl: `https://www.youtube.com/embed/${youtubeId}` }
    }

    const vimeoId = getVimeoId(url)
    if (vimeoId) {
      return { kind: 'vimeo', embedUrl: `https://player.vimeo.com/video/${vimeoId}` }
    }

    // A direct link to a video file, e.g. ending in .mp4/.webm/.mov
    if (/\.(mp4|webm|ogg|mov)$/i.test(url.pathname)) {
      return { kind: 'direct', embedUrl: url.toString() }
    }

    return { kind: 'unknown', embedUrl: null }
  } catch {
    // Not even a valid URL
    return { kind: 'unknown', embedUrl: null }
  }
}
