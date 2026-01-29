"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

import AuthShell from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";
import { firebaseAuth, googleProvider } from "@/lib/firebase/client";
import { registerSchema, type RegisterValues } from "@/lib/validators/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
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
      throw new Error(data.error || "Unable to create account");
    }
    return data.user.role as string;
  };

  const onSubmit = async (values: RegisterValues) => {
    try {
      setIsLoading(true);
      const credential = await createUserWithEmailAndPassword(
        firebaseAuth,
        values.email,
        values.password,
      );
      await updateProfile(credential.user, { displayName: values.displayName });
      await sendEmailVerification(credential.user);
      await handleBootstrap();
      router.push("/auth/verify");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Registration failed";
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
      router.push(role === "ADMIN" ? "/admin/dashboard" : "/student/home");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Google sign-up failed";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthShell
      title="Create your account"
      description="Join the CamNextGen community and start learning today."
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="displayName">Full name</Label>
          <Input id="displayName" {...form.register("displayName")} />
          {form.formState.errors.displayName && (
            <p className="text-xs text-destructive">
              {form.formState.errors.displayName.message}
            </p>
          )}
        </div>
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
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <Input id="confirmPassword" type="password" {...form.register("confirmPassword")} />
          {form.formState.errors.confirmPassword && (
            <p className="text-xs text-destructive">
              {form.formState.errors.confirmPassword.message}
            </p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create account"}
        </Button>
      </form>
      <div className="mt-4">
        <Button variant="outline" className="w-full" onClick={handleGoogle} disabled={isLoading}>
          Continue with Google
        </Button>
      </div>
      <div className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/auth/login" className="font-medium text-foreground">
          Sign in
        </Link>
      </div>
    </AuthShell>
  );
}
