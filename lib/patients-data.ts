export interface Patient {
  id: number
  name: string
  initials: string
  email: string
  phone: string
  status: 'interested' | 'not interested' | 'pending'
  lastContact: string
  color: string
}

export const initialPatients: Patient[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    initials: 'SJ',
    email: 'sarah.j@email.com',
    phone: '+1 (555) 123-4567',
    status: 'interested',
    lastContact: '2 hours ago',
    color: 'bg-blue-500',
  },
  {
    id: 2,
    name: 'Mike Chen',
    initials: 'MC',
    email: 'mike.c@email.com',
    phone: '+1 (555) 234-5678',
    status: 'not interested',
    lastContact: '1 day ago',
    color: 'bg-blue-500',
  },
  {
    id: 3,
    name: 'Emily Davis',
    initials: 'ED',
    email: 'emily.d@email.com',
    phone: '+1 (555) 345-6789',
    status: 'pending',
    lastContact: '3 days ago',
    color: 'bg-blue-500',
  },
  {
    id: 4,
    name: 'John Smith',
    initials: 'JS',
    email: 'john.s@email.com',
    phone: '+1 (555) 456-7890',
    status: 'interested',
    lastContact: '5 days ago',
    color: 'bg-blue-500',
  },
  {
    id: 5,
    name: 'Lisa Wang',
    initials: 'LW',
    email: 'lisa.w@email.com',
    phone: '+1 (555) 567-8901',
    status: 'interested',
    lastContact: '1 week ago',
    color: 'bg-blue-500',
  },
  {
    id: 6,
    name: 'David Martinez',
    initials: 'DM',
    email: 'david.m@email.com',
    phone: '+1 (555) 678-9012',
    status: 'pending',
    lastContact: '4 hours ago',
    color: 'bg-blue-500',
  },
  {
    id: 7,
    name: 'Rachel Green',
    initials: 'RG',
    email: 'rachel.g@email.com',
    phone: '+1 (555) 789-0123',
    status: 'interested',
    lastContact: '6 hours ago',
    color: 'bg-blue-500',
  },
]
