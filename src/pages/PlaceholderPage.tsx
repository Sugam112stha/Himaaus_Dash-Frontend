// A stand-in page for every sidebar link that doesn't have real content
// built yet (e.g. "Blog Posts", "Contacts"). It still has a real URL and
// shows up when you navigate to it — it just says "coming soon" instead
// of showing data.

import { Construction } from 'lucide-react'

interface PlaceholderPageProps {
  title: string
}

export default function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <div className="mx-auto flex w-full max-w-[1000px] flex-col items-center justify-center rounded-xl2 border border-dashed border-surface-border bg-white p-14 text-center shadow-card">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-500">
        <Construction size={22} />
      </div>
      <h2 className="text-[15px] font-bold text-surface-heading">{title}</h2>
      <p className="mt-1.5 max-w-xs text-[13px] text-surface-muted">
        This page doesn't have content yet — but it's a real, working link. Ask to build it out
        whenever you're ready.
      </p>
    </div>
  )
}
