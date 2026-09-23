import type { Contact, ContactFormData } from './types'

export function initials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export const initialContacts: Contact[] = [
  {
    id: 1,
    name: 'Julianne Moore',
    email: 'j.moore@outlook.com',
    phone: '+44 7700 900877',
    location: 'London, United Kingdom',
    subject: 'Visa Processing',
    subjectDetail: 'Visa Consulting & Document Review',
    message:
      'Hello, I am reaching out regarding my Tier 4 Visa application for the UK. I\'ve received my CAS from the University of Manchester, but I am slightly confused about the financial evidence requirements. Specifically, whether my joint account with my spouse can be used or if I need to transfer funds to a personal account 28 days prior.\n\nWould appreciate a quick document audit before I submit. Thanks!',
    createdAt: '2m ago',
    isArchived: false,
    isRead: false,
  },
  {
    id: 2,
    name: 'Marcus Chen',
    email: 'm.chen@gmail.com',
    phone: '+1 415 555 0192',
    location: 'San Francisco, USA',
    subject: 'Test Preparation',
    subjectDetail: 'Test Prep (IELTS)',
    message:
      'Wanted to inquire about the next intensive batch for IELTS preparation. I am targeting a band score of 7.5 overall, with a minimum of 7 in each module. Could you share the schedule, fees, and any practice test resources included in the program?',
    createdAt: '1hr ago',
    isArchived: false,
    isRead: true,
  },
  {
    id: 3,
    name: 'Sarah Al-Fani',
    email: 's.alfani@edu.qa',
    phone: '+974 5500 1234',
    location: 'Doha, Qatar',
    subject: 'Financial Advice',
    subjectDetail: 'Scholarship Aid',
    message:
      'Are there any specific grants for engineering students applying to universities in Australia? I have a strong academic profile (GPA 3.8) and relevant work experience. Looking for both merit-based and need-based scholarship options.',
    createdAt: '3h ago',
    isArchived: false,
    isRead: false,
  },
  {
    id: 4,
    name: 'Robert Glass',
    email: 'r.glass@university.de',
    phone: '+49 170 123 4567',
    location: 'Munich, Germany',
    subject: 'University Admission',
    subjectDetail: 'Admissions',
    message:
      'Applying for the Fall 2024 semester at Munich. I want to understand the entry requirements for M.Sc. Computer Science, including GRE scores, statement of purpose guidelines, and application deadlines.',
    createdAt: '5h ago',
    isArchived: false,
    isRead: false,
  },
  {
    id: 5,
    name: 'Elena Rodriguez',
    email: 'e.rodriguez@mail.es',
    phone: '+34 612 345 678',
    location: 'Madrid, Spain',
    subject: 'Visa Processing',
    subjectDetail: 'Visa Consulting',
    message:
      'Document checklist confirmation request. I have been accepted to study in Ireland and need guidance on gathering all the required documents for my student visa. Specifically, I need help with proof of accommodation, insurance, and financial statements.',
    createdAt: 'Yesterday',
    isArchived: false,
    isRead: true,
  },
  {
    id: 6,
    name: 'Anika Sharma',
    email: 'a.sharma@test.in',
    phone: '+91 98765 43210',
    location: 'New Delhi, India',
    subject: 'Mock Test',
    subjectDetail: 'PTE Mock Test',
    message:
      'I would like to register for PTE mock tests. Can you share the available dates and whether the mock tests simulate the exact exam conditions? Also interested in receiving a score breakdown and improvement feedback.',
    createdAt: '2 days ago',
    isArchived: false,
    isRead: false,
  },
  {
    id: 7,
    name: 'James Okarfor',
    email: 'j.okarfor@edu.ng',
    phone: '+234 801 234 5678',
    location: 'Lagos, Nigeria',
    subject: 'University Admission',
    subjectDetail: 'Admissions Counseling',
    message:
      'Need guidance on university shortlisting for Masters in Public Health in the UK. My undergraduate was in Biochemistry and I have 2 years of NGO experience in health sector. Please advise on suitable universities.',
    createdAt: '3 days ago',
    isArchived: false,
    isRead: true,
  },
]

export function createContactFromForm(
  form: ContactFormData,
  id: number
): Contact {
  return {
    id,
    name: form.name,
    email: form.email,
    phone: form.phone,
    location: form.location,
    subject: form.subject,
    subjectDetail: form.subjectDetail,
    message: form.message,
    createdAt: 'Just now',
    isArchived: false,
    isRead: false,
  }
}

/** Maps subject to its CSS class suffix */
export function subjectClassName(subject: string): string {
  return subject.toLowerCase().replace(/\s+/g, '-')
}
