"use client";

import { Heart, Users, Calendar, Sparkles, Target, TrendingUp, Shield, Star, ChevronRight } from "lucide-react";
import Link from "next/link";

const navCards = [
  { label: "My Health", href: "/patients", icon: Users, description: "View wellness profiles", color: "from-purple-50 to-purple-100/50 dark:from-purple-900/30 dark:to-purple-900/10", border: "border-purple-200 dark:border-purple-800", iconBg: "bg-purple-100 dark:bg-purple-900/40", iconColor: "text-purple-600 dark:text-purple-400", hover: "hover:border-purple-400 dark:hover:border-purple-600" },
  { label: "Appointments", href: "/appointments", icon: Calendar, description: "Book & manage sessions", color: "from-emerald-50 to-emerald-100/50 dark:from-emerald-900/30 dark:to-emerald-900/10", border: "border-emerald-200 dark:border-emerald-800", iconBg: "bg-emerald-100 dark:bg-emerald-900/40", iconColor: "text-emerald-600 dark:text-emerald-400", hover: "hover:border-emerald-400 dark:hover:border-emerald-600" },
  { label: "Dashboard", href: "/dashboard", icon: Sparkles, description: "Analytics & insights", color: "from-violet-50 to-violet-100/50 dark:from-violet-900/30 dark:to-violet-900/10", border: "border-violet-200 dark:border-violet-800", iconBg: "bg-violet-100 dark:bg-violet-900/40", iconColor: "text-violet-600 dark:text-violet-400", hover: "hover:border-violet-400 dark:hover:border-violet-600" },
  { label: "Wellness Goals", href: "/wellness", icon: Target, description: "Track your progress", color: "from-rose-50 to-rose-100/50 dark:from-rose-900/30 dark:to-rose-900/10", border: "border-rose-200 dark:border-rose-800", iconBg: "bg-rose-100 dark:bg-rose-900/40", iconColor: "text-rose-600 dark:text-rose-400", hover: "hover:border-rose-400 dark:hover:border-rose-600" },
];

const stats = [
  { value: "1,000+", label: "Active Members", icon: Users, color: "text-purple-600 dark:text-purple-400" },
  { value: "10K+", label: "Goals Achieved", icon: TrendingUp, color: "text-emerald-600 dark:text-emerald-400" },
  { value: "4.9★", label: "Member Rating", icon: Star, color: "text-amber-500 dark:text-amber-400" },
  { value: "24/7", label: "Support Available", icon: Shield, color: "text-violet-600 dark:text-violet-400" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-violet-50/50 to-slate-50 dark:from-purple-950/40 dark:via-violet-950/20 dark:to-slate-950 pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200/30 dark:bg-purple-900/20 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-200/30 dark:bg-violet-900/20 rounded-full blur-2xl pointer-events-none translate-y-1/2 -translate-x-1/4" />

        <div className="relative flex flex-col items-center justify-center text-center px-6 pt-20 pb-16">
          {/* Animated pulse logo */}
          <div className="relative mb-8">
            <div className="absolute inset-0 rounded-full bg-purple-400/30 dark:bg-purple-600/20 pulse-ring" />
            <div className="absolute inset-[-6px] rounded-full border-2 border-purple-300/40 dark:border-purple-700/30" />
            <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-violet-600 shadow-xl shadow-purple-300 dark:shadow-purple-900/60">
              <Heart className="w-9 h-9 text-white" fill="currentColor" />
            </div>
          </div>

          {/* Headline */}
          <div className="mb-4">
            <span className="inline-block px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 text-xs font-semibold tracking-wide mb-4">
              YOUR WELLNESS JOURNEY STARTS HERE
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-slate-50 leading-tight tracking-tight">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-purple-600 to-violet-500 bg-clip-text text-transparent">
                Wellness Hub
              </span>
            </h1>
          </div>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-lg mb-8">
            Track health goals, manage appointments, and unlock your best self — all in one place.
          </p>
          <Link href="/dashboard" className="btn-primary inline-flex items-center gap-2 mb-12">
            Get Started <ChevronRight className="w-4 h-4" />
          </Link>

          {/* Navigation Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-4xl">
            {navCards.map(({ label, href, icon: Icon, description, color, border, iconBg, iconColor, hover }) => (
              <Link
                key={href}
                href={href}
                className={`group flex flex-col items-start gap-4 p-5 rounded-2xl border bg-gradient-to-br ${color} ${border} ${hover} transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5`}
              >
                <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${iconBg} transition-transform group-hover:scale-110`}>
                  <Icon className={`w-5 h-5 ${iconColor}`} />
                </div>
                <div className="text-left flex-1">
                  <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm">{label}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{description}</p>
                </div>
                <ChevronRight className={`w-4 h-4 ${iconColor} opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5`} />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="px-6 pb-16">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-600 mb-4">Trusted by our community</p>
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-slate-100 dark:divide-slate-800">
            {stats.map(({ value, label, icon: Icon, color }) => (
              <div key={label} className="flex flex-col items-center gap-2 py-8 px-4">
                <Icon className={`w-5 h-5 ${color}`} />
                <p className={`text-2xl font-bold ${color}`}>{value}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 text-center">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
