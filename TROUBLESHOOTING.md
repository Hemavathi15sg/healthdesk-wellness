# Troubleshooting & FAQs

Common questions and solutions for HealthDesk Wellness development and usage.

---

## Table of Contents

- [Setup & Installation](#setup--installation)
- [Development Issues](#development-issues)
- [Styling & UI](#styling--ui)
- [Components & Features](#components--features)
- [API & Data](#api--data)
- [Performance & Optimization](#performance--optimization)
- [Deployment](#deployment)
- [General Questions](#general-questions)

---

## Setup & Installation

### Q: Node version error

**Problem:**
```
Error: The current Node.js version (v16.x.x) does not satisfy the requirements (>=18.0.0)
```

**Solution:**
1. Install Node 18 or higher:
   ```bash
   nvm install 18
   nvm use 18
   ```
2. Verify: `node --version` (should be v18 or higher)

### Q: npm install fails with peer dependency errors

**Problem:**
```
npm ERR! peer dep missing: react@^19.0.0
```

**Solution:**
```bash
# Use --legacy-peer-deps flag
npm install --legacy-peer-deps

# Or use npm v7+ (recommended)
npm install
```

### Q: Port 3000 already in use

**Problem:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution:**
```bash
# Kill process on port 3000 (Mac/Linux)
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001

# Windows: Use Task Manager or
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Q: Module not found error

**Problem:**
```
Module not found: Can't resolve '@/components/Component'
```

**Solution:**
1. Check file path is correct
2. Verify file exists: `ls app/components/Component.tsx`
3. Verify `jsconfig.json` or `tsconfig.json` has `@` alias:
   ```json
   {
     "compilerOptions": {
       "paths": {
         "@/*": ["./*"]
       }
     }
   }
   ```

---

## Development Issues

### Q: TypeScript errors in VS Code

**Problem:**
```
Cannot find module '@/lib/types'
Property 'status' does not exist on type 'Wellness'
```

**Solution:**
```bash
# Restart TypeScript server in VS Code
Ctrl+Shift+P → TypeScript: Restart TS Server

# Or rebuild
npm run build

# Check tsconfig.json
cat tsconfig.json
```

### Q: ESLint warnings

**Problem:**
```
[WARN] Unexpected `any` type
[WARN] React Hook rules of hooks
```

**Solution:**
```bash
# Fix all auto-fixable issues
npm run lint -- --fix

# View specific file
npm run lint -- app/dashboard/page.tsx

# Ignore specific rule (not recommended)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
```

### Q: Hot reload not working

**Problem:**
Changes to files don't reflect in browser automatically.

**Solution:**
```bash
# Kill dev server
Ctrl+C

# Remove .next cache
rm -rf .next

# Restart
npm run dev

# Clear browser cache
# Dev Tools → Application → Clear cache
```

### Q: Hydration mismatch error

**Problem:**
```
Warning: Hydration failed because the initial UI does not match what was rendered on the server
```

**Solution:**
1. Remove hardcoded timestamps:
   ```typescript
   // ❌ Bad - changes on each render
   <div>{new Date().toISOString()}</div>

   // ✅ Good - use useState
   const [time, setTime] = useState("");
   useEffect(() => setTime(new Date().toISOString()), []);
   ```

2. Check for `typeof window` guards in SSR

---

## Styling & UI

### Q: Tailwind classes not applying

**Problem:**
```
Class "text-purple-600" not working
Button has no styling
```

**Solution:**
```bash
# Clear Tailwind cache
rm -rf .next
npm run dev

# Check template paths in tailwind.config.ts
cat tailwind.config.ts

# Should include:
# "app/**/*.{js,ts,jsx,tsx}"
# "components/**/*.{js,ts,jsx,tsx}"
```

### Q: Dark mode not toggling

**Problem:**
Dark mode toggle doesn't change anything.

**Solution:**
1. Check Sidebar has toggle button:
   ```typescript
   const toggleTheme = () => {
     setIsDark(!isDark);
     document.documentElement.classList.toggle("dark");
   };
   ```

2. Verify HTML element has `dark` class:
   ```bash
   # In browser DevTools
   document.documentElement.className  # Should show "dark"
   ```

3. Check color classes have `dark:` prefix:
   ```typescript
   // ✅ Good
   className="bg-white dark:bg-slate-950"

   // ❌ Incomplete
   className="bg-white"
   ```

### Q: Colors look wrong in dark mode

**Problem:**
Text is invisible in dark mode (too dark on dark background).

**Solution:**
1. Use `dark:` prefix for all colors:
   ```typescript
   // ✅ Correct
   <div className="text-slate-900 dark:text-slate-50">

   // ❌ Wrong
   <div className="text-slate-900">
   ```

2. Check specific color palettes:
   ```typescript
   // For status badges
   "dark:bg-emerald-900/20 dark:text-emerald-400"  // Emerald text on dark
   "dark:bg-amber-900/20 dark:text-amber-800"      // Amber (same as light)
   ```

### Q: Responsive design broken on mobile

**Problem:**
Layout doesn't adapt to small screens.

**Solution:**
1. Use mobile-first approach:
   ```typescript
   // ✅ Good - Mobile first
   className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"

   // ❌ Wrong - Desktop first
   className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1"
   ```

2. Test breakpoints:
   ```
   Mobile: 375px (default)
   Tablet: 768px (md:)
   Desktop: 1024px+ (lg:)
   ```

3. Check viewport meta tag in `layout.tsx`:
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1" />
   ```

### Q: Icon not showing

**Problem:**
```
Icon renders as blank or shows wrong icon
```

**Solution:**
1. Import from `lucide-react`:
   ```typescript
   // ✅ Correct
   import { Heart, Users, Calendar } from "lucide-react";

   // ❌ Wrong
   import Heart from "lucide-react/Heart";
   ```

2. Add size and color classes:
   ```typescript
   <Heart className="w-5 h-5 text-purple-600 dark:text-purple-400" />
   ```

3. Check icon name on [lucide.dev](https://lucide.dev)

---

## Components & Features

### Q: Patient modal doesn't open

**Problem:**
Clicking patient card doesn't show modal.

**Solution:**
1. Check state is updating:
   ```typescript
   onClick={() => {
     console.log("Clicked patient:", patient);
     setSelectedPatient(patient);
   }}
   ```

2. Verify Dialog component is imported:
   ```typescript
   import { Dialog, DialogContent } from "@/components/ui/dialog";
   ```

3. Check modal condition:
   ```typescript
   {selectedPatient && (
     <Dialog open={!!selectedPatient} onOpenChange={...}>
       {/* Content */}
     </Dialog>
   )}
   ```

### Q: Form doesn't submit

**Problem:**
Clicking submit button doesn't trigger onSubmit.

**Solution:**
1. Check form has `onSubmit`:
   ```typescript
   <form onSubmit={handleSubmit(onSubmit)}>
   ```

2. Verify all required fields have `register`:
   ```typescript
   <input {...register("patientId")} />
   <input {...register("appointmentType")} />
   ```

3. Check validation errors:
   ```typescript
   {errors.patientId && <span>{errors.patientId.message}</span>}
   ```

4. Verify button type is "submit":
   ```typescript
   <button type="submit">Submit</button>
   ```

### Q: Progress ring not animating

**Problem:**
Circular progress doesn't show animation.

**Solution:**
1. Check percentage value:
   ```typescript
   <ProgressRing percentage={75} />  // 0-100
   ```

2. Verify SVG is rendering:
   ```bash
   # Check in browser DevTools
   # Should show <svg> element
   ```

3. Check CSS transitions are enabled:
   ```typescript
   strokeDashoffset={{ transition: "stroke-dashoffset 0.3s" }}
   ```

### Q: Chart not displaying (Recharts)

**Problem:**
Chart area is blank or shows error.

**Solution:**
1. Verify data format:
   ```typescript
   // ✅ Correct format
   const data = [
     { name: "Week 1", value: 65 },
     { name: "Week 2", value: 72 },
   ];

   // Use in chart
   <LineChart data={data}>
     <Line dataKey="value" />
   </LineChart>
   ```

2. Add ResponsiveContainer:
   ```typescript
   <ResponsiveContainer width="100%" height={300}>
     <LineChart data={data}>
       {/* Chart content */}
     </LineChart>
   </ResponsiveContainer>
   ```

3. Check data prop names match exactly

---

## API & Data

### Q: API endpoint returns 404

**Problem:**
```
Uncaught Error: fetch failed at <route>
```

**Solution:**
1. Check route file exists:
   ```bash
   ls app/api/patients/route.ts
   ```

2. Verify export syntax:
   ```typescript
   // ✅ Correct
   export async function GET(request: Request) {
     return Response.json({ data: [] });
   }

   // ❌ Wrong
   export default async function handler() { }
   ```

3. Test with curl:
   ```bash
   curl http://localhost:3000/api/patients
   ```

### Q: API returns wrong data format

**Problem:**
Response doesn't match expected shape.

**Solution:**
1. Check response structure:
   ```typescript
   // Should return
   {
     "data": [...],
     "count": number,
     "timestamp": string
   }
   ```

2. Verify status code:
   ```typescript
   return Response.json(
     { error: "Invalid status" },
     { status: 400 }
   );
   ```

3. Test in browser console:
   ```javascript
   fetch('/api/patients?status=Thriving')
     .then(r => r.json())
     .then(d => console.log(d));
   ```

### Q: Mock data not loading

**Problem:**
Patient list is empty.

**Solution:**
1. Check import path:
   ```typescript
   // ✅ Correct
   import { wellnessPatients } from "@/lib/mockData";

   // ❌ Wrong
   import { patients } from "@/lib/mockData";
   ```

2. Verify mockData.ts has exports:
   ```bash
   grep "export const" lib/mockData.ts
   ```

3. Check data isn't filtered accidentally:
   ```typescript
   const patients = wellnessPatients.filter(p => p.status === "Thriving");
   console.log(patients);  // Should have items
   ```

### Q: Status filter not working

**Problem:**
`/api/patients?status=Thriving` returns all patients.

**Solution:**
1. Check query parameter extraction:
   ```typescript
   const { searchParams } = new URL(request.url);
   const status = searchParams.get("status");
   console.log("Status filter:", status);
   ```

2. Verify filter logic:
   ```typescript
   if (status) {
     return wellnessPatients.filter(p => p.status === status);
   }
   ```

3. Test case-sensitivity:
   ```bash
   # ✅ Correct casing
   /api/patients?status=Thriving

   # ❌ Wrong casing
   /api/patients?status=thriving
   ```

---

## Performance & Optimization

### Q: Page loads slowly

**Problem:**
Initial page load takes >3 seconds.

**Solution:**
```bash
# Analyze bundle
npm run build -- --debug

# Check what's large
npm run build | grep "○"

# Lazy load heavy components
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("@/components/Chart"), {
  loading: () => <div>Loading...</div>,
});

# Remove unused dependencies
npm audit
npm prune
```

### Q: Build takes too long

**Problem:**
```
npm run build takes >1 minute
```

**Solution:**
```bash
# Check build output
time npm run build

# Identify slow operations
npm run build -- --profile

# Reduce TypeScript checking
# In tsconfig.json, set "skipLibCheck": true
```

### Q: Large bundle size

**Problem:**
```
Page size > 500KB
```

**Solution:**
1. Analyze bundle:
   ```bash
   npm run build -- --analyze
   ```

2. Remove unused packages:
   ```bash
   npm uninstall unused-package
   ```

3. Tree-shake code:
   ```typescript
   // ✅ Good - only import what you need
   import { Heart } from "lucide-react";

   // ❌ Bad - imports entire library
   import * as Icons from "lucide-react";
   ```

---

## Deployment

### Q: Deployment fails on Vercel

**Problem:**
```
Build failed: npm run build exited with code 1
```

**Solution:**
1. Check build log in Vercel dashboard
2. Run build locally:
   ```bash
   npm run build
   ```
3. Fix TypeScript errors:
   ```bash
   npx tsc --noEmit
   ```
4. Commit and push:
   ```bash
   git add . && git commit -m "fix: resolve build errors"
   git push origin main
   ```

### Q: Environment variables not working

**Problem:**
`process.env.DATABASE_URL` is undefined in production.

**Solution:**
1. Add to Vercel:
   - Dashboard → Settings → Environment Variables
   - Add each variable

2. Use correct prefix for client-side:
   ```typescript
   // Server-side
   process.env.DATABASE_URL

   // Client-side
   process.env.NEXT_PUBLIC_API_URL
   ```

3. Redeploy after adding variables:
   ```bash
   vercel deploy --prod
   ```

### Q: Static site generation issues

**Problem:**
Page doesn't update after deployment.

**Solution:**
1. Check revalidation setting:
   ```typescript
   export const revalidate = 3600; // 1 hour
   ```

2. Trigger revalidation:
   ```typescript
   revalidatePath("/dashboard");
   revalidateTag("dashboard");
   ```

3. Use dynamic rendering:
   ```typescript
   export const dynamic = "force-dynamic";
   ```

---

## General Questions

### Q: How do I add a new status type?

**Answer:**
1. Add to `lib/types.ts`:
   ```typescript
   export type WellnessStatus = "Thriving" | "Monitoring" | "NeedsAttention" | "NewStatus";
   ```

2. Add to `getStatusColor()` in `lib/utils.ts`:
   ```typescript
   case "NewStatus":
     return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
   ```

3. Use in components:
   ```typescript
   <span className={`wellness-badge ${getStatusColor("NewStatus")}`}>
     New Status
   </span>
   ```

### Q: How do I integrate a real database?

**Answer:**
1. Install ORM (e.g., Prisma):
   ```bash
   npm install @prisma/client
   npm install -D prisma
   npx prisma init
   ```

2. Set DATABASE_URL in `.env.local`

3. Create schema in `prisma/schema.prisma`

4. Generate client:
   ```bash
   npx prisma generate
   ```

5. Replace mock data with database queries

### Q: How do I add authentication?

**Answer:**
See [DEPLOYMENT.md - Authentication](#authentication) section.

Quick start:
```bash
npm install jsonwebtoken bcryptjs
```

Implement login endpoint and protected routes.

### Q: Can I use this in production?

**Answer:**
**With modifications:**
- [ ] Replace mock data with real database
- [ ] Implement authentication & authorization
- [ ] Add error handling & logging
- [ ] Set up monitoring (Sentry)
- [ ] Configure CORS properly
- [ ] Enable HTTPS
- [ ] Add rate limiting
- [ ] Implement backup strategy
- [ ] Set up CI/CD pipeline
- [ ] Security audit

See [DEPLOYMENT.md](DEPLOYMENT.md) for production checklist.

### Q: How do I contribute?

**Answer:**
Follow [CONTRIBUTING.md](CONTRIBUTING.md) guidelines.

Summary:
1. Fork repository
2. Create feature branch
3. Follow code standards
4. Write commit messages
5. Submit pull request

### Q: Where can I get help?

**Answer:**
Resources in order:
1. Check this FAQ
2. Read [README.md](README.md)
3. Review [COMPONENTS.md](COMPONENTS.md)
4. Check code comments
5. Search issues on GitHub
6. Create new issue with details

### Q: Is there a test framework?

**Answer:**
Currently: **No automated tests**.

Recommended for production:
```bash
npm install -D jest @testing-library/react @testing-library/jest-dom
```

Create `__tests__` folders alongside components.

### Q: How often is documentation updated?

**Answer:**
Documentation is updated with each major feature.

Check `CHANGELOG.md` (when created) for updates.

---

## Quick Reference

### Common Commands

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Run production server
npm run lint         # Check code quality
npm run lint -- --fix # Auto-fix linting issues
```

### File Locations

```
Styles:         app/globals.css
Types:          lib/types.ts
Mock Data:      lib/mockData.ts
Utilities:      lib/utils.ts
Components:     components/
Pages:          app/
API Routes:     app/api/
```

### Important Files

- **README.md** — Project overview
- **COMPONENTS.md** — Component reference
- **API_DOCUMENTATION.md** — API endpoints
- **CONTRIBUTING.md** — Contribution guidelines
- **DEPLOYMENT.md** — Production deployment
- **TROUBLESHOOTING.md** — This file!

---

## Still Stuck?

**Before asking for help:**
1. ✅ Read relevant documentation
2. ✅ Check browser console for errors
3. ✅ Check terminal for build errors
4. ✅ Search existing issues
5. ✅ Try restarting dev server
6. ✅ Clear cache: `rm -rf .next node_modules`
7. ✅ Reinstall: `npm install`

**Then create an issue with:**
- Detailed error message
- Steps to reproduce
- Expected vs actual behavior
- Environment (OS, Node version, etc.)
- Screenshots/logs

---

**Last Updated:** May 2026
