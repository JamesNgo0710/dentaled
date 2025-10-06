'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Sidebar } from '@/components/ui/modern-side-bar'
import { type Patient, initialPatients } from '@/lib/patients-data'

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>(initialPatients)
  const [isLoading, setIsLoading] = useState(true)

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
      setIsLoading(false)
    }

    loadPatients()
  }, [])
  return (
    <div className="flex h-screen bg-[#E5E7EB] dark:bg-slate-950">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-6 lg:p-8 pt-20 md:pt-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100 mb-1">Patients</h1>
            <p className="text-gray-600 dark:text-slate-400 text-sm">Manage your patient list</p>
          </div>

          {/* Patients List */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-md">
            <div className="p-6 border-b border-gray-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100">All Patients</h2>
                  <p className="text-gray-600 dark:text-slate-400 text-sm mt-0.5">View and manage all patient records</p>
                </div>
                <Link
                  href="/patients/add"
                  className="px-5 py-2.5 bg-[#1E293B] dark:bg-slate-800 hover:bg-[#0F172A] dark:hover:bg-slate-700 text-white text-sm font-medium rounded-xl transition-colors shadow-sm"
                >
                  + Add Patient
                </Link>
              </div>
            </div>

            <div className="divide-y divide-gray-200 dark:divide-slate-700">
              {patients.map((patient) => (
                <div key={patient.id} className="p-6 hover:bg-[#F9FAFB] dark:hover:bg-slate-800 transition-colors">
                  <div className="flex items-center gap-4">
                    <Link href={`/patients/${patient.id}`} className="flex items-center gap-4 flex-1 min-w-0">
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
