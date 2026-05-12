import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Wellness, WellnessStatus, Medication } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "Thriving":
      return "bg-emerald-100 text-emerald-800";
    case "Monitoring":
      return "bg-amber-100 text-amber-800";
    case "NeedsAttention":
      return "bg-violet-100 text-violet-800";
    case "Completed":
      return "bg-emerald-100 text-emerald-800";
    case "Active":
      return "bg-purple-100 text-purple-800";
    case "Scheduled":
      return "bg-blue-100 text-blue-800";
    case "Cancelled":
      return "bg-slate-100 text-slate-800";
    default:
      return "bg-slate-100 text-slate-800";
  }
}

export function getProgressPercentage(current: number, target: number): number {
  if (target === 0) return 0;
  return Math.min((current / target) * 100, 100);
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// Calculate wellness score percentage (used for inline suggestion demo - Feature 1)
export function calculateWellnessPercentage(current: number, max: number): number {
  return Math.min((current / max) * 100, 100);
}

// Calculate health score percentage
export function calculateHealthScore(current: number, target: number): number {
  if (target === 0) return 0;
  return Math.min((current / target) * 100, 100);
}

// Filter patients by status (used for inline suggestion demo - Feature 1 intermediate)
export function filterPatientsByStatus(patients: Wellness[], status: WellnessStatus): Wellness[] {
  return patients.filter(p => p.status === status);
}

// Group medications by patient and count active ones (used for inline suggestion demo - Feature 1 advanced)
export function getMedicationStats(medications: Medication[]): Record<string, number> {
  return medications.reduce((acc, med) => {
    if (med.status === "Active") {
      acc[med.patientName] = (acc[med.patientName] ?? 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
}

// Validate email address (Feature 8 - #file demo)
export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}