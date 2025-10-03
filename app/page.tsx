'use client'

import { Sidebar } from '@/components/ui/modern-side-bar'

const statsData = [
  {
    label: 'Total Patients',
    value: '124',
    change: '+12% from last week',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
  {
    label: 'Interested',
    value: '45',
    change: '+8% from last week',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    label: 'Contacted Today',
    value: '8',
    change: '+3 from last week',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    ),
  },
  {
    label: 'Conversion Rate',
    value: '36%',
    change: '+4% from last week',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
        />
      </svg>
    ),
  },
]

const recentContacts = [
  {
    name: 'Sarah Johnson',
    initials: 'SJ',
    status: 'interested',
    message: 'Looking forward to the implant consultation',
    time: '2 hours ago',
    color: 'bg-blue-500',
  },
  {
    name: 'Mike Chen',
    initials: 'MC',
    status: 'not interested',
    message: 'Will consider next year',
    time: '1 day ago',
    color: 'bg-blue-500',
  },
  {
    name: 'Emily Davis',
    initials: 'ED',
    status: 'pending',
    message: 'Can you send more info about veneers?',
    time: '3 days ago',
    color: 'bg-blue-500',
  },
  {
    name: 'John Smith',
    initials: 'JS',
    status: 'interested',
    message: 'Ready to schedule treatment',
    time: '5 days ago',
    color: 'bg-blue-500',
  },
]

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-950">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-6 lg:p-8 pt-20 md:pt-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-slate-100 mb-2">Dashboard</h1>
            <p className="text-gray-600 dark:text-slate-400">Overview of your patient engagement</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsData.map((stat, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-gray-600 dark:text-slate-400 font-medium">{stat.label}</div>
                  <div className="text-blue-500 dark:text-blue-400">{stat.icon}</div>
                </div>
                <div className="text-3xl font-bold text-gray-800 dark:text-slate-100 mb-2">{stat.value}</div>
                <div className="text-sm text-blue-600 dark:text-blue-400">{stat.change}</div>
              </div>
            ))}
          </div>

          {/* Recent Patient Contacts */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-700">
            <div className="p-6 border-b border-gray-200 dark:border-slate-700">
              <h2 className="text-xl font-bold text-gray-800 dark:text-slate-100">Recent Patient Contacts</h2>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-slate-700">
              {recentContacts.map((contact, index) => (
                <div
                  key={index}
                  className="p-6 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`${contact.color} w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0`}
                    >
                      {contact.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-800 dark:text-slate-100">{contact.name}</h3>
                        {contact.status === 'interested' && (
                          <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-medium rounded-full">
                            interested
                          </span>
                        )}
                        {contact.status === 'not interested' && (
                          <span className="px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-medium rounded-full">
                            not interested
                          </span>
                        )}
                        {contact.status === 'pending' && (
                          <span className="px-2 py-0.5 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300 text-xs font-medium rounded-full">
                            pending
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 dark:text-slate-400 text-sm mb-1">{contact.message}</p>
                      <p className="text-gray-400 dark:text-slate-500 text-xs">{contact.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
