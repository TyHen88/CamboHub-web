"use client";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import { adminNav, studentNav } from "@/lib/navigation";

export default function AppShell({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: "admin" | "student";
}) {
  const navItems = variant === "admin" ? adminNav : studentNav;
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar items={navItems} />
      <div className="flex min-h-screen flex-1 flex-col">
        <Topbar navItems={navItems} />
        <main className="flex-1 px-4 py-8 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
