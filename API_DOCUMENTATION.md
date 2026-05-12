# API Documentation

## Overview

HealthDesk Wellness provides a REST API for filtering and retrieving wellness patient data. All endpoints are located in `app/api/` and use Next.js Route Handlers.

---

## Base URL

```
http://localhost:3000/api
```

## Authentication

Currently **no authentication** is required. (Implement JWT in production.)

---

## Endpoints

### 1. Get Patients

**Endpoint:** `GET /api/patients`

**Description:** Retrieve wellness patients, optionally filtered by status.

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `status` | string | No | Filter by status: `Thriving`, `Monitoring`, or `NeedsAttention` |

**Examples:**

```bash
# Get all patients
curl http://localhost:3000/api/patients

# Get only thriving patients
curl http://localhost:3000/api/patients?status=Thriving

# Get patients needing attention
curl http://localhost:3000/api/patients?status=NeedsAttention
```

**Response Format:**

```json
{
  "data": [
    {
      "id": "W001",
      "name": "Emma Johnson",
      "age": 34,
      "gender": "Female",
      "bloodType": "A+",
      "primaryConcern": "Weight Management & Fitness",
      "status": "Thriving",
      "enrolledDate": "2026-03-15",
      "coordinator": "Sarah Lee",
      "phone": "+1 (555) 201-4832",
      "email": "emma.j@email.com",
      "healthGoals": [
        "10,000 steps daily",
        "8 hours sleep",
        "Drink 8 glasses water"
      ],
      "activeMetrics": [
        {
          "id": "M001",
          "patientId": "W001",
          "type": "Steps",
          "value": 8750,
          "unit": "steps",
          "timestamp": "2026-05-07"
        }
      ],
      "wellnessScore": 78
    }
  ],
  "count": 1,
  "timestamp": "2026-05-08T10:30:00Z"
}
```

**Response Codes:**

| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Invalid status parameter |
| 500 | Server error |

**Usage in React:**

```typescript
// Fetch all patients
const fetchAllPatients = async () => {
  const res = await fetch('/api/patients');
  const { data, count } = await res.json();
  console.log(`Retrieved ${count} patients`);
};

// Fetch with status filter
const fetchThrivingPatients = async () => {
  const res = await fetch('/api/patients?status=Thriving');
  const { data, count } = await res.json();
  console.log(`${count} thriving patients`);
};
```

---

## Data Models

### Patient (Wellness)

```typescript
interface Wellness {
  id: string;                           // Unique patient ID (W001, W002, etc.)
  name: string;                         // Patient full name
  age: number;                          // Age in years
  gender: "Male" | "Female";            // Gender
  bloodType: BloodType;                 // A+, A-, B+, B-, AB+, AB-, O+, O-
  primaryConcern: string;               // Main health concern
  status: WellnessStatus;               // Thriving, Monitoring, NeedsAttention
  enrolledDate: string;                 // ISO 8601 date (YYYY-MM-DD)
  coordinator: string;                  // Assigned coordinator name
  phone: string;                        // Contact phone number
  email: string;                        // Contact email
  healthGoals: string[];                // Array of goal descriptions
  activeMetrics: HealthMetric[];        // Current health measurements
  wellnessScore: number;                // 0-100 wellness percentage
}
```

### Health Metric

```typescript
interface HealthMetric {
  id: string;                           // Unique metric ID
  patientId: string;                    // Associated patient ID
  type: MetricType;                     // HeartRate, BloodPressure, Temperature, Steps, Water
  value: number;                        // Numeric value
  unit: string;                         // Unit (bpm, mmHg, °F, steps, glasses)
  timestamp: string;                    // ISO 8601 datetime
}
```

### Status Types

```typescript
type WellnessStatus = "Thriving" | "Monitoring" | "NeedsAttention";
type BloodType = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
type MetricType = "HeartRate" | "BloodPressure" | "Temperature" | "Steps" | "Water";
```

---

## Error Handling

All errors are returned with a standard format:

```json
{
  "error": "Error message",
  "status": 400
}
```

**Common Errors:**

```json
{
  "error": "Invalid status parameter. Must be one of: Thriving, Monitoring, NeedsAttention",
  "status": 400
}
```

---

## Implementation Details

**File:** `app/api/patients/route.ts`

**Logic:**
1. Extract `status` query parameter
2. Validate status against allowed values
3. Filter `wellnessPatients` array from `lib/mockData.ts`
4. Return filtered data with count and timestamp

**Future Enhancements:**
- [ ] Add pagination support (`?page=1&limit=10`)
- [ ] Add sorting (`?sort=name:asc`)
- [ ] Add search (`?search=Emma`)
- [ ] Add date range filtering
- [ ] Implement JWT authentication
- [ ] Add rate limiting

---

## Testing

### cURL Examples

```bash
# All patients
curl -X GET "http://localhost:3000/api/patients"

# Thriving patients
curl -X GET "http://localhost:3000/api/patients?status=Thriving"

# Monitoring patients
curl -X GET "http://localhost:3000/api/patients?status=Monitoring"

# Needs attention patients
curl -X GET "http://localhost:3000/api/patients?status=NeedsAttention"
```

### JavaScript Fetch Examples

```javascript
// Using async/await
async function getPatients(status = null) {
  try {
    const url = new URL('http://localhost:3000/api/patients');
    if (status) url.searchParams.append('status', status);
    
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    const { data, count, timestamp } = await response.json();
    console.log(`${count} patients retrieved at ${timestamp}`);
    return data;
  } catch (error) {
    console.error('Failed to fetch patients:', error);
  }
}

// Using .then()
fetch('/api/patients?status=Thriving')
  .then(res => res.json())
  .then(({ data, count }) => {
    console.log(`${count} thriving patients:`, data);
  })
  .catch(err => console.error(err));
```

---

## Response Time

- Typical response time: **< 50ms** (mock data)
- With filtering: **< 100ms**

---

## Rate Limiting

Currently not implemented. Recommended for production:
- 100 requests per minute per IP
- 429 Too Many Requests when exceeded

---

## Versioning

API is currently **v1** (implicit). Future versions should be prefixed:
- `/api/v1/patients`
- `/api/v2/patients`

---

## CORS

CORS is enabled by default for development. In production, restrict to specific origins:

```typescript
// app/api/patients/route.ts
const headers = {
  'Access-Control-Allow-Origin': process.env.CORS_ORIGIN || '*',
};
```

---

## Changelog

### v1.0 (Current)
- [x] GET /api/patients
- [x] Status filtering
- [ ] Pagination
- [ ] Sorting
- [ ] Search
- [ ] Authentication
