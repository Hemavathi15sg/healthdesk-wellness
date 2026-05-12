"use client";

/**
 * StatusBadge — Feature 2 (NES) + Feature 13 (/tests) demo component
 *
 * Displays a colored pill badge based on wellness/appointment status.
 * Uses the badge-* CSS utility classes from globals.css.
 *
 * Statuses → badge class mapping:
 *   Thriving        → badge-emerald
 *   Monitoring      → badge-amber
 *   NeedsAttention  → badge-rose
 *   Scheduled       → badge-blue
 *   Completed       → badge-emerald
 *   Cancelled       → badge-gray
 *   Active          → badge-purple
 *   Paused          → badge-amber
 */

import type { WellnessStatus, AppointmentStatus, MedicationStatus } from "@/lib/types";

type StatusType = WellnessStatus | AppointmentStatus | MedicationStatus | string;

interface StatusBadgeProps {
  status: StatusType;
  showDot?: boolean;
}

const statusMap: Record<string, { cls: string; dot: string; label: string }> = {
  Thriving:       { cls: "badge-emerald", dot: "bg-emerald-500", label: "Thriving" },
  Monitoring:     { cls: "badge-amber",   dot: "bg-amber-500",   label: "Monitoring" },
  NeedsAttention: { cls: "badge-rose",    dot: "bg-rose-500",    label: "Needs Attention" },
  Scheduled:      { cls: "badge-blue",    dot: "bg-blue-500",    label: "Scheduled" },
  Completed:      { cls: "badge-emerald", dot: "bg-emerald-500", label: "Completed" },
  Cancelled:      { cls: "badge-gray",    dot: "bg-slate-400",   label: "Cancelled" },
  Active:         { cls: "badge-purple",  dot: "bg-purple-500",  label: "Active" },
  Paused:         { cls: "badge-amber",   dot: "bg-amber-500",   label: "Paused" },
};

export function StatusBadge({ status, showDot = true }: StatusBadgeProps) {
  const config = statusMap[status] ?? { cls: "badge-gray", dot: "bg-slate-400", label: status };

  return (
    <span className={config.cls}>
      {showDot && (
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${config.dot}`} />
      )}
      {config.label}
    </span>
  );
}
