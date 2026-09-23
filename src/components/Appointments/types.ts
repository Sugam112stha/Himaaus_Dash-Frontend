export type Status = 'Confirmed' | 'Pending' | 'Cancelled'

export interface Applicant {
  id: number
  name: string
  email: string
  avatar: string
  program: string
  degree: string
  destination: string
  destinationFlag: string
  testType: string
  testScore: string
  status: Status
  additionalMessage?: string
}

export interface ApplicantFormData {
  name: string
  email: string
  program: string
  degree: string
  destination: string
  testType: string
  testScore: string
  status: Status
  additionalMessage?: string
}

