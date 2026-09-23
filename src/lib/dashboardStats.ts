// Turns real data from each section of the dashboard into the 5 stat
// cards shown on Overview — instead of the old hardcoded numbers.
//
// Blogs and Podcasts are fully live: they read from the same localStorage
// stores those pages use, so adding/deleting a post or episode updates
// the Overview count immediately.
//
// Eligibility Students, Leads/Inquiries, and Appointments currently read
// from each feature's starting data set (data.ts / initialApplicants /
// initialContacts), because those three pages don't save changes between
// visits yet — so their count reflects what you'd see fresh on that page,
// not necessarily edits made just now. Worth persisting those too if you
// want this to be fully live everywhere.

import { GraduationCap, MessageCircle, CalendarDays, FileText, Headphones } from 'lucide-react'
import type { StatCardData } from '../types'
import { eligibilitySubmissions } from '../data'
import { getPosts } from './blogStore'
import { getEpisodes } from './podcastStore'
import { initialApplicants } from '../components/Appointments/data'
import { initialContacts } from '../components/Contact-us/data'

export function getDashboardStats(): StatCardData[] {
  return [
    {
      label: 'Total Eligibility Students',
      value: eligibilitySubmissions.length,
      icon: GraduationCap,
      iconBg: 'bg-brand-50',
      iconColor: 'text-brand-600',
    },
    {
      label: 'Total Leads / Inquiries',
      value: initialContacts.length,
      icon: MessageCircle,
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-500',
    },
    {
      label: 'Total Appointments',
      value: initialApplicants.length,
      icon: CalendarDays,
      iconBg: 'bg-sky-50',
      iconColor: 'text-sky-500',
    },
    {
      label: 'Total Blogs',
      value: getPosts().length,
      icon: FileText,
      iconBg: 'bg-indigo-50',
      iconColor: 'text-indigo-500',
    },
    {
      label: 'Total Podcasts',
      value: getEpisodes().length,
      icon: Headphones,
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-500',
    },
  ]
}
