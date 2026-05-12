# Contributing Guide

Welcome to HealthDesk Wellness! This guide outlines how to contribute code, report bugs, and suggest features.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Code Standards](#code-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Common Tasks](#common-tasks)
- [Troubleshooting](#troubleshooting)

---

## Getting Started

1. **Fork the repository** (if external contributor)
2. **Clone locally:**
   ```bash
   git clone https://github.com/your-username/healthdesk-wellness.git
   cd healthdesk-wellness
   ```
3. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Install dependencies:**
   ```bash
   npm install
   ```
5. **Start development:**
   ```bash
   npm run dev
   ```

---

## Development Setup

### Prerequisites

- Node.js 18+
- npm 9+
- Git
- VS Code (recommended)

### Environment Variables

No environment variables required for local development. Mock data is used by default.

### Initial Setup

```bash
# Install dependencies
npm install

# Verify setup
npm run dev

# Open http://localhost:3000
```

### Editor Extensions (Recommended)

Install these VS Code extensions for optimal experience:

- **ES7+ React/Redux/React-Native snippets** — dsznajder.es7-react-js-snippets
- **Tailwind CSS IntelliSense** — bradlc.vscode-tailwindcss
- **TypeScript Vue Plugin** — vue.volar
- **ESLint** — dbaeumer.vscode-eslint
- **Prettier** — esbenp.prettier-vscode

---

## Code Standards

### TypeScript

- **Strict mode enabled:** No `any` types
- **File structure:** Types in `lib/types.ts`
- **Naming:** PascalCase for types, camelCase for functions
- **Imports:** Use path aliases (`@/lib`, `@/components`)

```typescript
// ✅ Good
import { Wellness } from "@/lib/types";
import { cn } from "@/lib/utils";

function formatPatientName(name: string): string {
  return name.toUpperCase();
}

// ❌ Avoid
import * as types from "../../../lib/types";
function f(n: any): any {
  return n.toUpperCase();
}
```

### React & Components

- **Use `"use client"` directive** for interactive components
- **Props typing:** Always define `interface Props`
- **Naming:** PascalCase component names
- **Export:** Default export for pages, named export for reusable components

```typescript
// ✅ Page component
"use client";
import { useState } from "react";

export default function PatientPage() {
  const [patients, setPatients] = useState([]);
  return <div>...</div>;
}

// ✅ Reusable component
interface BadgeProps {
  status: "Active" | "Completed";
}

export function StatusBadge({ status }: BadgeProps) {
  return <span>{status}</span>;
}
```

### Styling

- **Tailwind CSS only:** No inline styles, no CSS-in-JS
- **Dark mode:** Always include `dark:` prefix for colors
- **Responsive:** Mobile-first with `md:`, `lg:`, `xl:` breakpoints
- **Use `cn()` utility** for conditional classes

```typescript
// ✅ Good
<div className="bg-white dark:bg-slate-900 p-4 md:p-6 lg:p-8">
  <span className={cn("text-sm", isActive && "font-bold")}>
    Content
  </span>
</div>

// ❌ Avoid
<div style={{ padding: "1rem", backgroundColor: "white" }}>
  <span style={{ fontSize: "14px", fontWeight: isActive ? "bold" : "normal" }}>
    Content
  </span>
</div>
```

### Icons

- **Use Lucide React only:** `lucide-react`
- **Size:** `w-5 h-5` for inline, `w-6 h-6` for large
- **Consistent naming:** Export from lucide-react explicitly

```typescript
// ✅ Good
import { Heart, Users, ChevronRight } from "lucide-react";

<Heart className="w-5 h-5 text-purple-600 dark:text-purple-400" />
<Users className="w-6 h-6" />

// ❌ Avoid
import * as Icons from "lucide-react";
<Icons.Heart />  // Harder to track which icons are used
```

### File Organization

```
├── components/
│   ├── ComponentName.tsx          (exported as named function)
│   └── ui/
│       └── [shadcn components]
├── app/
│   ├── layout.tsx
│   ├── page.tsx                   (exported as default)
│   ├── [module]/
│   │   └── page.tsx
│   └── api/
│       └── [resource]/route.ts
└── lib/
    ├── types.ts                   (all TypeScript interfaces)
    ├── mockData.ts                (sample data)
    └── utils.ts                   (helper functions)
```

---

## Commit Guidelines

### Conventional Commits

Use the format: `type(scope): description`

```bash
# ✅ Good examples
git commit -m "feat(patients): add patient search filter"
git commit -m "fix(dashboard): correct wellness score calculation"
git commit -m "docs(readme): update installation steps"
git commit -m "style(components): update badge colors for dark mode"
git commit -m "refactor(utils): extract status color logic"
git commit -m "test(api): add patient filter tests"

# ❌ Avoid
git commit -m "update stuff"
git commit -m "WIP"
git commit -m "fixed bug"
```

### Types

| Type | Scope | Example |
|------|-------|---------|
| `feat` | New feature | `feat(appointments): add 3-step booking form` |
| `fix` | Bug fix | `fix(patients): correct progress ring color` |
| `docs` | Documentation | `docs(api): update endpoint examples` |
| `style` | Styling/formatting | `style(components): update dark mode classes` |
| `refactor` | Code reorganization | `refactor(utils): simplify status color logic` |
| `test` | Tests | `test(dashboard): add stat calculation tests` |
| `chore` | Dependencies/build | `chore(deps): upgrade next to 16.2.3` |

### Commit Size

- **Keep commits small and focused** — one feature or fix per commit
- **Don't mix features** — separate style changes from logic changes
- **Atomic commits** — code should be buildable after each commit

---

## Pull Request Process

### Before Creating a PR

1. **Update your branch:**
   ```bash
   git pull origin main
   git rebase main
   ```

2. **Run tests locally:**
   ```bash
   npm run lint
   npm run build
   npm run dev  # Verify no errors
   ```

3. **Review your own code** before submitting

### Creating a Pull Request

1. **Push to your fork:**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Open PR on GitHub:**
   - Title: `feat(module): descriptive title`
   - Description: Explain what and why

### PR Description Template

```markdown
## Description
Brief summary of changes.

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Documentation update
- [ ] Styling change
- [ ] Refactoring

## Related Issue
Closes #123 (if applicable)

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing
- [ ] Tested locally on desktop
- [ ] Tested on mobile
- [ ] Tested dark mode
- [ ] No console errors

## Screenshots (if UI changes)
[Paste screenshots here]

## Checklist
- [ ] Code follows project style guidelines
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] Dark mode supported
- [ ] Responsive design verified
- [ ] Updated relevant documentation
```

### PR Review Checklist (Reviewer)

- [ ] Code follows standards
- [ ] Types are correct (no `any`)
- [ ] Dark mode is supported
- [ ] Responsive design works
- [ ] No console errors
- [ ] Commit messages are clear
- [ ] Documentation is updated

---

## Testing

### Manual Testing Checklist

Before submitting a PR, verify:

```bash
# 1. Run linter
npm run lint

# 2. Build production
npm run build

# 3. Start dev server
npm run dev

# 4. Test each page
# - http://localhost:3000 (home)
# - http://localhost:3000/dashboard (analytics)
# - http://localhost:3000/patients (patient list + modal)
# - http://localhost:3000/wellness (goals)
# - http://localhost:3000/appointments (booking form)

# 5. Test dark mode
# - Click moon icon in Sidebar
# - Verify all colors have dark: prefix

# 6. Test responsive
# - Desktop (1920px)
# - Tablet (768px)
# - Mobile (375px)

# 7. Test form submissions
# - Try appointment booking
# - Check validation messages
```

### Unit Tests (Future)

When test framework is added:

```bash
npm run test          # Run all tests
npm run test:watch   # Watch mode
npm run test:coverage # Coverage report
```

---

## Common Tasks

### Add a New Page

1. **Create page file:**
   ```bash
   mkdir -p app/[module]
   touch app/[module]/page.tsx
   ```

2. **Use template:**
   ```typescript
   "use client";
   import { Sparkles } from "lucide-react";

   export default function ModulePage() {
     return (
       <div className="p-6 lg:p-8 max-w-7xl mx-auto">
         <div className="mb-8">
           <div className="flex items-center gap-2 mb-1">
             <Sparkles className="w-5 h-5 text-purple-500" />
             <p className="text-xs font-semibold uppercase tracking-widest text-purple-500">Section</p>
           </div>
           <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-50">Title</h1>
           <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Description</p>
         </div>
         {/* Content */}
       </div>
     );
   }
   ```

3. **Update Sidebar** navigation

### Add a New Component

1. **Create component file:**
   ```bash
   touch components/ComponentName.tsx
   ```

2. **Use template:**
   ```typescript
   interface ComponentNameProps {
     prop1: string;
     prop2?: boolean;
   }

   export function ComponentName({ prop1, prop2 = false }: ComponentNameProps) {
     return <div>{prop1}</div>;
   }
   ```

3. **Import in pages/components as needed**

### Update Mock Data

1. **Edit `lib/mockData.ts`:**
   ```typescript
   export const wellnessPatients: Wellness[] = [
     // Add or modify patients
   ];
   ```

2. **Verify types match `lib/types.ts`**

3. **Test in dev server**

### Add Status Color

1. **Update `lib/utils.ts` in `getStatusColor()`:**
   ```typescript
   case "NewStatus":
     return "bg-color-100 text-color-800 dark:bg-color-900/20 dark:text-color-400";
   ```

2. **Use in components:**
   ```typescript
   <span className={`wellness-badge ${getStatusColor("NewStatus")}`}>
     NewStatus
   </span>
   ```

---

## Troubleshooting

### Issue: Tailwind classes not showing

**Solution:**
```bash
rm -rf .next
npm run dev
```

### Issue: TypeScript errors

**Solution:**
```bash
# Check tsconfig.json
cat tsconfig.json

# Run type check
npx tsc --noEmit
```

### Issue: ESLint warnings

**Solution:**
```bash
npm run lint -- --fix
```

### Issue: Dark mode not working

**Solution:**
- Verify `dark:` classes on color elements
- Check HTML has `dark` class when toggled
- Review Sidebar theme toggle logic

### Issue: Build fails

**Solution:**
```bash
# Clear next cache
rm -rf .next

# Clear node_modules (last resort)
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

---

## Reporting Bugs

**Use this template:**

```markdown
## Bug Description
Clear description of the bug.

## Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

## Expected Behavior
What should happen.

## Actual Behavior
What actually happens.

## Screenshots
[Paste screenshots]

## Environment
- OS: [Windows/Mac/Linux]
- Browser: [Chrome/Safari/Firefox]
- Node.js version: [18.x]
```

---

## Feature Requests

**Use this template:**

```markdown
## Feature Description
What you'd like to add.

## Motivation
Why this is useful.

## Implementation Details (Optional)
Your ideas on how to implement it.

## Example Use Case
Real-world example of usage.
```

---

## Questions?

- Review [README.md](README.md)
- Check [COMPONENTS.md](COMPONENTS.md)
- See [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
- Search existing issues

---

## License

All contributions are licensed under the project's license (Proprietary — HealthDesk Wellness).

---

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Report issues via GitHub
- Follow coding standards

---

**Thank you for contributing to HealthDesk Wellness! 🎉**
