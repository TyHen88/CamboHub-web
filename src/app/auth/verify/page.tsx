"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { sendEmailVerification } from "firebase/auth";

import AuthShell from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { firebaseAuth } from "@/lib/firebase/client";

async function bootstrapAndRedirect(router: ReturnType<typeof useRouter>) {
  const token = await firebaseAuth.currentUser?.getIdToken();
  if (!token) return;
  const response = await fetch("/api/auth/bootstrap", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (!response.ok) {
    toast.error(data.error || "Unable to complete setup");
    return;
  }
  router.push(data.user.role === "ADMIN" ? "/admin/dashboard" : "/student/home");
}

export default function VerifyPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const unsub = firebaseAuth.onAuthStateChanged(async (user) => {
      setEmail(user?.email ?? null);
      if (user?.emailVerified) {
        setVerified(true);
        await bootstrapAndRedirect(router);
      }
    });
    return () => unsub();
  }, [router]);

  const handleRefresh = async () => {
    try {
      setLoading(true);
      if (!firebaseAuth.currentUser) {
        router.push("/auth/login");
        return;
      }
      await firebaseAuth.currentUser.reload();
      const isVerified = firebaseAuth.currentUser.emailVerified;
      setVerified(isVerified);
      if (isVerified) {
        await bootstrapAndRedirect(router);
      } else {
        toast("Email not verified yet", {
          description: "Please check your inbox and confirm your email address.",
        });
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unable to refresh status";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const resendEmail = async () => {
    if (!firebaseAuth.currentUser) return;
    await sendEmailVerification(firebaseAuth.currentUser);
    toast.success("Verification email resent");
  };

  return (
    <AuthShell
      title="Verify your email"
      description="We sent a verification link to your email. Please confirm to continue."
      backgroundClassName="bg-[radial-gradient(circle_at_top,_hsl(142_76%_95%),_transparent_55%)] dark:bg-[radial-gradient(circle_at_top,_hsl(142_50%_15%),_transparent_55%)]"
      cardClassName="border-border/60 shadow-xl bg-card/95 backdrop-blur-sm"
      headerClassName="text-center"
      contentClassName="space-y-6"
    >
      <div className="space-y-4 text-sm text-muted-foreground">
        <p className="text-center">
          {email
            ? `Check ${email} for a confirmation link.`
            : "Sign in to view your verification status."}
        </p>
        <div className="rounded-2xl border border-border bg-muted/60 p-4 backdrop-blur-sm">
          <p className="font-medium text-foreground mb-1">Once verified:</p>
          <p>You will unlock the full CamNextGen learning experience.</p>
        </div>
        <Button onClick={handleRefresh} className="w-full" disabled={loading}>
          {loading ? "Checking..." : "I've verified"}
        </Button>
        <Button variant="outline" className="w-full" onClick={resendEmail}>
          Resend verification email
        </Button>
        {verified && (
          <p className="text-center text-xs text-muted-foreground animate-pulse">
            Verified! Redirecting you now...
          </p>
        )}
      </div>
    </AuthShell>
  );
}
