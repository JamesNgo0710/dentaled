'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Sidebar } from '@/components/ui/modern-side-bar'
import { type Patient, initialPatients } from '@/lib/patients-data'

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>(initialPatients)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'pending' as Patient['status']
  })

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const handleAddPatient = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill in all fields')
      return
    }

    const newPatient: Patient = {
      id: Math.max(...patients.map(p => p.id)) + 1,
      name: formData.name,
      initials: getInitials(formData.name),
      email: formData.email,
      phone: formData.phone,
      status: formData.status,
      lastContact: 'Just now',
      color: 'bg-blue-500'
    }

    setPatients([...patients, newPatient])
    setShowAddModal(false)
    setFormData({ name: '', email: '', phone: '', status: 'pending' })
  }

  const handleEditPatient = () => {
    if (!editingPatient || !formData.name || !formData.email || !formData.phone) {
      alert('Please fill in all fields')
      return
    }

    setPatients(patients.map(p =>
      p.id === editingPatient.id
        ? { ...p, name: formData.name, initials: getInitials(formData.name), email: formData.email, phone: formData.phone, status: formData.status }
        : p
    ))
    setEditingPatient(null)
    setFormData({ name: '', email: '', phone: '', status: 'pending' })
  }

  const handleDeletePatient = (id: number) => {
    if (confirm('Are you sure you want to delete this patient?')) {
      setPatients(patients.filter(p => p.id !== id))
    }
  }

  const openEditModal = (patient: Patient) => {
    setEditingPatient(patient)
    setFormData({
      name: patient.name,
      email: patient.email,
      phone: patient.phone,
      status: patient.status
    })
  }
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-950">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-6 lg:p-8 pt-20 md:pt-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-slate-100 mb-2">Patients</h1>
            <p className="text-gray-600 dark:text-slate-400">Manage your patient list</p>
          </div>

          {/* Patients List */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-700">
            <div className="p-6 border-b border-gray-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800 dark:text-slate-100">All Patients</h2>
                <Link
                  href="/patients/add"
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg hover:shadow-lg transition-shadow font-medium"
                >
                  + Add Patient
                </Link>
              </div>
            </div>

            <div className="divide-y divide-gray-200 dark:divide-slate-700">
              {patients.map((patient) => (
                <div key={patient.id} className="p-6 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
                  <div className="flex items-center gap-4">
                    <Link href={`/patients/${patient.id}`} className="flex items-center gap-4 flex-1 min-w-0">
                      <div
                        className={`${patient.color} w-14 h-14 rounded-full flex items-center justify-center text-white font-semibold text-lg flex-shrink-0`}
                      >
                        {patient.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-800 dark:text-slate-100 text-lg">
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
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditModal(patient)}
                        className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                        title="Edit patient"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeletePatient(patient.id)}
                        className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                        title="Delete patient"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add/Edit Patient Modal */}
          {(showAddModal || editingPatient) && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-white dark:bg-slate-900 rounded-xl max-w-md w-full p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-slate-100 mb-4">
                  {editingPatient ? 'Edit Patient' : 'Add New Patient'}
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as Patient['status'] })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="pending">Pending</option>
                      <option value="interested">Interested</option>
                      <option value="not interested">Not Interested</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => {
                      setShowAddModal(false)
                      setEditingPatient(null)
                      setFormData({ name: '', email: '', phone: '', status: 'pending' })
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={editingPatient ? handleEditPatient : handleAddPatient}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg hover:shadow-lg transition-shadow font-medium"
                  >
                    {editingPatient ? 'Save Changes' : 'Add Patient'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
