"use client";

import { wellnessGoals } from "@/lib/mockData";
import { ProgressRing } from "@/components/ProgressRing";
import { WellnessGoal } from "@/lib/types";
import { CheckCircle2, Footprints, Droplets, Heart, Dumbbell, Moon, Target, Zap } from "lucide-react";

function getGoalIcon(goalName: string) {
  const name = goalName.toLowerCase();
  if (name.includes("step"))   return <Footprints className="w-4 h-4" />;
  if (name.includes("water"))  return <Droplets   className="w-4 h-4" />;
  if (name.includes("heart") || name.includes("bp")) return <Heart className="w-4 h-4" />;
  if (name.includes("exercise") || name.includes("workout")) return <Dumbbell className="w-4 h-4" />;
  if (name.includes("sleep"))  return <Moon       className="w-4 h-4" />;
  return <Target className="w-4 h-4" />;
}

const GoalCard = ({ goal }: { goal: WellnessGoal }) => {
  const percentage = Math.min((goal.currentValue / goal.targetValue) * 100, 100);
  const isComplete = goal.status === "Completed";

  return (
    <div className={`wellness-card overflow-hidden relative ${isComplete ? "ring-1 ring-emerald-300 dark:ring-emerald-700" : ""}`}>
      {/* Top accent bar */}
      <div className={`h-1 w-full ${isComplete ? "bg-gradient-to-r from-emerald-400 to-teal-400" : "bg-gradient-to-r from-purple-500 to-violet-500"}`} />

      {/* Completed badge overlay */}
      {isComplete && (
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-[11px] font-semibold">
            <CheckCircle2 className="w-3 h-3" /> Done
          </span>
        </div>
      )}

      <div className="p-5">
        {/* Goal name + icon */}
        <div className="flex items-start gap-3 mb-4">
          <div className={`flex items-center justify-center w-9 h-9 rounded-xl shrink-0 ${isComplete ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400" : "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"}`}>
            {getGoalIcon(goal.goalName)}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm leading-tight">{goal.goalName}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {goal.currentValue} <span className="text-slate-400">/</span> {goal.targetValue} {goal.unit}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-2">
          <div
            className={`h-full rounded-full transition-all duration-500 ${isComplete ? "shimmer-bar-emerald" : "shimmer-bar"}`}
            style={{ width: `${percentage}%` }}
          />
        </div>

        <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
          <span className={`font-semibold ${isComplete ? "text-emerald-600 dark:text-emerald-400" : "text-purple-600 dark:text-purple-400"}`}>
            {percentage.toFixed(0)}%
          </span>
          <span>Due {new Date(goal.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
        </div>
      </div>
    </div>
  );
};

export default function WellnessPage() {
  const activeGoals    = wellnessGoals.filter((g) => g.status === "Active");
  const completedGoals = wellnessGoals.filter((g) => g.status === "Completed");
  const overallPct     = wellnessGoals.length > 0 ? Math.round((completedGoals.length / wellnessGoals.length) * 100) : 0;

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <Zap className="w-5 h-5 text-purple-500" />
          <p className="text-xs font-semibold uppercase tracking-widest text-purple-500">Progress Tracker</p>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-50">Wellness Goals</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Track your progress towards better health</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {/* Active Goals */}
        <div className="wellness-card stat-card-accent-purple p-5 flex items-center gap-4">
          <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-purple-100 dark:bg-purple-900/30 shrink-0">
            <Target className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Active Goals</p>
            <p className="text-3xl font-extrabold text-purple-600 dark:text-purple-400">{activeGoals.length}</p>
          </div>
        </div>

        {/* Completed */}
        <div className="wellness-card stat-card-accent-emerald p-5 flex items-center gap-4">
          <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 shrink-0">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Completed</p>
            <p className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">{completedGoals.length}</p>
          </div>
        </div>

        {/* Overall Progress — with ProgressRing */}
        <div className="wellness-card stat-card-accent-violet p-5 flex items-center gap-4">
          <ProgressRing percentage={overallPct} size={56} strokeWidth={6} color="violet" />
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Overall Progress</p>
            <p className="text-3xl font-extrabold text-violet-600 dark:text-violet-400">{overallPct}%</p>
          </div>
        </div>
      </div>

      {/* Active Goals */}
      {activeGoals.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-500" /> Active Goals
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeGoals.map((goal) => <GoalCard key={goal.id} goal={goal} />)}
          </div>
        </section>
      )}

      {/* Completed Goals */}
      {completedGoals.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Completed Goals
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {completedGoals.map((goal) => <GoalCard key={goal.id} goal={goal} />)}
          </div>
        </section>
      )}

      {activeGoals.length === 0 && completedGoals.length === 0 && (
        <div className="wellness-card p-16 text-center">
          <Target className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <p className="text-slate-500 dark:text-slate-400 font-medium">No goals yet</p>
          <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Start your wellness journey today!</p>
        </div>
      )}
    </div>
  );
}
