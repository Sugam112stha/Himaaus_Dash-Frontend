// This file turns the sidebar menu (from data.ts) into real page URLs.
//
// The idea in plain words:
//   - Every clickable sidebar item gets its own web address (a "path").
//   - "Overview" is the home page, so its path is just "/".
//   - Everything else gets a path made from its name, e.g.
//       "Director Message"  ->  "/director-message"
//       "Blog Posts" + "Add New" (a sub-item) -> "/blog-posts/add-new"
//   - We keep one master list of { path, label } pairs so the rest of the
//     app (the sidebar links, and the page title in the top bar) can all
//     read from the same source instead of repeating this logic.

import type { NavSection } from '../types'

// Turn a menu label into something URL-safe.
// "Director Message" -> "director-message"
export function slugify(label: string): string {
  return label
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-') // any spaces/punctuation become a dash
    .replace(/(^-+|-+$)/g, '') // trim stray dashes from the ends
}

// The path for a top-level sidebar item (e.g. "Appointments" -> "/appointments").
export function pathForItem(label: string): string {
  return label === 'Overview' ? '/' : `/${slugify(label)}`
}

// The path for a sub-item nested under a parent (e.g. under "Blog Posts").
export function pathForSubItem(parentLabel: string, subLabel: string): string {
  return `/${slugify(parentLabel)}/${slugify(subLabel)}`
}

export interface RouteInfo {
  path: string
  label: string
}

// Walk the whole sidebar menu once and list out every page it links to.
// Used to (a) generate a "coming soon" page for links that don't have a
// real page built yet, and (b) look up a friendly title for the current URL.
export function buildRouteList(sections: NavSection[]): RouteInfo[] {
  const routes: RouteInfo[] = []

  for (const section of sections) {
    for (const item of section.items) {
      if (item.hasChildren && item.subItems) {
        // Parent items with a dropdown don't have their own page — only
        // their sub-items do.
        for (const sub of item.subItems) {
          routes.push({ path: pathForSubItem(item.label, sub), label: `${item.label} — ${sub}` })
        }
      } else {
        routes.push({ path: pathForItem(item.label), label: item.label })
      }
    }
  }

  return routes
}
