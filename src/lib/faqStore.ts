import type { FAQItem } from '../types'

const STORAGE_KEY = 'himaaus-dash-faq-items'

const DEFAULT_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How do I submit a new application?',
    answer:
      'Use the Eligibility > Submissions page to add student applications and track their status.',
  },
  {
    id: 'faq-2',
    question: 'Where can I add a new notice?',
    answer: 'Go to Content Management > Notice > Add Notice to publish announcements.',
  },
]

export function getFAQs(): FAQItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_FAQS
    return JSON.parse(raw) as FAQItem[]
  } catch {
    return DEFAULT_FAQS
  }
}

function saveFAQs(items: FAQItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export function addFAQ(question: string, answer: string): FAQItem[] {
  const newFAQ: FAQItem = {
    id: `faq-${Date.now()}`,
    question,
    answer,
  }
  const updated = [newFAQ, ...getFAQs()]
  saveFAQs(updated)
  return updated
}

export function deleteFAQ(id: string): FAQItem[] {
  const updated = getFAQs().filter((item) => item.id !== id)
  saveFAQs(updated)
  return updated
}
