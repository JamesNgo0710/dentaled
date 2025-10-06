export interface Patient {
  id: number
  patientId: string
  initials: string
  age?: string
  email: string
  phone: string
  notes?: string
  motivators?: string
  concerns?: string
  questionsFromPatient?: string
  uploadedImages?: string[]
  status: 'interested' | 'not interested' | 'pending'
  lastContact: string
  color: string
}

export const initialPatients: Patient[] = [
  {
    id: 1,
    patientId: 'PT-001',
    initials: 'SJ',
    age: '34',
    email: 'sarah.j@email.com',
    phone: '+1 (555) 123-4567',
    notes: 'Prefers morning appointments',
    motivators: 'Wants a confident smile for upcoming wedding',
    concerns: 'Anxiety about dental procedures, budget constraints',
    questionsFromPatient: 'How long will treatment take? Payment plans available?',
    status: 'interested',
    lastContact: '2 hours ago',
    color: 'bg-blue-500',
  },
  {
    id: 2,
    patientId: 'PT-002',
    initials: 'MC',
    age: '28',
    email: 'mike.c@email.com',
    phone: '+1 (555) 234-5678',
    notes: 'Works remotely, flexible schedule',
    motivators: 'Professional appearance for career advancement',
    concerns: 'Time commitment, cost of treatment',
    status: 'not interested',
    lastContact: '1 day ago',
    color: 'bg-blue-500',
  },
  {
    id: 3,
    patientId: 'PT-003',
    initials: 'ED',
    age: '42',
    email: 'emily.d@email.com',
    phone: '+1 (555) 345-6789',
    notes: 'Referred by Dr. Smith',
    motivators: 'Better oral health, reduce pain',
    concerns: 'Dental anxiety, sensitivity',
    questionsFromPatient: 'Will this be painful? Sedation options?',
    status: 'pending',
    lastContact: '3 days ago',
    color: 'bg-blue-500',
  },
  {
    id: 4,
    patientId: 'PT-004',
    initials: 'JS',
    age: '55',
    email: 'john.s@email.com',
    phone: '+1 (555) 456-7890',
    notes: 'Insurance coverage confirmed',
    motivators: 'Long-term health, appearance',
    concerns: 'Recovery time, work schedule',
    status: 'interested',
    lastContact: '5 days ago',
    color: 'bg-blue-500',
  },
  {
    id: 5,
    patientId: 'PT-005',
    initials: 'LW',
    age: '31',
    email: 'lisa.w@email.com',
    phone: '+1 (555) 567-8901',
    notes: 'New patient, no dental history on file',
    motivators: 'Cosmetic improvement, self-confidence',
    concerns: 'Budget, maintenance requirements',
    status: 'interested',
    lastContact: '1 week ago',
    color: 'bg-blue-500',
  },
  {
    id: 6,
    patientId: 'PT-006',
    initials: 'DM',
    age: '47',
    email: 'david.m@email.com',
    phone: '+1 (555) 678-9012',
    notes: 'Needs translator for appointments',
    motivators: 'Health concerns, family history of dental issues',
    concerns: 'Language barrier, cost',
    questionsFromPatient: 'Spanish-speaking staff available?',
    status: 'pending',
    lastContact: '4 hours ago',
    color: 'bg-blue-500',
  },
  {
    id: 7,
    patientId: 'PT-007',
    initials: 'RG',
    age: '26',
    email: 'rachel.g@email.com',
    phone: '+1 (555) 789-0123',
    notes: 'College student, limited availability',
    motivators: 'Natural look, hygiene convenience',
    concerns: 'Student budget, time between classes',
    questionsFromPatient: 'Student discounts? Weekend appointments?',
    status: 'interested',
    lastContact: '6 hours ago',
    color: 'bg-blue-500',
  },
]
