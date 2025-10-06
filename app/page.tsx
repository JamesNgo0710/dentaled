'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Sidebar } from '@/components/ui/modern-side-bar'
import { initialPatients, type Patient } from '@/lib/patients-data'

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

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [patients, setPatients] = useState<Patient[]>(initialPatients)
  const patientsPerPage = 3

  useEffect(() => {
    // Load patients from localStorage on client side only
    const loadPatients = () => {
      const saved = localStorage.getItem('patients')
      if (saved) {
        const savedPatients = JSON.parse(saved)
        // Merge saved patients with initial patients
        const allPatients = [...initialPatients]
        savedPatients.forEach((savedPatient: Patient) => {
          const existingIndex = allPatients.findIndex(p => p.id === savedPatient.id)
          if (existingIndex >= 0) {
            allPatients[existingIndex] = savedPatient
          } else {
            allPatients.push(savedPatient)
          }
        })
        setPatients(allPatients)
      }
    }

    loadPatients()
  }, [])

  // Filter patients based on search query
  const filteredPatients = patients.filter(patient =>
    patient.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.initials.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.phone.includes(searchQuery)
  )

  // Calculate pagination
  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage)
  const startIndex = (currentPage - 1) * patientsPerPage
  const endIndex = startIndex + patientsPerPage
  const currentPatients = filteredPatients.slice(startIndex, endIndex)

  return (
    <div className="flex h-screen bg-[#E5E7EB] dark:bg-slate-950">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-6 lg:p-8 pt-20 md:pt-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100 mb-1">Dashboard</h1>
            <p className="text-gray-600 dark:text-slate-400 text-sm">Overview of your patient engagement</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {statsData.map((stat, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-gray-700 dark:text-slate-400 font-medium text-sm">{stat.label}</div>
                  <div className="text-blue-500 dark:text-blue-400">{stat.icon}</div>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-slate-100 mb-2">{stat.value}</div>
                <div className="text-sm text-blue-600 dark:text-blue-400">{stat.change}</div>
              </div>
            ))}
          </div>

          {/* Patients List */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-md">
            <div className="p-6 border-b border-gray-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <Link href="/patients" className="text-xl font-bold text-gray-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                    Patients
                  </Link>
                  <p className="text-gray-600 dark:text-slate-400 text-sm mt-0.5">Manage and track patient engagement</p>
                </div>
                <Link href="/patients/add" className="px-5 py-2.5 bg-[#1E293B] dark:bg-slate-800 hover:bg-[#0F172A] dark:hover:bg-slate-700 text-white text-sm font-medium rounded-xl transition-colors shadow-sm">
                  Add Patient
                </Link>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search patients by name, email, or phone..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setCurrentPage(1) // Reset to first page when searching
                  }}
                  className="w-full px-4 py-3 pl-11 bg-[#F5F7FA] dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent text-gray-900 dark:text-slate-100 placeholder-gray-500 dark:placeholder-slate-400 text-sm"
                />
                <svg
                  className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400 dark:text-slate-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Patient List - Fixed height container */}
            <div className="min-h-[360px]">
              {currentPatients.length === 0 ? (
                <div className="p-12 text-center">
                  <svg
                    className="w-16 h-16 mx-auto text-gray-400 dark:text-slate-600 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-2">
                    {searchQuery ? 'No matching patients found' : 'No patients found'}
                  </h3>
                  <p className="text-gray-600 dark:text-slate-400 mb-4 text-sm">
                    {searchQuery ? 'Try adjusting your search terms' : 'Get started by adding your first patient'}
                  </p>
                  {!searchQuery && (
                    <Link href="/patients/add" className="px-5 py-2.5 bg-[#1E293B] hover:bg-[#0F172A] text-white text-sm font-medium rounded-xl transition-colors inline-block shadow-sm">
                      Add Patient
                    </Link>
                  )}
                </div>
              ) : (
                <div className="divide-y divide-gray-200 dark:divide-slate-700">
                  {currentPatients.map((patient) => (
                    <div key={patient.id} className="p-6 hover:bg-[#F9FAFB] dark:hover:bg-slate-800 transition-colors">
                      <Link href={`/patients/${patient.id}`} className="flex items-center gap-4">
                        <div
                          className={`${patient.color} w-14 h-14 rounded-full flex items-center justify-center text-white font-semibold text-lg flex-shrink-0`}
                        >
                          {patient.initials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900 dark:text-slate-100 text-base">
                              {patient.patientId} ({patient.initials})
                            </h3>
                            {patient.status === 'interested' && (
                              <span className="px-2.5 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-medium rounded-full">
                                interested
                              </span>
                            )}
                            {patient.status === 'not interested' && (
                              <span className="px-2.5 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-medium rounded-full">
                                not interested
                              </span>
                            )}
                            {patient.status === 'pending' && (
                              <span className="px-2.5 py-1 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300 text-xs font-medium rounded-full">
                                pending
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-slate-400">
                            <span className="flex items-center gap-1">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                              </svg>
                              {patient.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                />
                              </svg>
                              {patient.phone}
                            </span>
                          </div>
                          <p className="text-gray-400 dark:text-slate-500 text-xs mt-1">
                            Last contact: {patient.lastContact}
                          </p>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="p-4 border-t border-gray-200 dark:border-slate-700 flex items-center justify-between">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-slate-300 bg-[#F5F7FA] dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-600 dark:text-slate-400">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-slate-300 bg-[#F5F7FA] dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
