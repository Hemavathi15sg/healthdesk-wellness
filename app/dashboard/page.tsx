"use client";

import { appointments, wellnessPatients, wellnessTrendData } from "@/lib/mockData";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from "recharts";
import {
  TrendingUp, Users, LayoutDashboard, AlertCircle,
  CheckCircle2, Clock, ArrowUpRight, ArrowDownRight, Minus
} from "lucide-react";
import { HealthScoreCard } from "@/components/HealthScoreCard";
import { StatusBadge } from "@/components/StatusBadge";

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

// Calculate stats from wellnessPatients
const thriving      = wellnessPatients.filter(p => p.status === "Thriving").length;
const monitoring    = wellnessPatients.filter(p => p.status === "Monitoring").length;
const needsAttention = wellnessPatients.filter(p => p.status === "NeedsAttention").length;
const totalMembers  = wellnessPatients.length;

const statConfig = [
  {
    icon: Users,
    label: "Total Members",
    accent: "stat-card-accent-purple",
    iconBg: "bg-purple-100 dark:bg-purple-900/30",
    iconColor: "text-purple-600 dark:text-purple-400",
    value: totalMembers,
    trend: "+2",
    trendUp: true,
  },
  {
    icon: CheckCircle2,
    label: "Thriving",
    accent: "stat-card-accent-emerald",
    iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    value: thriving,
    trend: "+1",
    trendUp: true,
  },
  {
    icon: Clock,
    label: "Monitoring",
    accent: "stat-card-accent-violet",
    iconBg: "bg-amber-100 dark:bg-amber-900/30",
    iconColor: "text-amber-600 dark:text-amber-400",
    value: monitoring,
    trend: "0",
    trendUp: null,
  },
  {
    icon: AlertCircle,
    label: "Needs Attention",
    accent: "stat-card-accent-rose",
    iconBg: "bg-rose-100 dark:bg-rose-900/30",
    iconColor: "text-rose-600 dark:text-rose-400",
    value: needsAttention,
    trend: "-1",
    trendUp: false,
  },
];

// Appointment type breakdown data for bar chart
const appointmentTypeData = [
  { type: "Coaching",     count: appointments.filter(a => a.type === "Coaching").length },
  { type: "Follow-up",    count: appointments.filter(a => a.type === "Follow-up").length },
  { type: "Consultation", count: appointments.filter(a => a.type === "Consultation").length },
  { type: "Assessment",   count: appointments.filter(a => a.type === "Assessment").length },
];

export default function DashboardPage() {
  const topPatients = [...wellnessPatients]
    .sort((a, b) => b.wellnessScore - a.wellnessScore)
    .slice(0, 4);

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <LayoutDashboard className="w-5 h-5 text-purple-500" />
          <p className="text-xs font-semibold uppercase tracking-widest text-purple-500">Overview</p>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-50">Dashboard</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Your wellness overview at a glance</p>
      </div>

      {/* Stats Cards Grid — Feature 18 (CICS) demo result */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statConfig.map(({ icon: Icon, label, accent, iconBg, iconColor, value, trend, trendUp }) => (
          <div key={label} className={`stat-card ${accent}`}>
            <div className={`flex items-center justify-center w-11 h-11 rounded-xl ${iconBg} shrink-0`}>
              <Icon className={`w-5 h-5 ${iconColor}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">{label}</p>
              <p className={`text-3xl font-extrabold ${iconColor}`}>{value}</p>
              <p className={trendUp === true ? "trend-up" : trendUp === false ? "trend-down" : "trend-flat"}>
                {trendUp === true ? <ArrowUpRight className="w-3 h-3" /> : trendUp === false ? <ArrowDownRight className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                {trend} this week
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row — 2 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Wellness Trend Line Chart */}
        <div className="wellness-card p-6">
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp className="w-4 h-4 text-purple-500" />
            <h2 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">Wellness Trends — 4 Week Overview</h2>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={wellnessTrendData} margin={{ top: 8, right: 16, left: -20, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.2)" />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", backgroundColor: "white", padding: "8px 12px", fontSize: 12 }}
              />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="wellness"  stroke="#a855f7" strokeWidth={2.5} dot={{ fill: "#a855f7", r: 4, strokeWidth: 0 }} activeDot={{ r: 6 }} name="Avg Score" />
              <Line type="monotone" dataKey="thriving"  stroke="#10b981" strokeWidth={2}   dot={{ fill: "#10b981", r: 3, strokeWidth: 0 }} name="Thriving" />
              <Line type="monotone" dataKey="attention" stroke="#f43f5e" strokeWidth={2}   dot={{ fill: "#f43f5e", r: 3, strokeWidth: 0 }} name="At Risk" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Appointment Types Bar Chart */}
        <div className="wellness-card p-6">
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp className="w-4 h-4 text-violet-500" />
            <h2 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">Appointments by Type</h2>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={appointmentTypeData} margin={{ top: 8, right: 16, left: -20, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.2)" vertical={false} />
              <XAxis dataKey="type" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip
                contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", backgroundColor: "white", padding: "8px 12px", fontSize: 12 }}
              />
              <Bar dataKey="count" fill="#a855f7" radius={[6, 6, 0, 0]} name="Count" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* HealthScoreCard Strip — top 4 patients */}
      <div className="mb-8">
        <h2 className="font-semibold text-slate-900 dark:text-slate-100 text-sm mb-4 flex items-center gap-2">
          <Users className="w-4 h-4 text-purple-500" />
          Top Wellness Performers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {topPatients.map(p => (
            <HealthScoreCard
              key={p.id}
              score={p.wellnessScore}
              trend={p.wellnessScore >= 75 ? "up" : p.wellnessScore >= 50 ? "stable" : "down"}
              label={p.name}
              subtitle={p.primaryConcern}
            />
          ))}
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="wellness-card p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-violet-500" />
            <h2 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">Upcoming Appointments</h2>
          </div>
          <span className="badge-purple">{appointments.filter(a => a.status === "Scheduled").length} scheduled</span>
        </div>
        <div className="space-y-2.5">
          {appointments.filter(a => a.status === "Scheduled").slice(0, 5).map((appt) => (
            <div key={appt.id} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl hover:bg-purple-50/50 dark:hover:bg-purple-900/10 transition-colors">
              <div className="avatar-initials w-10 h-10 text-sm shrink-0">{getInitials(appt.patientName)}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">{appt.patientName}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{appt.date} · {appt.time}</p>
              </div>
              <div className="flex flex-col items-end gap-1.5 shrink-0">
                <span className="badge-purple">{appt.type}</span>
                <StatusBadge status={appt.status} showDot={false} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}