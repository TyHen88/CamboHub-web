import { Suspense } from "react";

import AuthShell from "@/components/auth/AuthShell";

import AuthActionClient from "./AuthActionClient";

function LoadingState() {
  return (
    <AuthShell
      title="Loading reset page"
      description="Preparing your password reset flow."
      backgroundClassName="bg-[radial-gradient(circle_at_top,_hsl(210_100%_95%),_transparent_55%)] dark:bg-[radial-gradient(circle_at_top,_hsl(210_50%_15%),_transparent_55%)]"
      cardClassName="border-border/60 shadow-xl bg-card/95 backdrop-blur-sm"
      headerClassName="text-center"
      contentClassName="space-y-6"
    >
      <div className="flex items-center justify-center py-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    </AuthShell>
  );
}

export default function AuthActionPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <AuthActionClient />
    </Suspense>
  );
}
