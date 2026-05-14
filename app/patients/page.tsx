"use client";

import { useState, useMemo } from "react";
import { wellnessPatients } from "@/lib/mockData";
import { ProgressRing } from "@/components/ProgressRing";
import { StatusBadge } from "@/components/StatusBadge";
import { HealthScoreCard } from "@/components/HealthScoreCard";
import { Wellness, WellnessStatus, ScoreTrend } from "@/lib/types";
import { X, Mail, Phone, Target, Sparkles, Search, Filter, Users } from "lucide-react";

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

function scoreToTrend(score: number): ScoreTrend {
  if (score >= 75) return "up";
  if (score >= 50) return "stable";
  return "down";
}

function trendToArrow(trend: ScoreTrend) {
  if (trend === "up") return "↑";
  if (trend === "stable") return "→";
  return "↓";
}

export default function PatientsPage() {
  const [selectedPatient, setSelectedPatient] = useState<Wellness | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<WellnessStatus | "All">("All");

  const ringColorMap: Record<string, "purple" | "emerald" | "violet" | "rose"> = {
    Thriving:       "emerald",
    Monitoring:     "violet",
    NeedsAttention: "rose",
  };

  // Feature 5 + 6 (@workspace) — filtering logic demonstrated inline
  const filteredPatients = useMemo(() => {
    const byStatus = selectedStatus !== "All"
      ? wellnessPatients.filter(p => p.status === selectedStatus)
      : wellnessPatients;

    const byName = searchTerm
      ? byStatus.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.primaryConcern.toLowerCase().includes(searchTerm.toLowerCase()))
      : byStatus;

    return byName;
  }, [searchTerm, selectedStatus]);

  const thriving  = wellnessPatients.filter(p => p.status === "Thriving").length;
  const monitoring = wellnessPatients.filter(p => p.status === "Monitoring").length;
  const attention  = wellnessPatients.filter(p => p.status === "NeedsAttention").length;

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-5 h-5 text-purple-500" />
          <p className="text-xs font-semibold uppercase tracking-widest text-purple-500">Wellness Profiles</p>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-50">My Health</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Click a card to view full details and health goals</p>
      </div>

      {/* Quick stat strip */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
          <Users className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">{thriving} Thriving</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
          <Users className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          <span className="text-xs font-semibold text-amber-700 dark:text-amber-300">{monitoring} Monitoring</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800">
          <Users className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
          <span className="text-xs font-semibold text-rose-700 dark:text-rose-300">{attention} Needs Attention</span>
        </div>
      </div>

      {/* Search + Filter — Feature 9 (#selection) demo */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search patients by name or concern..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="form-input pl-10"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <div className="relative">
          <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value as WellnessStatus | "All")}
            className="form-input pl-9 pr-8 appearance-none min-w-[170px]"
          >
            <option value="All">All Statuses</option>
            <option value="Thriving">Thriving</option>
            <option value="Monitoring">Monitoring</option>
            <option value="NeedsAttention">Needs Attention</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      {(searchTerm || selectedStatus !== "All") && (
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          Showing <span className="font-semibold text-purple-600 dark:text-purple-400">{filteredPatients.length}</span> of {wellnessPatients.length} patients
        </p>
      )}

      {/* Patients Grid */}
      {filteredPatients.length === 0 ? (
        <div className="wellness-card p-16 text-center">
          <Users className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <p className="text-slate-500 dark:text-slate-400 font-medium">No patients match your search</p>
          <button onClick={() => { setSearchTerm(""); setSelectedStatus("All"); }} className="mt-3 btn-secondary text-sm px-4 py-2">
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredPatients.map((patient) => {
            const ringColor = ringColorMap[patient.status] ?? "violet";
            const trend = scoreToTrend(patient.wellnessScore);
            return (
              <button
                key={patient.id}
                onClick={() => setSelectedPatient(patient)}
                className="wellness-card text-left group cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                {/* Card top accent */}
                <div className={`h-1.5 w-full rounded-t-2xl ${
                  patient.status === "Thriving" ? "bg-gradient-to-r from-emerald-400 to-teal-400"
                  : patient.status === "Monitoring" ? "bg-gradient-to-r from-amber-400 to-orange-400"
                  : "bg-gradient-to-r from-rose-400 to-pink-400"
                }`} />

                {/* Avatar + name */}
                <div className="p-5 pb-3 flex items-center gap-3">
                  <div className="avatar-initials w-12 h-12 text-sm shrink-0">
                    {getInitials(patient.name)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-900 dark:text-slate-100 truncate">{patient.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{patient.primaryConcern}</p>
                  </div>
                </div>

                {/* Progress Ring */}
                <div className="flex justify-center py-4">
                  <ProgressRing percentage={patient.wellnessScore} size={96} color={ringColor} />
                </div>

                {/* Quick Info */}
                <div className="px-5 pb-3 space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Age</span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">{patient.age} yrs</span>
                  </div>
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Blood Type</span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">{patient.bloodType}</span>
                  </div>
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Trend</span>
                    <span className="font-medium text-slate-800 dark:text-slate-200" aria-label={`Score trend ${trend}`}>
                      {trendToArrow(trend)}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Coordinator</span>
                    <span className="font-medium text-slate-800 dark:text-slate-200 truncate max-w-[7rem]">{patient.coordinator}</span>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="px-5 pb-5 pt-2 border-t border-slate-100 dark:border-slate-800 mt-2">
                  <StatusBadge status={patient.status} />
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Detail Modal */}
      {selectedPatient && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedPatient(null)}
        >
          <div
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 px-6 py-4 rounded-t-2xl flex items-center gap-4 z-10">
              <div className="avatar-initials w-12 h-12 text-sm shrink-0">
                {getInitials(selectedPatient.name)}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 truncate">{selectedPatient.name}</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{selectedPatient.primaryConcern}</p>
              </div>
              <StatusBadge status={selectedPatient.status} />
              <button
                onClick={() => setSelectedPatient(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* HealthScoreCard — Feature 14 (Zero-shot) demo component */}
              <HealthScoreCard
                score={selectedPatient.wellnessScore}
                trend={scoreToTrend(selectedPatient.wellnessScore)}
                label="Overall Wellness Score"
                subtitle={`Enrolled: ${new Date(selectedPatient.enrolledDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`}
              />

              {/* Health Goals */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-4 h-4 text-emerald-500" />
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">Health Goals</h3>
                </div>
                <div className="space-y-2">
                  {selectedPatient.healthGoals.length > 0 ? (
                    selectedPatient.healthGoals.map((goal, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-emerald-50 dark:bg-emerald-900/10 rounded-xl border border-emerald-100 dark:border-emerald-900/30">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                        <span className="text-sm text-slate-700 dark:text-slate-300">{goal}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500 dark:text-slate-400">No goals set yet</p>
                  )}
                </div>
              </div>

              {/* Contact Info */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">Contact Information</p>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-purple-500 shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">{selectedPatient.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">{selectedPatient.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
