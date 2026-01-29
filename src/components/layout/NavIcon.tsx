"use client";

import {
  Activity,
  Bell,
  BookOpen,
  CalendarDays,
  ClipboardList,
  GraduationCap,
  LayoutDashboard,
  LineChart,
  Megaphone,
  MessagesSquare,
  NotebookTabs,
  Settings,
  ShieldCheck,
  Target,
  UserCircle,
  Users,
  Waypoints,
} from "lucide-react";

import type { NavIconName } from "@/lib/navigation";

const iconMap: Record<NavIconName, React.ComponentType<{ className?: string }>> = {
  "layout-dashboard": LayoutDashboard,
  "book-open": BookOpen,
  "graduation-cap": GraduationCap,
  "line-chart": LineChart,
  waypoints: Waypoints,
  target: Target,
  "clipboard-list": ClipboardList,
  "messages-square": MessagesSquare,
  "calendar-days": CalendarDays,
  activity: Activity,
  bell: Bell,
  "user-circle": UserCircle,
  settings: Settings,
  users: Users,
  "notebook-tabs": NotebookTabs,
  megaphone: Megaphone,
  "shield-check": ShieldCheck,
};

export default function NavIcon({
  name,
  className,
}: {
  name: NavIconName;
  className?: string;
}) {
  const Icon = iconMap[name];
  return <Icon className={className} />;
}
