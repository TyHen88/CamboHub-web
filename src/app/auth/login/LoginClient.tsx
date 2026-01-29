"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

import AuthShell from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";
import { firebaseAuth, googleProvider } from "@/lib/firebase/client";
import { loginSchema, type LoginValues } from "@/lib/validators/auth";

function redirectByRole(
  role: string,
  router: ReturnType<typeof useRouter>,
  next?: string | null,
) {
  const canUseNext =
    next &&
    ((next.startsWith("/admin") && role === "ADMIN") ||
      (next.startsWith("/student") && role !== "ADMIN") ||
      next === "/");
  if (canUseNext) {
    router.push(next);
    return;
  }
  router.push(role === "ADMIN" ? "/admin/dashboard" : "/student/home");
}

export default function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleBootstrap = async () => {
    const token = await firebaseAuth.currentUser?.getIdToken();
    if (!token) throw new Error("Missing token");
    const response = await fetch("/api/auth/bootstrap", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Unable to sign in");
    }
    return data.user.role as string;
  };

  const onSubmit = async (values: LoginValues) => {
    try {
      setIsLoading(true);
      const credential = await signInWithEmailAndPassword(
        firebaseAuth,
        values.email,
        values.password,
      );

      if (!credential.user.emailVerified) {
        router.push("/auth/verify");
        return;
      }

      const role = await handleBootstrap();
      redirectByRole(role, router, nextPath);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Sign in failed";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      setIsLoading(true);
      await signInWithPopup(firebaseAuth, googleProvider);
      const role = await handleBootstrap();
      redirectByRole(role, router, nextPath);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Google sign-in failed";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthShell
      title="Welcome back"
      description="Sign in to continue building your future in tech."
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...form.register("email")} />
          {form.formState.errors.email && (
            <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" {...form.register("password")} />
          {form.formState.errors.password && (
            <p className="text-xs text-destructive">{form.formState.errors.password.message}</p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
      <div className="mt-4">
        <Button variant="outline" className="w-full" onClick={handleGoogle} disabled={isLoading}>
          Continue with Google
        </Button>
      </div>
      <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
        <Link href="/auth/forgot-password" className="hover:text-foreground">
          Forgot password?
        </Link>
        <Link href="/auth/register" className="hover:text-foreground">
          Create account
        </Link>
      </div>
    </AuthShell>
  );
}
