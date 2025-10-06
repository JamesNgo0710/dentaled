'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Sidebar } from '@/components/ui/modern-side-bar'

export default function AddPatientPage() {
  const router = useRouter()
  const [patientId, setPatientId] = useState('')
  const [initials, setInitials] = useState('')
  const [age, setAge] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [motivators, setMotivators] = useState('')
  const [concerns, setConcerns] = useState('')
  const [questionsFromPatient, setQuestionsFromPatient] = useState('')
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const remainingSlots = 5 - uploadedImages.length
      const filesToAdd = Array.from(files).slice(0, remainingSlots)

      filesToAdd.forEach(file => {
        const reader = new FileReader()
        reader.onloadend = () => {
          setUploadedImages(prev => [...prev, reader.result as string])
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const handleRemoveImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleGeneratePlan = async () => {
    // Validate required fields
    if (!patientId || !initials) {
      alert('Please fill in required fields: Patient ID and Initials')
      return
    }

    setIsLoading(true)

    // Simulate API call to save patient data
    const newPatient = {
      patientId,
      initials,
      age,
      email,
      phone,
      notes,
      motivators,
      concerns,
      questionsFromPatient,
      uploadedImages,
      status: 'pending' as const,
      lastContact: 'Just now',
      color: 'bg-blue-500'
    }

    // Store in localStorage (simulating database save)
    const existingPatients = JSON.parse(localStorage.getItem('patients') || '[]')
    const newId = existingPatients.length > 0 ? Math.max(...existingPatients.map((p: any) => p.id)) + 1 : 8
    const patientWithId = { id: newId, ...newPatient }

    localStorage.setItem('patients', JSON.stringify([...existingPatients, patientWithId]))

    // Simulate 5 second loading for treatment plan generation
    await new Promise(resolve => setTimeout(resolve, 5000))

    // Redirect to patient detail page with all plans tab
    router.push(`/patients/${newId}?tab=all-plans`)
  }

  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-50 dark:bg-slate-950">
        <Sidebar />
        <main className="flex-1 overflow-y-auto flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-slate-100 mb-2">Generating Treatment Plan</h2>
            <p className="text-gray-600 dark:text-slate-400">
              Analyzing patient data and creating personalized treatment strategy...
            </p>
            <div className="mt-6 text-sm text-gray-500 dark:text-slate-500">
              This may take a few moments
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-950">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-6 lg:p-8 pt-20 md:pt-8 max-w-4xl mx-auto pb-20">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/patients"
                className="inline-flex items-center gap-2 text-gray-600 dark:text-slate-400 hover:text-gray-800 dark:hover:text-slate-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-slate-100">Add New Patient</h1>
                <p className="text-sm text-gray-500 dark:text-slate-400">Enter patient information to generate a personalized treatment plan</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Patient Information Section */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-700 p-8">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-slate-100 mb-2">Patient Information</h2>
                  <p className="text-sm text-gray-500 dark:text-slate-400">Quick, minimal details to personalise the plan.</p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                        Patient ID <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter patient ID"
                        value={patientId}
                        onChange={(e) => setPatientId(e.target.value)}
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                        Initials <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter initials"
                        value={initials}
                        onChange={(e) => setInitials(e.target.value)}
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Age (Optional)</label>
                      <input
                        type="text"
                        placeholder="Age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Email (Optional)</label>
                      <input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Phone (Optional)</label>
                      <input
                        type="tel"
                        placeholder="Phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Notes (Optional)</label>
                    <textarea
                      placeholder="Patient preferences, timeframes, context..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Chart & Motivators Section */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-700 p-8">
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-slate-100 mb-2">Treatment Chart / Photo</h2>
                  <p className="text-sm text-gray-500 dark:text-slate-400 mb-6">Upload an image/PDF or capture a photo using the device camera. (Maximum 5 photos)</p>

                  <div className="grid grid-cols-2 gap-4">
                    <label className={`border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg p-8 hover:border-blue-400 transition-colors ${uploadedImages.length >= 5 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*,.pdf"
                        multiple
                        onChange={handleImageUpload}
                        disabled={uploadedImages.length >= 5}
                      />
                      <div className="flex flex-col items-center">
                        <svg className="w-10 h-10 text-gray-400 dark:text-slate-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="text-sm font-medium text-gray-700 dark:text-slate-300">Upload Image/PDF</p>
                        <p className="text-xs text-gray-500 dark:text-slate-400 mt-2">{uploadedImages.length >= 5 ? 'Maximum reached' : 'Click to browse files'}</p>
                      </div>
                    </label>

                    <label className={`border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg p-8 hover:border-blue-400 transition-colors ${uploadedImages.length >= 5 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        capture="environment"
                        onChange={handleImageUpload}
                        disabled={uploadedImages.length >= 5}
                      />
                      <div className="flex flex-col items-center">
                        <svg className="w-10 h-10 text-gray-400 dark:text-slate-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <p className="text-sm font-medium text-gray-700 dark:text-slate-300">Take Photo</p>
                        <p className="text-xs text-blue-600 dark:text-blue-400 mt-2 hover:underline">{uploadedImages.length >= 5 ? 'Maximum reached' : 'Open device camera'}</p>
                      </div>
                    </label>
                  </div>

                  {uploadedImages.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-sm font-medium text-gray-700 dark:text-slate-300 mb-3">Uploaded Photos ({uploadedImages.length}/5)</h3>
                      <div className="grid grid-cols-5 gap-3">
                        {uploadedImages.map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={image}
                              alt={`Uploaded ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg border border-gray-300 dark:border-slate-600"
                            />
                            <button
                              onClick={() => handleRemoveImage(index)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              title="Remove image"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-slate-100 mb-2">Motivators & Concerns</h2>
                  <p className="text-sm text-gray-500 dark:text-slate-400 mb-6">Drives the talk track for acceptance.</p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Motivators</label>
                      <textarea
                        placeholder="What motivates the patient? (confidence, natural look, career, hygiene convenience, etc.)"
                        value={motivators}
                        onChange={(e) => setMotivators(e.target.value)}
                        rows={3}
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Concerns</label>
                      <textarea
                        placeholder="What concerns does the patient have? (budget, time, anxiety, sensitivity, etc.)"
                        value={concerns}
                        onChange={(e) => setConcerns(e.target.value)}
                        rows={3}
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Questions from Patient</label>
                      <textarea
                        placeholder="What questions does the patient have about the treatment?"
                        value={questionsFromPatient}
                        onChange={(e) => setQuestionsFromPatient(e.target.value)}
                        rows={3}
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="flex gap-4 text-sm text-blue-600 dark:text-blue-400">
                      <span>💡 Tip: Mirror 1-2 motivators verbatim</span>
                      <span>💡 Tip: Offer phased options</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Generate Plan Button */}
            <div className="flex justify-end">
              <button
                onClick={handleGeneratePlan}
                className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-3 shadow-lg hover:shadow-xl"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Generate Treatment Plan
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
