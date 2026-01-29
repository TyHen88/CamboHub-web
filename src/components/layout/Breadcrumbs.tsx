"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

const hiddenSegments = new Set(["student", "admin"]);

function formatSegment(segment: string) {
  return segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname
    .split("/")
    .filter(Boolean)
    .filter((segment) => !hiddenSegments.has(segment));

  if (segments.length === 0) {
    return <span className="text-sm text-muted-foreground">Overview</span>;
  }

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      {segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/");
        const isLast = index === segments.length - 1;
        return (
          <span key={href} className="flex items-center gap-2">
            {!isLast ? (
              <Link href={href} className="transition hover:text-foreground">
                {formatSegment(segment)}
              </Link>
            ) : (
              <span className="text-foreground">{formatSegment(segment)}</span>
            )}
            {!isLast && <ChevronRight className="h-4 w-4" />}
          </span>
        );
      })}
    </div>
  );
}
