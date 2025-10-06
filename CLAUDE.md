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
  - Generate Treatment Plan (AI-powered plan generation)
  - All Plans (treatment plan history with regenerate options)
- **Treatment Plan Features**:
  - View script and formal plan
  - Regenerate with options (Additional Info, Tone, Script Length)
  - Generate Video button (purple, with tooltip)

### 4. Add Patient Page (/patients/add)
Multi-step paginated form with clickable step navigation:

- **Step 1: Patient Information**
  - First/Last Name, Age, Email, Phone, Notes

- **Step 2: Chart & Motivators**
  - Image upload (max 5 photos) with preview grid
  - Camera capture option
  - Uploaded photos displayed above form fields
  - Remove image on hover
  - Motivators textarea
  - Concerns textarea
  - Questions from Patient textarea

- **Step 3: Treatment Plan**
  - Display uploaded photos from Step 2
  - Generate Plan button (creates 10-step treatment sales strategy)
  - Generated plan uses patient data (name, motivators, concerns, questions)
  - Regenerate button with options:
    - Additional Information textarea
    - Tone dropdown (Professional, Empathetic & Gentle, Confident & Direct, Consultative)
    - Script Length dropdown (Brief, Standard, Detailed)
    - Generate New Script button
  - Generate Video button (purple, with tooltip: "Creates AI-generated video presentation")

- **Step 4: Outreach**
  - Email Plan section (patient email, message, send button)
  - Schedule AI Call section (mobile number, schedule button)
  - Complete button (green)

**Navigation**: Clickable step indicators allow jumping directly between steps. Progress indicator shows completed steps in blue.

## Data Structure

### Patient Interface (lib/patients-data.ts)
```typescript
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
```

### Current Patients (7 total)
1. Sarah Johnson
2. Michael Chen
3. Emily Rodriguez
4. James Wilson
5. Lisa Anderson
6. David Martinez
7. Rachel Green

## Development

- **Run dev server**: `npm run dev`
- **Local URL**: http://localhost:3000
- All patient data centralized in `lib/patients-data.ts`
- Patient IDs in routes fetch patient details
- Dark mode fully supported with `dark:` classes
- All forms use controlled React components

## UI/UX Considerations

- Interface should support coaching workflows for dentists
- Patient communication features (calls, video, messaging)
- Clear presentation of patient engagement status and treatment discussions
- Tools to help dentists prepare for and track difficult conversations
- AI interaction capabilities for automated patient outreach
- Consistent blue theme (#3B82F6) throughout
- Responsive design with mobile support
