import { appointments } from "@/lib/mockData";
import { NextResponse, NextRequest } from "next/server";

/**
 * GET /api/appointments?department=Coaching&status=Scheduled
 *
 * Feature 15 (One-shot) demo — follows same error-handling pattern as /api/patients
 *
 * Query params:
 *   status     — optional; filters by appointment status (Scheduled | Completed | Cancelled)
 *   type       — optional; filters by appointment type (Consultation | Follow-up | Assessment | Coaching)
 *
 * Returns { data: WellnessAppointment[], count: number, timestamp: string }
 */

const VALID_STATUSES = ["Scheduled", "Completed", "Cancelled"];
const VALID_TYPES    = ["Consultation", "Follow-up", "Assessment", "Coaching"];

export async function GET(request: NextRequest) {
  try {
    const status = request.nextUrl.searchParams.get("status");
    const type   = request.nextUrl.searchParams.get("type");

    if (status && !VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}`, code: "INVALID_PARAM" },
        { status: 400 }
      );
    }

    if (type && !VALID_TYPES.includes(type)) {
      return NextResponse.json(
        { error: `Invalid type. Must be one of: ${VALID_TYPES.join(", ")}`, code: "INVALID_PARAM" },
        { status: 400 }
      );
    }

    let filtered = appointments;
    if (status) filtered = filtered.filter(a => a.status === status);
    if (type)   filtered = filtered.filter(a => a.type   === type);

    return NextResponse.json({
      data: filtered,
      count: filtered.length,
      timestamp: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({ error: "Internal server error", code: "SERVER_ERROR" }, { status: 500 });
  }
}
