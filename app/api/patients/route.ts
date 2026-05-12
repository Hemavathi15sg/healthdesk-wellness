import { wellnessPatients } from "@/lib/mockData";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const status = request.nextUrl.searchParams.get("status");
    const filtered = status ? wellnessPatients.filter((p) => p.status === status) : wellnessPatients;

    return NextResponse.json({
      data: filtered,
      count: filtered.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
