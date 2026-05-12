"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Users, Calendar, Sparkles, Menu, X, Moon, Sun, Target, Pill } from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: Heart },
  { href: "/patients", label: "My Health", icon: Users },
  { href: "/appointments", label: "Appointments", icon: Calendar },
  { href: "/medications", label: "Medications", icon: Pill },
  { href: "/dashboard", label: "Dashboard", icon: Sparkles },
  { href: "/wellness", label: "Wellness Goals", icon: Target },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (localStorage.getItem("theme") === "dark" ||
        (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-xl bg-purple-600 text-white shadow-lg lg:hidden"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-screen w-64 bg-slate-900 dark:bg-[#0d1117] text-white border-r border-white/5 transform transition-transform duration-300 lg:translate-x-0 z-40 flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header — logo + app name */}
        <div className="px-6 py-5 border-b border-white/10 bg-gradient-to-b from-purple-900/40 to-transparent">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-lg shadow-purple-900/50">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-bold text-sm leading-tight text-white">Wellness Hub</p>
              <p className="text-[10px] text-purple-400 leading-tight">Health &amp; Goals</p>
            </div>
          </Link>
        </div>

        {/* User Avatar */}
        <div className="px-6 py-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="avatar-initials w-9 h-9 text-xs">WH</div>
            <div>
              <p className="text-sm font-medium text-white leading-tight">Wellness User</p>
              <p className="text-[11px] text-slate-400 leading-tight">Active Member</p>
            </div>
            <div className="ml-auto w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-5 overflow-y-auto">
          <p className="px-3 mb-3 text-[10px] font-semibold uppercase tracking-widest text-slate-500">Navigation</p>
          <div className="space-y-1">
            {navItems.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-purple-600/90 text-white shadow-md shadow-purple-900/40"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-slate-500"}`} />
                  <span className="flex-1">{label}</span>
                  {isActive && (
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer — dark mode toggle */}
        {mounted && (
          <div className="px-4 py-4 border-t border-white/5 space-y-2">
            <button
              onClick={toggleDarkMode}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 text-sm font-medium transition-all"
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-violet-400" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
            <p className="text-[10px] text-slate-600 text-center px-3">HealthDesk Wellness v1.0</p>
          </div>
        )}
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
        />
      )}
    </>
  );
}
