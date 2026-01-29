"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NavItem } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import Logo from "@/components/layout/Logo";
import NavIcon from "@/components/layout/NavIcon";

export default function Sidebar({
  items,
  footer,
}: {
  items: NavItem[];
  footer?: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <aside className="hidden h-screen w-64 flex-col border-r border-border bg-card/70 px-6 py-8 lg:flex">
      <Logo href="/" />
      <nav className="mt-10 flex flex-1 flex-col gap-2">
        {items.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition",
                active
                  ? "bg-primary text-primary-foreground shadow"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <span className="flex items-center gap-3">
                <NavIcon name={item.icon} className="h-4 w-4" />
                {item.label}
              </span>
              {item.badge && <Badge variant="secondary">{item.badge}</Badge>}
            </Link>
          );
        })}
      </nav>
      {footer && <div className="mt-auto pt-6">{footer}</div>}
    </aside>
  );
}
