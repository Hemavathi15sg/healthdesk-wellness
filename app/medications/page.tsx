"use client";

/**
 * Medications Page — Feature 4 (Plan Agent) demo result
 *
 * Shows all active medications across all wellness patients.
 * Columns: Patient Name, Medication, Dosage, Frequency, Start Date, Status
 * Features:
 *   - Search by patient name (real-time filter)
 *   - Filter by category
 *   - Detail modal on row/card click
 *   - Responsive: cards on mobile, table on desktop
 *   - Dark mode support
 */

import { useState, useMemo } from "react";
import { medications } from "@/lib/mockData";
import { Medication, MedicationStatus } from "@/lib/types";
import { StatusBadge } from "@/components/StatusBadge";
import {
  Pill,
  Search,
  X,
  Calendar,
  User,
  Stethoscope,
  Tag,
  AlarmClock,
  StickyNote,
  Filter,
} from "lucide-react";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const categoryColors: Record<string, string> = {
  "Cardiovascular":          "bg-rose-50 text-rose-700 dark:bg-rose-900/20 dark:text-rose-300 border-rose-200 dark:border-rose-800",
  "Diabetes":                "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300 border-amber-200 dark:border-amber-800",
  "Vitamins & Supplements":  "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
  "Mental Health":           "bg-violet-50 text-violet-700 dark:bg-violet-900/20 dark:text-violet-300 border-violet-200 dark:border-violet-800",
  "General":                 "bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700",
  "Respiratory":             "bg-sky-50 text-sky-700 dark:bg-sky-900/20 dark:text-sky-300 border-sky-200 dark:border-sky-800",
  "Metabolic":               "bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300 border-orange-200 dark:border-orange-800",
};

function CategoryBadge({ category }: { category: string }) {
  const cls = categoryColors[category] ?? categoryColors["General"];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${cls}`}>
      {category}
    </span>
  );
}

function getInitials(name: string) {
  return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
}

export default function MedicationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState<MedicationStatus | "All">("All");
  const [selectedMed, setSelectedMed] = useState<Medication | null>(null);

  const categories = ["All", ...Array.from(new Set(medications.map(m => m.category))).sort()];

  // Filter medications by patient name search + category + status
  const filteredMedications = useMemo(() => {
    return medications.filter(med => {
      const bySearch = searchTerm
        ? med.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          med.name.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      const byCategory = selectedCategory !== "All" ? med.category === selectedCategory : true;
      const byStatus   = selectedStatus   !== "All" ? med.status   === selectedStatus   : true;
      return bySearch && byCategory && byStatus;
    });
  }, [searchTerm, selectedCategory, selectedStatus]);

  const activeMeds    = medications.filter(m => m.status === "Active").length;
  const pausedMeds    = medications.filter(m => m.status === "Paused").length;
  const completedMeds = medications.filter(m => m.status === "Completed").length;

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <Pill className="w-5 h-5 text-purple-500" />
          <p className="text-xs font-semibold uppercase tracking-widest text-purple-500">Prescriptions</p>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-50">Medications</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
          All prescriptions and supplements across wellness patients
        </p>
      </div>

      {/* Stat Summary */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="wellness-card stat-card-accent-purple p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center shrink-0">
            <Pill className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Active</p>
            <p className="text-2xl font-extrabold text-purple-600 dark:text-purple-400">{activeMeds}</p>
          </div>
        </div>
        <div className="wellness-card stat-card-accent-amber p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
            <AlarmClock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Paused</p>
            <p className="text-2xl font-extrabold text-amber-600 dark:text-amber-400">{pausedMeds}</p>
          </div>
        </div>
        <div className="wellness-card stat-card-accent-emerald p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
            <Stethoscope className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Completed</p>
            <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">{completedMeds}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search patients or medications..."
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

        {/* Category filter */}
        <div className="relative">
          <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="form-input pl-9 pr-8 appearance-none min-w-[160px]"
          >
            {categories.map(cat => <option key={cat}>{cat}</option>)}
          </select>
        </div>

        {/* Status filter */}
        <select
          value={selectedStatus}
          onChange={e => setSelectedStatus(e.target.value as MedicationStatus | "All")}
          className="form-input min-w-[120px]"
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Paused">Paused</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Results count */}
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Showing <span className="font-semibold text-purple-600 dark:text-purple-400">{filteredMedications.length}</span> of {medications.length} medications
      </p>

      {/* Desktop: Table view */}
      <div className="wellness-card overflow-hidden hidden md:block">
        <table className="data-table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Medication</th>
              <th>Dosage</th>
              <th>Frequency</th>
              <th>Category</th>
              <th>Start Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredMedications.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-16 text-center">
                  <Pill className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-500 dark:text-slate-400 font-medium">No medications found</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Try adjusting your search or filters</p>
                </td>
              </tr>
            ) : (
              filteredMedications.map(med => (
                <tr
                  key={med.id}
                  onClick={() => setSelectedMed(med)}
                  className="cursor-pointer"
                >
                  <td>
                    <div className="flex items-center gap-2.5">
                      <div className="avatar-initials w-8 h-8 text-xs shrink-0">{getInitials(med.patientName)}</div>
                      <span className="font-medium text-slate-900 dark:text-slate-100">{med.patientName}</span>
                    </div>
                  </td>
                  <td>
                    <p className="font-medium text-slate-900 dark:text-slate-100">{med.name}</p>
                    {med.notes && <p className="text-xs text-slate-400 mt-0.5 truncate max-w-[200px]">{med.notes}</p>}
                  </td>
                  <td className="font-mono text-sm text-purple-700 dark:text-purple-300 font-semibold">{med.dosage}</td>
                  <td>{med.frequency}</td>
                  <td><CategoryBadge category={med.category} /></td>
                  <td className="tabular-nums">{formatDate(med.startDate)}</td>
                  <td><StatusBadge status={med.status} /></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile: Card view */}
      <div className="md:hidden space-y-3">
        {filteredMedications.length === 0 ? (
          <div className="wellness-card p-12 text-center">
            <Pill className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">No medications found</p>
          </div>
        ) : (
          filteredMedications.map(med => (
            <button
              key={med.id}
              onClick={() => setSelectedMed(med)}
              className="wellness-card w-full text-left p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="avatar-initials w-9 h-9 text-xs">{getInitials(med.patientName)}</div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-slate-100 text-sm">{med.patientName}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{med.name} · {med.dosage}</p>
                  </div>
                </div>
                <StatusBadge status={med.status} />
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <CategoryBadge category={med.category} />
                <span className="text-xs text-slate-400">{med.frequency}</span>
              </div>
            </button>
          ))
        )}
      </div>

      {/* Detail Modal */}
      {selectedMed && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedMed(null)}
        >
          <div
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 w-full max-w-lg shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <Pill className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h2 className="font-bold text-slate-900 dark:text-slate-100">{selectedMed.name}</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{selectedMed.category}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedMed(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Patient + Prescribed By */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <User className="w-3.5 h-3.5 text-purple-500" />
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Patient</p>
                  </div>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{selectedMed.patientName}</p>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <Stethoscope className="w-3.5 h-3.5 text-emerald-500" />
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Prescribed By</p>
                  </div>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{selectedMed.prescribedBy}</p>
                </div>
              </div>

              {/* Dosage + Frequency */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-purple-50 dark:bg-purple-900/10 rounded-xl border border-purple-100 dark:border-purple-900/30">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Dosage</p>
                  <p className="text-xl font-bold text-purple-600 dark:text-purple-400 font-mono">{selectedMed.dosage}</p>
                </div>
                <div className="p-3 bg-violet-50 dark:bg-violet-900/10 rounded-xl border border-violet-100 dark:border-violet-900/30">
                  <div className="flex items-center gap-1.5 mb-1">
                    <AlarmClock className="w-3.5 h-3.5 text-violet-500" />
                    <p className="text-xs text-slate-500 dark:text-slate-400">Frequency</p>
                  </div>
                  <p className="text-sm font-semibold text-violet-700 dark:text-violet-300">{selectedMed.frequency}</p>
                </div>
              </div>

              {/* Dates */}
              <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <Calendar className="w-4 h-4 text-slate-500 shrink-0" />
                <div className="flex-1">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Start Date</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{formatDate(selectedMed.startDate)}</p>
                </div>
                {selectedMed.endDate && (
                  <>
                    <div className="w-px h-8 bg-slate-200 dark:bg-slate-700" />
                    <div className="flex-1">
                      <p className="text-xs text-slate-500 dark:text-slate-400">End Date</p>
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{formatDate(selectedMed.endDate)}</p>
                    </div>
                  </>
                )}
              </div>

              {/* Category + Status */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-slate-400" />
                  <CategoryBadge category={selectedMed.category} />
                </div>
                <StatusBadge status={selectedMed.status} />
              </div>

              {/* Notes */}
              {selectedMed.notes && (
                <div className="p-3 bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-100 dark:border-amber-900/30 flex gap-2">
                  <StickyNote className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-800 dark:text-amber-300">{selectedMed.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
