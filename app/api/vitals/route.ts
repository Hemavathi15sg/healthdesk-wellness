import { vitals } from "@/lib/mockData";
import { NextResponse, NextRequest } from "next/server";

/**
 * GET /api/vitals?patientId=W001&type=HeartRate
 *
 * Feature 13 (/tests) + Feature 15 (One-shot) demo
 *
 * Query params:
 *   patientId  — required; filters by patient ID
 *   type       — optional; filters by vital type (HeartRate | BloodPressure | Temperature | Steps | Water)
 *
 * Error handling pattern:
 *   Missing patientId   → 400 { error, code: "MISSING_PARAM" }
 *   Invalid type        → 400 { error, code: "INVALID_PARAM" }
 *   Server error        → 500 { error, code: "SERVER_ERROR" }
 */

const VALID_TYPES = ["HeartRate", "BloodPressure", "Temperature", "Steps", "Water", "Weight", "OxygenSaturation"];

export async function GET(request: NextRequest) {
  try {
    const patientId = request.nextUrl.searchParams.get("patientId");
    const type      = request.nextUrl.searchParams.get("type");

    if (!patientId) {
      return NextResponse.json(
        { error: "patientId is required", code: "MISSING_PARAM" },
        { status: 400 }
      );
    }

    if (type && !VALID_TYPES.includes(type)) {
      return NextResponse.json(
        { error: `Invalid type. Must be one of: ${VALID_TYPES.join(", ")}`, code: "INVALID_PARAM" },
        { status: 400 }
      );
    }

    let filtered = vitals.filter(v => v.patientId === patientId);
    if (type) {
      filtered = filtered.filter(v => v.type === type);
    }

    return NextResponse.json({
      data: filtered,
      count: filtered.length,
      patientId,
      timestamp: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({ error: "Internal server error", code: "SERVER_ERROR" }, { status: 500 });
  }
}
