# HealthDesk Wellness — Copilot Instructions

## Project Overview
**HealthDesk Wellness** is a Next.js 14 wellness management dashboard built with TypeScript, Tailwind CSS, shadcn/ui, Lucide icons, and Recharts.

**Domain:** Healthcare wellness tracking — Patient profiles, health goals, appointments, progress monitoring.

**Color Scheme:** Purple/Violet primary (#a855f7), Emerald secondary (#10b981), Slate neutral (#1e293b)

---

## Code Conventions & Standards

### Architecture
- **Framework:** Next.js 14 App Router with TypeScript
- **Styling:** Tailwind CSS (mobile-first, dark mode supported)
- **Components:** shadcn/ui (when available), custom React components with "use client" directive
- **State Management:** React hooks (useState, useEffect) — no external state library
- **Icons:** Always lucide-react (never heroicons or other libraries)
- **Data:** Mock data from `lib/mockData.ts`, no API calls except for GET endpoints

### Naming Conventions
- **Types & Interfaces:** PascalCase (e.g., `Wellness`, `WellnessGoal`, `HealthMetric`)
- **Functions:** camelCase (e.g., `getStatusColor()`, `getProgressPercentage()`)
- **React Components:** PascalCase, exported as default or named export
- **CSS Classes:** Tailwind utility classes only (no inline styles, no custom CSS)
- **Files:** PascalCase for components (e.g., `ProgressRing.tsx`), camelCase for utilities (e.g., `mockData.ts`)

### TypeScript Standards
- **Always use types**: Never use `any`. Define types in `lib/types.ts`.
- **Strict mode:** tsconfig.json has `"strict": true`
- **Union types for statuses:** Use `WellnessStatus = "Thriving" | "Monitoring" | "NeedsAttention"` not strings
- **Props typing:** Define `interface ComponentProps { ... }` and use `React.FC<ComponentProps>`

### Component Patterns

**Page Components:**
```typescript
"use client";
import { useState } from "react";
export default function PageName() { ... }
```

**Reusable Components:**
```typescript
"use client";
interface Props { ... }
export function ComponentName({ prop1, prop2 }: Props) { ... }
```

**Styling in Components:**
- Use `cn()` from `lib/utils.ts` to merge Tailwind classes conditionally
- Apply dark mode with `dark:` prefix on every color class
- Responsive: mobile-first with `md:`, `lg:`, `xl:` breakpoints

### Status & Color System

**Wellness Status Colors:**
- `Thriving` → Emerald (`text-emerald-600 dark:text-emerald-400`, `bg-emerald-50 dark:bg-emerald-900/10`)
- `Monitoring` → Amber (`text-amber-600`, `bg-amber-50`)
- `NeedsAttention` → Violet (`text-violet-600`, `bg-violet-50`)

**UI Component Patterns:**

**Card Pattern (wellness-card class):**
```tsx
<div className="wellness-card p-6">
  {/* card content */}
</div>
```

**ProgressRing Component:**
```tsx
<ProgressRing
  percentage={75}
  size={120}
  color="purple" // "purple" | "emerald" | "violet" | "rose"
  label="Wellness Score"
/>
```

**Badge Pattern:**
```tsx
<span className={`wellness-badge ${getStatusColor(status)}`}>
  {status}
</span>
```

---

## File Structure & Organization

```
healthdesk-wellness/
├── app/
│   ├── layout.tsx              (Root layout with Sidebar)
│   ├── page.tsx                (Home page with hero)
│   ├── globals.css             (Purple/emerald theme)
│   ├── patients/page.tsx       (Patient cards + detail modal)
│   ├── dashboard/page.tsx      (Stats + charts)
│   ├── wellness/page.tsx       (Goals tracking)
│   ├── appointments/page.tsx   (3-step booking form)
│   └── api/
│       └── patients/route.ts   (GET filter by status)
├── components/
│   ├── Sidebar.tsx             (Navigation + dark mode toggle)
│   ├── ProgressRing.tsx        (Circular progress visualization)
│   └── ui/                     (shadcn components)
├── lib/
│   ├── types.ts                (All TypeScript interfaces)
│   ├── mockData.ts             (Sample data)
│   └── utils.ts                (cn(), getStatusColor(), etc.)
└── prompts-for-features.md    (Copilot feature examples)
```

---

## Common Tasks & Prompting Patterns

### Generate a New Page
**Prompt Pattern:**
```
Create a page at app/[module]/page.tsx with:
  - Title + description header
  - Card-based layout for each item
  - Use shadcn components (Card, Badge, Button)
  - Import data from @/lib/mockData and types from @/lib/types
  - Use purple/emerald color theme
  - Responsive: 1 col mobile, 2-3 cols desktop
  - Include dark mode support with dark: Tailwind prefix
```

### Create a Component
**Prompt Pattern:**
```
Create a reusable component at components/[Name].tsx:
  - Accept props with explicit TypeScript types
  - Use cn() for conditional Tailwind classes
  - Support dark mode (dark: prefix on colors)
  - Use lucide-react icons
  - Export as named export
  - No inline styles, Tailwind only
```

### Add API Endpoint
**Prompt Pattern:**
```
Create an API route at app/api/[resource]/route.ts:
  - GET endpoint that filters from mockData by query params
  - Return JSON: { data: T[], count: number, timestamp: string }
  - Handle errors with try/catch, return 500 on failure
  - Use TypeScript types from lib/types.ts
  - No authentication needed
```

---

## Dark Mode
- Always include `dark:` variants on color classes
- Dark theme colors are automatically handled by `globals.css`
- Test components in both light and dark modes

---

## Key Dependencies
- **next@16.2.3** — Framework
- **react@19.2.4** — UI library
- **tailwindcss@4** — Styling
- **shadcn/ui** — Pre-built components
- **lucide-react** — Icons
- **recharts** — Charts & visualization
- **react-hook-form** — Form handling
- **zod** — Validation (if needed)

---

## Quality Standards
- ✅ All types strict (no `any`)
- ✅ Dark mode on every component
- ✅ Responsive (mobile-first)
- ✅ Accessible (semantic HTML, proper alt text)
- ✅ Consistent purple/emerald color palette
- ✅ Lucide icons for all icon needs
- ✅ shadcn components for UI primitives

