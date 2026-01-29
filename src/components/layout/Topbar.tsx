"use client";

import { Search } from "lucide-react";

import Breadcrumbs from "@/components/layout/Breadcrumbs";
import MobileNav from "@/components/layout/MobileNav";
import UserMenu from "@/components/layout/UserMenu";
import { Input } from "@/components/ui/input";
import { NavItem } from "@/lib/navigation";

export default function Topbar({ navItems }: { navItems: NavItem[] }) {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-border bg-background/80 px-4 py-4 backdrop-blur lg:px-8">
      <div className="flex items-center gap-3">
        <MobileNav items={navItems} />
        <div className="hidden sm:block">
          <Breadcrumbs />
        </div>
      </div>
      <div className="flex flex-1 items-center justify-end gap-3">
        <div className="relative hidden w-full max-w-sm md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search courses, events, mentors" className="pl-9" />
        </div>
        <UserMenu />
      </div>
    </header>
  );
}
