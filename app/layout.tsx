import "./globals.css";
import { Sidebar } from "@/components/Sidebar";

export const metadata = {
  title: "HealthDesk Wellness",
  description: "Your personal wellness journey starts here",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex bg-slate-50 dark:bg-slate-950">
        <Sidebar />
        <main className="flex-1 overflow-auto">{children}</main>
      </body>
    </html>
  );
}
