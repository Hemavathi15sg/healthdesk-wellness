# Deployment Guide

Production deployment guide for HealthDesk Wellness.

---

## Table of Contents

- [Pre-Deployment Checklist](#pre-deployment-checklist)
- [Environment Configuration](#environment-configuration)
- [Build & Optimization](#build--optimization)
- [Deployment Platforms](#deployment-platforms)
- [Database Setup](#database-setup)
- [Authentication](#authentication)
- [Monitoring & Logging](#monitoring--logging)
- [Performance Optimization](#performance-optimization)
- [Security](#security)
- [Rollback Procedures](#rollback-procedures)

---

## Pre-Deployment Checklist

### Code Quality

- [ ] All tests pass: `npm run lint`
- [ ] Production build successful: `npm run build`
- [ ] No TypeScript errors: `npx tsc --noEmit`
- [ ] No console errors when running app
- [ ] All dark mode classes verified
- [ ] Responsive design tested on mobile/tablet/desktop
- [ ] Form validation tested
- [ ] API endpoints tested

### Documentation

- [ ] README.md is current
- [ ] API_DOCUMENTATION.md updated
- [ ] COMPONENTS.md updated
- [ ] Environment variables documented
- [ ] Deployment steps documented

### Security

- [ ] No hardcoded secrets in code
- [ ] Environment variables for sensitive data
- [ ] CORS configured for production domain
- [ ] API authentication implemented (if needed)
- [ ] Input validation on all forms
- [ ] SQL injection prevention (if using database)

### Performance

- [ ] Bundle size analyzed
- [ ] Images optimized
- [ ] Unnecessary dependencies removed
- [ ] API response times acceptable
- [ ] Database queries optimized

---

## Environment Configuration

### Environment Variables

Create `.env.local` for development and `.env.production` for production:

```bash
# .env.production
NEXT_PUBLIC_API_URL=https://api.healthdesk.com
NEXT_PUBLIC_APP_URL=https://healthdesk.com
DATABASE_URL=postgresql://user:pass@host:5432/healthdesk
JWT_SECRET=your-secure-jwt-secret-here
CORS_ORIGIN=https://healthdesk.com
NODE_ENV=production
```

**Important:** Never commit `.env.production` to version control.

### Environment Variable Categories

| Category | Variables | Example |
|----------|-----------|---------|
| API | `NEXT_PUBLIC_API_URL` | `https://api.healthdesk.com` |
| Database | `DATABASE_URL` | `postgresql://...` |
| Auth | `JWT_SECRET`, `JWT_EXPIRY` | `secret_key`, `7d` |
| CORS | `CORS_ORIGIN` | `https://healthdesk.com` |
| Monitoring | `SENTRY_DSN` | `https://...` |
| Node | `NODE_ENV` | `production` |

---

## Build & Optimization

### Production Build

```bash
# Install dependencies
npm ci  # Use ci for reproducible builds

# Build for production
npm run build

# Verify bundle size
npm run build -- --debug

# Start production server
npm start
```

### Build Output

```
Route (app)                              Size       First Load JS
┌ ○ /                                    2.5 kB       156 kB
├ ○ /appointments                        1.2 kB       157 kB
├ ○ /dashboard                           3.1 kB       159 kB
├ ○ /patients                            2.8 kB       159 kB
├ ○ /wellness                            2.1 kB       158 kB
└ ○ /api/patients                        0.5 kB       150 kB

○ (Static) prerendered as static HTML
```

### Optimization Strategies

1. **Enable Static Generation:**
   ```typescript
   // app/page.tsx
   export const revalidate = 3600; // Revalidate every hour
   ```

2. **Lazy Load Components:**
   ```typescript
   import dynamic from "next/dynamic";
   const HeavyChart = dynamic(() => import("@/components/Chart"), {
     loading: () => <div>Loading...</div>,
   });
   ```

3. **Image Optimization:**
   ```typescript
   import Image from "next/image";
   <Image src="..." alt="..." width={400} height={300} priority />
   ```

4. **Remove Unused Dependencies:**
   ```bash
   npm audit
   npm prune
   ```

---

## Deployment Platforms

### Vercel (Recommended for Next.js)

**Advantages:**
- Zero-config deployment
- Auto scaling
- Built-in monitoring
- Preview deployments
- Environment management

**Steps:**

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "chore: prepare for production"
   git push origin main
   ```

2. **Import project on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select GitHub repo
   - Configure build settings (auto-detected for Next.js)

3. **Set environment variables:**
   ```
   Dashboard → Settings → Environment Variables
   Add all from .env.production
   ```

4. **Deploy:**
   - Automatic on push to main branch
   - Or click "Deploy" button

### Netlify

**Advantages:**
- Good for static sites
- Built-in CDN
- Form handling
- Lambda functions

**Build command:**
```bash
npm run build
```

**Publish directory:**
```
.next
```

### Docker & Self-Hosted

**Dockerfile:**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

**Build and run:**
```bash
docker build -t healthdesk-wellness .
docker run -p 3000:3000 healthdesk-wellness
```

### AWS Amplify

**Advantages:**
- AWS ecosystem integration
- Auto scaling
- Custom domains
- SSL/TLS included

**Steps:**
1. Connect GitHub repository
2. Configure build settings
3. Set environment variables
4. Deploy

### Azure App Service

**Advantages:**
- Microsoft ecosystem
- RBAC support
- Integration with Microsoft services
- Staging environments

**Deployment:**
```bash
az webapp deployment source config-zip \
  --resource-group <group> \
  --name <app-name> \
  --src dist.zip
```

---

## Database Setup

### PostgreSQL (Recommended)

**Environment Variable:**
```bash
DATABASE_URL=postgresql://user:password@host:5432/healthdesk
```

**Connection Pool Configuration:**
```typescript
// lib/db.ts
import { Pool } from "pg";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
});
```

### MongoDB

**Environment Variable:**
```bash
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/healthdesk
```

**Connection:**
```typescript
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
```

### Migration Strategy

1. **Schema migrations:**
   ```bash
   npm install -D prisma
   npx prisma migrate deploy
   ```

2. **Seed production data:**
   ```bash
   npm run seed:production
   ```

---

## Authentication

### JWT Implementation

```typescript
// app/api/auth/login/route.ts
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // Verify credentials
  const user = await verifyUser(email, password);
  if (!user) return Response.json({ error: "Invalid credentials" }, { status: 401 });

  // Generate JWT
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  return Response.json({ token });
}
```

### Middleware for Protected Routes

```typescript
// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  const token = request.headers.get("Authorization")?.split(" ")[1];

  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}

export const config = {
  matcher: ["/api/protected/:path*"],
};
```

---

## Monitoring & Logging

### Sentry Error Tracking

```bash
npm install @sentry/nextjs
```

**Configuration (`sentry.client.config.ts`):**
```typescript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
});
```

### Application Logging

```typescript
// lib/logger.ts
export const logger = {
  info: (message: string, data?: unknown) => {
    console.log(`[INFO] ${new Date().toISOString()} ${message}`, data);
  },
  error: (message: string, error?: unknown) => {
    console.error(`[ERROR] ${new Date().toISOString()} ${message}`, error);
  },
  warn: (message: string, data?: unknown) => {
    console.warn(`[WARN] ${new Date().toISOString()} ${message}`, data);
  },
};
```

### Performance Monitoring

```bash
npm install @vercel/analytics
```

**Implementation:**
```typescript
// app/layout.tsx
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

---

## Performance Optimization

### Caching Strategy

1. **Static pages (revalidate):**
   ```typescript
   export const revalidate = 3600; // 1 hour
   ```

2. **API response caching:**
   ```typescript
   export const dynamic = "force-dynamic"; // Always fresh
   ```

3. **Browser caching:**
   ```typescript
   // next.config.ts
   headers: async () => {
     return [
       {
         source: "/:path*",
         headers: [
           {
             key: "Cache-Control",
             value: "public, max-age=3600",
           },
         ],
       },
     ];
   }
   ```

### CDN Configuration

Use Vercel's CDN (automatic) or configure custom:

```bash
# Cloudflare DNS
1. Point domain to Cloudflare
2. Enable caching rules
3. Set Page Rules for dynamic content
```

### Database Query Optimization

```typescript
// Use indexes
CREATE INDEX idx_patient_status ON wellness_patients(status);
CREATE INDEX idx_goal_deadline ON wellness_goals(deadline);

// Use connection pooling
const pool = new Pool({ max: 20 });

// Cache frequently accessed data
const cachedPatients = await redis.get("patients:all");
if (!cachedPatients) {
  const data = await db.query("SELECT * FROM wellness_patients");
  await redis.set("patients:all", JSON.stringify(data), 3600);
}
```

---

## Security

### HTTPS & SSL

```bash
# Automatically handled by Vercel/Netlify
# For self-hosted, use Let's Encrypt

# Redirect HTTP to HTTPS
const httpSecurityHeaders = {
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN",
  "X-XSS-Protection": "1; mode=block",
};
```

### CORS Configuration

```typescript
// app/api/patients/route.ts
const allowedOrigins = [
  "https://healthdesk.com",
  "https://app.healthdesk.com",
];

export function middleware(request: NextRequest) {
  const origin = request.headers.get("origin");
  
  if (!allowedOrigins.includes(origin || "")) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  return NextResponse.next();
}
```

### API Rate Limiting

```bash
npm install @vercel/kv
```

```typescript
import { Ratelimit } from "@vercel/kv";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, "1 h"),
});

export async function middleware(request: NextRequest) {
  const { success } = await ratelimit.limit(request.ip || "127.0.0.1");
  if (!success) return new NextResponse("Rate limited", { status: 429 });
}
```

### Input Validation

```typescript
import { z } from "zod";

const patientSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  age: z.number().min(0).max(150),
});

// In API route
const result = patientSchema.safeParse(req.body);
if (!result.success) {
  return Response.json({ error: result.error }, { status: 400 });
}
```

---

## Rollback Procedures

### Vercel Rollback

1. Go to Deployments tab
2. Find previous stable deployment
3. Click "Redeploy"

```bash
# Or via CLI
vercel rollback
```

### Git-Based Rollback

```bash
# Find previous commit
git log --oneline

# Revert to previous commit
git revert <commit-hash>
git push origin main

# Or hard reset (careful!)
git reset --hard <commit-hash>
git push origin main -f
```

### Database Rollback

```sql
-- Create backup before deployment
CREATE TABLE wellness_patients_backup AS SELECT * FROM wellness_patients;

-- Restore if needed
DELETE FROM wellness_patients;
INSERT INTO wellness_patients SELECT * FROM wellness_patients_backup;
```

---

## Post-Deployment

### Verification

- [ ] Site loads in browser
- [ ] Dark mode works
- [ ] All pages accessible
- [ ] Forms submit correctly
- [ ] API endpoints respond
- [ ] No console errors
- [ ] Mobile responsive works
- [ ] Analytics tracking works

### Monitoring

- [ ] Check Sentry for errors
- [ ] Review server logs
- [ ] Monitor database performance
- [ ] Track API response times
- [ ] Watch user analytics

### Alerts

Set up alerts for:
- Failed deployments
- High error rates
- Slow API responses
- Database connection issues
- Disk space warnings

---

## Troubleshooting

### 502 Bad Gateway

```bash
# Check application logs
# Restart application
# Verify environment variables
```

### Database Connection Errors

```bash
# Verify DATABASE_URL
# Check network connectivity
# Verify database credentials
# Check connection pool settings
```

### Performance Issues

```bash
# Run load test
npm install -g artillery
artillery quick --count 100 --num 1000 https://healthdesk.com

# Analyze bundle
npm run build -- --analyze
```

---

## References

- [Vercel Deployment Docs](https://vercel.com/docs)
- [Next.js Production Deployment](https://nextjs.org/docs/app/building-your-application/deploying)
- [Security Best Practices](https://nextjs.org/docs/app/building-your-application/security)
- [Performance Optimization](https://nextjs.org/docs/app/building-your-application/optimizing)

---

## Support

For deployment issues:
1. Check platform documentation
2. Review deployment logs
3. Verify environment variables
4. Check network connectivity
5. Contact support team

---

**Last Updated:** May 2026
