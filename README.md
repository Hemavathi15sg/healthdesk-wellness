# HealthDesk Wellness

A modern wellness management dashboard built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui** components. Track patient health goals, manage appointments, and monitor wellness progress with an intuitive, accessible interface.

**Live Demo:** `http://localhost:3000`

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Features](#features)
- [Pages & Routes](#pages--routes)
- [Components](#components)
- [Types & Data Models](#types--data-models)
- [Utilities](#utilities)
- [Styling & Theme](#styling--theme)
- [API Endpoints](#api-endpoints)
- [Color System](#color-system)
- [Development Workflow](#development-workflow)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Project Overview

**HealthDesk Wellness** is a healthcare management platform focused on patient wellness tracking. It enables coordinators to:
- View and manage patient profiles with health metrics
- Track wellness goals and progress
- Schedule and manage appointments
- Monitor dashboard analytics
- Support both light and dark mode interfaces

**Tech Stack:**
| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| UI Components | shadcn/ui |
| Icons | Lucide React |
| Charts | Recharts |
| Forms | React Hook Form + Zod |
| State | React Hooks |

**Color Palette:**
- **Primary:** Purple (`#a855f7`)
- **Secondary:** Emerald (`#10b981`)
- **Accent:** Violet, Amber, Rose
- **Neutral:** Slate

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone or navigate to project:**
   ```bash
   cd healthdesk-wellness
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Open browser:**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

---

## 📁 Project Structure

```
healthdesk-wellness/
├── README.md
├── package.json              # Dependencies & scripts
├── tsconfig.json             # TypeScript config (strict mode)
├── next.config.ts            # Next.js configuration
│
├── app/                       # Next.js App Router
│   ├── layout.tsx             # Root layout with Sidebar
│   ├── page.tsx               # Home / Hero page
│   ├── globals.css            # Global styles + theme
│   │
│   ├── dashboard/
│   │   └── page.tsx           # Analytics dashboard
│   │
│   ├── patients/
│   │   └── page.tsx           # Patient list & detail modal
│   │
│   ├── wellness/
│   │   └── page.tsx           # Wellness goals tracking
│   │
│   ├── appointments/
│   │   └── page.tsx           # Appointment booking (3-step form)
│   │
│   └── api/
│       └── patients/
│           └── route.ts       # GET /api/patients?status=...
│
├── components/                # React components
│   ├── Sidebar.tsx            # Navigation + dark mode toggle
│   ├── ProgressRing.tsx       # Circular progress visualization
│   │
│   └── ui/                    # shadcn/ui components
│       └── [shadcn components]
│
└── lib/                       # Utilities & data
    ├── types.ts              # TypeScript interfaces
    ├── mockData.ts           # Sample patient & goal data
    └── utils.ts              # Helper functions (cn, getStatusColor, etc.)
```

---

## 🏗️ Architecture

### State Management
- **React Hooks** (`useState`, `useEffect`)
- No Redux/Zustand — components manage local state
- Mock data imported directly from `lib/mockData.ts`

### Routing
- **Next.js App Router** with `"use client"` for interactive pages
- Server-side rendering for static content
- Dynamic segments for future patient detail pages

### Styling
- **Tailwind CSS** for all styling (no inline styles)
- **Dark mode support** with `dark:` prefix on all color classes
- **Mobile-first responsive design** (`md:`, `lg:`, `xl:` breakpoints)
- **Custom CSS classes** in `globals.css` (`.wellness-card`, `.stat-card`, etc.)

### Data Flow
```
mockData.ts → components → pages
    ↓
wellnessPatients[]
wellnessGoals[]
appointments[]
dashboardStats
    ↓
Displayed via React components
```

---

## ✨ Features

### 1. **Home Page** (`/`)
- Hero section with wellness branding
- Navigation cards for key modules
- Community statistics
- Call-to-action buttons

### 2. **Dashboard** (`/dashboard`)
- Stats cards: Total members, Thriving, Monitoring, Needs Attention
- Wellness trend chart (weekly progression)
- Responsive grid layout
- Dark mode support

### 3. **Patients / My Health** (`/patients`)
- Grid of patient wellness cards (1→2→4 columns mobile to desktop)
- Circular progress ring per patient
- Click to view detailed modal with:
  - Full health metrics
  - Active health goals
  - Contact information
  - Enrollment details

### 4. **Wellness Goals** (`/wellness`)
- Track goals by patient
- Progress bars for each goal
- Status indicators (Active/Completed/Abandoned)
- Visual progress tracking

### 5. **Appointments** (`/appointments`)
- 3-step booking form:
  1. Select patient
  2. Choose appointment type & date/time
  3. Assign coordinator & confirm
- Form validation with React Hook Form + Zod
- Success/error handling

### 6. **API**
- `GET /api/patients?status=Thriving|Monitoring|NeedsAttention`
- Returns filtered patient list with count & timestamp

---

## 📄 Pages & Routes

| Route | File | Purpose |
|-------|------|---------|
| `/` | `app/page.tsx` | Home/hero page |
| `/dashboard` | `app/dashboard/page.tsx` | Analytics overview |
| `/patients` | `app/patients/page.tsx` | Patient list & detail modal |
| `/wellness` | `app/wellness/page.tsx` | Wellness goals tracking |
| `/appointments` | `app/appointments/page.tsx` | Appointment booking form |
| `/api/patients` | `app/api/patients/route.ts` | GET filtered patients |

---

## 🧩 Components

### Core Components

#### `Sidebar` (`components/Sidebar.tsx`)
Navigation sidebar with:
- Logo and title
- Menu links (dashboard, patients, wellness, appointments)
- Dark mode toggle
- Mobile responsive drawer (future enhancement)

**Props:** None (uses client-side context for theme)

#### `ProgressRing` (`components/ProgressRing.tsx`)
Circular progress indicator for wellness scores.

**Props:**
```typescript
interface ProgressRingProps {
  percentage: number;        // 0-100
  size?: number;             // px (default 120)
  color?: "purple" | "emerald" | "violet" | "rose";
  label?: string;
  strokeWidth?: number;      // default 8
}
```

**Usage:**
```tsx
<ProgressRing
  percentage={78}
  size={120}
  color="emerald"
  label="Wellness Score"
/>
```

#### shadcn/ui Components
- `Button` — Call-to-action buttons
- `Badge` — Status labels (via `wellness-badge` class)
- `Card` — Content containers (via `.wellness-card` CSS class)
- `Input`, `Select`, `Textarea` — Form fields
- `Dialog` — Modals (patient details, appointment confirmation)

---

## 📊 Types & Data Models

See [lib/types.ts](lib/types.ts) for full TypeScript interfaces.

### Core Types

#### `Wellness` (Patient Profile)
```typescript
interface Wellness {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female";
  bloodType: BloodType;
  primaryConcern: string;
  status: WellnessStatus; // "Thriving" | "Monitoring" | "NeedsAttention"
  enrolledDate: string;
  coordinator: string;
  phone: string;
  email: string;
  healthGoals: string[];
  activeMetrics: HealthMetric[];
  wellnessScore: number; // 0-100
}
```

#### `WellnessGoal`
```typescript
interface WellnessGoal {
  id: string;
  patientId: string;
  goalName: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline: string;
  status: "Active" | "Completed" | "Abandoned";
}
```

#### `WellnessAppointment`
```typescript
interface WellnessAppointment {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  time: string;
  type: "Consultation" | "Follow-up" | "Assessment" | "Coaching";
  coordinator: string;
  status: "Scheduled" | "Completed" | "Cancelled";
}
```

#### `HealthMetric`
```typescript
interface HealthMetric {
  id: string;
  patientId: string;
  type: "HeartRate" | "BloodPressure" | "Temperature" | "Steps" | "Water";
  value: number;
  unit: string;
  timestamp: string;
}
```

---

## 🛠️ Utilities

### `lib/utils.ts`

#### `cn(...inputs: ClassValue[]): string`
Merges Tailwind classes with conflict resolution via `clsx` + `twMerge`.

```typescript
cn("px-2", "px-4") // returns "px-4" (conflict resolved)
```

#### `getStatusColor(status: string): string`
Returns Tailwind classes for status badges (light + dark mode).

**Status → Classes:**
- `"Thriving"` → `"bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400"`
- `"Monitoring"` → `"bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-800"`
- `"NeedsAttention"` → `"bg-violet-100 text-violet-800 dark:bg-violet-900/20 dark:text-violet-400"`
- `"Active"` → `"bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"`
- `"Completed"` → Same as Thriving
- `"Cancelled"` → `"bg-slate-100 text-slate-800 dark:bg-slate-900/20 dark:text-slate-400"`

#### `getProgressPercentage(current: number, target: number): number`
Calculates percentage, capped at 100%.

```typescript
getProgressPercentage(75, 100) // returns 75
```

#### `calculateHealthScore(current: number, target: number): number`
Alias for `getProgressPercentage()`. Used for wellness score calculations.

#### `formatDate(date: string): string`
Formats ISO date string to readable format.

```typescript
formatDate("2026-05-08") // returns "May 8, 2026"
```

---

## 🎨 Styling & Theme

### Global Styles (`app/globals.css`)

**Custom CSS Classes:**

- `.wellness-card` — Card container with border, shadow, rounded corners
- `.stat-card` — Stats card with icon + value
- `.stat-card-accent-purple`, `.stat-card-accent-emerald`, etc. — Color variants
- `.btn-primary` — Primary action button
- `.avatar-initials` — Avatar circles with initials
- `.trend-up`, `.trend-down` — Trend indicators
- `.wellness-badge` — Status badge base class

### Tailwind Configuration

**Dark Mode:** Enabled via `dark:` prefix
```tsx
<div className="bg-white dark:bg-slate-950">
```

**Spacing:** Tailwind default scale (4px increments)
- `p-6` = 24px padding
- `gap-4` = 16px gap

**Breakpoints:**
- Mobile: default (< 640px)
- `sm:` — 640px+
- `md:` — 768px+
- `lg:` — 1024px+
- `xl:` — 1280px+

---

## 🔌 API Endpoints

### `GET /api/patients`

**Query Parameters:**
```
?status=Thriving|Monitoring|NeedsAttention
```

**Response:**
```json
{
  "data": [
    {
      "id": "W001",
      "name": "Emma Johnson",
      "status": "Thriving",
      ...
    }
  ],
  "count": 1,
  "timestamp": "2026-05-08T10:30:00Z"
}
```

**Usage:**
```typescript
const response = await fetch('/api/patients?status=Thriving');
const { data, count } = await response.json();
```

---

## 🎯 Color System

### Status Colors

| Status | Light Mode | Dark Mode | Usage |
|--------|-----------|-----------|-------|
| Thriving | Emerald 100/800 | Emerald 900/20 + 400 | Patient wellness high |
| Monitoring | Amber 100/800 | Amber 900/20 + 800 | Requires attention |
| NeedsAttention | Violet 100/800 | Violet 900/20 + 400 | Critical |
| Active | Purple 100/800 | Purple 900/20 + 400 | Goal/appointment active |
| Completed | Emerald 100/800 | Emerald 900/20 + 400 | Goal completed |
| Cancelled | Slate 100/800 | Slate 900/20 + 400 | Appointment cancelled |

### Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Purple | #a855f7 | Primary buttons, headers |
| Emerald | #10b981 | Success states, positive metrics |
| Violet | #7c3aed | Accents, secondary CTAs |
| Slate | #1e293b | Text, neutral backgrounds |

---

## 👨‍💻 Development Workflow

### Adding a New Page

1. Create file in `app/[module]/page.tsx`
2. Add `"use client"` if interactive
3. Import types from `lib/types.ts`
4. Import mock data from `lib/mockData.ts`
5. Use `getStatusColor()` for badges
6. Include dark mode with `dark:` classes
7. Make responsive with `md:`, `lg:` breakpoints

**Example:**
```typescript
"use client";
import { wellnessPatients } from "@/lib/mockData";
import { getStatusColor } from "@/lib/utils";

export default function NewPage() {
  return (
    <div className="p-6 lg:p-8">
      {wellnessPatients.map(patient => (
        <span className={`wellness-badge ${getStatusColor(patient.status)}`}>
          {patient.status}
        </span>
      ))}
    </div>
  );
}
```

### Adding a New Component

1. Create file in `components/ComponentName.tsx`
2. Define `interface Props` with strict typing
3. Export as `export function ComponentName(props: Props)`
4. Use `cn()` for conditional Tailwind classes
5. Support dark mode with `dark:` prefix
6. Use Lucide icons, not images

**Example:**
```typescript
import { cn } from "@/lib/utils";

interface BadgeProps {
  status: "Active" | "Completed";
  className?: string;
}

export function StatusBadge({ status, className }: BadgeProps) {
  return (
    <span className={cn("wellness-badge", getStatusColor(status), className)}>
      {status}
    </span>
  );
}
```

### Modifying Mock Data

1. Edit `lib/mockData.ts`
2. Update relevant arrays: `wellnessPatients`, `wellnessGoals`, `appointments`
3. Maintain TypeScript types from `lib/types.ts`
4. Test in dev server (`npm run dev`)

---

## 🐛 Troubleshooting

### Issue: Tailwind classes not applying
**Solution:** Rebuild Tailwind cache
```bash
rm -rf .next
npm run dev
```

### Issue: Dark mode not toggling
**Solution:** Check Sidebar component has dark mode toggle & verify HTML has `dark` class

### Issue: TypeScript errors on mock data
**Solution:** Ensure types match `lib/types.ts` interface definitions

### Issue: API endpoint returns 404
**Solution:** Verify route file at `app/api/patients/route.ts` exists & uses correct export

### Issue: Components not rendering
**Solution:** Ensure page has `"use client"` directive for interactive components

---

## 📚 Resources

- [Next.js 14 Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [React Hook Form](https://react-hook-form.com)
- [Zod Validation](https://zod.dev)
- [Lucide Icons](https://lucide.dev)
- [Recharts](https://recharts.org)

---

## 📝 License

Proprietary — HealthDesk Wellness

---

## ✅ Checklist for New Developers

- [ ] Clone repo & install dependencies (`npm install`)
- [ ] Run dev server (`npm run dev`)
- [ ] Visit `http://localhost:3000`
- [ ] Test dark mode toggle in Sidebar
- [ ] Navigate to `/dashboard`, `/patients`, `/wellness`, `/appointments`
- [ ] Verify responsive design on mobile/tablet/desktop
- [ ] Review `lib/types.ts` for data models
- [ ] Read `lib/mockData.ts` for sample data structure
- [ ] Explore components in `components/` folder
- [ ] Check `app/globals.css` for custom CSS classes

---

**Questions?** Review the code comments in individual files or check the Copilot instructions in `.github/copilot-instructions.md`.
