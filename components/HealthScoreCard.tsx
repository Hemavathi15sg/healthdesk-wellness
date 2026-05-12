"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { ScoreTrend } from "@/lib/types";

/**
 * HealthScoreCard — Feature 14 (Zero-shot Prompting) demo component
 * 
 * Props:
 *   score  — 0 to 100 wellness score
 *   trend  — "up" | "down" | "stable" direction indicator
 *   label  — descriptive label below the score
 *
 * Behavior:
 *   - Displays a large animated score number
 *   - Shows a sparkline trend icon (↑ ↓ →) with color coding
 *   - Green for up, Red for down, Gray for stable
 *   - Uses wellness-card base styling
 *   - Dark mode support via Tailwind dark: prefix
 *   - Responsive on all screen sizes
 */

interface HealthScoreCardProps {
  score: number;       // 0-100 wellness score
  trend: ScoreTrend;  // "up" | "down" | "stable"
  label: string;       // descriptive label
  subtitle?: string;   // optional secondary text
}

const trendConfig = {
  up: {
    icon: TrendingUp,
    label: "Improving",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    border: "border-emerald-200 dark:border-emerald-800",
    score: "text-emerald-600 dark:text-emerald-400",
  },
  down: {
    icon: TrendingDown,
    label: "Declining",
    color: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-50 dark:bg-rose-900/20",
    border: "border-rose-200 dark:border-rose-800",
    score: "text-rose-600 dark:text-rose-400",
  },
  stable: {
    icon: Minus,
    label: "Stable",
    color: "text-slate-500 dark:text-slate-400",
    bg: "bg-slate-50 dark:bg-slate-800/60",
    border: "border-slate-200 dark:border-slate-700",
    score: "text-slate-700 dark:text-slate-200",
  },
} as const;

export function HealthScoreCard({ score, trend, label, subtitle }: HealthScoreCardProps) {
  const config = trendConfig[trend];
  const TrendIcon = config.icon;

  return (
    <div className={`wellness-card p-5 border ${config.border} ${config.bg} flex flex-col gap-3`}>
      {/* Score — large animated number */}
      <div className="flex items-start justify-between">
        <div className="score-animate">
          <span className={`text-5xl font-extrabold tabular-nums leading-none ${config.score}`}>
            {score}
          </span>
          <span className={`text-xl font-bold ${config.score} opacity-70`}>/100</span>
        </div>

        {/* Trend icon badge */}
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${config.bg} border ${config.border}`}>
          <TrendIcon className={`w-4 h-4 ${config.color}`} />
          <span className={`text-xs font-semibold ${config.color}`}>{config.label}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${
            trend === "up"
              ? "shimmer-bar-emerald"
              : trend === "down"
              ? "shimmer-bar-rose"
              : "bg-slate-400 dark:bg-slate-500"
          }`}
          style={{ width: `${score}%` }}
        />
      </div>

      {/* Label */}
      <div>
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{label}</p>
        {subtitle && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
