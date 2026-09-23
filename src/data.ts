import {
  LayoutGrid,
  FileText,
  Users,
  Star,
  Image,
  CalendarDays,
  HelpCircle,
  Headphones,
  Target,
  ListChecks,
  MessageSquare,
  Bell,
  CalendarCheck,
  Mail,
  UserCircle2,
  GraduationCap,
  MessageCircle,
} from 'lucide-react'
import type {
  NavSection,
  StatCardData,
  CountryStat,
  MonthlyApplication,
  StatisticPoint,
  DirectorMessage,
  EligibilitySubmission,
  EligibilityCriteria,
  TeamMember,
} from './types'

export const navSections: NavSection[] = [
  {
    title: 'Dashboard',
    items: [{ label: 'Overview', icon: LayoutGrid }],
  },
  {
    title: 'Content Management',
    items: [
      { label: 'Blog Posts', icon: FileText, hasChildren: true, subItems: ['All Posts', 'New Post'] },
      { label: 'Partners', icon: Users, hasChildren: true, subItems: ['All Partners', 'Add Partner'] },
      { label: 'Testimonials', icon: Star, hasChildren: true, subItems: ['All Testimonials', 'Add New'] },
      { label: 'Gallery', icon: Image, hasChildren: true, subItems: ['All Media', 'Upload'] },
      { label: 'Events', icon: CalendarDays, hasChildren: true, subItems: ['Upcoming', 'Past Events', 'Add Event'] },
      { label: 'FAQ', icon: HelpCircle, hasChildren: true, subItems: ['All FAQs', 'Add FAQ'] },
      { label: 'Podcast', icon: Headphones, hasChildren: true, subItems: ['All Episodes', 'Add Episode'] },
      { label: 'Milestones', icon: Target, hasChildren: true, subItems: ['All Milestones', 'Add Milestone'] },
      { label: 'Eligibility', icon: ListChecks, hasChildren: true, subItems: ['Submissions', 'Criteria'] },
      { label: 'Director Message', icon: MessageSquare },
      { label: 'Notice', icon: Bell, hasChildren: true, subItems: ['All Notices', 'Add Notice'] },
    ],
  },
  {
    title: 'Services & Appointments',
    items: [
      { label: 'Appointments', icon: CalendarCheck },
      { label: 'Contacts', icon: Mail },
    ],
  },
  {
    title: 'Team Management',
    items: [{ label: 'Team Profiles', icon: UserCircle2, hasChildren: true, subItems: ['All Members', 'Add Member'] }],
  },
]

export const statCards: StatCardData[] = [
  {
    label: 'Total Eligibility Students',
    value: 3,
    icon: GraduationCap,
    iconBg: 'bg-brand-50',
    iconColor: 'text-brand-600',
  },
  {
    label: 'Total Leads / Inquiries',
    value: 20,
    icon: MessageCircle,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-500',
  },
  {
    label: 'Total Appointments',
    value: 12,
    icon: CalendarDays,
    iconBg: 'bg-sky-50',
    iconColor: 'text-sky-500',
  },
  {
    label: 'Total Blogs',
    value: 2,
    icon: FileText,
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-500',
  },
  {
    label: 'Total Podcasts',
    value: 4,
    icon: Headphones,
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-500',
  },
]

export const countryStats: CountryStat[] = [
  { country: 'Australia', flag: '🇦🇺', students: 1, percent: 33 },
  { country: 'Nepal', flag: '🇳🇵', students: 1, percent: 33 },
  { country: 'USA', flag: '🇺🇸', students: 1, percent: 33 },
]

export const monthlyApplications: MonthlyApplication[] = [
  { month: 'Feb', applications: 0 },
  { month: 'Mar', applications: 0 },
  { month: 'Apr', applications: 0 },
  { month: 'May', applications: 0 },
  { month: 'Jun', applications: 0 },
  { month: 'Jul', applications: 2 },
]

export const statisticsData: StatisticPoint[] = [
  { label: 'Feb', eligibility: 0, appointments: 0 },
  { label: 'Mar', eligibility: 0, appointments: 1 },
  { label: 'Apr', eligibility: 0, appointments: 2 },
  { label: 'May', eligibility: 1, appointments: 4 },
  { label: 'Jun', eligibility: 2, appointments: 7 },
  { label: 'Jul', eligibility: 3, appointments: 10 },
]

export const directorMessages: DirectorMessage[] = [
  {
    id: 'dm-1',
    name: 'Rajesh Sharma',
    designation: 'Founding Director',
    message:
      'Welcome to Himaaus Education. Our mission is to guide every student toward the right university and the right country for their future, with honest advice at every step.',
    updatedAt: '2026-06-12',
  },
]

export const eligibilitySubmissions: EligibilitySubmission[] = [
  {
    id: 'es-1',
    studentName: 'Aarav Patel',
    email: 'aarav.patel@example.com',
    phone: '+977-9801234567',
    destinationCountry: 'Australia',
    highestQualification: 'Bachelor of Computer Science',
    gpaOrPercentage: '3.6 GPA',
    englishTest: 'IELTS',
    englishScore: '7.5 (L: 8.0, R: 7.5, W: 7.0, S: 7.5)',
    status: 'Approved',
    submittedAt: '2026-07-28',
  },
  {
    id: 'es-2',
    studentName: 'Binod Adhikari',
    email: 'binod.adhikari@example.com',
    phone: '+977-9812345678',
    destinationCountry: 'USA',
    highestQualification: 'High School (10+2)',
    gpaOrPercentage: '3.2 GPA',
    englishTest: 'PTE',
    englishScore: '65 Overall',
    status: 'Pending',
    submittedAt: '2026-07-29',
  },
  {
    id: 'es-3',
    studentName: 'Christina Sen',
    email: 'christina.sen@example.com',
    phone: '+977-9843456789',
    destinationCountry: 'Canada',
    highestQualification: 'Bachelor of Business Administration',
    gpaOrPercentage: '2.8 GPA',
    englishTest: 'IELTS',
    englishScore: '6.0 (L: 6.0, R: 5.5, W: 6.0, S: 6.5)',
    status: 'Rejected',
    submittedAt: '2026-07-25',
  },
]

export const eligibilityCriteria: EligibilityCriteria[] = [
  {
    id: 'ec-1',
    country: 'Australia',
    minGPA: '2.8 GPA or 60%',
    englishTestRequirements: [
      { test: 'IELTS', minScore: '6.5 overall (no band less than 6.0)' },
      { test: 'PTE', minScore: '58 overall' },
    ],
    requiredDocuments: ['Academic Transcripts', 'English Test Certificate', 'Statement of Purpose (SOP)', 'Citizenship/Passport', 'LOR (2)'],
    isActive: true,
    lastUpdated: '2026-07-01',
  },
  {
    id: 'ec-2',
    country: 'USA',
    minGPA: '3.0 GPA or 70%',
    englishTestRequirements: [
      { test: 'IELTS', minScore: '6.5 overall' },
      { test: 'PTE', minScore: '60 overall' },
      { test: 'TOEFL', minScore: '80 iBT' },
    ],
    requiredDocuments: ['Academic Transcripts', 'English Test Certificate', 'Financial Documents', 'SOP', 'Passport', 'LOR (3)'],
    isActive: true,
    lastUpdated: '2026-07-15',
  },
  {
    id: 'ec-3',
    country: 'Canada',
    minGPA: '3.0 GPA or 65%',
    englishTestRequirements: [
      { test: 'IELTS', minScore: '6.5 overall (SDS)' },
      { test: 'PTE', minScore: '60 overall' },
    ],
    requiredDocuments: ['Academic Transcripts', 'English Test Certificate', 'GIC Certificate', 'SOP', 'Passport', 'LOR (2)'],
    isActive: true,
    lastUpdated: '2026-07-10',
  },
]

export const teamMembers: TeamMember[] = [
  {
    id: 'tm-1',
    name: 'Rajesh Sharma',
    role: 'Founding Director & Senior Advisor',
    department: 'Management',
    email: 'rajesh.sharma@himaaus.edu.np',
    phone: '+977-9851012345',
    bio: 'Over 15 years of experience in educational consulting and visa guidance for Australia and the USA.',
    linkedinUrl: 'https://linkedin.com/in/rajesh-sharma',
    isActive: true,
  },
  {
    id: 'tm-2',
    name: 'Suman Thapa',
    role: 'Senior Counselor',
    department: 'Counseling',
    email: 'suman.thapa@himaaus.edu.np',
    phone: '+977-9801122334',
    bio: 'Dedicated counselor specializing in course selection, SOP review, and academic matching.',
    linkedinUrl: 'https://linkedin.com/in/suman-thapa',
    isActive: true,
  },
  {
    id: 'tm-3',
    name: 'Neha Rijal',
    role: 'Documentation & Compliance Officer',
    department: 'Operations',
    email: 'neha.rijal@himaaus.edu.np',
    phone: '+977-9841123456',
    bio: 'Expert in visa documentation, GTE compliance checks, and final application submission.',
    isActive: true,
  },
]


