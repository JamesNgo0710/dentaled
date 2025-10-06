# DentalED - Project Context

## Project Purpose

DentalED is a communication tool designed to help dentists better engage with patients about dental treatments, particularly when cost and treatment discussions become challenging.

## Key Problems This Solves

1. **Cost Conversations** - Many patients are uncomfortable discussing treatment costs with their dentist. Treatments can be expensive, and dentists often struggle to properly present and sell these treatments to patients.

2. **Dentist Coaching** - The platform provides coaching to help dentists learn how to effectively communicate with patients about treatment options and costs, improving their ability to convince patients to proceed with necessary treatments.

3. **AI-Assisted Communication** - When dentists lack confidence in having difficult conversations, the AI can step in to handle calls or video consultations with patients on their behalf.

## Target Users

- **Primary**: Dentists and dental professionals who need help communicating treatment value and costs to patients
- **Secondary**: Patients who need clear, comfortable communication about their treatment options

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (with dark mode support)
- **UI Theme**: Blue (#3B82F6) primary color
- **Routing**: File-based routing

## Project Structure

```
/app
  - /page.tsx - Dashboard (home page)
  - /patients/page.tsx - Patients list page
  - /patients/[id]/page.tsx - Patient detail page
  - /patients/add/page.tsx - Add patient page (multi-step form)
/components/ui
  - /modern-side-bar.tsx - Main sidebar navigation
/lib
  - /patients-data.ts - Centralized patient data
/public/images/dental
  - chart-placeholder.svg - Dental chart SVG
  - xray-placeholder.svg - Panoramic X-ray SVG
  - tooth-icon.svg - Individual tooth icon SVG
```

## Key Features

### 1. Dashboard (/)
- Patient cards with pagination (3 per page with search functionality)
- Patient status badges (interested, not interested, pending)
- Search bar to filter patients
- "Add Patient" button linking to /patients/add
- Fixed height list that doesn't collapse with fewer patients

### 2. Patients List (/patients)
- Full patient list with pagination
- Links to individual patient detail pages

### 3. Patient Detail Page (/patients/[id])
- **Header**: Patient avatar, status, contact info
- **Action Buttons**: Call, Email, SMS, Meet
- **8 Tabs**:
  - Activity (timeline view)
  - Notes (add/edit/delete notes)
  - Emails (send/view emails)
  - Calls (call history)
  - SMS (SMS messages with status badges)
  - Meetings (scheduled meetings with calendar icon)
  - Generate Treatment Plan (AI-powered plan generation with dental images)
  - All Plans (treatment plan history with dental images in detail view)
- **Treatment Plan Features**:
  - View script and formal plan
  - Dental Chart & Panoramic X-Ray displayed
  - Regenerate with options (Additional Info, Tone, Script Length)
  - Generate Video button (purple, with tooltip)

### 4. Add Patient Page (/patients/add)
Single-page form with two sections:

- **Patient Information**
  - Patient ID (required)
  - Initials (required)
  - Age (optional)
  - Email (optional)
  - Phone (optional)
  - Notes (optional)

- **Chart & Motivators**
  - Image upload (max 5 photos) with preview grid
  - Camera capture option
  - Uploaded photos displayed with remove on hover
  - Motivators textarea
  - Concerns textarea
  - Questions from Patient textarea

- **Generate Treatment Plan Button**
  - Large button at bottom of form
  - Validates required fields (Patient ID, Initials)
  - Saves patient to localStorage
  - Shows 5-second loading screen with spinner
  - Redirects to patient detail page with All Plans tab open

**Workflow**:
1. User fills in patient information and motivators
2. Clicks "Generate Treatment Plan" button
3. System validates and saves patient data
4. Loading screen appears for 5 seconds (simulating plan generation)
5. Redirects to `/patients/{id}?tab=all-plans`

## Data Structure

### Patient Interface (lib/patients-data.ts)
```typescript
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
```

### Current Patients (7 total)
1. PT-001 (SJ) - Wants confident smile for upcoming wedding
2. PT-002 (MC) - Professional appearance for career advancement
3. PT-003 (ED) - Better oral health, reduce pain
4. PT-004 (JS) - Long-term health, appearance
5. PT-005 (LW) - Cosmetic improvement, self-confidence
6. PT-006 (DM) - Health concerns, family history
7. PT-007 (RG) - Natural look, hygiene convenience

All patients include motivators, concerns, and questions to drive personalized treatment plans.

## Dental Images

Located in /public/images/dental/:
- chart-placeholder.svg - Dental chart showing upper/lower teeth
- xray-placeholder.svg - Panoramic X-ray with dark background
- tooth-icon.svg - Individual tooth icon

All lightweight SVG format (<2KB each)

## Recent Changes

- ✅ Added lightweight dental SVG images
- ✅ Dental images in patient detail Generate Treatment Plan tab
- ✅ Dental images in All Plans detail view
- ✅ Dashboard shows 3 patients per page with search
- ✅ Fixed list height to prevent collapse
- ✅ Fixed Next.js 15 params type error (using use() hook)
- ✅ Fixed body overflow issue (double scrollbars)
- ✅ **Major Refactor: Patient Data Structure**
  - Changed from `name` to `patientId` and `initials`
  - Added optional fields: `age`, `notes`, `motivators`, `concerns`, `questionsFromPatient`, `uploadedImages`
  - Updated all 7 initial patients with new structure (PT-001 to PT-007)
  - Updated Dashboard, Patients List, and Patient Detail pages to display patientId/initials
- ✅ **Add Patient Workflow Redesign**
  - Simplified to single-page form (Patient Info + Chart & Motivators only)
  - Added "Generate Treatment Plan" button at bottom
  - Implements 5-second loading screen with progress indicator
  - Saves patient data to localStorage
  - Redirects to patient detail page with All Plans tab open
  - Supports URL query parameters for tab navigation
- ✅ **Patient Detail Page Enhancements**
  - Now loads patient data from localStorage or initialPatients
  - Supports `?tab=` query parameter to open specific tabs
  - Updated to use new patientId/initials structure

## Development

- **Run dev server**: `npm run dev`
- **Local URL**: http://localhost:3000 (or next available port)
- **Deployed**: Vercel (auto-deploys from master branch)
- **Repository**: https://github.com/JamesNgo0710/dentaled
- All patient data centralized in `lib/patients-data.ts`
- Patient IDs in routes fetch patient details
- Dark mode fully supported with `dark:` classes
- All forms use controlled React components
- Next.js 15 requires params to be Promise type with use() hook

## UI/UX Considerations

- Interface should support coaching workflows for dentists
- Patient communication features (calls, video, messaging)
- Clear presentation of patient engagement status and treatment discussions
- Tools to help dentists prepare for and track difficult conversations
- AI interaction capabilities for automated patient outreach
- Consistent blue theme (#3B82F6) throughout
- Responsive design with mobile support
