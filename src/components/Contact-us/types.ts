export type InquirySubject =
  | 'Test Preparation'
  | 'Mock Test'
  | 'Visa Processing'
  | 'University Admission'
  | 'Financial Advice'

export const INQUIRY_SUBJECTS: InquirySubject[] = [
  'Test Preparation',
  'Mock Test',
  'Visa Processing',
  'University Admission',
  'Financial Advice',
]

export interface Contact {
  id: number
  name: string
  email: string
  phone: string
  location: string
  subject: InquirySubject
  subjectDetail?: string
  message: string
  createdAt: string
  isArchived: boolean
  isRead: boolean
}

export interface ContactFormData {
  name: string
  email: string
  phone: string
  location: string
  subject: InquirySubject
  subjectDetail?: string
  message: string
}
