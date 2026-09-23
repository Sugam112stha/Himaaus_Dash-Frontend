import type { LucideIcon } from 'lucide-react'

export interface NavItem {
  label: string
  icon: LucideIcon
  hasChildren?: boolean
  badge?: number
  subItems?: string[]
}

export interface NavSection {
  title?: string
  items: NavItem[]
}

export interface StatCardData {
  label: string
  value: number | string
  icon: LucideIcon
  iconBg: string
  iconColor: string
}

export interface CountryStat {
  country: string
  flag: string
  students: number
  percent: number
}

export interface MonthlyApplication {
  month: string
  applications: number
}

export interface StatisticPoint {
  label: string
  eligibility: number
  appointments: number
}

export interface DirectorMessage {
  id: string
  name: string
  designation: string
  message: string
  updatedAt: string
}

export interface PodcastEpisode {
  id: string
  title: string
  videoUrl: string
  addedAt: string
}

export interface BlogPost {
  id: string
  title: string
  link: string
  author: string
  excerpt: string
  longDescription: string
  category: string
  image: string
  status: 'draft' | 'published'
  date: string
}
export interface EligibilitySubmission {
  id: string
  studentName: string
  email: string
  phone: string
  destinationCountry: string
  highestQualification: string
  gpaOrPercentage: string
  englishTest: string
  englishScore: string
  status: 'Pending' | 'Approved' | 'Rejected'
  submittedAt: string
}

export interface EligibilityCriteria {
  id: string
  country: string
  minGPA: string
  englishTestRequirements: {
    test: string
    minScore: string
  }[]
  requiredDocuments: string[]
  isActive: boolean
  lastUpdated: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  department: string
  email: string
  phone: string
  bio: string
  linkedinUrl?: string
  imageSrc?: string
  isActive: boolean
}

export interface FAQItem {
  id: string
  question: string
  answer: string
}

export interface NoticeItem {
  id: string
  title: string
  description: string
  createdAt: string
}

export interface GalleryItem {
  id: string
  title: string
  category: string
  imageUrl: string
  uploadedAt: string
}

export interface EventItem {
  id: string
  title: string
  description: string
  date: string // YYYY-MM-DD
  location: string
  imageUrl: string | null
  createdAt: string
}
