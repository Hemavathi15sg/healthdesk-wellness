"use client";

import { useState } from "react";
import { appointments } from "@/lib/mockData";
import { StatusBadge } from "@/components/StatusBadge";
import {
  CalendarDays, Clock, User, Stethoscope, CheckCircle2,
  ChevronRight, ChevronLeft, Sparkles
} from "lucide-react";

const APPOINTMENT_TYPES = ["Coaching", "Consultation", "Follow-up", "Assessment", "Nutrition"];
const TIME_SLOTS = ["09:00 AM","09:30 AM","10:00 AM","10:30 AM","11:00 AM","02:00 PM","02:30 PM","03:00 PM","03:30 PM","04:00 PM"];
const COORDINATORS = ["Dr. Sarah Chen","Dr. Michael Brown","Dr. Emily Davis","Dr. James Wilson","Dr. Ana Patel"];

type Step = 1 | 2 | 3;

export default function AppointmentsPage() {
  const [step, setStep]               = useState<Step>(1);
  const [submitted, setSubmitted]     = useState(false);
  const [patientName, setPatientName] = useState("");
  const [apptType, setApptType]       = useState("");
  const [date, setDate]               = useState("");
  const [time, setTime]               = useState("");
  const [coordinator, setCoordinator] = useState("");
  const [notes, setNotes]             = useState("");
  const [dateError, setDateError]     = useState("");

  const today = new Date().toISOString().split("T")[0];

  function validateDate(val: string) {
    if (!val) { setDateError("Please select a date."); return false; }
    if (val < today) { setDateError("Date cannot be in the past."); return false; }
    setDateError("");
    return true;
  }

  function handleStep1Next() {
    if (!patientName.trim() || !apptType) return;
    setStep(2);
  }

  function handleStep2Next() {
    if (!validateDate(date)) return;
    if (!time || !coordinator) return;
    setStep(3);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  function reset() {
    setStep(1); setSubmitted(false);
    setPatientName(""); setApptType(""); setDate(""); setTime("");
    setCoordinator(""); setNotes(""); setDateError("");
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <CalendarDays className="w-5 h-5 text-purple-500" />
          <p className="text-xs font-semibold uppercase tracking-widest text-purple-500">Scheduling</p>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-50">Appointments</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Book, track, and manage wellness sessions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Booking Form — Feature 1 (inline suggestion) + Feature 8 (multi-file) */}
        <div className="lg:col-span-2">
          <div className="wellness-card p-6">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <h2 className="font-semibold text-slate-900 dark:text-slate-100">Book Appointment</h2>
            </div>

            {/* Step Indicator */}
            <div className="flex items-center mb-8">
              {([1,2,3] as Step[]).map((s, idx) => (
                <div key={s} className="flex items-center flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all ${
                    s < step ? "bg-emerald-500 text-white"
                    : s === step ? "bg-purple-500 text-white shadow-lg shadow-purple-200 dark:shadow-purple-900"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                  }`}>
                    {s < step ? <CheckCircle2 className="w-4 h-4" /> : s}
                  </div>
                  {idx < 2 && (
                    <div className={`h-0.5 flex-1 mx-2 transition-all ${s < step ? "step-connector-done" : "step-connector"}`} />
                  )}
                </div>
              ))}
            </div>

            {submitted ? (
              /* Success state */
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">Appointment Booked!</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                  <span className="font-medium text-slate-700 dark:text-slate-300">{patientName}</span> · {apptType}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                  {date} at {time} with {coordinator}
                </p>
                <button onClick={reset} className="btn-primary px-6 py-2.5 text-sm">
                  Book Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {step === 1 && (
                  <>
                    <div>
                      <label className="form-label flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5" /> Patient Name
                      </label>
                      <input
                        className="form-input"
                        placeholder="e.g. Alex Johnson"
                        value={patientName}
                        onChange={e => setPatientName(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label flex items-center gap-1.5">
                        <Stethoscope className="w-3.5 h-3.5" /> Appointment Type
                      </label>
                      <select
                        className="form-input"
                        value={apptType}
                        onChange={e => setApptType(e.target.value)}
                        required
                      >
                        <option value="">Select type...</option>
                        {APPOINTMENT_TYPES.map(t => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                    <button
                      type="button"
                      onClick={handleStep1Next}
                      disabled={!patientName.trim() || !apptType}
                      className="btn-primary w-full py-2.5 flex items-center justify-center gap-2"
                    >
                      Continue <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div>
                      <label className="form-label flex items-center gap-1.5">
                        <CalendarDays className="w-3.5 h-3.5" /> Date
                      </label>
                      <input
                        type="date"
                        className={`form-input ${dateError ? "border-rose-400 dark:border-rose-500" : ""}`}
                        value={date}
                        min={today}
                        onChange={e => { setDate(e.target.value); validateDate(e.target.value); }}
                        required
                      />
                      {dateError && <p className="text-xs text-rose-500 mt-1">{dateError}</p>}
                    </div>
                    <div>
                      <label className="form-label flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" /> Time Slot
                      </label>
                      <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                        {TIME_SLOTS.map(t => (
                          <button
                            type="button"
                            key={t}
                            onClick={() => setTime(t)}
                            className={`py-2 px-3 text-xs font-medium rounded-xl border transition-all ${
                              time === t
                                ? "bg-purple-500 text-white border-purple-500 shadow-md"
                                : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-purple-300"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="form-label">Wellness Coordinator</label>
                      <select
                        className="form-input"
                        value={coordinator}
                        onChange={e => setCoordinator(e.target.value)}
                        required
                      >
                        <option value="">Select coordinator...</option>
                        {COORDINATORS.map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => setStep(1)} className="btn-secondary flex items-center gap-1.5 px-4 py-2.5">
                        <ChevronLeft className="w-4 h-4" /> Back
                      </button>
                      <button
                        type="button"
                        onClick={handleStep2Next}
                        disabled={!date || !time || !coordinator}
                        className="btn-primary flex-1 py-2.5 flex items-center justify-center gap-2"
                      >
                        Continue <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    {/* Summary */}
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800 space-y-2.5 text-sm">
                      <p className="font-semibold text-purple-700 dark:text-purple-300 text-xs uppercase tracking-wide mb-3">Booking Summary</p>
                      <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                        <User className="w-3.5 h-3.5 text-purple-500" />
                        <span className="font-medium">{patientName}</span>
                        <span className="badge-purple ml-auto">{apptType}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                        <CalendarDays className="w-3.5 h-3.5 text-purple-500" />
                        <span>{date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                        <Clock className="w-3.5 h-3.5 text-purple-500" />
                        <span>{time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                        <Stethoscope className="w-3.5 h-3.5 text-purple-500" />
                        <span>{coordinator}</span>
                      </div>
                    </div>
                    <div>
                      <label className="form-label">Notes <span className="text-slate-400 font-normal">(optional)</span></label>
                      <textarea
                        className="form-input min-h-[80px] resize-none"
                        placeholder="Any relevant information..."
                        value={notes}
                        onChange={e => setNotes(e.target.value)}
                      />
                    </div>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => setStep(2)} className="btn-secondary flex items-center gap-1.5 px-4 py-2.5">
                        <ChevronLeft className="w-4 h-4" /> Back
                      </button>
                      <button type="submit" className="btn-primary flex-1 py-2.5 flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-4 h-4" /> Confirm Booking
                      </button>
                    </div>
                  </>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Appointments List */}
        <div className="lg:col-span-3">
          <div className="wellness-card p-6">
            <div className="flex items-center gap-2 mb-5">
              <CalendarDays className="w-4 h-4 text-violet-500" />
              <h2 className="font-semibold text-slate-900 dark:text-slate-100">All Appointments</h2>
              <span className="badge-purple ml-auto">{appointments.length} total</span>
            </div>
            <div className="space-y-3">
              {appointments.map(appt => (
                <div
                  key={appt.id}
                  className="flex items-start sm:items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl hover:bg-purple-50/50 dark:hover:bg-purple-900/10 transition-colors"
                >
                  <div className="avatar-initials w-10 h-10 text-xs shrink-0">
                    {appt.patientName.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 dark:text-slate-100 text-sm truncate">{appt.patientName}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{appt.date} · {appt.time}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">with {appt.coordinator}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <span className="badge-purple">{appt.type}</span>
                    <StatusBadge status={appt.status} showDot />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}