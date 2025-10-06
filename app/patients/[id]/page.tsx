'use client'

import { useState, use, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Sidebar } from '@/components/ui/modern-side-bar'
import { Info } from 'lucide-react'
import { initialPatients } from '@/lib/patients-data'

type TabType = 'activity' | 'notes' | 'emails' | 'calls' | 'sms' | 'meetings' | 'treatment-plan' | 'all-plans'

interface PageProps {
  params: Promise<{ id: string }>
}

function PatientDetailPage({ params }: PageProps) {
  const { id } = use(params)
  const searchParams = useSearchParams()
  const tabParam = searchParams.get('tab') as TabType | null
  const viewPlanParam = searchParams.get('viewPlan')
  const [activeTab, setActiveTab] = useState<TabType>(tabParam || 'activity')

  // Load patient data from localStorage or initialPatients
  const [patientData, setPatientData] = useState<any>(null)

  useEffect(() => {
    // Load patient data on client side only
    const loadPatientData = () => {
      const saved = localStorage.getItem('patients')
      if (saved) {
        const patients = JSON.parse(saved)
        const found = patients.find((p: any) => p.id === parseInt(id))
        if (found) {
          setPatientData(found)
          return
        }
      }
      // Fallback to initialPatients
      const initial = initialPatients.find(p => p.id === parseInt(id))
      setPatientData(initial)
    }

    loadPatientData()
  }, [id])

  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam)
    }
  }, [tabParam])
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [viewingPlanDetail, setViewingPlanDetail] = useState<number | null>(viewPlanParam ? parseInt(viewPlanParam) : null)
  const [showRegenOptions, setShowRegenOptions] = useState(false)
  const [extraInfo, setExtraInfo] = useState('')
  const [regenTone, setRegenTone] = useState('professional')
  const [regenLength, setRegenLength] = useState('standard')
  const [zoomedImage, setZoomedImage] = useState<{ src: string; alt: string } | null>(null)

  // Notes state
  const [notes, setNotes] = useState([
    { id: 1, text: 'Patient prefers morning appointments. Has dental anxiety, needs extra reassurance.', date: '2 days ago', author: 'Dr. Smith' },
    { id: 2, text: 'Interested in cosmetic dentistry options. Discussed veneers and whitening.', date: '5 days ago', author: 'Dr. Smith' },
  ])
  const [noteText, setNoteText] = useState('')
  const [editingNote, setEditingNote] = useState<number | null>(null)

  // Emails state
  const [emails, setEmails] = useState([
    {
      id: 1,
      subject: 'Treatment Plan Follow-up',
      status: 'sent',
      from: 'clinic@dental.com',
      date: 'Dec 16, 2024',
      preview: 'Thank you for your interest in our cosmetic dentistry services. Attached is the detailed treatment plan we discussed...'
    },
    {
      id: 2,
      subject: 'Appointment Confirmation',
      status: 'sent',
      from: 'appointments@dental.com',
      date: 'Dec 14, 2024',
      preview: 'This is to confirm your appointment scheduled for December 20, 2024 at 2:00 PM with Dr. Smith...'
    },
  ])
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [emailSubject, setEmailSubject] = useState('')
  const [emailBody, setEmailBody] = useState('')

  // Form state for treatment plan
  const [budgetRange, setBudgetRange] = useState('')
  const [timeframe, setTimeframe] = useState('')
  const [previousTreatments, setPreviousTreatments] = useState('')
  const [concerns, setConcerns] = useState('')
  const [urgency, setUrgency] = useState('')
  const [resistance, setResistance] = useState('')

  const patient = patientData

  const activityData = [
    {
      type: 'email',
      title: 'Logged email',
      subtitle: 'Request Received',
      contact: 'Contact: Sarah Johnson',
      time: 'May 6, 2021 at 11:04 PM CDT',
      icon: 'mail'
    },
    {
      type: 'call',
      title: 'Call',
      subtitle: 'No owner',
      contact: null,
      time: 'May 6, 2021 at 11:06 PM CDT',
      icon: 'phone'
    },
    {
      type: 'contact',
      title: 'Contact created',
      subtitle: 'This contact was created from Offline Sources',
      contact: null,
      time: 'May 6, 2021 at 11:03 PM CDT',
      icon: 'check'
    },
  ]

  // Note handlers
  const handleAddNote = () => {
    if (!noteText.trim()) return
    const newNote = {
      id: Math.max(...notes.map(n => n.id)) + 1,
      text: noteText,
      date: 'Just now',
      author: 'Dr. Smith'
    }
    setNotes([newNote, ...notes])
    setNoteText('')
  }

  const handleEditNote = (id: number) => {
    const note = notes.find(n => n.id === id)
    if (note) {
      setEditingNote(id)
      setNoteText(note.text)
    }
  }

  const handleUpdateNote = () => {
    if (!noteText.trim() || editingNote === null) return
    setNotes(notes.map(n => n.id === editingNote ? { ...n, text: noteText } : n))
    setNoteText('')
    setEditingNote(null)
  }

  const handleDeleteNote = (id: number) => {
    if (confirm('Delete this note?')) {
      setNotes(notes.filter(n => n.id !== id))
    }
  }

  // Email handlers
  const handleSendEmail = () => {
    if (!emailSubject.trim() || !emailBody.trim()) {
      alert('Please fill in subject and body')
      return
    }
    const newEmail = {
      id: Math.max(...emails.map(e => e.id)) + 1,
      subject: emailSubject,
      status: 'sent' as const,
      from: 'clinic@dental.com',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      preview: emailBody.substring(0, 100) + (emailBody.length > 100 ? '...' : '')
    }
    setEmails([newEmail, ...emails])
    setShowEmailForm(false)
    setEmailSubject('')
    setEmailBody('')
  }

  const handleDeleteEmail = (id: number) => {
    if (confirm('Delete this email?')) {
      setEmails(emails.filter(e => e.id !== id))
    }
  }

  const callsData = [
    { id: 1, type: 'Outgoing', duration: '8:32', date: '2 hours ago', notes: 'Discussed implant options and pricing' },
    { id: 2, type: 'Incoming', duration: '4:15', date: '3 days ago', notes: 'Patient inquired about appointment availability' },
  ]

  const tasksData = [
    { id: 1, task: 'Send follow-up email with implant brochure', status: 'pending', dueDate: 'Tomorrow' },
    { id: 2, task: 'Schedule consultation for next week', status: 'completed', dueDate: 'Today' },
  ]

  const meetingsData = [
    { id: 1, title: 'Initial Consultation - Implants', date: 'Tomorrow at 10:00 AM', location: 'Clinic Room 2' },
    { id: 2, title: 'Follow-up Discussion', date: 'Next Friday at 2:00 PM', location: 'Clinic Room 1' },
  ]

  const [treatmentPlans, setTreatmentPlans] = useState([
    {
      id: 1,
      date: '14/07/2025',
      title: 'Crown & Bridge Treatment',
      status: 'Presented',
      total: '$7,880.00',
      script: `Treatment Plan Presentation Script

OPENING
Thanks for coming in today. I've had a chance to review your X-rays and examination, and I'd like to walk you through what I found and discuss the best way forward for your dental health.

PRESENTING THE SITUATION
So looking at your panoramic X-ray here, you can see we've got some concerns in your upper front area with teeth eleven, twelve, and twenty-one. Unfortunately these teeth have deteriorated to the point where we can't save them with simple fillings. What I'm recommending is that we remove tooth twelve and twenty-one, and replace them with full crowns. For tooth eleven here in the middle, we'll do a bridge pontic which connects to the adjacent crowns. This gives you a natural-looking result that functions just like your natural teeth.

We've also got some decay in your back molars - teeth twenty-four, twenty-five, twenty-six, and twenty-eight. These need adhesive restorations to stop the decay and restore function. The good news is we can save these teeth with proper restoration.

THE INVESTMENT
The total investment for the front teeth work is sixty-three hundred dollars, and the molar restorations come to twelve ninety. So we're looking at seventy-five ninety total to get everything taken care of.

WHY THIS MATTERS
Now let me tell you why I'm recommending we move forward with this. First, these issues aren't going to improve on their own, they only get worse and more expensive. Second, your front teeth affect your ability to eat properly and obviously your smile. Third, when we lose teeth and don't replace them, the jawbone starts to deteriorate. This treatment prevents that and protects your existing dental work.

HANDLING OBJECTIONS
[If cost is a concern]
I understand it's a significant investment. But let me put it in perspective - this work will last ten to fifteen years or more with proper care. That works out to about five to seven hundred dollars a year. We also have payment plans that can break this into manageable monthly amounts. And honestly, delaying this will only mean more extensive and expensive work down the track. Would you like to hear about our payment options?

[If they want to think about it]
I completely understand. Can I ask what's giving you pause - is it the cost, the extent of treatment, or something else? What concerns me is that tooth twelve and twenty-one could abscess if we wait too long, and that means pain and emergency treatment. How about we schedule a follow-up in two weeks so you have time to think and we can answer any questions?

[If they want to stage treatment]
Absolutely. Priority one is the front teeth - that's the most urgent both functionally and cosmetically. That's the sixty-three hundred. Then we can do the molar restorations three to six months later, but I wouldn't wait longer than that. Does staging it like that work better for you?

CLOSING
Based on what I'm seeing today, this treatment plan is genuinely the best way to restore your dental health and prevent bigger problems. Once this work is done, you'll have a strong, functional smile that serves you well for years to come. What questions do you have for me?

[After answering questions]
Are you comfortable moving forward? I'd like to get you scheduled as soon as possible. My treatment coordinator can go over payment options and get you on the calendar today. Sound good?`,
      formalPlan: `DENTAL TREATMENT PLAN
Patient: Ms Sarah Johnson
Date of Birth: 18/11/1982
Age: 42 years
Date: 14/07/2025
Treating Dentist: Dr. Smith

CLINICAL FINDINGS
Following comprehensive oral examination and radiographic assessment (panoramic X-ray), the following conditions have been identified requiring treatment:

Upper Anterior Region: Teeth 11, 12, and 21 show significant structural compromise requiring extraction and prosthetic replacement.
Upper Posterior Region: Teeth 24, 25, 26, and 28 present with carious lesions requiring restorative intervention.

RECOMMENDED TREATMENT

PHASE 1: ANTERIOR RESTORATION

Tooth 12 (Upper Right Lateral Incisor)
• Procedure: Full Crown - Non-metallic (Ceramic/Porcelain)
• Item Code: 613
• Fee: $2,200.00

Tooth 11 (Upper Right Central Incisor)
• Procedure: Removal/Extraction
• Item Code: 311
• Fee: $320.00
• Followed by: Bridge Pontic - Indirect (Porcelain Fused to Metal)
• Item Code: 643
• Fee: $1,900.00

Tooth 21 (Upper Left Central Incisor)
• Procedure: Full Crown - Non-metallic (Ceramic/Porcelain)
• Item Code: 613
• Fee: $2,200.00

Phase 1 Subtotal: $6,620.00

PHASE 2: POSTERIOR RESTORATION

Tooth 24 (Upper Left First Premolar)
• Procedure: Adhesive Restoration (Composite)
• Item Code: 533
• Fee: $360.00

Tooth 25 (Upper Left Second Premolar)
• Procedure: Adhesive Restoration (Composite)
• Item Code: 533
• Fee: $360.00

Tooth 26 (Upper Left First Molar)
• Procedure: Adhesive Restoration (Composite)
• Item Code: 532
• Fee: $290.00

Tooth 28 (Upper Left Third Molar)
• Procedure: Adhesive Restoration (Composite)
• Item Code: 531
• Fee: $250.00

Phase 2 Subtotal: $1,260.00

TREATMENT SUMMARY
Phase | Description | Investment
Phase 1 | Anterior Crown & Bridge Work (Teeth 11, 12, 21) | $6,620.00
Phase 2 | Posterior Restorations (Teeth 24, 25, 26, 28) | $1,260.00
TOTAL | Complete Treatment Plan | $7,880.00

TREATMENT OBJECTIVES
• Restore function and aesthetics to the anterior dentition
• Eliminate active dental caries in posterior teeth
• Prevent further tooth loss and bone resorption
• Restore proper occlusion and masticatory function
• Improve overall oral health and patient confidence

PROGNOSIS
With completion of the recommended treatment and maintenance of good oral hygiene, the prognosis is excellent. Expected longevity of restorations: 10-15+ years with proper care.

PAYMENT OPTIONS
• Full payment: Due on completion of each phase
• Payment plans available: Please discuss with reception
• Health fund claims: We process on-site (gap payment required)

PATIENT CONSENT
I have had the proposed treatment explained to me, including the benefits, risks, and alternatives. I understand the fees involved and agree to proceed with treatment.

Patient Signature: _________________________ Date: _____________
Dentist Signature: _________________________ Date: _____________

Next Appointment: ________________________
Notes: Treatment should commence as soon as possible to prevent further deterioration.`,
      images: ['/api/placeholder/400/300', '/api/placeholder/400/300']
    },
    {
      id: 2,
      date: '01/06/2025',
      title: 'Teeth Whitening & Cleaning',
      status: 'Accepted',
      total: '$850.00',
      script: 'Basic whitening consultation script...',
      formalPlan: 'Formal whitening treatment plan...',
      images: ['/api/placeholder/400/300']
    },
  ])

  // Treatment plan handlers
  const handleDeleteTreatmentPlan = (id: number) => {
    if (confirm('Delete this treatment plan?')) {
      setTreatmentPlans(treatmentPlans.filter(p => p.id !== id))
      if (viewingPlanDetail === id) {
        setViewingPlanDetail(null)
      }
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const fileNames = Array.from(files).map((file) => file.name)
      setUploadedFiles([...uploadedFiles, ...fileNames])
    }
  }

  const handleGenerateScript = () => {
    alert('Generating advice based on patient information...')
  }

  // Show loading state while patient data is being loaded
  if (!patientData) {
    return (
      <div className="flex h-screen bg-[#E5E7EB] dark:bg-slate-950">
        <Sidebar />
        <main className="flex-1 overflow-y-auto flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-slate-400 text-sm">Loading patient data...</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-[#E5E7EB] dark:bg-slate-950">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-6 lg:p-8 pt-20 md:pt-8">
          {/* Back Button */}
          <Link
            href="/patients"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-slate-400 hover:text-gray-800 dark:hover:text-slate-200 mb-6 text-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Patients
          </Link>

          {/* Patient Header */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-md p-8 mb-6">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-2xl flex-shrink-0">
                {patient.initials}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100">{patient.patientId} ({patient.initials})</h1>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-medium rounded-full">
                    interested
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-slate-300 rounded-xl hover:bg-[#F9FAFB] dark:hover:bg-slate-800 transition-colors text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-slate-300 rounded-xl hover:bg-[#F9FAFB] dark:hover:bg-slate-800 transition-colors text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-slate-300 rounded-xl hover:bg-[#F9FAFB] dark:hover:bg-slate-800 transition-colors text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    SMS
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-slate-300 rounded-xl hover:bg-[#F9FAFB] dark:hover:bg-slate-800 transition-colors text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Meet
                  </button>
                </div>

                {/* Patient Info */}
                <div className="text-sm text-gray-600 dark:text-slate-400 space-y-1">
                  <p><span className="font-medium text-gray-700 dark:text-slate-300">Email:</span> {patient.email}</p>
                  <p><span className="font-medium text-gray-700 dark:text-slate-300">Phone:</span> {patient.phone}</p>
                  <p><span className="font-medium text-gray-700 dark:text-slate-300">Last Contact:</span> {patient.lastContact}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-md">
            <div className="border-b border-gray-200 dark:border-slate-700 overflow-x-auto">
              <nav className="flex gap-2 px-6 pt-4">
                {[
                  { id: 'activity', label: 'Activity' },
                  { id: 'notes', label: 'Notes' },
                  { id: 'emails', label: 'Emails' },
                  { id: 'calls', label: 'Calls' },
                  { id: 'sms', label: 'SMS' },
                  { id: 'meetings', label: 'Meetings' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => { setActiveTab(tab.id as TabType); setViewingPlanDetail(null); }}
                    className={`px-4 py-2.5 font-medium text-sm whitespace-nowrap transition-colors ${
                      activeTab === tab.id ? 'text-gray-800 dark:text-slate-100 border-b-2 border-blue-600' : 'text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
                <button
                  onClick={() => { setActiveTab('treatment-plan'); setViewingPlanDetail(null); }}
                  className={`px-4 py-2.5 font-medium text-sm whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                    activeTab === 'treatment-plan'
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent border-b-2 border-blue-600'
                      : 'bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent hover:from-blue-500 hover:to-blue-700'
                  }`}
                >
                  <svg className="w-3.5 h-3.5 fill-blue-500" viewBox="0 0 24 24">
                    <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" />
                  </svg>
                  Generate Treatment Plan
                </button>
                <button
                  onClick={() => { setActiveTab('all-plans'); setViewingPlanDetail(null); }}
                  className={`px-4 py-2.5 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === 'all-plans' ? 'text-gray-800 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  All Plans
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {/* Activity Tab */}
              {activeTab === 'activity' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">Activity Timeline</h3>
                  <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-blue-200"></div>

                    {activityData.map((activity, index) => (
                      <div key={index} className="relative pl-14 pb-8 last:pb-0">
                        {/* Icon */}
                        <div className="absolute left-3 top-0 w-6 h-6 bg-white border-2 border-blue-500 rounded-full flex items-center justify-center">
                          {activity.icon === 'mail' && (
                            <svg className="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          )}
                          {activity.icon === 'phone' && (
                            <svg className="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          )}
                          {activity.icon === 'check' && (
                            <svg className="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>

                        {/* Content */}
                        <div>
                          <h4 className="font-semibold text-gray-800 dark:text-slate-100">{activity.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{activity.subtitle}</p>
                          {activity.contact && (
                            <p className="text-sm text-blue-600 mt-1">{activity.contact}</p>
                          )}
                          <p className="text-xs text-gray-400 mt-2">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes Tab */}
              {activeTab === 'notes' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">{editingNote ? 'Edit Note' : 'Add New Note'}</h3>
                    <textarea
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Add notes about this patient..."
                    />
                    <div className="flex gap-3 mt-3">
                      <button
                        onClick={editingNote ? handleUpdateNote : handleAddNote}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        {editingNote ? 'Update Note' : 'Save Note'}
                      </button>
                      {editingNote && (
                        <button
                          onClick={() => { setEditingNote(null); setNoteText('') }}
                          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-slate-950"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-4">Previous Notes</h3>
                    <div className="space-y-3">
                      {notes.map((note) => (
                        <div key={note.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="text-sm text-gray-700 dark:text-slate-300">{note.text}</p>
                              <p className="text-xs text-gray-500 mt-2">By {note.author} • {note.date}</p>
                            </div>
                            <div className="flex gap-2 ml-4">
                              <button
                                onClick={() => handleEditNote(note.id)}
                                className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                                title="Edit note"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleDeleteNote(note.id)}
                                className="p-1 text-red-600 hover:bg-red-50 rounded"
                                title="Delete note"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Emails Tab */}
              {activeTab === 'emails' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-slate-100">Email Communications</h3>
                    <button
                      onClick={() => setShowEmailForm(!showEmailForm)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      {showEmailForm ? 'Cancel' : '+ New Email'}
                    </button>
                  </div>

                  {showEmailForm && (
                    <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-800 mb-4">Compose Email</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                          <input
                            type="text"
                            value={emailSubject}
                            onChange={(e) => setEmailSubject(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Email subject..."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                          <textarea
                            value={emailBody}
                            onChange={(e) => setEmailBody(e.target.value)}
                            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Email message..."
                          />
                        </div>
                        <button
                          onClick={handleSendEmail}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          Send Email
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    {emails.map((email) => (
                      <div key={email.id} className="border border-gray-200 rounded-lg p-5 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3 flex-1">
                            <div className="w-8 h-8 bg-blue-50 rounded flex items-center justify-center">
                              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-800 dark:text-slate-100">{email.subject}</h4>
                              <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                                {email.status}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-500">{email.date}</span>
                            <button
                              onClick={() => handleDeleteEmail(email.id)}
                              className="p-1 text-red-600 hover:bg-red-50 rounded"
                              title="Delete email"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">From: {email.from}</p>
                        <p className="text-sm text-gray-600 dark:text-slate-400">{email.preview}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Calls Tab */}
              {activeTab === 'calls' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-slate-100 mb-6">Call History</h3>
                  <div className="space-y-4">
                    {callsData.map((call) => (
                      <div key={call.id} className="border border-gray-200 dark:border-slate-700 rounded-lg p-5 hover:bg-gray-50 dark:hover:bg-slate-800 cursor-pointer transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 ${call.type === 'Outgoing' ? 'bg-blue-50 dark:bg-blue-900/30' : 'bg-green-50 dark:bg-green-900/30'} rounded flex items-center justify-center`}>
                              <svg className={`w-4 h-4 ${call.type === 'Outgoing' ? 'text-blue-500 dark:text-blue-400' : 'text-green-500 dark:text-green-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-800 dark:text-slate-100">Call - {call.type}</h4>
                              <span className={`inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded ${call.type === 'Outgoing' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'}`}>
                                {call.duration}
                              </span>
                            </div>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-slate-400">{call.date}</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-slate-400">{call.notes}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SMS Tab */}
              {activeTab === 'sms' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-slate-100 mb-6">SMS Messages</h3>
                  <div className="space-y-4">
                    <div className="border border-gray-200 dark:border-slate-700 rounded-lg p-5 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-purple-50 dark:bg-purple-900/30 rounded flex items-center justify-center">
                            <svg className="w-4 h-4 text-purple-500 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800 dark:text-slate-100">Appointment Reminder</h4>
                            <span className="inline-block mt-1 px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-medium rounded">
                              Sent
                            </span>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-slate-400">1 day ago</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-slate-400">Hi Sarah, this is a reminder about your dental appointment tomorrow at 2:00 PM. Please reply YES to confirm or call us at (555) 123-4567.</p>
                    </div>

                    <div className="border border-gray-200 dark:border-slate-700 rounded-lg p-5 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-50 dark:bg-green-900/30 rounded flex items-center justify-center">
                            <svg className="w-4 h-4 text-green-500 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800 dark:text-slate-100">Treatment Plan Follow-up</h4>
                            <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium rounded">
                              Delivered
                            </span>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-slate-400">3 days ago</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-slate-400">Hi Sarah, we've prepared your personalized treatment plan. You can view it here: dentaled.com/plan/12345. Let us know if you have any questions!</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Meetings Tab */}
              {activeTab === 'meetings' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-slate-100 mb-6">Scheduled Meetings</h3>
                  <div className="space-y-4">
                    {meetingsData.map((meeting) => (
                      <div key={meeting.id} className="border border-gray-200 dark:border-slate-700 rounded-lg p-5 hover:bg-gray-50 dark:hover:bg-slate-800 cursor-pointer transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-indigo-50 dark:bg-indigo-900/30 rounded flex items-center justify-center">
                              <svg className="w-4 h-4 text-indigo-500 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-800 dark:text-slate-100">{meeting.title}</h4>
                              <span className="inline-block mt-1 px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 text-xs font-medium rounded">
                                {meeting.date}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-slate-400">📍 {meeting.location}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* All Plans Tab */}
              {activeTab === 'all-plans' && viewingPlanDetail === null && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">Treatment Plan History</h3>
                  <div className="space-y-4">
                    {treatmentPlans.map((plan) => (
                      <div key={plan.id} className="border border-gray-200 rounded-lg p-5 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <div className={`w-8 h-8 ${plan.status === 'Accepted' ? 'bg-green-50' : 'bg-yellow-50'} rounded flex items-center justify-center`}>
                              <svg className={`w-4 h-4 ${plan.status === 'Accepted' ? 'text-green-500' : 'text-yellow-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-800 dark:text-slate-100">{plan.title}</h4>
                              <div className="flex items-center gap-4 mt-2">
                                <span className="text-sm text-gray-600 dark:text-slate-400">{plan.date}</span>
                                <span className="text-sm text-gray-600 dark:text-slate-400">{plan.total}</span>
                              </div>
                              <span className={`inline-block mt-2 px-2 py-0.5 text-xs font-medium rounded ${plan.status === 'Accepted' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                {plan.status}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setViewingPlanDetail(plan.id)}
                              className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
                            >
                              View Details →
                            </button>
                            <button
                              onClick={() => handleDeleteTreatmentPlan(plan.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete treatment plan"
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
              )}

              {/* Plan Detail View */}
              {activeTab === 'all-plans' && viewingPlanDetail !== null && (
                <div>
                  <button
                    onClick={() => setViewingPlanDetail(null)}
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to All Plans
                  </button>

                  {treatmentPlans.filter(p => p.id === viewingPlanDetail).map((plan) => (
                    <div key={plan.id}>
                      {/* Header with Generate Video Button */}
                      <div className="mb-8">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-slate-100 mb-1">{plan.title}</h3>
                            <p className="text-sm text-gray-500 dark:text-slate-400">{plan.date} · {plan.total}</p>
                          </div>
                          <div className="relative group">
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm font-medium">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                              Generate Video
                            </button>
                            <div className="absolute top-full right-0 mt-2 w-64 bg-gray-900 text-white text-xs rounded-lg p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 shadow-lg">
                              Creates an AI-generated video presentation of the treatment plan
                              <div className="absolute -top-1 right-4 w-2 h-2 bg-gray-900 transform rotate-45"></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Diagnostic Images - Simplified */}
                      <div className="mb-8">
                        <h4 className="text-base font-medium text-gray-700 dark:text-slate-300 mb-4">Diagnostic Images</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                          {/* Dental Chart (SVG) */}
                          <div
                            onClick={() => setZoomedImage({ src: '/images/dental/chart-placeholder.svg', alt: 'Dental Chart' })}
                            className="group relative bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                          >
                            <div className="p-2 border-b border-gray-100 dark:border-slate-700">
                              <h5 className="text-xs font-medium text-gray-600 dark:text-slate-400">Dental Chart</h5>
                            </div>
                            <div className="relative aspect-[4/3] bg-gray-50 dark:bg-slate-800">
                              <img
                                src="/images/dental/chart-placeholder.svg"
                                alt="Dental Chart"
                                className="w-full h-full object-contain p-2"
                              />
                            </div>
                          </div>

                          {/* Panoramic X-Ray (SVG) */}
                          <div
                            onClick={() => setZoomedImage({ src: '/images/dental/xray-placeholder.svg', alt: 'Panoramic X-Ray' })}
                            className="group relative bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                          >
                            <div className="p-2 border-b border-gray-100 dark:border-slate-700">
                              <h5 className="text-xs font-medium text-gray-600 dark:text-slate-400">Panoramic X-Ray</h5>
                            </div>
                            <div className="relative aspect-[4/3] bg-gray-50 dark:bg-slate-800">
                              <img
                                src="/images/dental/xray-placeholder.svg"
                                alt="Panoramic X-Ray"
                                className="w-full h-full object-contain p-2"
                              />
                            </div>
                          </div>

                          {/* Dental Crowns Photo */}
                          <div
                            onClick={() => setZoomedImage({ src: '/images/dental/dental-crowns.jpg', alt: 'Dental Crowns' })}
                            className="group relative bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                          >
                            <div className="p-2 border-b border-gray-100 dark:border-slate-700">
                              <h5 className="text-xs font-medium text-gray-600 dark:text-slate-400">Dental Crowns</h5>
                            </div>
                            <div className="relative aspect-[4/3] bg-gray-50 dark:bg-slate-800">
                              <img
                                src="/images/dental/dental-crowns.jpg"
                                alt="Dental Crowns"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>

                          {/* Front X-Ray Photo */}
                          <div
                            onClick={() => setZoomedImage({ src: '/images/dental/dental-xray-front.jpg', alt: 'Front X-Ray' })}
                            className="group relative bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                          >
                            <div className="p-2 border-b border-gray-100 dark:border-slate-700">
                              <h5 className="text-xs font-medium text-gray-600 dark:text-slate-400">Front X-Ray</h5>
                            </div>
                            <div className="relative aspect-[4/3] bg-gray-50 dark:bg-slate-800">
                              <img
                                src="/images/dental/dental-xray-front.jpg"
                                alt="Front X-Ray"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>

                          {/* Panoramic X-Ray Photo */}
                          <div
                            onClick={() => setZoomedImage({ src: '/images/dental/dental-xray-panoramic.jpg', alt: 'Panoramic X-Ray Photo' })}
                            className="group relative bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                          >
                            <div className="p-2 border-b border-gray-100 dark:border-slate-700">
                              <h5 className="text-xs font-medium text-gray-600 dark:text-slate-400">Panoramic X-Ray</h5>
                            </div>
                            <div className="relative aspect-[4/3] bg-gray-50 dark:bg-slate-800">
                              <img
                                src="/images/dental/dental-xray-panoramic.jpg"
                                alt="Panoramic X-Ray Photo"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Patient Outreach - Card Style */}
                      <div className="mb-8">
                        <h4 className="text-base font-medium text-gray-700 dark:text-slate-300 mb-4">Patient Outreach</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Send Plan Card */}
                          <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg p-5 hover:shadow-md transition-shadow cursor-pointer group">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                  </svg>
                                </div>
                                <div>
                                  <h5 className="font-semibold text-gray-800 dark:text-slate-100">Send Plan</h5>
                                  <p className="text-xs text-gray-500 dark:text-slate-400">via Email/SMS</p>
                                </div>
                              </div>
                              <div className="relative group/tooltip">
                                <Info className="w-4 h-4 text-gray-400 hover:text-gray-600 dark:hover:text-slate-300 cursor-help" />
                                <div className="absolute right-0 top-6 w-64 bg-gray-900 text-white text-xs rounded-lg p-3 opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-10 shadow-lg">
                                  Share this treatment plan directly with the patient via email or text message with a personalized message.
                                  <div className="absolute -top-1 right-2 w-2 h-2 bg-gray-900 transform rotate-45"></div>
                                </div>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-slate-400 mb-4">
                              Share treatment plan with {patient.initials} through their preferred channel
                            </p>
                            <div className="flex gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setShowEmailModal(true)
                                }}
                                className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                              >
                                Email
                              </button>
                              <button
                                onClick={(e) => e.stopPropagation()}
                                className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                              >
                                SMS
                              </button>
                            </div>
                          </div>

                          {/* Schedule AI Call Card */}
                          <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg p-5 hover:shadow-md transition-shadow cursor-pointer group">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                  </svg>
                                </div>
                                <div>
                                  <h5 className="font-semibold text-gray-800 dark:text-slate-100">Schedule AI Call</h5>
                                  <p className="text-xs text-gray-500 dark:text-slate-400">Automated follow-up</p>
                                </div>
                              </div>
                              <div className="relative group/tooltip">
                                <Info className="w-4 h-4 text-gray-400 hover:text-gray-600 dark:hover:text-slate-300 cursor-help" />
                                <div className="absolute right-0 top-6 w-64 bg-gray-900 text-white text-xs rounded-lg p-3 opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-10 shadow-lg">
                                  AI will handle the follow-up call to discuss the treatment plan, answer questions, and address concerns using the treatment plan script.
                                  <div className="absolute -top-1 right-2 w-2 h-2 bg-gray-900 transform rotate-45"></div>
                                </div>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-slate-400 mb-4">
                              Let AI discuss the plan and answer patient questions
                            </p>
                            <button className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                              Schedule Call
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Treatment Plan Script - Simplified */}
                      <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-base font-medium text-gray-700 dark:text-slate-300">Treatment Plan Script</h4>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setShowRegenOptions(!showRegenOptions)}
                              className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
                            >
                              Regenerate
                            </button>
                            <button className="px-3 py-1.5 text-sm text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-lg transition-colors">
                              Edit
                            </button>
                          </div>
                        </div>

                        {/* Regeneration Options */}
                        {showRegenOptions && (
                          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
                            <h5 className="font-semibold text-gray-800 mb-4">Regeneration Options</h5>

                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Additional Information (e.g., patient resistance, concerns, special circumstances)
                                </label>
                                <textarea
                                  value={extraInfo}
                                  onChange={(e) => setExtraInfo(e.target.value)}
                                  placeholder="e.g., 'Patient is hesitant due to cost concerns and previous bad dental experience. Prefers gentle approach.'"
                                  rows={3}
                                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tone
                                  </label>
                                  <select
                                    value={regenTone}
                                    onChange={(e) => setRegenTone(e.target.value)}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  >
                                    <option value="professional">Professional</option>
                                    <option value="empathetic">Empathetic & Gentle</option>
                                    <option value="confident">Confident & Direct</option>
                                    <option value="consultative">Consultative</option>
                                  </select>
                                </div>

                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Script Length
                                  </label>
                                  <select
                                    value={regenLength}
                                    onChange={(e) => setRegenLength(e.target.value)}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  >
                                    <option value="brief">Brief</option>
                                    <option value="standard">Standard</option>
                                    <option value="detailed">Detailed</option>
                                  </select>
                                </div>
                              </div>

                              <button
                                onClick={() => {
                                  alert('Regenerating treatment plan script with custom parameters...')
                                  setShowRegenOptions(false)
                                }}
                                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg hover:shadow-xl transition-all"
                              >
                                Generate New Script
                              </button>
                            </div>
                          </div>
                        )}

                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                          <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">{plan.script}</pre>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Treatment Plan Tab */}
              {activeTab === 'treatment-plan' && (
                <div className="max-w-4xl">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Treatment Plan for {patient.patientId}
                  </h2>

                  {/* Upload Section */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Upload Images or Documents
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <label className="border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-blue-400 transition-colors cursor-pointer">
                        <input
                          type="file"
                          className="hidden"
                          multiple
                          onChange={handleFileUpload}
                          accept="image/*,.pdf,.doc,.docx"
                        />
                        <div className="text-center">
                          <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <p className="font-medium text-gray-700 dark:text-slate-300">Upload Files</p>
                          <p className="text-sm text-gray-500 mt-1">X-rays, photos, documents</p>
                        </div>
                      </label>

                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-blue-400 transition-colors cursor-pointer">
                        <div className="text-center">
                          <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <p className="font-medium text-gray-700 dark:text-slate-300">Take Screenshot</p>
                          <p className="text-sm text-gray-500 mt-1">Capture from screen</p>
                        </div>
                      </div>
                    </div>

                    {uploadedFiles.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Uploaded files:</p>
                        <ul className="space-y-1">
                          {uploadedFiles.map((file, index) => (
                            <li key={index} className="text-sm text-blue-600 flex items-center gap-2">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              {file}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Additional Notes Section */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-slate-100 mb-4">
                      Add Additional Note
                    </h3>
                    <textarea
                      rows={6}
                      placeholder="Enter any additional notes or observations about the patient's dental condition, treatment preferences, or special considerations..."
                      className="w-full px-4 py-3 border border-gray-200 dark:border-slate-600 bg-[#F5F7FA] dark:bg-slate-800 text-gray-900 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                    />
                  </div>

                  {/* Treatment Information Form */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Treatment Information
                    </h3>
                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          What is the patient's budget range?
                        </label>
                        <input
                          type="text"
                          value={budgetRange}
                          onChange={(e) => setBudgetRange(e.target.value)}
                          placeholder="e.g., $5,000 - $10,000"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          What is the desired treatment timeframe?
                        </label>
                        <input
                          type="text"
                          value={timeframe}
                          onChange={(e) => setTimeframe(e.target.value)}
                          placeholder="e.g., Within 3 months"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Has the patient had any previous dental treatments?
                        </label>
                        <textarea
                          value={previousTreatments}
                          onChange={(e) => setPreviousTreatments(e.target.value)}
                          placeholder="e.g., Root canal 2 years ago, regular cleanings"
                          rows={3}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          What are the patient's main concerns or goals?
                        </label>
                        <textarea
                          value={concerns}
                          onChange={(e) => setConcerns(e.target.value)}
                          placeholder="e.g., Improve smile appearance, fix chipped tooth"
                          rows={3}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          How urgent is this treatment?
                        </label>
                        <select
                          value={urgency}
                          onChange={(e) => setUrgency(e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select urgency level</option>
                          <option value="immediate">Immediate (within 1 week)</option>
                          <option value="soon">Soon (within 1 month)</option>
                          <option value="flexible">Flexible (within 3-6 months)</option>
                          <option value="planning">Just planning ahead</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          What resistance does the patient have for the treatment? (Use patient's own words)
                        </label>
                        <textarea
                          value={resistance}
                          onChange={(e) => setResistance(e.target.value)}
                          placeholder="e.g., 'I'm worried about the cost and recovery time'"
                          rows={3}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Generate Button */}
                  <button
                    onClick={handleGenerateScript}
                    className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-xl hover:shadow-xl transition-all transform hover:scale-[1.02]"
                  >
                    Generate Advice
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Image Zoom Modal */}
      {zoomedImage && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setZoomedImage(null)}
        >
          <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <button
              onClick={() => setZoomedImage(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-lg text-sm font-medium">
              {zoomedImage.alt}
            </div>
            <img
              src={zoomedImage.src}
              alt={zoomedImage.alt}
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      {/* Email Treatment Plan Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-800 dark:text-slate-100">Email Treatment Plan</h3>
              <div className="flex gap-3">
                <button className="px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg">
                  Edit Plan
                </button>
                <button
                  onClick={() => setShowEmailModal(false)}
                  className="text-gray-400 dark:text-slate-400 hover:text-gray-600 dark:hover:text-slate-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="px-6 py-6">
              <div className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-6">
                <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-slate-300 font-sans">
{`DENTAL TREATMENT PLAN
Patient: Ms Sarah Johnson
Date of Birth: 18/11/1982
Age: 42 years
Date: 14/07/2025
Treating Dentist: Dr. Smith

CLINICAL FINDINGS
Following comprehensive oral examination and radiographic assessment (panoramic X-ray), the following conditions have been identified requiring treatment:

Upper Anterior Region: Teeth 11, 12, and 21 show significant structural compromise requiring extraction and prosthetic replacement.
Upper Posterior Region: Teeth 24, 25, 26, and 28 present with carious lesions requiring restorative intervention.

RECOMMENDED TREATMENT

PHASE 1: ANTERIOR RESTORATION

Tooth 12 (Upper Right Lateral Incisor)
• Procedure: Full Crown - Non-metallic (Ceramic/Porcelain)
• Item Code: 613
• Fee: $2,200.00

Tooth 11 (Upper Right Central Incisor)
• Procedure: Removal/Extraction
• Item Code: 311
• Fee: $320.00
• Followed by: Bridge Pontic - Indirect (Porcelain Fused to Metal)
• Item Code: 643
• Fee: $1,900.00

Tooth 21 (Upper Left Central Incisor)
• Procedure: Full Crown - Non-metallic (Ceramic/Porcelain)
• Item Code: 613
• Fee: $2,200.00

Phase 1 Subtotal: $6,620.00

PHASE 2: POSTERIOR RESTORATION

Tooth 24 (Upper Left First Premolar)
• Procedure: Adhesive Restoration (Composite)
• Item Code: 533
• Fee: $360.00

Tooth 25 (Upper Left Second Premolar)
• Procedure: Adhesive Restoration (Composite)
• Item Code: 533
• Fee: $360.00

Tooth 26 (Upper Left First Molar)
• Procedure: Adhesive Restoration (Composite)
• Item Code: 532
• Fee: $290.00

Tooth 28 (Upper Left Third Molar)
• Procedure: Adhesive Restoration (Composite)
• Item Code: 531
• Fee: $250.00

Phase 2 Subtotal: $1,260.00

TREATMENT SUMMARY
Phase | Description | Investment
Phase 1 | Anterior Crown & Bridge Work (Teeth 11, 12, 21) | $6,620.00
Phase 2 | Posterior Restorations (Teeth 24, 25, 26, 28) | $1,260.00
TOTAL | Complete Treatment Plan | $7,880.00

TREATMENT OBJECTIVES
• Restore function and aesthetics to the anterior dentition
• Eliminate active dental caries in posterior teeth
• Prevent further tooth loss and bone resorption
• Restore proper occlusion and masticatory function
• Improve overall oral health and patient confidence

PROGNOSIS
With completion of the recommended treatment and maintenance of good oral hygiene, the prognosis is excellent. Expected longevity of restorations: 10-15+ years with proper care.

PAYMENT OPTIONS
• Full payment: Due on completion of each phase
• Payment plans available: Please discuss with reception
• Health fund claims: We process on-site (gap payment required)

PATIENT CONSENT
I have had the proposed treatment explained to me, including the benefits, risks, and alternatives. I understand the fees involved and agree to proceed with treatment.

Patient Signature: _________________________ Date: _____________
Dentist Signature: _________________________ Date: _____________

Next Appointment: ________________________
Notes: Treatment should commence as soon as possible to prevent further deterioration.`}
                </pre>
              </div>
              <div className="mt-6 flex gap-3">
                <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Send Email
                </button>
                <button
                  onClick={() => setShowEmailModal(false)}
                  className="px-6 py-3 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Page({ params }: PageProps) {
  return <PatientDetailPage params={params} />
}
