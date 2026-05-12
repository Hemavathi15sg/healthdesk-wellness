# Component Documentation

Complete reference for all custom React components in HealthDesk Wellness.

---

## Table of Contents

1. [Sidebar](#sidebar)
2. [ProgressRing](#progressring)
3. [shadcn/ui Components](#shadcnui-components)
4. [Page Components](#page-components)
5. [Common Patterns](#common-patterns)

---

## Sidebar

**File:** `components/Sidebar.tsx`

**Purpose:** Main navigation sidebar with dark mode toggle.

**Features:**
- Collapsible navigation menu
- Dark mode toggle button
- Logo and branding
- Active link highlighting
- Mobile responsive

### Props

No props required (uses internal state for theme).

### Usage

```typescript
// In app/layout.tsx
import { Sidebar } from "@/components/Sidebar";

export default function RootLayout({ children }) {
  return (
    <html>
      <body className="flex">
        <Sidebar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
```

### Navigation Links

| Link | Route | Icon | Color |
|------|-------|------|-------|
| Dashboard | `/dashboard` | `Sparkles` | Purple |
| Patients | `/patients` | `Users` | Emerald |
| Wellness | `/wellness` | `Target` | Violet |
| Appointments | `/appointments` | `Calendar` | Rose |

### Styling

- **Light mode:** Light sidebar with dark text
- **Dark mode:** Dark sidebar with light text
- **Active state:** Purple border-left accent
- **Responsive:** Collapses on mobile (drawer pattern)

### Code Example

```typescript
"use client";
import { Menu, Sun, Moon } from "lucide-react";
import { useState } from "react";

export function Sidebar() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r">
      {/* Logo */}
      <div className="p-6 flex items-center gap-3">
        <Heart className="w-6 h-6 text-purple-600" />
        <span className="font-bold text-lg">HealthDesk</span>
      </div>

      {/* Navigation */}
      <nav className="space-y-2 px-3">
        {/* Links */}
      </nav>

      {/* Dark Mode Toggle */}
      <div className="px-3 py-4 border-t">
        <button onClick={toggleTheme}>
          {isDark ? <Sun /> : <Moon />}
        </button>
      </div>
    </aside>
  );
}
```

---

## ProgressRing

**File:** `components/ProgressRing.tsx`

**Purpose:** Circular progress indicator for wellness scores and metrics.

**Features:**
- Customizable size and stroke width
- 4 color variants (purple, emerald, violet, rose)
- Optional center label
- Responsive SVG
- Animation support

### Props

```typescript
interface ProgressRingProps {
  percentage: number;                    // 0-100, required
  size?: number;                         // px, default: 120
  color?: "purple" | "emerald" | "violet" | "rose";  // default: "purple"
  label?: string;                        // Optional center text
  strokeWidth?: number;                  // default: 8
  animated?: boolean;                    // default: true
}
```

### Usage

```typescript
import { ProgressRing } from "@/components/ProgressRing";

export function PatientCard({ patient }) {
  return (
    <div>
      <ProgressRing
        percentage={patient.wellnessScore}
        size={120}
        color="emerald"
        label="Wellness"
      />
    </div>
  );
}
```

### Examples

```typescript
// Small purple ring
<ProgressRing percentage={85} size={80} color="purple" />

// Large emerald ring with label
<ProgressRing 
  percentage={92} 
  size={160} 
  color="emerald" 
  label="Health Score" 
/>

// Violet ring with animation
<ProgressRing 
  percentage={65} 
  color="violet" 
  animated={true} 
/>
```

### Colors

| Color | Usage | CSS Classes |
|-------|-------|------------|
| `purple` | Primary wellness score | `text-purple-600`, `fill-purple-100` |
| `emerald` | Thriving status | `text-emerald-600`, `fill-emerald-100` |
| `violet` | Monitoring status | `text-violet-600`, `fill-violet-100` |
| `rose` | Alert/attention needed | `text-rose-600`, `fill-rose-100` |

### Code Example

```typescript
export function ProgressRing({
  percentage,
  size = 120,
  color = "purple",
  label,
  strokeWidth = 8,
}: ProgressRingProps) {
  const circumference = 2 * Math.PI * (size / 2 - strokeWidth);
  const strokeDashoffset = circumference * (1 - percentage / 100);

  const colorMap = {
    purple: "text-purple-600 fill-purple-100",
    emerald: "text-emerald-600 fill-emerald-100",
    violet: "text-violet-600 fill-violet-100",
    rose: "text-rose-600 fill-rose-100",
  };

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - strokeWidth}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-slate-200"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - strokeWidth}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className={colorMap[color]}
          style={{ transition: "stroke-dashoffset 0.3s" }}
        />
      </svg>
      {label && <p className="text-xs font-semibold mt-2">{label}</p>}
    </div>
  );
}
```

---

## shadcn/ui Components

### Button

**File:** `components/ui/button.tsx`

Used throughout for actions and links.

```typescript
import { Button } from "@/components/ui/button";

<Button variant="default">Primary</Button>
<Button variant="outline">Secondary</Button>
<Button variant="ghost">Tertiary</Button>
<Button disabled>Disabled</Button>
```

### Badge

**File:** `components/ui/badge.tsx`

Status and category labels. Always use with `wellness-badge` class and `getStatusColor()` utility.

```typescript
import { Badge } from "@/components/ui/badge";
import { getStatusColor } from "@/lib/utils";

<Badge className={`wellness-badge ${getStatusColor("Thriving")}`}>
  Thriving
</Badge>
```

### Card

**File:** `components/ui/card.tsx`

Container for grouped content. Use `.wellness-card` CSS class instead of this component directly.

```typescript
// ❌ Don't use Card directly
<Card><CardContent>...</CardContent></Card>

// ✅ Use wellness-card class
<div className="wellness-card p-6">
  Content
</div>
```

### Input

**File:** `components/ui/input.tsx`

Form text inputs with validation styling.

```typescript
<Input
  type="email"
  placeholder="Enter email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

### Select

**File:** `components/ui/select.tsx`

Dropdown selector for multiple options.

```typescript
<Select value={status} onValueChange={setStatus}>
  <SelectTrigger>
    <SelectValue placeholder="Select status" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="Thriving">Thriving</SelectItem>
    <SelectItem value="Monitoring">Monitoring</SelectItem>
    <SelectItem value="NeedsAttention">Needs Attention</SelectItem>
  </SelectContent>
</Select>
```

### Dialog

**File:** `components/ui/dialog.tsx`

Modal dialog for patient details or confirmations.

```typescript
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Patient Details</DialogTitle>
    </DialogHeader>
    {/* Content */}
  </DialogContent>
</Dialog>
```

---

## Page Components

### HomePage (`app/page.tsx`)

**Purpose:** Landing page with hero section and navigation cards.

**Key Features:**
- Hero banner with gradient background
- Navigation cards (Dashboard, Patients, Wellness, Appointments)
- Community statistics
- Call-to-action buttons
- Animated gradient backgrounds

**Sections:**
```typescript
1. Hero Section
   - Heart icon logo
   - Headline: "Welcome to Wellness Hub"
   - CTA button
   
2. Navigation Cards Grid
   - 4 cards: My Health, Appointments, Dashboard, Wellness Goals
   - Color-coded per module
   - Hover effects with chevron
   
3. Stats Section (optional)
   - 1,000+ Active Members
   - 10K+ Goals Achieved
   - 4.9★ Member Rating
   - 24/7 Support Available
```

### DashboardPage (`app/dashboard/page.tsx`)

**Purpose:** Analytics and wellness overview.

**Key Features:**
- Stat cards (Total Members, Thriving, Monitoring, Needs Attention)
- Wellness trend chart (weekly progression)
- Responsive grid layout
- Color-coded stats

**Components Used:**
- Recharts `LineChart` for trend visualization
- Custom stat cards with icons
- Trend indicators (up/down)

**Data:**
```typescript
- wellnessPatients (filtered by status)
- wellnessTrendData (weekly progression)
```

### PatientsPage (`app/patients/page.tsx`)

**Purpose:** View all patients with individual health scores.

**Key Features:**
- Responsive grid (1→2→3→4 columns)
- Patient cards with:
  - Avatar with initials
  - Name and primary concern
  - Progress ring (wellness score)
  - Quick info (age, blood type, coordinator)
- Click to expand detail modal
- Detail modal with:
  - Full health metrics
  - Active goals
  - Contact information
  - Enrollment details

**State:**
```typescript
const [selectedPatient, setSelectedPatient] = useState<Wellness | null>(null);
```

**Modal Content:**
```typescript
- Patient name, age, gender
- Blood type
- Primary concern
- Wellness score (with ProgressRing)
- Health metrics table
- Active goals with progress
- Contact info (phone, email)
- Coordinator
```

### WellnessPage (`app/wellness/page.tsx`)

**Purpose:** Track wellness goals by patient.

**Key Features:**
- Goal cards with progress bars
- Status badges (Active, Completed, Abandoned)
- Target vs. Current values
- Deadline information
- Goal filtering (optional)

**Data Structure:**
```typescript
wellnessGoals.map(goal => ({
  goalName: "Daily Steps",
  targetValue: 10000,
  currentValue: 8750,
  unit: "steps",
  deadline: "2026-06-07",
  status: "Active"
}))
```

### AppointmentsPage (`app/appointments/page.tsx`)

**Purpose:** 3-step appointment booking form.

**Features:**
- Step 1: Select patient dropdown
- Step 2: Choose appointment type, date, time
- Step 3: Assign coordinator and confirm
- Form validation with React Hook Form + Zod
- Success message on submit

**Form Fields:**
```typescript
{
  patientId: string;           // select
  appointmentType: string;     // select (Consultation, Follow-up, Assessment, Coaching)
  date: string;                // date input
  time: string;                // time input
  coordinator: string;         // select
}
```

**Validation Schema:**
```typescript
const appointmentSchema = z.object({
  patientId: z.string().min(1, "Select a patient"),
  appointmentType: z.enum(["Consultation", "Follow-up", "Assessment", "Coaching"]),
  date: z.string().min(1, "Select a date"),
  time: z.string().min(1, "Select a time"),
  coordinator: z.string().min(1, "Select a coordinator"),
});
```

---

## Common Patterns

### Using getStatusColor

Always use this utility for status badges:

```typescript
import { getStatusColor } from "@/lib/utils";

// ✅ Correct
<span className={`wellness-badge ${getStatusColor(status)}`}>
  {status}
</span>

// ❌ Avoid hardcoding colors
<span className="bg-emerald-100 text-emerald-800">
  {status}
</span>
```

### Using cn() for Conditional Classes

Merge Tailwind classes safely with conflict resolution:

```typescript
import { cn } from "@/lib/utils";

<div className={cn(
  "p-6 rounded-lg border",
  isActive && "border-purple-500 bg-purple-50",
  isDark && "dark:bg-purple-900/20"
)}>
</div>
```

### Form Patterns with React Hook Form

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function AppointmentForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(appointmentSchema),
  });

  const onSubmit = (data) => {
    console.log("Form data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("patientId")} />
      {errors.patientId && <span>{errors.patientId.message}</span>}
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Dark Mode Support

Always include `dark:` variants for color classes:

```typescript
// ❌ Incomplete
<div className="bg-white text-slate-900">

// ✅ Complete with dark mode
<div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50">
```

### Responsive Design (Mobile-First)

```typescript
// ❌ Desktop-first (avoid)
<div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1">

// ✅ Mobile-first (correct)
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
```

### Using Lucide Icons

Always use `lucide-react`, never `heroicons` or images:

```typescript
import { Heart, Users, Calendar, Target } from "lucide-react";

<Heart className="w-5 h-5 text-purple-600 dark:text-purple-400" />
<Users className="w-6 h-6" />
<Calendar className="w-4 h-4" />
```

---

## Component Props Checklist

When creating new components:

- [ ] Define strict `interface Props`
- [ ] Avoid `any` types
- [ ] Include `className?: string` for composition
- [ ] Support dark mode with `dark:` prefix
- [ ] Use Lucide icons only
- [ ] Export as named function or default
- [ ] Add `"use client"` if interactive
- [ ] Document with JSDoc comments
- [ ] Test with `npm run lint`

---

## Testing Components Locally

```bash
# Run dev server
npm run dev

# Visit http://localhost:3000

# Test each page:
# - / (home)
# - /dashboard
# - /patients
# - /wellness
# - /appointments

# Test dark mode: Click toggle in Sidebar
```

---

## Performance Tips

1. **Memoize components:**
   ```typescript
   export const ProgressRing = React.memo(function ProgressRing(props) { ... });
   ```

2. **Lazy load heavy components:**
   ```typescript
   const ChartComponent = dynamic(() => import("@/components/Chart"), {
     loading: () => <div>Loading...</div>,
   });
   ```

3. **Use `useCallback` for event handlers:**
   ```typescript
   const handleClick = useCallback(() => { ... }, [dependencies]);
   ```

4. **Optimize images:**
   ```typescript
   import Image from "next/image";
   <Image src="..." alt="..." width={100} height={100} />
   ```

---

## References

- [React Documentation](https://react.dev)
- [shadcn/ui Component Library](https://ui.shadcn.com)
- [Lucide Icons](https://lucide.dev)
- [Tailwind CSS Classes](https://tailwindcss.com/docs)
