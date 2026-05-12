"use client";

interface ProgressRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  color?: "purple" | "emerald" | "violet" | "rose";
}

const colorMap = {
  purple: "stroke-purple-600 dark:stroke-purple-400",
  emerald: "stroke-emerald-600 dark:stroke-emerald-400",
  violet: "stroke-violet-600 dark:stroke-violet-400",
  rose: "stroke-rose-600 dark:stroke-rose-400",
};

export function ProgressRing({
  percentage,
  size = 120,
  strokeWidth = 10,
  label,
  color = "purple",
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-slate-200 dark:text-slate-700"
          />

          {/* Progress Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={`transition-all duration-500 ${colorMap[color]}`}
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {percentage}%
          </span>
        </div>
      </div>

      {label && <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{label}</p>}
    </div>
  );
}
