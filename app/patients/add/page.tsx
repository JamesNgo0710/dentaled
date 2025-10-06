'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Sidebar } from '@/components/ui/modern-side-bar'

export default function AddPatientPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [age, setAge] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [motivators, setMotivators] = useState('')
  const [concerns, setConcerns] = useState('')
  const [questionsFromPatient, setQuestionsFromPatient] = useState('')
  const [emailMessage, setEmailMessage] = useState('Hi there, we prepared a simple plan that fits your goals and budget. Would you like a quick call to walk you through it?')
  const [mobileNumber, setMobileNumber] = useState('')
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [generatedPlan, setGeneratedPlan] = useState<string | null>(null)
  const [showRegenOptions, setShowRegenOptions] = useState(false)
  const [extraInfo, setExtraInfo] = useState('')
  const [regenTone, setRegenTone] = useState('professional')
  const [regenLength, setRegenLength] = useState('standard')

  const totalSteps = 4

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      // Limit to 5 images maximum
      const remainingSlots = 5 - uploadedImages.length
      const filesToAdd = Array.from(files).slice(0, remainingSlots)

      // Convert images to base64 for preview
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

  const handleGeneratePlan = () => {
    // Generate a mock treatment plan
    const mockPlan = `TREATMENT SALES STRATEGY

STEP 1: ESTABLISH RAPPORT & EMPATHY
Start by acknowledging ${firstName}'s concerns and showing genuine understanding. Reference their motivators: ${motivators || 'their desire for improved dental health'}.

"${firstName}, I completely understand your concerns about ${concerns || 'the treatment process'}. Many of my patients have felt the same way initially."

STEP 2: PRESENT THE CLINICAL FINDINGS
Review the diagnostic images together, using visual aids to help them understand exactly what needs attention.

"Looking at your X-rays and photos, here's what I've identified that needs our attention..."

STEP 3: EXPLAIN THE RECOMMENDED TREATMENT
Break down the treatment into clear, understandable phases. Connect each phase to their motivators.

"Based on what we've discussed about ${motivators || 'your goals'}, I recommend we approach this treatment in 2-3 phases. This allows us to prioritize the most urgent needs first while working within your comfort level."

STEP 4: ADDRESS THE INVESTMENT
Present the financial aspect confidently but compassionately. Frame it as an investment in their health and quality of life.

"The total investment for the complete treatment plan is approximately $7,500-$9,000. I know that's significant, but let me explain why this is worthwhile and how we can make it work for you."

STEP 5: HANDLE OBJECTIONS PROACTIVELY
${questionsFromPatient ? `Address their specific questions: ${questionsFromPatient}` : 'Be prepared for common objections about cost, time, and necessity.'}

[If cost is a concern]
"I understand budget is important. We have flexible payment plans that can break this into manageable monthly amounts of $200-300. We can also phase the treatment - starting with the most critical work and spacing out the rest over 6-12 months."

[If they're hesitant]
"What specific aspect is giving you pause? I want to make sure all your questions are answered before you make any decision."

STEP 6: CREATE URGENCY (WITHOUT PRESSURE)
Explain the consequences of delaying treatment in a caring, professional manner.

"I want to be honest with you - dental issues don't improve on their own. Waiting typically means more extensive and expensive treatment later. The good news is that if we start now, we can prevent that and get you the results you're looking for."

STEP 7: OFFER OPTIONS & FLEXIBILITY
Give them control by presenting options for phasing, payment, and scheduling.

"Here are three ways we could approach this:
• Option 1: Complete treatment in one phase over 2 months
• Option 2: Phase it over 6 months, starting with the most urgent needs
• Option 3: A minimal intervention now, with full treatment planned for [timeframe]"

STEP 8: CLOSE WITH CONFIDENCE
Assume the sale and move toward scheduling, while remaining consultative.

"Based on everything we've discussed, I really believe Option 2 is your best path forward. It addresses ${motivators || 'your goals'} while being mindful of your schedule and budget. My coordinator can get you scheduled for Phase 1 as early as next week. Does that work for you?"

STEP 9: SECURE COMMITMENT
Get them to take a concrete next step, even if they need time to think.

"Let's at least get you on the schedule so we can hold a spot. You can always adjust if needed, but this way we're ready to move forward when you are."

STEP 10: FOLLOW-UP PLAN
Set clear expectations for next steps and maintain the relationship.

"I'm going to have my team send you the detailed treatment plan by email today. We'll also schedule a quick follow-up call in 2 days to answer any additional questions. Sound good?"

---

KEY TALKING POINTS:
• Emphasize the long-term value and prevention of bigger problems
• Use patient's own words and motivators throughout
• Show confidence in your recommendation
• Offer flexibility and options
• Create gentle urgency without being pushy
• Focus on THEIR outcomes and benefits, not technical details`

    setGeneratedPlan(mockPlan)
  }

  const handleRegeneratePlan = () => {
    const toneDescriptions = {
      professional: 'professional and clinical',
      empathetic: 'warm and empathetic',
      confident: 'confident and direct',
      consultative: 'consultative and collaborative'
    }

    const mockRegenPlan = `TREATMENT SALES STRATEGY (${toneDescriptions[regenTone as keyof typeof toneDescriptions]} tone - ${regenLength} version)
${extraInfo ? `\nSPECIAL CONSIDERATIONS: ${extraInfo}\n` : ''}
[Regenerated plan with adjusted tone and length would appear here...]

This is a ${regenLength} version with a ${toneDescriptions[regenTone as keyof typeof toneDescriptions]} approach, taking into account: ${extraInfo || 'standard patient concerns'}.

The plan has been tailored to address the patient's specific situation while maintaining an appropriate ${regenTone} tone throughout the conversation.`

    setGeneratedPlan(mockRegenPlan)
    setShowRegenOptions(false)
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-950">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-6 lg:p-8 pt-20 md:pt-8 max-w-4xl mx-auto">
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
                <p className="text-sm text-gray-500 dark:text-slate-400">Create personalized treatment plans and manage patient communication</p>
              </div>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center flex-1">
                  <button
                    onClick={() => setCurrentStep(step)}
                    className="flex items-center group cursor-pointer"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                        step <= currentStep
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 dark:bg-slate-700 text-gray-500 dark:text-slate-400 group-hover:bg-gray-300 dark:group-hover:bg-slate-600'
                      }`}
                    >
                      {step}
                    </div>
                    <span
                      className={`ml-3 text-sm font-medium transition-colors ${
                        step <= currentStep
                          ? 'text-gray-800 dark:text-slate-100'
                          : 'text-gray-500 dark:text-slate-400 group-hover:text-gray-700 dark:group-hover:text-slate-300'
                      }`}
                    >
                      {step === 1 && 'Patient Info'}
                      {step === 2 && 'Chart & Motivators'}
                      {step === 3 && 'Treatment Plan'}
                      {step === 4 && 'Outreach'}
                    </span>
                  </button>
                  {step < 4 && (
                    <div
                      className={`flex-1 h-1 mx-4 rounded ${
                        step < currentStep
                          ? 'bg-blue-600'
                          : 'bg-gray-200 dark:bg-slate-700'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-700 p-8">
            {/* Step 1: Patient Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-slate-100 mb-2">Patient Information</h2>
                  <p className="text-sm text-gray-500 dark:text-slate-400">Quick, minimal details to personalise the plan.</p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">First Name</label>
                      <input
                        type="text"
                        placeholder="Enter first name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Last Name</label>
                      <input
                        type="text"
                        placeholder="Enter last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Age</label>
                      <input
                        type="text"
                        placeholder="Age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Email</label>
                      <input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Phone</label>
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
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Notes</label>
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
            )}

            {/* Step 2: Chart & Motivators */}
            {currentStep === 2 && (
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

                  {/* Image Previews */}
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
            )}

            {/* Step 3: Treatment Plan */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-slate-100 mb-2">AI Plan & Playbook</h2>
                  <p className="text-sm text-gray-500 dark:text-slate-400">Step-by-step explainer generated from chart + motivators.</p>
                </div>

                {/* Show uploaded images if any */}
                {uploadedImages.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-slate-300 mb-3">Treatment Photos</h3>
                    <div className="grid grid-cols-5 gap-3">
                      {uploadedImages.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image}
                            alt={`Treatment ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg border border-gray-300 dark:border-slate-600"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Patient Dental Records */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-slate-300 mb-3">Patient Dental Records</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Dental Chart */}
                    <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl p-4 hover:shadow-lg transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-semibold text-gray-800 dark:text-slate-100">Dental Chart</h4>
                        <span className="text-xs text-gray-500 dark:text-slate-400">Current</span>
                      </div>
                      <img
                        src="/images/dental/chart-placeholder.svg"
                        alt="Dental Chart"
                        className="w-full h-auto rounded-lg"
                      />
                    </div>

                    {/* X-Ray */}
                    <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl p-4 hover:shadow-lg transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-semibold text-gray-800 dark:text-slate-100">Panoramic X-Ray</h4>
                        <span className="text-xs text-gray-500 dark:text-slate-400">Recent</span>
                      </div>
                      <img
                        src="/images/dental/xray-placeholder.svg"
                        alt="Panoramic X-Ray"
                        className="w-full h-auto rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                {!generatedPlan ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <p className="text-gray-600 dark:text-slate-400 mb-6 text-lg">Click Generate Plan to create a tailored talk track.</p>
                    <button
                      onClick={handleGeneratePlan}
                      className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto text-lg font-medium"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Generate Plan
                    </button>
                  </div>
                ) : (
                  <div>
                    {/* Regenerate Options Bar */}
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-slate-100">Treatment Sales Strategy</h3>
                      <div className="flex gap-3">
                        <button
                          onClick={() => setShowRegenOptions(!showRegenOptions)}
                          className="px-4 py-2 text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          Regenerate
                        </button>
                        <div className="relative group">
                          <button className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Generate Video
                          </button>
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-10">
                            Creates AI-generated video presentation
                            <svg className="inline-block w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Regeneration Options */}
                    {showRegenOptions && (
                      <div className="mb-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                        <h4 className="font-semibold text-gray-800 dark:text-slate-100 mb-4">Regeneration Options</h4>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                              Additional Information (e.g., patient resistance, concerns, special circumstances)
                            </label>
                            <textarea
                              value={extraInfo}
                              onChange={(e) => setExtraInfo(e.target.value)}
                              placeholder="e.g., 'Patient is hesitant due to cost concerns and previous bad dental experience. Prefers gentle approach.'"
                              rows={3}
                              className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                                Tone
                              </label>
                              <select
                                value={regenTone}
                                onChange={(e) => setRegenTone(e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                <option value="professional">Professional</option>
                                <option value="empathetic">Empathetic & Gentle</option>
                                <option value="confident">Confident & Direct</option>
                                <option value="consultative">Consultative</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                                Script Length
                              </label>
                              <select
                                value={regenLength}
                                onChange={(e) => setRegenLength(e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                <option value="brief">Brief</option>
                                <option value="standard">Standard</option>
                                <option value="detailed">Detailed</option>
                              </select>
                            </div>
                          </div>

                          <button
                            onClick={handleRegeneratePlan}
                            className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg hover:shadow-xl transition-all"
                          >
                            Generate New Script
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Generated Plan Display */}
                    <div className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-6">
                      <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-slate-300 font-sans">{generatedPlan}</pre>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Outreach */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-slate-100 mb-2">Outreach</h2>
                  <p className="text-sm text-gray-500 dark:text-slate-400">Send the plan and schedule an AI call.</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {/* Email Section */}
                  <div className="border border-gray-200 dark:border-slate-700 rounded-lg p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-gray-800 dark:text-slate-100">Email Plan</h3>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Patient Email</label>
                        <input
                          type="email"
                          placeholder="patient@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Email Message</label>
                        <textarea
                          value={emailMessage}
                          onChange={(e) => setEmailMessage(e.target.value)}
                          rows={4}
                          className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        Send Email
                      </button>
                    </div>
                  </div>

                  {/* AI Call Section */}
                  <div className="border border-gray-200 dark:border-slate-700 rounded-lg p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-gray-800 dark:text-slate-100">Schedule AI Call</h3>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Mobile Number</label>
                        <input
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                        <p className="text-sm text-gray-700 dark:text-slate-300">
                          💬 Agent uses the playbook as the call script and books Phase-1.
                        </p>
                      </div>

                      <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Schedule Call
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="px-6 py-3 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>

            {currentStep < totalSteps ? (
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                Next
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ) : (
              <button
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Complete
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
