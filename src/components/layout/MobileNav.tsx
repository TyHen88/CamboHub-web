"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

import { NavItem } from "@/lib/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Logo from "@/components/layout/Logo";
import NavIcon from "@/components/layout/NavIcon";

export default function MobileNav({ items }: { items: NavItem[] }) {
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" aria-label="Open menu">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col gap-6">
          <SheetHeader>
            <SheetTitle>
              <Logo href="/" />
            </SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-2">
            {items.map((item) => {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <NavIcon name={item.icon} className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
