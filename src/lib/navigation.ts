export type NavIconName =
  | "layout-dashboard"
  | "book-open"
  | "graduation-cap"
  | "line-chart"
  | "waypoints"
  | "target"
  | "clipboard-list"
  | "messages-square"
  | "calendar-days"
  | "activity"
  | "bell"
  | "user-circle"
  | "settings"
  | "users"
  | "notebook-tabs"
  | "megaphone"
  | "shield-check";

export type NavItem = {
  label: string;
  href: string;
  icon: NavIconName;
  badge?: string;
};

export const studentNav: NavItem[] = [
  { label: "Home", href: "/student/home", icon: "layout-dashboard" },
  { label: "Catalog", href: "/student/catalog", icon: "book-open" },
  { label: "Enrollments", href: "/student/enrollments", icon: "graduation-cap" },
  { label: "Progress", href: "/student/progress", icon: "line-chart" },
  { label: "Learning Paths", href: "/student/learning-paths", icon: "waypoints" },
  { label: "Assessments", href: "/student/assessments", icon: "target" },
  { label: "Assignments", href: "/student/assignments", icon: "clipboard-list" },
  { label: "Community", href: "/student/community", icon: "messages-square" },
  { label: "Events", href: "/student/events", icon: "calendar-days" },
  { label: "Career", href: "/student/career", icon: "activity" },
  { label: "Notifications", href: "/student/notifications", icon: "bell" },
  { label: "Profile", href: "/student/profile", icon: "user-circle" },
  { label: "Settings", href: "/student/settings", icon: "settings" },
];

export const adminNav: NavItem[] = [
  { label: "Dashboard", href: "/admin/dashboard", icon: "layout-dashboard" },
  { label: "Users", href: "/admin/users", icon: "users" },
  { label: "Courses", href: "/admin/courses", icon: "notebook-tabs" },
  { label: "Enrollments", href: "/admin/enrollments", icon: "graduation-cap" },
  { label: "Announcements", href: "/admin/announcements", icon: "megaphone" },
  { label: "Events", href: "/admin/events", icon: "calendar-days" },
  { label: "Audit Logs", href: "/admin/audit-logs", icon: "shield-check" },
  { label: "Reports", href: "/admin/reports", icon: "line-chart" },
  { label: "Settings", href: "/admin/settings", icon: "settings" },
];
