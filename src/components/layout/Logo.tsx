import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-2">
      <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
        <Sparkles className="h-4 w-4" />
      </span>
      <div className="leading-tight">
        <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          CamNextGen
        </p>
        <p className="font-display text-lg font-semibold">Learning Hub</p>
      </div>
    </Link>
  );
}
